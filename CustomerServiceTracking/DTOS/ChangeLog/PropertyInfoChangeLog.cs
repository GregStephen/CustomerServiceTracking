using CustomerServiceTracking.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.DTOS.ChangeLog
{
    public class PropertyInfoChangeLog
    {
        public PropertyInfoChangeLog(Property property)
        {
            Id = property.Id;
            DisplayName = property.DisplayName;
            Enabled = property.Enabled;
        }

        public Guid Id { get; set; }

        public string DisplayName { get; set; }

        public bool Enabled { get; set; }
    }
}
