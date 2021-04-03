"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserCameraSchema = Schema({
	user: {type: Schema.ObjectId, ref: "User", required: true},
	camera: {type: Schema.ObjectId, ref: "Camera", required: true},
});

module.exports = mongoose.model("UserCamera", UserCameraSchema);
