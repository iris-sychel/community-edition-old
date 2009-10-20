<import resource="classpath:alfresco/site-webscripts/org/alfresco/utils/feed.utils.js">

/**
 * Main entry point for the webscript
 */
function main ()
{
   var uri = args.feedurl;
   if (!uri)
   {
      // Use the default
      var conf = new XML(config.script);
      uri = conf.feed[0].toString();
   }

   var connector = remote.connect("http");
   var re = /^http:\/\//;
   if (!re.test(uri))
   {
      uri = "http://" + uri;
   }
   model.uri = uri;
   model.limit = args.limit || 999;
   model.target = args.target || "_self";

   var feed = getRSSFeed(uri);
   model.title = feed.title;
   model.items = feed.items;

   // Call the repository to see if the user is site manager or not
   var userIsSiteManager = false;
   var json = remote.call("/api/sites/" + page.url.templateArgs.site + "/memberships/" + stringUtils.urlEncode(user.name));
   if (json.status == 200)
   {
      var obj = eval('(' + json + ')');
      if (obj.role)
      {
         userIsSiteManager = (obj.role == "SiteManager");
      }
   }
   model.userIsSiteManager = userIsSiteManager;
}

/**
 * Start webscript
 */
main();