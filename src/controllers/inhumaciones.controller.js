const { request, response } = require('express')
const uuid = require('uuid')

const inhumacionesModel = require('../models/inhumaciones.model')

const Inhumaciones = async (req = request, res = response) => {
	try {
		const result = await inhumacionesModel.findAll()
		if (result == '')
			return res.status(400).json({
				message: 'No se encuentra ninguna inhumacion registrada',
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
const Inhumacion = async (req = request, res = response) => {
	const { cod } = req.params

	try {
		const result = await inhumacionesModel.findByPk(cod)

		if (!result)
			return res.status(400).json({
				message: `No se encuentra ninguna inhumacion registrada con el codigo ${cod}`,
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
const InhumacionCreate = async (req = request, res = response) => {
	const {
		id_so,
		parent,
		id_fall,
		id_pro,
		id_usu,
		cod_boveda,
		cod_cilindro,
		date_in,
		permit_file,
		date_permit,
	} = req.body

	if (
		(!id_so,
		!parent,
		!id_fall,
		!id_pro,
		!id_usu,
		!cod_boveda,
		!cod_cilindro,
		!date_in,
		!permit_file,
		!date_permit)
	)
		return res.status(400).json({
			message: 'Por favor ingresar datos requeridos',
		})

	try {
		const result = await inhumacionesModel.findOne({
			where: {
				id_fall_in: id_fall,
			},
		})

		if (result)
			return res.status(400).json({
				message: 'La inhumacion ya se encuentra registrada',
			})

		const newInhumacion = await inhumacionesModel.create({
			cod_in: uuid.v4(),
			id_so_in: id_so,
			parent_so_in: parent,
			id_fall_in: id_fall,
			id_pro_in: id_pro,
			id_usu_in: id_usu,
			cod_boveda_in: cod_boveda,
			cod_cilindro_in: cod_cilindro,
			fecha_in: date_in,
			permiso_file_pro_in: permit_file,
			fecha_permiso_in: date_permit,
		})

		return res.json({
			message: 'Nueva inhumacion creada correctamente',
			data: newInhumacion,
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}
const InhumacionUpdate = async (req = request, res = response) => {
	const { cod } = req.params
	const {
		id_so,
		parent,
		id_fall,
		id_pro,
		id_usu,
		cod_boveda,
		cod_cilindro,
		date_in,
		permit_file,
		date_permit,
	} = req.body

	try {
		const result = await inhumacionesModel.findByPk(cod)

		if (result) {
			await result.update({
				id_so_in: id_so,
				parent_so_in: parent,
				id_fall_in: id_fall,
				id_pro_in: id_pro,
				id_usu_in: id_usu,
				cod_boveda_in: cod_boveda,
				cod_cilindro_in: cod_cilindro,
				fecha_in: date_in,
				permiso_file_pro_in: permit_file,
				fecha_permiso_in: date_permit,
			})
		} else {
			return res.status(400).json({
				message: `La inhumacion con codigo ${cod} no se encuentra registrada`,
			})
		}

		return res.json({
			message: 'Inhumacion actualizada correctamente',
			data: result,
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}
const InhumacionDelete = async (req = request, res = response) => {
	const { cod } = req.params

	try {
		const result = inhumacionesModel.destroy({
			where: {
				cod_in: cod,
			},
		})

		if (result == 0)
			return res.status(400).json({
				message: `Error al intentar eliminar inhumacion con codigo ${cod}`,
			})

		return res.json({
			message: 'Inhumacion eliminada correctamente',
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}

module.exports = {
	Inhumaciones,
	Inhumacion,
	InhumacionCreate,
	InhumacionUpdate,
	InhumacionDelete,
}
