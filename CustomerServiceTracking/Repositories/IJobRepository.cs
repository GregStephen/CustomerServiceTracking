using CustomerServiceTracking.DataModels;
using CustomerServiceTracking.DTOS;
using System;
using System.Collections.Generic;

namespace CustomerServiceTracking.Repositories
{
    public interface IJobRepository
    {
        Job GetJobForSystemBySystemId(Guid systemId);
        List<ServiceNeed> GetJobsNeedingService(Guid businessId, int amountOfDays);
        IEnumerable<JobToShow> GetJobs(Guid businessId);
        IEnumerable<JobToShow> GetJobsAssignedTo(Guid employeeId);
        bool AddJob(NewJobDTO newJobDTO);
        bool EditJob(Job updatedJobDTO);
        bool DeleteJob(Guid jobId);

    }
}
