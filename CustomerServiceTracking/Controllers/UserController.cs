using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CustomerServiceTracking.DTOS;
using CustomerServiceTracking.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CustomerServiceTracking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : FirebaseEnabledController
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserRepository _repo;

        public UserController(ILogger<UserController> logger, IUserRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }

        [HttpGet("uid/{firebaseId}")]
        public IActionResult GetUserByFirebaseId(string firebaseId)
        {
            var user = _repo.GetUserByFirebaseId(firebaseId);
            if (user == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(user);
            }
        }

        [HttpPost]
        public IActionResult AddNewAdminUserToDatabase(NewAdminUserDTO newUser)
        {
            if (_repo.AddNewAdminUserToDatabase(newUser))
            {
                return Created($"user/{newUser.FirstName}", newUser);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("personal")]
        public IActionResult AddNewPersonalUserToDatabase(NewPersonalUserDTO newUser)
        {
            if (_repo.AddNewPersonalUserToDatabase(newUser))
            {
                return Created($"user/personal/{newUser.FirstName}", newUser);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}