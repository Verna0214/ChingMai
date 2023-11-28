if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const path = require('path')
const flash = require('connect-flash')
const methodOverride = require('method-override')

const hbsHelpers = require('./helpers/hbs-helpers')
const { getUser } = require('./helpers/auth-helpers')
const passport = require('./config/passport')
const routes = require('./routes')

const app = express()
const port = process.env.PORT

app.engine('hbs', exphbs({ extname: '.hbs', helpers: hbsHelpers }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use('/upload', express.static(path.join(__dirname, 'upload')))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.user = getUser(req)
  next()
})

app.use(routes)

app.listen(port, () => {
  console.info(`App is running on http://localhost:${port}.`)
})
