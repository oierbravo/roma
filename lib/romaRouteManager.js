var RomaRoute = require("./romaRoute.js");
var RomaRouteManager = function(DEBUG){
	self = this;
	self.routes = []
	return self;
}
RomaRouteManager.prototype.getRoutes = function(){
	var self = this;
	return self.routes;
}
RomaRouteManager.prototype.addRoute = function(route){
	var self = this;
	var romaRoute = new RomaRoute(route);
	self.routes.push(romaRoute);
}
RomaRouteManager.prototype.match = function(oscMessage){
	var self = this;
	
	
	var matchedRoutes = [];
	self.routes.forEach(function(route){
	//console.log(route);
	var matched = route.match(oscMessage);
		if(matched){
				matchedRoutes.push(matched);
		}
	});

	return matchedRoutes;
}
module.exports = RomaRouteManager;