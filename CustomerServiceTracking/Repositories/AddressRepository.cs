using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using CustomerServiceTracking.DataModels;
using Microsoft.Data.SqlClient;
using CustomerServiceTracking.DTOS;

namespace CustomerServiceTracking.Repositories
{
    public class AddressRepository : IAddressRepository
    {
        string _connectionString;

        public AddressRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetValue<string>("ConnectionString");
        }

        public Address GetAddressByAddressId(Guid addressId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [Address]
                            WHERE [Id] = @addressId";
                var parameters = new { addressId };
                return db.QueryFirst<Address>(sql, parameters);
            }    
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

        public bool UpdateCustomerAddress(Customer updatedCustomerAddress)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var parameters = new
                {
                    addressLine1 = updatedCustomerAddress.Address.AddressLine1,
                    addressLine2 = updatedCustomerAddress.Address.AddressLine2,
                    city = updatedCustomerAddress.Address.City,
                    state = updatedCustomerAddress.Address.State,
                    zipCode = updatedCustomerAddress.Address.ZipCode,
                    addressId = updatedCustomerAddress.AddressId
                };
                var sql = @"UPDATE [Address]
                            SET 
                                [AddressLine1] = @addressLine1,
                                [AddressLine2] = @addressLine2,
                                [City] = @city,
                                [State] = @state,
                                [ZipCode] = @zipcode
                            WHERE [Id] = @addressId";
                return (db.Execute(sql, parameters) == 1);
            }
        }
    }
}
