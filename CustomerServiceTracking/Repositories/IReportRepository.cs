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
        IEnumerable<ReportToSendDTO> GetAllReportsByBusinessId(Guid businessId);

        IEnumerable<ReportToSendDTO> GetAllReportsByBusinessIdLastWeek(Guid businessId);

        IEnumerable<ReportToSendDTO> GetReportsByPropertyId(Guid propertyId);

        IEnumerable<ReportToSendDTO> GetReportsByPropertySystemId(Guid propertySystemId);

        IEnumerable<ReportToSendDTO> GetReportsByUserId(Guid userId);

        ReportToSendDTO GetReportById(Guid reportId);

        bool AddReport(NewReportDTO newReport);
    }
}
