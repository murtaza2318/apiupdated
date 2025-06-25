using VelvetLeash.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using VelvetLeash.API.Model;
using Microsoft.Data.Sqlite;
using System.Security.Cryptography;

var builder = WebApplication.CreateBuilder(args);

// Add EF Core with SQL Server
// For development, we'll use SQLite instead of SQL Server
string cs = "Data Source=velvetleash.db";
builder.Services.AddDbContext<ApplicationDbContext>(a => a.UseSqlite(cs));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ CORS setup
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

// ✅ JWT Auth setup
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? "fallback-key"))
    };
});

var app = builder.Build(); // ✅ Declare 'app' before using it

// ✅ Use CORS middleware
app.UseCors("AllowAll");

// Swagger for development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Create and seed the database
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<ApplicationDbContext>();
    
    // Delete the database if it exists
    context.Database.EnsureDeleted();
    
    // Create a new database
    context.Database.EnsureCreated();
    
    // Seed sitters if DB is empty
    if (!context.Sitters.Any())
    {
        context.Sitters.AddRange(
            new Sitter 
            { 
                Name = "Alice Johnson", 
                Location = "Beverly Hills, CA", 
                ZipCode = "90210",
                Rating = 4.8, 
                Bio = "Experienced pet sitter with over 5 years of experience.", 
                IsAvailable = true,
                PricePerNight = 50.00m,
                AcceptsDogs = true,
                AcceptsCats = true,
                Latitude = 34.0736,
                Longitude = -118.4004,
                ProfileImage = "https://randomuser.me/api/portraits/women/44.jpg"
            },
            new Sitter 
            { 
                Name = "Bob Smith", 
                Location = "Los Angeles, CA", 
                ZipCode = "90001",
                Rating = 4.6, 
                Bio = "Experienced with dogs and cats.", 
                IsAvailable = true,
                PricePerNight = 45.00m,
                AcceptsDogs = true,
                AcceptsCats = false,
                Latitude = 33.9731,
                Longitude = -118.2479,
                ProfileImage = "https://randomuser.me/api/portraits/men/32.jpg"
            },
            new Sitter 
            { 
                Name = "Carol Lee", 
                Location = "Manhattan, NY", 
                ZipCode = "10001",
                Rating = 4.9, 
                Bio = "Pet care professional.", 
                IsAvailable = true,
                PricePerNight = 65.00m,
                AcceptsDogs = true,
                AcceptsCats = true,
                Latitude = 40.7505,
                Longitude = -73.9934,
                ProfileImage = "https://randomuser.me/api/portraits/women/68.jpg"
            }
        );
        context.SaveChanges();
    }
    
    // Seed users if DB is empty
    if (!context.Users.Any())
    {
        // Create a password hash
        string HashPassword(string password)
        {
            using (var sha = SHA256.Create())
            {
                var bytes = Encoding.UTF8.GetBytes(password);
                var hash = sha.ComputeHash(bytes);
                return Convert.ToBase64String(hash);
            }
        }
        
        context.Users.Add(new User
        {
            Username = "john.doe@example.com",
            Email = "john.doe@example.com",
            PasswordHash = HashPassword("Password123!"),
            FirstName = "John",
            LastName = "Doe",
            ZipCode = "90210",
            HowDidYouHear = "Friend",
            IsEmailVerified = true,
            ProfileImage = "https://randomuser.me/api/portraits/men/22.jpg",
            RefreshToken = null,
            RefreshTokenExpiryTime = null,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        });
        context.SaveChanges();
    }
}

app.Run();
