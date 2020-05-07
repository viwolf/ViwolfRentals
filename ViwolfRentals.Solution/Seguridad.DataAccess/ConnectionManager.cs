using Seguridad.DataAccess.Interface;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seguridad.DataAccess
{
    public class ConnectionManager : IConnectionManager
    {
        public const string ViwolfRentalsdatabase = "ViwolfRentalsDB";

        //public IDbConnection GetConnection(string keyName)
        //{
        //    var contexto = Gmg.Common.TokenValidator.Context.Current.Claims.Where(a => a.Key == System.IdentityModel.Claims.ClaimTypes.Uri).Select(a => a.Value).FirstOrDefault();
        //    return GetConnection(keyName, contexto.Split('.').Last().ToUpper());
        //}

        IDbConnection IConnectionManager.GetConnection(string keyName)
        {
            return new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["ViwolfRentalsDB"].ConnectionString);
        }
    }
}
