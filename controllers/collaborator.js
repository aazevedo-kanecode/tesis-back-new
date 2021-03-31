// Modelos
let User = require("../models/user");
let Role = require("../models/role");

exports.createUser = async (req, res) => {
	try {
		var user = new User();
		var params = req.body;
		params.password = Math.random().toString(36).slice(-8);

		if ((params.name && params.surname && params.email, params.image)) {
			user.name = params.name;
			user.surname = params.surname;
			user.email = params.email;
			user.password = params.password;

			const role = await Role.findOne({name: "collaborator"});
			user.roles = [role._id];

			User.findOne({email: user.email.toLowerCase()}, (err, issetUser) => {
				if (err) {
					res.status(500).send({message: "error al comprobar el usuario"});
				} else {
					//Si no existe se crea el usuario y se asocia al admininistrador
					if (!issetUser) {
					} else {
						//Actualizamos el usuario colaborador y lo asociamos al administrador
					}
				}
			});
		}
	} catch (error) {
		console.error(error);
	}
};
