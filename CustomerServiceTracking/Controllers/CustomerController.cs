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
    public class CustomerController : ControllerBase
    {
        private readonly ILogger<CustomerController> _logger;
        private readonly ICustomerRepository _repo;

        public CustomerController(ILogger<CustomerController> logger, ICustomerRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }

        [HttpGet("businessId/{businessId}")]
        public IActionResult GetCustomersByBusinessId(Guid businessId)
        {
            return Ok(_repo.GetCustomersByBusinessId(businessId));
        }

        [HttpGet("customerId/{customerId}")]
        public IActionResult GetCustomerByCustomerId(Guid customerId)
        {
            var customer = _repo.GetCustomerByCustomerId(customerId);
            if (customer != null)
            {
                return Ok(customer);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        public IActionResult AddNewCustomerToDatabase(NewCustomerDTO newCustomerDTO)
        {
            if (_repo.AddNewCustomerToDatabase(newCustomerDTO))
            {
                return Created($"customer/{newCustomerDTO.FirstName}", newCustomerDTO);
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpPut("updateCustomer")]
        public IActionResult UpdateCustomer(Customer updateCustomer)
        {
            if (_repo.UpdateCustomer(updateCustomer))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut("updateCustomerAddress")]
        public IActionResult UpdateCustomerAddress(Customer updateCustomerAddress)
        {
            if (_repo.UpdateCustomerAddress(updateCustomerAddress))
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