const { request, response } = require('express')

const bovedasModel = require('../models/bovedas.model')

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

		return res.json({
			message: 'Nueva boveda creada correctamente',
			data: newBoveda,
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}
const BovedaUpdate = async (req = request, res = response) => {
	const { cod } = req.params
	const { name, lastname, dir, place, date, cod_certi, certi, cause } = req.body

	try {
		const result = await bovedasModel.findByPk(cod)

		if (result) {
			await result.update({
				nombres_fall: name,
				apellidos_fall: lastname,
				dir_fall: dir,
				dir_lugar_fall: place,
				fecha_muerte_fall: date,
				cod_certi_muerte_fall: cod_certi,
				certi_muerte_fall: certi,
				causa_fall: cause,
			})
		} else {
			return res.status(400).json({
				message: `La boveda con codigo ${cod} no se encuentra registrada`,
			})
		}

		return res.json({
			message: 'Boveda actualizada correctamente',
			data: result,
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
				id_fall: cod,
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
