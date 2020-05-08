using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViwolfRentals.DataAccess.Interface;

namespace ViwolfRentals.DataAccess
{
    public class ConnectionManager : IConnectionManager
    {
        public const string ViwolfRentalsdatabase = "ViwolfRentalsDB";

        public IDbConnection GetConnection(string keyName)
        {
            return new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["ViwolfRentalsDB"].ConnectionString);
        }
    }
}
