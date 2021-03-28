let Role = require("../models/role");

const createRoles = async () => {
	try {
		const count = await Role.estimatedDocumentCount();
		if (count > 0) return;

		const value = await Promise.all([
			new Role({name: "collaborator"}).save(),
			new Role({name: "admin"}).save(),
		]);

		console.log(value);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	createRoles,
};
