const express = require('express')
const router = express.Router()

const admin = require('./modules/admin')
const spotController = require('../controllers/spot-controller')

router.use('/admin', admin)
router.get('/', spotController.getEntry)

// fallback router
router.use('/', (req, res) => res.redirect('/'))

module.exports = router
