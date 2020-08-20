const { Sequelize } = require('sequelize')

const db = require('../database/database')

const Fallecidos = db.define(
	'fallecido',
	{
		id_fall: {
			type: Sequelize.INTEGER.UNSIGNED,
			primaryKey: true,
		},
		nombres_fall: {
			type: Sequelize.STRING,
		},
		apellidos_fall: {
			type: Sequelize.STRING,
		},
		dir_fall: {
			type: Sequelize.STRING,
		},
		dir_lugar_fall: {
			type: Sequelize.STRING,
		},
		fecha_muerte_fall: {
			type: Sequelize.DATE,
		},
		cod_certi_muerte_fall: {
			type: Sequelize.STRING,
		},
		certi_muerte_fall: {
			type: Sequelize.STRING,
		},
		causa_fall: {
			type: Sequelize.STRING,
		},
	},
	{
		timestamps: false,
	}
)

module.exports = Fallecidos
