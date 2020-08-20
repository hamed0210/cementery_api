const { Router } = require('express')

const {
	Inhumaciones,
	Inhumacion,
	InhumacionCreate,
	InhumacionUpdate,
	InhumacionDelete,
} = require('../controllers/inhumaciones.controller')

const router = Router()

router.get('/inhumaciones', Inhumaciones)
router.get('/inhumaciones/:cod', Inhumacion)
router.post('/inhumaciones/create', InhumacionCreate)
router.put('/inhumaciones/:cod', InhumacionUpdate)
router.delete('/inhumaciones/:cod', InhumacionDelete)

module.exports = router
