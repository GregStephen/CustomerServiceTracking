using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using CustomerServiceTracking.DataModels;
using Microsoft.Data.SqlClient;

namespace CustomerServiceTracking.Repositories
{
    public class AddressRepository : IAddressRepository
    {
        string _connectionString;

        public AddressRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetValue<string>("ConnectionString");
        }

        public Guid AddNewAddressToDatabase(Address newAddress)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [Address]
                            (
                             [AddressLine1],
                             [AddressLine2],
                             [City],
                             [State],
                             [ZipCode]
                            )
                            OUTPUT INSERTED.Id
                            VALUES
                            (
                            @addressLine1,
                            @addressLine2,
                            @city,
                            @state,
                            @zipcode
                            )";
                return db.QueryFirst<Guid>(sql, newAddress);
            }
        }
    }
}
