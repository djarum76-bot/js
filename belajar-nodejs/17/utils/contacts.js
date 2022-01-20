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

module.exports = {
    loadContact,
    findContact
}