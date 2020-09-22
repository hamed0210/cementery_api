const { Router } = require('express')

const {
	Cilindros,
	Cilindro,
	CilindroUpdate,
	CilindroDelete,
} = require('../controllers/cilindros.controller')

const router = Router()

router.get('/cilindros', Cilindros)
router.get('/cilindros/:cod', Cilindro)
router.put('/cilindros/:cod', CilindroUpdate)
router.delete('/cilindros/:cod', CilindroDelete)

module.exports = router
