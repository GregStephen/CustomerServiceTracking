using System;
using CustomerServiceTracking.DataModels;
using CustomerServiceTracking.DTOS;
using CustomerServiceTracking.Repositories;
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

        [HttpGet("upcoming-jobs/{businessId}/{daysOut}")]
        public IActionResult GetJobsNeedingService(Guid businessId, int daysOut)
        {
            return Ok(_repo.GetJobsNeedingService(businessId, daysOut));
        }

        [HttpGet("employeeId/{employeeId}")]
        public IActionResult GetJobsAssignedTo(Guid employeeId)
        {
            return Ok(_repo.GetJobsAssignedTo(employeeId));
        }

        [HttpPost]
        public IActionResult AddNewJobToDatabase(NewJobDTO newJobDTO)
        {
            if (newJobDTO.IncludeOtherSystems == true)
            {
                foreach (var systemId in newJobDTO.OtherSystemIds)
                {
                    var newJob = new NewJobDTO()
                    {
                        DateAssigned = newJobDTO.DateAssigned,
                        CustomerSystemId = systemId,
                        JobTypeId = newJobDTO.JobTypeId,
                        TechnicianId = newJobDTO.TechnicianId,
                    };

                    if (newJobDTO.IncludeNotes == true)
                    {
                        newJob.Note = newJobDTO.Note;
                    };

                    if (!_repo.AddJob(newJob))
                    {
                        return BadRequest();
                    }
                }
            }
            if (_repo.AddJob(newJobDTO))
            {
                return Created($"job/{newJobDTO.DateAssigned}", newJobDTO);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("edit")]
        public IActionResult EditJob(Job UpdatedJob)
        {
            if (_repo.EditJob(UpdatedJob))
            {
                return Ok();
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