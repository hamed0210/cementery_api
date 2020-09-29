const isLogged = (req, res, next) => {
	if (req.isAuthenticated()) return next()

	return res.redirect('/signin')
}

const isNotLogged = (req, res, next) => {
	if (!req.isAuthenticated()) return next()

	return res.redirect('/home')
}

const isAdmin = async (req, res, next) => {
	if (req.user.role === 'Admin') {
		next()
		return
	}

	return res.status(403).json({ message: 'Requiere Admin role' })
}

module.exports = { isLogged, isNotLogged, isAdmin }
