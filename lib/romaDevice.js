var sys = require('util');
var events = require('events');
var osc = require('omgosc');
var DEBUG = true;	
var RomaDevice = function(config){

	var self = this;
	self.id = config.id;
	self.config = config;
	self.hasSender = false;
	self.hasReceiver = false;
	self.messageReceived = function(message){
		message.sourceId = self.id;
		self.emit('oscMessage', message);
	}
	if(self.config.senderPort){
		self.sender = new osc.UdpSender(self.config.host,self.config.receiverPort);
		if(DEBUG)
			console.log("OSC server prepared for sending on port %d in %s", self.config.senderPort, self.config.host);
		self.hasSender = true;
	}
    if(self.config.senderPort){
		self.receiver = new osc.UdpReceiver(self.config.senderPort,self.config.host);
		self.receiver.on('',self.messageReceived);
		self.hasReceiver = true;
	}
	self.send = function(message){
		if(self.hasSender){
			self.sender.send(message.path,message.typetag,message.params)
		}
	}
	self.getMirrors = function(){
		return self.config.mirrors;
	}
	return self;
}
sys.inherits(RomaDevice, events.EventEmitter);
module.exports = RomaDevice;
