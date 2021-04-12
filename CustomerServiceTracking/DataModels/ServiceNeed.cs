using System.Collections.Generic;

namespace CustomerServiceTracking.DataModels
{
    public class ServiceNeed
    {
        public Property Property { get; set; }
        public PropertySystem System { get; set; }
        public int DaysUntilServiceDate { get; set; }
        public List<Employee> EmployeeOptions { get; set; }
        public Job Job { get; set; }
    }
}
