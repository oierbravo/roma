var osc = require('omgosc');

var DEBUG = true;

var Roma = function(devices,routes){
  var self = this;
  self.sendMessage = function(deviceId,message){
    self.oscServers.senders[deviceId].send(message.path,message.typetag,message.params);
    if(DEBUG){
      console.log('Message sended to %s',deviceId);
      console.log(message);
    }
  }
  self.messageReceived = function(message){
    if(DEBUG){
      console.log('Message received');
      console.log(message);
    }
    var route = self.oscRoutes[message.path];
    if(typeof route !== 'undefined'){
      route.forEach(function(value){
        var output;
        if(value.routeArgs){
    
          processedParams = value.params.map(function(val){
            if(typeof val=="string"){
             if(val[0] == '#'){
              var paramIndex = val.replace('#arg',''); 
              return message.params[paramIndex];
             } else {
               return val;
             }
           } else {
             return val;
           }
          });
          output = {path:value.path,params:processedParams,typetag:value.typetag};
        } else {
         output = {path:value.path,params:message.params,typetag:message.typetag};
        }
        //send
        self.sendMessage(value.deviceId,output);
      });
    }
   
  }
  
  self.oscServers = self._prepareServerDevices(devices);
  self.oscRoutes = self._prepareRoutes(routes);
   self.sources = {};
  routes.forEach(function(value){
   self.sources[value.source] = value.targets;
    
  });
  
  
  
  return self;
}
Roma.prototype._prepareRoutes = function(routes){
   var oscRoutes = {};
   routes.forEach(function(route){
     oscRoutes[route.source] = route.targets;
   });
   return oscRoutes;
}
Roma.prototype._prepareServerDevices = function(devices){
  var servers = [];
  var receivers = [];
  var senders = [];
  var self = this;
  devices.forEach(function(device){
    if(device.receiverPort){
      var oscSender = new osc.UdpSender(device.host,device.receiverPort);
      senders[device.id] = oscSender;
      if(DEBUG)
        console.log("OSC server prepared for sending on port %d in %s", device.senderPort, device.host);
      
    }  
    if(device.senderPort){
      var oscReceiver = new osc.UdpReceiver(device.senderPort,device.host);
      oscReceiver.on('',self.messageReceived);
      
      receivers[device.id] = oscReceiver;
      if(DEBUG)
        console.log("OSC server prepared for receive  on port %d in %s", device.senderPort, device.host);
    }
  });
  servers['receivers'] = receivers;
  servers['senders'] = senders;
  return servers;             
}
exports.Roma = Roma;