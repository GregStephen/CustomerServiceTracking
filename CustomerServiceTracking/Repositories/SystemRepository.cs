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
    public class SystemRepository : ISystemRepository
    {
        string _connectionString;

        public SystemRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetValue<string>("ConnectionString");
        }

        public IEnumerable<BusinessSystem> GetSystemsByBusinessId(Guid businessId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT s.*
                            FROM [BusinessSystem] bs
                            JOIN [System] s
                            ON bs.[SystemId] = s.[Id]
                            WHERE bs.[BusinessId] = @businessId";
                var parameters = new { businessId };
               return db.Query<BusinessSystem>(sql, parameters);
            }
        }
        public BusinessSystem GetSystemInfoBySystemId(Guid systemId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [System]
                            WHERE [Id] = @systemId";
                var parameters = new { systemId };
                return db.QueryFirst<BusinessSystem>(sql, parameters);
            }
        }
        public IEnumerable<CustomerSystem> GetCustomerSystemsByCustomerId(Guid customerId)
        {
            using (var db = new SqlConnection(_connectionString))
                {
                var sql = @"SELECT *
                            FROM [CustomerSystem]
                            WHERE [CustomerId] = @customerId";
                var parameters = new { customerId };
                var customerSystems = db.Query<CustomerSystem>(sql, parameters);
                foreach (var system in customerSystems)
                {
                    system.SystemInfo = GetSystemInfoBySystemId(system.SystemId);
                }
                return customerSystems;
            }
        }

        public CustomerSystem GetCustomerSystemBySystemId(Guid systemId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [CustomerSystem]
                            WHERE [Id] = @systemId";
                var parameters = new { systemId };
                var customerSystem = db.QueryFirst<CustomerSystem>(sql, parameters);
                customerSystem.SystemInfo = GetSystemInfoBySystemId(customerSystem.SystemId);
                return customerSystem;
            }
        }

        private bool ConnectSystemToBusiness(Guid systemId, Guid businessId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [BusinessSystem]
                            (
                            [SystemId],
                            [BusinessId]
                            )
                            VALUES
                            (
                            @systemId,
                            @businessId
                            )";
                var parameters = new { systemId, businessId };
                return (db.Execute(sql, parameters) == 1);
            }
        }
        public bool AddNewSystemToBusiness(NewSystemDTO newSystemDTO)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [System]
                            (
                             [Type],
                             [Gallons],
                             [Inches]
                            )
                            OUTPUT INSERTED.Id
                            VALUES
                            (
                            @type,
                            @gallons,
                            @inches
                            )";
                var systemId = db.QueryFirstOrDefault<Guid>(sql, newSystemDTO);
                return ConnectSystemToBusiness(systemId, newSystemDTO.BusinessId);
            }
        }

        private bool DeleteSystemBusinessConnection(Guid systemId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"DELETE
                            FROM [BusinessSystem]
                            WHERE [SystemId] = @systemId";
                var parameters = new { systemId };

                return (db.Execute(sql, parameters) == 1);
            }
        }
        public bool DeleteSystemFromDatabase(Guid systemId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                DeleteSystemBusinessConnection(systemId);
                var sql = @"DELETE
                            FROM [System]
                            WHERE [Id] = @systemId";
                var parameters = new { systemId };
                
                 return (db.Execute(sql, parameters) == 1);
            }
        }

        public bool UpdateSystem(BusinessSystem updatedSystem)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [System]
                            SET 
                                [Type] = @type,
                                [Gallons] = @gallons,
                                [Inches] = @inches
                            WHERE [Id] = @id";
                return (db.Execute(sql, updatedSystem) == 1);
            }
        }
    }
}
