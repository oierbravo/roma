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
  });
  
  //Initialice WEB API
  self.webapi = express();
  self.webapi.use(express.bodyParser())

  self.webapi.get('/', function(req, res){
    res.send('Roma WebAPI');
  });
  
  self.webapi.get('/devices', function(req, res){
    res.header('Access-Control-Allow-Origin', '*');
    res.send(self.devices.getDevices());
  });
  self.webapi.get('/devices/:id', function(req, res){
    res.header('Access-Control-Allow-Origin', '*');
    res.send(self.devices.getDevice(req.params.id));
  });
  self.webapi.post('/devices', function(req, res){
    res.header('Access-Control-Allow-Origin', '*');
	var newData = req.body;
	var addedDevice = self.devices.addDevice(newData);
    res.send(addedDevice);
  });
  self.webapi.post('/devices/:id', function(req, res){
    res.header('Access-Control-Allow-Origin', '*');
	var deviceId = req.params.id;
	var newData = req.body;
	var updatedDevice = self.devices.updateDevice(deviceId,newData);
    res.send(updatedDevice);
  });
  self.webapi.del('/device/:id', function(req, res){
    res.header('Access-Control-Allow-Origin', '*');
	var deviceId = req.params.id;
	var deletedDevice = self.devices.deleteDevice(deviceId);
    res.send(deletedDevice);
  });
  self.webapi.get('/routes', function(req, res){
	res.header('Access-Control-Allow-Origin', '*');
    res.send(self.router.getRoutes());
  });

  self.webapi.listen(3000);
  

   self.sendMessage = function(deviceId,message){
	message.outputTarget = deviceId;
    self.devices.send(deviceId,message);
    if(DEBUG){
	  inspect(message);
    }
   }
  self.oscMessageReceived = function(message){

 
    var oscMessage = new RomaOscMessage(message);
    if(DEBUG){
		inspect(oscMessage.toString())
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
  //Event binded here
  self.devices.on('oscMessage',self.oscMessageReceived);
  self.deviceSenderReady = function(device){
	if(DEBUG)
			console.log("%s ready for send on port %d in %s",device.id, device.senderPort, device.host);
  }
  return self;
}
module.exports = Roma;
