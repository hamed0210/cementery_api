const { request, response } = require('express')

const userModel = require('../models/user.model')

const signUp = async (req = request, res = response) => {
	const {
		email,
		password,
		id,
		role,
		name,
		lastName,
		dir,
		place,
		cel,
	} = req.body

	if (!email || !password) {
		return res
			.status(400)
			.json({ message: 'Por favor. Envia tu email y contraseña' })
	}

	try {
		const result = await userModel.findOne({
			where: {
				email_usu: email,
			},
		})

		if (result)
			return res.json({ message: 'El usuario ya se encuentra registrado' })

		const newUser = await userModel.create({
			id_usu: id,
			pass_usu: password,
			role: role,
			nombres_usu: name,
			apellidos_usu: lastName,
			dir_usu: dir,
			dir_lugar_usu: place,
			cel_usu: cel,
			email_usu: email,
		})

		return res.json({
			message: 'nuevo usuario creado correctamente',
			data: newUser,
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}

const signIn = async (req = request, res = response) => {
	const { email, password } = req.body

	if (!email || !password) {
		return res
			.status(400)
			.json({ message: 'Please. Send your email and password' })
	}

	// const result = await User.findOne({ email: req.body.email })

	// if (!result) {
	// 	return res.status(400).json({ message: 'The user does not exists' })
	// }

	// const isMatch = await User.comparePassword(req.body)

	// if (isMatch) {
	// 	return res.status(200).json({ token: createToken(result) })
	// }

	// return res.status(400).json({
	// 	message: 'The email or password are incorrect',
	// })
}

const Users = async (req = request, res = response) => {
	try {
		const users = await userModel.findAll()
		if (users == '') {
			return res.json({
				message: 'No se encuentra ningun usuario registrado',
			})
		}
		return res.json({
			data: users,
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}

const User = async (req = request, res = response) => {
	const { id } = req.params

	try {
		const user = await userModel.findOne({
			where: {
				id_usu: id,
			},
		})

		if (!user)
			return res.json({
				message: `No se encuentra ningun usuario registrado con el id ${id}`,
			})

		return res.json({
			data: user,
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}

const UserUpdate = async (req = request, res = response) => {
	const { id } = req.params
	const { password, role, name, lastName, dir, place, cel, email } = req.body

	try {
		const result = await userModel.findOne({
			where: {
				id_usu: id,
			},
		})

		if (result) {
			await result.update({
				pass_usu: password,
				role: role,
				nombres_usu: name,
				apellidos_usu: lastName,
				dir_usu: dir,
				dir_lugar_usu: place,
				cel_usu: cel,
				email_usu: email,
			})
		} else {
			return res.json({
				message: `El usuario con id ${id} no se encuentra registrado`,
			})
		}
		return res.json({
			message: 'usuario actualizado correctamente',
			data: result,
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}

const UserDelete = async (req = request, res = response) => {
	const { id } = req.params

	try {
		const result = await userModel.destroy({
			where: {
				id_usu: id,
			},
		})

		if (result == 0)
			return res.json({
				message: `Error al intentar eliminar usuario con id ${id}`,
			})
		return res.json({
			message: 'usuario eliminado correctamente',
			data: result,
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}

module.exports = { signUp, signIn, UserDelete, UserUpdate, Users, User }
