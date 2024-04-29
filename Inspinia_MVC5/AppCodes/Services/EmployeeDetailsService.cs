using Inspinia_MVC5.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Inspinia_MVC5.AppCodes.Dal;
using Inspinia_MVC5.CodeTemplates;

namespace Inspinia_MVC5.AppCodes.Services
{
    public class EmployeeDetailsService
    {
        public long? _actorId { get; private set; }

        public EmployeeDetailsService(long? actorId)
        {
            _actorId = actorId;
        }
        public DBMessage Add_UpdateEmployeeDetails(EmployeeDetails employeeDetails)
        {
            using (EmployeeDetailsDal resource = new EmployeeDetailsDal(null))
            {
                return resource.Add_UpdateEmployeeDetails(employeeDetails);
            }
        }
        public List<Department> Get_Department()
        {
            using (EmployeeDetailsDal resource = new EmployeeDetailsDal(null))
            {
                return resource.Get_Department();
            }
        }
        public List<Designation> Get_Designation()
        {
            using (EmployeeDetailsDal resource = new EmployeeDetailsDal(null))
            {
                return resource.Get_Designation();
            }
        }
        public List<EmployeeDetails> Get_AllEmployeeDetails(EmployeeDetails employeeDetails)
        {
            using (EmployeeDetailsDal resource = new EmployeeDetailsDal(null))
            {
                return resource.Get_AllEmployeeDetails();
            }
        }
    }
}