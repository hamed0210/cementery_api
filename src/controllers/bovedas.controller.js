const { request, response } = require('express')

const bovedasModel = require('../models/bovedas.model')
const cilindrosCreate = require('../controllers/cilindros.controller')
	.CilindroCreate
const cilindrosDelete = require('../controllers/cilindros.controller')
	.CilindroDelete
const nichosCreate = require('../controllers/nichos.controller').NichoCreate
const nichosDelete = require('../controllers/nichos.controller').NichoDelete

const Bovedas = async (req = request, res = response) => {
	try {
		const result = await bovedasModel.findAll()

		if (result == '')
			return res.status(400).json({
				message: 'No se encuentra ninguna boveda registrada',
			})

		return res.json({
			data: result,
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}
const Boveda = async (req = request, res = response) => {
	const { cod } = req.params

	try {
		const result = await bovedasModel.findByPk(cod)

		if (!result)
			return res.status(400).json({
				message: `No se encuentra ninguna boveda registrada con el codigo ${cod}`,
			})

		return res.json({
			data: result,
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}
const BovedaCreate = async (req = request, res = response) => {
	const { cod, cant_cylinder, type, cant_nichos, id_pro, id_usu } = req.body
	const cylinderParams = { cod, cant_cylinder }
	const nichoParams = { cod, cant_nichos }

	if ((!cod, !cant_cylinder, !type, !cant_nichos, !id_pro, !id_usu))
		return res.status(400).json({
			message: 'Por favor ingresar datos requeridos',
		})

	try {
		const result = await bovedasModel.findByPk(cod)

		if (result)
			return res.status(400).json({
				message: 'La boveda ya se encuentra registrada',
			})

		const newBoveda = await bovedasModel.create({
			cod_boveda: cod,
			cant_cilindros_boveda: cant_cylinder,
			tipo_boveda: type,
			cant_nichos_boveda: cant_nichos,
			id_pro_boveda: id_pro,
			id_usu_boveda: id_usu,
		})

		const newCilindro = await cilindrosCreate(cylinderParams)
		const newNicho = await nichosCreate(nichoParams)

		return res.json({
			message: 'Nueva boveda creada correctamente',
			data: [newBoveda, [newCilindro, newNicho]],
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}
const BovedaUpdate = async (req = request, res = response) => {
	const { cod } = req.params
	const {
		cod_boveda,
		cant_cylinder,
		type,
		cant_nichos,
		id_pro,
		id_usu,
	} = req.body
	const cylinderParams = { cod, cant_cylinder }
	const nichoParams = { cod, cant_nichos }
	let cantCilindrosPre = 0,
		cantCilindrosNow = 0,
		cantNichosPre = 0,
		cantNichosNow = 0,
		newNicho = ''

	try {
		const result = await bovedasModel.findByPk(cod)

		cantCilindrosPre = result.cant_cilindros_boveda
		cantNichosPre = result.cant_nichos_boveda

		if (result) {
			await result.update({
				cod_boveda: cod || cod_boveda,
				cant_cilindros_boveda: cant_cylinder,
				tipo_boveda: type,
				cant_nichos_boveda: cant_nichos,
				id_pro_boveda: id_pro,
				id_usu_boveda: id_usu,
			})
			cantCilindrosNow = result.cant_cilindros_boveda
			cantNichosNow = result.cant_nichos_boveda
		} else {
			return res.status(400).json({
				message: `La boveda con codigo ${cod} no se encuentra registrada`,
			})
		}

		if (cantCilindrosPre < cantCilindrosNow)
			newCilindro = await cilindrosCreate(cylinderParams)
		else if (cantCilindrosPre > cantCilindrosNow)
			newCilindro = await cilindrosDelete(cylinderParams)

		if (cantNichosPre < cantNichosNow)
			newNicho = await nichosCreate(nichoParams)
		else if (cantNichosPre > cantNichosNow)
			newCilindro = await nichosDelete(nichoParams)

		return res.json({
			message: 'Boveda actualizada correctamente',
			data: [result, [newCilindro, newNicho]],
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}
const BovedaDelete = async (req = request, res = response) => {
	const { cod } = req.params

	try {
		const result = bovedasModel.destroy({
			where: {
				cod_boveda: cod,
			},
		})

		if (result == 0)
			return res.status(400).json({
				message: `Error al intentar eliminar boveda con codigo ${cod}`,
			})

		return res.json({
			message: 'Boveda eliminada correctamente',
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}

module.exports = {
	Bovedas,
	Boveda,
	BovedaCreate,
	BovedaUpdate,
	BovedaDelete,
}
