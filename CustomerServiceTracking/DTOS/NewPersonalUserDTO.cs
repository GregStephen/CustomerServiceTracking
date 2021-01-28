using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.DTOS
{
    public class NewPersonalUserDTO
    {
        public Guid UnregisteredUserId { get; set; }
        public Guid UserId { get; set; }
        public Guid BusinessId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FirebaseUid { get; set; }
        public bool Admin { get; set; }
    }
}
