## hook.io-request

*a simple Hook for making outgoing http requests*

## Installation

     npm install hook.io-request -g

## Usage

     hookio-request

## Hook Events Names

**http::request** *sends HTTP request*:

**http::request::result** *event emitted when request comes back*:

**http::request::error** *event emitted when error comes back*:


## Example

```javascript

  //
  // options is a 1:1 mapping to https://github.com/mikeal/request API 
  //
  var options = {
    url: "http://google.com/"
  };
  
  //
  // Make a request with a callback
  //
  //
  hook.emit('http::request', options, function(){
    //console.log('http::request has responded')
  });

```

Note that the "hook" key contains original parameters passed to request,
making it ideal to put some other values for handling the request context (such as linking the request to an id, for example)