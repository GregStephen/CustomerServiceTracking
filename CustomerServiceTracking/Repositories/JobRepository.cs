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
                return db.QueryFirst<Job>(sql, parameters);
            }
        }

        public List<ServiceNeed> GetJobsNeedingService(Guid businessId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                List<Guid> customerIds = new List<Guid>();
                List<ServiceNeed> ListOfSystemsNeedingService = new List<ServiceNeed>();
                ServiceNeed SystemNeedingService = new ServiceNeed();
                // get all customers from businessId
                IEnumerable<Customer> customers = _customerRepo.GetCustomersByBusinessId(businessId);
                foreach (var customer in customers)
                { 
                    customerIds.Add(customer.Id);
                }
                //search reports by customer Id and return list of SystemId, customerId and Days leftwhere dayTankDepleted is within the week
                var sql = @"SELECT r.[SystemId], DATEDIFF(day, GETDATE(), r.[DayTankDepleted]) as DaysUntilEmpty, r.[CustomerId]
                            FROM [Report] r
                            WHERE (DATEDIFF(day, GETDATE(), r.[DayTankDepleted]) < 7) AND r.[CustomerId] in @customerIds";
                var parameters = new { customerIds };
                var systemIdsAndDaysNeedingService =  db.Query<InNeedOfServiceCheckDTO>(sql, parameters);
                foreach (var systemIdAndDate in systemIdsAndDaysNeedingService)
                {
                    SystemNeedingService.DaysUntilEmpty = systemIdAndDate.DaysUntilEmpty;
                    SystemNeedingService.Customer = _customerRepo.GetCustomerByCustomerId(systemIdAndDate.CustomerId);
                    SystemNeedingService.System = _systemRepo.GetCustomerSystemBySystemId(systemIdAndDate.SystemId);
                    ListOfSystemsNeedingService.Add(SystemNeedingService);
                }
                return ListOfSystemsNeedingService;
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
    }
}
