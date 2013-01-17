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
				output += self.params[param_index];
				output += " "
			}
		} else {
			output += "Without params ";
		}
		if(self.typetag){
			output += "typetag: " + self.typetag + " ";
		}
		output += "from : " + self.sourceId + " ";
		return output;
	}
	return self;
}
module.exports = RomaOscMessage;
