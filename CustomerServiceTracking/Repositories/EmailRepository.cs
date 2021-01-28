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
    public class EmailRepository: IEmailRepository
    {
        string _connectionString;

        public EmailRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetValue<string>("ConnectionString");
        }

        public IEnumerable<string> GetCustomerEmailsByCustomerId(Guid customerId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT [Email]
                            FROM [Emails]
                            WHERE [CustomerId] = @customerId";
                var parameters = new { customerId };
                var customerEmails = db.Query<string>(sql, parameters);
                return customerEmails;
            }
        }

        public bool AddNewEmailToDatabase(NewEmailDTO newEmailDTO)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [Emails]
                            (
                                [Email],
                                [CustomerId]
                            )
                            VALUES
                            (
                                @email,
                                @customerId
                            )";
                return (db.Execute(sql, newEmailDTO) == 1);
            }
        }
    }
}
