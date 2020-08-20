const { Sequelize } = require('sequelize')

const db = require('../database/database')

const Nichos = db.define(
	'nicho',
	{
		cod_nicho: {
			type: Sequelize.STRING,
			primaryKey: true,
		},
		cod_boveda_nicho: {
			type: Sequelize.STRING,
		},
		id_fall_nicho: {
			type: Sequelize.INTEGER.UNSIGNED,
		},
	},
	{
		timestamps: false,
	}
)

module.exports = Nichos
