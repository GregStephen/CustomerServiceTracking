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

        public JobRepository(IConfiguration configuration, ICustomerRepository customerRepo, ISystemRepository systemRepo)
        {
            _connectionString = configuration.GetValue<string>("ConnectionString");
            _customerRepo = customerRepo;
            _systemRepo = systemRepo;
        }

        public Job GetJobForSystemBySystemId(Guid systemId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [Job]
                            WHERE [CustomerSystemId] = @systemId";
                var parameters = new { systemId };
                return db.QueryFirstOrDefault<Job>(sql, parameters);
            }
        }

        public List<ServiceNeed> GetJobsNeedingService(Guid businessId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                List<Guid> systemIds = new List<Guid>();
                List<Guid> mostRecentReportIds = new List<Guid>();
                List<ServiceNeed> ListOfSystemsNeedingService = new List<ServiceNeed>();
                
                // get all customers from businessId
                IEnumerable<Customer> customers = _customerRepo.GetCustomersByBusinessId(businessId);
                foreach (var customer in customers)
                { 
                    foreach (var customerSystem in customer.Systems)
                    {
                        systemIds.Add(customerSystem.Id);
                    }
                }
                var sqll = @"SELECT TOP(1) Id 
                            FROM Report
                            WHERE SystemId = @systemId
                            ORDER BY ServiceDate DESC";

                foreach (var systemId in systemIds)
                {
                    var parameter = new { systemId };
                    var reportId = db.QueryFirst<Guid>(sqll, parameter);
                    mostRecentReportIds.Add(reportId);
                }

                //search reports and returns list of SystemId, customerId and Days leftwhere dayTankDepleted is within the week and Id is in list of most recent reports
                var sql = @"SELECT r.[SystemId], DATEDIFF(day, GETDATE(), r.[DayTankDepleted]) as DaysUntilEmpty, r.[CustomerId]
                            FROM [Report] r
                            WHERE (DATEDIFF(day, GETDATE(), r.[DayTankDepleted]) < 7) AND r.[Id] in @mostRecentReportIds";
                var parameters = new { mostRecentReportIds };
                var systemIdsAndDaysNeedingService =  db.Query<InNeedOfServiceCheckDTO>(sql, parameters);
                foreach (var systemIdAndDate in systemIdsAndDaysNeedingService)
                {
                    ServiceNeed SystemNeedingService = new ServiceNeed();
                    SystemNeedingService.DaysUntilEmpty = systemIdAndDate.DaysUntilEmpty;
                    SystemNeedingService.Customer = _customerRepo.GetCustomerByCustomerId(systemIdAndDate.CustomerId);
                    SystemNeedingService.System = _systemRepo.GetCustomerSystemBySystemId(systemIdAndDate.SystemId);
                    ListOfSystemsNeedingService.Add(SystemNeedingService);
                }
                return ListOfSystemsNeedingService;
            }
        }

        public IEnumerable<Job> GetJobsAssignedTo(Guid employeeId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [Job]
                            WHERE [TechnicianId] = @employeeId";
                var parameters = new { employeeId };
                return db.Query<Job>(sql, parameters);
            }
        }

        public bool AddJob(NewJobDTO newJobDTO)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [Job]
                            (
                                [CustomerSystemId],
                                [DateAssigned],
                                [TechnicianId],
                                [JobTypeId]
                            )
                            VALUES
                            (
                                @customerSystemId,
                                @dateAssigned,
                                @technicianId,
                                @jobTypeId
                            )";
                return (db.Execute(sql, newJobDTO) == 1);
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
