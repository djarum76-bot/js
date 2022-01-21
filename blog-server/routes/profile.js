const express = require('express')
const router = express.Router()
const Profile = require('../models/profile.model')
const middleware = require('../middleware')
const multer = require('multer')
const path = require("path")

//multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'./uploads')
    },
    filename: (req, file, cb) => {
        cb(null, req.decoded.username + ".jpg")
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype == "image/jpeg" || file.mimetype == "image/png"){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 6
    },
    fileFilter: fileFilter
})

//adding and update profile image

router.route("/add").post(middleware.checkToken, upload.single("img"), (req, res) => {
    const profile = Profile({
        username: req.decoded.username,
        name: req.body.name,
        profession: req.body.profession,
        DOB: req.body.DOB,
        titleline: req.body.titleline,
        about: req.body.about,
        img: req.file.path
    })
    profile.save()
    .then(() => {
        return res.json({
            msg: "Profile successfully added",
            data: profile,
        })
    })
    .catch((err) => {
        return res.status(400).json({
            msg: err
        })
    })
})

router.route("/get").get(middleware.checkToken, (req, res) => {
    Profile.findOne({
        username: req.decoded.username
    }),(err, result) => {
        if(err){
            return res.status(400).json({
                err: err
            })
        }else{
            if(result == null){
                return res.json({
                    data: []
                })
            }else{
                return res.json({
                    data: result
                })
            }
        }
    }
})

// router.route("/add").post(middleware.checkToken, (req, res) => {
//     const profile = Profile({
//         username: req.decoded.username,
//         name: req.body.name,
//         profession: req.body.profession,
//         DOB: req.body.DOB,
//         titleline: req.body.titleline,
//         about: req.body.about
//     })
//     profile.save()
//     .then(() => {
//         return res.json({
//             "msg": "Profile successfully restored"
//         })
//     })
//     .catch((err) => {
//         return res.status(400).json({
//             msg: err
//         })
//     })
// })

module.exports = router 