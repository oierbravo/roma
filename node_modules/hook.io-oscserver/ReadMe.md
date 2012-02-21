# hook.io-oscserver

*a simple Hook for making an OSC server*

## Installation

     [sudo] npm install hook.io-oscserver -g

## Usage

     hookio-oscserver

## Hook Events Names

**osc-out-message** *sends an OSC message*

**osc-in-message** *event emitted when an OSC message is recived*

## Incomming Message format:

    {
      address:'/an/osc/address',
      typetag:'isf' //matches params type and index
      params:[0,"string",0.5]
    }

## Outgoing Message format:
    {
      address:'/an/osc/address',
      typetag:'isf' //must match params type and index
      params:[0,"string",0.5] //must match typetag
      deviceId:'dummyDeviceId' //[OPTIONAL] if deviceId specified on options the sender will only send those messages.
    }
### Example loggin all incoming messages.
```js
    var Hook = require('hook.io-oscserver').OSCServerHook;
    var options = {
      inPort: 9001
      ,outPort: 9000
    };
    var hook = new Hook(options);
    
    hook.on('osc-in-message',function(message){
      console.log(message);
    });
    hook.start();
```      
### Example sending a messages.
```js
    var Hook = require('hook.io-oscserver').OSCServerHook;
    var options = {
      inPort: 9001
      ,outPort: 9000
      //,deviceId: "dummyDeviceId" //[OPTIONAL]
    };
    var hook = new Hook(options);
    var oscMessage = {
      address:'/an/osc/address'
      ,typetag:'isf' //must match params type and index
      ,params:[0,"string",0.5] //must match typetag
      //,deviceId:'dummyDeviceId' //[OPTIONAL] if deviceId specified on options the sender will only send those messages.
    }
    hook.on('hook::ready',function(){
      hook.emit('osc-out-message',oscMessage);
    });
    hook.start();
    
```
