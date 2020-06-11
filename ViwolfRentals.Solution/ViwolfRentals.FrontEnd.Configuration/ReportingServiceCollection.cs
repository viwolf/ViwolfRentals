using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViwolfRentals.FrontEnd.Configuration
{
    public class ReportingServiceCollection : ConfigurationElementCollection
    {
        public override ConfigurationElementCollectionType CollectionType
        {
            get
            {
                return ConfigurationElementCollectionType.BasicMap;
            }
        }

        public void Add(ReportingServiceElement serviceConfig)
        {
            BaseAdd(serviceConfig);
        }

        public void Clear()
        {
            BaseClear();
        }

        protected override string ElementName
        {
            get
            {
                return "Reporting";
            }
        }
        protected override ConfigurationElement CreateNewElement()
        {
            return new ReportingServiceElement();
        }
        protected override object GetElementKey(ConfigurationElement element)
        {
            return ((ReportingServiceElement)element).Name;
        }
    }
}
