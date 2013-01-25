var util = require('util');
var events = require('events');
var osc = require('omgosc');
var RomaDevice = function(config){

	var self = this;
	for(index in config){
		self[index] = config[index];
	}
	self.hasSender = false;
	self.hasReceiver = false;

	self.messageReceived = function(message){
		message.sourceId = self.id;
		self.emit('deviceMessage', message);
	}
	
	self.send = function(message){
		if(self.hasSender){
			self.sender.send(message.path,message.typetag,message.params)
		}
	}
	self.getMirrors = function(){
		if(typeof self.mirrors == "undefined"){
			return false;
		}
		return self.mirrors;
	}
	self.toJSON = function() {
		var output = {
			id: self.id
			,host: self.host
			,fromPort: self.fromPort
			,toPort: self.toPort
			
		}
		if(self.toHost){
			output.toHost = self.toHost;
		}
		return output;
	}
	self.start = function() {
		if(self.toPort){
			var toHost;
			if(self.toHost){
				toHost = self.toHost;
			} else {
				toHost = self.host;
			}
			self.toHost = toHost;
			self.sender = new osc.UdpSender(toHost,self.toPort);
			self.emit('deviceSenderReady', {
				id:self.id
				,host:self.toHost
				,port:self.toPort
			});
			self.hasReceiver = true;
		}
		if(self.fromPort){
			
			self.receiver = new osc.UdpReceiver(self.fromPort,self.host);
			self.receiver.on('',self.messageReceived);
			self.emit('deviceReceiverReady', {
				id:self.id
				,host:self.host
				,port:self.fromPort
			});
			self.hasReceiver = true;
		}
	}
	self.restart = function(){
		self.stop();
		self.start();
	}
	self.stop = function(){
		if(self.hasReceiver){
			self.receiver.close();
			self.hasReceiver = false;
		}
		if(self.hasSender){
			self.sender.close();
			self.hasSender = false;
		}
	}
	return self;
}
util.inherits(RomaDevice, events.EventEmitter);
module.exports = RomaDevice;
