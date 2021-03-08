using System;

namespace CustomerServiceTracking.DTOS
{
    public class NewPropertyModel
    {
        public string DisplayName { get; set; }
        public bool Enabled { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string BusinessId { get; set; }
    }
}
