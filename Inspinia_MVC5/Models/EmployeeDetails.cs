﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Inspinia_MVC5.Models
{
    public class EmployeeDetails
    {
        public int Id { get; set; }
        public string EmployeeName { get; set; }
        public string DateofBirth { get; set; }
        public string Gender { get; set; }
        public string MobileNumber { get; set; }
        public string EmployeeAddress { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int DesignationId { get; set; }
        public string DesignationName { get; set; }
        public bool IsActive { get; set; }
    }
    public class Department
    {
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
    }public class Designation
    {
        public int DesignationId { get; set; }
        public string DesignationName { get; set; }
    }
}