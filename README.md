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
        senderPort: 9001, //optional
        receiverPort: 9000, //optional
        host: 'localhost'
    }

## Route data format:

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
    
## Examples:
- Devices:
    devices/index.js 
- Routes:
    routes/index.js
    
- Ready to run router:
    $ node basic-roma