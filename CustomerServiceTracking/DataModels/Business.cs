using System;

namespace CustomerServiceTracking.DataModels
{
    public class Business
    {
        public Guid Id { get; set; }
        public string BusinessName { get; set; }
        public Guid AddressId { get; set; }
        public Address Address { get; set; }
    }
}
