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
    public class TransactionMasterController : ControllerBase
    {
        // GET: TransactionMaster
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Get_TransactionYear()
        {
            var transactionMasterService = new TransactionMasterService(null);
            var res = transactionMasterService.Get_TransactionYear();
            _cr.Data = res;
            _cr.Status = HttpStatusCode.OK;
            _cr.Message = "Success";
            return Json(_cr);
        }
        [HttpPost]
        public ActionResult GetFromYear()
        {
            var transactionMasterService = new TransactionMasterService(null);
            var res = transactionMasterService.GetFromYear();
            _cr.Data = res;
            _cr.Status = HttpStatusCode.OK;
            _cr.Message = "Success";
            return Json(_cr);
        }
        [HttpPost]
        public ActionResult GetToYear()
        {
            var transactionMasterService = new TransactionMasterService(null);
            var res = transactionMasterService.GetToYear();
            _cr.Data = res;
            _cr.Status = HttpStatusCode.OK;
            _cr.Message = "Success";
            return Json(_cr);
        }
        [HttpPost]
        public ActionResult GetFromMonth()
        {
            var transactionMasterService = new TransactionMasterService(null);
            var res = transactionMasterService.GetFromMonth();
            _cr.Data = res;
            _cr.Status = HttpStatusCode.OK;
            _cr.Message = "Success";
            return Json(_cr);
        }
        [HttpPost]
        public ActionResult GetToMonth()
        {
            var transactionMasterService = new TransactionMasterService(null);
            var res = transactionMasterService.GetToMonth();
            _cr.Data = res;
            _cr.Status = HttpStatusCode.OK;
            _cr.Message = "Success";
            return Json(_cr);
        }
        [HttpPost]
        public ActionResult AddTransactionMaster(TransactionMaster transactionMaster)
        {
            var transactionMasterService = new TransactionMasterService(null);
            var res = transactionMasterService.AddTransactionMaster(transactionMaster);
            _cr.Data = res;
            _cr.Status = HttpStatusCode.OK;
            _cr.Message = "Success";
            return Json(_cr);
        }
        [HttpPost]
        public ActionResult ShowAllTransactionMaster(TransactionMaster transactionMaster)
        {
            var transactionMasterService = new TransactionMasterService(null);
            var res = transactionMasterService.ShowAllTransactionMaster(transactionMaster);
            _cr.Data = res;
            _cr.Status = HttpStatusCode.OK;
            _cr.Message = "Success";
            return Json(_cr);
        }
    }
}