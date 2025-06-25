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
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/user/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound(new { success = false, message = "User not found" });
            }

            // Don't return password hash
            user.PasswordHash = null;
            user.RefreshToken = null;

            return user;
        }

        // GET: api/user/{id}/pets
        [HttpGet("{id}/pets")]
        public async Task<ActionResult<IEnumerable<Pet>>> GetUserPets(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new { success = false, message = "User not found" });
            }

            var pets = await _context.Pets
                .Where(p => p.UserId == id.ToString())
                .ToListAsync();

            return pets;
        }

        // PATCH: api/user/profile
        [HttpPatch("profile")]
        public async Task<IActionResult> UpdateUserProfile([FromBody] UserProfileUpdateRequest request)
        {
            var user = await _context.Users.FindAsync(request.UserId);
            if (user == null)
            {
                return NotFound(new { success = false, message = "User not found" });
            }

            // Update user properties if provided
            if (!string.IsNullOrEmpty(request.FirstName))
                user.FirstName = request.FirstName;

            if (!string.IsNullOrEmpty(request.LastName))
                user.LastName = request.LastName;

            if (!string.IsNullOrEmpty(request.ZipCode))
                user.ZipCode = request.ZipCode;

            if (!string.IsNullOrEmpty(request.ProfileImage))
                user.ProfileImage = request.ProfileImage;

            user.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new 
            { 
                success = true, 
                message = "Profile updated successfully",
                data = new 
                {
                    user = new 
                    {
                        id = user.Id.ToString(),
                        firstName = user.FirstName,
                        lastName = user.LastName,
                        email = user.Email,
                        zipCode = user.ZipCode,
                        profileImage = user.ProfileImage,
                        updatedAt = user.UpdatedAt
                    }
                }
            });
        }

        // POST: api/user/messages
        [HttpPost("messages")]
        public async Task<IActionResult> SendMessage([FromBody] MessageRequest request)
        {
            // In a real application, you would save the message to a database
            // For this demo, we'll just return a success response
            return Ok(new { success = true, message = "Message sent successfully" });
        }

        // GET: api/user/messages
        [HttpGet("messages")]
        public async Task<IActionResult> GetUserMessages([FromQuery] int offset = 0, [FromQuery] int limit = 10)
        {
            // In a real application, you would retrieve messages from a database
            // For this demo, we'll just return a mock response
            var messages = new List<object>
            {
                new { id = 1, senderId = 1, receiverId = 2, content = "Hello, how are you?", createdAt = DateTime.UtcNow.AddDays(-1) },
                new { id = 2, senderId = 2, receiverId = 1, content = "I'm good, thanks! How about you?", createdAt = DateTime.UtcNow.AddHours(-23) },
                new { id = 3, senderId = 1, receiverId = 2, content = "I'm doing well too. Would you be available to watch my dog next weekend?", createdAt = DateTime.UtcNow.AddHours(-22) }
            };

            return Ok(new 
            { 
                success = true, 
                data = new 
                {
                    messages = messages.Skip(offset).Take(limit),
                    total = messages.Count,
                    offset,
                    limit
                }
            });
        }

        // DELETE: api/user/messages
        [HttpDelete("messages")]
        public async Task<IActionResult> DeleteMessages([FromBody] DeleteMessagesRequest request)
        {
            // In a real application, you would delete messages from a database
            // For this demo, we'll just return a success response
            return Ok(new { success = true, message = "Messages deleted successfully" });
        }

        // POST: api/user/red-flag
        [HttpPost("red-flag")]
        public async Task<IActionResult> ReportRedFlag([FromBody] RedFlagRequest request)
        {
            // In a real application, you would save the red flag to a database
            // For this demo, we'll just return a success response
            return Ok(new { success = true, message = "Red flag reported successfully" });
        }

        // POST: api/user/injury
        [HttpPost("injury")]
        public async Task<IActionResult> ReportInjury([FromBody] InjuryRequest request)
        {
            // In a real application, you would save the injury report to a database
            // For this demo, we'll just return a success response
            return Ok(new { success = true, message = "Injury reported successfully" });
        }
    }

    public class UserProfileUpdateRequest
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ZipCode { get; set; }
        public string ProfileImage { get; set; }
    }

    public class MessageRequest
    {
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
        public string Content { get; set; }
    }

    public class DeleteMessagesRequest
    {
        public List<int> MessageIds { get; set; }
    }

    public class RedFlagRequest
    {
        public int UserId { get; set; }
        public int ReportedUserId { get; set; }
        public string Reason { get; set; }
        public string Description { get; set; }
    }

    public class InjuryRequest
    {
        public int UserId { get; set; }
        public int PetId { get; set; }
        public string Description { get; set; }
        public DateTime InjuryDate { get; set; }
    }
}