using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inspinia_MVC5.Models
{
    public class Attendence
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public string Date { get; set; }
        public bool IsPresent { get; set; }
    }
}