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
        ICustomerRepository _customerRepo;

        public ReportRepository(IConfiguration configuration, ICustomerRepository customerRepo)
        {
            _connectionString = configuration.GetValue<string>("ConnectionString");
            _customerRepo = customerRepo;
        }
        public IEnumerable<ReportToSendDTO> GetAllReportsByBusinessId(Guid businessId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT r.Id, r.AmountRemaining, r.PropertyId, r.InchesAdded, r.Notes, r.ServiceDate, r.SolutionAdded, r.SystemId, u.FirstName + ' ' + u.LastName as Technician, jt.Type as Type
                            FROM [Report] r
                            JOIN [User] u
							ON r.TechnicianId = u.Id
							JOIN [JobType] jt
							ON r.JobTypeId = jt.Id
                            WHERE u.BusinessId = @businessId";
                var parameters = new { businessId };
                var reports = db.Query<ReportToSendDTO>(sql, parameters);
                foreach (var report in reports)
                {
                    report.Property = _customerRepo.GetPropertyByPropertyId(report.PropertyId);
                }
                return reports;
            }
        }

        public IEnumerable<ReportToSendDTO> GetReportsByPropertyId(Guid propertyId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT r.Id, r.AmountRemaining, r.PropertyId, r.InchesAdded, r.Notes, r.ServiceDate, r.SolutionAdded, r.SystemId, u.FirstName + ' ' + u.LastName as Technician, jt.Type as Type
                            FROM [Report] r
                            JOIN [User] u
							ON r.TechnicianId = u.Id
							JOIN [JobType] jt
							ON r.JobTypeId = jt.Id
                            WHERE r.[PropertyId] = @propertyId";
                var parameters = new { propertyId };
                return db.Query<ReportToSendDTO>(sql, parameters);
            }
        }

        public IEnumerable<ReportToSendDTO> GetReportsByPropertySystemId(Guid propertySystemId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT r.Id, r.AmountRemaining, r.PropertyId, r.InchesAdded, r.Notes, r.ServiceDate, r.SolutionAdded, r.SystemId, u.FirstName + ' ' + u.LastName as Technician, jt.Type as Type
                            FROM [Report] r
                            JOIN [User] u
							ON r.TechnicianId = u.Id
							JOIN [JobType] jt
							ON r.JobTypeId = jt.Id
                            WHERE r.[SystemId] = @propertySystemId";
                var parameters = new { propertySystemId };
                return db.Query<ReportToSendDTO>(sql, parameters);
            }
        }

        public ReportToSendDTO GetReportById(Guid reportId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT r.Id, r.AmountRemaining, r.propertyId, r.InchesAdded, r.Notes, r.ServiceDate, r.SolutionAdded, r.SystemId, u.FirstName + ' ' + u.LastName as Technician, jt.Type as Type
                            FROM [Report] r
                            JOIN [User] u
							ON r.TechnicianId = u.Id
							JOIN [JobType] jt
							ON r.JobTypeId = jt.Id
                            WHERE r.[Id] = @reportId";
                var parameters = new { reportId };
                return db.QueryFirst<ReportToSendDTO>(sql, parameters);
            }
        }

        public bool AddReport(NewReportDTO newReportDTO)
        {
            using (var db = new SqlConnection(_connectionString))
            {

                var sql = @"INSERT INTO [Report]
                            (
                                [AmountRemaining],
                                [PropertyId],
                                [InchesAdded],
                                [JobTypeId],
                                [Notes],
                                [ServiceDate],
                                [SolutionAdded],
                                [SystemId],
                                [TechnicianId]
                            )
                            VALUES
                            (
                                @amountRemaining,
                                @propertyId,
                                @inchesAdded,
                                @jobTypeId,
                                @notes,
                                @serviceDate,
                                @solutionAdded,
                                @systemId,
                                @technicianId
                            )";
                return (db.Execute(sql, newReportDTO) == 1);
            }
        }
    }
}
