using CustomerServiceTracking.DataModels;
using System;

namespace CustomerServiceTracking.DTOS
{
    public class ReportToSendDTO
    {
        public Guid Id { get; set; }

        public int AmountRemaining { get; set; }

        public Guid PropertyId { get; set; }

        public Property Property { get; set; }

        public DateTime DayTankDepleted { get; set; }

        public int InchesAdded { get; set; }

        public string Notes { get; set; }

        public DateTime ServiceDate { get; set; }

        public int SolutionAdded { get; set; }

        public Guid SystemId { get; set; }

        public string SystemName { get; set; }

        public string Technician { get; set; }

        public string Type { get; set; }
    }
}
