using Inspinia_MVC5.CodeTemplates;
using Inspinia_MVC5.CommonExtension;
using Inspinia_MVC5.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inspinia_MVC5.AppCodes.Dal
{
    public class AccountDal: DalBase
    {
        public AccountDal(long? actorId) : base(actorId)
        {
        }
        public DBMessage Register(AccountData accountData)
        {
            var cmd = NewCommand("dbo.RegisterAccountData");
            cmd.Parameters.AddWithValue("@FirstName", accountData.FirstName.ReplaceDbNull());
            cmd.Parameters.AddWithValue("@LastName", accountData.LastName.ReplaceDbNull());
            cmd.Parameters.AddWithValue("@EmailAddress", accountData.EmailAddress.ReplaceDbNull());
            cmd.Parameters.AddWithValue("@Password", accountData.Password.ReplaceDbNull());
            cmd.Parameters.AddWithValue("@ConfirmPassword", accountData.ConfirmPassword.ReplaceDbNull());
            cmd.Parameters.AddWithValue("@MobileNumber", accountData.MobileNumber.ReplaceDbNull());
            cmd.Parameters.AddWithValue("@Address", accountData.Address.ReplaceDbNull());
            cmd.Parameters.AddWithValue("@IsActive", accountData.IsActive);
            return GetResult(cmd).Convert<DBMessage>().FirstOrDefault();
        }
        public DBMessage Login(string username, string password)
        {
            var cmd = NewCommand("dbo.LogInAccountData");
            cmd.Parameters.AddWithValue("@EmailAddress", username.ReplaceDbNull());
            cmd.Parameters.AddWithValue("@Password", password.ReplaceDbNull());
            return GetResult(cmd).Convert<DBMessage>().FirstOrDefault();
        }
    }
}