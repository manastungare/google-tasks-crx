# How to deal with OAuth and credentials.

## Overview

In order to prevent abuse, we don't include the official OAuth credentials in the open source repo. This is simply because they may leak, and we don't want people using up the extension's limited quota. It's not exactly super-secure, but it's better than nothing. Releases are done with the official keys. For development, simply request your own and go for it!

## Development

If you want to hack on the extension, all you need to do is request your own credentials and add a simple JS file to your repo to get the extension using it.

1. Go to https://code.google.com/apis/console/b/0/?pli=1#overview:access and request an OAuth 2.0 client ID. You'll get a consumer key and secret.

2. In your development repo add a file called "oauth_credentials.js" using this template:

    var oauth_consumer_key = '<yourkeynumber>.apps.googleusercontent.com';
    var oauth_consumer_secret = '<yourconsumersecret>';</pre>

3. You're now ready to go! You can now load the unpacked extension and things should work.

## Releases

Owners of the Google Tasks extension have access to the official Google APIs project associated with the extension. This contains the consumer key / secret used. The procedure for adding them is the same as for development.
