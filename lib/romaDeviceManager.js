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
		romaDevice.on('deviceReady',function(e){inspect("Device Ready")});
	}
	if(romaDevice.getMirrors()){
		self.mirrors[device.id] = romaDevice.getMirrors();
	}
	self.devices.push(romaDevice);
}
RomaDeviceManager.prototype.send = function(deviceId,message){
	self = this;
	self.getDevice(deviceId).send(message);
}
module.exports = RomaDeviceManager;
