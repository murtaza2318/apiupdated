using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace VelvetLeash.API.Data
{
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();

            // Using SQLite for development
            string cs = "Data Source=velvetleash.db";
            optionsBuilder.UseSqlite(cs);

            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}
