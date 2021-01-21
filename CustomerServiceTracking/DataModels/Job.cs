using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.DataModels
{
    public class Job
    {
        public Guid Id { get; set; }
        public Guid CustomerSystemId { get; set; }
        public DateTime DateAssigned { get; set; }
        public Guid TechnicianId { get; set; }
        public string TechnicianName { get; set; }
        public Guid JobTypeId { get; set; }
        public string Note { get; set; }
    }
}
