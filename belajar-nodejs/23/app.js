const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

require('./utils/db')
const Contact = require('./model/contact')

const app = express()
const port = 3000

//setup ejs
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

//konfigurasi flash
app.use(cookieParser('secret'))
app.use(session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

//Halaman Home
app.get('/', (req,res) => {
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
        title: "Home",
        mahasiswa,
        layout: 'layouts/main-layout',
    })
})

//Halaman About
app.get('/about', (req,res) => {
    res.render('about',{
        layout: 'layouts/main-layout',
        title: 'About'
    })
})

//Halaman Contact
app.get('/contact', async (req,res) => {
    const contacts = await Contact.find()
    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'Contact',
        contacts,
        msg: req.flash('msg')
    })
})

//Halaman detail contact
app.get('/contact/:nama', async (req,res) => {
    const contact = await Contact.findOne({nama:req.params.nama})
    res.render('detail', {
        layout: 'layouts/main-layout',
        title: 'Detail Contact',
        contact
    })
})

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})