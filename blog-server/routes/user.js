const express = require('express')
const User = require('../models/users.model')
const md5 = require('md5')
const config = require('../config')
const jwt = require('jsonwebtoken')
const middleware = require('../middleware')

const router = express.Router()

router.route('/:username').get(middleware.checkToken,(req,res) => {
    User.findOne(
        {
            username: req.params.username
        },
        (err, result) => {
            if(err){
                return res.status(500).json({msg: err})
            }else{
                return  res.json(
                    {
                        data: result
                    }
                );
            }
        }
    )
})

router.route('/login').post((req, res) => {
    User.findOne(
        {
            username: req.body.username,
            password: md5(req.body.password)
        },
        (err, result) => {
            if(err){
                return res.status(500).json({msg: err})
            }else{
                if(result === null){
                    return  res.status(403).json(
                        {
                            status: "Gagal login"
                        }
                    );
                }else{
                    let token = jwt.sign({result}, config.key, {
                        expiresIn: "24h"
                    })
                    return  res.json(
                        {
                            data: result,
                            token: token,
                            status: "Berhasil login"
                        }
                    );
                }
            }
        }
    )
})

router.route("/register").post((req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
    })
    user
        .save()
        .then(() => {
            res.status(200).json({status: "Berhasil registrasi"})
        })
        .catch(() => {
            res.status(403).json({status: "Gagal registrasi"})
        })
})

router.route("/update/:username").patch((req, res) => {
    User.findOneAndUpdate(
        {
            username: req.params.username
        },
        {
            $set:{
                username: req.body.username,
                password: md5(req.body.password),
            }
        },
        (err, result) => {
            if(err){
                return res.status(500).json({msg: err})
            }else{
                const msg = {
                    msg: "Username and Password succesfully updated"
                }
                return res.json(msg)
            }
        }
    )
})

router.route('/delete/:username').delete((req, res) => {
    User.findOneAndDelete(
        {
            username: req.params.username
        },
        (err, result) => {
            if(err){
                return res.status(500).json({msg: err})
            }else{
                const msg = {
                    msg: "User deleted"
                }
                return res.json(msg)
            }
        }
    )
})

module.exports = router