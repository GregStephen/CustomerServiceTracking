using CustomerServiceTracking.DataModels;
using CustomerServiceTracking.DTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.Repositories
{
    public interface ICustomerRepository
    {
        IEnumerable<Customer> GetCustomersByBusinessId(Guid businessId);
        bool AddNewCustomerToDatabase(NewCustomerDTO newCustomerDTO);
    }
}
