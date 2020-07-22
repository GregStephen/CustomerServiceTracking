using CustomerServiceTracking.DataModels;
using CustomerServiceTracking.DTOS;
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

        public IEnumerable<ReportToSendDTO> GetReportsByCustomerId(Guid customerId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT r.Id, r.AmountRemaining, r.CustomerId, r.InchesAdded, r.Notes, r.ServiceDate, r.SolutionAdded, r.SystemId, u.FirstName + ' ' + u.LastName as Technician, jt.Type as Type
                            FROM [Report] r
                            JOIN [User] u
							ON r.TechnicianId = u.Id
							JOIN [JobType] jt
							ON r.JobTypeId = jt.Id
                            WHERE [CustomerId] = @customerId";
                var parameters = new { customerId };
                return db.Query<ReportToSendDTO>(sql, parameters);
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
