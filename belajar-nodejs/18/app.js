const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { loadContact,findContact,addContact,cekDuplikat } = require('./utils/contacts')
const { body, validationResult,check } = require('express-validator');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const app = express()
const port = 3000

//gunakan ejs
app.set('view engine', 'ejs')

//Third-party middleware
app.use(expressLayouts)

//Built-in middleware
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
        contacts,
        msg: req.flash('msg')
    })
})

app.get('/contact/add', (req,res) => {
    res.render('add-contact', {
        layout: 'layouts/main-layout',
        title: 'Form Tambah Data Contact',
    })
})

app.post('/contact',[
    body('nama').custom((value) => {
        const duplikat = cekDuplikat(value)
        if(duplikat){
            throw new Error('Nama sudah digunakan')
        }

        return true 
    }),
    check('email', 'Email tidak valid!').isEmail(), 
    check('nohp', 'No HP tidak valid').isMobilePhone('id-ID')
    ], 
    (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            // return res.status(400).json({errors: errors.array()})
            res.render('add-contact', {
                layout: 'layouts/main-layout',
                title: 'Form Tambah Data Contact',
                errors: errors.array()
            })
        }else{
            addContact(req.body)
            //kirimkan flash message
            req.flash('msg', 'Data contact berhasil ditambahkan')
            res.redirect('/contact')
        }
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