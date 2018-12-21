const path = require('path');
const fs = require('fs');
const https = require('https');
const express = require('express');
const socketIO = require('socket.io');

var certOptions = {
  key: fs.readFileSync(path.resolve(path.join(__dirname, 'server.key'))),
  cert: fs.readFileSync(path.resolve(path.join(__dirname, 'server.crt')))
}
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();

let server = https.createServer(certOptions, app);
let io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', (socket) => {
  console.log('New user connected');
  socket.on('createMessage', (data) => {

    socket.emit('newMessage', {
      from: data.from,
      text: data.text,
      createdAt: new Date()
    });
  })
  

  socket.on('disconnect', () => {
    console.log('A client has disconnected');
  });
});

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});