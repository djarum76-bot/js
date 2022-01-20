const { Router } = require('express')
const router = Router()

const mysqlConnection = require('../database/database')

router.get('/', (req, res) => {
    res.status(200).json('Server on port 8000 and database is connected')
})

router.get('/user', (req, res) => {
    mysqlConnection.query('select * from user;', (error, rows, fields) => {
        if(!error){
            res.json({users: rows})
        }else{
            console.log(error)
        }
    })
})

router.get('/user/:id', (req, res) => {
    const {id} = req.params
    mysqlConnection.query('select * from user where id = ?;', [id], (error, rows, fields) => {
        if(!error){
            res.json({user: rows})
        }else{
            console.log(error)
        }
    })
})

router.post('/user', (req,res) => {
    const {id,username,name,lastname,mail,randomstr,hash} = req.body
    console.log(req.body)
    mysqlConnection.query('insert into user(id,username,name,lastname,mail,randomstr,hash) values (?,?,?,?,?,?,?);',
    [id,username,name,lastname,mail,randomstr,hash], (error,rows,fields) => {
        if(!error){
            res.json({Status: 'User Saved'})
        }else{
            console.log(error)
        }
    })
})

router.put('/user/:id', (req, res) => {
    const {username,name,lastname,mail,randomstr,hash} = req.body
    console.log(req.body)
    mysqlConnection.query(`update user set username = ?, name = ?,lastname = ?,mail = ?,randomstr = ?,hash = ? where id = ${req.params.id}`,
    [username,name,lastname,mail,randomstr,hash], (error,rows,fields) => {
        if(!error){
            res.json({Status: 'User Updated'})
        }else{
            console.log(error)
        }
    })
})

router.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('delete from user where id = ?;', [id], (error, rows, fields) => {
        if(!error){
            res.json({Status: 'User Deleted'})
        }else{
            res.json({Status: error})
        }
    })
})

module.exports = router