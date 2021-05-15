using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CustomerServiceTracking.DataModels;
using CustomerServiceTracking.DTOS;
using CustomerServiceTracking.DTOS.ChangeLog;
using CustomerServiceTracking.Helpers;
using CustomerServiceTracking.Repositories;
using CustomerServiceTracking.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CustomerServiceTracking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : BaseController
    {
        private readonly ILogger<CustomerController> _logger;
        private readonly ICustomerRepository _repo;
        private readonly IReportRepository _reportRepo;
        private readonly IChangeLogRepository _changeLogRepo;
        private readonly IUserRepository _userRepo;
        private readonly IUsernameService _usernameService;

        public CustomerController(ILogger<CustomerController> logger, ICustomerRepository repo, IReportRepository reportRepo, IChangeLogRepository changeLogRepo, IUserRepository userRepo, IUsernameService usernameService) : base(userRepo)
        {
            _logger = logger;
            _repo = repo;
            _reportRepo = reportRepo;
            _changeLogRepo = changeLogRepo;
            _userRepo = userRepo;
            _usernameService = usernameService;
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

        [HttpGet("changeLog/{propertyId}")]
        public IActionResult GetPropertyChangeLog(Guid propertyId)
        {
            var changeLog = _changeLogRepo.GetChangeLog(propertyId, ChangeLogType.Property);
            return Ok(_usernameService.ApplyUserNamesToChangeLog(changeLog.ToList()));
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
                //var changes = new Dictionary<string, Variance>();
                //changes.Add(nameof(Property.DisplayName), new Variance({ }, updatedProperty.DisplayName));
                //_changeLogRepo.InsertChangeLog(ChangeLogType.Property, updatedProperty.Id.ToString(), CurrentUserId, changes);
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
        public async Task<IActionResult> UpdateContact(Contact updateContact)
        {
            var oldCustomer = await _repo.GetContactById(updateContact.Id);
            if (_repo.UpdateContact(updateContact))
            {
                
                //_changeLogRepo.InsertChangeLog(ChangeLogType.Property, updatedProperty.Id.ToString(), CurrentUserId, changes);
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
            if (_repo.UpdatePropertyAddress(updatedProperty))
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
            var oldProperty = _repo.GetPropertyByPropertyId(updatedProperty.Id);
            if (_repo.UpdatePropertyName(updatedProperty))
            {
                var changes = new Dictionary<string, Variance>();
                changes.Add(nameof(Property.DisplayName), new Variance(oldProperty.DisplayName, updatedProperty.DisplayName));
                _changeLogRepo.InsertChangeLog(ChangeLogType.Property, updatedProperty.Id.ToString(), CurrentUserId, changes);
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut("updatePropertyStatus")]
        public async Task<IActionResult> UpdatePropertyStatus(Property property)
        {
            if (await _repo.UpdatePropertyEnabledOrDisabled(property))
            {
                var changes = new Dictionary<string, Variance>();
                changes.Add("Active", new Variance(!property.Enabled, property.Enabled));
                _changeLogRepo.InsertChangeLog(ChangeLogType.Property, property.Id.ToString(), CurrentUserId, changes);
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
            var reports = _reportRepo.GetReportsByPropertySystemId(updatePropertySystem.Id);
            var mostRecentReport = reports.OrderByDescending(report => report.ServiceDate).First();
            if (_repo.UpdatePropertySystem(updatePropertySystem, mostRecentReport))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut("updatePropertySystemName")]
        public IActionResult UpdatePropertySystemName(PropertySystem updatedPropertySystem)
        {
            if (_repo.UpdatePropertySystemName(updatedPropertySystem))
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
                var changes = new Dictionary<string, Variance>();
                changes.Add("Contact", new Variance(contactId, null));
                _changeLogRepo.InsertChangeLog(ChangeLogType.Property, CurrentPropertyId, CurrentUserId, changes);
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