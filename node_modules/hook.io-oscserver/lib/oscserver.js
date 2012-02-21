var Hook = require('hook.io').Hook,
    util = require('util');
var osc = require('omgosc');
  
var OSCServerHook = exports.OSCServerHook = function(options){
  Hook.call(this, options);
  var self = this;
  this.type = 'oscserver'
  
  self.on('hook::ready', function(){
    var oscReceiver = new osc.UdpReceiver(options.inPort,options.host);
    self.oscReceiver = oscReceiver;
    
    if(self.debug)
      console.log("OSC server listening on port %d in %s", options.inPort, options.host);
      
    var oscSender = new osc.UdpSender(options.host,options.outPort);
    self.oscSender = oscSender;
    
    if(self.debug)
      console.log("OSC server prepared for sending on port %d in %s", options.outPort, options.host);
      
    oscReceiver.on('',function(message){
      self.emit('osc-in-message', message);
    });
  });
  self.on( '*::osc-out-message',self._outMessage);
};

// OSCServerHook inherits from Hook
util.inherits(OSCServerHook, Hook);

OSCServerHook.prototype._outMessage = function(message){
  //If deviceId is set it should only send messages to it
  if(message.deviceId){
    if(message.deviceId == this.deviceId){
      this.oscSender.send(message.path,message.typetag,message.params);
    }
  } else {
    this.oscSender.send(message.path,message.typetag,message.params);
  }
  
  
}