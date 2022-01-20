fungsi1()

function fungsi1(){
    let ayam = {
        nama:"ayam bangkok",
        berat:12,
        tambah:function(){
            console.log(5+3);
        }
    }

    console.log(ayam.nama)
    console.log(ayam.berat)
    console.log(`ayam itu adalah ${ayam.nama},dengan berat ${ayam.berat}`)
    ayam.tambah()
}

function fungsi2(){
    let babi = new Object();
    babi.nama = "Babi KNTL";
    babi.berat = 34

    delete babi.berat

    console.log(babi['nama'])
    console.log(babi['berat'])
    console.log(`ini adalah ${babi['nama']},dengan berat ${babi['berat']}`)
}

fungsi2()