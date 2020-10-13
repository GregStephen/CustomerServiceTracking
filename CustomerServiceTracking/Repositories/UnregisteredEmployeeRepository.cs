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
    public class UnregisteredEmployeeRepository : IUnregisteredEmployeeRepository
    {
        string _connectionString;

        public UnregisteredEmployeeRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetValue<string>("ConnectionString");
        }

        public IEnumerable<UnregisteredEmployee> GetUnregisteredEmployeesByBusinessId(Guid businessId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [UnregisteredEmployee]
                            WHERE [BusinessId] = @businessId";
                var parameters = new { businessId };
                return db.Query<UnregisteredEmployee>(sql, parameters);
            }
        }

        public Guid CheckIfBusinessHasEmailOfUnregisteredEmployee(string email, Guid businessId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT [Id]
                            FROM [UnregisteredEmployee]
                            WHERE [BusinessId] = @businessId
                            AND [Email] = @email" ;
                var parameters = new { email, businessId };
                return db.QueryFirstOrDefault<Guid>(sql, parameters);
            }
        }

        public UnregisteredEmployee GetUnregisteredEmployeeById(Guid id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [UnregisteredEmployee]
                            WHERE [Id] = @id";
                var parameters = new { id };
                return db.QueryFirst<UnregisteredEmployee>(sql, parameters);
            }
        }
        public bool AddUnregisteredEmployeeToDatabase(UnregisteredEmployee userToAdd)
        {
            using (var db = new SqlConnection(_connectionString))
            {
            var sql = @"INSERT INTO [UnregisteredEmployee]
                    (
                        [FirstName],
                        [LastName],
                        [BusinessId],
                        [Email],
                        [UserId]
                    )
                    VALUES
                    (
                    @firstName,
                    @lastName,
                    @businessId,
                    @email,
                    @userId
                    )";
                    return db.Execute(sql, userToAdd) == 1;
            }
        }

        public bool DeleteUnregisteredEmployee(Guid unregisteredEmployeeId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"DELETE
                            FROM [UnregisteredEmployee]
                            WHERE [Id] = @unregisteredEmployeeId";
                var parameter = new { unregisteredEmployeeId };
                return db.Execute(sql, parameter) == 1;
            }
        }
    }
}
