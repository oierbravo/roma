var Hook = require('hook.io').Hook;
var OSCServerHook = require('hook.io-oscserver').OSCServerHook;
var OSCRouterHook = require('hook.io-oscrouter').OSCRouterHook;
var routes = require('./routes/routes');
var devices = require('./routes/devices');

var routerHook = new OSCRouterHook({
  name: "osc-router"
  ,devices:devices.devices
  ,routes:routes.routes
   ,debug:true
});
/*routerHook.on('*::oscMessage',function(data){
  

})*/
routerHook.start();

var devicesHooks = [];

devices.devices.forEach(function(item){
	//console.log(item);
	var oscHook = new OSCServerHook({
	  name: item.id
	  ,inPort:item.senderPort
	  ,outPort:item.receiverPort
	  ,host:item.host
	//  ,type:'osc-server'
	  ,debug:true
	});
	
	oscHook.start();
	devicesHooks.push(oscHook);
});

