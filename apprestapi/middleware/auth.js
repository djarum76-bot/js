const connection = require('../koneksi')
const mysql  = require('mysql')
const md5 = require('md5')
const response = require('../res')
const jwt = require('jsonwebtoken')
const config = require('../config/secret')
const ip = require('ip')

//controller untuk register
exports.registrasi = (req, res) => {
    const post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date(),
    }

    let query = "SELECT * FROM ?? WHERE ?? = ?"
    let table = ["user","email",post.email]

    query = mysql.format(query, table)

    connection.query(query, (error, rows, fields) => {
        if(error){
            console.log(error)
        }else{
            if(rows.length == 0){
                query = "INSERT INTO ?? set ?"
                table = ["user"]
                query = mysql.format(query,table)
                connection.query(query,post, (error, rows, fields) => {
                    if(error){
                        console.log(error)
                    }else{
                        response.ok("Berhasil menambah data user baru", res)
                    }
                })
            }else{
                response.ok("Email sudah terdaftar", res)
            }
        }
    })
}

//controller untuk login
exports.login = (req, res) => {
    const post = {
        password: req.body.password,
        email: req.body.email
    }

    let query = "SELECT * FROM ??  WHERE ?? = ? AND ?? = ?"
    let table = ["user","password", md5(post.password), "email", post.email]

    query = mysql.format(query, table)

    connection.query(query, (error, rows, fields) => {
        if(error){
            console.log(error)
        }else{
            if(rows.length == 1){
                let token = jwt.sign({rows}, config.secret, {
                    expiresIn: 144000
                })
                let id_user = rows[0].id

                const data = {
                    id_user,
                    access_token: token,
                    ip_address: ip.address()
                }

                query = "INSERT INTO ?? SET ?"
                table = ["akses_token"]

                query = mysql.format(query, table)

                connection.query(query, data, (error,rows, fields) => {
                    if(error){
                        console.log(error)
                    }else{
                         res.json({
                             success: true,
                             message: "Token JWT tergenerate",
                             token,
                             user:data.id_user
                         });
                    }
                })
            }else{
                 res.json({
                     "Error": true,
                     "Message": "Email atau passwordnya salah!"
                 });
            }
        }
    })
}

exports.halamanRahasia = (req,res) => {
    response.ok("Halaman ini hanya untuk user dengan role = 2",res)
}