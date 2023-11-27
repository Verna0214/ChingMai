const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/admin-controller')

router.get('/spots/:id/edit', adminController.editSpotPage)
router.get('/spots/:id', adminController.getSpot)
router.put('/spots/:id', adminController.putSpot)
router.delete('/spots/:id', adminController.deleteSpot)
router.get('/spots/create', adminController.createSpotPage)
router.get('/spots', adminController.getSpotsPage)
router.post('/spots', adminController.postSpot)

// fallback router
router.use('/', (req, res) => res.redirect('/admin/spots'))

module.exports = router
