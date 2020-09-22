const { Router } = require('express')

const {
	Nichos,
	Nicho,
	NichoUpdate,
	NichoDelete,
} = require('../controllers/nichos.controller')

const router = Router()

router.get('/nichos', Nichos)
router.get('/nichos/:cod', Nicho)
router.put('/nichos/:cod', NichoUpdate)
router.delete('/nichos/:cod', NichoDelete)

module.exports = router
