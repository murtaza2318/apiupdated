using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using VelvetLeash.API.Model;
using VelvetLeash.API.Models;

namespace VelvetLeash.API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ApplicationDbContext context)
        {
            context.Database.EnsureCreated();

            // Look for any users
            if (context.Users.Any())
            {
                return;   // DB has been seeded
            }

            // Add users
            var users = new User[]
            {
                new User
                {
                    Username = "john.doe",
                    Email = "john.doe@example.com",
                    FirstName = "John",
                    LastName = "Doe",
                    ZipCode = "90210",
                    HowDidYouHear = "Friend",
                    PasswordHash = HashPassword("Password123!"),
                    IsEmailVerified = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new User
                {
                    Username = "jane.smith",
                    Email = "jane.smith@example.com",
                    FirstName = "Jane",
                    LastName = "Smith",
                    ZipCode = "10001",
                    HowDidYouHear = "Google",
                    PasswordHash = HashPassword("Password123!"),
                    IsEmailVerified = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                }
            };

            foreach (var user in users)
            {
                context.Users.Add(user);
            }
            context.SaveChanges();

            // Add sitters
            var sitters = new Sitter[]
            {
                new Sitter
                {
                    Name = "Alice Johnson",
                    Location = "Beverly Hills, CA",
                    ZipCode = "90210",
                    Rating = 4.8,
                    Bio = "Experienced pet sitter with over 5 years of experience. I love all animals and will treat your pets like my own.",
                    IsAvailable = true,
                    PricePerNight = 50.00m,
                    AcceptsDogs = true,
                    AcceptsCats = true,
                    Latitude = 34.0736,
                    Longitude = -118.4004
                },
                new Sitter
                {
                    Name = "Bob Williams",
                    Location = "Manhattan, NY",
                    ZipCode = "10001",
                    Rating = 4.9,
                    Bio = "Professional dog trainer and pet sitter. I have a spacious apartment with a small yard where your pets can play.",
                    IsAvailable = true,
                    PricePerNight = 65.00m,
                    AcceptsDogs = true,
                    AcceptsCats = false,
                    Latitude = 40.7505,
                    Longitude = -73.9934
                },
                new Sitter
                {
                    Name = "Carol Martinez",
                    Location = "Los Angeles, CA",
                    ZipCode = "90001",
                    Rating = 4.7,
                    Bio = "Cat specialist with a quiet, calm home perfect for shy or elderly cats. I also accept small dogs.",
                    IsAvailable = true,
                    PricePerNight = 45.00m,
                    AcceptsDogs = true,
                    AcceptsCats = true,
                    Latitude = 33.9731,
                    Longitude = -118.2479
                }
            };

            foreach (var sitter in sitters)
            {
                context.Sitters.Add(sitter);
            }
            context.SaveChanges();

            // Add pets
            var pets = new Pet[]
            {
                new Pet
                {
                    Name = "Max",
                    Type = 1, // Dog
                    Size = 2, // Medium
                    Age = 2, // Adult
                    GetAlongWithDogs = true,
                    GetAlongWithCats = false,
                    IsUnsureWithDogs = false,
                    IsUnsureWithCats = true,
                    SpecialInstructions = "Needs medication twice daily",
                    MedicalConditions = "Mild arthritis",
                    UserId = "1", // John Doe
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new Pet
                {
                    Name = "Bella",
                    Type = 2, // Cat
                    Size = 1, // Small
                    Age = 1, // Kitten/Puppy
                    GetAlongWithDogs = false,
                    GetAlongWithCats = true,
                    IsUnsureWithDogs = true,
                    IsUnsureWithCats = false,
                    SpecialInstructions = "Very shy, needs quiet environment",
                    MedicalConditions = "None",
                    UserId = "2", // Jane Smith
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                }
            };

            foreach (var pet in pets)
            {
                context.Pets.Add(pet);
            }
            context.SaveChanges();

            // Add boarding requests
            var boardingRequests = new BoardingRequest[]
            {
                new BoardingRequest
                {
                    DogSize = "Medium",
                    DogAge = "Adult",
                    GetAlongWithDogs = "Yes",
                    GetAlongWithCats = "No",
                    StartDate = DateTime.UtcNow.AddDays(7),
                    EndDate = DateTime.UtcNow.AddDays(14),
                    SpecialInstructions = "Please follow medication schedule",
                    UserId = 1, // John Doe
                    SitterId = 1, // Alice Johnson
                    PetId = 1, // Max
                    Status = "Pending",
                    TotalPrice = 350.00m, // 7 days * $50
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                }
            };

            foreach (var request in boardingRequests)
            {
                context.BoardingRequests.Add(request);
            }
            context.SaveChanges();
        }

        private static string HashPassword(string password)
        {
            using (var sha = SHA256.Create())
            {
                var bytes = Encoding.UTF8.GetBytes(password);
                var hash = sha.ComputeHash(bytes);
                return Convert.ToBase64String(hash);
            }
        }
    }
}