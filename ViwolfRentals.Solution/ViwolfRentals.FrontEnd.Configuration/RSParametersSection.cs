using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViwolfRentals.FrontEnd.Configuration
{
    public class RSParametersSection : ConfigurationSection
    {
        [ConfigurationProperty("keys", IsDefaultCollection = false, IsRequired = false)]
        public RSParametersCollection Keys
        {
            get { return (RSParametersCollection)base["keys"]; }
        }


        #region Static
        private static RSParametersSection currentConfiguration = null;
        public static RSParametersSection CurrentConfiguration
        {
            get
            {
                if (currentConfiguration == null)
                {
                    currentConfiguration = System.Configuration.ConfigurationManager.GetSection("rsParametersSection") as RSParametersSection;
                }
                return currentConfiguration;
            }
        }
        #endregion
    }
}
