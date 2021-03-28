"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = Schema({
	name: {
		type: String,
		trim: true,
	},
	surname: {
		type: String,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
	birthday: String,
	country: String,
	image: String,
	roles: [{type: Schema.ObjectId, ref: "Role", required: true}],
});

module.exports = mongoose.model("User", UserSchema);
