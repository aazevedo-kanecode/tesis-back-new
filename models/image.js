"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ImageSchema = Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	moment: {
		type: String,
		required: true,
		trim: true,
	},
	url: {
		type: String,
		required: true,
		trim: true,
	},
	size: {
		type: String,
		required: true,
		trim: true,
	},
	video: {type: Schema.ObjectId, ref: "Video", required: true},
});

module.exports = mongoose.model("Image", ImageSchema);