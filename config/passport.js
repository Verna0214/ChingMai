const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const db = require('../models')
const { User } = db

// local strategy
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  // authenticate user
  async (req, email, password, done) => {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      return done(null, false)
    }

    const passwordCheck = bcrypt.compareSync(password, user.password)
    if (!passwordCheck) {
      return done(null, false)
    }

    return done(null, user)
  }
))

// serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user.toJSON())
})

module.exports = passport
