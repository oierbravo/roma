exports.routes = 
[ 
  {
    source:"/dummy/address",
    targets:[{ 
      deviceId: 'live-device1' 
          ,path: '/live/play'
          ,typetag: 'i'
          ,params: [1]
          ,routeArgs:true
          }
          ]
    
  },
  {
    source:"/a/a",
    targets:[{ 
      deviceId: 'dummy-device1', 
          path: '/output/address'
          
          }
          ]
    
  },
	{
		source:"/live/play",
		targets:[{ 
			deviceId: 'dummy-device1', 
  		    path: '/output/address'
  		    
  		    }
  		    ]
	  
	},
	{
    source:"/1/fader1",
    targets:[{ 
      deviceId: 'live-device1', 
          path: '/live/volume'
          ,typetag: 'if'
          ,params: [0,"#arg0"]
          ,routeArgs:true
          
          }
          ]
    
  },
  {
    source:"/1/fader2",
    targets:[{ 
      deviceId: 'live-device1', 
          path: '/live/volume'
          ,typetag: 'if'
          ,params: [1,"#arg0"]
          ,routeArgs:true
          
          }
          ]
    
  },
  {
     source:"/1/fader3",
    targets:[{ 
      deviceId: 'live-device1', 
          path: '/live/volume'
          ,typetag: 'if'
          ,params: [2,"#arg0"]
          ,routeArgs:true
          
          }
          ]
    
  },
  {
     source:"/1/fader4",
    targets:[{ 
      deviceId: 'live-device1', 
          path: '/live/volume'
          ,typetag: 'if'
          ,params: [3,"#arg0"]
          ,routeArgs:true
          
          }
          ]
    
  },
  {
     source:"/1/toggle1",
     targets:[{ 
      deviceId: 'live-device1', 
          path: '/live/solo'
          ,typetag: 'ii'
          ,params: [0,"#arg0"]
          ,routeArgs:true
          
          }
          ]
    
  },
  {
     source:"/1/toggle2",
     targets:[{ 
      deviceId: 'live-device1', 
          path: '/live/solo'
          ,typetag: 'ii'
          ,params: [1,"#arg0"]
          ,routeArgs:true
          
          }
          ]
    
  },
  {
     source:"/1/toggle3",
     targets:[{ 
      deviceId: 'live-device1', 
          path: '/live/solo'
          ,typetag: 'ii'
          ,params: [2,"#arg0"]
          ,routeArgs:true
          
          }
          ]
    
  },
  {
     source:"/1/toggle4",
     targets:[{ 
      deviceId: 'live-device1', 
          path: '/live/solo'
          ,typetag: 'ii'
          ,params: [3,"#arg0"]
          ,routeArgs:true
          
          }
          ]
    
  },
 
	
  {
     source:"/4/multitoggle/1/1",
     targets:[{ 
      deviceId: 'live-device1', 
          path: '/live/play/clip'
          ,typetag: 'ii'
          ,params: [0,0]
          ,routeArgs:true
          
          }
          ]
    
  },
  {
     source:"/2/push1",
     targets:[{ 
      deviceId: 'live-device1', 
          path: '/live/play/clip'
          ,typetag: 'ii'
          ,params: [0,0]
          ,routeArgs:true
          
          }
          ]
    
  },
  {
     source:"/2/push2",
     targets:[{ 
      deviceId: 'live-device1', 
          path: '/live/play/clip'
          ,typetag: 'ii'
          ,params: [1,0]
          ,routeArgs:true
          
          }
          ]
    
  },
  {
     source:"/2/push5",
     targets:[{ 
      deviceId: 'live-device1', 
          path: '/live/play/clip'
          ,typetag: 'ii'
          ,params: [0,1]
          ,routeArgs:true
          
          }
          ]
    
  },
];