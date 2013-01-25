var util = require('util');
var events = require('events');
var RomaDevice = require("./romaDevice.js");

var RomaDeviceManager = function(DEBUG){

	var self = this;
	self.DEBUG = DEBUG;
	self.devices = [];
	self.mirrors = {};
	return self;
}
util.inherits(RomaDeviceManager, events.EventEmitter);
RomaDeviceManager.prototype.getDevices = function(){
	self = this;
	return self.devices;
}
RomaDeviceManager.prototype.getDevice = function(deviceId){
	self = this;
	var output = false;
	self.devices.forEach(function(device){
		if(device.id == deviceId){
			output = device;
		}
	});
	return output;
	
}
RomaDeviceManager.prototype.getDeviceIndex = function(deviceId){
	self = this;
	var output = false;
	for(var i = 0;i< self.devices.length;i++){
		if(self.devices[i].id == deviceId){
			output = i;
		}
	}
	return output;
	
}
RomaDeviceManager.prototype.getDeviceMirrors = function(deviceId){
	self = this;
	if(self.mirrors[deviceId] != 'undefined'){
	 return self.mirrors[deviceId];
	} else {
	  return false;
	}
	
	
}
RomaDeviceManager.prototype.addDevice = function(device){
	self = this;
	var romaDevice = new RomaDevice(device);
	romaDevice.on('deviceMessage',function(e){self.emit("oscMessage",e)});
	if(self.DEBUG){
		romaDevice.on('deviceReceiverReady',function(e){console.log(e.id + ": Receiver Ready on " + e.host + ':' + e.port )});
		romaDevice.on('deviceSenderReady',function(e){console.log(e.id + ": Sender Ready on " + e.host + ':' + e.port )});
	}
	if(romaDevice.getMirrors()){
		self.mirrors[device.id] = romaDevice.getMirrors();
	}
	romaDevice.start();
	self.devices.push(romaDevice);
}
RomaDeviceManager.prototype.updateDevice = function(deviceId,newData){
	var output;
	self = this;
	
	var romaDeviceIndex = self.getDeviceIndex(deviceId);
	if(romaDeviceIndex){
		for(param in newData){
			self.devices[romaDeviceIndex][param] = newData[param];
		}
		self.devices[romaDeviceIndex].restart();
		output = self.devices[romaDeviceIndex].toJSON();
	} else {
		output =  'update error';
	}
	
	return output;
}
RomaDeviceManager.prototype.deleteDevice = function(deviceId){
	self = this;
	var romaDeviceIndex = self.getDeviceIndex(deviceId);
	
	if(romaDeviceIndex){
		self.devices[romaDeviceIndex].stop();
		self.devices.slice(romaDeviceIndex,1);
		return "OK";
	} else {
		return "id not found";
	}
}
RomaDeviceManager.prototype.send = function(deviceId,message){
	self = this;
	self.getDevice(deviceId).send(message);
}
module.exports = RomaDeviceManager;
