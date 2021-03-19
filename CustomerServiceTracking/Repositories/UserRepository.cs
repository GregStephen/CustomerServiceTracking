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
        private IUnregisteredEmployeeRepository _unregisteredEmployeeRepo;

        public UserRepository(IConfiguration configuration, IBusinessRepository businessRepo, IUnregisteredEmployeeRepository unregisteredEmployeeRepo)
        {
            _connectionString = configuration.GetValue<string>("ConnectionString");
            _businessRepo = businessRepo;
            _unregisteredEmployeeRepo = unregisteredEmployeeRepo;
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
                var businessInfo = _businessRepo.GetUsersBusiness(userFromDb.BusinessId);
                userFromDb.Business = businessInfo;
                userFromDb.BusinessId = businessInfo.Id;
                userFromDb.BusinessName = businessInfo.BusinessName;
                return userFromDb;
            }
        }

        public User GetUserById(Guid userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [User]
                            WHERE [Id] = @userId";
                var parameters = new { userId };
                var userFromDb = db.QueryFirstOrDefault<User>(sql, parameters);
                var businessInfo = _businessRepo.GetUsersBusiness(userFromDb.BusinessId);
                userFromDb.Business = businessInfo;
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
                             [Admin],
                             [BusinessId]
                            )
                            VALUES
                            (
                            @firstName,
                            @lastName,
                            @firebaseUid,
                            @admin,
                            @businessId
                            )";
                return db.Execute(sql, newUser) == 1;
            }
        }
    }
}
