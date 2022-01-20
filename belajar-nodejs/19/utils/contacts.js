const fs = require('fs');

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

const findContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())

    return contact;
}

//menuliskan / menimpa file contacts.json dengan data yg baru
const saveContacts = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2));
}

//menambahkan data contact baru
const addContact = (contact) => {
    const contacts = loadContact()
    contacts.push(contact)
    saveContacts(contacts)
}

//cek duplikat
const cekDuplikat = (nama) => {
    const contacts = loadContact();

    return duplikat = contacts.find((contact) => contact.nama === nama)
}

const deleteContact = (nama) => {
    const contacts = loadContact();

    const newContacts = contacts.filter((contact) => contact.nama !== nama)

    saveContacts(newContacts)
}

const updateContacts = (contactBaru) => {
    const contacts = loadContact()

    //hilangkan contact lama yang namanya sama dgn oldnama
    const filteredContacts = contacts.filter((contact) => contact.nama !== contactBaru.oldNama)
    delete contactBaru.oldNama

    filteredContacts.push(contactBaru)

    saveContacts(filteredContacts)
}

module.exports = {
    loadContact,
    findContact,
    addContact,
    cekDuplikat,
    deleteContact,
    updateContacts
}