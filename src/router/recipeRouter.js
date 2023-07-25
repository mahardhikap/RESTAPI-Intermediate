const {showRecipeOnly, postRecipeOnly, putRecipeByIdOnly, delRecipeByIdOnly, sortedRecipe, searchedRecipe, showRecipeById} = require('../controller/recipeController')
const app = require('express')
const router = app.Router()
const {protect} = require('../middleware/jwt')


router.get('/recipe', showRecipeOnly)
router.post('/recipe', protect, postRecipeOnly)
router.put('/recipe/:id', protect, putRecipeByIdOnly)
router.delete('/recipe/:id', protect, delRecipeByIdOnly)
router.get('/recipe/sorted', sortedRecipe)
router.get('/recipe/searched', searchedRecipe)
router.get('/recipebyid/:id', showRecipeById)



module.exports = router