const { Comment, Spot } = require('../models')

const commentController = {
  postComment: async (req, res, next) => {
    try {
      const { name, text, spotId } = req.body
      if (!name || !text) throw new Error('欄位請填寫完成！')
      const spot = await Spot.findByPk(spotId)
      if (!spot) throw new Error('景點資料不存在！')
      await Spot.increment('commentCounts', {
        where: {
          id: spotId
        }
      })
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
  },
  deleteComment: async (req, res, next) => {
    try {
      const comment = await Comment.findByPk(req.params.id, {
        include: [Spot]
      })
      if (!comment) throw new Error('評論不存在！')
      await comment.destroy()
      await Spot.decrement('commentCounts', {
        where: {
          id: comment.Spot.id
        }
      })
      req.flash('success_msg', '評論已刪除！')
      res.redirect('back')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = commentController
