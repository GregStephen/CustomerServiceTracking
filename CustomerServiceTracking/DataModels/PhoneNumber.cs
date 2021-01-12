using static CustomerServiceTracking.DTOS.NewPhoneNumberDTO;

namespace CustomerServiceTracking.DataModels
{
    public class PhoneNumber
    {
        public string Number { get; set; }
        public PhoneNumberEnum Type { get; set; }

    }
}
