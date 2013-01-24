var util = require('util');
var events = require('events');
var osc = require('omgosc');
var RomaDevice = function(config){

	var self = this;
	self.id = config.id;
	self.config = config;
	self.hasSender = false;
	self.hasReceiver = false;
	self.messageReceived = function(message){
		message.sourceId = self.id;
		self.emit('deviceMessage', message);
	}
	if(self.config.senderPort){
		self.sender = new osc.UdpSender(self.config.host,self.config.receiverPort);
		self.emit('deviceSenderReady', {device:self});
		self.hasSender = true;
	}
    if(self.config.senderPort){
		var senderHost;
		if(self.config.senderHost){
			senderHost = self.config.senderHost;
		} else {
			senderHost = self.config.host;
		}
		self.receiver = new osc.UdpReceiver(self.config.senderPort,self.config.host);
		self.receiver.on('',self.messageReceived);
		self.emit('deviceReceiverReady', {device:self});
		self.hasReceiver = true;
	}
	self.send = function(message){
		if(self.hasSender){
			self.sender.send(message.path,message.typetag,message.params)
		}
	}
	self.getMirrors = function(){
		if(typeof self.config.mirrors == "undefined"){
			return false;
		}
		return self.config.mirrors;
	}
	return self;
}
util.inherits(RomaDevice, events.EventEmitter);
module.exports = RomaDevice;
