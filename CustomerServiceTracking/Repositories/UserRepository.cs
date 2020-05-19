using CustomerServiceTracking.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using Dapper;

namespace CustomerServiceTracking.Repositories
{
    public class UserRepository : IUserRepository
    {
        string _connectionString;

        public UserRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetValue<string>("ConnectionString");
        }

        public User GetUserByFirebaseId(string firebaseId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [User]
                            WHERE [FirebaseUid] = @firebaseId";
                var parameters = new { firebaseId };
                var userFromDb = db.QueryFirstOrDefault<User>(sql, parameters);
                return userFromDb;
            }
        }
    }
}
