---
title: 'Getting Started with Hugo and Algolia Search'
date: Fri, 18 Dec 2020 09:59:31 +0000
draft: false
tags: ['Hugo', 'Go', 'Algolia']
---

This is more or less a continuation of my [previous article](https://wbaer.net/posts/going-static/) on moving to Hugo from Wordpress.  

When it comes to search and static site generators such as Hugo, there are a seemingly unlimited number of options available to you - one of most popular I researched was Lunr, and while I temporarily opted to leverage Algolia to support search on this site, I ultimately decided upon Lunr.  That said, while Lunr supports my needs right now, I'm hoping someone will find some benefit out of how to use Algolia with Hugo (easily).

The idea of this article is to share the simple steps needed to get up and running with Hugo and Algolia.

#### Step 1

The first step you'll need to complete is to create an Algolia account, so before you read any further head over to https://www.algolia.com/users/sign_up and create an account.  If you're just getting started and experimenting as I was, go ahead and select their 15 day free trial which is sufficient enough to meet the needs of the average site.

Once you've created your account, from your Algolia dashboard, you'll need to create an index.  Learn more about the Algolia dashboard at https://www.algolia.com/dashboard.

To keep it simple, create an index with a name that's synonymous with your sites' base Url, e.g. exaple.com.

Creating an index will generate the API keys you will need to configure search later in this article.  In your Algolia dashboard, select API Keys from the navigation and make note of the App Id, Sesarch Only API Key, and Admin API Key - these are the only keys you'll need for now.

**App Id** is your unique application identifier. It's used to identify you when using Algolia's API.

**Search Only API Key** is the public API key to use in your frontend code (which we'll be working with here). This key is only usable for search queries and sending data to the Insights API.

**Admin API Key** is your admin API key.  You'll want to keep it secret and use it ONLY from your backend: this key is used to create, update and DELETE your indices. You can also use it to manage your API keys.  That said, if you plan to store this key locally in environment variables (.env) or a config file, you'll want to ensure these are ignored if you're using a public repo.

#### Step 2

In order for Algolia to serve queries from your site, we'll need to put it into a format that Algolia understands (.json) since Algolia doesn’t search directly into your data source, instead we'll need to send the data to Algolia's servers so they can search into it. Whether your data is in a database, a collection of XML files, spreadsheets, or any other format, it doesn’t matter, what we need to do first is extract data from one or several sources and format it in a way that Algolia recognizes.

Fortunately, using Hugo's MIME types we can do so with little effort since Hugo can output content in multiple formats, including calendar events, e-book formats, Google AMP, and JSON search indexes, or any custom text format.  To add or modify a media type, we'll define it in a mediaTypes section in your site configuration (e.g. config.toml).  Hugo’s output formats simplify assembling your markdown content into the required format for Algolia to parse.

To configure our output, open config.toml (or otherwise config.yaml or .json depending upon your preferences) and paste the following (this example is in .toml):

            [outputs]
            home = ["HTML","RSS","Algolia"]
            
            [outputFormats.Algolia]
            baseName = "algolia"
            isPlainText = true
            mediaType = "application/json"
            notAlternative = true
            
            [params.algolia]
            vars = ["title", "summary", "date", "publishdate", "expirydate", "permalink"]
            params = ["categories", "tags"]

Here we're creating a new output format labeled as "Algolia". with a baseName of "algolia" which will prepend your output file, e.g. algolia.json, a value for isPlainText, the mediaType, and a value for nonAlternative.

baseName or otherwise .File.BaseFileName is the filename without extension we'll generate. In this case the output filename will be algolia.

isPlainText specifies whether to use Go’s plain text templates parser for the templates.  For this scenario we'll set the value to true.

mediaType should match the Type of a defined media type, in this case since Algolia expects to receive a .json type, we'll set the value accordingly.

notAlternative is used if it doesn’t make sense to include this format in an AlternativeOutputFormats format listing on Page (e.g., with CSS). In this scenario we'll set the value to true.

What we're instructing Hugo to do in this case is to represent your sites' content as .json which is one of Algolia's expected formats and snaps to their record requirements.  For example, an Algolia record (or object) is composed of key/value pairs called attributes. Attributes don’t have to respect a schema and can change from one object to another, which is what we want.

We won't spend too much time here as the idea is to get search up and running quickly.  To learn more about Hugo's output formats see also https://gohugo.io/templates/output-formats/.

##### Step 2a

Now that we have our output format defined, we'll need to actually generate the output itself.  Since Algolia can't parse your site - we'll need to send the data to their servers, but first we need to generate an index in a format that can be recognized by Algolia.  For this, we'll need to create a shim to generate the .json index that we can use with Algolia.  To do this, create a new file in your projects layouts/_default directory named list.algolia.json.

In the your new list.algolia.json file paste the following:

            {{- $.Scratch.Add "index" slice -}}
            {{- $section := $.Site.GetPage "section" .Section }}
                  {{- range .Site.AllPages -}}
                        {{- if or (and (.IsDescendant $section) (and (not .Draft) (not .Params.private))) $section.IsHome -}}
                              {{- $.Scratch.Add "index" (dict "objectID" .UniqueID "date" .Date.UTC.Unix "description" .Description "dir" .Dir "expirydate" .ExpiryDate.UTC.Unix "fuzzywordcount" .FuzzyWordCount "keywords" .Keywords "kind" .Kind "lang" .Lang "lastmod" .Lastmod.UTC.Unix "permalink" .Permalink "publishdate" .PublishDate "readingtime" .ReadingTime "relpermalink" .RelPermalink "summary" .Summary "title" .Title "type" .Type "url" .URL "weight" .Weight "wordcount" .WordCount "section" .Section "tags" .Params.Tags "categories" .Params.Categories "authors" .Params.Authors)}}
                              {{- end -}}
                  {{- end -}}
            {{- $.Scratch.Get "index" | jsonify -}}

Save list.index.json.

The code above uses Hugo's .Scratch function which acts as a “scratchpad” to allow for writable page- or shortcode-scoped variables.  We're using .Scratch.Add to add multiple values to the same variable or key while iterating over your sites' regular pages and assembling a JSON file with the title, date, URL, summary, and tags of each. To create the aforementioned Object ID for each record we’re using Hugo’s .File.UniqueID variable, which returns the MD5-checksum of the content file’s path.

**NOTE** You may have come across instructions to use .Page.UniqueID; however, this is deprecated in favor of the former.

##### Step 2b

Once you've completed 2a and 2b, you're ready to generate your output file that you'll send to Algolia.  To do this, just run your usual build command, e.g. ''hugo''.  This will generate an output file, algolia.json in your build directory, /public/, that you'll use later in these steps.

#### Step 3

Once your build completes (from step 2b), you should have a file in your build directory 'public', algolia.json as mentioned above -  this is the file we'll send to Algolia to populate the index you created earlier.  In this article, we'll do this manually to keep things simple; however, there are a couple of options you can consider for automating this process.  For example, if you'd like to send just the delta of your index on each build you can use the (atomic-algolia npm package)[https://www.npmjs.com/package/atomic-algolia] or if you're not generating that much data, you can add your API keys to something like Netlify's environment variables.

To manually upload your index, navigate back to your Aloglia dashboard and select the index you created earlier.  Under your index, select Add Records, and then select Upload File and browse to algolia.json that was generated in your sites' build directory.

#### Step 4

So now you should have a working index of your site in Algolia so all we need to do now is create a search form and results template for your site.  In this scenario (again keeping it simple), we're going to use the autosuggest jQuery widget - which is one of the quickest and easiest ways to get started with Algolia search on your site.  You can see an example of the Autocomplete widget here https://jqueryui.com/autocomplete/ and it's corresponding API documentation here https://api.jqueryui.com/autocomplete/.

**autocomplete.js** adds a fast and fully-featured auto-completion menu to your search box displaying results "as you type". It can easily be combined with Algolia's realtime search engine as we'll demonstrate here. The library is available as a jQuery plugin, an Angular.js directive or a standalone library.

You'll notice in the autosuggest repo that the samples just log the query to the console.  We'll need to create the code necessary not only to connect your Algolia index, but for your sites' visitors to do something meaningful with search results, such as navigate to a result.  To begin we'll create a new file under 'layouts/partials' named search.html and paste the following boilerplate code.

            var client = algoliasearch("App Id","Search Id");
            var index = client.initIndex("Index Name");
            autocomplete('#search-input-element-id', { hint: false }, [
              {
                source: autocomplete.sources.hits(index, { hitsPerPage: 10 }),
                  displayKey: 'title',
                   templates: {
                      suggestion: function(suggestion) {
                        return suggestion._highlightResult.title.value;
                      },
                      empty: function(suggestion) {
                        return 'No result';
                      }
                    }
                }
              ]).on("autocomplete:selected",function(event, suggestion, dataset, context) {
                console.log(event, suggestion, dataset, context);
                window.location.assign(suggestion.url);
              });
        

In the above code, replace Add Id, Search Id, and Index Name with the values from Algolia and then replace #search-input-element-id with with either the element Id or class representing your search input.  For example, <input type="search" id="#search-input-element-id">. 

Now that we have our boilerplate configured, we'll just need to reference the Algolia libraries for everything to come together.  Your complete code should look like something below (notice we just added references to Algolia's requisite libraries and the jQuery widget base, algoliasearchLite and autocomplete respectively):

              <script src="https://cdn.jsdelivr.net/npm/algoliasearch@3/dist/algoliasearchLite.min.js"></script>
              <script src="https://cdn.jsdelivr.net/autocomplete.js/0/autocomplete.min.js"></script>

            var client = algoliasearch("App Id","Search Id");
            var index = client.initIndex("Index Name");
            autocomplete('#search-input-element-id', { hint: false }, [
              {
                source: autocomplete.sources.hits(index, { hitsPerPage: 10 }),
                  displayKey: 'title',
                   templates: {
                      suggestion: function(suggestion) {
                        return suggestion._highlightResult.title.value;
                      },
                      empty: function(suggestion) {
                        return 'No result';
                      }
                    }
                }
              ]).on("autocomplete:selected",function(event, suggestion, dataset, context) {
                console.log(event, suggestion, dataset, context);
                window.location.assign(suggestion.url);
              });

So now what?  That's it.  You should now have a functional, yet rudimentary, search form to start validating everything is wired up right.  Now all you need to do is enter a 'known' search term in the search box and see if it returns a result.

I plan to continue to add more detail to this article, but for now, this is all that's need to get started with Hugo and Algolia.

In the next post I'll share how I put together Lunr and Hugo.