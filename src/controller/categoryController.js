const {getCategory} = require('../model/categoryModel')
const {successResponse, errorResponse} = require('../helper/handler')

const categoryController = {
    showCategoryOnly: async (req, res) => {
        console.log('Control: Running get recipe')
        try {
          const result = await getCategory();
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
    }
}

module.exports = categoryController