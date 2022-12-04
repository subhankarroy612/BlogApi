const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require('cors');
const userRoute = require('./Routes/user.routes')
const blogRoute = require('./Routes/blog.routes')
const http = require('http');
const { Server } = require('socket.io')
const jwt = require('jsonwebtoken')

const app = express();
app.use(express.json());
app.use(cors());
app.use('/users', userRoute);
app.use('/blogs', blogRoute);

const httpServer = http.createServer(app);
const io = new Server(httpServer)

app.get('/', (req, res) => res.send('API Works!'));

let user = 0

io.on('connection', (socket) => {
    user++
    console.log('Connected', user);

    socket.on('disconnect', () => {
        user--
    })

    socket.on('text', (obj) => {
       let verify = jwt.verify(obj.token, process.env.TOKEN)
       io.emit('textBack', { msg:obj.msg, email: verify.email})
    })
})

mongoose.connect(process.env.URL).then(() => {
    httpServer.listen(process.env.PORT, () => {
        console.log(`listening on http://localhost:${process.env.PORT}`);
    })
})

