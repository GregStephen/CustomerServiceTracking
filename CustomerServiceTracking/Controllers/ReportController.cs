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
    public class ReportController : ControllerBase

    {
        private readonly ILogger<ReportController> _logger;
        private readonly IReportRepository _repo;

        public ReportController(ILogger<ReportController> logger, IReportRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }

        [HttpGet("businessId/{businessId}")]
        public IActionResult GetAllReportsByBusinessId(Guid businessId)
        {
            return Ok(_repo.GetAllReportsByBusinessId(businessId));
        }

        [HttpGet("customerId/{customerId}")]
        public IActionResult GetReportsByCustomerId(Guid customerId)
        {
            return Ok(_repo.GetReportsByCustomerId(customerId));
        }

        [HttpGet("reportId/{reportId}")]
        public IActionResult GetReportById(Guid reportId)
        {
            return Ok(_repo.GetReportById(reportId));
        }

        [HttpPost]
        public IActionResult AddNewReportForCustomer(NewReportDTO report)
        {
            if (_repo.AddReport(report))
            {
                return Created($"report/{report.ServiceDate}", report);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}