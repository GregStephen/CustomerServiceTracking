using CustomerServiceTracking.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using Dapper;
using CustomerServiceTracking.DTOS;

namespace CustomerServiceTracking.Repositories
{
    public class UserRepository : IUserRepository
    {
        string _connectionString;
        private IBusinessRepository _businessRepo;

        public UserRepository(IConfiguration configuration, IBusinessRepository businessRepo)
        {
            _connectionString = configuration.GetValue<string>("ConnectionString");
            _businessRepo = businessRepo;
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
                var businessInfo = _businessRepo.GetUsersBusiness(userFromDb.Id);
                userFromDb.BusinessId = businessInfo.Id;
                userFromDb.BusinessName = businessInfo.BusinessName;
                return userFromDb;
            }
        }

        public bool AddNewUserToDatabase(NewUserDTO newUser)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [User]
                            (
                             [FirstName],
                             [LastName],
                             [FirebaseUid],
                             [Admin]
                            )
                            OUTPUT INSERTED.Id
                            VALUES
                            (
                            @firstName,
                            @lastName,
                            @firebaseUid,
                            @admin
                            )";
                var userId = db.QueryFirst<Guid>(sql, newUser);
                if (newUser.Admin)
                {
                    var businessId = _businessRepo.AddNewBusinessToDatabase(newUser.BusinessName);
                    return (_businessRepo.AddUserToBusiness(userId, businessId));
                }

                return (_businessRepo.AddUserToBusiness(userId, newUser.BusinessId));
            }
        }
    }
}
