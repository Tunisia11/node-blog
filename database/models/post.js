const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    text:String,
    content: String ,
    image: String,
    Aother: String,
    createdAt: {
        type: Date,
        default: new Date() 
    }
})

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;