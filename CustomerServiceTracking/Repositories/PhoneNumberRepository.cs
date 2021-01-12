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
    public class PhoneNumberRepository: IPhoneNumberRepository
    {
        string _connectionString;

        public PhoneNumberRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetValue<string>("ConnectionString");
        }

        public IEnumerable<PhoneNumber> GetCustomerPhoneNumbersByCustomerId(Guid customerId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT [PhoneNumber] as Number, Type
                            FROM [PhoneNumbers]
                            WHERE [CustomerId] = @customerId";
                var parameters = new { customerId };
                var customerPhoneNumbers = db.Query<PhoneNumber>(sql, parameters);
                return customerPhoneNumbers;
            }
        }

        public bool AddNewPhoneNumberToDatabase(NewPhoneNumberDTO newPhoneNumberDTO)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [PhoneNumbers]
                            (
                                [PhoneNumber],
                                [CustomerId],
                                [Type]
                            )
                            VALUES
                            (
                                @number,
                                @customerId,
                                @type
                            )";
                return (db.Execute(sql, newPhoneNumberDTO) == 1);
            }
        }
    }
}
