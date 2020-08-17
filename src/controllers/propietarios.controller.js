const { request, response } = require('express')

const PropietariosModel = require('../models/propietarios.model')

const Propietarios = async (req = request, res = response) => {
	try {
		const result = await PropietariosModel.findAll()

		if (result == '')
			return res.status(400).json({
				message: 'No se encuentra ningun propietario registrado',
			})

		return res.status(200).json({
			data: result,
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}

const Propietario = async (req = request, res = response) => {
	const { id } = req.params

	try {
		const result = await PropietariosModel.findOne({
			where: {
				id_pro: id,
			},
		})

		if (!result)
			return res.status(400).json({
				message: `No se encuentra ningun propietario registrado con el id ${id}`,
			})

		return res.status(200).json({
			data: result,
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}

const PropietarioCreate = async (req = request, res = response) => {
	const { id, name, lastname, dir, place, cel } = req.body

	if ((!id, !name, !lastname, !dir, !place, !cel))
		return res.status(400).json({
			message: 'Por favor ingresar datos requeridos',
		})

	try {
		const result = await PropietariosModel.findByPk(id)

		if (result)
			return res.status(400).json({
				message: 'El propietario ya se encuentra registrado',
			})

		const newPropietario = await PropietariosModel.create({
			id_pro: id,
			nombres_pro: name,
			apellidos_pro: lastname,
			dir_pro: dir,
			dir_lugar_pro: place,
			cel_pro: cel,
		})

		return res.status(200).json({
			message: 'Nuevo propietario creado correctamente',
			data: newPropietario,
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}

const PropietarioUpdate = async (req = request, res = response) => {
	const { id } = req.params
	const { name, lastname, dir, place, cel } = req.body

	try {
		const result = await PropietariosModel.findByPk(id)

		if (result) {
			await result.update({
				nombres_pro: name,
				apellidos_pro: lastname,
				dir_pro: dir,
				dir_lugar_pro: place,
				cel_pro: cel,
			})
		} else {
			return res.status(400).json({
				message: `El propietario con id ${id} no se encuentra registrado`,
			})
		}

		return res.json({
			message: 'Propietario actualizado correctamente',
			data: result,
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}

const PropietarioDelete = async (req = request, res = response) => {
	const { id } = req.params
	try {
		const result = await PropietariosModel.destroy({
			where: {
				id_pro: id,
			},
		})

		if (result == 0)
			return res.status(400).json({
				message: `Error al intentar eliminar propietario con id ${id}`,
			})
		return res.json({
			message: 'Propietario eliminado correctamente',
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}

module.exports = {
	Propietarios,
	Propietario,
	PropietarioCreate,
	PropietarioUpdate,
	PropietarioDelete,
}
