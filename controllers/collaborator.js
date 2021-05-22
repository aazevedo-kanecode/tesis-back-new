// Modelos
let User = require("../models/user");
let Role = require("../models/role");
let UserCamera = require("../models/user_camara");
let userCameraController = require("../controllers/user_camera");

exports.createCollaborator = async (req, res) => {
	try {
		var user = new User();
		var params = req.body;

		let userIdAdmin = params.userIdAdmin;
		params.password = Math.random().toString(36).slice(-8);

		if (params.name && params.surname && params.email && params.userIdAdmin) {
			user.name = params.name;
			user.surname = params.surname;
			user.email = params.email;
			user.password = params.password;

			const role = await Role.findOne({name: "collaborator"});
			user.roles = [role._id];

			User.findOne(
				{email: user.email.toLowerCase()},
				(err, collaboratorExists) => {
					if (!collaboratorExists) {
						user.save((err, collaboratorStored) => {
							//Creo el colaborador
							userCameraController
								.getCameraByAdministrator({
									body: {UserAdmin: userIdAdmin},
								})
								.then((cameras) => {
									cameras.filter(function (camarita) {
										//Por cada camara encontrada creo una instancia
										let user_camera = new UserCamera();
										user_camera.cameraId = camarita;
										user_camera.UserAdmin = userIdAdmin;
										user_camera.UserCollaborator = collaboratorStored._id;
										user_camera.save();
									});
								}); //Obtengo todas las camaras del administrad or

							res.status(200).send({
								message:
									"Colaborador creado y asociado a las camaras del administrador",
								collaboratorStored,
							});
						}); //Se crea el usuario
					} else {
						res.status(404).send({
							message: "ERROR! El usuario ya es uno de sus colaboradores",
						});
					}
				}
			);
		}
	} catch (error) {
		console.error(error);
	}
};

exports.getCollaboratorsByAdministrator = async (req, res) => {
	try {
		var adminId = req.params ? req.params.id : req.body.UserAdmin;
		const collaborator = await UserCamera.find({UserAdmin: adminId}).distinct(
			"UserCollaborator"
		);
		if (req.params) {
			res.json(collaborator);
		} else if (req.body.UserAdmin) {
			return collaborator;
		}
	} catch (error) {
		console.error(error);
	}
};
