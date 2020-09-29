const { Router } = require('express')
const passport = require('passport')

const { signIn, signUp } = require('../controllers/auth.controller')
const { isNotLogged } = require('../libs/auth.libs')

const router = Router()

router.post(
	'/signup',
	signUp,
	passport.authenticate('jwt', {
		session: false,
		// successRedirect: '/home',
		// failureRedirect: '/signin',
		// failureFlash: true,
	})
)
router.post(
	'/signin',
	isNotLogged,
	signIn,
	passport.authenticate('jwt', {
		session: false,
		// successRedirect: '/home',
		// failureRedirect: '/signin',
		// failureFlash: true,
	})
)

module.exports = router
