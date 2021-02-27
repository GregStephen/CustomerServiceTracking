using System;
using System.Collections.Generic;

namespace CustomerServiceTracking.DataModels
{
    public class Property
    {
        public Guid Id { get; set; }
        public string DisplayName { get; set; }
        public bool Enabled { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public List<PropertySystem> Systems { get; set; }
        public List<Contact> Contacts { get; set; }

    }
}
