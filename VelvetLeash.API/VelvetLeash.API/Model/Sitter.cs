using System;
using System.ComponentModel.DataAnnotations;

namespace VelvetLeash.API.Model
{
    public class Sitter
    {
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        [Required]
        public string Location { get; set; }
        
        public double Rating { get; set; }
        
        [Required]
        public string Bio { get; set; }
        
        public bool IsAvailable { get; set; }
        
        public string ProfileImage { get; set; }
        
        public decimal PricePerNight { get; set; }
        
        public bool AcceptsDogs { get; set; } = true;
        
        public bool AcceptsCats { get; set; } = true;
        
        public string ZipCode { get; set; }
        
        public double Latitude { get; set; }
        
        public double Longitude { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}