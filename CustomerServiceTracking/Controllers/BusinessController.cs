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