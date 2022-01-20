'use strict'

const response = require('./res')
const connection = require('./koneksi')

exports.index = (req, res) => {
    response.ok('Jalan',res)
}

//menampilkan semua data mahasiswa
exports.getAllMahasiswa = (req, res) => {
    connection.query('SELECT * FROM mahasiswa;', (error, rows, fields) => {
        if(error){
            console.log(error)
        }else{
             response.ok(rows,res)
        }
    })
}

//menampilkan semua data mahasiswa berdasarkan id
exports.getMahasiswa = (req, res) => {
    const id = req.params.id
    connection.query(`SELECT * FROM mahasiswa where id_mahasiswa = ${id}`, (error, rows, fields) => {
        if(error){
            console.log(error)
        }else{
            response.ok(rows,res)
        }
    })
}

exports.tambahData = (req,res) => {
    const { nim, nama, jurusan } = req.body
    connection.query(`INSERT INTO mahasiswa (nim, nama, jurusan) VALUES (${nim}, "${nama}", "${jurusan}");`, (error, rows, fields) => {
        if(error){
            console.log(error)
        }else{
            response.ok("Berhasil menambahkan data",res)
        }
    })
}

exports.ubahData = (req, res) => {
    const { nim, nama, jurusan } = req.body
    const id = req.params.id
    connection.query(`UPDATE mahasiswa set nim = ${nim}, nama = "${nama}", jurusan = "${jurusan}" where id_mahasiswa = ${id}`, (error, rows, fields) => {
        if(error){
            console.log(error)
        }else{
            response.ok("Berhasil mengubah data", res)
        }
    })
}

exports.hapusData = (req, res) => {
    const id = req.params.id
    connection.query(`DELETE FROM mahasiswa where id_mahasiswa = ${id}`, (error, rows, fields) => {
        if(error){
            console.log(error)
        }else{
            response.ok("Berhasil hapus  data", res)
        }
    })
}

//menampilkan matakuliah group
exports.tampilGroupMataKuliah = (req,res) => {
    connection.query('SELECT mahasiswa.id_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matakuliah, matakuliah.sks FROM krs JOIN matakuliah JOIN mahasiswa WHERE mahasiswa.id_mahasiswa = krs.id_mahasiswa AND matakuliah.id_matakuliah = krs.id_matakuliah ORDER BY mahasiswa.id_mahasiswa;', (error,rows,fields) => {
        if(error){
            console.log(error)
        }else{
            response.Nested(rows,res)
        }
    })
}