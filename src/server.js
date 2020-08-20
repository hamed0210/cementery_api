const express = require('express')
const morgan = require('morgan')
const passport = require('passport')

const authRoutes = require('./routes/auth.route')
const propietariosRouters = require('./routes/propietarios.route')
const solicitantesRouters = require('./routes/solicitantes.route')
const fallecidosRouters = require('./routes/fallecidos.route')
const inhumacionesRouters = require('./routes/inhumaciones.route')
const exhumacionesRouters = require('./routes/exhumaciones.route')
const bovedasRouters = require('./routes/bovedas.route')
const cilindrosRouters = require('./routes/cilindros.route')
const nichosRouters = require('./routes/nichos.route')

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
app.use(propietariosRouters)
app.use(solicitantesRouters)
app.use(fallecidosRouters)
app.use(inhumacionesRouters)
app.use(exhumacionesRouters)
app.use(bovedasRouters)
app.use(cilindrosRouters)
app.use(nichosRouters)

module.exports = app
