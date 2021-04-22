using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.DTOS
{
    public class NewJobDTO
    {
        public Guid PropertySystemId { get; set; }
        public DateTime DateAssigned { get; set; }
        public Guid TechnicianId { get; set; }
        public Guid JobTypeId { get; set; }
        public Guid BusinessId { get; set; }
        public string Note { get; set; }
        public bool IncludeOtherSystems { get; set; }
        public bool IncludeNotes { get; set; }
        public List<Guid> OtherSystemIds { get; set; }
    }
}
