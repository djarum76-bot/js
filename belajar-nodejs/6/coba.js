function babi(nama,umur){
    return `itu adalah seekor ${nama} berusia ${umur} tahun`;
}

const PI = 3.14;

const game = {
    nama : "Valorant",
    ukuran: 20,
    deskripsi(){
        return `Ini adalah game ${this.nama} yang berukuran ${this.ukuran} GB`;
    }
}

class Mobil{
    constructor(nama){
        this.nama = nama;
        console.log(`Ini adalah mobil ${this.nama}`);
    }
}

// module.exports.babi = babi;
// module.exports.PI = PI;
// module.exports.game = game;
// module.exports.Mobil = Mobil;

// module.exports = {
//     babi:babi,
//     PI:PI,
//     game:game,
//     Mobil:Mobil
// }

module.exports = {babi,PI,game,Mobil};