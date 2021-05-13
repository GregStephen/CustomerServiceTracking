using CustomerServiceTracking.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.Helpers
{
    public static class Extensions
    {
        public static string GetUserName(this User User)
        {
            if (User != null)
            {
                return $"{User.FirstName} {User.LastName}";
            }
            return "";
        }
    }
}
