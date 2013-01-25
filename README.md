ROMA - Route OSC Messages Asynchronously
=========
All the roads lead to Rome.
-----------------------------
WORK IN PROGRESS!!!
-------------------

## Introduction.
  
  Roma is basically an osc router. It takes an osc path as source and distributes it over different targets.
  ...

## Installation
    $ npm install roma

## Usage
	var Roma = require('./lib/roma');
	var roma = new Roma(devices,routes);
	
## Device data format:

    [{device1},{device2},{...}]

    device1: {
        id:'live-device1',
		mirrors:['mirrorDeviceId1'], //optional. Must be an array of strings even if is only one mirror. When used redirects all incoming messages 
        fromPort: 9001, //optional
        toPort: 9000, //optional
        host: 'localhost'
    }

## Route data format:

###Simple routing:
		{
		 source:"/path/to/route",
		 targets:[{ 
		  deviceId: 'live-device1', // this device  must be in the device list.
			  path: '/live/play/clip' //new path
			  ,routeArgs:true 
			  ,typetag: 'ii'  // type of the new params.must be in the same order as params
			  ,params: [2,8] 
			  }
			  ]
		
		}
###Param Reorder:
		{
		 source:"/path/to/route",
		 targets:[{ 
		  deviceId: 'live-device1', // this device  must be in the device list.
			  path: '/live/play/clip' //new path
			  ,routeArgs:true 
			  ,typetag: 'ii'  // type of the new params.must be in the same order as params
			  ,params: [2,"#arg0"]  // new params, #argX string correspond to the original X param
			  }
			  ]
		
		}
###Param process:
	{
		source:"/source/path",
		targets:[{ 
		  deviceId: 'dummy-device1'  // this device  must be in the device list.
			  ,path: '/new/path' //new path
			  ,typetag: 'ii' // type of the new params.must be in the same order as params
			  ,params: [1,{  //param processor needs an object.
				input:0 // index of source param
				,func:'add' //function to apply. "add","multiply" or "convert". 
				,funcParams:{value:-1} //"add" and "multiply" 
				,funcParams:{sourceMax:10,targetMax:300} //"convert"
				,typetag:'i'
			  }]
			  ,routeArgs:true
			}]
		
	}
###Trigger by param
	{
    source:"/path/to/route",
	
    targets:[{ 
		   deviceId: 'target-id'
		  ,trigger: true //Enables trigger
		  ,triggerIndex: 0 //Index of the param
		  ,triggerValue: 1 //Trigger value
          ,path: '/new/path'
          ,typetag: ''
          ,params: []
        }]
    
	}
	
## WebAPI
URL: http://localhost:3000 

### Devices
- GET "/devices": List of devices + info.
- GET "/devices/:id": Device info.
- POST "/devices/:id": Updates device. Requires JSON object body.
- POST "/devices": Adds a device. Requires JSON object body with the same data format as the config.
- DEL "/devices/:id": Deletes a device.

### Routes
- GET "/routes": List of routes + info.
		
## Examples:
- Devices:
    demo-devices.js
- Routes:
    demo-routes.js
    
- Ready to run router:
    $ node demo