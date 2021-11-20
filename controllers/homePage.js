const Post = require('../database/models/Post')

module.exports = async (req, res) => {
    const posts = await Post.find({});

  return  res.render("pages/index", {
        posts
    });
}
const Post = require('../database/models/Post')

module.exports = async (req, res) => {
    const posts = await Post.find({});

   return res.render("pages/index", {
        posts
    });
}