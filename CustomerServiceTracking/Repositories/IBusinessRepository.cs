using CustomerServiceTracking.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.Repositories
{
    public interface IBusinessRepository
    {
        IEnumerable<Business> GetBusinesses();
        IEnumerable<Employee> GetRegisteredEmployees(Guid businessId);
        List<Employee> GetAllEmployees(Guid businessId);
        Business GetUsersBusiness(Guid userId);
    }
}
