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
    public class JobTypeController : ControllerBase
    {
        private readonly ILogger<JobTypeController> _logger;
        private readonly IJobTypesRepository _repo;

        public JobTypeController(ILogger<JobTypeController> logger, IJobTypesRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetJobTypes()
        {
            return Ok(_repo.GetJobTypes());
        }
    }
}