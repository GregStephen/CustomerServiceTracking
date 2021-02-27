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
                var sql = @"SELECT *
                            FROM [System]
                            WHERE [BusinessId] = @businessId";
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
        public IEnumerable<PropertySystem> GetPropertySystemsByPropertyId(Guid propertyId)
        {
            using (var db = new SqlConnection(_connectionString))
                {
                var sql = @"SELECT *
                            FROM [PropertySystem]
                            WHERE [PropertyId] = @propertyId";
                var parameters = new { propertyId };
                var propertySystems = db.Query<PropertySystem>(sql, parameters);
                foreach (var system in propertySystems)
                {
                    system.SystemInfo = GetSystemInfoBySystemId(system.SystemId);
                }
                return propertySystems;
            }
        }

        public PropertySystem GetPropertySystemBySystemId(Guid systemId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [PropertySystem]
                            WHERE [Id] = @systemId";
                var parameters = new { systemId };
                var propertySystem = db.QueryFirst<PropertySystem>(sql, parameters);
                propertySystem.SystemInfo = GetSystemInfoBySystemId(propertySystem.SystemId);
                return propertySystem;
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
                             [Inches],
                             [BusinessId]
                            )
                            VALUES
                            (
                            @type,
                            @gallons,
                            @inches,
                            @businessId
                            )";
                return db.Execute(sql, newSystemDTO) == 1;
            }
        }

        public bool DeleteSystemFromDatabase(Guid systemId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
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
