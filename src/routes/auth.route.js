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
router.get('/user/:id', User)
router.put('/user/:id', UserUpdate)
router.delete('/user/:id', UserDelete)
router.post('/signup', signUp)
router.post('/signin', signIn)

module.exports = router
