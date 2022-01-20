const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/habil')

//Menambah 1 data
// const contact1 = Contact({
//     nama: "Luffy",
//     nohp: "081234567890",
//     email: "luffy@gmail.com"
// })

// //simpan ke collection
// contact1.save().then((result) => console.log(result))