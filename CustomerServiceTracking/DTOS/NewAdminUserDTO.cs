using CustomerServiceTracking.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.DTOS
{
    public class NewAdminUserDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FirebaseUid { get; set; }
        public bool Admin { get; set; }
        public string BusinessName { get; set; }
        public Address BusinessAddress { get; set; }
    }
}
