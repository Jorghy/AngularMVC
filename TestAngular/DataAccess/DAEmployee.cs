using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using TestAngular.DAL;
using TestAngular.Models;

namespace TestAngular.DataAccess
{
    public class DAEmployee
    {
        TestContext dbContext = new TestContext();
        public IEnumerable<Employee> GetAllEmployee()
        {
            return dbContext.Employees.ToList();
        }

        public void AddEmployee(string Name, string Address, int Salary, string CreateDate)
        {
            Employee employee = new Employee
            {
                Name = Name,
                Address = Address,
                Salary = Salary,
                CreateDate = DateTime.Parse(CreateDate)
            };
            dbContext.Employees.Add(employee);
            dbContext.SaveChanges();
        }
    }
}
