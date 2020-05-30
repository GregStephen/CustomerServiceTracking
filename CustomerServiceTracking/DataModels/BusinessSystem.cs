using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.DataModels
{
    public class BusinessSystem
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public int Gallons { get; set; }
        public int Inches { get; set; }
    }
}
