using CustomerServiceTracking.DataModels;
using CustomerServiceTracking.DTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.Repositories
{
    public interface ISystemRepository
    {
        IEnumerable<BusinessSystem> GetSystemsByBusinessId(Guid businessId);
        bool AddNewSystemToBusiness(NewSystemDTO newSystemDTO);
        bool DeleteSystemFromDatabase(Guid systemId);
        bool UpdateSystem(BusinessSystem updatedSystem);
        IEnumerable<CustomerSystem> GetCustomerSystemsByCustomerId(Guid customerId);
        BusinessSystem GetSystemInfoBySystemId(Guid systemId);

    }
}
