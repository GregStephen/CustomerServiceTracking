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
        private readonly IReportRepository _reportRepo;

        public CustomerController(ILogger<CustomerController> logger, ICustomerRepository repo, IReportRepository reportRepo)
        {
            _logger = logger;
            _repo = repo;
            _reportRepo = reportRepo;
        }

        [HttpGet("businessId/{businessId}")]
        public IActionResult GetPropertiesByBusinessId(Guid businessId)
        {
            return Ok(_repo.GetPropertiesByBusinessId(businessId));
        }

        [HttpGet("propertyId/{propertyId}")]
        public IActionResult GetPropertyByPropertyId(Guid propertyId)
        {
            var property = _repo.GetPropertyByPropertyId(propertyId);
            if (property != null)
            {
                return Ok(property);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("propertySystemId/{propertySystemId}")]
        public IActionResult GetPropertySystemByPropertySystemId(Guid propertySystemId)
        {
            var propertySystem = _repo.GetPropertySystemByPropertySystemId(propertySystemId);
            if (propertySystem != null)
            {
                return Ok(propertySystem);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        public IActionResult AddNewPropertyToDatabase(NewPropertyDTO newProperty)
        {
            if (_repo.AddNewPropertyToDatabase(newProperty))
            {
                return Created($"customer/{newProperty.Property.DisplayName}", newProperty);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("contact")]
        public IActionResult AddNewContactToDatabase(NewContactDTO newContactDTO)
        {
            if (_repo.AddNewContactToDatabase(newContactDTO))
            {
                return Created($"customer/{newContactDTO.FirstName}", newContactDTO);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("addSystem")]
        public IActionResult AddNewSystemToProperty(NewPropertySystemDTO newPropertySystemDTO)
        {
            newPropertySystemDTO.Report.SystemId = _repo.AddNewSystemToProperty(newPropertySystemDTO);

            if (newPropertySystemDTO.Report.SystemId != null)
            {
                if (_reportRepo.AddReport(newPropertySystemDTO.Report))
                {
                    return Ok();
                }
            }
            return BadRequest();
        }
        [HttpPut("updateContact")]
        public IActionResult UpdateContact(Contact updateContact)
        {
            if (_repo.UpdateContact(updateContact))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut("updateProperty")]
        public IActionResult UpdateProperty(Property updatedProperty)
        {
            if (_repo.UpdateProperty(updatedProperty))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut("updatePropertyName")]
        public IActionResult UpdatePropertyName(Property updatedProperty)
        {
            if (_repo.UpdateProperty(updatedProperty))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut("updatePropertyStatus")]
        public IActionResult UpdatePropertyStatus(Property property)
        {
            if (_repo.UpdatePropertyEnabledOrDisabled(property))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut("updatePropertySystem")]
        public IActionResult UpdatePropertySystem(PropertySystem updatePropertySystem)
        {
            if (_repo.UpdatePropertySystem(updatePropertySystem))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("contact/{contactId}")]
        public IActionResult DeleteContact(Guid contactId)
        {
            if (_repo.DeleteContact(contactId))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("propertySystem/{propertySystemId}")]
        public IActionResult DeletePropertySystem(Guid propertySystemId)
        {
            if (_repo.DeletePropertySystem(propertySystemId))
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