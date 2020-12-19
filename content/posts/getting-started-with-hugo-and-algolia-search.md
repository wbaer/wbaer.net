---
title: 'Getting Started with Hugo and Algolia Search'
date: Fri, 18 Dec 2020 09:59:31 +0000
draft: true
tags: ['Hugo', 'Go', 'Algolia']
---

This is more or less a continuation of my previous article on moving to Hugo from Wordpress.  

There are a seemingly unlimited number of options for search with Hugo in particular, the first, and most popular I research was Lunr.

https://github.com/algolia/autocomplete.js/blob/master/README.md#standalone

**Algolia**

**autocomplete.js**
This JavaScript library adds a fast and fully-featured auto-completion menu to your search box displaying results "as you type". It can easily be combined with Algolia's realtime search engine. The library is available as a jQuery plugin, an Angular.js directive or a standalone library.

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
        
