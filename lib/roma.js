var RomaUtils = require("./romaUtils.js");

var RomaDeviceManager = require("./romaDeviceManager.js");
var RomaRouteManager = require("./romaRouteManager.js");
var RomaOscMessage = require("./romaOscMessage.js");

var DEBUG = true;
var inspect = require('eyes').inspector();

var express = require('express');

var Roma = function(devices,routes){
  var self = this;
  
  
  
  self.router = new RomaRouteManager(DEBUG);
  
  routes.forEach(function(route){
    self.router.addRoute(route);
  });

  self.devices = new RomaDeviceManager(DEBUG);

  devices.forEach(function(device){
	self.devices.addDevice(device);
	//inspect(device);
	
  });
  
  //Initialice WEB API
  
  self.webapi = express();
  
  self.webapi.get('/', function(req, res){
    res.send('Hello World');
  });
  
  self.webapi.get('/devices', function(req, res){
	//inspect(self.devices.getDevices());
    res.send(self.devices.getDevices());
  });
  self.webapi.get('/device/:id', function(req, res){
	//inspect(self.devices.getDevices());
    res.send(self.devices.getDevice(req.params.id));
  });
  self.webapi.get('/routes', function(req, res){
	//inspect(self.devices.getDevices());
    res.send(self.router.getRoutes());
  });
  

  self.webapi.listen(3000);
  
  /*devices.forEach(function(device){
    var romaDevice = new RomaDevice(device);
	romaDevice.on('oscMessage',self.oscMessageReceived);
	romaDevice.on('deviceSenderReady',function(device){
		if(DEBUG)
			console.log("%s ready for send on port %d in %s",device.id, device.senderPort, device.host);
	});
	romaDevice.on('deviceReceiverReady',function(device){
		if(DEBUG)
			console.log("%s ready for receive on port %d in %s",device.id, device.senderPort, device.host);
	});
	self.devices[device.id] = romaDevice;
  });*/
   self.sendMessage = function(deviceId,message){
	message.outputTarget = deviceId;
    self.devices.send(deviceId,message);
    if(DEBUG){
     // console.log('Message sended to %s',deviceId);
      //console.log('OSC Message sended -> ' + message.toString());
	  //inspect('OSC Message sended -> ' + message.toString());
	  inspect(message);
    }
   }
  self.oscMessageReceived = function(message){

 
    var oscMessage = new RomaOscMessage(message);
    if(DEBUG){
  //    console.log('OSC Message received -> ' + oscMessage.toString());
    }
	
	var mirrors = self.devices.getDeviceMirrors(message.sourceId);

	if(mirrors){
		mirrors.forEach(function(value){
			self.sendMessage(value,oscMessage);
		});
	}
    var matchedRoutes = self.router.match(oscMessage);

	if(matchedRoutes){
	
      matchedRoutes.forEach(function(route){
		route.targets.forEach(function(target){
			var triggered = false;
			if(target.trigger){
				if(oscMessage.params[target.triggerIndex] == target.triggerValue){
					triggered = true;
				} else {
					triggered = false;
				}
			} else {
				triggered = true;
			}
			if(triggered){
			  var output;
			  if(target.routeArgs){
				var processedParams = RomaUtils.RomaParamProccessor(oscMessage.params,target.params);
				output = {path:target.path,params:processedParams,typetag:target.typetag};
			  } else {
				output = {path:target.path,params:oscMessage.params,typetag:oscMessage.typetag};
			  }
			  //send
			  var outputMessage = new RomaOscMessage(output);
			  self.sendMessage(target.deviceId,outputMessage);
			}
		});
	  });
    }
   
  }
   self.devices.on('oscMessage',self.oscMessageReceived);
  self.deviceSenderReady = function(device){
	if(DEBUG)
			console.log("%s ready for send on port %d in %s",device.id, device.senderPort, device.host);
  }
  return self;
}
Roma.prototype._oscMessageReceived = function(roma,message){
  self = this;
  
  var oscMessage = new RomaOscMessage(message);
    if(DEBUG){
  //console.log('OSC Message received -> ' + oscMessage.toString());
      inspect(message);
    }

	var mirrors = roma.devices.getDeviceMirrors(message.sourceId);

	if(mirrors){
		mirrors.forEach(function(value){
			roma.sendMessage(value,oscMessage);
		});
	}
	
    var matchedRoutes = roma.router.match(oscMessage);
	//var matchedRoutes;
	if(matchedRoutes){
	
      matchedRoutes.forEach(function(route){
		route.targets.forEach(function(target){
		//inspect(target);
			var triggered = false;
			if(target.trigger){
				if(oscMessage.params[target.triggerIndex] == target.triggerValue){
					triggered = true;
				} else {
					triggered = false;
				}
			} else {
				triggered = true;
			}
			if(triggered){
			  var output;
			  if(target.routeArgs){
				var processedParams = RomaUtils.RomaParamProccessor(oscMessage.params,target.params);
				output = {path:target.path,params:processedParams,typetag:target.typetag};
			  } else {
				output = {path:target.path,params:oscMessage.params,typetag:oscMessage.typetag};
			  }
			  //send
			  var outputMessage = new RomaOscMessage(output);
			 self.sendMessage(target.deviceId,outputMessage);
			}
		});
	  });
    }
   
}
module.exports = Roma;
