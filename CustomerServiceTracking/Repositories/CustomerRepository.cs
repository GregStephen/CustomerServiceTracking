﻿using CustomerServiceTracking.DataModels;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using CustomerServiceTracking.DTOS;

namespace CustomerServiceTracking.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        string _connectionString;
        private IAddressRepository _addressRepo;

        public CustomerRepository(IConfiguration configuration, IAddressRepository addressRepo)
        {
            _connectionString = configuration.GetValue<string>("ConnectionString");
            _addressRepo = addressRepo;
        }

        public IEnumerable<Customer> GetCustomersByBusinessId(Guid businessId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT c.*
                            FROM [BusinessCustomer] bc
                            JOIN [Customer] c
                            ON bc.[CustomerId] = c.[Id]
                            WHERE bc.[BusinessId] = @businessId";
                var parameters = new { businessId };
                var customers =  db.Query<Customer>(sql, parameters);
                foreach (var customer in customers)
                {
                    customer.Address = _addressRepo.GetAddressByAddressId(customer.AddressId);
                }
                return customers;
            }
        }
        
        public Customer GetCustomerByCustomerId(Guid customerId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [Customer]
                            WHERE [Id] = @customerId";
                var parameters = new { customerId };
                var customer = db.QueryFirstOrDefault<Customer>(sql, parameters);
                customer.Address = _addressRepo.GetAddressByAddressId(customer.AddressId);
                return customer;
            }
        }

        private bool AddCustomerToBusiness(Guid customerId, Guid businessId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [BusinessCustomer]
                            (
                                [BusinessId],
                                [CustomerId]
                            )
                            VALUES
                            (
                                @businessId,
                                @customerId
                            )";
                var parameters = new { customerId, businessId };
                return (db.Execute(sql, parameters) == 1);
            }
        }
        public bool AddNewCustomerToDatabase(NewCustomerDTO newCustomerDTO)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var addressId = _addressRepo.AddNewAddressToDatabase(newCustomerDTO.NewCustomerAddress);
                newCustomerDTO.AddressId = addressId;
                var sql = @"INSERT INTO [Customer]
                            (
                             [FirstName],
                             [LastName],
                             [HomePhone],
                             [OfficePhone],
                             [AddressId]
                            )
                            OUTPUT INSERTED.Id
                            VALUES
                            (
                            @firstName,
                            @lastName,
                            @homePhone,
                            @officePhone,
                            @addressId
                            )";
                var customerId = db.QueryFirst<Guid>(sql, newCustomerDTO);
                return AddCustomerToBusiness(customerId, newCustomerDTO.BusinessId);
            }
        }

        public bool UpdateCustomer(Customer updatedCustomer)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [Customer]
                            SET 
                                [FirstName] = @firstName,
                                [LastName] = @lastName,
                                [HomePhone] = @homePhone,
                                [OfficePhone] = @officePhone
                            WHERE [Id] = @id";
                return (db.Execute(sql, updatedCustomer) == 1);
            }
        }
    }
}