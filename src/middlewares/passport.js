const { Strategy, ExtractJwt } = require('passport-jwt')

const { jwtSecret } = require('../config/config')
const User = require('../models/user.model')

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: jwtSecret,
}

module.exports = new Strategy(opts, async (payload, done) => {
	try {
		const user = await User.findByPk(payload.id)

		if (user) return done(null, user)

		return done(null, false)
	} catch (error) {
		console.log(error)
	}
})
