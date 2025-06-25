using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using VelvetLeash.API.Data;
using VelvetLeash.API.Model;
using System.Security.Cryptography;
using System.Collections.Generic;

namespace VelvetLeash.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignupRequest request)
        {
            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            {
                return BadRequest(new { success = false, message = "Email already exists." });
            }

            if (request.Password != request.ConfirmPassword)
            {
                return BadRequest(new { success = false, message = "Passwords do not match." });
            }

            var user = new User
            {
                Username = request.Email, // Using email as username
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                ZipCode = request.ZipCode,
                HowDidYouHear = request.HowDidYouHear,
                PasswordHash = HashPassword(request.Password),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var token = GenerateJwtToken(user);
            var refreshToken = GenerateRefreshToken();
            
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await _context.SaveChangesAsync();

            return Ok(new 
            { 
                success = true, 
                message = "Registration successful", 
                data = new 
                { 
                    user = new 
                    { 
                        id = user.Id.ToString(),
                        firstName = user.FirstName,
                        lastName = user.LastName,
                        email = user.Email,
                        isEmailVerified = user.IsEmailVerified,
                        zipCode = user.ZipCode,
                        howDidYouHear = user.HowDidYouHear,
                        createdAt = user.CreatedAt,
                        updatedAt = user.UpdatedAt
                    },
                    token = token,
                    refreshToken = refreshToken
                }
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null || !VerifyPassword(request.Password, user.PasswordHash))
            {
                return Unauthorized(new { success = false, message = "Invalid credentials." });
            }

            var token = GenerateJwtToken(user);
            var refreshToken = GenerateRefreshToken();
            
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await _context.SaveChangesAsync();

            return Ok(new 
            { 
                success = true, 
                message = "Login successful", 
                data = new 
                { 
                    user = new 
                    { 
                        id = user.Id.ToString(),
                        firstName = user.FirstName,
                        lastName = user.LastName,
                        email = user.Email,
                        isEmailVerified = user.IsEmailVerified,
                        zipCode = user.ZipCode
                    },
                    token = token,
                    refreshToken = refreshToken
                }
            });
        }

        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null)
            {
                return NotFound(new { success = false, message = "User not found." });
            }

            // In a real application, you would verify the OTP against a stored value
            // For this demo, we'll just accept any OTP
            if (request.Type == "EMAIL_VERIFICATION")
            {
                user.IsEmailVerified = true;
                await _context.SaveChangesAsync();

                var token = GenerateJwtToken(user);

                return Ok(new 
                { 
                    success = true, 
                    message = "Email verified successfully", 
                    data = new 
                    { 
                        user = new 
                        { 
                            id = user.Id.ToString(),
                            firstName = user.FirstName,
                            lastName = user.LastName,
                            email = user.Email,
                            isEmailVerified = user.IsEmailVerified
                        },
                        token = token
                    }
                });
            }
            else if (request.Type == "PASSWORD_RESET")
            {
                return Ok(new 
                { 
                    success = true, 
                    message = "OTP verified successfully. You can now reset your password." 
                });
            }

            return BadRequest(new { success = false, message = "Invalid OTP type." });
        }

        [HttpPost("resend-otp")]
        public async Task<IActionResult> ResendOtp([FromBody] ResendOtpRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null)
            {
                return NotFound(new { success = false, message = "User not found." });
            }

            // In a real application, you would generate and send a new OTP
            return Ok(new { success = true, message = "OTP sent successfully." });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null)
            {
                return NotFound(new { success = false, message = "User not found." });
            }

            // In a real application, you would generate and send a password reset OTP
            return Ok(new { success = true, message = "Password reset OTP sent successfully." });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null)
            {
                return NotFound(new { success = false, message = "User not found." });
            }

            if (request.NewPassword != request.ConfirmPassword)
            {
                return BadRequest(new { success = false, message = "Passwords do not match." });
            }

            // In a real application, you would verify the OTP before resetting the password
            user.PasswordHash = HashPassword(request.NewPassword);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Password reset successfully." });
        }

        [HttpPost("social-login")]
        public async Task<IActionResult> SocialLogin([FromBody] SocialLoginRequest request)
        {
            // In a real application, you would verify the access token with the provider
            var email = request.Email;
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                // Create a new user if not exists
                user = new User
                {
                    Username = email,
                    Email = email,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    IsEmailVerified = true, // Social login users are considered verified
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }

            var token = GenerateJwtToken(user);
            var refreshToken = GenerateRefreshToken();
            
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await _context.SaveChangesAsync();

            return Ok(new 
            { 
                success = true, 
                message = "Login successful", 
                data = new 
                { 
                    user = new 
                    { 
                        id = user.Id.ToString(),
                        firstName = user.FirstName,
                        lastName = user.LastName,
                        email = user.Email,
                        isEmailVerified = user.IsEmailVerified,
                        zipCode = user.ZipCode
                    },
                    token = token,
                    refreshToken = refreshToken
                }
            });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            // In a real application, you might want to invalidate the token
            return Ok(new { success = true, message = "Logged out successfully." });
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.RefreshToken == request.RefreshToken);
            if (user == null || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                return Unauthorized(new { success = false, message = "Invalid or expired refresh token." });
            }

            var token = GenerateJwtToken(user);
            var refreshToken = GenerateRefreshToken();
            
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await _context.SaveChangesAsync();

            return Ok(new { token, refreshToken });
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser()
        {
            // In a real application, you would get the user ID from the token
            // For this demo, we'll just return the first user
            var user = await _context.Users.FirstOrDefaultAsync();
            if (user == null)
            {
                return NotFound(new { success = false, message = "User not found." });
            }

            return Ok(new 
            { 
                success = true, 
                data = new 
                { 
                    user = new 
                    { 
                        id = user.Id.ToString(),
                        firstName = user.FirstName,
                        lastName = user.LastName,
                        email = user.Email,
                        isEmailVerified = user.IsEmailVerified,
                        zipCode = user.ZipCode,
                        profileImage = user.ProfileImage,
                        createdAt = user.CreatedAt
                    }
                }
            });
        }

        // Password hashing using SHA256 (for demo; use a stronger hash in production)
        private string HashPassword(string password)
        {
            using (var sha = SHA256.Create())
            {
                var bytes = Encoding.UTF8.GetBytes(password);
                var hash = sha.ComputeHash(bytes);
                return Convert.ToBase64String(hash);
            }
        }

        private bool VerifyPassword(string password, string storedHash)
        {
            var hashOfInput = HashPassword(password);
            return hashOfInput == storedHash;
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("firstName", user.FirstName ?? ""),
                new Claim("lastName", user.LastName ?? "")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? "VelvetLeashSecretKey12345678901234567890"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.UtcNow.AddDays(1);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"] ?? "VelvetLeash",
                audience: _configuration["Jwt:Audience"] ?? "VelvetLeashUsers",
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }
    }

    public class SignupRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ZipCode { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string HowDidYouHear { get; set; }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class VerifyOtpRequest
    {
        public string Email { get; set; }
        public string Otp { get; set; }
        public string Type { get; set; } // EMAIL_VERIFICATION or PASSWORD_RESET
    }

    public class ResendOtpRequest
    {
        public string Email { get; set; }
        public string Type { get; set; } // EMAIL_VERIFICATION or PASSWORD_RESET
    }

    public class ForgotPasswordRequest
    {
        public string Email { get; set; }
    }

    public class ResetPasswordRequest
    {
        public string Email { get; set; }
        public string Otp { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
    }

    public class SocialLoginRequest
    {
        public string Provider { get; set; } // google or facebook
        public string AccessToken { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    public class RefreshTokenRequest
    {
        public string RefreshToken { get; set; }
    }
}
