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

        public List<Employee> GetAllEmployees(Guid businessId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                //List<Employee> employees = new List<Employee>();
                var sql = @"SELECT u.Id, u.FirstName + ' ' + u.LastName as FullName, u.Admin
                            FROM [User] u
                            WHERE u.BusinessId = @businessId";
                var parameters = new { businessId };
                var registeredUsers = db.Query<Employee>(sql, parameters).ToList();
                return registeredUsers;
            }
        }

        public Business GetUsersBusiness(Guid businessId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [Business] 
                            WHERE  [Id] = @businessId";
                var parameters = new { businessId };
                return db.QueryFirst<Business>(sql, parameters);
            }
        }

        public List<int> GetServiceOptions(Guid businessId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT ServiceOptionId
                            FROM [ServiceOptions]
                            WHERE [BusinessId] = @businessId";
                var parameters = new { businessId };
                return db.Query<int>(sql, parameters).ToList();
            }
        }

    }
}
