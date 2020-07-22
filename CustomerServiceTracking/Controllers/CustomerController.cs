﻿using System;
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

        [HttpGet("customerSystemId/{customerSystemId}")]
        public IActionResult GetCustomerSystemByCustomerSystemId(Guid customerSystemId)
        {
            var customerSystem = _repo.GetCustomerSystemByCustomerSystemId(customerSystemId);
            if (customerSystem != null)
            {
                return Ok(customerSystem);
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

        [HttpPost("addSystem")]
        public IActionResult AddNewSystemToCustomer(NewCustomerSystemDTO newCustomerSystemDTO)
        {
            var customerSystemId = _repo.AddNewSystemToCustomer(newCustomerSystemDTO);
            if (customerSystemId != null)
            {
                return Ok(customerSystemId);
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

        [HttpPut("updateCustomerSystem")]
        public IActionResult UpdateCustomerSystem(CustomerSystem updateCustomerSystem)
        {
            if (_repo.UpdateCustomerSystem(updateCustomerSystem))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{customerId}")]
        public IActionResult DeleteCustomer(Guid customerId)
        {
            if (_repo.DeleteCustomer(customerId))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("customerSystem/{customerSystemId}")]
        public IActionResult DeleteCustomerSystem(Guid customerSystemId)
        {
            if (_repo.DeleteCustomerSystem(customerSystemId))
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