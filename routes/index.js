const express = require('express')
const router = express.Router()

const passport = require('../config/passport')
const { authenticated } = require('../middleware/auth')
const { generalErrorHandler } = require('../middleware/error-handler')
const admin = require('./modules/admin')
const adminController = require('../controllers/admin-controller')
const spotController = require('../controllers/spot-controller')

router.use('/admin', authenticated, admin)
router.get('/login', adminController.getLoginPage)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), adminController.login)
router.get('/logout', adminController.logout)
router.get('/index', spotController.getHomePage)
router.get('/', spotController.getEntry)

// fallback router
router.use('/', (req, res) => res.redirect('/'))
router.use('/', generalErrorHandler)

module.exports = router
