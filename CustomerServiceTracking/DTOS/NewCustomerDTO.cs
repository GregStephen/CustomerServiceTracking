using CustomerServiceTracking.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.DTOS
{
    public class NewCustomerDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<string> Emails { get; set; }
        public List<PhoneNumber> PhoneNumbers { get; set; }
        public Address NewCustomerAddress { get; set; }
        public Guid BusinessId { get; set; }
        public Guid AddressId { get; set; }
    }
}
