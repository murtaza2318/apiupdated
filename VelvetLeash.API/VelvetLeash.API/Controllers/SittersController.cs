using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VelvetLeash.API.Data;
using VelvetLeash.API.Model;

namespace VelvetLeash.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SittersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public SittersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/sitters
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sitter>>> GetSitters([FromQuery] string zipCode = null, 
                                                                        [FromQuery] bool? acceptsDogs = null,
                                                                        [FromQuery] bool? acceptsCats = null,
                                                                        [FromQuery] DateTime? startDate = null,
                                                                        [FromQuery] DateTime? endDate = null)
        {
            var query = _context.Sitters.AsQueryable();

            // Filter by zip code if provided
            if (!string.IsNullOrEmpty(zipCode))
            {
                query = query.Where(s => s.ZipCode == zipCode);
            }

            // Filter by pet acceptance
            if (acceptsDogs.HasValue)
            {
                query = query.Where(s => s.AcceptsDogs == acceptsDogs.Value);
            }

            if (acceptsCats.HasValue)
            {
                query = query.Where(s => s.AcceptsCats == acceptsCats.Value);
            }

            // Filter by availability
            if (startDate.HasValue && endDate.HasValue)
            {
                // Get all boarding requests that overlap with the requested dates
                var overlappingRequests = await _context.BoardingRequests
                    .Where(r => 
                        (r.StartDate <= endDate.Value && r.EndDate >= startDate.Value) &&
                        r.Status != "Rejected" && r.Status != "Cancelled")
                    .Select(r => r.SitterId)
                    .Distinct()
                    .ToListAsync();

                // Exclude sitters who have overlapping bookings
                query = query.Where(s => !overlappingRequests.Contains(s.Id));
            }

            // Only return available sitters
            query = query.Where(s => s.IsAvailable);

            return await query.ToListAsync();
        }

        // GET: api/sitters/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Sitter>> GetSitter(int id)
        {
            var sitter = await _context.Sitters.FindAsync(id);

            if (sitter == null)
            {
                return NotFound();
            }

            return sitter;
        }

        // GET: api/sitters/nearby
        [HttpGet("nearby")]
        public async Task<ActionResult<IEnumerable<Sitter>>> GetNearbySitters([FromQuery] double latitude, 
                                                                             [FromQuery] double longitude, 
                                                                             [FromQuery] double radius = 10.0)
        {
            // Get all sitters
            var allSitters = await _context.Sitters.Where(s => s.IsAvailable).ToListAsync();
            
            // Calculate distance for each sitter and filter by radius
            var nearbySitters = allSitters
                .Select(s => new 
                {
                    Sitter = s,
                    Distance = CalculateDistance(latitude, longitude, s.Latitude, s.Longitude)
                })
                .Where(s => s.Distance <= radius)
                .OrderBy(s => s.Distance)
                .Select(s => s.Sitter)
                .ToList();

            return nearbySitters;
        }

        // Helper method to calculate distance between two coordinates using Haversine formula
        private double CalculateDistance(double lat1, double lon1, double lat2, double lon2)
        {
            const double EarthRadiusKm = 6371.0;
            
            var dLat = DegreesToRadians(lat2 - lat1);
            var dLon = DegreesToRadians(lon2 - lon1);
            
            var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                    Math.Cos(DegreesToRadians(lat1)) * Math.Cos(DegreesToRadians(lat2)) *
                    Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
            
            var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
            return EarthRadiusKm * c;
        }
        
        private double DegreesToRadians(double degrees)
        {
            return degrees * Math.PI / 180.0;
        }
    }
}