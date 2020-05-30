using CustomerServiceTracking.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.Repositories
{
    public interface IBusinessRepository
    {
        Guid AddNewBusinessToDatabase(string businessName, Guid addressId);
        bool AddUserToBusiness(Guid userId, Guid businessId);
        Business GetUsersBusiness(Guid userId);
    }
}
