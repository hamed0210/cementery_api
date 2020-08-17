const { Sequelize } = require('sequelize')

const database = require('../database/database')

const Propietarios = database.define(
	'propietario',
	{
		id_pro: {
			type: Sequelize.INTEGER.UNSIGNED,
			primaryKey: true,
		},
		nombres_pro: {
			type: Sequelize.STRING,
		},
		apellidos_pro: {
			type: Sequelize.STRING,
		},
		dir_pro: {
			type: Sequelize.STRING,
		},
		dir_lugar_pro: {
			type: Sequelize.STRING,
		},
		cel_pro: {
			type: Sequelize.BIGINT,
		},
	},
	{
		timestamps: false,
	}
)

module.exports = Propietarios
