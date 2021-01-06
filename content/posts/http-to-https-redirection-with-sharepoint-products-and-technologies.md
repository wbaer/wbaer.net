---
title: 'HTTP to HTTPS Redirection with SharePoint Products and Technologies'
date: Sun, 08 Feb 2009 12:46:03 +0000
draft: false
tags: ['Code Samples']
---

I've received several requests in regards to redirecting HTTP to HTTPS.  In this post I will briefly cover a select number methods and/or technologies that can be used to accomplish HTTP to HTTPS redirection.

**ISA 2006**

Modify the Web Listener connection properties to enable HTTP to HTTPS redirection (see below).

1.  Open Web Listener Properties on the Published Site.
2.  Select the Connections Tab.
3.  Select Redirect all Traffic from HTTP to HTTPS under HTTP to HTTPS Redirection.

**Port Forwarding**

In a port forwarding scenario you would allow an arbitrary inbound port on your router and configure a destination (forwarded) IIS Website on port 80 that implements native IIS redirection to forward the request to the SSL secured Web application.  This solution provides the highest level of security and requires the least amount of customization on behalf of your Web application; however, port forwarding is not supported by all devices, may not be offered by your network engineering team, or conflicts with other corporate policies, etc.

**[403.x](http://www.microsoft.com/technet/prodtechnol/WindowsServer2003/Library/IIS/21079107-1740-470e-a933-23a45494b8ba.mspx?mfr=true) Modification**

In this scenario you would modify the header if the 403.x to implement a META REFRESH to redirect clients to a specified Url.  This solution provides a level of security; however, the redirect is limited to a static Url and in many cases is not supported by all browsers (NOTE This is a proprietary extension to HTML, introduced by Netscape but supported by most web browsers), individual configurations, requires modification of IIS system files, and also does not communicate information about the source or destination to the browser.

**HTTP Module**

The following sample illustrates a HTTP module that replaces the http prefixes with https and handles the request.  In the sample code each event handler in this HTTP module is written as a private method of the module and when registered events are raised, ASP.NET will call the appropriate handler in the module.  The implementing (base) class provides initialization and disposal events through the [IHttpModule](http://msdn.microsoft.com/en-us/library/system.web.ihttpmodule.aspx) Interface (System.Web namespace).

The IHttpModule Interface provides module initialization and disposal events to the implementing class.  An initialization function registers HttpApplication events by adding an OnBeginRequest as the handler.  HttpApplication and HttpContext event objects are created to access the request and response properties in the handler.  The intrinsic request object for the current request are obtained by getting information about the Url of the current request as a canonical string representation of the instance.  If the beginning of the instance matches http: a replace method is called to replace that occurrence with another specified string as https:.  An intrinsic response object is then called for that request and redirects the client to a new Url and terminates execution of the current page.  As a finalizer any current buffered output to the client is stopped in addition to execution of the page and a HttpApplication.EndRequest event raised.

**NOTE** The HTTP module approach requires removing the SSL required setting in Internet Information Services to permit the HTTP module to be loaded; otherwise, the request is thrown to the 403.x.

**Sample Code**

```
using System;
using System.Web;
\[assembly: CLSCompliant(true)\]

namespace Microsoft.SharePoint.SslRedirect
{
    public class RedirectModule : IHttpModule
    {
        #region IHttpModule Members
        public void Init(HttpApplication context)
        {
            context.BeginRequest += new EventHandler(OnBeginRequest);
        }

        private void OnBeginRequest(object src, EventArgs e)
        {
            HttpApplication context = src as HttpApplication;
            string httpUrl = context.Request.Url.ToString();

            if (httpUrl.StartsWith("http:"))
            {
                httpUrl = httpUrl.Replace("http:", "https:");
                context.Response.Redirect(httpUrl.ToString(), false);
                context.CompleteRequest();
            }
        }

        public void Dispose()
        {
        }
        #endregion
    }
}
```