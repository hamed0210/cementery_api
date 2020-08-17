const { Sequelize } = require('sequelize')

const db = require('../database/database')

const Solicitantes = db.define(
	'solicitante',
	{
		id_so: {
			type: Sequelize.INTEGER.UNSIGNED,
			primaryKey: true,
		},
		nombres_so: {
			type: Sequelize.STRING,
		},
		apellidos_so: {
			type: Sequelize.STRING,
		},
		dir_so: {
			type: Sequelize.STRING,
		},
		dir_lugar_so: {
			type: Sequelize.STRING,
		},
		cel_so: {
			type: Sequelize.BIGINT,
		},
	},
	{
		timestamps: false,
	}
)

module.exports = Solicitantes
