//core module
//file system
const fs = require('fs');

//menuliskan string ke file secara synchronous
// try{
//     fs.writeFileSync('data/tulisSync.txt','Hello KNTL secara synchronous!');
// }catch(e){
//     console.log(e);
// }

//menuliskan string ke file secara asynchronous
// fs.writeFile('data/tulisAsync.txt','Hello KNTL asynchronous',(err) => {
//     if(err) throw err;
//     console.log("Berhasil");
// })

//membaca isi file secara synchronous
// const data = fs.readFileSync('data/tulisSync.txt','utf-8');
// console.log(data);
// // console.log(data.toString());

//membaca isi file secara asynchronous
// fs.readFile('data/tulisAsync.txt','utf-8',(err,data) => {
//     if(err) throw err;
//     console.log(data);
// });

//readline
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// rl.question('Masukkan nama anda : ', (nama) => {
//     console.log(`Terima kasih ${nama}`);
//     rl.close();
// })

// rl.question("Masukkan nama anda : ", (nama) => {
//     rl.question("Umur anda berapa ? ", (umur) =>  {
//         console.log(`Dicari ${nama} yang berusia ${umur}`);
//         rl.close();
//     });
// })

//CARA SAYA
// let obj = [];

// rl.question("Masukkan nama anda : ", (nama) => {
//     rl.question("Input noHP anda : ", (noHP) => {
//         let contacts = {
//             nama : nama,
//             noHP : noHP
//         };

//         obj.push(contacts);

//         fs.writeFile('data/contacts.json',JSON.stringify(obj), (err) => {
//             if(err) throw err;
//             console.log("Yeeee");
//         });
//         rl.close();
//     })
// })

//CARA WPU
rl.question("Masukkan nama anda : ", (nama) => {
    rl.question("Input noHP anda : ", (noHP) => {
        let contact = {nama,noHP};

        const file = fs.readFileSync('data/contacts.json','utf8');

        const contacts = JSON.parse(file);

        contacts.push(contact);

        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts,null,2));

        console.log('Thaks');

        rl.close();
    })
})