using System;

namespace CustomerServiceTracking.DTOS
{
    public class NewReportDTO
    {
        public int AmountRemaining { get; set; }
        public Guid PropertyId { get; set; }
        public int InchesAdded { get; set; }
        public string Notes { get; set; }
        public DateTime ServiceDate { get; set; }
        public int SolutionAdded { get; set; }
        public Guid SystemId { get; set; }
        public Guid TechnicianId { get; set; }
        public Guid JobTypeId { get; set; }
    }
}
