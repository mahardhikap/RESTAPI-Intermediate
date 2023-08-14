const {getRecipe, getRecipeById, postRecipe, putRecipeById, delRecipeById, sortRecipe, searchRecipe, getRecipeByUser, sortRecipeByUser} = require('../model/recipeModel')
const {successResponse, errorResponse} = require('../helper/handler')
const cloudinary = require('../config/cloudinary');



const recipeController = {
    showRecipeOnly: async (req, res) => {
        console.log('Control: Running get recipe')
        try {
          const result = await getRecipe();
          if (result.rowCount > 0) {
              console.log(result.rows);
              return res.status(200).json(successResponse(result.rows, 'Success!'));
          } else {
              console.log('Data tidak ditemukan')
              return res.status(404).json(errorResponse('Cant find data', 404));
          }
        } catch (error) {
            console.error(`Error : ${error.message}`);
            return res.status(500).json(errorResponse('Something is wrong', 500));
        }
    },
    showRecipeById: async (req, res) => {
        console.log('Control: Running get recipe')
        try {
        const {id} = req.params
          const result = await getRecipeById(id);
          if (result.rowCount > 0) {
              console.log(result.rows);
              return res.status(200).json(successResponse(result.rows, 'Success!'));
          } else {
              console.log('Data tidak ditemukan')
              return res.status(404).json(errorResponse('Cant find data', 404));
          }
        } catch (error) {
            console.error(`Error : ${error.message}`);
            return res.status(500).json(errorResponse('Something is wrong', 500));
        }
    },
    postRecipeOnly: async (req, res) => {
        console.log('Control: Running post recipe')
        try {
          
          const {title, ingredients, category_id} = req.body
          let users_id =  req.payload.id
          console.log(users_id)

          // const result_up = await cloudinary.uploader.upload(req.file.path, {folder:'recipe'})
          // console.log(result_up)

          let post = {
            title: title,
            // image: result_up.secure_url,
            // img_id: result_up.public_id,
            ingredients: ingredients,
            category_id: category_id,
            users_id
          }

          //setting untuk agar ketika tidak ada gambar diupload
          if (req.file) {
            const result_up = await cloudinary.uploader.upload(req.file.path, { folder: 'recipe' });
            console.log(result_up);

            post.image = result_up.secure_url;
            post.img_id = result_up.public_id;
          } else {
            post.image = 'https://i.ibb.co/M2JSRmW/noimage.png';
            post.img_id = 'no_image';
          }

          const result = await postRecipe(post);
          if (result.rowCount > 0) {
              console.log(result.rows);
              return res.status(200).json(successResponse(result.rows, 'Success!'));
          } else {
              console.log('Data tidak ditemukan')
              return res.status(404).json(errorResponse('Cant find data', 404));
          }
        } catch (error) {
            console.error(`Error : ${error.message}`);
            return res.status(500).json(errorResponse('Something is wrong', 500));
        }
    },
    putRecipeByIdOnly: async (req, res) => {
        console.log('Control: Running put recipe')
        try {
        const {id} = req.params
        const {title, ingredients, category_id} = req.body

        let dataRecipe = await getRecipeById(id);
        let result_up = null;

        if (req.file) {
            // Jika req.file ada, upload gambar baru dan delete gambar lama
            result_up = await cloudinary.uploader.upload(req.file.path, { folder: 'recipe' });
            await cloudinary.uploader.destroy(dataRecipe.rows[0].img_id);
        }

        // let dataRecipe =  await getRecipeById(id)
        // let result_up = await cloudinary.uploader.upload(req.file.path, {folder:'recipe'})
        // if(result_up){
        //   await cloudinary.uploader.destroy(dataRecipe.rows[0].img_id)
        // }

        let post = {
          id: id,
          title: title,
          // image: result_up.secure_url,
          // img_id: result_up.public_id,
          ingredients: ingredients,
          category_id: category_id
        }

        if (result_up) {
          // Jika gambar baru diupload, update properti image
            post.image = result_up.secure_url;
            post.img_id = result_up.public_id;
        } else {
            // Jika tidak ada gambar baru diupload, ambil gambar yang masih ada
            post.image = dataRecipe.rows[0].image;
            post.img_id = dataRecipe.rows[0].img_id;
        }

        let users_id = req.payload.id


        // console.log(dataRecipe.rows[0].users_id)
        // console.log(users_id)
          
        if(users_id != dataRecipe.rows[0].users_id){
            return res.status(404).json(errorResponse('This is not yout post!', 404))
        }

        const result = await putRecipeById(post);
          if (result.rowCount > 0) {
              console.log(result.rows);
              return res.status(200).json(successResponse(result.rows, 'Success!'));
          } else {
              console.log('Data tidak ditemukan')
              return res.status(404).json(errorResponse('Cant find data', 404));
          }
        } catch (error) {
            console.error(error);
            return res.status(500).json(errorResponse('Something is wrong', 500));
        }
    },
    delRecipeByIdOnly: async (req, res) => {
        console.log('Control: Running delete recipe')
        try {
          const {id} = req.params
        
          let dataRecipe =  await getRecipeById(id)
          let users_id = req.payload.id

          if(users_id != dataRecipe.rows[0].users_id){
            return res.status(404).json(errorResponse('This is not your post!', 404))
          }

          const result = await delRecipeById(id);
          if (result.rowCount > 0) {
            await cloudinary.uploader.destroy(dataRecipe.rows[0].img_id)
            console.log(result.rows);
            return res.status(200).json(successResponse(result.rows, 'Success!'));
          } else {
            console.log('Data tidak ditemukan')
            return res.status(404).json(errorResponse('Cant find data', 404));
          }
        } catch (error) {
            console.error(`Error : ${error.message}`);
            return res.status(500).json(errorResponse('Something is wrong', 500));
        }
    },
    sortedRecipe: async (req, res) => {
        console.log('Control: Running sort recipe');
        try {
          const { sortby, sort, limit } = req.query;
          let page = parseInt(req.query.page) || 1;
          let limiter = limit || 5
      
          const post = {
            sortby: sortby || 'created_at',
            sort: sort || 'ASC',
            limit: limit || 5,
            offset: (page - 1) * limiter
          };
          const resultTotal = await getRecipe()
          const result = await sortRecipe(post);
      
          let pagination = {
            totalPage: Math.ceil(resultTotal.rowCount / limiter),
            totalData: parseInt(result.count),
            pageNow: page
          };
      
          if (result.rows.length > 0) {
              console.log(result.rows);
              return res.status(200).json(successResponse(result.rows, pagination));
          } else {
              console.log('Data tidak ditemukan');
              return res.status(404).json(errorResponse('Cant find data', 404));
          }
        } catch (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json(errorResponse('Something is wrong', 500));
        }
      },
      searchedRecipe: async (req, res) => {
        console.log('Control: Running search recipe')
        try {
          const {searchby, search, sortby, sort, limit} = req.query
          let page = parseInt(req.query.page) || 1;
          let limiter = limit || 5

          const post = {
            sortby: sortby || 'created_at',
            sort: sort || 'ASC',
            limit: limit || 5,
            offset: (page - 1) * limiter,
            searchby: searchby || 'title',
            search: search 
          };
          const resultTotal = await getRecipe()
          const result = await searchRecipe(post);
          let pagination = {
            totalPage: Math.ceil(resultTotal.rowCount / limiter),
            totalData: parseInt(result.count),
            pageNow: page
          };
          if (result.rows.length > 0) {
            console.log(result.rows);
            return res.status(200).json(successResponse(result.rows, pagination));
          } else {
            console.log('Data tidak ditemukan');
            return res.status(404).json(errorResponse('Cant find data', 404));
          }
        } catch (error) {
            console.error(`Error : ${error.message}`);
            return res.status(500).json(errorResponse('Something is wrong', 500));
        }
      },
      showRecipeByUser: async (req, res) => {
        console.log('Control: Running get recipe by User')
        try {
          const {id} = req.params
          const result = await getRecipeByUser(id);
          if (result.rowCount > 0) {
              console.log(result.rows);
              return res.status(200).json(successResponse(result.rows, 'Success!'));
          } else {
              console.log('Data tidak ditemukan')
              return res.status(404).json(errorResponse('Cant find data', 404));
          }
        } catch (error) {
            console.error(`Error : ${error.message}`);
            return res.status(500).json(errorResponse('Something is wrong', 500));
        }
    },
    sortedRecipeByUserOnly: async (req, res) => {
      console.log('Control: Running sort recipe by users only');
      try {
        const { users_id, sortby, sort, limit } = req.query;
        let page = parseInt(req.query.page) || 1;
        let limiter = limit || 5
    
        const post = {
          sortby: sortby || 'created_at',
          sort: sort || 'ASC',
          limit: limit || 5,
          offset: (page - 1) * limiter,
          users_id: users_id
        };
        const resultTotal = await getRecipeByUser(users_id)
        const result = await sortRecipeByUser(post);
    
        let pagination = {
          totalPage: Math.ceil(resultTotal.rowCount / limiter),
          totalData: parseInt(result.count),
          pageNow: page
        };
    
        if (result.rows.length > 0) {
            console.log(result.rows);
            return res.status(200).json(successResponse(result.rows, pagination));
        } else {
            console.log('Data tidak ditemukan');
            return res.status(404).json(errorResponse('Cant find data', 404));
        }
      } catch (error) {
          console.error(`Error: ${error.message}`);
          return res.status(500).json(errorResponse('Something is wrong', 500));
      }
    }
}

module.exports = recipeController