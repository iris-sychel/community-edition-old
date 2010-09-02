var errors = [];
var failed = false;

var type = context.properties['feedbackType'];
var successPage = context.properties['successPage'];
var name = context.properties['visitorName'];
var email = context.properties['visitorEmail'];
var website = context.properties['visitorWebsite'];
var subject = context.properties['feedbackSubject'];
var comment = context.properties['feedbackComment'];

if (name == null || name.length == 0)
{
	failed = true;
	errors["visitorName"] = "comments.write.null.feedback.visitorName";
}

if (email == null || email.length == 0)
{
	failed = true;
	errors["visitorEmail"] = "comments.write.null.feedback.visitorEmail";
}
else
{
	var txt=new RegExp(".+@.+\\.[a-z]+","ig");
	if ( ! txt.test(email))
	{
		failed = true;
		errors["visitorEmail"] = "comments.write.invalid.feedback.visitorEmail";
	}	
}

if (comment == null || comment.length == 0)
{
	failed = true;
	errors["comment"] = "comments.write.null.feedback.comment";
}

if (failed)
{
	model.errors = errors;
	model.visitorName = name;
	model.visitorEmail = email;
	model.visitorWebsite = website;
	model.feedbackSubject = subject;
	model.feedbackComment = comment;
}
else 
{
	var assetId;
	if (asset != null)
	{
		assetId = asset.id;
	}
	else
	{
		assetId = webSite.id;
	}
	webSite.ugcService.postFeedback(assetId, name, email, website, type, subject, comment, 0);
	
	model.successAsset = webSite.getAssetByPath(section.path+args.successAsset);
}

