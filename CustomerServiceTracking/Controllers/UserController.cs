using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CustomerServiceTracking.DataModels;
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

        [HttpGet("{firebaseId}")]
        public IActionResult GetUserByFirebaseId(string firebaseId)
        {
            if (firebaseId == null)
            {
                return NotFound();
            }
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

        [HttpGet("user/{userId}")]
        public IActionResult GetUserById(Guid userId)
        {
            var user = _repo.GetUserById(userId);
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
        public IActionResult AddNewUserToDatabase(NewUserDTO newUser)
        {
            if (_repo.AddNewUserToDatabase(newUser))
            {
                return Created($"user/{newUser.FirstName}", newUser);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("updateAdmin")]
        public IActionResult UpdateUserAdmin(User userToUpdate)
        {
            if (_repo.UpdateUserAdmin(userToUpdate))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
    }
}