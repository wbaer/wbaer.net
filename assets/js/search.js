window.addEventListener("DOMContentLoaded", function(event)
{
  var index = null;
  var lookup = null;
  var queuedTerm = null;

  var form = document.getElementById("search");
  var input = document.getElementById("search-expandable");

  form.addEventListener("submit", function(event)
  {
    event.preventDefault();

    var term = input.value.trim();
    if (!term)
      return;

    startSearch(term);
  }, false);

  function startSearch(term)
  {
    form.setAttribute("data-running", "true");

    if (index)
    {
      search(term);
    }
    else if (queuedTerm)
    {
      queuedTerm = term;
    }
    else
    {
      queuedTerm = term;
      initIndex();
    }
  }

  function searchDone()
  {
    form.removeAttribute("data-running");

    queuedTerm = null;
  }

  function initIndex()
  {
    var request = new XMLHttpRequest();
    request.open("GET", "/lunr.json");
    request.responseType = "json";
    request.addEventListener("load", function(event)
    {
      lookup = {};
      index = lunr(function()
      {
        this.ref("url");
        this.field("title");
        this.field("summary");

        for (var doc of request.response)
        {
          this.add(doc);
          lookup[doc.url] = doc;
        }
      });
        
      search(queuedTerm);
    }, false);
    request.addEventListener("error", searchDone, false);
    request.send(null);
  }

  function search(term)
  {
    var results = index.search(term);
    var target = document.querySelector(".search-result__container");

    while (target.firstChild)
      target.removeChild(target.firstChild);

    var title = document.createElement("h1");

    if (results.length == 0)
      title.textContent = `No results found for “${term}”`;
    else if (results.length == 1)
      title.textContent = `Found one result for “${term}”`;
    else
      title.textContent = `Found ${results.length} results for “${term}”`;
    target.appendChild(title);
    document.title = title.textContent;

    var template = document.getElementById("search-result");
    for (var result of results)
    {
      var doc = lookup[result.ref];
      var element = template.content.cloneNode(true);
        
      element.querySelector(".search-result__link").href = element.querySelector(".search-result__button").href = doc.url;
      element.querySelector(".search-result__link").textContent = doc.title;
      element.querySelector(".search-result__summary").textContent = truncate(doc.summary, 70);
        
      target.appendChild(element);
    }
    title.scrollIntoView(true);

    searchDone();
  }

  function truncate(text, minWords)
  {
    var match;
    var result = "";
    var wordCount = 0;
    var regexp = /(\S+)(\s*)/g;
    while (match = regexp.exec(text))
    {
      wordCount++;
      if (wordCount <= minWords)
        result += match[0];
      else
      {
        var char1 = match[1][match[1].length - 1];
        var char2 = match[2][0];
        if (/[.?!"]/.test(char1) || char2 == "\n")
        {
          result += match[1];
          break;
        }
        else
          result += match[0];
      }
    }
    return result;
  }
}, false);