using CustomerServiceTracking.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.Repositories
{
    public interface IAddressRepository
    {
        public Address GetAddressByAddressId(Guid addressId);
        Guid AddNewAddressToDatabase(Address newAddress);
    }
}
