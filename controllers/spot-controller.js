const spotController = {
  getEntry: (req, res) => {
    return res.render('entry')
  },
  getIndex: (req, res) => {
    return res.render('index')
  }
}

module.exports = spotController
