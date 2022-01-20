//mengambil argument dari command line pakai npm
const yargs = require('yargs')
const contacts = require('./contacts')

yargs.command({
    command: 'add',
    describe: 'Menambahkan contact baru',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string'
        },
        noHP: {
            describe: 'Nomor Handphone',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        contacts.simpanContact(argv.nama,argv.email,argv.noHP)
    }
})
.demandCommand()

//menampilkan daftar semua nama $ noHP contact
yargs.command({
    command: 'list',
    describe: 'Menampilkan semua nama & noHP',
    handler(){
        contacts.listContact();
    }
})

//menampilkan detail sebuah kontak
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail sebuah kontak berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        contacts.detailContact(argv.nama)
    }
})

//menghapus kontak berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'Menghapus sebuah kontak berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        contacts.deleteContact(argv.nama)
    }
})

yargs.parse()


//mengambil argument dari command line
// console.log(process.argv)

// const contacts = require('./contacts')

// const main = async () => {
//     const nama = await contacts.tulisPertanyaan('Masukkan nama anda : ');
//     const email = await contacts.tulisPertanyaan('Masukkan email anda : ');
//     const noHP = await contacts.tulisPertanyaan('Masukkan No HP anda : ');

//     contacts.simpanContact(nama,email,noHP)
// }

// main();