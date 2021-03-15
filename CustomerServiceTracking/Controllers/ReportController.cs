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
    public class ReportController : ControllerBase

    {
        private readonly ILogger<ReportController> _logger;
        private readonly IReportRepository _repo;
        private readonly ICustomerRepository _custRepo;

        public ReportController(ILogger<ReportController> logger, IReportRepository repo, ICustomerRepository custRepo)
        {
            _logger = logger;
            _repo = repo;
            _custRepo = custRepo;
        }

        [HttpGet("businessId/{businessId}")]
        public IActionResult GetAllReportsByBusinessId(Guid businessId)
        {
            return Ok(_repo.GetAllReportsByBusinessId(businessId));
        }

        [HttpGet("propertyId/{propertyId}")]
        public IActionResult GetReportsByPropertyId(Guid propertyId)
        {
            return Ok(_repo.GetReportsByPropertyId(propertyId));
        }

        [HttpGet("propertySystemId/{propertySystemId}")]
        public IActionResult GetReportsByPropertySystemId(Guid propertySystemId)
        {
            return Ok(_repo.GetReportsByPropertySystemId(propertySystemId));
        }

        [HttpGet("reportId/{reportId}")]
        public IActionResult GetReportById(Guid reportId)
        {
            return Ok(_repo.GetReportById(reportId));
        }

        [HttpPost]
        public IActionResult AddNewReportForPropertySystem(NewReportDTO report)
        {
            if (_repo.AddReport(report))
            {
                _custRepo.UpdatePropertySystemDayTankDepleted(report);
                return Created($"report/{report.ServiceDate}", report);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}