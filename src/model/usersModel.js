const pool = require('../config/db')

const getUsers = async () => {
    return new Promise((resolve,reject)=>{
    console.log('Model: Get users')
        pool.query(`SELECT * FROM users`,(err,results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const getUsersByEmail = async (email) => {
    return new Promise((resolve,reject)=>{
    console.log('Model: Get users by email')
        pool.query(`SELECT * FROM users WHERE email = '${email}'`,(err,results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const register = async (post) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: Post/register users')
        const {username, email, password, photo, roles} = post
        pool.query(`INSERT INTO users (username, email, password, photo, roles) VALUES ('${username}', '${email}', '${password}','${photo}', '${roles}') RETURNING *`, (err, results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const delUserById = async (post) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: Delete users')
        const {id} = post
        pool.query(`DELETE FROM users WHERE id = ${id} RETURNING *`, (err, results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}


module.exports = {
    getUsers,
    getUsersByEmail,
    register,
    delUserById
}