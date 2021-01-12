using CustomerServiceTracking.DTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.Repositories
{
    public interface IEmailRepository
    {

        IEnumerable<string> GetCustomerEmailsByCustomerId(Guid customerId);
        bool AddNewEmailToDatabase(NewEmailDTO newEmailDTO);

    }
}
