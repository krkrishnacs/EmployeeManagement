using Inspinia_MVC5.CommonExtension;
using Inspinia_MVC5.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inspinia_MVC5.Controllers
{
    public class ControllerBase : Controller
    {
        protected ClientJsonResult _cr = new ClientJsonResult() { Status = System.Net.HttpStatusCode.OK };
        protected string _ViewBasePath { get; set; }

        public ControllerBase() { }
        public ControllerBase(string viewBasePath)
        {
            this._ViewBasePath = viewBasePath;
        }
        protected string BuildViewPath(string viewName, string overrideViewBasePath = null)
        {
            var extension = viewName.GetExtension();
            //if extension not available, then set .cshtml
            viewName = string.IsNullOrEmpty(extension) ? string.Format("{0}.cshtml", viewName) : viewName;
            var basePath = overrideViewBasePath ?? this._ViewBasePath;
            var basePathSplit = (basePath ?? "")
                .TrimStart('~')//remove first char ~ if available
                .Split('/', '\\')//split string by /,\
                .Where(t => !string.IsNullOrEmpty(t))//pick with out empty index
                .ToList();

            basePathSplit.Insert(0, "~");
            basePathSplit.Add(viewName);
            var path = Path.Combine(basePathSplit.ToArray());
            return path;
        }
        protected string ExportHtml<T>(string viewPath, T Model)
        {
            ViewData.Model = Model;
            using (var sw = new StringWriter())
            {
                var viewResult = ViewEngines.Engines.FindPartialView(ControllerContext,
                                                                         viewPath);
                var viewContext = new ViewContext(ControllerContext, viewResult.View, ViewData, TempData, sw);
                viewResult.View.Render(viewContext, sw);
                viewResult.ViewEngine.ReleaseView(ControllerContext, viewResult.View);
                return sw.GetStringBuilder().ToString();
            }
        }
        protected override JsonResult Json(object data, string contentType, System.Text.Encoding contentEncoding, JsonRequestBehavior behavior)
        {
            return new JsonResult()
            {
                Data = data,
                ContentType = contentType,
                ContentEncoding = contentEncoding,
                JsonRequestBehavior = behavior,
                MaxJsonLength = Int32.MaxValue
            };
        }
    }
}