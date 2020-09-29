const { Router } = require('express')

const { isLogged } = require('../libs/auth.libs')

const router = Router()

router.get('/home', isLogged, (req, res) => {
	console.log('hola home')
})

module.exports = router
