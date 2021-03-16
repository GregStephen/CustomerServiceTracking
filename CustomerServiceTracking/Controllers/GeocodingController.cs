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
    public class GeocodingController : ControllerBase
    {
        private readonly ILogger<GeocodingController> _logger;
        private readonly IGeocodingRepository _repo;

        public GeocodingController(ILogger<GeocodingController> logger, IGeocodingRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }

        [HttpPost]
        public IActionResult GetResultsFromAddress(NewPropertyModel newProperty)
        {
            var response = _repo.GetResponseFromGeocode(newProperty);
            if (response == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(response);
            }
        }
    }
}
