# Tessel Blog
[![Code of Conduct](https://img.shields.io/badge/%E2%9D%A4-code%20of%20conduct-blue.svg?style=flat)](https://github.com/tessel/project/blob/master/CONDUCT.md)

## What content goes on the Tessel Blog?

Anything related to Tessel is fair game – philosophy on where IoT is going, hardware tutorials, self-introductions to the community, and more. If you're not sure, post an issue and ask if your idea is a good fit.

The Tessel Blog is *not* meant to be a place for content marketing.

## Who can write for the Tessel Blog?

Anyone from the Tessel community is welcome to write for the Tessel Blog, subject to our usual contribution guidelines.

Community members are particularly encouraged to work on This Week in Tessel (TWIT), either by adding to an existing Issue or PR, or opening one. See below for how to write the TWIT.

Team Members should post their own content once it is merged. If the post is submitted by a non-Team Member, whoever merges the post should post it.

## How to post

All Team Members should have access to the password for the Tessel tumblr via our password management system. (If you don't, request access from a Steering Committee member.)

On the Tessel blog (tumblr), sign in, create a new text post, and copy in the full post text in Markdown.

Add relevant tags, including `update` `this week in tessel` `twit` `updates` for TWIT posts.

Publish! Then to push live, follow Production Release instructions on the [tessel.io](//github.com/tessel/tessel.io) repo.

Post the subject line and link to blog post from tessel.io/blog to Twitter, ideally also including an image (if not from the newsletter itself, then something from our [Instagram](https://instagram.com/tesselproject/).

It will automatically cross-post to our Facebook page.

Also post it in [/r/Tessel](http://www.reddit.com/r/Tessel).

## How to write This Week in Tessel

(Our not-so-weekly update)

### Collect material

1. Create an issue to collect content. [Example](https://github.com/tessel/this-week-in-tessel/issues/10)
1. Figure out if there's any major update/call to action/etc. we need from the community and include as necessary.
2. Collect blog post links, projects, etc. from the community. The easiest way to do this is to look at what we've tweeted/retweeted in the last week. [Our Twitter profile](https://twitter.com/tesselproject)
2. Look at our latest hardware/software updates and note if there's anything particularly interesting or exciting.

### Write the TWIT

Keep it short, and cut content liberally. You can find a template in [TWIT-template.md](https://github.com/tessel/this-week-in-tessel/blob/master/TWIT-template.md).

Copy the template. Rename to include the date of intended publication in the filename as YYYY-MM-DD-TWIT.md. Fill it in, and create a pull request mentioning a fix to the collector issue. Then, the #reviews channel on [Slack](https://tessel-slack.herokuapp.com/) is a good place to seek feedback.

## Send the email

**Create a new campaign**. Set the campaign and subject to the same name, e.g. "This Week in Tessel: *Some content here...*"

[Select "Saved Templates" and click the "TWIT Reference".](https://cloud.githubusercontent.com/assets/80639/18758377/d995a3e6-80c5-11e6-8008-a52d43aaa7bd.png) You'll be brought to the responsive text editor.

The main text block has an HTML editor (the leftmost icon with angle brackets `<>` in it). The easiest way to convert the Markdown content for this email into HTML for the email is to use the `twitgen` NPM module. It is included in this repository and can be installed:

```
$ npm i -g ./twitgen
```

Then you are able to convert a markdown file locally into SendInBlue-compatible HTML:

```
$ twitgen 2016-09-10-TWIT.md
```

Copy the HTML into the responsive editor. If instructed by the output of `twitgen`, split text blocks where a large image should be, adding an image section using the left toolbar in the responsive text editor.

**Preview** using SendInBlue's [preview widgets](https://cloud.githubusercontent.com/assets/80639/18758404/f8a6c238-80c5-11e6-86fa-782b24bf89c8.png) to see the final rendering. (The editor will render content different than how it is sent; use the "preview" widget to see the final rendering as it would appear in an email.)

When you **Save & Exit** the campaign email, while still in the **"Build"** step, scroll to the bottom to "Send a Test" to your email address. Be sure to send at least one test email and read it over carefully.

**Send!** Ideally sometime in the morning on a weekday.

Also follow the blog-posting instructions above.
