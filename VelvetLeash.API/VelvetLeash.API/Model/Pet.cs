using System;
using System.ComponentModel.DataAnnotations;

namespace VelvetLeash.API.Models
{
    public class Pet
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public int Type { get; set; } // 1=Dog, 2=Cat...

        public int Size { get; set; } // 1=Small, 2=Medium...

        public int Age { get; set; } // 1=Puppy, 2=Adult

        public bool GetAlongWithDogs { get; set; }
        public bool GetAlongWithCats { get; set; }
        public bool IsUnsureWithDogs { get; set; }
        public bool IsUnsureWithCats { get; set; }

        public string? SpecialInstructions { get; set; }

        public string? MedicalConditions { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public string UserId { get; set; } // FK to AspNetUsers
    }
}
