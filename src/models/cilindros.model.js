const { Sequelize } = require('sequelize')

const db = require('../database/database')

const Cilindros = db.define(
	'cilindro',
	{
		cod_cilindro: {
			type: Sequelize.STRING,
			primaryKey: true,
		},
		cod_boveda_cilindro: {
			type: Sequelize.STRING,
		},
		id_fall: {
			type: Sequelize.INTEGER.UNSIGNED,
		},
	},
	{
		timestamps: false,
	}
)

module.exports = Cilindros
