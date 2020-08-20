const { request, response } = require('express')

const exhumacionesModel = require('../models/exhumaciones.model')

const Exhumaciones = async (req = request, res = response) => {
	try {
		const result = await exhumacionesModel.findAll()

		if (result == '')
			return res.status(400).json({
				message: 'No se encuentra ninguna exhumacion registrada',
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
const Exhumacion = async (req = request, res = response) => {
	const cod = req.params

	try {
		const result = await exhumacionesModel.findByPk(cod)

		if (!result)
			return res.status(400).json({
				message: `No se encuentra ninguna exhumacion registrada con el codigo ${cod}`,
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
const ExhumacionCreate = async (req = request, res = response) => {
	const {
		cod,
		id_so,
		parent,
		id_fall,
		id_usu,
		cod_boveda_de,
		cod_boveda_hacia,
		cod_cilindro_de,
		cod_cilindro_hacia,
		cod_nicho_hacia,
		date_ex,
	} = req.body

	if (
		(!cod,
		!id_so,
		!parent,
		!id_fall,
		!id_usu,
		!cod_boveda_de,
		!cod_boveda_hacia,
		!cod_cilindro_de,
		!cod_cilindro_hacia,
		!cod_nicho_hacia,
		!date_ex)
	)
		return res.status(400).json({
			message: 'Por favor ingresar datos requeridos',
		})

	try {
		const result = await exhumacionesModel.findByPk(cod)

		if (result)
			return res.status(400).json({
				message: 'La exhumacion ya se encuentra registrada',
			})

		const newExhumacion = await exhumacionesModel.create({
			cod_ex: cod,
			id_so_ex: id_so,
			parent_so_ex: parent,
			id_fall_ex: id_fall,
			id_usu_ex: id_usu,
			cod_boveda_de_ex: cod_boveda_de,
			cod_boveda_hacia_ex: cod_boveda_hacia,
			cod_cilindro_de_ex: cod_cilindro_de,
			cod_cilindro_hacia_ex: cod_cilindro_hacia,
			cod_nicho_hacia_ex: cod_nicho_hacia,
			fecha_ex: date_ex,
		})

		return res.json({
			message: 'Nueva exhumacion creada correctamente',
			data: newExhumacion,
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}
const ExhumacionUpdate = async (req = request, res = response) => {
	const cod = req.params
	const {
		id_so,
		parent,
		id_fall,
		id_usu,
		cod_boveda_de,
		cod_boveda_hacia,
		cod_cilindro_de,
		cod_cilindro_hacia,
		cod_nicho_hacia,
		date_ex,
	} = req.body

	try {
		const result = await exhumacionesModel.findByPk(cod)

		if (result) {
			await result.update({
				id_so_ex: id_so,
				parent_so_ex: parent,
				id_fall_ex: id_fall,
				id_usu_ex: id_usu,
				cod_boveda_de_ex: cod_boveda_de,
				cod_boveda_hacia_ex: cod_boveda_hacia,
				cod_cilindro_de_ex: cod_cilindro_de,
				cod_cilindro_hacia_ex: cod_cilindro_hacia,
				cod_nicho_hacia_ex: cod_nicho_hacia,
				fecha_ex: date_ex,
			})
		} else {
			return res.status(400).json({
				message: `La exhumacion con codigo ${cod} no se encuentra registrada`,
			})
		}

		return res.json({
			message: 'Exhumacion actualizada correctamente',
			data: result,
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}
const ExhumacionDelete = async (req = request, res = response) => {
	const cod = req.params

	try {
		const result = exhumacionesModel.destroy({
			where: {
				cod_ex: cod,
			},
		})

		if (result == 0)
			return res.status(400).json({
				message: `Error al intentar eliminar exhumacion con codigo ${cod}`,
			})

		return res.json({
			message: 'Exhumacion eliminada correctamente',
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}

module.exports = {
	Exhumaciones,
	Exhumacion,
	ExhumacionCreate,
	ExhumacionUpdate,
	ExhumacionDelete,
}
