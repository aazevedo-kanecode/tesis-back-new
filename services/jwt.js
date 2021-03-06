"use strect";

var jwt = require("jwt-simple");
var moment = require("moment");
const secret = "clave_secreta_del_curso_de_angular4avanzado";

exports.createToken = function (user) {
	var payload = {
		sub: user._id,
		name: user.name,
		surname: user.surname,
		email: user.email,
		role: user.role,
		image: user.image,
		iat: moment().unix(), // momento de creación del token en formato timestamp
		exp: moment().add(30, "days").unix, // momento de expiración del token (30 días)
	};
	return jwt.encode(payload, secret);
};
