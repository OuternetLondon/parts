
const express = require('express');
const path = require('path');
const { createServer } = require('node:http');
const {Server} = require("socket.io")

const app = express();
const PORT = process.env.PORT || 5055;
// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the 'wwwroot' and 'public' directories
//app.use(express.static(path.join(__dirname, 'wwwroot')));

app.use(express.static(path.join(__dirname, './frontend_wheel/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend_wheel/dist', 'index.html'));
}); 
app.use(express.static(path.join(__dirname, 'public')));
const server = createServer(app);
const io = new Server(server,{
  cors: {
      origin: "*",  
      methods: ["GET", "POST"]
  }
})

const users = new Map()

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  users.set(socket.id, {acceleration: {x: 0, y: 0, z: 0}, rotationRate: {alpha: 0, beta: 0, gamma: 0}})
  // Handle a message from the client
  socket.on('motion_data', (data, user) => {
      //console.log('Message received:', data);
      users.set(user, data)
      console.log("users", users)
     // io.emit('message', `Server: ${data}`); // Broadcast message to all clients
  });

  socket.on('disconnect', () => {
      //users.delete(socket.id)
      console.log('A user disconnected:', socket.id);
  });
});

// Homepage route
/*
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/testenv', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});*/

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});