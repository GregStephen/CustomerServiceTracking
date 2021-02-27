using System;

namespace CustomerServiceTracking.DTOS
{
    public class InNeedOfServiceCheckDTO
    {
        public Guid PropertyId { get; set; }
        public Guid SystemId { get; set; }
        public int DaysUntilEmpty { get; set; }
    }
}
