const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

//membuat folder data
const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

//membuat file data/contacts.json
const filePath = './data/contacts.json'
if(!fs.existsSync(filePath)){
    fs.writeFileSync(filePath, '[]','utf-8')
}

const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json','utf-8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
}

const simpanContact = (nama,email,noHP) => {
    const contact = {nama,email,noHP};

    // const fileBuffer = fs.readFileSync('data/contacts.json','utf-8');
    // const contacts = JSON.parse(fileBuffer);

    const contacts = loadContact();

    //cek duplikat
    const duplikat = contacts.find((contact) => contact.nama === nama)

    if(duplikat){
        console.log(chalk.bgRed.white('Nama sudah terdaftar'))
        return false;
    }

    //cek email
    if(email){
        if(!validator.isEmail(email)){
            console.log(chalk.bgRed.white('Email tidak valid'))
            return false;
        }
    }

    //cek noHP
    if(!validator.isMobilePhone(noHP,'id-ID')){
        console.log(chalk.bgRed.white('No HP tidak valid'))
        return false;
    }

    contacts.push(contact);
    
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2));
    console.log(chalk.bgGreen.white("Terima kasih"));
}

const listContact = () => {
    const contacts = loadContact();

    console.log(chalk.bgCyan.black('Daftar Kontak'))
    
    contacts.forEach((contact, i) => {
        console.log(`${1 + i}. ${contact.nama} - ${contact.noHP}`)
    })
}

const detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())

    if(!contact){
        console.log(chalk.bgRed.white(`${nama} tidak ditemukan`))
        return false;
    }

    console.log("")
    console.log(contact.nama)
    console.log(contact.noHP)
    if(contact.email){
        console.log(contact.email)
    }
}

const deleteContact = (nama) => {
    const contacts = loadContact();

    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase())

    if(contacts.length === newContacts.length){
        console.log(chalk.bgRed.white(`${nama} tidak ditemukan`))
        return false;
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts, null, 2));
    console.log(chalk.bgGreen.white(`Data kontak ${nama} berhasil dihapus`));
}

module.exports = {
    simpanContact,
    listContact,
    detailContact,
    deleteContact
}