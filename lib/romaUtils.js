var RomaParamProccessor = function(inParams,outParams){
  var self = this;
  self.functions = {};
  self.functions.map = function(input,params,returnType){
    switch(returnType){
      case 'f':
        var output = (parseFloat(input) * params.b )/params.a;
        break;
      case 'i':
        var output = (parseInt(input) * params.b)/params.a;
        break;
      }
    return output;
  }
  self.functions.add = function(input,params,returnType){
    switch(returnType){
      case 'f':
        var output = parseFloat(input) + params.value;
        break;
      case 'i':
        var output = parseInt(input) + params.value;
        break;
      }
    return output;
  }
  self.functions.multiply = function(input,params,returnType){
    switch(returnType){
      case 'f':
        var output = parseFloat(input) * params.value;
        break;
      case 'i':
        var output = parseInt(input) * value;
        break;
      }
    return output;
  }
  
  
  var resultParams = outParams.map(function(val){

	if(typeof val=="string"){
	 if(val[0] == '#'){
	  var paramIndex = val.replace('#arg',''); 
	  return inParams[paramIndex];
	 } else {
	   return val;
	 }
   } else if(typeof val=="object") {

	  var callback = self.functions[val.func];
	  var param = callback(inParams[val.input],val.funcParams,val.typetag);

	  return param;
   } else {
	 return val;
   }
  });
  return resultParams;
  

}
module.exports = {
  RomaParamProccessor : RomaParamProccessor
}