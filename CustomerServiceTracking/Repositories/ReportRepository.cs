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
        ISystemRepository _systemRepo;

        public ReportRepository(IConfiguration configuration, ISystemRepository systemRepo)
        {
            _connectionString = configuration.GetValue<string>("ConnectionString");
            _systemRepo = systemRepo;
        }
        public IEnumerable<ReportToSendDTO> GetAllReportsByBusinessId(Guid businessId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT r.Id, r.AmountRemaining, r.CustomerId, r.InchesAdded, r.Notes, r.ServiceDate, r.SolutionAdded, r.SystemId, r.DayTankDepleted, u.FirstName + ' ' + u.LastName as Technician, jt.Type as Type
                            FROM [Report] r
                            JOIN [User] u
							ON r.TechnicianId = u.Id
							Join [UserBusiness] ub
							On u.Id = ub.UserId
							JOIN [JobType] jt
							ON r.JobTypeId = jt.Id
                            WHERE ub.BusinessId = @businessId";
                var parameters = new { businessId };
                return db.Query<ReportToSendDTO>(sql, parameters);
            }
        }

            public IEnumerable<ReportToSendDTO> GetReportsByCustomerId(Guid customerId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT r.Id, r.AmountRemaining, r.CustomerId, r.InchesAdded, r.Notes, r.ServiceDate, r.SolutionAdded, r.SystemId, r.DayTankDepleted, u.FirstName + ' ' + u.LastName as Technician, jt.Type as Type
                            FROM [Report] r
                            JOIN [User] u
							ON r.TechnicianId = u.Id
							JOIN [JobType] jt
							ON r.JobTypeId = jt.Id
                            WHERE r.[CustomerId] = @customerId";
                var parameters = new { customerId };
                return db.Query<ReportToSendDTO>(sql, parameters);
            }
        }

        private DateTime GetTheDateTheTankWillBeDepleted(NewReportDTO newReportDTO)
        {
            // How many inches of water are in the tank once the report is done
            int totalInchesInSystem = newReportDTO.AmountRemaining + newReportDTO.InchesAdded;

            // gets the exact system being checked
            CustomerSystem systemToDoMath = _systemRepo.GetCustomerSystemBySystemId(newReportDTO.SystemId);

            // 0.03 is the amount per oz that a single nozzle shoots out in a second at 200 psi
            var ozPerNozzlePerSprayDuration = systemToDoMath.SprayDuration * 0.03;
            
            //converts that to gallons
            var gallonsPerSprayDurationPerNozzle = ozPerNozzlePerSprayDuration / 128;

            // calculates how many gallons are used in a single day
            var dailyUsageInGallons = gallonsPerSprayDurationPerNozzle * systemToDoMath.SprayCycles * systemToDoMath.Nozzles;
            
            // calculates how many gallons are in a single inch of this specific tank
            var volumePerInchOfHeight = (float)systemToDoMath.SystemInfo.Gallons / (float)systemToDoMath.SystemInfo.Inches;

            // calculates the total amount of gallons in the tank once the report is done
            var totalGallonsInTank = totalInchesInSystem * volumePerInchOfHeight;

            // calculates the days remaining until all the gallons of water in the tank are gone, rounded down
            int daysUntilDepleted = (int)(totalGallonsInTank / dailyUsageInGallons);

            // Gets todays day, adds the days remaining until the tank is depleted, returns new Datetime
            var today = DateTime.Now;
            DateTime dayUntilDepleted = today.AddDays(daysUntilDepleted);
            return dayUntilDepleted;


        }

        public bool AddReport(NewReportDTO newReportDTO)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                Report newReport = new Report();

                newReport.DayTankDepleted = GetTheDateTheTankWillBeDepleted(newReportDTO);
                newReport.AmountRemaining = newReportDTO.AmountRemaining;
                newReport.CustomerId = newReportDTO.CustomerId;
                newReport.InchesAdded = newReportDTO.InchesAdded;
                newReport.JobTypeId = newReportDTO.JobTypeId;
                newReport.Notes = newReportDTO.Notes;
                newReport.ServiceDate = newReportDTO.ServiceDate;
                newReport.SolutionAdded = newReportDTO.SolutionAdded;
                newReport.SystemId = newReportDTO.SystemId;
                newReport.TechnicianId = newReportDTO.TechnicianId;

                var sql = @"INSERT INTO [Report]
                            (
                                [AmountRemaining],
                                [CustomerId],
                                [DayTankDepleted],
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
                                @customerId,
                                @dayTankDepleted,
                                @inchesAdded,
                                @jobTypeId,
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
