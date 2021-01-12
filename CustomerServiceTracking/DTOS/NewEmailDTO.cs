using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.DTOS
{
    public class NewEmailDTO
    {
        public Guid CustomerId { get; set; }
        public string Email { get; set; }
    }
}
