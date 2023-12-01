const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/admin-controller')
const upload = require('../../middleware/multer')

router.get('/spots/:id/edit', adminController.editSpotPage)
router.get('/spots/create', adminController.createSpotPage)
router.get('/spots/:id', adminController.getSpot)
router.put('/spots/:id', upload.single('image'), adminController.putSpot)
router.delete('/spots/:id', adminController.deleteSpot)
router.get('/categories/:id', adminController.getCategoriesPage)
router.put('/categories/:id', upload.single('image'), adminController.putCategory)
router.delete('/categories/:id', adminController.deleteCategory)
router.get('/spots', adminController.getSpotsPage)
router.get('/categories', adminController.getCategoriesPage)
router.post('/spots', upload.single('image'), adminController.postSpot)
router.post('/categories', upload.single('image'), adminController.postCategory)

// fallback router
router.use('/', (req, res) => res.redirect('/admin/spots'))

module.exports = router
