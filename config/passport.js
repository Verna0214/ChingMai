const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const db = require('../models')
const { Admin } = db

// local strategy
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  // authenticate user
  async (req, email, password, done) => {
    const admin = await Admin.findOne({ where: { email } })
    if (!admin) {
      return done(null, false)
    }

    const passwordCheck = bcrypt.compareSync(password, admin.password)
    if (!passwordCheck) {
      return done(null, false)
    }
    return done(null, admin)
  }
))

// serialize and deserialize user
passport.serializeUser((admin, done) => {
  done(null, admin.id)
})

passport.deserializeUser(async (id, done) => {
  const admin = await Admin.findByPk(id)
  done(null, admin.toJSON())
})

module.exports = passport
