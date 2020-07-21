const Sequelize = require('sequelize')

const sequelize = require('../database/database')
const { INTEGER } = require('sequelize')

const User = sequelize.define(
	'usuario',
	{
		id_usu: {
			type: Sequelize.INTEGER.UNSIGNED,
			primaryKey: true,
		},
		pass_usu: {
			type: Sequelize.CHAR(32),
		},
		role: {
			type: Sequelize.ENUM('User', 'Admin'),
		},
		nombres_usu: {
			type: Sequelize.STRING,
		},
		apellidos_usu: {
			type: Sequelize.STRING,
		},
		dir_usu: {
			type: Sequelize.STRING,
		},
		dir_lugar_usu: {
			type: Sequelize.STRING,
		},
		cel_usu: {
			type: Sequelize.BIGINT,
		},
		email_usu: {
			type: Sequelize.STRING,
		},
	},
	{
		timestamps: false,
	}
)

module.exports = User
