// Modelos
let Camera = require("../models/camera");

exports.getCameras = async (req, res) => {
	try {
		if (req.params.page) {
			var page = req.params.page;
		} else {
			var page = 1;
		}

		var itemsPerPage = 3;

		Camera.find()
			.sort("name")
			.paginate(page, itemsPerPage, function (err, cameras, total) {
				if (err) {
					res.status(500).send({message: "Error en la peticion"});
				} else {
					if (!cameras) {
						res.status(404).send({message: "No hay camaras"});
					} else {
						return res.status(200).send({total_items: total, cameras: cameras});
					}
				}
			});
	} catch (error) {
		console.error(error);
	}
};

exports.getCamera = async (req, res) => {
	try {
		var cameraId = req.params.id;
		Camera.findById(cameraId, (err, camera) => {
			if (err) {
				res.status(500).send({message: "Error en la peticion"});
			} else {
				if (!camera) {
					res.status(404).send({message: "La camara no existe"});
				} else {
					res.status(200).send({camera});
				}
			}
		});
	} catch (error) {
		console.error(error);
	}
};

exports.saveCamera = async (req, res) => {
	try {
		let camera = new Camera();
		let params = req.body;

		if (
			params.name &&
			params.flash &&
			params.power &&
			params.resolution &&
			params.turn_screen
		) {
			camera.name = params.name;
			camera.flash = params.flash;
			camera.power = params.power;
			camera.resolution = params.resolution;
			camera.turn_screen = params.turn_screen;

			camera.save((err, cameraStored) => {
				if (err) {
					res.status(500).send({message: "Error al guardar la camara"});
				} else {
					if (!cameraStored) {
						res.status(404).send({message: "La camara no ha sido guardada"});
					} else {
						res.status(200).send({camara: camaraStored});
					}
				}
			});
		}
	} catch (error) {
		console.error(error);
	}
};

exports.UpdateCamera = async (req, res) => {
	try {
		var cameraId = req.params.id;
		var update = req.body;

		Camera.findByIdAndUpdate(cameraId, update, (err, cameraUpdated) => {
			if (err) {
				res.status(500).send({message: "Error al actualizar la camara"});
			} else {
				if (!cameraUpdated) {
					res.status(404).send({message: "La camara no ha sido actualizada"});
				} else {
					res.status(200).send({camera: cameraUpdated});
				}
			}
		});
	} catch (error) {
		console.error(error);
	}
};

exports.DeleteCamera = async (req, res) => {
	try {
	} catch (error) {
		console.error(error);
	}
};
