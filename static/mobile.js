var socket = io('http://localhost:3000/mobile');

socket.on('message', function (call) {
    document.getElementById('mobile').innerHTML = document.getElementById('mobile').innerHTML + "<br>" + call;
});