var RomaUtils = require("./romaUtils.js");
var RomaDevice = require("./romaDevice.js");
var RomaOscMessage = require("./romaOscMessage.js");

var DEBUG = true;
var Roma = function(devices,routes){
  var self = this;
  self.getDevice = function(deviceId){
	return self.devices[deviceId];
  }
  self.sendMessage = function(deviceId,message){
    self.devices[deviceId].send(message);
    if(DEBUG){
      console.log('Message sended to %s',deviceId);
      console.log(message);
    }
  }
  self.oscMessageReceived = function(message){
    var oscMessage = new RomaOscMessage(message);
    if(DEBUG){
      console.log('OSC Message received');
      console.log(oscMessage.toString());
    }
	var mirrors = self.getDevice(message.sourceId).getMirrors();
	if(mirrors){
		mirrors.forEach(function(value){
			self.sendMessage(value,oscMessage);
		});
	}
    var route = self.oscRoutes[oscMessage.path];
    if(typeof route !== 'undefined'){
      route.forEach(function(value){
        var output;
        if(value.routeArgs){
			processedParams = RomaUtils.RomaParamProccessor(oscMessage.params,value.params);
          output = {path:value.path,params:processedParams,typetag:value.typetag};
        } else {
         output = {path:value.path,params:oscMessage.params,typetag:oscMessage.typetag};
        }
        //send
        self.sendMessage(value.deviceId,output);
      });
    }
   
  }
  
  //self.oscServers = self._prepareServerDevices(devices);
  self.devices = self._prepareServerDevices(devices);
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
Roma.prototype._prepareServerDevices = function(deviceList){
  var servers = [];
  var receivers = [];
  var senders = [];
  var self = this;
  var devices = [];
  deviceList.forEach(function(device){
    romaDevice = new RomaDevice(device);
	romaDevice.on('oscMessage',self.oscMessageReceived);
	devices[device.id] = romaDevice;
  });
  return devices;
    /*var oscSender = new osc.UdpSender(device.host,device.receiverPort);
    senders[device.id] = oscSender;
    if(DEBUG)
      console.log("OSC server prepared for sending on port %d in %s", device.senderPort, device.host);
      
    var oscReceiver = new osc.UdpReceiver(device.senderPort,device.host);
    oscReceiver.on('oscMessage',self.messageReceived);
    
    receivers[device.id] = oscReceiver;
    if(DEBUG)
      console.log("OSC server prepared for receive  on port %d in %s", device.senderPort, device.host);
    
  });
  servers['receivers'] = receivers;
  servers['senders'] = senders;
  return servers; */  
  
}
module.exports = {
  Roma : Roma
}
//var roma = new Roma(devices,routes);
//console.log(roma);
