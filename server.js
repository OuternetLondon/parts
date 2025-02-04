const express = require("express");
const path = require("path");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
//const controls = require('./controls.json');

const app = express();
const PORT = process.env.PORT || 5056;
// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the 'wwwroot' and 'public' directories
//app.use(express.static(path.join(__dirname, 'wwwroot')));

/*
app.get('/api/controls', (req, res) => {
  res.json(controls); 
});*/

//testing commit
app.use(express.static(path.join(__dirname, "./frontend_wheel/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend_wheel/dist", "index.html"));
});

//app.use(express.static(path.join(__dirname, 'public')));
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  // wheel_users.set(socket.id, {acceleration: {x: 0, y: 0, z: 0}, rotationRate: {alpha: 0, beta: 0, gamma: 0}})
  // Handle a message from the client
  socket.on("controls_data", (JSON) => {
    console.log("Message received:", JSON);
  });
  socket.on("button_data", (JSON) => {
    socket.emit("button_action", JSON);
    console.log("Button data", JSON);
  });
  socket.on("joystick_data", (JSON) => {
    socket.emit("joystick_action", JSON);
    console.log("Joystick data", JSON);
  });
  socket.on("racing_wheel_data", (JSON) => {
    socket.emit("racing_wheel_action", JSON);
    console.log("Racing wheel data", JSON);
  });
  socket.on("toggle_data", (JSON) => {
    socket.emit("toggle_action", JSON);
    console.log("Toggle data", JSON);
  });
  socket.on("touchpad_data", (JSON) => {
    socket.emit("touchpad_action", JSON);
    console.log("Touchpad data", JSON);
  });

  socket.on("disconnect", () => {
    //users.delete(socket.id)
    console.log("A user disconnected:", socket.id);
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
