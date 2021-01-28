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
    public class BusinessController : Controller
    {
        private readonly ILogger<BusinessController> _logger;
        private readonly IBusinessRepository _repo;
        private readonly IUnregisteredEmployeeRepository _unregisteredEmployeeRepo;

        public BusinessController(ILogger<BusinessController> logger, IBusinessRepository repo, IUnregisteredEmployeeRepository unregisteredEmployeeRepo)
        {
            _logger = logger;
            _repo = repo;
            _unregisteredEmployeeRepo = unregisteredEmployeeRepo;
        }

        [HttpGet]
        public IActionResult GetBusinesses()
        {
            return Ok(_repo.GetBusinesses());
        }

        [HttpGet("allEmployees/{businessId}")]
        public IActionResult GetAllEmployess(Guid businessId)
        {
            return Ok(_repo.GetAllEmployees(businessId));
        }

        [HttpGet("registeredEmployees/{businessId}")]
        public IActionResult GetRegisteredEmployees(Guid businessId)
        {
            return Ok(_repo.GetRegisteredEmployees(businessId));
        }

        [HttpGet("unregisteredEmployees/{businessId}")]
        public IActionResult GetBusinessesUnRegisteredEmployees(Guid businessId)
        {
            return Ok(_unregisteredEmployeeRepo.GetUnregisteredEmployeesByBusinessId(businessId));
        }

        [HttpGet("unregisteredEmployee/email={email}/businessId={businessId}")]
        public IActionResult CheckIfBusinessHasEmailOfUnregisteredEmployee(string email, Guid businessId)
        {
            var unregisteredEmployeeId = _unregisteredEmployeeRepo.CheckIfBusinessHasEmailOfUnregisteredEmployee(email, businessId);
            if (unregisteredEmployeeId == default(Guid))
            {
                return Ok();
            }
            else
            {
                return Ok(unregisteredEmployeeId);
            }
        }

        [HttpGet("unregisteredEmployee/{id}")]
        public IActionResult GetUnregisteredEmployeeById(Guid id)
        {
            return Ok(_unregisteredEmployeeRepo.GetUnregisteredEmployeeById(id));
        }

        [HttpDelete("{unregisteredId}")]
        public IActionResult DeleteCustomer(Guid unregisteredId)
        {
            if (_unregisteredEmployeeRepo.DeleteUnregisteredEmployee(unregisteredId))
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