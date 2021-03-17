using System;

namespace CustomerServiceTracking.DataModels
{
    public class Employee
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public bool Admin { get; set; }
    }
}
