const { Router } = require('express')

const {
	Users,
	User,
	UserCreate,
	UserUpdate,
	UserDelete,
} = require('../controllers/user.controller')

const router = Router()

router.get('/users', Users)
router.get('/users/:id', User)
router.post('/users/create', UserCreate)
router.put('/users/:id', UserUpdate)
router.delete('/users/:id', UserDelete)

module.exports = router
