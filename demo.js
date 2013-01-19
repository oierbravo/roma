var routes = require('./demo-routes').routes;
var devices = require('./demo-devices').devices;
var Roma = require('./lib/roma');

var roma = new Roma(devices,routes);