const { Comment, Spot } = require('../models')

const commentController = {
  postComment: async (req, res, next) => {
    try {
      const { name, text, spotId } = req.body
      if (!name || !text) throw new Error('欄位請填寫完成！')
      const spot = await Spot.findByPk(spotId)
      if (!spot) throw new Error('景點資料不存在！')
      await Comment.create({
        name,
        text,
        spotId
      })
      req.flash('success_msg', '成功新增一筆評論！')
      res.redirect('back')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = commentController
