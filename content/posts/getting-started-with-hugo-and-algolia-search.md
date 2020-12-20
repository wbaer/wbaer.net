---
title: 'Getting Started with Hugo and Algolia Search'
date: Fri, 18 Dec 2020 09:59:31 +0000
draft: false
tags: ['Hugo', 'Go', 'Algolia']
---

This is more or less a continuation of my previous article on moving to Hugo from Wordpress.  

There are a seemingly unlimited number of options for search with Hugo in particular, the first, and most popular I researched was Lunr - while temporarily I opted to leverage Algolia to support search on this site, I ultimately decided upon Lunr.  That said, I'm hoping someone will find some benefit out of how to use Algolia with Hugo (easily).

#### Step 1

Create an Algolia account and choose your plan.  Once you've done that, from your Algolia dashboard, create an index.

To keep it simple, create an index with a name that's synonymous with your sites' base Url, e.g. exaple.com.

Creating an index will generate the API keys you will need to configure search.  In your Algolia dashboard, select API Keys from the navigation and make note of the App Id, Sesarch Only API Key, and Admin API Key - these are the only keys you'll need for now.

**App Id** is your unique application identifier. It's used to identify you when using Algolia's API.

**Search Only API Key** is the public API key to use in your frontend code (which we'll be working with here). This key is only usable for search queries and sending data to the Insights API.

**Admin API Key** is your admin API key.  You'll want to keep it secret and use it ONLY from your backend: this key is used to create, update and DELETE your indices. You can also use it to manage your API keys.  That said, if you plan to store this key locally in environment vaiables (.env) or a config file, you'll want to ensure these are ignored if you're using a public repo.

#### Step 2

In order for Algonia to serve queries from your site, we'll need to put it into a format that Algonia understands (.json).  Fortunately, using Hugo's MIME types we can do so with little effort since Hugo can output content in multiple formats, including calendar events, e-book formats, Google AMP, and JSON search indexes, or any custom text format.  To add or modify a media type, we'll define it in a mediaTypes section in your site configuration (e.g. config.toml).  Hugo’s output formats simplifies assembling your markdown content into the required format for Algonia to parse.

1.  Open config.toml (or otherwise config.yaml or .json depending upon your preferences) and paste the following (this example is in .toml):

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

notAlternative is used if it doesn’t make sense to include this format in an AlternativeOutputFormats format listing on Page (e.g., with CSS). Note that we use the term alternative and not alternate here, as it does not necessarily replace the other format. Default: false.  Is this scenario we'll set the value to true.

We won't spend too much time here as the idea is to get search up and running quickly.  To learn more about Hugo's output formats see also https://gohugo.io/templates/output-formats/.

##### Step 2a

Natively Alogonia can't parse your Hugo site, you'll need to generate an index in a format that can be recognized by Algonia.  For this, we'll need to create a shim to generate the .json index that we can use with Algonia.  To do this, create a new file in your projects layouts/_default directory named list.algonia.json.

In the new list.algonia.json paste the following:

        {{- $.Scratch.Add "index" slice -}}
        {{- $section := $.Site.GetPage "section" .Section }}
        {{- range .Site.AllPages -}}
          {{- if or (and (.IsDescendant $section) (and (not .Draft) (not .Params.private))) $section.IsHome -}}
            {{- $.Scratch.Add "index" (dict "objectID" .UniqueID "date" .Date.UTC.Unix "description" .Description "dir" .Dir "expirydate" .ExpiryDate.UTC.Unix "fuzzywordcount" .FuzzyWordCount "keywords" .Keywords "kind" .Kind "lang" .Lang "lastmod" .Lastmod.UTC.Unix "permalink" .Permalink "publishdate" .PublishDate "readingtime" .ReadingTime "relpermalink" .RelPermalink "summary" .Summary "title" .Title "type" .Type "url" .URL "weight" .Weight "wordcount" .WordCount "section" .Section "tags" .Params.Tags "categories" .Params.Categories "authors" .Params.Authors)}}
          {{- end -}}
        {{- end -}}
        {{- $.Scratch.Get "index" | jsonify -}}

Save list.index.json.

This will iterate over your site’s regular pages (your actual content, rather than taxonomies or list pages) and assemble a JSON file with the title, date, URL, summary, and tags of each. To create the aforementioned Object ID for each record we’re using Hugo’s .File.UniqueID variable, which returns the MD5-checksum of the content file’s path.

**NOTE** You'll see instructions to use .Page.UniqueID; however, this is deprecated in favor of the former.

##### Step 2b

Once you've completed 2a and 2b, you're ready to generate your output file that you'll send to Algonia.  To do this, just run your usual build command, e.g. 'hugo'.

#### Step 3

Once your build completes, you should have a file in your build directory 'public', algonia.json -  this is the file we'll send to Algonia to populate the index you created earlier.  In this article, we'll do this manually to keep things simple; however, there are a couple of options you can consider for automating this process.  For example, if you'd like to send just the delta of your index on each build you can use the atomia-algonia node module or if you're not generating that much data, you can add your API keys to seomething like Netlify's environment variables.

To manually upload your index, navigate back to your Alognia dashboard and select the index you created earlier.  Under your index, select Add Records, and then select Upload File and browse to algolia.json that was generated in your sites 'public' directory.

#### Step 4

So now you have a working index of your site in Algolia so all we need to do now is create a search form and results template for your site.  In this scenario (again keeping it simple), we're going to use the autosuggest jQuery library - which is one of the quickest and easiest ways to get started with Algolia search on your site.  

**autocomplete.js** adds a fast and fully-featured auto-completion menu to your search box displaying results "as you type". It can easily be combined with Algolia's realtime search engine. The library is available as a jQuery plugin, an Angular.js directive or a standalone library.
        
You'll notice in autosuggest repo that the samples just log the query to the console.  We'll need to update create the code necessary , not only to connect your Algolia index, but for your sites' visitors to do something meaningful with their search results.  In this step, create a new file under 'layouts/partials' named search.html and paste the following boilerplate code.

      var client = algoliasearch("App Id","Search Id");
      var index = client.initIndex("Index Name");
      autocomplete('#center-search', { hint: false }, [
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
        
In the above code, replace Add Id, Search Id, and Index Name with the values from Algolia.  

Now that we have our boilerplate configured, we'll just need to reference the Algonia libraries for everything to come together.  Your complete code should look like something below:

        <script src="https://cdn.jsdelivr.net/npm/algoliasearch@3/dist/algoliasearchLite.min.js"></script>
        <script src="https://cdn.jsdelivr.net/autocomplete.js/0/autocomplete.min.js"></script>
        <script>
        var client = algoliasearch("RTXEJJH0DN","50196e0b1ee6a3f136aa2e74769147bc");
          var index = client.initIndex("wbaer.net");
          autocomplete('#waterfall-exp', { hint: false }, [
            {
              source: autocomplete.sources.hits(index, { hitsPerPage: 1 }),
                displayKey: 'title',
                /* templates: {
                    suggestion: function(suggestion) {
                      return suggestion._highlightResult.title.value;
                    }
                  } */

                 templates: {
                  header: '<div class="aa-suggestions-category" style="color: #212121; margin-right: 13px; margin-top: 4px; font-weight: bold;">Recommended</div>',
                  dropdownMenu: '<div class="aa-dataset" style="z-index:1 !important;"></div>',
                  suggestion: function(suggestion) {
                      return '<span>' +
                      suggestion._highlightResult.title.value + '</span>';
                    },
                   empty: function(suggestion){
                      return 'No result on: "'+suggestion.query + '"';
                    }

                } 

              }
            ]).on("autocomplete:selected",function(event, suggestion, dataset, context) {
              console.log(event, suggestion, dataset, context);
              window.location.assign(suggestion.url);
            });
        </script>

That's it!  Now all you need to do is enter a 'known' search term in the search box and see if it returns a result.

TBD.

In the next post I'll share how I put together Lunr and Hugo.