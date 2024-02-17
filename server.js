import express from "express";
import mongoose from 'mongoose'
import blogRouter from './routes/blogs.js';
import Blog from './models/blog.js'
import methodOverride from "method-override";
const app = express()
mongoose.connect('mongodb+srv://admin-shahin:shahin123@cluster0.eiyylr6.mongodb.net/blog')
const port = process.env.PORT||3000;

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.use(express.static("public"));

app.get("/", async (req, res) => {
    let blogs = await Blog.find().sort({createdDate:'desc'})
    
    res.render('blogs/index',{blogs:blogs});
});

app.use('/blogs',blogRouter)

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

