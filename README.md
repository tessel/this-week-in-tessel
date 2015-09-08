# This Week in Tessel

Currently on an every-other Tuesday publishing schedule. (Fluid so information is timely & interesting.)

## How to write This Week in Tessel

### Collect material

1. Create an issue to collect content. [Example](https://github.com/tessel/this-week-in-tessel/issues/10)
1. Figure out if there's any major update/call to action/etc. we need from the community and include as necessary.
2. Collect blog post links, projects, etc. from the community. The easiest way to do this is to look at what we've tweeted/retweeted in the last week. [Our Twitter profile](https://twitter.com/technicalhumans)
2. Look at our latest hardware/software updates and note if there's anything particularly interesting or exciting.

## Write the TWIT

Keep it short, and cut content liberally. Here's a basic template:

```md
# This Week in Tessel: Headline like CLI fix, beer tracking something, and more!

Hello again Tesselators! This Week in Tessel is where we highlight the latest news, projects, and events, from code, to community, to hardware manufacturing.

**Shipping update:** Major update major update

**Continued development:** Updates to hardware/software

**From the community:** Featured projects this week are .... blog post....

**Events:** Tessel was spotted at ... look for .. at ...event


That's all for this week! Feel free to submit to [the next newsletter](collector issue for the next one). In the meantime, see you online.

With love,<br/>
The Tessel Project
```

You can post it in the collector issue. Then, the #emails-blogs channel on [Slack](https://tessel-slack.herokuapp.com/) is a good place to seek feedback.

## Send the email

**Update the mailing list** by downloading CSVs of the latest backers from Celery (both the team@tessel and support@technical logins) and importing them to the Website Signups list in Mailchimp. [If you don't know how to do this/don't have the logins, ask [@Frijol](//github.com/frijol), [@tcr](//github.com/tcr), or [@johnnyman727](//github.com/johnnyman727).]

**Create the campaign** using the [This Week in Tessel template](http://templates.mailchimp.com/getting-started/using-mailchimp/). You'll have to convert to Mailchimp's format from Markdown. Use the title as the subject line, and name the campaign something like "This Week in Tessel - Date"

**Preview** using Mailchimp's [preview and test menu](http://kb.mailchimp.com/campaigns/previews-and-tests/preview-and-test-your-campaign). Be sure to send at least one test email and read it over carefully.

**Send!** Ideally sometime in the morning.

## Cross-post

On the Tessel blog (tumblr), sign in, create a new text post, and copy in the markdown version of the email.

Delete the Hi backers! and signoff, as well as anything else that makes it specifically function as an email to backers.

Make the subject line the title of the post. Add relevant tags, including `update` `this week in tessel `twit` `updates`.

Publish! Then to push live, within `technical-io` do a `heroku restart`.

## Publicize

Post the subject line and link to blog post to Twitter, ideally also including an image (if not from the newsletter itself, then something from our [Instagram](https://instagram.com/tesselproject/).

It will automatically cross-post to our Facebook page.

Also post it in [/r/Tessel](http://www.reddit.com/r/Tessel).
