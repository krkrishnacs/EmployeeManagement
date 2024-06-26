using Inspinia_MVC5.CommonExtension;
using Inspinia_MVC5.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inspinia_MVC5.AppCodes.Dal
{
    public class TransactionMasterDal:DalBase
    {
        public TransactionMasterDal(long? actorId) : base(actorId)
        {
        }
        public List<Common> Get_TransactionYear()
        {
            var cmd = NewCommand("dbo.Get_AllSessionDes");
            return GetResult(cmd).Convert<Common>();
        }
        public List<Common> GetFromYear()
        {
            var cmd = NewCommand("dbo.GetYearAll");
            return GetResult(cmd).Convert<Common>();
        }
        public List<Common> GetToYear()
        {
            var cmd = NewCommand("dbo.GetYearAll");
            return GetResult(cmd).Convert<Common>();
        }
        public List<Common> GetFromMonth()
        {
            var cmd = NewCommand("dbo.GetAllMonth");
            return GetResult(cmd).Convert<Common>();
        }
        public List<Common> GetToMonth()
        {
            var cmd = NewCommand("dbo.GetAllMonth");
            return GetResult(cmd).Convert<Common>();
        }
        public TransactionMaster AddTransactionMaster(TransactionMaster transactionMaster)
        {
            var cmd = NewCommand("dbo.Add_UpdateTranscationMaster");
            cmd.Parameters.AddWithValue("@Id", transactionMaster.Id.ReplaceDbNull());
            cmd.Parameters.AddWithValue("@TransactionYear", transactionMaster.TransactionYear.ReplaceDbNull());
            cmd.Parameters.AddWithValue("@FromYear", transactionMaster.FromYear.ReplaceDbNull());
            cmd.Parameters.AddWithValue("@FromMonth", transactionMaster.FromMonth.ReplaceDbNull());
            cmd.Parameters.AddWithValue("@ToYear", transactionMaster.ToYear.ReplaceDbNull());
            cmd.Parameters.AddWithValue("@ToMonth", transactionMaster.ToMonth.ReplaceDbNull());
            cmd.Parameters.AddWithValue("@Status", transactionMaster.Status.ReplaceDbNull());
            return GetResult(cmd).Convert<TransactionMaster>().FirstOrDefault();
        }
        public List<TransactionMaster> ShowAllTransactionMaster()
        {
            var cmd = NewCommand("dbo.TransactionMaster");
            var dt = GetResult(cmd);
            return dt.Convert<TransactionMaster>();
        }
    }
}