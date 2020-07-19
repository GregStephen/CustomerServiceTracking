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
    public class ReportRepository : IReportRepository
    {
        string _connectionString;

        public ReportRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetValue<string>("ConnectionString");
        }

        public IEnumerable<Report> GetReportByCustomerId(Guid customerId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [Report] 
                            WHERE [CustomerId] = @customerId";
                var parameters = new { customerId };
                return db.Query<Report>(sql, parameters);
            }
        }

        public bool AddReport(Report newReport)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [Report]
                            (
                                [AmountRemaining],
                                [CustomerId],
                                [InchesAdded],
                                [Notes],
                                [ServiceDate],
                                [SolutionAdded],
                                [SystemId],
                                [TechnicianId]
                            )
                            VALUES
                            (
                                @amountRemaining,
                                @customerId,
                                @inchesAdded,
                                @notes,
                                @serviceDate,
                                @solutionAdded,
                                @systemId,
                                @technicianId
                            )";
                return (db.Execute(sql, newReport) == 1);
            }
        }
    }
}
