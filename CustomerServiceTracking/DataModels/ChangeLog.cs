using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.DataModels
{
    public class ChangeLog
    {
        public ChangeLogType Entity { get; set; }

        public string EntityId { get; set; }

        public DateTime Timestamp { get; set; }

        public string Username { get; set; }

        public string Delta { get; set; }
    }

    public enum ChangeLogType : byte
    {
        Property = 1,
        PropertySystem,
        Contact
    }
}
