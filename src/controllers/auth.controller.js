const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/config')

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

	if (
		!email ||
		!password ||
		!id ||
		!role ||
		!name ||
		!lastName ||
		!dir ||
		!place ||
		!cel
	) {
		return res
			.status(400)
			.json({ message: 'Por favor. Ingresar todos los datos' })
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
			message: 'Nuevo usuario creado correctamente',
			data: newUser,
			token: createToken(newUser),
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}

const signIn = async (req = request, res = response) => {
	console.log('signin')
	const { email, password } = req.body

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

		if (!result) {
			return res.status(400).json({ message: 'El usuario no existe' })
		}

		const isMatch = await userModel.comparePassword(req.body)

		if (isMatch) {
			return res.status(200).json({ token: createToken(result) })
		}

		return res.status(400).json({
			message: 'El email o contraseña son incorrectos',
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}

const createToken = (user) => {
	// generar un token
	return jwt.sign({ id: user.id_usu, email: user.email_usu }, jwtSecret, {
		expiresIn: 86400, //un dia
	})
}

module.exports = { signUp, signIn }
