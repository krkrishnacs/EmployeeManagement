using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Inspinia_MVC5.AppCodes.Dal;
using Inspinia_MVC5.Models;

namespace Inspinia_MVC5.AppCodes.Services
{
    public class TransactionMasterService
    {
        public long? _actorId { get; private set; }

        public TransactionMasterService(long? actorId)
        {
            _actorId = actorId;
        }
        public List<Common> Get_TransactionYear()
        {
            using (TransactionMasterDal resource = new TransactionMasterDal(null))
            {
                return resource.Get_TransactionYear();
            }
        }
        public List<Common> GetFromYear()
        {
            using (TransactionMasterDal resource = new TransactionMasterDal(null))
            {
                return resource.GetFromYear();
            }
        }
        public List<Common> GetToYear()
        {
            using (TransactionMasterDal resource = new TransactionMasterDal(null))
            {
                return resource.GetToYear();
            }
        }
        public List<Common> GetFromMonth()
        {
            using (TransactionMasterDal resource = new TransactionMasterDal(null))
            {
                return resource.GetFromMonth();
            }
        }
        public List<Common> GetToMonth()
        {
            using (TransactionMasterDal resource = new TransactionMasterDal(null))
            {
                return resource.GetToMonth();
            }
        }
        public TransactionMaster AddTransactionMaster(TransactionMaster transactionMaster)
        {
            using (TransactionMasterDal resource = new TransactionMasterDal(null))
            {
                return resource.AddTransactionMaster(transactionMaster);
            }
        }
        public List<TransactionMaster> ShowAllTransactionMaster(TransactionMaster transactionMaster)
        {
            using (TransactionMasterDal resource = new TransactionMasterDal(null))
            {
                return resource.ShowAllTransactionMaster();
            }
        }
    }
}