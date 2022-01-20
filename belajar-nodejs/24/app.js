const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const methodOverride = require('method-override')
const { body,validationResult,check } = require('express-validator')

const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

require('./utils/db')
const Contact = require('./model/contact')

const app = express()
const port = 3000

//setup method override
app.use(methodOverride('_method'))

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

//Halaman tambah data
app.get('/contact/add', (req,res) => {
    res.render('add-contact', {
        layout: 'layouts/main-layout',
        title: 'Form Tambah Data Contact',
    })
})

//Proses tambah data
app.post('/contact',[
    body('nama').custom(async (value) => {
        const duplikat = await Contact.findOne({ nama: value })
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
            res.render('add-contact', {
                layout: 'layouts/main-layout',
                title: 'Form Tambah Data Contact',
                errors: errors.array()
            })
        }else{
            Contact.insertMany(req.body, (error,result) => {
                req.flash('msg', 'Data contact berhasil ditambahkan')
                res.redirect('/contact')  
            })
        }
})

//Proses delete data
// app.get('/contact/delete/:nama', async (req,res) => {
//     const contact = await Contact.findOne({ nama: req.params.nama })

//     if(!contact){
//         res.status(404)
//         res.send('<h1>404</h1>')
//     }else{
//         contact.deleteOne({ _id: contact._id }).then((result) => {
//             req.flash('msg', 'Data berhasil dihapus')
//             res.redirect('/contact')
//         })
//     }
// })
app.delete('/contact', (req, res) => {
    Contact.deleteOne({ nama: req.body.nama }).then((result) => {
        req.flash('msg', 'Data berhasil dihapus')
        res.redirect('/contact')
    })
})

//Halaman edit
app.get('/contact/edit/:nama', async (req, res) => {
    const contact = await Contact.findOne({nama:req.params.nama})
    res.render('edit-contact', {
        layout: 'layouts/main-layout',
        title: 'Form Edit Data Contact',
        contact
    })
})

//proses edit
app.put('/contact',[
    body('nama').custom( async (value, { req }) => {
        const duplikat = await Contact.findOne({ nama: value })
        
        if((value !== req.body.oldNama) && duplikat){
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
        res.render('edit-contact', {
            layout: 'layouts/main-layout',
            title: 'Form Ubah Data Contact',
            errors: errors.array(),
            contact: req.body
        })
    }else{
        Contact.updateOne(
            {
                _id: req.body._id
            },
            {
                $set: {
                    nama: req.body.nama,
                    email: req.body.email,
                    nohp: req.body.nohp
                }
            }
        ).then((result) => {
            req.flash('msg', 'Data contact berhasil diubah')
            res.redirect('/contact')
        })
        
    }
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