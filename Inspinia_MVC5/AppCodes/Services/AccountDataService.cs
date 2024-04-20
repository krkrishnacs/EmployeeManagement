using Inspinia_MVC5.AppCodes.Dal;
using Inspinia_MVC5.CodeTemplates;
using Inspinia_MVC5.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inspinia_MVC5.AppCodes.Services
{
    public class AccountDataService
    {
        public long? _actorId { get; private set; }
        public AccountDataService(long? actorId)
        {
            _actorId = actorId;
        }
        public DBMessage Register(AccountData accountData)
        {
            using (AccountDal resource = new AccountDal(null))
            {
                return resource.Register(accountData);
            }
        }
        public DBMessage Login(string username, string password)
        {
            using (AccountDal resource = new AccountDal(null))
            {
                return resource.Login(username, password);
            }
        }
    }
}