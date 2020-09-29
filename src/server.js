const express = require('express')
const morgan = require('morgan')
const passport = require('passport')

const authRoutes = require('./routes/auth.route')
const homeRoutes = require('./routes/home.route')
const userRoutes = require('./routes/user.route')
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
app.use('/api', authRoutes)
app.use('/api', homeRoutes)
app.use('/api', userRoutes)
app.use('/api', propietariosRouters)
app.use('/api', solicitantesRouters)
app.use('/api', fallecidosRouters)
app.use('/api', inhumacionesRouters)
app.use('/api', exhumacionesRouters)
app.use('/api', bovedasRouters)
app.use('/api', cilindrosRouters)
app.use('/api', nichosRouters)

module.exports = app
