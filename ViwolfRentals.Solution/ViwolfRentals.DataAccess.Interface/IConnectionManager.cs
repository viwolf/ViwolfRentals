using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViwolfRentals.DataAccess.Interface
{
    public interface IConnectionManager
    {
        IDbConnection GetConnection(string keyName);
    }
}
