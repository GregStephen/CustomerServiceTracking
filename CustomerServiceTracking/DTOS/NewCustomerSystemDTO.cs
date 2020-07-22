using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.DTOS
{
    public class NewCustomerSystemDTO
    {
        public Guid CustomerId { get; set; }
        public DateTime InstallDate { get; set; }
        public string Notes { get; set; }
        public int Nozzles { get; set; }
        public string SerialNumber { get; set; }
        public bool Sold { get; set; }
        public int SprayCycles { get; set; }
        public int SprayDuration { get; set; }
        public Guid SystemId { get; set; }
    }
}
