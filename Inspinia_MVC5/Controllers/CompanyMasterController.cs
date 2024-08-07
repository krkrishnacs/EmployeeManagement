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
    public class CompanyMasterController : ControllerBase
    {
        // GET: CompanyMaster
        public ActionResult Index()
        {
            return View();
        }


        //[HttpPost]
        //public ActionResult AddCompanyMaster(CompanyData companyData)
        //{
        //    var transactionMasterService = new TransactionMasterService(null);
        //    var res = transactionMasterService.AddCompanyMaster(companyData);
        //    _cr.Data = res;
        //    _cr.Status = HttpStatusCode.OK;
        //    _cr.Message = "Success";
        //    return Json(_cr);
        //}
    }
}