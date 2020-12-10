---
title: 'Recycle Bin for SharePoint Products and Technologies 2003 (WSS/SPS 2003) 1.2 (Build 29) Released!'
date: Fri, 20 Oct 2006 21:35:00 +0000
draft: false
tags: ['Code Samples', 'Recycle Bin']
---

Recycle Bin 1.2 (Build 29) has been released; this release addresses several issues reported in build 26, released in July.  Currently this build is offered as independent libraries and will soon have an accompanying Windows Insaller Package.  To install this build, stop the World Wide Web Publishing Service (NET STOP W3SVC), replace ReycleBinISAPI.dll and RecycleBinISAPIFilter.dll with build 29 and start the World Wide Web Publishing Service (NET START W3SVC).  [Download Recycle Bin 1.2 (Build 29)](http://www.gotdotnet.com/workspaces/releases/checkfordownload.aspx?id=8437a203-f377-401c-b23d-ae59e6f05b80&ReleaseId=73c8785c-d08f-4005-8b32-6d3246966647).

Additional Details:

For this latest build we've only modified the ArchiveSTRMN function in RecycleBinHandlerRecycleBin.cs; if you've customized the source code to suit your environment I've attached the changes:

```
  /// <summary>
  /// 
  /// </summary>
  /// <param name="context"></param>
  /// <param name="sNow"></param>
  /// <param name="sLogonUser"></param>
  private void ArchiveSTRMN(HttpContext context, string sNow, string sLogonUser)
  {
   Libs.Utils.WriteLog(Libs.Utils.Level.Level5, "Enter ArchiveSTRMN:");   
   try
   {
    string sReturn = "";
    // get the OrigUrl from the query string
    // get the item being deleted from the request form "cbx"
    // sCbx=\[url;;doclib95/2004-09-07-001.sql;File,url;;doclib95/folder01/c++ check list.sql;File\]
    string sCbxes = context.Request.Form\["cbx"\];
    string sOrigUrl = context.Request.QueryString\["OrigUrl"\];

    bool useHttps = (context.Request.ServerVariables\["HTTPS"\].ToLower() == "on")? true:false;
    
    // what do we need to use - http or https?
    string uriScheme = useHttps ? "https://" : "http://";

    if(context.Request.Form\["do\_delete"\].ToLower() == "true" && sCbxes != null)
    {
     Libs.Utils.WriteLog(Libs.Utils.Level.Level7, "\* In ArchiveSTRMN:rn . sCbxes=\[", sCbxes ,"\]rn . sOrigUrl=\[", sOrigUrl ,"\]");
     string sSiteUrl = "";
     ArrayList alCbxes = SplitByString(sCbxes, "url;");
     string\[\] asCbx = null;
     string sSubSiteUrlFromSite = "";
     string sItemUrlFromSite = "";
     string sItemUrl = "";
     SPWeb spWeb = null;
     SPList spList = null;
     for (int i=0; i<alCbxes.Count && sReturn == ""; i++)
     {
      if ((string)alCbxes\[i\] == "")
      {
       continue;
      }
      sSiteUrl = sOrigUrl.Replace("\_layouts/1033/storman.aspx", "");
      asCbx = ((string)alCbxes\[i\]).Split(";".ToCharArray(), 1000);
      sSubSiteUrlFromSite = asCbx\[0\];
      sItemUrlFromSite = asCbx\[1\];
      Libs.Utils.WriteLog(Libs.Utils.Level.Level7, "\* In ArchiveSTRMN:rn . sSiteUrl=\[", sSiteUrl ,"\]rn . sSubSiteUrlFromSite=\[", sSubSiteUrlFromSite ,"\]rn . sItemUrlFromSite=\[", sItemUrlFromSite ,"\]");
      sItemUrl = Libs.SharePointLib.MakeUrl(uriScheme + context.Request.ServerVariables\["SERVER\_NAME"\].ToLower(), sSiteUrl);       
      
      sItemUrl = Libs.SharePointLib.MakeUrl(sItemUrl, sSubSiteUrlFromSite);
      sItemUrl = Libs.SharePointLib.MakeUrl(sItemUrl, sItemUrlFromSite);
     
      spWeb = Libs.SharePointLib.GetSPWeb(sItemUrl, ref sSiteUrl, ref sReturn, sLogonUser);
      spList = null;
      switch (GetSPObjectType(spWeb, sItemUrlFromSite, sSiteUrl, ref spList))
      {
       case SPObjectType.SPListItem:
        if ((sReturn=Libs.SharePointLib.CopyListItemUseUrl(sItemUrl, sRecycleFolder, sLogonUser)) == "")
        {
         if ((sReturn=Libs.SharePointLib.DeleteListItemUseUrl(sItemUrl, sLogonUser)) != "")
         {
          Libs.Utils.WriteLog(Libs.Utils.Level.Level1, "\*\*\* In ArchiveSTRMN: DELETE - sReturn=\[" + sReturn + "\]");
          Libs.Utils.WriteAppLog(EventLogEntryType.Error, "\*\*\* In ArchiveSTRMN: DELETE - sReturn=\[" + sReturn + "\]");
 // context.Response.Redirect (ERROR\_PAGE\_URL + MSG\_TO\_USER, false);
          context.Response.Redirect (ERROR\_PAGE\_URL + sReturn, false);
         }
         else
         {
          WriteActionLog(sNow, ",", System.Environment.MachineName, ",", sItemUrl, ",", sLogonUser);
         }
        }
        else
        {
         Libs.Utils.WriteLog(Libs.Utils.Level.Level1, "\*\*\* In ArchiveSTRMN: DELETE - sReturn=\[" + sReturn + "\]");
         Libs.Utils.WriteAppLog(EventLogEntryType.Error, "\*\*\* In ArchiveSTRMN: DELETE - sReturn=\[" + sReturn + "\]");
 // context.Response.Redirect (ERROR\_PAGE\_URL + MSG\_TO\_USER, false);
         context.Response.Redirect (ERROR\_PAGE\_URL + sReturn, false);
        }
        break;

       case SPObjectType.SPDocumentLibrary:
        ArrayList alFileUrls = new ArrayList();
        if ((sReturn=Libs.SharePointLib.CopyDocLibUseUrl(sItemUrl, sItemUrlFromSite, sRecycleFolder, ref alFileUrls, sLogonUser)) == "")
        {
         if ((sReturn=Libs.SharePointLib.DeleteDocLibUseUrl(sItemUrl, sItemUrlFromSite, sLogonUser)) != "")
         {
          Libs.Utils.WriteLog(Libs.Utils.Level.Level1, "\*\*\* In ArchiveSTRMN: remove documents - sReturn=\[" + sReturn + "\]");
          Libs.Utils.WriteAppLog(EventLogEntryType.Error, "\*\*\* In ArchiveSTRMN: remove documents - sReturn=\[" + sReturn + "\]");
 // context.Response.Redirect (ERROR\_PAGE\_URL + MSG\_TO\_USER, false);
          context.Response.Redirect (ERROR\_PAGE\_URL + sReturn, false);
         }
         else
         {
          WriteActionLog(sNow, ",", System.Environment.MachineName, ",", sItemUrl, ",", sLogonUser);
         }
        }
        else
        {
         Libs.Utils.WriteLog(Libs.Utils.Level.Level1, "\*\*\* In ArchiveSTRMN: DELETE - sReturn=\[" + sReturn + "\]");
         Libs.Utils.WriteAppLog(EventLogEntryType.Error, "\*\*\* In ArchiveSTRMN: DELETE - sReturn=\[" + sReturn + "\]");
 // context.Response.Redirect (ERROR\_PAGE\_URL + MSG\_TO\_USER, false);
         context.Response.Redirect (ERROR\_PAGE\_URL + sReturn, false);
        }
        break;

       case SPObjectType.SPSpecialList:
        if ((sReturn = CopyListUseUrl(spList, sRecycleFolder, sLogonUser))=="")
        {
         try
         {
          Libs.Utils.WriteLog(Libs.Utils.Level.Level7, "\* In ArchiveSTRMN: Deleting spList.Title=\[", spList.Title ,"\] spList.ID=\[", spList.ID ,"\]");                    
          spList.Lists.Delete(spList.ID);
          WriteActionLog(sNow, ",", System.Environment.MachineName, ",", sItemUrl, ",", sLogonUser);
         }
         catch (Exception oE)
         {                 
          if(oE.Message.ToLower().IndexOf("security validation") > -1 || oE.Message.ToLower().IndexOf("acccess is denied") > -1)
          {
           context.Response.Redirect (ERROR\_PAGE\_URL + "The folder selected for deletion contains one or more lists, document libraries, or galleries that your Web site requires in order to function correctly. Therefore, you cannot delete the folder.", false);
          }
          else
          {
           Libs.Utils.WriteLog(Libs.Utils.Level.Level1, "\*\*\* In ArchiveSTRMN: DELETErn . Message=\[" + oE.Message + "\]rn . ToString=\[" + oE + "\]");
           Libs.Utils.WriteAppLog(EventLogEntryType.Error, "\*\*\* In ArchiveSTRMN: DELETE:rn .Error=\[" + oE + "\]");
           context.Response.Redirect (ERROR\_PAGE\_URL + oE.Message.Replace("r", " ").Replace("n"," "), false);
          }          
         }
        }
        else
        {
         Libs.Utils.WriteLog(Libs.Utils.Level.Level1, "\*\*\* In ArchiveSTRMN: DELETErn . Error=\[" + sReturn + "\]");
         Libs.Utils.WriteAppLog(EventLogEntryType.Error, "\*\*\* In ArchiveSTRMN: DELETE:rn .Error=\[" + sReturn + "\]");
         context.Response.Redirect (ERROR\_PAGE\_URL + sReturn.Replace("r", " ").Replace("n"," "), false);
        }
        break;
       case SPObjectType.SPNone:
 // sReturn = "Unsupported the deletion of \[" +  sItemUrl + "\]";
 // Libs.Utils.WriteLog(Libs.Utils.Level.Level1, "\*\*\* In ArchiveSTRMN: DELETE:rn . sReturn \[", sReturn, "\]");
 // Libs.Utils.WriteAppLog(EventLogEntryType.Error, "\*\*\* In ArchiveSTRMN: DELETErn . sReturn=\[" + sReturn + "\]");
        break;
      }
     }
     // copy over the item or items
     // delete the item or items
     // now make the request 
    }     
    // Now make a request to the actual storman.aspx page ONLY if the action complete successfully
    if (sReturn == "")
    {     
     string serverName = uriScheme + context.Request.ServerVariables\["SERVER\_NAME"\].ToLower();
    
     Libs.Utils.WriteLog(Libs.Utils.Level.Level7, "\* In ArchiveSTRMN:rn . ServerName=\[" + serverName + "\]rn . useHttps=\[" + useHttps.ToString() + "\]");

     System.Net.HttpWebRequest req = (HttpWebRequest)WebRequest.Create(serverName + sOrigUrl + "?bypass=1");
     req.Method = "POST";
     req.KeepAlive = true;     
     req.ContentType = "application/x-www-form-urlencoded";
     req.Credentials = CredentialCache.DefaultCredentials;
     
     Stream st = req.GetRequestStream();
     StreamWriter w = new StreamWriter(st);

     // make sure we don't ask the actual storman.aspx to delete
     w.Write (context.Request.Form.ToString().Replace("do\_delete=true", "do\_delete=false"));

     st.Close();

     // get the response from actual storman
     System.Net.HttpWebResponse resp = (System.Net.HttpWebResponse)req.GetResponse();

     st = resp.GetResponseStream();
     
     StreamReader r = new StreamReader(st);

     string res = r.ReadToEnd().Replace("<!-- delete disabled on system file -->", "<input type="hidden" id="lbl\_0" name="lbl" value="" /><input type="checkbox" value="" disabled id="cbx\_2"name="cbx" />");

     //bug #19 and #20
     res = res.Replace(uriScheme + context.Server.MachineName.ToLower() + "/", uriScheme + context.Request.ServerVariables\["SERVER\_NAME"\].ToLower() + "/");

     // remove the bypass stuff from the body of response and also the url header
     context.Response.Write (res.Replace("?bypass=1", ""));
     context.Response.AddHeader("url", uriScheme + context.Request.ServerVariables\["SERVER\_NAME"\].ToLower() + sOrigUrl); 
    }
   }
   catch(Exception oE)
   {
    Libs.Utils.WriteLog(Libs.Utils.Level.Level1, "\*\*\* In ArchiveSTRMN:rn . Error=\[", oE, "\]");
    Libs.Utils.WriteAppLog(EventLogEntryType.Error, "\*\*\* In ArchiveSTRMN:rn . Error=\[", oE, "\]");
 // context.Response.Redirect (ERROR\_PAGE\_URL + MSG\_TO\_USER, false);
    context.Response.Redirect (ERROR\_PAGE\_URL + oE.Message, false);
 // context.Response.Write (x.Message);
   }

   context.Response.Flush();
 // context.Response.End();
   Libs.Utils.WriteLog(Libs.Utils.Level.Level5, "Exit ArchiveSTRMN:");
  }
```