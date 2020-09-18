/**
 * Created by mrprintedwall on 9/4/16.
 */
var stompClient = null;
var ChitchatApp = function(){
}

ChitchatApp.prototype.getContext = function()
{
}

ChitchatApp.prototype.connect = function() {
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
}

ChitchatApp.prototype.sendChitChatMessage = function(chitchatMessage) {
	try {
		stompClient.send("app/chitchat-broadcast", {}, chitchatMessage);
	}
	catch (err) {
		console.error(err);
	}
}

updateChitChatStream = function(chitchatMessage) {
	try {
		onconnect = function(e) {
			var port = e.ports[0];
			port.postMessage(chitchatMessage);
		}
	}
	catch (err) {
		console.error(err);
	}
}