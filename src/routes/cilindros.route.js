const { Router } = require('express')

const {
	Cilindros,
	Cilindro,
	CilindroCreate,
	CilindroUpdate,
	CilindroDelete,
} = require('../controllers/cilindros.controller')

const router = Router()

router.get('/cilindros', Cilindros)
router.get('/cilindros/:id', Cilindro)
router.post('/cilindros/create', CilindroCreate)
router.put('/cilindros/:id', CilindroUpdate)
router.delete('/cilindros/:id', CilindroDelete)

module.exports = router
