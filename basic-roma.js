var routes = require('./routes').routes;
var devices = require('./devices').devices;
var Roma = require('./lib/roma').Roma;

var roma = new Roma(devices,routes);