using CustomerServiceTracking.DataModels;
using CustomerServiceTracking.DTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.Repositories
{
    public interface IPhoneNumberRepository
    {
        IEnumerable<PhoneNumber> GetCustomerPhoneNumbersByCustomerId(Guid customerId);
        bool AddNewPhoneNumberToDatabase(NewPhoneNumberDTO newPhoneNumberDTO);
    }
}
