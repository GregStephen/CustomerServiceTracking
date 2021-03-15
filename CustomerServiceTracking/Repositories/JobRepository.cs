using CustomerServiceTracking.DataModels;
using CustomerServiceTracking.DTOS;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.Repositories
{
    public class JobRepository : IJobRepository
    {
        string _connectionString;
        private ICustomerRepository _customerRepo;
        private ISystemRepository _systemRepo;
        private IJobTypesRepository _jobTypeRepo;
        private IBusinessRepository _businessRepo;
        public JobRepository(IConfiguration configuration, ICustomerRepository customerRepo, ISystemRepository systemRepo, IJobTypesRepository jobTypeRepo, IBusinessRepository businessRepo)
        {
            _connectionString = configuration.GetValue<string>("ConnectionString");
            _customerRepo = customerRepo;
            _systemRepo = systemRepo;
            _jobTypeRepo = jobTypeRepo;
            _businessRepo = businessRepo;
        }

        public Job GetJobForSystemBySystemId(Guid systemId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT j.*, u.FirstName + ' ' + u.LastName as TechnicianName
                            FROM [Job] j
                            JOIN [User] u 
                            ON j.TechnicianId = u.Id
                            WHERE [PropertySystemId] = @systemId";
                var parameters = new { systemId };
                return db.QueryFirstOrDefault<Job>(sql, parameters);
            }
        }

        public List<ServiceNeed> GetJobsNeedingService(Guid businessId, int amountOfDays)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                List<ServiceNeed> ListOfSystemsNeedingService = new List<ServiceNeed>();
                // get all employees from businessId
                List<Employee> employeeOptions = _businessRepo.GetRegisteredEmployees(businessId).ToList();

                var sql = @"SELECT ps.*
                            FROM [PropertySystem] ps
                            JOIN [Property] p
                            on ps.[PropertyId] = p.Id
                            WHERE p.BusinessId = @businessId AND (DATEDIFF(day, GETDATE(), ps.[DayTankDepleted]) < @amountOfDays)";
                //foreach (var property in properties)
                //{ 
                //    foreach (var propertySystem in property.Systems)
                //    {
                //        systemIds.Add(propertySystem.Id);
                //    }
                //}
                //var sqll = @"SELECT TOP(1) Id 
                //            FROM Report
                //            WHERE SystemId = @systemId
                //            ORDER BY ServiceDate DESC";

                //foreach (var systemId in systemIds)
                //{
                //    var parameter = new { systemId };
                //    var reportId = db.QueryFirst<Guid>(sqll, parameter);
                //    mostRecentReportIds.Add(reportId);
                //}

                ////search reports and returns list of SystemId, customerId and Days leftwhere dayTankDepleted is within the week and Id is in list of most recent reports
                //var sql = @"SELECT r.[SystemId], DATEDIFF(day, GETDATE(), r.[DayTankDepleted]) as DaysUntilEmpty, r.[CustomerId]
                //            FROM [Report] r
                //            WHERE (DATEDIFF(day, GETDATE(), r.[DayTankDepleted]) < @amountOfDays) AND r.[Id] in @mostRecentReportIds";
                var parameters = new { businessId, amountOfDays };
                var propertySystemsNeedingService =  db.Query<PropertySystem>(sql, parameters);
                foreach (var propertySystemNeedingService in propertySystemsNeedingService)
                {
                    ServiceNeed SystemNeedingService = new ServiceNeed();
                    SystemNeedingService.DaysUntilEmpty = (propertySystemNeedingService.DayTankDepleted - DateTime.Now).Days;
                    SystemNeedingService.Property = _customerRepo.GetPropertyByPropertyId(propertySystemNeedingService.PropertyId);
                    SystemNeedingService.System = propertySystemNeedingService;
                    SystemNeedingService.EmployeeOptions = employeeOptions;
                    SystemNeedingService.Job = GetJobForSystemBySystemId(propertySystemNeedingService.Id);
                    ListOfSystemsNeedingService.Add(SystemNeedingService);
                }
                return ListOfSystemsNeedingService;
            }
        }

        public IEnumerable<JobToShow> GetJobsAssignedTo(Guid employeeId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [Job]
                            WHERE [TechnicianId] = @employeeId";
                var parameters = new { employeeId };
                var jobs = db.Query<JobToShow>(sql, parameters);
                foreach (var job in jobs)
                {
                    job.JobType = _jobTypeRepo.GetJobTypeById(job.JobTypeId);
                    job.PropertySystem = _customerRepo.GetPropertySystemByPropertySystemId(job.PropertySystemId);
                    job.Property = _customerRepo.GetPropertyByPropertyId(job.PropertySystem.PropertyId);
                }
                return jobs;
            }
        }

        public bool AddJob(NewJobDTO newJobDTO)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var check = GetJobForSystemBySystemId(newJobDTO.PropertySystemId);
                if (check != null)
                {
                    DeleteJob(check.Id);
                }
                var sql = @"INSERT INTO [Job]
                            (
                                [PropertySystemId], 
                                [DateAssigned],
                                [TechnicianId],
                                [JobTypeId],
                                [Note]
                            )
                            VALUES
                            (
                                @propertySystemId,
                                @dateAssigned,
                                @technicianId,
                                @jobTypeId,
                                @note
                            )";
                return (db.Execute(sql, newJobDTO) == 1);
            }
        }

        public bool EditJob(Job updatedJobDTO)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [Job]
                            SET 
                            [TechnicianId] = @technicianId,
                            [Note] = @note,
                            [JobTypeId] = @jobTypeId
                            WHERE [Id] = @Id";
                return (db.Execute(sql, updatedJobDTO) == 1);
            }
        }

        public bool DeleteJob(Guid jobId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"DELETE [Job]
                            WHERE Id = @jobId";
                var parameters = new { jobId };
                return db.Execute(sql, parameters) == 1;
            }
        }
    }
}
