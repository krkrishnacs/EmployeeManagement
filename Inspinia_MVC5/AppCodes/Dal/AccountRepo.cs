using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using Inspinia_MVC5.Models;
using System.Reflection;

namespace Inspinia_MVC5.AppCodes.Dal
{
    public class AccountRepo
    {
        private SqlConnection con;
        private void connection()
        {
            string constr = ConfigurationManager.ConnectionStrings["constring"].ToString();
            con = new SqlConnection(constr);
        }
        public bool UserRegister(AccountData userRegistration)
        {
            connection();
            SqlCommand com = new SqlCommand("dbo.RegisterAccountData", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@FirstName", userRegistration.FirstName);
            com.Parameters.AddWithValue("@LastName", userRegistration.LastName);
            com.Parameters.AddWithValue("@EmailAddress", userRegistration.EmailAddress);
            com.Parameters.AddWithValue("@Password", userRegistration.Password);
            com.Parameters.AddWithValue("@ConfirmPassword", userRegistration.ConfirmPassword);
            com.Parameters.AddWithValue("@MobileNumber", userRegistration.MobileNumber);
            com.Parameters.AddWithValue("@Address", userRegistration.Address);
            com.Parameters.AddWithValue("@IsActive", userRegistration.IsActive?1:0);
            con.Open();
            int i = com.ExecuteNonQuery();
            con.Close();
            if (i >= 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}