using CustomerServiceTracking.DataModels;
using System;

namespace CustomerServiceTracking.DTOS
{
    public class JobToShow
    {
        public Guid Id { get; set; }

        public Guid PropertySystemId { get; set; }

        public PropertySystem PropertySystem { get; set; }

        public Property Property { get; set; }

        public DateTime DateAssigned { get; set; }

        public Guid TechnicianId { get; set; }

        public string TechnicianName { get; set; }

        public Guid JobTypeId { get; set; }

        public string JobType { get; set; }

        public string Note { get; set; }
    }
}
