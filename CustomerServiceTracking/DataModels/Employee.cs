using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.DataModels
{
    public class Employee
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public bool Registered { get; set; }
    }
}
