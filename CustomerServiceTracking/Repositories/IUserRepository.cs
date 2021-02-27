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

        Guid AddNewUserToDatabase(User newUser);
        //bool AddNewAdminUserToDatabase(NewAdminUserDTO newUser);
        //Guid AddNewPersonalUserToDatabase(NewPersonalUserDTO newUser);
        //bool AddUnregisteredEmployeeToDatabase(NewUnregisteredEmployeeDTO unregisteredEmployee);
        //bool UpdateUnregisteredUserToRegisteredUser(NewPersonalUserDTO newUser);

    }
}
