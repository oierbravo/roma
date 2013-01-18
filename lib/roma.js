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
	message.outputTarget = deviceId;
    self.devices[deviceId].send(message);
    if(DEBUG){
     // console.log('Message sended to %s',deviceId);
      console.log('OSC Message sended -> ' + message.toString());
    }
  }
  self.oscMessageReceived = function(message){
    var oscMessage = new RomaOscMessage(message);
    if(DEBUG){
      console.log('OSC Message received -> ' + oscMessage.toString());
    }
	var mirrors = self.getDevice(message.sourceId).getMirrors();
	if(mirrors){
		mirrors.forEach(function(value){
			self.sendMessage(value,oscMessage);
		});
	}
    var routes = self.oscRoutes[oscMessage.path];
    if(typeof routes !== 'undefined'){
      routes.forEach(function(route){
	    var triggered = false;
		if(route.trigger){
			if(oscMessage.params[route.triggerIndex] == route.triggerValue){
				triggered = true;
			} else {
				triggered = false;
			}
		} else {
			triggered = true;
		}
		if(triggered){
		  var output;
		  if(route.routeArgs){
		    var processedParams = RomaUtils.RomaParamProccessor(oscMessage.params,route.params);
		    output = {path:route.path,params:processedParams,typetag:route.typetag};
		  } else {
		    output = {path:route.path,params:oscMessage.params,typetag:oscMessage.typetag};
		  }
		  //send
		  var outputMessage = new RomaOscMessage(output);
		  self.sendMessage(route.deviceId,outputMessage);
		}
	  });
    }
   
  }
  self.deviceSenderReady = function(device){
	if(DEBUG)
			console.log("%s ready for send on port %d in %s",device.id, device.senderPort, device.host);
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
	romaDevice.on('deviceSenderReady',function(device){
		if(DEBUG)
			console.log("%s ready for send on port %d in %s",device.id, device.senderPort, device.host);
	});
	romaDevice.on('deviceReceiverReady',function(device){
		if(DEBUG)
			console.log("%s ready for receive on port %d in %s",device.id, device.senderPort, device.host);
	});
	devices[device.id] = romaDevice;
  });
  return devices; 
}
module.exports = {
  Roma : Roma
}