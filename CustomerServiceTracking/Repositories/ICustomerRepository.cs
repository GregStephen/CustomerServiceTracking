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
        Customer GetCustomerByCustomerId(Guid customerId);
        CustomerSystem GetCustomerSystemByCustomerSystemId(Guid customerSystemId);
        bool AddNewCustomerToDatabase(NewCustomerDTO newCustomerDTO);
        bool AddNewSystemToCustomer(NewCustomerSystemDTO newCustomerSystemDTO);
        bool UpdateCustomer(Customer updatedCustomer);
        bool UpdateCustomerAddress(Customer updatedCustomerAddress);
        bool DeleteCustomer(Guid customerId);
        bool DeleteCustomerSystem(Guid customerSystemId);
    }
}
