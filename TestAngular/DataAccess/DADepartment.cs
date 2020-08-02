using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using TestAngular.DAL;
using TestAngular.Models;

namespace TestAngular.DataAccess
{
    public class DADepartment
    {
        TestContext dbContext = new TestContext();
        public IEnumerable<Department> GetAllDepartment()
        {
            return dbContext.Departments.ToList();
        }

        public Department GetDepartmentByID(int ID)
        {
            return dbContext.Departments
                .Where(x => x.ID == ID)
                .FirstOrDefault();
        }
    }
}
