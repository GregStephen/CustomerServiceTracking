using CustomerServiceTracking.DTOS.ChangeLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace CustomerServiceTracking.Helpers
{
    public static class ChangeLogHelper
    {
        public static Dictionary<string, Variance> MakeChangeLog(ChangeLogLabel Label, Variance Delta)
        {
            var result = new Dictionary<string, Variance>();
            result.Add(Label.ToString(), Delta);
            return result;
        }

        public static Dictionary<string, Variances> MakeChangeLog(ChangeLogLabel Label, Variances Delta)
        {
            var result = new Dictionary<string, Variances>();
            result.Add(Label.ToString(), Delta);
            return result;
        }

        public static Dictionary<string, Variance> DetailedCompare<T>(this T oldObject, T newObject)
        {
            Dictionary<string, Variance> variances = new Dictionary<string, Variance>();
            PropertyInfo[] props = oldObject.GetType().GetProperties();
            foreach (PropertyInfo prop in props)
            {
                if (prop.PropertyType == typeof(DateTime))
                {
                    var oldDate = (DateTime)prop.GetValue(oldObject);
                    var newDate = (DateTime)prop.GetValue(newObject);
                    if ((newDate - oldDate).TotalMinutes > 1)
                    {
                        variances.Add(prop.Name, new Variance(oldDate, newDate));
                    }
                } else
                {
                    var oldVal = prop.GetValue(oldObject);
                    var newVal = prop.GetValue(newObject);
                    if (!Equals(oldVal, newVal))
                    {
                        variances.Add(prop.Name, new Variance(oldVal, newVal));
                    }
                }
            }
            return variances;
        }

        public static Dictionary<string, object> GetDetails<T>(this T thing)
        {
            Dictionary<string, object> details = new Dictionary<string, object>();
            PropertyInfo[] props = thing.GetType().GetProperties();
            foreach (PropertyInfo prop in props)
            {
                var val = prop.GetValue(thing);
                if (val != null && val.ToString() != "")
                {
                    details.Add(prop.Name, prop.GetValue(thing));
                }
            }
            return details;
        }
    }

    public enum ChangeLogLabel
    {
        Address,
        PropertyName,
        Active,
        SystemSpecs,
        Contact,
        System,
    }
}
