using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.DTOS
{
    public class NewSystemDTO
    {
        public string Type { get; set; }
        public int Gallons { get; set; }
        public int Inches { get; set; }
        public Guid BusinessId { get; set; }
    }
}
