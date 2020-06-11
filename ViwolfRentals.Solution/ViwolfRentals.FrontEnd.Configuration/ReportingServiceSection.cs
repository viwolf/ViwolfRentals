using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViwolfRentals.FrontEnd.Configuration
{
    public class ReportingServiceSection : ConfigurationSection
    {
        [ConfigurationProperty("Reportings", IsDefaultCollection = false, IsRequired = false)]
        public ReportingServiceCollection Reportings
        {
            get { return (ReportingServiceCollection)base["Reportings"]; }
        }


        #region Static
        private static ReportingServiceSection currentConfiguration = null;
        public static ReportingServiceSection CurrentConfiguration
        {
            get
            {
                if (currentConfiguration == null)
                {
                    currentConfiguration = System.Configuration.ConfigurationManager.GetSection("ReportingServiceSection") as ReportingServiceSection;
                }
                return currentConfiguration;
            }
        }
        #endregion
    }
}
