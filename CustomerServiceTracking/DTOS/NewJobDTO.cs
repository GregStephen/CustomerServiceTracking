using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.DTOS
{
    public class NewJobDTO
    {
        public Guid CustomerSystemId { get; set; }
        public DateTime DateAssigned { get; set; }
        public Guid TechnicianId { get; set; }
        public Guid JobTypeId { get; set; }
    }
}
