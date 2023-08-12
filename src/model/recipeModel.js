const pool = require('../config/db')

const getRecipe = async () => {
    return new Promise((resolve,reject)=>{
    console.log('Model: Get recipe')
        pool.query(`SELECT * FROM recipe`,(err,results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const getRecipeById = async (id) => {
    return new Promise((resolve,reject)=>{
    console.log('Model: Get recipe by ID')
        pool.query(`SELECT recipe.users_id, recipe.title, recipe.image, recipe.ingredients, recipe.img_id, recipe.created_at, category.name AS category, users.username FROM recipe JOIN category ON recipe.category_id = category.id JOIN users ON recipe.users_id = users.id WHERE recipe.id = ${id}`, (err,results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const postRecipe = async (post) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: Post recipe')
        const {title, image, ingredients, category_id, users_id, img_id} = post
        pool.query(`INSERT INTO recipe (title, image, ingredients, category_id, users_id, img_id) VALUES ('${title}', '${image}', '${ingredients}', ${category_id}, ${users_id}, '${img_id}') RETURNING *`, (err, results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const putRecipeById = async (post) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: Put recipe')
        const {title, image, ingredients, category_id, img_id, id} = post
        pool.query(`UPDATE recipe SET title = '${title}', image = '${image}', ingredients = '${ingredients}', category_id = ${category_id}, img_id = '${img_id}' WHERE id = ${id} RETURNING *`, (err, results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const delRecipeById = async (id) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: Delete recipe')
        pool.query(`DELETE FROM recipe WHERE id = ${id} RETURNING *`, (err, results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const sortRecipe = async (post) => {
    return new Promise((resolve, reject) => {
        console.log('Model: Sorting recipe')
        const { sortby, sort, offset, limit } = post
        pool.query(`SELECT recipe.id, recipe.users_id, recipe.title, recipe.image, recipe.ingredients, category.name AS category, users.username, recipe.created_at FROM recipe JOIN category ON recipe.category_id = category.id JOIN users ON recipe.users_id = users.id ORDER BY ${sortby} ${sort} OFFSET ${offset} LIMIT ${limit}`, (err, results) => {
          if (!err) {
            const data = {
              count: results.rowCount, // Jumlah total data (total row count)
              rows: results.rows // Data hasil query
            }
            resolve(data)
            } else {
            reject(err)
            }
        })
    })
}

const searchRecipe = async (search) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: Search recipe')
        pool.query(`SELECT recipe.id, recipe.title, recipe.image, recipe.ingredients, category.name AS category, users.username, recipe.created_at FROM recipe JOIN category ON recipe.category_id = category.id JOIN users ON recipe.users_id = users.id WHERE title ILIKE '%${search}%'`, (err, results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const getRecipeByUser = async (id) => {
    return new Promise((resolve,reject)=>{
    console.log('Model: Get recipe by ID')
        pool.query(`SELECT recipe.title, recipe.image, recipe.ingredients, recipe.img_id, recipe.created_at, category.name AS category, users.username FROM recipe JOIN category ON recipe.category_id = category.id JOIN users ON recipe.users_id = users.id WHERE recipe.users_id = ${id}`, (err,results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const sortRecipeByUser = async (post) => {
    return new Promise((resolve, reject) => {
        console.log('Model: Sorting recipe by users sort')
        const { users_id, sortby, sort, offset, limit } = post
        pool.query(`SELECT * FROM recipe WHERE users_id = ${users_id} ORDER BY ${sortby} ${sort} OFFSET ${offset} LIMIT ${limit}`, (err, results) => {
          if (!err) {
            const data = {
              count: results.rowCount, // Jumlah total data (total row count)
              rows: results.rows // Data hasil query
            }
            resolve(data)
            } else {
            reject(err)
            }
        })
    })
}


module.exports = {
    getRecipe,
    getRecipeById,
    postRecipe,
    putRecipeById,
    delRecipeById,
    sortRecipe,
    searchRecipe,
    getRecipeByUser,
    sortRecipeByUser
}