const express = require('express')
const auth = require('./auth')
const router = express.Router();
const verifikasi = require('./verifikasi')
const jsonku = require('../controller')

//daftarkan menu registrasi
router.post('/api/v1/register', auth.registrasi)
router.post('/api/v1/login', auth.login)

//alamat yang perlu otorisasi
router.get('/api/v1/rahasia', verifikasi() ,auth.halamanRahasia)
router.get('/api/v1/tampil', verifikasi() ,jsonku.tampilGroupMataKuliah)
router.get('/api/v1/tampil/:id', verifikasi() ,jsonku.getMahasiswa)
router.post('/api/v1/tambah', verifikasi() ,jsonku.tambahData)
router.get('/api/v1/ubah/:id', verifikasi() ,jsonku.ubahData)
router.get('/api/v1/hapus/:id', verifikasi() ,jsonku.hapusData)

module.exports = router