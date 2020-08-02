using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Threading.Tasks;
using TestAngular.Models;

namespace TestAngular.DAL
{
    public class TestContext : DbContext
    {
        public TestContext() : base("Data Source=localhost;Initial Catalog=TestAngular;Integrated Security=True") 
        {
            Database.SetInitializer<TestContext>(new TestInitializer());
            Database.Initialize(true);
        }

        public DbSet<Department> Departments { get; set; }
        public DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}
