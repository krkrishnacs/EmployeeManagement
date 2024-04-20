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
    public class AccountDataController : ControllerBase
    {
        // GET: AccountData
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Register(AccountData accountData)
        {
            try
            {
                AccountDataService accountDataService = new AccountDataService(null);
                var res = accountDataService.Register(accountData);
                _cr.Data = res;
                _cr.Status = HttpStatusCode.OK;
                _cr.Message = "Success";
                return Json(_cr);
            }
            catch (Exception EX)
            {
                throw new Exception(EX.Message);
            }

        }
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(string username, string password)
        {
            try
            {
                AccountDataService accountDataService = new AccountDataService(null);
                var res = accountDataService.Login(username, password);
                _cr.Data = res;
                _cr.Status = HttpStatusCode.OK;
                _cr.Message = "Success";
                return Json(_cr);
                //return RedirectToAction("Dashboard");
            }
            catch (Exception EX)
            {
                throw new Exception(EX.Message);
            }

        }
        [HttpGet]
        public ActionResult Logout()
        {
            Session["LoggedInUserName"] = null;
            Session.Clear();
            return RedirectToAction(nameof(Login));
        }
    }
}