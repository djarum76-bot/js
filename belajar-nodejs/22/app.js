const { MongoClient, ObjectID } = require('mongodb')

const uri = 'mongodb://127.0.0.1:27017'
const dbName = 'habil'

const client = new MongoClient(uri, {
    useNewUrlParses: true,
    useUnifiedTopology: true
})

client.connect((error, client) => {
    if(error){
        return console.log('Koneksi Gagal')
    }

    //pilih database
    const db = client.db(dbName)

    
    //insert data ke dalam collection mahasiswa
    // db.collection('mahasiswa').insertOne({
    //     nama: "Luffy",
    //     email: "luffy@gmail.com"
    // }, (error, result) => {
    //     if(error){
    //         return console.log('Gagal menambahkan data')
    //     }

    //     console.log(result);
    // })

    
    //Menambahkan multi data
    // db.collection('mahasiswa').insertMany([
    //     {
    //         nama: 'zoro',
    //         email: 'zoro@gmail.com'
    //     },
    //     {
    //         nama: 'sanji',
    //         email: 'sanji@gmail.com'
    //     },
    //     {
    //         nama: 'zoro',
    //         email: 'zoro@gmail.com'
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log("Gagal")
    //     }

    //     console.log(result)
    // })

    
    //menampilkan semua data
    // console.log(db.collection('mahasiswa').find().toArray((error, result) => {
    //     console.log(result)
    // }))

    
    //menampilkan data tertentu
    // console.log(db.collection('mahasiswa').find({nama: 'zoro'}).toArray((error, result) => {
    //     console.log(result)
    // }))

    
    //mengubah data berdasarkan id
    // const updatePromise = db.collection('mahasiswa').updateOne(
    //     {
    //         _id: ObjectID('61e188742c66c7149c3527d6')
    //     },
    //     {
    //         $set: {
    //             nama: "Aceng"
    //         }
    //     }
    // )

    // updatePromise
    // .then((result) => {
    //     console.log(result)
    // })
    // .catch((error) => {
    //     console.log(error)
    // })

    
    //mengubah data lebih dari 1 berdasarkan kriteria
    // db.collection('mahasiswa').updateMany(
    //     {
    //         nama: "zoro"
    //     },
    //     {
    //         $set: {
    //             email: "kntl@gmail.com"
    //         }
    //     }
    // )


    //menghapus 1 data
    // db.collection('mahasiswa').deleteOne(
    //     {
    //         _id: ObjectID('61e188742c66c7149c3527d6')
    //     }
    // ).then((result) => console.log(result)).catch((error) => console.log(error))


    //menghapus lebih dari 1 data
    db.collection('mahasiswa').deleteMany(
        {
            nama: "zoro"
        }
    ).then((result) => console.log(result)).catch((error) => console.log(error))
})