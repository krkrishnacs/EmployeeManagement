using Microsoft.Ajax.Utilities;
using Microsoft.Win32;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Drawing.Imaging;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace Inspinia_MVC5.CommonExtension
{
    public static class CommonExtensionMethos
    {
        
            public static string Serialize(this object _object)
            {
                return JsonConvert.SerializeObject(_object);
            }
            public static T Deserialize<T>(this string jsonData)
            {
                return JsonConvert.DeserializeObject<T>(jsonData);
            }
            public static T DeepClone<T>(this T obj)
            {
                using (var ms = new MemoryStream())
                {
                    var formatter = new BinaryFormatter();
                    formatter.Serialize(ms, obj);
                    ms.Position = 0;

                    return (T)formatter.Deserialize(ms);
                }
            }
            public static object ReplaceDbNull(this object val)
            {
                if ((val == null))
                {
                    return DBNull.Value;
                }
                else if (val.GetType() == typeof(string))
                {
                    if (string.IsNullOrEmpty(val as string))
                    {
                        return DBNull.Value;
                    }
                    else if (val.GetType() == typeof(DateTime?))
                    {
                        return (val as DateTime?).Value.ToString("yyyy-MM-dd hh:mm:ss");
                    }

                }

                return val;

            }
            public static string ReplaceNull(this Object val)
            {
                if ((val == null))
                {
                    return null;
                }
                else if (val.GetType() == typeof(string))
                {
                    if (string.IsNullOrEmpty(val as string))
                    {
                        return null;
                    }
                }

                return val as string;
            }
            public static string GetUniqueFileName(string extension)
            {
                return string.Format(@"{0}{1}", DateTime.Now.Ticks, (string.IsNullOrEmpty(extension) ? "" : string.Format(".{0}", extension.Replace(".", ""))));
            }
            public static string SaveFile(this HttpPostedFileBase file)
            {
                string relativePath = ConfigurationManager.AppSettings["FileUploadDir"];
                if (string.IsNullOrEmpty(relativePath))
                {
                    throw new Exception("File Upload location Not Configured, Key=>FileUploadDir");
                }
                var actualLocation = HttpContext.Current.Server.MapPath("~" + relativePath);
                if (!Directory.Exists(actualLocation))
                {
                    Directory.CreateDirectory(actualLocation);
                }
                var fileName = Path.GetFileName(file.FileName);
                string documentName = fileName;
                string extension = new FileInfo(documentName).Extension;
                string wellKnownFileName = GetUniqueFileName(extension);
                var path = Path.Combine(actualLocation, wellKnownFileName);
                file.SaveAs(path);
                return Path.Combine(relativePath, wellKnownFileName);
            }
            public static string SaveAsFile(this byte[] bytes, string filePath, string newFileName)
            {
                string relativePath = ConfigurationManager.AppSettings["FileUploadDir"];
                if (string.IsNullOrEmpty(relativePath))
                {
                    throw new Exception("File Upload location Not Configured, Key=>FileUploadDir");
                }
                var actualLocation = HttpContext.Current.Server.MapPath("~" + relativePath);
                actualLocation = Path.Combine(actualLocation, filePath);
                if (!Directory.Exists(actualLocation))
                {
                    Directory.CreateDirectory(actualLocation);
                }
                string documentName = newFileName;

                var path = Path.Combine(actualLocation, documentName);
                using (Stream file = new FileStream(path, FileMode.OpenOrCreate, FileAccess.ReadWrite))
                {
                    file.Write(bytes, 0, bytes.Length);
                    file.Close();
                }
                var strPath = Path.Combine(relativePath, filePath, documentName);
                strPath = strPath.TrimStart('~').TrimStart('/').TrimStart('\\').Replace('\\', '/');
                return strPath;
            }
            public static byte[] GetFileBytes(this string relativeFilePath)
            {
                if (string.IsNullOrEmpty(relativeFilePath))
                {
                    throw new Exception("File path can not be empty");
                }
                var root = HttpContext.Current.Server.MapPath("~");
                var actualFilePath = Path.Combine(root, relativeFilePath);
                if (!File.Exists(actualFilePath))
                {
                    throw new FileNotFoundException("File not exist");
                }
                return File.ReadAllBytes(actualFilePath);
            }

            public static string GetExtension(this string documentName)
            {
                if (documentName == null)
                {
                    return null;
                }
                return new FileInfo(documentName).Extension;
            }
            public static string RevealServerPath(this string folderName)
            {
                return HttpContext.Current.Server.MapPath("~" + folderName);
            }
            public static string ConcatStr(this string concatTo, params string[] concatWith)
            {
                var rslt = concatTo;
                concatWith.ToList().ForEach(t =>
                {
                    rslt = string.Concat(rslt, t);
                });
                return rslt;
            }

            public static bool DeleteFile(this string fileName, string Dir)
            {
                try
                {
                    var filePath = HttpContext.Current.Server.MapPath("~" + Path.Combine(Dir, fileName));
                    if (File.Exists(filePath))
                    {
                        File.Delete(filePath);

                    }
                    return true;
                }
                catch (FileNotFoundException)
                {
                    throw new Exception(string.Format("File Deletion Aborted. File not found -'{0}'", fileName));
                }
            }
            public static bool DeleteFile(this string fullFileName)
            {
                try
                {
                    string relativePath = ConfigurationManager.AppSettings["FileUploadDir"];
                    if (string.IsNullOrEmpty(relativePath))
                    {
                        throw new Exception("File Upload location Not Configured, Key=>FileUploadDir");
                    }
                    var actualLocation = HttpContext.Current.Server.MapPath("~" + Path.GetDirectoryName(fullFileName));
                    var fileName = Path.GetFileName(fullFileName);
                    var filePath = HttpContext.Current.Server.MapPath("~" + Path.Combine(actualLocation, fileName));
                    if (File.Exists(filePath))
                    {
                        File.Delete(filePath);
                    }
                    return true;
                }
                catch (FileNotFoundException)
                {
                    throw new Exception(string.Format("File not found -'{0}'", fullFileName));
                }
            }
            public static string ReplaceNullIfEmpty(this string str)
            {
                return string.IsNullOrEmpty(str) ? null : str;
            }

            public static int ToInt32(this object data)
            {
                return Convert.ToInt32(data);
            }
            public static long ToInt64(this object data)
            {
                return Convert.ToInt64(data);
            }
            public static short ToInt16(this object data)
            {
                return Convert.ToInt16(data);
            }
            public static decimal ToDecimal(this object data)
            {
                return Convert.ToDecimal(data);
            }
            //
            public static int? ToInt32Null(this object data)
            {
                if (data == null) return null;
                return Convert.ToInt32(data);
            }
            public static long? ToInt64Null(this object data)
            {
                if (data == null) return null;
                return Convert.ToInt64(data);
            }
            public static short? ToInt16Null(this object data)
            {
                if (data == null) return null;
                return Convert.ToInt16(data);
            }
            public static decimal? ToDecimalNull(this object data)
            {
                if (data == null) return null;
                return Convert.ToDecimal(data);
            }
            public static Nullable<T> ToNullable<T>(this object s) where T : struct
            {
                Nullable<T> result = new Nullable<T>();
                try
                {
                    if (s == null)
                    {
                        TypeConverter conv = TypeDescriptor.GetConverter(typeof(T));
                        result = (T)conv.ConvertFrom(s);
                    }
                }
                catch { }
                return result;
            }
            public static bool? ToBoolNull(this object data)
            {
                if (data == null) return null;
                return Convert.ToBoolean(data);
            }
            public static bool ToBool(this object data)
            {

                return Convert.ToBoolean(data);
            }
            public static bool IsNull(this object data)
            {
                if (data == null) return true;
                return false;
            }
            public static bool IsNotNull(this object data)
            {
                return !data.IsNull();
            }
            public static T IsNullThen<T>(this object data, T replace)
            {
                if (data == null) return replace;
                return (T)data;
            }
            public static object IsNullThen(this object data, object replace)
            {
                if (data == null) return replace;
                return data;
            }
            public static void IfNull<T>(this T data, Action<T> action = null)
            {
                if (action != null && data.IsNull())
                {
                    action(data);
                }
            }
            public static void IfNotNull<T>(this T data, Action<T> action = null)
            {
                if (action != null && !data.IsNull())
                {
                    action(data);
                }
            }
            public static void If<T>(this T data, Func<T, bool> func = null, Action<T> trueAction = null, Action<T> falseAction = null)
            {
                if (func != null)
                {
                    if (func(data))
                    {
                        if (trueAction.IsNotNull())
                        {
                            trueAction(data);
                        }
                    }
                    else
                    {
                        if (falseAction.IsNotNull())
                        {
                            falseAction(data);
                        }
                    }
                }
            }
            public static T1 If<T, T1>(this T data, Func<T, bool> func, T1 return1, T1 return2)
            {
                if (func(data))
                {
                    return return1;
                }
                else
                {
                    return return2;
                }
            }
            public static bool IsValidFinYear(this string finYear)
            {
                if (string.IsNullOrEmpty(finYear))
                    return false;

                string[] arr = finYear.Split('-');
                if (arr.Length != 2)
                    return false;

                var leftYear = arr[0].ToInt32();
                var rightYear = arr[1].ToInt32();
                if (leftYear + 1 != rightYear)
                    return false;

                return true;
            }
            public static object ToDbDate(this DateTime? date)
            {
                if (date == null)
                    return DBNull.Value;
                else
                    return date.Value.ToString("yyyy'-'MM'-'dd HH:mm:ss");
            }
            public static object ToDbDate(this DateTime? date, object nullReplace)
            {
                if (date == null)
                    return nullReplace;
                else
                    return date.Value.ToString("yyyy'-'MM'-'dd HH:mm:ss");
            }
            public static string ToDbDate(this DateTime date)
            {
                return date.ToString("yyyy'-'MM'-'dd HH:mm:ss");
            }
            public static string ToStrDate(this DateTime? date, string format = "dd'/'MM'/'yyyy")
            {
                if (date == null)
                    return "";
                else
                    return date.Value.ToString(format);
            }
            public static string ToStrDate(this DateTime date, string format = "dd'/'MM'/'yyyy")
            {
                return date.ToString(format);
            }

            #region copy from vb extension
            public static string GetFinYear(this DateTime date)
            {
                string finYear = "";
                int curMonth = date.Month;
                if (curMonth > FinYearEndingMonth() && curMonth <= 12)
                {
                    finYear = string.Format("{0}-{1}", date.Year, date.Year + 1);
                }
                else if (curMonth >= 1 && curMonth <= FinYearEndingMonth())
                {
                    finYear = string.Format("{0}-{1}", date.Year - 1, date.Year);
                }
                return finYear;
            }

            public static int GetMonthDiffFromTwoDates(DateTime bigDate, DateTime smallDate)
            {
                return (bigDate.Year * 12 + bigDate.Month) - (smallDate.Year * 12 + smallDate.Month);
            }
            public static double GetDaysDiffFromTwoDates(DateTime bigDate, DateTime smallDate)
            {
                return (bigDate - smallDate).TotalDays;
            }

            public static DateTime GetFinYearFirstDate(this DateTime curDate)
            {
                return GetFinYearFirstDate(GetFinYear(curDate));
            }

            public static DateTime GetFinYearFirstDate(this string finYear)
            {
                int leftYear = Convert.ToInt32(finYear.Split('-')[0]);
                int startedMonth = FinYearStartingMonth();
                DateTime firstDate = new DateTime(leftYear, startedMonth, 1);
                return firstDate;
            }
            public static DateTime GetFinYearLastDate(this string finYear)
            {
                int rightYear = Convert.ToInt32(finYear.Split('-')[1]);
                int endMonth = FinYearEndingMonth();
                DateTime lastDate = new DateTime(rightYear, endMonth, DateTime.DaysInMonth(rightYear, endMonth));
                return lastDate;

            }
            public static int GetStartedYear(this string finYear)
            {
                return Convert.ToInt32(finYear.Split('-')[0]);
            }

            #region private helper method
            static int[] FinYearConfig()
            {
                var confg = ConfigurationManager.AppSettings["FinYearMonth"];
                if (string.IsNullOrEmpty(confg)) throw new InvalidOperationException("Fin-Year Configuration not available");
                return confg.Split('-').Select(int.Parse).ToArray();
            }
            static int FinYearStartingMonth()
            {
                return FinYearConfig()[0];
            }
            static int FinYearEndingMonth()
            {
                return FinYearConfig()[1];
            }
            #endregion
            #endregion

            #region new extensions
            public static string RemoveBase64FileHeader(this string base64value)
            {
                // sample of value => "data:image/png;base64,iVBORw..............
                // take and return the value part  => iVBORw..............

                //var response = Regex.Replace(result, @"^data:[a-zA-Z]+\/[a-zA-Z]+;base64,", string.Empty); //not use but working
                var resp = base64value.Substring(base64value.IndexOf(',') + 1);
                return resp;
            }
            public static SqlParameter AddOutParam(this SqlCommand sqlCommand, string paramName, SqlDbType dbType = SqlDbType.NVarChar, int size = -1, object value = null)
            {
                paramName = paramName.StartsWith("@") ? paramName : string.Format("@{0}", paramName);
                SqlParameter outPutParameter = new SqlParameter(paramName, dbType, size);
                outPutParameter.Value = value;
                outPutParameter.Direction = ParameterDirection.Output;
                sqlCommand.Parameters.Add(outPutParameter);
                return outPutParameter;
            }
            public static SqlCommand AddParam(this SqlCommand sqlCommand, string paramName, object value)
            {
                paramName = paramName.StartsWith("@") ? paramName : string.Format("@{0}", paramName);

                sqlCommand.Parameters.AddWithValue(paramName, value);
                return sqlCommand;
            }
            public static T GetParamValue<T>(this SqlParameter sqlParam)
            {
                return sqlParam.Value.ConvertTo<T>();
            }
            #endregion
            #region url extensions
            public static Uri getHost()
            {
                return HttpContext.Current.Request.Url;
            }
            public static string BindHost(this string relativePath)
            {
                Uri result = null;
                if (Uri.TryCreate(getHost(), relativePath, out result))
                {
                    return result.ToString();
                }
                return relativePath;
            }
            public static string ReplaceCurrHost(this string oldUrl)
            {
                var builder1 = new UriBuilder(getHost());
                var builder = new UriBuilder(oldUrl);
                builder.Host = builder1.Host;
                builder.Port = builder1.Port;
                return builder.Uri.ToString();
            }
            #endregion
            public static T FromJson<T>(this string json)
            {
                return JsonConvert.DeserializeObject<T>(json);
            }
            public static string ToJson(this object _object)
            {
                return JsonConvert.SerializeObject(_object);
            }

            public static T ConvertTo<T>(this object _obj)
            {
                TypeConverter conv = TypeDescriptor.GetConverter(typeof(T));
                Type type = Nullable.GetUnderlyingType(typeof(T));
                if (type != null && _obj == null)
                {

                    return default(T);
                }
                return (T)conv.ConvertFrom(_obj.ToString());
            }

            public static string DecodeUrl(this string urlData)
            {
                if (urlData != null)
                {
                    return HttpUtility.UrlDecode(Convert.ToString(urlData)).Replace(" ", "+"); ;
                }
                return urlData;
            }
            public static T IsNullOrEmptyThen<T>(this string data, T replace)
            {
                if (string.IsNullOrEmpty(data))
                    return replace;
                else
                    return data.ConvertTo<T>();
            }
            //public static Exception LogError(this Exception ex, string message = null)
            //{
            //    log4net.ILog log = log4net.LogManager.GetLogger("Default logger");
            //    log.Error(message ?? ex.Message, ex);
            //    return ex;
            //}
            //public static string logInfo(this string msg)
            //{
            //    log4net.ILog log = log4net.LogManager.GetLogger("Default logger");
            //    log.Info(msg);
            //    return msg;
            //}
            //public static string logWarning(this string msg)
            //{
            //    log4net.ILog log = log4net.LogManager.GetLogger("Default logger");
            //    log.Warn(msg);
            //    return msg;
            //}

            public static string RawHttpRequest(this HttpRequestBase request)
            {
                var list = new List<string>();
                list.Add(string.Format("HttpMethod: {0}, Path: {1}", request.RequestType, request.Url.ToString()));
                list.Add(string.Format("Referer url: {0}", (request.UrlReferrer ?? "" as object) as string));

                list.Add(string.Format("HTTP_X_FORWARDED_FOR: {0}", request.ServerVariables["HTTP_X_FORWARDED_FOR"]));
                list.Add(string.Format("HTTP_X_CLUSTER_CLIENT_IP : {0}", request.ServerVariables["HTTP_X_CLUSTER_CLIENT_IP"]));
                list.Add(string.Format("REMOTE_ADDR : {0}", request.ServerVariables["REMOTE_ADDR"]));
                list.Add(string.Format("UserHostAddress : {0}", request.UserHostAddress));
                list.Add(string.Format("UserHostName : {0}", request.UserHostName));
                list.Add(string.Format("Headers:"));
                list.Add(request.ServerVariables["ALL_RAW"]);

                request.InputStream.Position = 0;
                var bytes = new byte[request.InputStream.Length];
                request.InputStream.Read(bytes, 0, bytes.Length);
                string content = (request.ContentEncoding ?? Encoding.ASCII).GetString(bytes);
                request.InputStream.Position = 0;
                list.Add(string.Format("Body:"));
                list.Add(content.Trim());

                StringBuilder s = new StringBuilder();
                list.ForEach(t =>
                {
                    s.AppendLine(t);
                });
                return s.ToString();
            }
            public static string RawHttpRequest(this HttpRequest request)
            {
                var list = new List<string>();
                list.Add(string.Format("HttpMethod: {0}, Path: {1}", request.RequestType, request.Url.ToString()));
                list.Add(string.Format("Referer url: {0}", (request.UrlReferrer ?? "" as object) as string));

                list.Add(string.Format("HTTP_X_FORWARDED_FOR: {0}", request.ServerVariables["HTTP_X_FORWARDED_FOR"]));
                list.Add(string.Format("HTTP_X_CLUSTER_CLIENT_IP : {0}", request.ServerVariables["HTTP_X_CLUSTER_CLIENT_IP"]));
                list.Add(string.Format("REMOTE_ADDR : {0}", request.ServerVariables["REMOTE_ADDR"]));
                list.Add(string.Format("UserHostAddress : {0}", request.UserHostAddress));
                list.Add(string.Format("UserHostName : {0}", request.UserHostName));
                list.Add(string.Format("Headers:"));
                list.Add(request.ServerVariables["ALL_RAW"]);

                request.InputStream.Position = 0;
                var bytes = new byte[request.InputStream.Length];
                request.InputStream.Read(bytes, 0, bytes.Length);
                string content = (request.ContentEncoding ?? Encoding.ASCII).GetString(bytes);
                request.InputStream.Position = 0;
                list.Add(string.Format("Body:"));
                list.Add(content.Trim());

                StringBuilder s = new StringBuilder();
                list.ForEach(t =>
                {
                    s.AppendLine(t);
                });
                return s.ToString();
            }
            public static DateTime? TruncateMiliSeconds(this DateTime? _date)
            {
                if (_date != null)
                {
                    _date = DateTime.ParseExact(_date.ToDbDate().ToString(), "yyyy'-'MM'-'dd HH:mm:ss", null);
                }
                return _date;
            }
            public static void RemoveItems<T>(this List<T> lst, List<T> removables)
            {
                if (!removables.IsNull())
                {
                    lst = lst.Except(removables).ToList();
                }

            }
            public static string ChangeExtension(this string fileName, string extension)
            {
                if (string.IsNullOrEmpty(fileName) || string.IsNullOrEmpty(extension))
                {
                    return fileName;
                }
                var _extension = extension.ToValidExtension();
                return string.Concat(Path.GetFileNameWithoutExtension(fileName), _extension);
            }
            public static string ToValidExtension(this string extension, bool includeDot = true)
            {
                if (string.IsNullOrEmpty(extension))
                {
                    return extension;
                }
                var _extension = extension.StartsWith(".") ? extension.TrimStart('.') : extension;
                _extension = _extension.ToLower();
                return includeDot ? $".{_extension}" : _extension;
            }
            //public static string EncryptDefault(this string data)
            //{
            //    var key = "61501D8B-C412-4B56-9774-B288B60389ED";
            //    var algo = new RijndaelAlgorithm();
            //    return algo.Encrypt(data, key);
            //}
            //public static string DecryptDefault(this string cipherData)
            //{
            //    var key = "61501D8B-C412-4B56-9774-B288B60389ED";
            //    var algo = new RijndaelAlgorithm();
            //    return algo.Decrypt(cipherData, key);
            //}
            //public static byte[] EncryptDefault(byte[] data)
            //{
            //    var key = "61501D8B-C412-4B56-9774-B288B60389ED";
            //    var algo = new RijndaelAlgorithm();
            //    return algo.Encrypt(data, key);
            //}
            //public static byte[] DecryptDefault(byte[] cipherData)
            //{
            //    var key = "61501D8B-C412-4B56-9774-B288B60389ED";
            //    var algo = new RijndaelAlgorithm();
            //    return algo.Decrypt(cipherData, key);
            //}
            public static string SaveAsFile(this Bitmap bmpPhoto, string filePath, string newFileName)
            {
                string relativePath = ConfigurationManager.AppSettings["FileUploadDir"];
                if (string.IsNullOrEmpty(relativePath))
                {
                    throw new Exception("File Upload location Not Configured, Key=>FileUploadDir");
                }
                var actualLocation = HttpContext.Current.Server.MapPath("~" + relativePath);
                actualLocation = Path.Combine(actualLocation, filePath);
                if (!Directory.Exists(actualLocation))
                {
                    Directory.CreateDirectory(actualLocation);
                }
                string documentName = newFileName;

                var path = Path.Combine(actualLocation, documentName);
                try
                {
                    //Bitmap bitmap = new Bitmap(bmpPhoto.Width, bmpPhoto.Height, bmpPhoto.PixelFormat);
                    //Graphics g = Graphics.FromImage(bitmap);
                    //g.DrawImage(bmpPhoto, new Point(0, 0));
                    //g.Dispose();
                    //bmpPhoto.Dispose();
                    //bitmap.Save(path);
                    //bmpPhoto.Save(path);
                    using (MemoryStream memory = new MemoryStream())
                    {
                        using (FileStream fs = new FileStream(path, FileMode.Create, FileAccess.ReadWrite))
                        {
                            new Bitmap(bmpPhoto).Save(memory, ImageFormat.Jpeg);
                            byte[] bytes = memory.ToArray();
                            fs.Write(bytes, 0, bytes.Length);
                        }
                    }
                    var strPath = Path.Combine(relativePath, filePath, documentName);
                    strPath = strPath.TrimStart('~').TrimStart('/').TrimStart('\\').Replace('\\', '/');
                    return strPath;
                }
                catch (Exception)
                {

                    throw;
                }

            }
            public static Bitmap ToBitmap(this byte[] imageData)
            {
                Bitmap newImage = null;
                //Read image data into a memory stream
                using (MemoryStream ms = new MemoryStream(imageData, 0, imageData.Length))
                {
                    ms.Write(imageData, 0, imageData.Length);
                    ms.Seek(0, SeekOrigin.Begin);
                    //Set image variable value using memory stream.
                    newImage = (Bitmap)Bitmap.FromStream(ms, false);
                    ms.Close();
                    ms.Dispose();
                }

                return newImage;
            }
            public static string GetDefaultExtension(this string mimeType)
            {
                string result;
                RegistryKey key;
                object value;

                key = Registry.ClassesRoot.OpenSubKey(@"MIME\Database\Content Type\" + mimeType, false);
                value = key != null ? key.GetValue("Extension", null) : null;
                result = value != null ? value.ToString() : string.Empty;

                return result;
            }
            public static byte[] ConvertBitmapToBytes(this Bitmap image, System.Drawing.Imaging.ImageFormat imageFormat = null)
            {
                if (image != null)
                {
                    MemoryStream ms = new MemoryStream();
                    using (ms)
                    {
                        image.Save(ms, imageFormat ?? System.Drawing.Imaging.ImageFormat.Jpeg);
                        ms.Position = 0;
                        byte[] bytes = ms.ToArray();

                        return bytes;
                    }
                }
                else
                {
                    return null;
                }
            }
            public static string ComputeFileHash(this string fileName, bool handleException = true)
            {
                try
                {
                    using (var md5 = MD5.Create())
                    {
                        using (var stream = File.OpenRead(fileName))
                        {
                            var bytes = md5.ComputeHash(stream);
                            return BitConverter.ToString(bytes).Replace("-", "").ToLowerInvariant();
                        }
                    }
                }
                catch
                {
                    if (handleException)
                        return null;
                    else throw;
                }
            }
        }
    }
