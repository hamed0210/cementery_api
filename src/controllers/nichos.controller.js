const { request, response } = require('express')

const nichosModel = require('../models/nichos.model')

const Nichos = async (req = request, res = response) => {
	try {
		const result = await nichosModel.findAll()

		if (result == '')
			return res.status(400).json({
				message: 'No se encuentra ningun nicho registrado',
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
const Nicho = async (req = request, res = response) => {
	const { cod } = req.params

	try {
		const resultByPk = await nichosModel.findByPk(cod)
		let resultByCodBoveda = null

		if (resultByPk) {
			return res.json({
				data: resultByPk,
			})
		} else {
			resultByCodBoveda = await nichosModel.findAll({
				where: { cod_boveda_nicho: cod },
			})
		}
		if (resultByCodBoveda == '')
			return res.status(400).json({
				message: `No se encuentra ningun nicho registrado con el cod o el cod de boveda ${cod}`,
			})

		return res.json({
			data: resultByCodBoveda,
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}
/* los nichos son creados al momento de crearce una boveda, esta funcion es llamada desde bodedaController, en la funcion BovedaCreate */
const NichoCreate = async (req = request, res = response) => {
	const cod_boveda = req.cod,
		cant_nicho = req.cant_nicho,
		nichosData = []

	for (let i = 0; i < cant_nicho; i++) {
		nichosData.push({
			cod_nicho: `${cod_boveda}_N${i + 1}`,
			cod_boveda_nicho: cod_boveda,
			id_fall_nicho: null,
		})
	}

	try {
		const newNicho = await nichosModel.bulkCreate(nichosData, {
			individualHooks: true,
		})
		return res.json({
			message: 'Nuevos nichos creados correctamente',
			data: newNicho,
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}
const NichoUpdate = async (req = request, res = response) => {
	const { cod } = req.params
	const { cod_boveda, fall } = req.body

	try {
		const result = await nichosModel.findByPk(cod)

		if (result) {
			await result.update({
				cod_nicho: cod,
				cod_boveda_nicho: cod_boveda,
				id_fall_nicho: fall,
			})
		} else {
			return res.status(400).json({
				message: `El nicho con cod ${cod} no se encuentra registrado`,
			})
		}

		return res.json({
			message: 'Nicho actualizado correctamente',
			data: result,
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}
const NichoDelete = async (req = request, res = response) => {
	const { cod } = req.params

	try {
		const result = nichosModel.destroy({
			where: {
				cod_nicho: cod,
			},
		})

		if (result == 0)
			return res.status(400).json({
				message: `Error al intentar eliminar nicho con cod ${cod}`,
			})

		return res.json({
			message: 'Nicho eliminado correctamente',
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}

module.exports = {
	Nichos,
	Nicho,
	NichoUpdate,
	NichoDelete,
}
