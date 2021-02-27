using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.DataModels
{
    public class ServiceNeed
    {
        public Property Property { get; set; }
        public PropertySystem System { get; set; }
        public int DaysUntilEmpty { get; set; }
        public List<Employee> EmployeeOptions { get; set; }
        public Job Job { get; set; }
    }
}
