using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.DataModels
{
    public class CustomerSystem
    {
        public Guid Id { get; set; }
        public Guid CustomerId { get; set; }
        public DateTime InstallDate { get; set; }
        public int Nozzles { get; set; }
        public string SerialNumber { get; set; }
        public bool Sold { get; set; }
        public int SprayCycles { get; set; }
        public int SprayDuration { get; set; }
        public Guid SystemId { get; set; }
        public string Type { get; set; }
        public int Gallons { get; set; }
        public int Inches { get; set; }

    }
}
