using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViwolfRentals.FrontEnd.Configuration
{
    public class RSParametersCollection : ConfigurationElementCollection
    {
        public override ConfigurationElementCollectionType CollectionType
        {
            get
            {
                return ConfigurationElementCollectionType.BasicMap;
            }
        }

        public void Add(RSParametersElement serviceConfig)
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
                return "key";
            }
        }
        protected override ConfigurationElement CreateNewElement()
        {
            return new RSParametersElement();
        }
        protected override object GetElementKey(ConfigurationElement element)
        {
            return ((RSParametersElement)element).Name;
        }
    }
}
