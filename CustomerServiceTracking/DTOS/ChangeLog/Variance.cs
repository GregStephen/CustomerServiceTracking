using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.DTOS.ChangeLog
{
    public class Variance
    {
        public Variance(object OldVal, object NewVal)
        {
            oldValue = OldVal;
            newValue = NewVal;
        }

        public object oldValue { get; set; }
        public object newValue { get; set; }

    }

    public class Variances
    {
        public List<Dictionary<string, object>> oldValues { get; set; } = new List<Dictionary<string, object>>();
        public List<Dictionary<string, object>> newValues { get; set; } = new List<Dictionary<string, object>>();
    }
}
