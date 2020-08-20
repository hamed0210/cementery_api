const { Router } = require('express')

const {
	Bovedas,
	Boveda,
	BovedaCreate,
	BovedaUpdate,
	BovedaDelete,
} = require('../controllers/bovedas.controller')

const router = Router()

router.get('/bovedas', Bovedas)
router.get('/bovedas/:cod', Boveda)
router.post('/bovedas/create', BovedaCreate)
router.put('/bovedas/:cod', BovedaUpdate)
router.delete('/bovedas/:cod', BovedaDelete)

module.exports = router
