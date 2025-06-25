using Microsoft.EntityFrameworkCore;
using VelvetLeash.API.Models;
using VelvetLeash.API.Model;

namespace VelvetLeash.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Pet> Pets { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Sitter> Sitters { get; set; }
        public DbSet<BoardingRequest> BoardingRequests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Sitter>(entity =>
            {
                entity.Property(e => e.Name).HasColumnType("TEXT");
                entity.Property(e => e.Location).HasColumnType("TEXT");
                entity.Property(e => e.Bio).HasColumnType("TEXT");
                entity.Property(e => e.ProfileImage).HasColumnType("TEXT");
                entity.Property(e => e.ZipCode).HasColumnType("TEXT");

                entity.Property(e => e.Rating).HasColumnType("REAL");
                entity.Property(e => e.PricePerNight).HasColumnType("REAL");
                entity.Property(e => e.Latitude).HasColumnType("REAL");
                entity.Property(e => e.Longitude).HasColumnType("REAL");

                entity.Property(e => e.IsAvailable).HasColumnType("INTEGER");
                entity.Property(e => e.AcceptsDogs).HasColumnType("INTEGER");
                entity.Property(e => e.AcceptsCats).HasColumnType("INTEGER");

                entity.Property(e => e.CreatedAt).HasColumnType("TEXT");
                entity.Property(e => e.UpdatedAt).HasColumnType("TEXT");
            });
        }
    }
}
