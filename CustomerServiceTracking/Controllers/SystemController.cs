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
    public class SystemController : ControllerBase
    {
        private readonly ILogger<SystemController> _logger;
        private readonly ISystemRepository _repo;

        public SystemController(ILogger<SystemController> logger, ISystemRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }

        [HttpGet("{businessId}")]
        public IEnumerable<BusinessSystem> GetSystemsByBusinessId(Guid businessId)
        {
            return _repo.GetSystemsByBusinessId(businessId);
        }

        [HttpPost]
        public IActionResult AddNewSystemToBusiness(NewSystemDTO newSystem)
        {
            if (_repo.AddNewSystemToBusiness(newSystem))
            {
                return Created($"system/{newSystem.Type}", newSystem);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{systemId}")]
        public IActionResult DeleteSystemFromDatabase(Guid systemId)
        {
            if (_repo.DeleteSystemFromDatabase(systemId))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut("updateSystem")]
        public IActionResult UpdateSystem(BusinessSystem updateSystemDTO)
        {
            if (_repo.UpdateSystem(updateSystemDTO))
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