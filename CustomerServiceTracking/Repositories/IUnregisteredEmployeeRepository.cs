using CustomerServiceTracking.DataModels;
using CustomerServiceTracking.DTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.Repositories
{
    public interface IUnregisteredEmployeeRepository
    {
        IEnumerable<UnregisteredEmployee> GetUnregisteredEmployeesByBusinessId(Guid businessId);
        Guid CheckIfBusinessHasEmailOfUnregisteredEmployee(string email, Guid businessId);
        UnregisteredEmployee GetUnregisteredEmployeeById(Guid id);
        bool AddUnregisteredEmployeeToDatabase(UnregisteredEmployee userToAdd);
        bool DeleteUnregisteredEmployee(Guid unregisteredEmployeeId);
    }
}
