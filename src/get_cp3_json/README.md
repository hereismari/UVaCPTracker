# UVa Competitive Programming Tracker - get CP3 as JSON

Currently the only info you can get from the
[uhunt api](http://uhunt.felix-halim.net/api) about CP3 problems is the problem
number, but the user subs info has the problem id, you can get the id using
the number with a HTTP request, but that's for sure a lot of requests so I did
this script that pre-processes this to us.

The problem id is also used to generate the problem URL, for this reason,
I decided to make a new JSON of the CP3 problems using the original CP3 data
you can get trough the API.
This new JSON is an array that has 9 maps (chapters) with the format:

{ 
  'title': String, 'arr:' [ data ] 
}

Where data is a map which can have the items:

{
  'title': String, 'pid': Integer (Problem ID)
}

or

{
  'title': String, 'arr:' [ data ]
}

To generate this new JSON of CP3, just open index.html in a browser, it can take
some time because it makes a lot of HTTP requests in order to get this new data,
so be patient (not more than 5 minutes, though)!
At the end, you'll have the old JSON and the new JSON at the index.html page.
