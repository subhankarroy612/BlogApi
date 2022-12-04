const { Router } = require('express');
const authmiddleware = require('../middleware/authmiddleware');
const blogModel = require('../Models/blog.model');
require('dotenv').config

const app = Router()
app.use(authmiddleware)

app.get('/', async (req, res) => {
    try {
        const blogs = await blogModel.find();
        return res.send(blogs)
    } catch (e) {
        return res.send(e.message)
    }
});

app.post('/post', async (req, res) => {
    const { title, description } = req.body;

    try {
       const newBlog = new blogModel({title, description});
       await newBlog.save();
       return res.send('Blog posted successful')
    } catch (e) {
       return res.send(e.message)
    }
})




module.exports = app;