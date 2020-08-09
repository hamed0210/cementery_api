const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')

const sequelize = require('../database/database')

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

User.addHook('beforeValidate', async (user, next) => {
	if (!user.changed('pass_usu')) return next()

	const hash = await bcrypt.hash(user.pass_usu, 10)

	user.pass_usu = hash
})

User.comparePassword = async ({ email, password }) => {
	const user = await User.findOne({
		where: {
			email_usu: email,
		},
	})

	return await bcrypt.compare(password, user.pass_usu)
}

module.exports = User
