using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VelvetLeash.API.Data;
using VelvetLeash.API.Model;
using VelvetLeash.API.Models;

namespace VelvetLeash.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BoardingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public BoardingController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/boarding
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BoardingRequest>>> GetBoardingRequests([FromQuery] int? userId = null)
        {
            var query = _context.BoardingRequests.AsQueryable();

            if (userId.HasValue)
            {
                query = query.Where(r => r.UserId == userId.Value);
            }

            return await query
                .Include(r => r.Sitter)
                .Include(r => r.Pet)
                .ToListAsync();
        }

        // GET: api/boarding/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<BoardingRequest>> GetBoardingRequest(int id)
        {
            var boardingRequest = await _context.BoardingRequests
                .Include(r => r.Sitter)
                .Include(r => r.Pet)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (boardingRequest == null)
            {
                return NotFound();
            }

            return boardingRequest;
        }

        // POST: api/boarding
        [HttpPost]
        public async Task<IActionResult> CreateBoardingRequest([FromBody] BoardingRequest request)
        {
            if (request == null)
                return BadRequest(new { success = false, message = "Invalid data" });

            // Validate sitter exists if provided
            if (request.SitterId.HasValue)
            {
                var sitter = await _context.Sitters.FindAsync(request.SitterId.Value);
                if (sitter == null)
                {
                    return BadRequest(new { success = false, message = "Sitter not found" });
                }

                // Calculate total price based on sitter's price per night and duration
                var days = (request.EndDate - request.StartDate).Days + 1;
                request.TotalPrice = sitter.PricePerNight * days;
            }

            // Validate pet exists if provided
            if (request.PetId.HasValue)
            {
                var pet = await _context.Pets.FindAsync(request.PetId.Value);
                if (pet == null)
                {
                    return BadRequest(new { success = false, message = "Pet not found" });
                }
            }

            // Validate user exists
            var user = await _context.Users.FindAsync(request.UserId);
            if (user == null)
            {
                return BadRequest(new { success = false, message = "User not found" });
            }

            // Set default status if not provided
            if (string.IsNullOrEmpty(request.Status))
            {
                request.Status = "Pending";
            }

            _context.BoardingRequests.Add(request);
            await _context.SaveChangesAsync();
            
            return Ok(new { 
                success = true, 
                message = "Boarding request saved",
                data = new {
                    requestId = request.Id,
                    status = request.Status,
                    totalPrice = request.TotalPrice
                }
            });
        }

        // PUT: api/boarding/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBoardingRequest(int id, [FromBody] BoardingRequest request)
        {
            if (id != request.Id)
            {
                return BadRequest(new { success = false, message = "ID mismatch" });
            }

            var existingRequest = await _context.BoardingRequests.FindAsync(id);
            if (existingRequest == null)
            {
                return NotFound(new { success = false, message = "Boarding request not found" });
            }

            // Update properties
            existingRequest.DogSize = request.DogSize;
            existingRequest.DogAge = request.DogAge;
            existingRequest.GetAlongWithDogs = request.GetAlongWithDogs;
            existingRequest.GetAlongWithCats = request.GetAlongWithCats;
            existingRequest.StartDate = request.StartDate;
            existingRequest.EndDate = request.EndDate;
            existingRequest.SpecialInstructions = request.SpecialInstructions;
            existingRequest.Status = request.Status;
            existingRequest.UpdatedAt = DateTime.UtcNow;

            // Recalculate price if sitter is assigned
            if (existingRequest.SitterId.HasValue)
            {
                var sitter = await _context.Sitters.FindAsync(existingRequest.SitterId.Value);
                if (sitter != null)
                {
                    var days = (existingRequest.EndDate - existingRequest.StartDate).Days + 1;
                    existingRequest.TotalPrice = sitter.PricePerNight * days;
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BoardingRequestExists(id))
                {
                    return NotFound(new { success = false, message = "Boarding request not found" });
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { success = true, message = "Boarding request updated" });
        }

        // PATCH: api/boarding/{id}/status
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateBoardingRequestStatus(int id, [FromBody] StatusUpdateRequest statusUpdate)
        {
            var existingRequest = await _context.BoardingRequests.FindAsync(id);
            if (existingRequest == null)
            {
                return NotFound(new { success = false, message = "Boarding request not found" });
            }

            existingRequest.Status = statusUpdate.Status;
            existingRequest.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Status updated successfully" });
        }

        // DELETE: api/boarding/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBoardingRequest(int id)
        {
            var boardingRequest = await _context.BoardingRequests.FindAsync(id);
            if (boardingRequest == null)
            {
                return NotFound(new { success = false, message = "Boarding request not found" });
            }

            _context.BoardingRequests.Remove(boardingRequest);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Boarding request deleted" });
        }

        private bool BoardingRequestExists(int id)
        {
            return _context.BoardingRequests.Any(e => e.Id == id);
        }
    }

    public class StatusUpdateRequest
    {
        public string Status { get; set; }
    }
}