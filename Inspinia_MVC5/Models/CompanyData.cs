using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inspinia_MVC5.Models
{
    public class CompanyData
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public string ComapnyUrl { get; set; }
        public string ContactNumber { get; set; }
        public string SmsContactNo { get; set; }
        public string Address { get; set; }
        public bool IsActive { get; set; }
    }
}