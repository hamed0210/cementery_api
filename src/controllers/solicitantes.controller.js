const { request, response } = require('express')

const solicitantesModel = require('../models/solicitantes.model')

const Solicitantes = async (req = request, res = response) => {
	try {
		const result = await solicitantesModel.findAll()

		if (result == '')
			return res.status(400).json({
				message: 'No se encuentra ningun solicitante registrado',
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
const Solicitante = async (req = request, res = response) => {
	const { id } = req.params

	try {
		const result = await solicitantesModel.findByPk(id)

		if (!result)
			return res.status(400).json({
				message: `No se encuentra ningun solicitante registrado con el id ${id}`,
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
const SolicitanteCreate = async (req = request, res = response) => {
	const { id, name, lastname, dir, place, cel } = req.body

	if ((!id, !name, !lastname, !dir, !place, !cel))
		return res.status(400).json({
			message: 'Por favor ingresar datos requeridos',
		})

	try {
		const result = await solicitantesModel.findByPk(id)

		if (result)
			return res.status(400).json({
				message: 'El solicitante ya se encuentra registrado',
			})

		const newSolicitante = await solicitantesModel.create({
			id_so: id,
			nombres_so: name,
			apellidos_so: lastname,
			dir_so: dir,
			dir_lugar_so: place,
			cel_so: cel,
		})

		return res.json({
			message: 'Nuevo solicitante creado correctamente',
			data: newSolicitante,
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}
const SolicitanteUpdate = async (req = request, res = response) => {
	const { id } = req.params
	const { name, lastname, dir, place, cel } = req.body

	try {
		const result = await solicitantesModel.findByPk(id)

		if (result) {
			await result.update({
				nombres_so: name,
				apellidos_so: lastname,
				dir_so: dir,
				dir_lugar_so: place,
				cel_so: cel,
			})
		} else {
			return res.status(400).json({
				message: `El solicitante con id ${id} no se encuentra registrado`,
			})
		}

		return res.json({
			message: 'Solicitante actualizado correctamente',
			data: result,
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}
const SolicitanteDelete = async (req = request, res = response) => {
	const { id } = req.params

	try {
		const result = solicitantesModel.destroy({
			where: {
				id_so: id,
			},
		})

		if (result == 0)
			return res.status(400).json({
				message: `Error al intentar eliminar solicitante con id ${id}`,
			})

		return res.json({
			message: 'Solicitante eliminado correctamente',
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}

module.exports = {
	Solicitantes,
	Solicitante,
	SolicitanteCreate,
	SolicitanteUpdate,
	SolicitanteDelete,
}
