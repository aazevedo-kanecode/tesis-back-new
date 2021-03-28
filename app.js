"use strict";
var createRoles = require("./libs/initialSetup");

var express = require("express");
var bodyParser = require("body-parser");

var app = express();
createRoles.createRoles();

const http = require("http").Server(app); //creamos un servidor http a partir de la libreria express
const io = require("socket.io")(http); //para poder llamarlo desde nuestros html que vamos a crear luego

// Cargar rutas
var user_routes = require("./routes/user");
var camera_routes = require("./routes/camera");
var video_routes = require("./routes/video");
var collaborator_routes = require("./routes/collaborator");
var role_routes = require("./routes/role");
var image_routes = require("./routes/image");
var notification_routes = require("./routes/notification");
var confidenceLevels_routes = require("./routes/confidenceLevels");
var face_routes = require("./routes/face");

// middlewares de body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Configurar cabeceras y cors

const cors = require("cors");
app.use(cors());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
	next();
});

//streaming de video

//ficheros estaticos
app.use(require("./routes/streamingvideo.routes"));
app.use(express.static(__dirname + "/public"));

// rutas base body-parser
app.use("/api", user_routes);
app.use("/api", camera_routes);
app.use("/api", video_routes);
app.use("/api", collaborator_routes);
app.use("/api", role_routes);
app.use("/api", image_routes);
app.use("/api", notification_routes);
app.use("/api", confidenceLevels_routes);
app.use("/api", face_routes);

io.on("connection", (socket) => {
	socket.on("stream", (image) => {
		console.log("usuario conectado");
		socket.broadcast.emit("stream", image); //emitir el evento a todos los sockets conectados
	});
});

module.exports = app;
module.exports = http;