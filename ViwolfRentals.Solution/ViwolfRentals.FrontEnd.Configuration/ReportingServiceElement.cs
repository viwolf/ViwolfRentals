using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViwolfRentals.FrontEnd.Configuration
{
    public class ReportingServiceElement : ConfigurationElement
    {
        [ConfigurationProperty("name", IsRequired = true)]
        public string Name
        {
            get { return (string)this["name"]; }
            set { this["name"] = value; }
        }

        [ConfigurationProperty("RSUrl", IsRequired = true)]
        public Uri RSUrl
        {
            get { return (Uri)base["RSUrl"]; }
            set { base["RSUrl"] = value; }
        }

       

        [ConfigurationProperty("RSPath", IsRequired = true)]
        public string RSPath
        {
            get { return (string)this["RSPath"]; }
            set { this["RSPath"] = value; }
        }

        [ConfigurationProperty("RSUsuario", IsRequired = true)]
        public string RSUsuario
        {
            get { return (string)this["RSUsuario"]; }
            set { this["RSUsuario"] = value; }
        }

        [ConfigurationProperty("RSPassword", IsRequired = true)]
        public string RSPassword
        {
            get { return (string)this["RSPassword"]; }
            set { this["RSPassword"] = value; }
        }

        [ConfigurationProperty("RSDominio", IsRequired = true)]
        public string RSDominio
        {
            get { return (string)this["RSDominio"]; }
            set { this["RSDominio"] = value; }
        }

        [ConfigurationProperty("PathViewer", IsRequired = true)]
        public string PathViewer
        {
            get { return (string)this["PathViewer"]; }
            set { this["PathViewer"] = value; }
        }


        [ConfigurationProperty("PathViewerPreview", IsRequired = true)]
        public string PathViewerPreview
        {
            get { return (string)this["PathViewerPreview"]; }
            set { this["PathViewerPreview"] = value; }
        }

        [ConfigurationProperty("PathViewerPdf", IsRequired = true)]
        public string PathViewerPdf
        {
            get { return (string)this["PathViewerPdf"]; }
            set { this["PathViewerPdf"] = value; }
        }
    }
}
