/*importScripts('sockjs.min.js', 'stomp.min.js', 'chitchat-app.js');

var stompClient = null;
onconnect = function(e) {
	var port = e.ports[0];

	port.onmessage = function (e) {
		//var workerResult = e.data[0];
		//port.postMessage(workerResult);
		switch (e.data[0]) {
			case "connect":
			{
				try {
					var socket = new SockJS('/endpoint-ws');
					stompClient = Stomp.over(socket);
					stompClient.connect({}, function (frame) {
						console.log('Connected: ' + frame);
						stompClient.subscribe('chitchat/chitchat-broadcast-listener', function (m) {
							updateChitChatStream(JSON.parse(m.body));
						});
					});
				}
				catch (err) {
					console.error(err);
				}
				break;
			}
			case "send":
			{
				try {
					stompClient.send("app/chitchat-broadcast", {}, e.data[1]);
				}
				catch (err) {
					console.error(err);
				}
				break;
			}
			default:
			{
				console.log("Invalid key");
				break;
			}
		}
	}

	updateChitChatStream = function (chitchatMessage) {
		try {
			port.postMessage(chitchatMessage);
		}
		catch (err) {
			console.error(err);
		}
	}
}*/
