using CustomerServiceTracking.DataModels;
using CustomerServiceTracking.DTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.Repositories
{
    public interface IJobRepository
    {
        Job GetJobForSystemBySystemId(Guid systemId)
        List<ServiceNeed> GetJobsNeedingService(Guid businessId);
        bool AddJob(NewJobDTO newJobDTO);

    }
}
