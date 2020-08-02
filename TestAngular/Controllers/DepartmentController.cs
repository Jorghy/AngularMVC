using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TestAngular.DAL;
using TestAngular.DataAccess;
using TestAngular.Models;

namespace TestAngular.Controllers
{
    [Route("api/department")]
    [Produces("application/json")]
    public class DepartmentController : Controller
    {
        DADepartment dbDepartmentObj = new DADepartment();
        TestContext dbContext = new TestContext();

        [HttpGet]
        public IEnumerable<Department> GetAllDeprtment()
        {
            return dbDepartmentObj.GetAllDepartment();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDepartmentByID([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var department = await dbContext.Departments.SingleOrDefaultAsync(d => d.ID == id);

            if(department == null)
            {
                return NotFound();
            }

            return Ok(department);
        }

        [HttpPost]
        public async Task<ActionResult<Department>> addDepartment([FromBody] Department department)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            dbContext.Departments.Add(department);
            await dbContext.SaveChangesAsync();

            return CreatedAtAction("GetAllDeprtment", new { id = department.ID }, department);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDepartment([FromRoute]int id, [FromBody] Department department)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            dbContext.Entry(department).State = EntityState.Modified;

            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if(!DepartmentExist(id))
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
        public async Task<IActionResult> DeleteDepartment([FromRoute] int id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var department = await dbContext.Departments.SingleOrDefaultAsync(d => d.ID == id);
            if(department == null)
            {
                return NotFound();
            }

            dbContext.Departments.Remove(department);
            await dbContext.SaveChangesAsync();

            return Ok(department);
        }

        private bool DepartmentExist(int id)
        {
            return dbContext.Departments.Any(d => d.ID == id);
        }
    }
}
