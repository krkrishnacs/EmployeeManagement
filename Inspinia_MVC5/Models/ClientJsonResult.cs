using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace Inspinia_MVC5.Models
{
    public class ClientJsonResult
    {
        public object Data { get; set; }
        public HttpStatusCode Status { get; set; }
        public string Message { get; set; }
    }
    public class ErrorClientResult : ClientJsonResult
    {
        public string StackTrace { get; set; }
        public string ReqestedUrl { get; set; }
    }
}