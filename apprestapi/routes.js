'use strict'

module.exports = (app) => {
    const jsonku = require('./controller')

    app.route('/').get(jsonku.index)

    app.route('/tampil').get(jsonku.getAllMahasiswa)

    app.route('/tampil/:id').get(jsonku.getMahasiswa)

    app.route('/tambah').post(jsonku.tambahData)

    app.route('/ubah/:id').put(jsonku.ubahData)

    app.route('/hapus/:id').delete(jsonku.hapusData)

    app.route('/tampilMatakuliah').get(jsonku.tampilGroupMataKuliah)
}