var osc = require('omgosc');
/*
var receiver = new osc.UdpReceiver(9100,'192.168.1.128');
receiver.on('', function(e) {
  console.log(e);
});
*/
//((var sender = new osc.UdpSender('localhost',9000);
//sender.send('/live/volume','if',[0,0.9]);

var sender = new osc.UdpSender('localhost',9999);
sender.send('/dummy/address','i',1);
