const { Router } = require('express')

const {
	Solicitantes,
	Solicitante,
	SolicitanteCreate,
	SolicitanteUpdate,
	SolicitanteDelete,
} = require('../controllers/solicitantes.controller')

const router = Router()

router.get('/solicitantes', Solicitantes)
router.get('/solicitantes/:id', Solicitante)
router.post('/solicitantes/create', SolicitanteCreate)
router.put('/solicitantes/:id', SolicitanteUpdate)
router.delete('/solicitantes/:id', SolicitanteDelete)

module.exports = router
