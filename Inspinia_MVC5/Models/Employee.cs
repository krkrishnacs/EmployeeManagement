using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inspinia_MVC5.Models
{
    public class Employee
    {
        public int AttendanceID { get; set; }
        public int EmployeeID { get; set; }
        public string Date { get; set; }
        public string Status { get; set; }
    }
}