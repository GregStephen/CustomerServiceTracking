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
    public class JobTypesRepository : IJobTypesRepository
    {
        string _connectionString;

        public JobTypesRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetValue<string>("ConnectionString");
        }

        public IEnumerable<JobType> GetJobTypes()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [JobType]";
                return db.Query<JobType>(sql);
            }
        }

        public JobType GetJobTypeById(Guid id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [JobType]
                            WHERE [Id] = @id";
                var parameters = new { id };
                return db.QueryFirst<JobType>(sql, parameters);
            }
        }
    }
}
