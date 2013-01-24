var RomaRoute = function(config){
	self = this;
	for(index in config){
		self[index] = config[index];
	}
	
	
	return self;
}
RomaRoute.prototype.match = function(oscMessage){
	var self = this;
	if(oscMessage.path == self.source){
			return self;
		} else {
			return false;
		}
}
module.exports = RomaRoute;