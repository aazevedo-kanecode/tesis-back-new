// Modelos
let UserCamera = require("../models/user_camara");
let Camera = require("../models/camera");

exports.getCameraByAdministrator = async (req, res) => {
	try {
		var adminId = req.params ? req.params.id : req.body.UserAdmin;
		const cameras = await UserCamera.find({UserAdmin: adminId}).distinct(
			"cameraId"
		);
		if (req.params) {
			res.json(cameras);
		} else if (req.body.UserAdmin) {
			return cameras;
		}
	} catch (error) {
		console.error(error);
	}
};

exports.getCameraByCollaborator = async (req, res) => {
	try {
		var collaboratorId = req.params.id;
		const cameras = await UserCamera.find({
			UserCollaborator: collaboratorId,
		});
		return res.json(cameras);
	} catch (error) {
		console.error(error);
	}
};
