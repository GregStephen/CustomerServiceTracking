using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CustomerServiceTracking.DataModels;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace CustomerServiceTracking.Repositories
{
    public class BusinessRepository : IBusinessRepository
    {
        string _connectionString;

        public BusinessRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetValue<string>("ConnectionString");
        }

        public Guid AddNewBusinessToDatabase(string businessName)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [Business]
                            (
                             [BusinessName]
                            )
                            OUTPUT INSERTED.Id
                            VALUES
                            (
                            @businessName
                            )";
                var parameters = new { businessName };

                var businessId = db.QueryFirst<Guid>(sql, parameters);
                return businessId;
            }
        }

        public bool AddUserToBusiness(Guid userId, Guid businessId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [UserBusiness]
                            (
                             [UserId],
                             [BusinessId]
                            )
                            VALUES
                            (
                            @userId,
                            @businessId
                            )";
                var parameters = new { userId, businessId };
                return (db.Execute(sql, parameters) == 1);
            }
        }

        public Business GetUsersBusiness(Guid userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT b.[Id], b.[BusinessName]
                            FROM [UserBusiness] u
                            JOIN [Business] b
                            ON b.[Id] = u.[BusinessId]
                            WHERE u.[UserId] = @userId";
                var parameters = new { userId };
                return db.QueryFirst<Business>(sql, parameters);
            }
        }

    }
}
