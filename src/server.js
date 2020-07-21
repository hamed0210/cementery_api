const express = require('express')
const morgan = require('morgan')

const authRoutes = require('./routes/auth.route')

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

/*
	Rutas
*/
app.use(authRoutes)

module.exports = app
