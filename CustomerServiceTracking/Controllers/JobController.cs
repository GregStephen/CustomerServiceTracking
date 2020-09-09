using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CustomerServiceTracking.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CustomerServiceTracking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly ILogger<JobController> _logger;
        private readonly IJobRepository _repo;

        public JobController(ILogger<JobController> logger, IJobRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }

        [HttpGet("current-week-jobs/{businessId}")]
        public IActionResult GetJobsNeedingService(Guid businessId)
        {
            return Ok(_repo.GetJobsNeedingService(businessId));
        }
    }
}