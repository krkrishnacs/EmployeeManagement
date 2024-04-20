using Inspinia_MVC5.AppCodes.Dal;
using Inspinia_MVC5.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inspinia_MVC5.Controllers
{
    public class AccountController : Controller
    {
        // GET: Account
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Register(AccountData userRegistration)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    AccountRepo accountRepo = new AccountRepo();
                    if (accountRepo.UserRegister(userRegistration))
                    {
                        ViewBag.Message = "Register Successfully";
                        return RedirectToAction("Login", "Account");
                        //ModelState.Clear();
                    }
                }
                return View(userRegistration);
            }
            catch
            {
                return View();
            }
        }
        [HttpGet]
        public ActionResult Login()
        {
            if (Session["LoggedInUserName"] == null)
                return View();
            else
                //return RedirectToAction(nameof(MainDashboard));
                return RedirectToAction("MainDashboard", "Account");
        }
        [HttpGet]
        public ActionResult Logout()
        {
            Session["LoggedInUserName"] = null;
            Session.Clear();
            //return RedirectToAction(nameof(Login));
            return RedirectToAction("Login", "Account");
        }
        //[CustomAuthenticationFilter]

        [HttpPost]
        public ActionResult Login(UserLogin userLogin)
        {
            string SqlCon = ConfigurationManager.ConnectionStrings["constring"].ConnectionString;
            SqlConnection con = new SqlConnection(SqlCon);
            string SqlQuery = "select Id, EmailAddress,Password from UserAccountTbl where EmailAddress=@EmailAddress and Password=@Password";
            con.Open();
            SqlCommand cmd = new SqlCommand(SqlQuery, con);
            cmd.Parameters.AddWithValue("@EmailAddress", userLogin.EmailAddress);
            cmd.Parameters.AddWithValue("@Password", userLogin.Password);
            SqlDataReader sdr = cmd.ExecuteReader();
            if (sdr.Read())
            {
                Session["Id"] = Guid.NewGuid();
                Session["LoggedInUserName"] = userLogin.EmailAddress.ToString();
               //return RedirectToAction(nameof(MainDashboard));
                return RedirectToAction("MainDashboard", "Account");
            }
            else
            {
                ViewData["Message"] = "Login Failed, Username OR Password incorrect!!";
                ModelState.Clear();
            }
            con.Close();
            return View();
        }
  
        [HttpGet]
        public ActionResult MainDashboard()
        {
            if (Session["LoggedInUserName"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction(nameof(Login));
            }
        }


    }
}