const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/admin-controller')

router.get('/spots', adminController.getSpotsPage)
// fallback router
router.use('/', (req, res) => res.redirect('/admin/spots'))

module.exports = router
