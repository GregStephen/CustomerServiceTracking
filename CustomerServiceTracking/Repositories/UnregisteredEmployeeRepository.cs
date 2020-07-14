using CustomerServiceTracking.DataModels;
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
    }
}
