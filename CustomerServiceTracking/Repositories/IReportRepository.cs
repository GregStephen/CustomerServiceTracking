using CustomerServiceTracking.DataModels;
using CustomerServiceTracking.DTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.Repositories
{
    public interface IReportRepository
    {
        IEnumerable<ReportToSendDTO> GetReportsByCustomerId(Guid customerId);
        bool AddReport(NewReportDTO newReport);
    }
}
