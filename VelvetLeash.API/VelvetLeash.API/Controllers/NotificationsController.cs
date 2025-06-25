using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VelvetLeash.API.Controllers
{
    [ApiController]
    [Route("api/notifications")]
    public class NotificationsController : ControllerBase
    {
        // GET: api/notifications/{userId}
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserNotifications(int userId, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            // In a real application, you would retrieve notifications from a database
            // For this demo, we'll return mock notifications
            var notifications = new List<object>
            {
                new 
                { 
                    id = 1, 
                    userId = userId, 
                    title = "Booking Confirmed", 
                    message = "Your pet boarding request has been confirmed by Sarah M.", 
                    type = "booking",
                    isRead = false,
                    createdAt = DateTime.UtcNow.AddHours(-2)
                },
                new 
                { 
                    id = 2, 
                    userId = userId, 
                    title = "New Message", 
                    message = "You have a new message from John D.", 
                    type = "message",
                    isRead = false,
                    createdAt = DateTime.UtcNow.AddHours(-5)
                },
                new 
                { 
                    id = 3, 
                    userId = userId, 
                    title = "Booking Request", 
                    message = "You have a new booking request for next weekend.", 
                    type = "booking_request",
                    isRead = true,
                    createdAt = DateTime.UtcNow.AddDays(-1)
                },
                new 
                { 
                    id = 4, 
                    userId = userId, 
                    title = "Profile Update", 
                    message = "Your profile has been successfully updated.", 
                    type = "profile",
                    isRead = true,
                    createdAt = DateTime.UtcNow.AddDays(-2)
                }
            };

            var paginatedNotifications = notifications
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new 
            { 
                success = true, 
                data = new 
                {
                    notifications = paginatedNotifications,
                    total = notifications.Count,
                    page = page,
                    pageSize = pageSize,
                    totalPages = (int)Math.Ceiling((double)notifications.Count / pageSize)
                }
            });
        }

        // PUT: api/notifications/{id}/read
        [HttpPut("{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            // In a real application, you would update the notification in the database
            return Ok(new { success = true, message = "Notification marked as read" });
        }

        // PUT: api/notifications/read-all/{userId}
        [HttpPut("read-all/{userId}")]
        public async Task<IActionResult> MarkAllAsRead(int userId)
        {
            // In a real application, you would update all notifications for the user
            return Ok(new { success = true, message = "All notifications marked as read" });
        }

        // DELETE: api/notifications/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotification(int id)
        {
            // In a real application, you would delete the notification from the database
            return Ok(new { success = true, message = "Notification deleted" });
        }

        // GET: api/notifications/{userId}/unread-count
        [HttpGet("{userId}/unread-count")]
        public async Task<IActionResult> GetUnreadCount(int userId)
        {
            // In a real application, you would count unread notifications from the database
            var unreadCount = 2; // Mock count

            return Ok(new 
            { 
                success = true, 
                data = new { unreadCount = unreadCount }
            });
        }

        // POST: api/notifications/settings
        [HttpPost("settings")]
        public async Task<IActionResult> UpdateNotificationSettings([FromBody] NotificationSettingsDto settings)
        {
            // In a real application, you would save notification preferences to the database
            return Ok(new { success = true, message = "Notification settings updated" });
        }

        // GET: api/notifications/settings/{userId}
        [HttpGet("settings/{userId}")]
        public async Task<IActionResult> GetNotificationSettings(int userId)
        {
            // In a real application, you would retrieve settings from the database
            var settings = new 
            {
                userId = userId,
                emailNotifications = true,
                pushNotifications = true,
                smsNotifications = false,
                bookingUpdates = true,
                messageNotifications = true,
                marketingEmails = false
            };

            return Ok(new { success = true, data = settings });
        }
    }

    public class NotificationSettingsDto
    {
        public int UserId { get; set; }
        public bool EmailNotifications { get; set; }
        public bool PushNotifications { get; set; }
        public bool SmsNotifications { get; set; }
        public bool BookingUpdates { get; set; }
        public bool MessageNotifications { get; set; }
        public bool MarketingEmails { get; set; }
    }
}