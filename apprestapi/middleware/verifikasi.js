const jwt = require('jsonwebtoken')
const config = require('../config/secret')

// const verifikasi = () => {
//     return (req, res, next) => {
//         const role = req.body.role

//         const tokenWithBearer = req.headers.authorization

//         if(tokenWithBearer){
//             let token = tokenWithBearer.split(' ')[1]
//             //verifikasi
//             jwt.verify(token,config.secret, (err, decoded) => {
//                 if(err){
//                     return res.status(401).send({
//                         auth: false,
//                         message: "Token tidak terdaftar"
//                     })
//                 }else{
//                     if(role == 2){
//                         req.auth = decoded
//                         next()
//                     }else{
//                         return res.status(401).send({
//                             auth: false,
//                             message: "Gagal mengotorisasi role anda"
//                         })
//                     }
//                 }
//             })
//         }else{
//             return res.status(401).send({
//                 auth: false,
//                 message: "Token tidak tersedia"
//             })
//         }
//     }
// }

const verifikasi = () => {
    return (req, res, next) => {
        const tokenWithBearer = req.headers.authorization

        if(tokenWithBearer){
            let token = tokenWithBearer.split(' ')[1]
            //verifikasi
            jwt.verify(token,config.secret, (err, decoded) => {
                if(err){
                    return res.status(401).send({
                        auth: false,
                        message: "Token tidak terdaftar"
                    })
                }else{
                    req.auth = decoded
                    next()
                }
            })
        }else{
            return res.status(401).send({
                auth: false,
                message: "Token tidak tersedia"
            })
        }
    }
}

module.exports = verifikasi