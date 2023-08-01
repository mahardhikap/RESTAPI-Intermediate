const pool = require('../config/db')

const getCategory = async () => {
    return new Promise((resolve,reject)=>{
    console.log('Model: Get category')
        pool.query(`SELECT * FROM category`,(err,results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

module.exports = {
    getCategory
}