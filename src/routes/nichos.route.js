const { Router } = require('express')

const {
	Nichos,
	Nicho,
	NichoCreate,
	NichoUpdate,
	NichoDelete,
} = require('../controllers/nichos.controller')

const router = Router()

router.get('/nichos', Nichos)
router.get('/nichos/:id', Nicho)
router.post('/nichos/create', NichoCreate)
router.put('/nichos/:id', NichoUpdate)
router.delete('/nichos/:id', NichoDelete)

module.exports = router
