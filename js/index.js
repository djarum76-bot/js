import babi,{ayam} from "./index2.js";

console.log(ayam.jumlah);
console.log(babi());

class Hewan{
    constructor(nama,kaki){
        this.nama = nama;
        this.kaki = kaki;
    }

    makan(){
        return `${this.nama} yang mempunyai ${this.kaki} kaki sedang makan`;
    }
}

let anjing = new Hewan("Anjing",4);

console.log(anjing);
console.log(anjing.nama);
console.log(anjing.kaki);
console.log(anjing.makan());

class Burung extends Hewan{
    constructor(nama,kaki,habitat){
        super(nama,kaki);
        this.habitat = habitat;
    }

    tinggal(){
        return `${this.nama} yang mempunyai ${this.kaki} tinggal di ${this.habitat}`;
    }

    makan(){
        return "Makan pntk";
    }
}

let elang = new Burung("Elang",2,"Gunung");

console.log(elang);
console.log(elang.nama);
console.log(elang.kaki);
console.log(elang.habitat);
console.log(elang.tinggal());
console.log(elang.makan());