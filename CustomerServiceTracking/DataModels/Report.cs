using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.DataModels
{
    public class Report
    {
        public Guid Id { get; set; }
        public int AmountRemaining { get; set; }
        public Guid CustomerId { get; set; }
        public int InchesAdded { get; set; }
        public string Notes { get; set; }
        public DateTime ServiceDate { get; set; }
        public int SolutionAdded { get; set; }
        public Guid SystemId { get; set; }
        public Guid TechnicianId { get; set; }
    }
}
