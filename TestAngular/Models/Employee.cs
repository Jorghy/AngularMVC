﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestAngular.Models
{
    public class Employee
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public int Salary { get; set; }

        public DateTime CreateDate { get; set; }
    }

    public class EmployeeCreate
    {
        public string Name { get; set; }

        public string Address { get; set; }

        public int Salary { get; set; }

        public DateTime CreateDate { get; set; }
    }

}
