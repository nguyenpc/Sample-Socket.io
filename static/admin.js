var socket = io('http://localhost:3000/admin');

socket.on('message', function (call) {
    document.getElementById('admin').innerHTML = document.getElementById('admin').innerHTML + "<br> Message: " + call;
});
