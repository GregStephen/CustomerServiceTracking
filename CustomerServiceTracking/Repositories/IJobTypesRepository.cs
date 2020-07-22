using CustomerServiceTracking.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.Repositories
{
    public interface IJobTypesRepository
    {
        IEnumerable<JobType> GetJobTypes();

    }
}
