const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/admin-controller')

router.get('/spots/create', adminController.createSpotPage)
router.get('/spots', adminController.getSpotsPage)
router.post('/spots', adminController.postSpot)

// fallback router
router.use('/', (req, res) => res.redirect('/admin/spots'))

module.exports = router
