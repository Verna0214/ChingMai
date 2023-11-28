const fs = require('fs')

module.exports = {
  localFileHandler: async file => {
    if (!file) return null
    const fileName = `upload/${file.originalname}`

    try {
      const data = fs.readFileSync(file.path)
      fs.writeFileSync(fileName, data)
      console.log(fileName)
      return `/${fileName}`
    } catch (err) {
      return err
    }
  }
}
