const { request, response } = require('express')

const fallecidosModel = require('../models/fallecidos.model')

const Fallecidos = async (req = request, res = response) => {
	try {
		const result = await fallecidosModel.findAll()

		if (result == '')
			return res.status(400).json({
				message: 'No se encuentra ningun fallecido registrado',
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
const Fallecido = async (req = request, res = response) => {
	const { id } = req.params

	try {
		const result = await fallecidosModel.findByPk(id)

		if (!result)
			return res.status(400).json({
				message: `No se encuentra ningun fallecido registrado con el id ${id}`,
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
const FallecidoCreate = async (req = request, res = response) => {
	const {
		id,
		name,
		lastname,
		dir,
		place,
		date,
		cod_certi,
		certi,
		cause,
	} = req.body

	if ((!id, !name, !lastname, !dir, !place, !date, !cod_certi, !certi, !cause))
		return res.status(400).json({
			message: 'Por favor ingresar datos requeridos',
		})

	try {
		const result = await fallecidosModel.findByPk(id)

		if (result)
			return res.status(400).json({
				message: 'El fallecido ya se encuentra registrado',
			})

		const newFallecido = await fallecidosModel.create({
			id_fall: id,
			nombres_fall: name,
			apellidos_fall: lastname,
			dir_fall: dir,
			dir_lugar_fall: place,
			fecha_muerte_fall: date,
			cod_certi_muerte_fall: cod_certi,
			certi_muerte_fall: certi,
			causa_fall: cause,
		})

		return res.json({
			message: 'Nuevo fallecido creado correctamente',
			data: newFallecido,
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}
const FallecidoUpdate = async (req = request, res = response) => {
	const { id } = req.params
	const { name, lastname, dir, place, date, cod_certi, certi, cause } = req.body

	try {
		const result = await fallecidosModel.findByPk(id)

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
				message: `El fallecido con id ${id} no se encuentra registrado`,
			})
		}

		return res.json({
			message: 'Fallecido actualizado correctamente',
			data: result,
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}
const FallecidoDelete = async (req = request, res = response) => {
	const { id } = req.params

	try {
		const result = fallecidosModel.destroy({
			where: {
				id_fall: id,
			},
		})

		if (result == 0)
			return res.status(400).json({
				message: `Error al intentar eliminar fallecido con id ${id}`,
			})

		return res.json({
			message: 'fallecido eliminado correctamente',
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}

module.exports = {
	Fallecidos,
	Fallecido,
	FallecidoCreate,
	FallecidoUpdate,
	FallecidoDelete,
}
