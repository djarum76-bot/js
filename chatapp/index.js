const express = require('express')
const http = require('http')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
const server = http.createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
})

//middleware
app.use(express.json())
app.use(cors())

io.on('connection', (socket) => {
    console.log("connected")
    console.log(socket.id, "has join")
    socket.on("/test", (msg) => {
        console.log(msg)
    })
})

server.listen(port,"0.0.0.0", () => {
    console.log(`Server started on port ${port}`)
})