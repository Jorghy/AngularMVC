using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestAngular.Models;

namespace TestAngular.DAL
{
    public class TestInitializer : System.Data.Entity.DropCreateDatabaseIfModelChanges<TestContext>
    {
        public TestInitializer() { }
        protected override void Seed(TestContext context)
        {
            var employees = new List<Employee>
            { 
                new Employee {Name = "Kiss Béla", Address = "Miskolc", Salary = 300000, CreateDate = DateTime.Parse("2012.05.06")},
                new Employee {Name = "Nagy József", Address = "Miskolc", Salary = 400000, CreateDate = DateTime.Parse("2012.11.16")},
                new Employee {Name = "Kovács István", Address = "Miskolc", Salary = 200000, CreateDate = DateTime.Parse("2012.12.09")},
                new Employee {Name = "Lakatos Péter", Address = "Miskolc", Salary = 600000, CreateDate = DateTime.Parse("2012.03.12")},
                new Employee {Name = "Szabó Beáta", Address = "Miskolc", Salary = 300000, CreateDate = DateTime.Parse("2012.04.25")},
                new Employee {Name = "Varga Miklós", Address = "Miskolc", Salary = 600000, CreateDate = DateTime.Parse("2012.06.28")},
                new Employee {Name = "Kovács Lajos", Address = "Miskolc", Salary = 300000, CreateDate = DateTime.Parse("2012.07.10")},
                new Employee {Name = "Szabó Anett", Address = "Miskolc", Salary = 400000, CreateDate = DateTime.Parse("2012.09.19")},
                new Employee {Name = "Varga Zsanett", Address = "Miskolc", Salary = 900000, CreateDate = DateTime.Parse("2012.01.03")},
            };
            employees.ForEach(s => context.Employees.Add(s));
            context.SaveChanges();

            var departments = new List<Department>
            {
                new Department {Name = "Logistic Department", LeaderID = 4 },
                new Department {Name = "Developer Department", LeaderID = 6 },
                new Department {Name = "Finance Department", LeaderID = 9 },
                new Department {Name = "Maintenance Department", LeaderID = 3 },
                new Department {Name = "Manufacturing Department", LeaderID = 8 },
            };
            departments.ForEach(d => context.Departments.Add(d));
            context.SaveChanges();
        }
    }
}
