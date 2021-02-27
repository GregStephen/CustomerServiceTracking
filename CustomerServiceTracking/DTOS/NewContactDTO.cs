using System;

namespace CustomerServiceTracking.DTOS
{
    public class NewContactDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool Primary { get; set; }
        public string Email { get; set; }
        public string HomePhone { get; set; }
        public string CellPhone { get; set; }
        public string WorkPhone { get; set; }
        public Guid PropertyId { get; set; }
    }
}
