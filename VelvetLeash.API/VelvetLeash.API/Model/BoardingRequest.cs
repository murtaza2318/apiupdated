using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using VelvetLeash.API.Models;

namespace VelvetLeash.API.Model
{
    public class BoardingRequest
    {
        public int Id { get; set; }
        
        [Required]
        public string DogSize { get; set; }
        
        [Required]
        public string DogAge { get; set; }
        
        [Required]
        public string GetAlongWithDogs { get; set; }
        
        [Required]
        public string GetAlongWithCats { get; set; }
        
        [Required]
        public DateTime StartDate { get; set; }
        
        [Required]
        public DateTime EndDate { get; set; }
        
        public string SpecialInstructions { get; set; }
        
        [Required]
        public int UserId { get; set; }
        
        [ForeignKey("UserId")]
        public User? User { get; set; }
        
        public int? SitterId { get; set; }
        
        [ForeignKey("SitterId")]
        public Sitter? Sitter { get; set; }
        
        public int? PetId { get; set; }
        
        [ForeignKey("PetId")]
        public Pet? Pet { get; set; }
        
        public string Status { get; set; } = "Pending"; // Pending, Accepted, Rejected, Completed
        
        public decimal TotalPrice { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}