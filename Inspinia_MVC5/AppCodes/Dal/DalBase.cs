using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inspinia_MVC5.AppCodes
{
    public abstract class DalBase: DbHandler
    {
        public long? _actorId { get; private set; }
        public DalBase(long? actorId, string constring = "constring") : base(constring)
        {
            _actorId = actorId;
        }
    }
}