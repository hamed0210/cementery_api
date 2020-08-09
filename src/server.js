const express = require('express')
const morgan = require('morgan')
const passport = require('passport')

const authRoutes = require('./routes/auth.route')
const passportMiddleware = require('./middlewares/passport')

const app = express()

/*
	Configuraciones 
*/
app.set('port', process.env.PORT || 4000)

/*
	Middlewares
*/
app.use(morgan('dev'))
// para que podamos entender el formato json
app.use(express.json())
// Trabajar con datos en json
app.use(express.urlencoded({ extended: false }))

app.use(passport.initialize())
passport.use(passportMiddleware)

/*
	Rutas
*/
app.use(authRoutes)

module.exports = app
