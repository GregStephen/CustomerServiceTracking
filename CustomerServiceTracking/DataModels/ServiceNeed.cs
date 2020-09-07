using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.DataModels
{
    public class ServiceNeed
    {
        public Customer Customer { get; set; }
        public CustomerSystem System { get; set; }
        public int DaysUntilEmpty { get; set; }
    }
}
