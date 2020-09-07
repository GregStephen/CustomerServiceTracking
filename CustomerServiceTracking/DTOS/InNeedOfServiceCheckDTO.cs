using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.DTOS
{
    public class InNeedOfServiceCheckDTO
    {
        public Guid CustomerId { get; set; }
        public Guid SystemId { get; set; }
        public int DaysUntilEmpty { get; set; }
    }
}
