"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CameraSchema = Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	flash: {
		type: Boolean,
		required: true,
		trim: true,
	},
	power: {
		type: Boolean,
		required: true,
		trim: true,
	},
	resolution: {
		type: String,
		required: true,
		trim: true,
	},
	turn_screen: {
		type: Boolean,
		required: true,
		trim: true,
	},
	//Un usuario tiene muchas camaras y una camara puede ser vista por varios usuarios
});

module.exports = mongoose.model("Camera", CameraSchema);