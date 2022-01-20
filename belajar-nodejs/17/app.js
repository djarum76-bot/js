const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { loadContact,findContact } = require('./utils/contacts')

const app = express()
const port = 3000

//gunakan ejs
app.set('view engine', 'ejs')

//Third-party middleware
app.use(expressLayouts)

//Built-in middleware
app.use(express.static('public'))

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
        title: "Home",
        mahasiswa,
        layout: 'layouts/main-layout',
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        layout: 'layouts/main-layout',
        title: 'About'
    })
})

app.get('/contact', (req,res) => {
    const contacts = loadContact()
    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'Contact',
        contacts
    })
})

app.get('/contact/:nama', (req,res) => {
    const contact = findContact(req.params.nama)
    res.render('detail', {
        layout: 'layouts/main-layout',
        title: 'Detail Contact',
        contact
    })
})

app.use((req,res) => {
    res.status(404)
    res.send('<h1>404</h1>')
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})