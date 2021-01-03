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

        public IEnumerable<Business> GetBusinesses()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [Business]";
                return db.Query<Business>(sql);
            }
        }

        public IEnumerable<Employee> GetRegisteredEmployees(Guid businessId) 
        { 
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT u.Id, u.FirstName + ' ' + u.LastName as FullName
                            FROM [User] u
                            JOIN [UserBusiness] ub
                            ON u.Id = ub.UserId
                            WHERE ub.BusinessId = @businessId AND u.FirebaseUId IS NOT NULL";
                var parameters = new { businessId };
                return db.Query<Employee>(sql, parameters);
            }
        }
        public List<Employee> GetAllEmployees(Guid businessId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                //List<Employee> employees = new List<Employee>();
                var sql = @"SELECT u.Id, u.FirstName + ' ' + u.LastName as FullName, 
                            CASE WHEN u.FirebaseUid IS NULL THEN CAST(0 AS BIT) ELSE CAST(1 AS BIT)
                            END as Registered
                            FROM [User] u
                            JOIN [UserBusiness] ub
                            ON u.Id = ub.UserId
                            WHERE ub.BusinessId = @businessId";
                var parameters = new { businessId };
                var registeredUsers = db.Query<Employee>(sql, parameters).ToList();
                //sql = @"SELECT ue.Id, ue.FirstName + ' ' + ue.LastName as FullName
                //        FROM [UnregisteredEmployee] ue
                //        WHERE ue.BusinessId = @businessId";
                //var unregisteredUsers = db.Query<Employee>(sql, parameters);
                //foreach (var registeredEmployee in registeredUsers)
                //{
                //    employees.Add(registeredEmployee);
                //}
                //foreach (var unregisteredEmployee in unregisteredUsers)
                //{
                //    employees.Add(unregisteredEmployee);
                //}
                return registeredUsers;
            }
        }
        public Guid AddNewBusinessToDatabase(string businessName, Guid addressId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [Business]
                            (
                             [BusinessName],
                             [AddressId]
                            )
                            OUTPUT INSERTED.Id
                            VALUES
                            (
                            @businessName,
                            @addressId
                            )";
                var parameters = new { businessName, addressId };
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
