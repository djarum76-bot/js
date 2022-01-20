const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const app = express()
const port = 3000

//gunakan ejs
app.set('view engine', 'ejs')

//Third-party middleware
app.use(expressLayouts)
app.use(morgan('dev'))

//Built-in middleware
app.use(express.static('public'))

//Aplication Level Middleware
app.use((req,res,next) => {
    console.log(`Time : ${Date.now()}`)
    next()
})

app.get('/', (req,res) => {
    // res.sendFile('./index.html', {root: __dirname})
    const mahasiswa = [
        {
            nama: "Luffy",
            email: "luffy@gmail.com"
        },
        {
            nama: "Zoro",
            email: "zoro@gmail.com"
        },
        {
            nama: "Nami",
            email: "nami@gmail.com"
        }
    ]
    res.render('index', {
        nama: "Luffy",
        title: "Home ni boss",
        mahasiswa,
        layout: 'layouts/main-layout',
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        layout: 'layouts/main-layout',
        title: 'About ni boss'
    })
})

app.get('/contact', (req,res) => {
    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'Contact ni boss'
    })
})

app.get('/product/:id', (req,res) => {
    res.send(`Product ID : ${req.params.id} <br> Category : ${req.query.category}`)
})

app.use((req,res) => {
    res.status(404)
    res.send('<h1>404</h1>')
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})