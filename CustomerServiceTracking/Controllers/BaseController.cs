using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CustomerServiceTracking.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CustomerServiceTracking.Controllers
{

    public class BaseController : ControllerBase {
        private readonly IUserRepository _userRepo;
        public BaseController(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        protected string CurrentPropertyId => Request.Headers["property"];

        protected string CurrentUserId => _userRepo.GetUserByFirebaseId(User.FindFirst(ClaimTypes.NameIdentifier).Value).Id.ToString();
    }
}
