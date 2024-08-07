using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inspinia_MVC5.AppCodes.Services
{
    public class CompanyMasterService
    {
        public long? _actorId { get; private set; }

        public CompanyMasterService(long? actorId)
        {
            _actorId = actorId;
        }
    }
}