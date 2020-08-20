const { Sequelize } = require('sequelize')

const db = require('../database/database')

const Exhumaciones = db.define(
	'exhumation',
	{
		cod_ex: {
			type: Sequelize.UUIDV4,
			primaryKey: true,
		},
		id_so_ex: {
			type: Sequelize.INTEGER.UNSIGNED,
		},
		parent_so_ex: {
			type: Sequelize.STRING,
		},
		id_fall_ex: {
			type: Sequelize.INTEGER.UNSIGNED,
		},
		id_usu_ex: {
			type: Sequelize.INTEGER.UNSIGNED,
		},
		cod_boveda_de_ex: {
			type: Sequelize.STRING,
		},
		cod_boveda_hacia_ex: {
			type: Sequelize.STRING,
		},
		cod_cilindro_de_ex: {
			type: Sequelize.STRING,
		},
		cod_cilindro_hacia_ex: {
			type: Sequelize.STRING,
		},
		cod_nicho_hacia_ex: {
			type: Sequelize.STRING,
		},
		fecha_ex: {
			type: Sequelize.DATE,
		},
		fecha_creacion_ex: {
			type: Sequelize.NOW,
		},
	},
	{
		timestamps: false,
	}
)

module.exports = Exhumaciones
