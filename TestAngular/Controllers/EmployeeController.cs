using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Mvc;
using TestAngular.DAL;
using TestAngular.DataAccess;
using TestAngular.Models;

namespace TestAngular.Controllers
{
    [Route("api/employee")]
    [Produces("application/json")]
    public class EmployeeController : Controller
    {
        DAEmployee dbEmployeeObj = new DAEmployee();
        TestContext dbContext = new TestContext();

        [HttpGet]
        public IEnumerable<Employee> GetAllEmployees()
        {
            return dbEmployeeObj.GetAllEmployee();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeByID([FromRoute]int id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var employee = await dbContext.Employees.SingleOrDefaultAsync(e => e.ID == id);

            if(employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }


        [HttpPost]
        public async Task<ActionResult<Employee>> AddEmployee([FromBody]Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            dbContext.Employees.Add(employee);
            await dbContext.SaveChangesAsync();

            return CreatedAtAction("GetAllEmployees", new { id = employee.ID }, employee);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee([FromRoute] int id, [FromBody] Employee employee)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            dbContext.Entry(employee).State = EntityState.Modified;

            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if(!EmployeeExist(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] int id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employee = await dbContext.Employees.SingleOrDefaultAsync(e => e.ID == id);
            if(employee == null)
            {
                return NotFound();
            }

            dbContext.Employees.Remove(employee);
            await dbContext.SaveChangesAsync();

            return Ok(employee);
        }

        private bool EmployeeExist(int id)
        {
            return dbContext.Employees.Any(e => e.ID == id);
        }
    }
}
