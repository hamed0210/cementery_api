const { request, response } = require('express')

const cilindrosModel = require('../models/cilindros.model')

const Cilindros = async (req = request, res = response) => {
	try {
		const result = await cilindrosModel.findAll()

		if (result == '')
			return res.status(400).json({
				message: 'No se encuentra ningun cilindro registrado',
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
const Cilindro = async (req = request, res = response) => {
	const { cod } = req.params

	try {
		const resultByPk = await cilindrosModel.findByPk(cod)
		let resultByCodBoveda = null

		if (resultByPk) {
			return res.json({
				data: resultByPk,
			})
		} else {
			resultByCodBoveda = await cilindrosModel.findAll({
				where: { cod_boveda_cilindro: cod },
			})
		}
		if (resultByCodBoveda == '')
			return res.status(400).json({
				message: `No se encuentra ningun cilidro registrado con el cod o el cod de boveda ${cod}`,
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
/* los cilindros son creados al momento de crearce una boveda, esta funcion es llamada desde bodedaController, en la funcion BovedaCreate */
const CilindroCreate = async (req = request, res = response) => {
	const cod_boveda = req.cod,
		cant_cylinder = req.cant_cylinder,
		cylinderData = []

	for (let i = 0; i < cant_cylinder; i++) {
		cylinderData.push({
			cod_cilindro: `${cod_boveda}_C${i + 1}`,
			cod_boveda_cilindro: cod_boveda,
			id_fall_cilindro: null,
		})
	}

	try {
		const newCilindro = await cilindrosModel.bulkCreate(cylinderData, {
			individualHooks: true,
		})
		return res.json({
			message: 'Nuevos cilindros creados correctamente',
			data: newCilindro,
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}
const CilindroUpdate = async (req = request, res = response) => {
	const { cod } = req.params
	const { cod_boveda, fall } = req.body

	try {
		const result = await cilindrosModel.findByPk(id)

		if (result) {
			await result.update({
				cod_cilindro: cod,
				cod_boveda_cilindro: cod_boveda,
				id_fall_cilindro: fall,
			})
		} else {
			return res.status(400).json({
				message: `El cilindro con cod ${cod} no se encuentra registrado`,
			})
		}

		return res.json({
			message: 'Cilindro actualizado correctamente',
			data: result,
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}
const CilindroDelete = async (req = request, res = response) => {
	const { cod } = req.params

	try {
		const result = cilindrosModel.destroy({
			where: {
				cod_cilindro: cod,
			},
		})

		if (result == 0)
			return res.status(400).json({
				message: `Error al intentar eliminar cilindro con cod ${cod}`,
			})

		return res.json({
			message: 'Cilindro eliminado correctamente',
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrio un error al realizar la operacion',
		})
	}
}

module.exports = {
	Cilindros,
	Cilindro,
	CilindroCreate,
	CilindroUpdate,
	CilindroDelete,
}
