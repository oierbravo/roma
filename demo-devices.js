exports.devices = 
[
	{
		id:'live-device1',
		fromPort: 9001,
		toPort: 9000,
		host: 'localhost'
	}
	,{
		id:'dummy-device1',
		fromPort: 9999,
		toPort: 9998,
		host: 'localhost'
		//mirrors: ["live-device1"]
	}
	,{
    id:'touchosc-device1',
    fromPort: 9100,
    toPort: 9990,
	toHost: '192.168.1.128',
    host: 'localhost'
  }
];