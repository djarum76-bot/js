const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 5000

mongoose.connect('mongodb+srv://habil:habil@cluster0.hwbnz.mongodb.net/AppDB?retryWrites=true&w=majority')

const connection = mongoose.connection
connection.once('open', () => {
    console.log('mongodb connected')
})

//middleware
app.use(express.json())
const userRoute = require('./routes/user')
app.use('/user', userRoute)

app.route('/').get((req, res) => {
    res.json({
        status: "sambung"
    })
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});