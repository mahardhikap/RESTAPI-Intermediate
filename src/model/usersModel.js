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
        const {username, email, password, photo, roles, img_id} = post
        pool.query(`INSERT INTO users (username, email, password, photo, roles, img_id) VALUES ('${username}', '${email}', '${password}','${photo}', '${roles}', '${img_id}') RETURNING *`, (err, results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const delUserById = async (id) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: Delete users')
        pool.query(`DELETE FROM users WHERE id = ${id} RETURNING *`, (err, results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}


const putUsersById = async (post) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: Put users')
        const {username, email, photo, password, img_id, id} = post
        pool.query(`UPDATE users SET username = '${username}', email = '${email}', photo = '${photo}', password = '${password}', img_id = '${img_id}' WHERE id = ${id} RETURNING *`, (err, results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const getUsersById = async (id) => {
    return new Promise((resolve,reject)=>{
    console.log('Model: Get users by ID')
        pool.query(`SELECT * FROM users WHERE id = ${id}`, (err,results)=>{
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
    delUserById,
    getUsersById,
    putUsersById
}