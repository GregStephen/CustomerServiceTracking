using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CustomerServiceTracking.DTOS;
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

        [HttpGet("systemId/{systemId}")]
        public IActionResult GetJobForSystemBySystemId(Guid systemId)
        {
            var job = _repo.GetJobForSystemBySystemId(systemId);
            if (job == null)
            {
                return Ok();
            }
            else
            {
                return Ok(job);
            }
        }

        [HttpGet("current-week-jobs/{businessId}")]
        public IActionResult GetJobsNeedingService(Guid businessId)
        {
            return Ok(_repo.GetJobsNeedingService(businessId));
        }

        [HttpPost]
        public IActionResult AddNewJobToDatabase(NewJobDTO newJobDTO)
        {
            if (_repo.AddJob(newJobDTO))
            {
                return Created($"job/{newJobDTO.DateAssigned}", newJobDTO);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{jobId}")]
        public IActionResult DeleteJob(Guid jobId)
        {
            if (_repo.DeleteJob(jobId))
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