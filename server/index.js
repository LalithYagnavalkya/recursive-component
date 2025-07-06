const express = require('express');
const socket = require('socket.io')
const app = express();

const chats = []
const users = []
let counter = 0; // to add unique id for each comment

app.router.get('/test', (req, res) => {
        return res.status(200).json({ data: true })
})

const server = app.listen(3000, () => {
        console.log('running the port in 3000')
})

const io = socket(server, {
        cors: {
                origin: '*'
        }
})

io.on("connection", (socket) => {
      
        console.log('connection happened')
        console.log(socket.id)

        socket.on('add-user', (username) => {
                users.push({ username, id: socket.id })
                io.emit('get-users', [users])
                console.log(username, socket.id)
        })

        socket.on('comment', (data) => {
                data.socketId = socket.id;
                data.id = counter;
                counter++;
                chats.push(data)

                io.emit('newComment', data)
        })
        socket.on("disconnect", () => {
                console.log('disconnected')
        });

})


