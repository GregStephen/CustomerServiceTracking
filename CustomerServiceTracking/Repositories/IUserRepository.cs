using CustomerServiceTracking.DataModels;
using CustomerServiceTracking.DTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.Repositories
{
    public interface IUserRepository
    {
        User GetUserByFirebaseId(string firebaseId);
        bool AddNewAdminUserToDatabase(NewAdminUserDTO newUser);
        bool AddNewPersonalUserToDatabase(NewPersonalUserDTO newUser);
    }
}
