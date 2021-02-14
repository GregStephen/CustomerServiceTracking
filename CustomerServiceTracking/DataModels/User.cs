using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.DataModels
{
    public class User
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool Admin { get; set; }
        public string BusinessName { get; set; }
        public Guid BusinessId { get; set; }
        public Business Business { get; set; }
    }
}
