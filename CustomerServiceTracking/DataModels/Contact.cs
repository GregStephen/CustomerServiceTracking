using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.DataModels
{
    public class Contact
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public bool Primary { get; set; }
        public string LastName { get; set; }
        public string HomePhone {get; set; }
        public string CellPhone { get; set; }
        public string WorkPhone { get; set; }
        public string Email { get; set; }
        public Guid PropertyId { get; set; }
    }
}
