using CustomerServiceTracking.DataModels;
using System;

namespace CustomerServiceTracking.DTOS
{
    public class NewPropertySystemDTO
    {
        public PropertySystem System { get; set; }
        public NewReportDTO Report { get; set; }
    }
}
