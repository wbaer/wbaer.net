import urllib, json

  url = "https://webmention.io/api/mentions.html?token=FMiJbGCktvP9ouUJpEKXfw"

  response = urllib.urlopen(url)

  data = json.loads(response.read())

  print data