if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')

const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('This is Ching Mai web.')
})

app.listen(port, () => {
  console.info(`App is running on http://localhost:${port}.`)
})
