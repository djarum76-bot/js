'use strict'

exports.ok = (values, res) => {
    const data = {
        'status': 200,
        'values': values
    }

     res.json(data);
     res.end()
}

//response utk nested matakuliah
exports.okNested = (values, res) => {
    //lakukan akumulasi
    const hasil = values.reduce((akumulasikan, item) => {
        //tentukan key group
        if(akumulasikan[item.nama]){
            //buat variabel group nama mahasiswa
            const group = akumulasikan[item.nama]
            //cek array jika isi array adalah matakuliah
            if(Array.isArray(group.matakuliah)){
                //tambahkan value ke dalam group matakuliah
                group.matakuliah.push(item.matakuliah)
                group.sks.push(item.sks)
            }else{
                group.matakuliah = [group.matakuliah, item.matakuliah]
                group.sks = [group.sks, item.sks]
            }
        }else{
            akumulasikan[item.nama] = item
        }
        return akumulasikan
    }, {})

    const data = {
        "status": 200,
        "values": hasil
    }

     res.json(data);
     res.end()
}

exports.Nested = (values, res) => {
    //lakukan akumulasi
    const hasil = values.reduce((akumulasikan, item) => {
        //tentukan key group
        if(akumulasikan[item.nama]){
            //buat variabel group nama mahasiswa
            const group = akumulasikan[item.nama]
            //cek array jika isi array adalah matakuliah
            if(Array.isArray(group.matakuliah)){
                //tambahkan value ke dalam group matakuliah
                group.matakuliah.push(item.matakuliah)
                group.sks.push(item.sks)
            }else{
                group.matakuliah.push(item.matakuliah)
                group.sks.push(item.sks)
            }
        }else{
            akumulasikan[item.nama] = item
        }
        return akumulasikan
    }, {})

    const data = {
        "status": 200,
        "values": Object.values(hasil)
    }

     res.json(data);
     res.end()
}