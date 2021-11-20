const Post = require('../database/models/post')

module.exports = async (req, res) => {
    const post = await Post.findById(req.params.id);
 return   res.render("pages/post", {
        post
    });
}