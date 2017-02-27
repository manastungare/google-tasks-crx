/**
 *  Compatiblity shim for old oauth javascript
 *
 *  This provides the minimal amount of functionality
 *  to update an extension that used the old third-party
 *  oauth library. Authentication is delegated to the
 *  chrome.identity API.
 *
 *  @author Neal Fultz <nfultz@gmail.com>
 */
var oauth = {};

oauth.sendSignedRequest = function(url, callback, req) {
  var body = req.body || null;
  chrome.identity.getAuthToken({interactive: true}, function(token) {
    var xhr = new XMLHttpRequest(); 
    xhr.onreadystatechange = function(data) {
      if (xhr.readyState == 4) {
        callback(xhr.responseText, xhr);
      }
    }
    xhr.open(req.method, url);
    for(i in req.headers) {
      xhr.setRequestHeader(i, req.headers[i]);
    }
    xhr.setRequestHeader("Authorization", "Bearer " + token);
    xhr.send(body);
  });
};
