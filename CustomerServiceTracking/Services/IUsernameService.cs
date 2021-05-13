using CustomerServiceTracking.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.Services
{
    public interface IUsernameService
    {
        List<ChangeLog> ApplyUserNamesToChangeLog(List<ChangeLog> Logs);
    }
}
