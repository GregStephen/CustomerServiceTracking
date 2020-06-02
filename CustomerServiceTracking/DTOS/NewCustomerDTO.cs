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
        public string OfficePhone { get; set; }
        public string HomePhone { get; set; }
        public Address NewCustomerAddress { get; set; }
        public Guid BusinessId { get; set; }
        public Guid AddressId { get; set; }
    }
}
