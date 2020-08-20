const { Router } = require('express')

const {
	Fallecidos,
	Fallecido,
	FallecidoCreate,
	FallecidoUpdate,
	FallecidoDelete,
} = require('../controllers/fallecidos.controller')

const router = Router()

router.get('/fallecidos', Fallecidos)
router.get('/fallecidos/:id', Fallecido)
router.post('/fallecidos/create', FallecidoCreate)
router.put('/fallecidos/:id', FallecidoUpdate)
router.delete('/fallecidos/:id', FallecidoDelete)

module.exports = router
