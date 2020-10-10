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
        Job GetJobForSystemBySystemId(Guid systemId);
        List<ServiceNeed> GetJobsNeedingService(Guid businessId);
        IEnumerable<JobToShow> GetJobsAssignedTo(Guid employeeId);
        bool AddJob(NewJobDTO newJobDTO);
        bool DeleteJob(Guid jobId);

    }
}
