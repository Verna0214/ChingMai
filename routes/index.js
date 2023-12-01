const express = require('express')
const router = express.Router()

const passport = require('../config/passport')
const { authenticated } = require('../middleware/auth')
const { generalErrorHandler } = require('../middleware/error-handler')
const admin = require('./modules/admin')
const adminController = require('../controllers/admin-controller')
const spotController = require('../controllers/spot-controller')
const commentController = require('../controllers/comment-controller')

router.use('/admin', authenticated, admin)
router.get('/index/topSpots/:id', spotController.getTopSpot)
router.get('/index/categories/:id', spotController.getSpotsPage)
router.delete('/comments/:id', commentController.deleteComment)
router.get('/index/topSpots', spotController.getTopSpots)
router.post('/comments', commentController.postComment)
router.get('/login', adminController.getLoginPage)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), adminController.login)
router.get('/logout', adminController.logout)
router.get('/index', spotController.getHomePage)
router.get('/', spotController.getEntry)

// fallback router
router.use('/', (req, res) => res.redirect('/'))
router.use('/', generalErrorHandler)

module.exports = router
