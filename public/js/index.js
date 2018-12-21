var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'victor',
    text: 'sup bitches'
  });
});

socket.on('disconnect', () => {
  console.log('disconnected from server');
});

socket.on('newMessage', function(data) {
  console.log(`${data.from}: ${data.text}`);
});

