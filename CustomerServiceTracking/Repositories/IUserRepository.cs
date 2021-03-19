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

        User GetUserById(Guid userId);

        bool AddNewUserToDatabase(NewUserDTO newUser);

    }
}
