const { Router } = require('express')

const {
	Users,
	User,
	signIn,
	signUp,
	UserUpdate,
	UserDelete,
} = require('../controllers/user.controller')

const router = Router()

router.get('/users', Users)
router.get('/users/:id', User)
router.put('/users/:id', UserUpdate)
router.delete('/users/:id', UserDelete)
router.post('/signup', signUp)
router.post('/signin', signIn)

module.exports = router
