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

## Device data format:

    [{device1},{device2},{...}]

    device1: {
        id:'live-device1',
		mirrors:['mirrorDeviceId1'], //optional. Must be an array of strings even if is only one mirror. When used redirects all incoming messages 
        senderPort: 9001, //optional
        receiverPort: 9000, //optional
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
## Examples:
- Devices:
    demo-devices.js
- Routes:
    demo-routes.js
    
- Ready to run router:
    $ node demo