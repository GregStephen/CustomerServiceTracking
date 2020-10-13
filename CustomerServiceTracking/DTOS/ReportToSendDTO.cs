using CustomerServiceTracking.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.DTOS
{
    public class ReportToSendDTO
    {
        public Guid Id { get; set; }
        public int AmountRemaining { get; set; }
        public Guid CustomerId { get; set; }
        public Customer Customer { get; set; }
        public DateTime DayTankDepleted { get; set; }
        public int InchesAdded { get; set; }
        public string Notes { get; set; }
        public DateTime ServiceDate { get; set; }
        public int SolutionAdded { get; set; }
        public Guid SystemId { get; set; }
        public string Technician { get; set; }
        public string Type { get; set; }
    }
}
