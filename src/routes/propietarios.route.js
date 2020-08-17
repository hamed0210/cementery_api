const { Router } = require('express')

const {
	Propietarios,
	Propietario,
	PropietarioCreate,
	PropietarioUpdate,
	PropietarioDelete,
} = require('../controllers/propietarios.controller')

const router = Router()

router.get('/propietarios', Propietarios)
router.get('/propietarios/:id', Propietario)
router.post('/propietarios/create', PropietarioCreate)
router.put('/propietarios/:id', PropietarioUpdate)
router.delete('/propietarios/:id', PropietarioDelete)

module.exports = router
