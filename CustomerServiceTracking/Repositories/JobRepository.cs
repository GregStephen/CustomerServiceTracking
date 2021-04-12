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
        private IBusinessRepository _businessRepo;
        public JobRepository(IConfiguration configuration, ICustomerRepository customerRepo, IBusinessRepository businessRepo)
        {
            _connectionString = configuration.GetValue<string>("ConnectionString");
            _customerRepo = customerRepo;
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
                List<Employee> employeeOptions = _businessRepo.GetAllEmployees(businessId).ToList();

                var sql = @"SELECT ps.*
                            FROM [PropertySystem] ps
                            JOIN [Property] p
                            on ps.[PropertyId] = p.Id
                            LEFT JOIN [Job] j
                            on j.[PropertySystemId] = ps.Id
                            WHERE p.BusinessId = @businessId AND (DATEDIFF(day, GETDATE(), ps.[NextServiceDate]) < @amountOfDays) AND j.[Id] IS NULL";
                var parameters = new { businessId, amountOfDays };
                var propertySystemsNeedingService =  db.Query<PropertySystem>(sql, parameters);
                foreach (var propertySystemNeedingService in propertySystemsNeedingService)
                {
                    ServiceNeed SystemNeedingService = new ServiceNeed();
                    SystemNeedingService.DaysUntilServiceDate = (propertySystemNeedingService.NextServiceDate - DateTime.Now).Days;
                    SystemNeedingService.Property = _customerRepo.GetPropertyByPropertyId(propertySystemNeedingService.PropertyId);
                    SystemNeedingService.System = propertySystemNeedingService;
                    SystemNeedingService.EmployeeOptions = employeeOptions;
                    ListOfSystemsNeedingService.Add(SystemNeedingService);
                }
                return ListOfSystemsNeedingService;
            }
        }

        public IEnumerable<JobToShow> GetJobsAssignedTo(Guid employeeId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT j.*, jt.[Type] AS JobType, u.FirstName + ' ' + u.LastName AS TechnicianName
                            FROM [Job] j
                            JOIN [JobType] jt
                            ON j.JobTypeId = jt.Id
                            JOIN [User] u
                            ON j.TechnicianId = u.Id
                            WHERE [TechnicianId] = @employeeId";
                var parameters = new { employeeId };
                var jobs = db.Query<JobToShow>(sql, parameters);
                foreach (var job in jobs)
                {
                    job.PropertySystem = _customerRepo.GetPropertySystemByPropertySystemId(job.PropertySystemId);
                    job.Property = _customerRepo.GetPropertyByPropertyId(job.PropertySystem.PropertyId);
                }
                return jobs;
            }
        }

        public IEnumerable<JobToShow> GetJobs(Guid businessId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT j.*, jt.[Type] AS JobType, u.FirstName + ' ' + u.LastName AS TechnicianName
                            FROM [Job] j
                            JOIN [JobType] jt
                            ON j.JobTypeId = jt.Id
                            JOIN [User] u
                            ON j.TechnicianId = u.Id
                            WHERE j.[BusinessId] = @businessId";
                var parameters = new { businessId };
                var jobs = db.Query<JobToShow>(sql, parameters);
                foreach (var job in jobs)
                {
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
