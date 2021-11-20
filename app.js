const mongoose =require('mongoose');
const express = require('express')
const request = require('request');
const path = require('path');
const ejs = require('ejs');
const app = express()
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const post = require('./database/models/post');
const fileUpload = require("express-fileupload");
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const createUserController = require('./controllers/createUser');
const storeUserController =require('./controllers/storeUser');
const loginConttorller= require('./controllers/login');
const loginUserConttroller =require('./controllers/loginUser');
const auth = require("./middleware/auth");
const createPostController =require('./controllers/createPoste');
const connectFlash = require("connect-flash");
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated');
const logoutController = require("./controllers/logout");
// conect to db
  mongoose.connect('mongodb+srv://iyed:123456ok@cluster0.88c5j.mongodb.net/Quran?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err))
    
app.use(connectFlash());
app.use(expressSession({
  secret : 'mysecretkey',
  resave : true,
  saveUninitialized : true,
  store :connectMongo.create({ mongoUrl: 'mongodb+srv://iyed:123456ok@cluster0.88c5j.mongodb.net/Quran?retryWrites=true&w=majority' })
}));
    app.use(fileUpload());
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
        extended: true
    }));

const port = 5000
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(expressSession({
  secret: 'secret'
}));

const storePost = require('./middleware/storePoste');

app.use('/posts/store', storePost)
//   need to check 
app.get('/', async(req, res) => {
  const User = require('./database/models/User');
  const posts = await post.find({})
  User.find().then(result=>{
    console.log(result);
    res.render('pages/index',{posts,});
  }).catch((err)=>{
    console.log(err);
  })
});

//  go to the create page 
app.get('/posts/new', (req, res) => {
  res.render('pages/create')
});
// this is propeble  for  creating the post and  move the img to te folder 
app.post('/posts/store',auth, storePost, (req, res) => {
  const {
    image
} = req.files

image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
    post.create({
        ...req.body,
        image: `/posts/${image.name}`
    }, (error, post) => {
        res.redirect('/');
       console.log(post.image)
    });
})
 
});
// go to the post 
app.get('/posts/:id',(req, res) => {
 const id = req.params.id;
 post.findById(id)
 .then(result =>{
   res.render('pages/poste',{postt:result})
 }). catch(err =>{
   console.log(err)
 })
  
});

 app.get('/user/:id', (req,res)=>{
      const User = require('./database/models/User');
  User.findById(req.params.id)
  .then(result=>{
    console.log(result)
    res.render('pages/poste',{userr:result})
  }).catch(err=>{
    console.log(err)  })
 })
app.get("/posts/new", auth, createPostController);
app.get("/auth/register", createUserController);
app.post("/users/register", storeUserController);
app.get('/auth/login',loginConttorller);
app.post('/users/login', loginUserConttroller);
app.get("/auth/logout" , logoutController);

app.listen(port, () => console.log(`Example app listening on port port!`));

