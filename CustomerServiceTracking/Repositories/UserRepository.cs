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
        public Guid AddNewUserToDatabase(User newUser)
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
                            OUTPUT INSERTED.Id
                            VALUES
                            (
                            @firstName,
                            @lastName,
                            @firebaseUid,
                            @admin,
                            @businessId
                            )";
                return (db.QueryFirst<Guid>(sql, newUser));
            }
        }

        //public bool AddUnregisteredEmployeeToDatabase(NewUnregisteredEmployeeDTO unregisteredEmployee)
        //{
        //    using (var db = new SqlConnection(_connectionString))
        //    {
        //        var personalUser = new NewPersonalUserDTO
        //        {
        //            BusinessId = unregisteredEmployee.BusinessId,
        //            FirstName = unregisteredEmployee.FirstName,
        //            LastName = unregisteredEmployee.LastName,
        //            FirebaseUid = null,
        //            Admin = false,
        //        };
        //        var userId = AddNewPersonalUserToDatabase(personalUser);
        //        if (userId != null)
        //        {
        //            var userToAdd = new UnregisteredEmployee
        //            {
        //                FirstName = unregisteredEmployee.FirstName,
        //                LastName = unregisteredEmployee.LastName,
        //                BusinessId = unregisteredEmployee.BusinessId,
        //                UserId = userId,
        //                Email = unregisteredEmployee.Email
        //            };
        //            return (_unregisteredEmployeeRepo.AddUnregisteredEmployeeToDatabase(userToAdd));

        //        }
        //        return false;
        //    }
        //}
        //public bool UpdateUnregisteredUserToRegisteredUser(NewPersonalUserDTO newUser)
        //{
        //    using (var db = new SqlConnection(_connectionString))
        //    {
        //        var sql = @"UPDATE [User]
        //                    SET [FirebaseUid] = @firebaseUid,
        //                    [FirstName] = @firstName,
        //                    [LastName] = @lastName
        //                    WHERE [Id] = @userId";
        //        db.Execute(sql, newUser);
        //        return (_unregisteredEmployeeRepo.DeleteUnregisteredEmployee(newUser.UnregisteredUserId));
        //    }
        //}
    }
}
