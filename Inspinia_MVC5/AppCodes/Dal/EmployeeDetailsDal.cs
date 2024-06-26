﻿using Inspinia_MVC5.CodeTemplates;
using Inspinia_MVC5.CommonExtension;
using Inspinia_MVC5.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inspinia_MVC5.AppCodes.Dal
{
    public class EmployeeDetailsDal:DalBase
    {
        public EmployeeDetailsDal(long? actorId) : base(actorId)
        {
        }
        public DBMessage Add_UpdateEmployeeDetails(EmployeeDetails employeeDetails)
        {
            var cmd = NewCommand("dbo.AddUpdateEmployeeDetails");
            cmd.Parameters.AddWithValue("@Id", employeeDetails.Id.ReplaceDbNull());
            cmd.Parameters.AddWithValue("@EmployeeName", employeeDetails.EmployeeName.ReplaceDbNull());
            cmd.Parameters.AddWithValue("@DateofBirth", employeeDetails.DateofBirth.ReplaceDbNull());
            cmd.Parameters.AddWithValue("@Gender", employeeDetails.Gender.ReplaceDbNull());
            cmd.Parameters.AddWithValue("@MobileNumber", employeeDetails.MobileNumber.ReplaceDbNull());
            cmd.Parameters.AddWithValue("@EmployeeAddress", employeeDetails.EmployeeAddress.ReplaceDbNull());
            cmd.Parameters.AddWithValue("@DepartmentId", employeeDetails.DepartmentId.ReplaceDbNull());
            cmd.Parameters.AddWithValue("@DesignationId", employeeDetails.DesignationId.ReplaceDbNull());
            cmd.Parameters.AddWithValue("@IsActive", employeeDetails.IsActive.ReplaceDbNull());
            return GetResult(cmd).Convert<DBMessage>().FirstOrDefault();
        }
        public List<Department> Get_Department()
        {
            var cmd = NewCommand("dbo.get_Department");
            return GetResult(cmd).Convert<Department>();
        } public List<Designation> Get_Designation()
        {
            var cmd = NewCommand("dbo.Get_Designation");
            return GetResult(cmd).Convert<Designation>();
        }
        public List<EmployeeDetails> Get_AllEmployeeDetails()
        {
            var cmd = NewCommand("dbo.Get_AllEmployeeDetails");
            var dt = GetResult(cmd);
            return dt.Convert<EmployeeDetails>();
        }
        public EmployeeDetails GetDataForEditByID(EmployeeDetails employeeDetails)
        {
            var cmd = NewCommand("dbo.GetEmployeeDetailByID");
            cmd.Parameters.AddWithValue("@Id", employeeDetails.Id.ReplaceDbNull());
            return GetResult(cmd).Convert<EmployeeDetails>().FirstOrDefault();
        }
    }
}