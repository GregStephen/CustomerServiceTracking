using CustomerServiceTracking.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.DTOS
{
    public class JobToShow
    {
        public Guid Id { get; set; }
        public Guid CustomerSystemId { get; set; }
        public CustomerSystem CustomerSystem { get; set; }
        public Customer Customer { get; set; }
        public DateTime DateAssigned { get; set; }
        public Guid TechnicianId { get; set; }
        public Guid JobTypeId { get; set; }
        public JobType JobType { get; set; }
        public string Note { get; set; }
    }
}
