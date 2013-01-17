var RomaOscMessage = function(msg){

	var self = this;
	for(index in msg){
		self[index] = msg[index];
	}
		
	self.toString = function(message){
		var output = "";
		output += "Path: " + self.path + " ";
		if(self.params.length > 0){
			output += "Params: ";
			for(param_index in self.params){
				var param = self.params[param_index];
				output += param;
				
				output += " "
			}
		} else {
			output += "Without params ";
		}
		if(self.typetag){
			output += "typetag: " + self.typetag + " ";
		}
		if(self.outputTarget){
			output += "to : " + self.outputTarget + " ";
		} else {
			output += "from : " + self.sourceId + " ";
		}
		return output;
	}
	return self;
}
module.exports = RomaOscMessage;
