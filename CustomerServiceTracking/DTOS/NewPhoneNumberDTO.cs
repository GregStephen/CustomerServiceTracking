using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.DTOS
{
    public class NewPhoneNumberDTO
    {
        public string Number { get; set; }
        public Guid CustomerId { get; set; }
        public PhoneNumberEnum Type { get; set; }

        public enum PhoneNumberEnum
        {
            Home = 1,
            Cell = 2,
            Office = 3
        }
    }
}
