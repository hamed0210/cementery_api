const { Sequelize, DataTypes } = require('sequelize')

const db = require('../database/database')

const Bovedas = db.define(
	'boveda',
	{
		cod_boveda: {
			type: Sequelize.STRING,
			primaryKey: true,
		},
		cant_cilindros_boveda: {
			type: Sequelize.INTEGER,
		},
		tipo_boveda: {
			type: Sequelize.ENUM('Privado', 'Gobierno'),
		},
		cant_nichos_boveda: {
			type: Sequelize.INTEGER,
		},
		id_pro_boveda: {
			type: Sequelize.INTEGER.UNSIGNED,
		},
		id_usu_boveda: {
			type: Sequelize.INTEGER.UNSIGNED,
		},
	},
	{
		timestamps: false,
	}
)

module.exports = Bovedas
