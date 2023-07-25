const {getRecipe, getRecipeById, postRecipe, putRecipeById, delRecipeById, sortRecipe, searchRecipe} = require('../model/recipeModel')
const {successResponse, errorResponse} = require('../helper/handler')
// const {getUsersByEmail} = require('../model/usersModel')

const recipeController = {
    showRecipeOnly: async (req, res) => {
        console.log('Control: Running get recipe')
        try {
          const result = await getRecipe();
          if (result.rowCount > 0) {
              console.log(result.rows);
              return res.status(200).json(successResponse(result.rows, 'Berhasil'));
          } else {
              console.log('Data tidak ditemukan')
              return res.status(404).json(errorResponse('Data tidak ditemukan', 404));
          }
        } catch (error) {
            console.error(`Error : ${error.message}`);
            return res.status(500).json(errorResponse('Ada kesalahan', 500));
        }
    },
    showRecipeById: async (req, res) => {
        console.log('Control: Running get recipe')
        try {
        const {id} = req.params
        let post = {
            id: id
        }
          const result = await getRecipeById(post);
          if (result.rowCount > 0) {
              console.log(result.rows);
              return res.status(200).json(successResponse(result.rows, 'Berhasil'));
          } else {
              console.log('Data tidak ditemukan')
              return res.status(404).json(errorResponse('Data tidak ditemukan', 404));
          }
        } catch (error) {
            console.error(`Error : ${error.message}`);
            return res.status(500).json(errorResponse('Ada kesalahan', 500));
        }
    },
    postRecipeOnly: async (req, res) => {
        console.log('Control: Running post recipe')
        try {
          const {title, image, ingredients, category_id} = req.body
          let users_id =  req.payload.id
          console.log(users_id)
          let post = {
            title: title,
            image: image,
            ingredients: ingredients,
            category_id: category_id,
            users_id
          }
          const result = await postRecipe(post);
          if (result.rowCount > 0) {
              console.log(result.rows);
              return res.status(200).json(successResponse(result.rows, 'Berhasil'));
          } else {
              console.log('Data tidak ditemukan')
              return res.status(404).json(errorResponse('Data tidak ditemukan', 404));
          }
        } catch (error) {
            console.error(`Error : ${error.message}`);
            return res.status(500).json(errorResponse('Ada kesalahan', 500));
        }
    },
    putRecipeByIdOnly: async (req, res) => {
        console.log('Control: Running put recipe')
        try {
        const {id} = req.params
        const {title, image, ingredients, category_id} = req.body

        let post = {
          id: id,
          title: title,
          image: image,
          ingredients: ingredients,
          category_id: category_id
        }

        let dataRecipe =  await getRecipeById(post)
        let users_id = req.payload.id

        // console.log(dataRecipe.rows[0].users_id)
        // console.log(users_id)
          
        
        if(users_id != dataRecipe.rows[0].users_id){
            return res.status(404).json(errorResponse('Ini bukan post anda', 404))
        }

          const result = await putRecipeById(post);
          if (result.rowCount > 0) {
              console.log(result.rows);
              return res.status(200).json(successResponse(result.rows, 'Berhasil'));
          } else {
              console.log('Data tidak ditemukan')
              return res.status(404).json(errorResponse('Data tidak ditemukan', 404));
          }
        } catch (error) {
            console.error(error);
            return res.status(500).json(errorResponse('Ada kesalahan', 500));
        }
    },
    delRecipeByIdOnly: async (req, res) => {
        console.log('Control: Running delete recipe')
        try {
          const {id} = req.params
        
          let post = {
            id: id
          }

          let dataRecipe =  await getRecipeById(post)
          let users_id = req.payload.id

          if(users_id != dataRecipe.rows[0].users_id){
            return res.status(404).json(errorResponse('Ini bukan post anda', 404))
          }

          const result = await delRecipeById(post);
          if (result.rowCount > 0) {
            console.log(result.rows);
            return res.status(200).json(successResponse(result.rows, 'Berhasil'));
          } else {
            console.log('Data tidak ditemukan')
            return res.status(404).json(errorResponse('Data tidak ditemukan', 404));
          }
        } catch (error) {
            console.error(`Error : ${error.message}`);
            return res.status(500).json(errorResponse('Ada kesalahan', 500));
        }
    },
    sortedRecipe: async (req, res) => {
        console.log('Control: Running sort recipe');
        try {
          const { sortby, sort, limit } = req.query;
          let page = parseInt(req.query.page) || 1;
          const limiter = parseInt(limit) || 5;
          const offset = (page - 1) * limiter;
      
          const post = {
            sortby: sortby || 'created_at',
            sort: sort || 'ASC',
            limit: limiter,
            offset: offset
          };
      
          const result = await sortRecipe(post);
      
          let pagination = {
            totalPage: Math.ceil(result.count / limiter),
            totalData: parseInt(result.count),
            pageNow: page
          };
      
          if (result.rows.length > 0) {
              console.log(result.rows);
              return res.status(200).json(successResponse(result.rows, pagination));
          } else {
              console.log('Data tidak ditemukan');
              return res.status(404).json(errorResponse('Data tidak ditemukan', 404));
          }
        } catch (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json(errorResponse('Ada kesalahan', 500));
        }
      },
      searchedRecipe: async (req, res) => {
        console.log('Control: Running search recipe')
        try {
          const {search} = req.query
          let post = {
            search: search
          }
          const result = await searchRecipe(post);
          if (result.rowCount > 0) {
            console.log(result.rows);
            return res.status(200).json(successResponse(result.rows, 'Berhasil'));
          } else {
            console.log('Data tidak ditemukan')
            return res.status(404).json(errorResponse('Data tidak ditemukan', 404));
          }
        } catch (error) {
            console.error(`Error : ${error.message}`);
            return res.status(500).json(errorResponse('Ada kesalahan', 500));
        }
      }
}

module.exports = recipeController