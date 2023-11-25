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
    const user = await Admin.findOne({ where: { email } })
    if (!user) {
      return done(null, false, req.flash('error_msg', 'Email is not correct！'))
    }

    const passwordCheck = bcrypt.compareSync(password, user.password)
    if (!passwordCheck) {
      return done(null, false, req.flash('error_msg', 'Password is not correct！'))
    }
    return done(null, user)
  }
))

// serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await Admin.findByPk(id)
  done(null, user.toJSON())
})

module.exports = passport
