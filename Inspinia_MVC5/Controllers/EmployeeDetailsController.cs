using Inspinia_MVC5.AppCodes.Services;
using Inspinia_MVC5.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace Inspinia_MVC5.Controllers
{
    public class EmployeeDetailsController : ControllerBase
    {
        // GET: EmployeeDetails
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Add_UpdateEmployeeDetails(EmployeeDetails employeeDetails)
        {

            var employeeDetailsService = new EmployeeDetailsService(null);
            var res = employeeDetailsService.Add_UpdateEmployeeDetails(employeeDetails);
            _cr.Data = res;
            _cr.Status = HttpStatusCode.OK;
            _cr.Message = "Success";
            return Json(_cr);
        }
        [HttpPost]
        public ActionResult Get_Department()
        {
            var employeeDetailsService = new EmployeeDetailsService(null);
            var res = employeeDetailsService.Get_Department();
            _cr.Data = res;
            _cr.Status = HttpStatusCode.OK;
            _cr.Message = "Success";
            return Json(_cr);
        }
        [HttpPost]
        public ActionResult Get_Designation()
        {
            var employeeDetailsService = new EmployeeDetailsService(null);
            var res = employeeDetailsService.Get_Designation();
            _cr.Data = res;
            _cr.Status = HttpStatusCode.OK;
            _cr.Message = "Success";
            return Json(_cr);
        }
        [HttpPost]
        public ActionResult Get_AllEmployeeDetails(EmployeeDetails employeeDetails)
        {
            var employeeDetailsService = new EmployeeDetailsService(null);
            var res = employeeDetailsService.Get_AllEmployeeDetails(employeeDetails);
            _cr.Data = res;
            _cr.Status = HttpStatusCode.OK;
            _cr.Message = "Success";
            return Json(_cr);
        }

    }
}