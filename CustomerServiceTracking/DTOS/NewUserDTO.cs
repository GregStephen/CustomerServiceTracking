using System;

namespace CustomerServiceTracking.DTOS
{
    public class NewUserDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FirebaseUid { get; set; }
        public bool Admin { get; set; }
        public Guid BusinessId { get; set; }
    }
}
