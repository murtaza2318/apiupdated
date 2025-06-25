using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace VelvetLeash.API.Controllers
{
    [ApiController]
    [Route("api/location")]
    public class LocationController : ControllerBase
    {
        // GET: api/location/zip-codes
        [HttpGet("zip-codes")]
        public async Task<IActionResult> GetZipCodes([FromQuery] string search = null)
        {
            // In a real application, you would have a database of zip codes
            // For this demo, we'll return mock zip codes
            var zipCodes = new List<object>
            {
                new { zipCode = "10001", city = "New York", state = "NY", latitude = 40.7505, longitude = -73.9934 },
                new { zipCode = "10002", city = "New York", state = "NY", latitude = 40.7156, longitude = -73.9877 },
                new { zipCode = "90210", city = "Beverly Hills", state = "CA", latitude = 34.0901, longitude = -118.4065 },
                new { zipCode = "90211", city = "Beverly Hills", state = "CA", latitude = 34.0836, longitude = -118.4006 },
                new { zipCode = "33101", city = "Miami", state = "FL", latitude = 25.7743, longitude = -80.1937 },
                new { zipCode = "33102", city = "Miami", state = "FL", latitude = 25.7867, longitude = -80.1800 },
                new { zipCode = "60601", city = "Chicago", state = "IL", latitude = 41.8825, longitude = -87.6441 },
                new { zipCode = "60602", city = "Chicago", state = "IL", latitude = 41.8796, longitude = -87.6355 }
            };

            if (!string.IsNullOrEmpty(search))
            {
                zipCodes = zipCodes.FindAll(z => 
                    z.GetType().GetProperty("zipCode").GetValue(z).ToString().Contains(search) ||
                    z.GetType().GetProperty("city").GetValue(z).ToString().ToLower().Contains(search.ToLower()) ||
                    z.GetType().GetProperty("state").GetValue(z).ToString().ToLower().Contains(search.ToLower())
                );
            }

            return Ok(new { success = true, data = zipCodes });
        }

        // GET: api/location/coordinates/{zipCode}
        [HttpGet("coordinates/{zipCode}")]
        public async Task<IActionResult> GetCoordinatesByZipCode(string zipCode)
        {
            // In a real application, you would look up coordinates from a database or external service
            // For this demo, we'll return mock coordinates
            var coordinates = zipCode switch
            {
                "10001" => new { latitude = 40.7505, longitude = -73.9934, city = "New York", state = "NY" },
                "90210" => new { latitude = 34.0901, longitude = -118.4065, city = "Beverly Hills", state = "CA" },
                "33101" => new { latitude = 25.7743, longitude = -80.1937, city = "Miami", state = "FL" },
                "60601" => new { latitude = 41.8825, longitude = -87.6441, city = "Chicago", state = "IL" },
                _ => null
            };

            if (coordinates == null)
            {
                return NotFound(new { success = false, message = "Zip code not found" });
            }

            return Ok(new { success = true, data = coordinates });
        }

        // POST: api/location/reverse-geocode
        [HttpPost("reverse-geocode")]
        public async Task<IActionResult> ReverseGeocode([FromBody] ReverseGeocodeRequest request)
        {
            // In a real application, you would use a geocoding service like Google Maps API
            // For this demo, we'll return mock data
            var location = new 
            {
                address = "123 Main St",
                city = "Sample City",
                state = "CA",
                zipCode = "90210",
                country = "USA",
                latitude = request.Latitude,
                longitude = request.Longitude
            };

            return Ok(new { success = true, data = location });
        }

        // GET: api/location/nearby-cities
        [HttpGet("nearby-cities")]
        public async Task<IActionResult> GetNearbyCities([FromQuery] double latitude, [FromQuery] double longitude, [FromQuery] double radiusKm = 50)
        {
            // In a real application, you would calculate nearby cities based on coordinates
            // For this demo, we'll return mock nearby cities
            var nearbyCities = new List<object>
            {
                new { city = "Los Angeles", state = "CA", zipCode = "90001", distance = 15.2 },
                new { city = "Santa Monica", state = "CA", zipCode = "90401", distance = 8.7 },
                new { city = "Hollywood", state = "CA", zipCode = "90028", distance = 12.1 },
                new { city = "Pasadena", state = "CA", zipCode = "91101", distance = 25.3 }
            };

            return Ok(new { success = true, data = nearbyCities });
        }

        // GET: api/location/states
        [HttpGet("states")]
        public async Task<IActionResult> GetStates()
        {
            var states = new List<object>
            {
                new { code = "AL", name = "Alabama" },
                new { code = "AK", name = "Alaska" },
                new { code = "AZ", name = "Arizona" },
                new { code = "AR", name = "Arkansas" },
                new { code = "CA", name = "California" },
                new { code = "CO", name = "Colorado" },
                new { code = "CT", name = "Connecticut" },
                new { code = "DE", name = "Delaware" },
                new { code = "FL", name = "Florida" },
                new { code = "GA", name = "Georgia" },
                new { code = "HI", name = "Hawaii" },
                new { code = "ID", name = "Idaho" },
                new { code = "IL", name = "Illinois" },
                new { code = "IN", name = "Indiana" },
                new { code = "IA", name = "Iowa" },
                new { code = "KS", name = "Kansas" },
                new { code = "KY", name = "Kentucky" },
                new { code = "LA", name = "Louisiana" },
                new { code = "ME", name = "Maine" },
                new { code = "MD", name = "Maryland" },
                new { code = "MA", name = "Massachusetts" },
                new { code = "MI", name = "Michigan" },
                new { code = "MN", name = "Minnesota" },
                new { code = "MS", name = "Mississippi" },
                new { code = "MO", name = "Missouri" },
                new { code = "MT", name = "Montana" },
                new { code = "NE", name = "Nebraska" },
                new { code = "NV", name = "Nevada" },
                new { code = "NH", name = "New Hampshire" },
                new { code = "NJ", name = "New Jersey" },
                new { code = "NM", name = "New Mexico" },
                new { code = "NY", name = "New York" },
                new { code = "NC", name = "North Carolina" },
                new { code = "ND", name = "North Dakota" },
                new { code = "OH", name = "Ohio" },
                new { code = "OK", name = "Oklahoma" },
                new { code = "OR", name = "Oregon" },
                new { code = "PA", name = "Pennsylvania" },
                new { code = "RI", name = "Rhode Island" },
                new { code = "SC", name = "South Carolina" },
                new { code = "SD", name = "South Dakota" },
                new { code = "TN", name = "Tennessee" },
                new { code = "TX", name = "Texas" },
                new { code = "UT", name = "Utah" },
                new { code = "VT", name = "Vermont" },
                new { code = "VA", name = "Virginia" },
                new { code = "WA", name = "Washington" },
                new { code = "WV", name = "West Virginia" },
                new { code = "WI", name = "Wisconsin" },
                new { code = "WY", name = "Wyoming" }
            };

            return Ok(new { success = true, data = states });
        }
    }

    public class ReverseGeocodeRequest
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}