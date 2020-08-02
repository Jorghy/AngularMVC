using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TestAngular.Models
{
    public class Department
    {
        public int ID { get; set; }

        public string Name { get; set; }

        [ForeignKey("Employees")]
        public int LeaderID { get; set; }
        public Employee Leader { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }
    }
}
