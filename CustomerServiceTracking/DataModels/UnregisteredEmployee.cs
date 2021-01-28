using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.DataModels
{
    public class UnregisteredEmployee
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid BusinessId { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
    }
}
