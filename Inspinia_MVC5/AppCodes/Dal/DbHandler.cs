using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;

namespace Inspinia_MVC5.AppCodes
{
    public class DbHandler: IDisposable
    {
        protected SqlConnection cn = new SqlConnection();
        protected SqlTransaction tr;
        public string ConnectionString
        {
            get { return cn.ConnectionString; }
        }
        public ConnectionState ConnectionState { get { return cn.State; } }
        protected DbHandler()
        {

        }
        public DbHandler(string conString)
        {
            if (cn == null)
                cn = new SqlConnection();
            cn.ConnectionString = ConfigurationManager.ConnectionStrings[conString].ConnectionString;
        }

        protected void BeginTran()
        {
            if (cn.State != ConnectionState.Open)
            {
                cn.Open();
            }
            tr = cn.BeginTransaction();
        }
        protected void CommitTran()
        {
            if (tr != null)
            {
                tr.Commit();
            }

        }
        protected void RollBackTran()
        {
            if (tr != null)
            {
                tr.Rollback();
            }
        }
        protected void ResetConnection(SqlConnection cn)
        {
            this.cn = cn;
        }
        protected virtual SqlCommand NewCommand(string commandText, CommandType commandType = CommandType.StoredProcedure)
        {
            var Command = NewCommand();
            Command.CommandText = commandText;
            Command.Connection = cn;
            Command.CommandType = commandType;
            return Command;
        }
        protected virtual SqlCommand NewCommand(string commandText, SqlTransaction tr, CommandType commandType = CommandType.StoredProcedure)
        {
            var Command = NewCommand();
            Command.CommandText = commandText;
            Command.Connection = cn;
            Command.Transaction = tr;
            Command.CommandType = commandType;
            return Command;
        }
        protected SqlCommand NewCommand()
        {
            var command = new SqlCommand();
            command.CommandTimeout = CommandTimeOut();
            return command;
        }
        protected void ChangeConnection(SqlConnection cn)
        {
            this.cn = cn;
        }
        protected SqlConnection GetConnection()
        {
            return cn;
        }
        int CommandTimeOut()
        {
            System.Data.SqlClient.SqlConnectionStringBuilder builder = new System.Data.SqlClient.SqlConnectionStringBuilder(ConnectionString);
            return builder.ConnectTimeout;
        }
        protected DataSet GetResults(SqlCommand command)
        {
            DataSet ds = new DataSet();
            SqlDataAdapter da = new SqlDataAdapter(command);
            da.Fill(ds);
            return ds;
        }
        protected DataTable GetResult(SqlCommand command)
        {
            DataTable dt = new DataTable();
            SqlDataAdapter da = new SqlDataAdapter(command);
            da.Fill(dt);
            return dt;
        }
        protected T GetScalar<T>(SqlCommand cmd)
        {
            if (cn.State != ConnectionState.Open)
                cn.Open();
            var x = cmd.ExecuteScalar();
            TypeConverter conv = TypeDescriptor.GetConverter(typeof(T));
            Type type = Nullable.GetUnderlyingType(typeof(T));
            if (type != null && x == null)
            {

                return default(T);
            }
            return (T)conv.ConvertFrom(x.ToString());
        }
        protected int ExecuteNonQuery(SqlCommand cmd)
        {
            if (cn.State != ConnectionState.Open)
                cn.Open();
            return cmd.ExecuteNonQuery();
        }

        protected void CloseConnection()
        {
            cn.Close();
        }
        public void Dispose()
        {
            cn.Close();
            cn.Dispose();
        }
    }
}