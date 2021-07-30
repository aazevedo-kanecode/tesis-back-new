"use strict";
var createRoles = require("./libs/initialSetup");
require('dotenv').config();
var express = require("express");
var bodyParser = require("body-parser");
var webpush = require("web-push");

var app = express();
createRoles.createRoles();
//const db = new JsonDB(new Config('myDatabase', true, false, '/'));

const http = require("http").Server(app); //creamos un servidor http a partir de la libreria express
 
const io = require('socket.io')(http, {
    cors: {
        origin: process.env.FRONT_ORIGIN || 'http://localhost:4200',
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
});

//Push notifications
const vapidKeys = {
	publicKey: process.env.PUBLIC_KEY,
	privateKey: process.env.PRIVATE_KEY,
};

webpush.setVapidDetails(
	"mailto:example@yourdomain.org",
	vapidKeys.publicKey,
	vapidKeys.privateKey
);

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
var google_drive = require("./routes/googleDrive");
var user_camera = require("./routes/user_camera");

// middlewares de body-parser

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Configurar cabeceras y cors

const cors = require("cors");
app.use(cors());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	//res.header("Access-Control-Allow-Credentials", true);
	/*res.header(
		"Access-Control-Allow-Headers",
		"Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
	);*/
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	//res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
	next();
});

//streaming de video

//ficheros estaticos
//app.use(require("./routes/streamingvideo.routes"));
//app.use(express.static(__dirname + "/public"));

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
app.use("/api", google_drive);
app.use("/api", user_camera);

io.on("connection", (socket) => {
	socket.on("stream", (image) => {
		console.log("usuario conectado");
		socket.broadcast.emit("stream", image); //emitir el evento a todos los sockets conectados
	});
});

module.exports = app;
module.exports = http;