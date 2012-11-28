exports.routes = 
[ 
	{
    source:"/1/fader1",
    targets:[{ 
      deviceId: 'live-device1', 
          path: '/live/master/volume'
          ,typetag: 'f'
          ,params: ["#arg0"]
          ,routeArgs:true
          
          }
          ]
    
  },
  {
    source:"/1/fader2",
    targets:[{ 
      deviceId: 'live-device1', 
          path: '/live/return/volume'
          ,typetag: 'if'
          ,params: [0,"#arg0"]
          ,routeArgs:true
          
          }
          ]
    
  },
  {
    source:"/1/fader3",
    targets:[{ 
      deviceId: 'live-device1', 
          path: '/live/return/volume'
          ,typetag: 'if'
          ,params: [1,"#arg0"]
          ,routeArgs:true
          
          }
          ]
    
  },
  {
    source:"/1/toggle2",
    targets:[{ 
      deviceId: 'live-device1', 
          path: '/live/return/mute'
          ,typetag: 'if'
          ,params: [0,"#arg0"]
          ,routeArgs:true
          
          }
          ]
    
  },
  {
    source:"/1/toggle3",
    targets:[{ 
      deviceId: 'live-device1', 
          path: '/live/return/mute'
          ,typetag: 'if'
          ,params: [1,"#arg0"]
          ,routeArgs:true
          
          }
          ]
    
  },
  {
    source:"/1/fader4",
    targets:[{ 
      deviceId: 'live-device1', 
          path: '/live/master/crossfader'
          ,typetag: 'f'
          ,params: ["#arg0"]
          ,routeArgs:true
          }
          ]
    
  },
  { 
    source:"/2/fader1",
    targets:[{deviceId: 'live-device1',path: '/live/volume',routeArgs:true,typetag: 'if',params: [0,"#arg0"]}]
  },
  { 
    source:"/2/fader2",
    targets:[{deviceId: 'live-device1',path: '/live/volume',routeArgs:true,typetag: 'if',params: [1,"#arg0"]}]
  },
  { 
    source:"/2/fader3",
    targets:[{deviceId: 'live-device1',path: '/live/volume',routeArgs:true,typetag: 'if',params: [2,"#arg0"]}]
  },
  { 
    source:"/2/fader4",
    targets:[{deviceId: 'live-device1',path: '/live/volume',routeArgs:true,typetag: 'if',params: [3,"#arg0"]}]
  },
  { 
    source:"/2/fader5",
    targets:[{deviceId: 'live-device1',path: '/live/volume',routeArgs:true,typetag: 'if',params: [4,"#arg0"]}]
  },
  { 
    source:"/2/fader6",
    targets:[{deviceId: 'live-device1',path: '/live/volume',routeArgs:true,typetag: 'if',params: [5,"#arg0"]}]
  },
  { 
    source:"/2/fader7",
    targets:[{deviceId: 'live-device1',path: '/live/volume',routeArgs:true,typetag: 'if',params: [6,"#arg0"]}]
  },
  { 
    source:"/2/fader8",
    targets:[{deviceId: 'live-device1',path: '/live/volume',routeArgs:true,typetag: 'if',params: [7,"#arg0"]}]
  },
  
];