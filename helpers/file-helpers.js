const fs = require('fs')
const imgur = require('imgur')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
imgur.setClientId(IMGUR_CLIENT_ID)

module.exports = {
  localFileHandler: async file => {
    if (!file) return null
    const fileName = `upload/${file.originalname}`

    try {
      const data = fs.readFileSync(file.path)
      fs.writeFileSync(fileName, data)
      return `/${fileName}`
    } catch (err) {
      return err
    }
  },
  imgurFileHandler: async file => {
    if (!file) return null

    try {
      const img = await imgur.uploadFile(file.path)
      return img?.link || null
    } catch (err) {
      return err
    }
  }
}
