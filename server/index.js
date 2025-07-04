const express = require('express');
const socket = require('socket.io')
const app = express();

const chats = []

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
        io.emit("get-users", [...chats])
})

