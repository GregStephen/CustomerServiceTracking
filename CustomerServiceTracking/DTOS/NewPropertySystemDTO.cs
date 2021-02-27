using System;

namespace CustomerServiceTracking.DTOS
{
    public class NewPropertySystemDTO
    {
        public Guid PropertyId { get; set; }
        public DateTime InstallDate { get; set; }
        public string Notes { get; set; }
        public int Nozzles { get; set; }
        public string SerialNumber { get; set; }
        public bool Sold { get; set; }
        public int SprayCycles { get; set; }
        public int SprayDuration { get; set; }
        public Guid SystemId { get; set; }
        public DateTime DayTankDepleted { get; set; }
    }
}
