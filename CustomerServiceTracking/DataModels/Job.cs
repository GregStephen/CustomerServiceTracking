using System;

namespace CustomerServiceTracking.DataModels
{
    public class Job
    {
        public Guid Id { get; set; }
        public Guid PropertySystemId { get; set; }
        public DateTime DateAssigned { get; set; }
        public Guid TechnicianId { get; set; }
        public string TechnicianName { get; set; }
        public Guid JobTypeId { get; set; }
        public string Note { get; set; }
    }
}
