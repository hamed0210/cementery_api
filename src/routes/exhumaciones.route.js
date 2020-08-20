const { Router } = require('express')

const {
	Exhumaciones,
	Exhumacion,
	ExhumacionCreate,
	ExhumacionUpdate,
	ExhumacionDelete,
} = require('../controllers/exhumaciones.controller')

const router = Router()

router.get('/exhumaciones', Exhumaciones)
router.get('/exhumaciones/:id', Exhumacion)
router.post('/exhumaciones/create', ExhumacionCreate)
router.put('/exhumaciones/:id', ExhumacionUpdate)
router.delete('/exhumaciones/:id', ExhumacionDelete)

module.exports = router
