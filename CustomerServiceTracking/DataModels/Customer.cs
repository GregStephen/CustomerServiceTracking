using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.DataModels
{
    public class Customer
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<PhoneNumber> PhoneNumbers {get; set; }
        public List<string> Emails { get; set; }
        public Guid AddressId { get; set; }
        public Address Address { get; set; }
        public List<CustomerSystem> Systems { get; set; }
    }
}
