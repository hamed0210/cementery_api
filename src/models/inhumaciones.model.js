const { Sequelize } = require('sequelize')

const db = require('../database/database')

const Inhumaciones = db.define(
	'inhumation',
	{
		cod_in: {
			type: Sequelize.UUIDV4,
			primaryKey: true,
		},
		id_so_in: {
			type: Sequelize.INTEGER.UNSIGNED,
		},
		parent_so_in: {
			type: Sequelize.STRING,
		},
		id_fall_in: {
			type: Sequelize.INTEGER.UNSIGNED,
		},
		id_usu_in: {
			type: Sequelize.INTEGER.UNSIGNED,
		},
		cod_boveda_in: {
			type: Sequelize.STRING,
		},
		cod_cilindro_in: {
			type: Sequelize.STRING,
		},
		fecha_in: {
			type: Sequelize.DATE,
		},
		fecha_creacion_in: {
			type: Sequelize.NOW,
		},
		permiso_file_pro_in: {
			type: Sequelize.STRING,
		},
		fecha_permiso_in: {
			type: Sequelize.DATE,
		},
	},
	{
		timestamps: false,
	}
)

module.exports = Inhumaciones
