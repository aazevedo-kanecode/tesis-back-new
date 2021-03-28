"use strict";

var mongoose = require("mongoose");
var app = require("./app");
var port = process.env.PORT || 8000;

// Url de la base de datos a https://mlab.com/databases/zoo
var url = "mongodb://localhost:27017/bd_tesis";

mongoose.Promise = global.Promise;
mongoose
	.connect(url, {useMongoClient: true})
	.then(() => {
		console.log("Conexión a la bdd correcta");
		// Creamos el servidor http
		app.listen(port, () => {
			console.log("Servidor corriendo en: http://localhost:" + port);
		});
	})
	.catch((error) => console.log(error));
