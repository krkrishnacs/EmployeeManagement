﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inspinia_MVC5.Models
{
    public class TransactionMaster
    {
        public int Id { get; set; }
        public string TransactionYear { get; set; }
        public string FromYear { get; set; }
        public string FromMonth { get; set; }
        public string ToYear { get; set; }
        public string ToMonth { get; set; }
        public string Status { get; set; }
        public int code { get; set; }
        public string Msg { get; set; }
    }
}