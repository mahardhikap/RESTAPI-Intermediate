const {showRecipeOnly, postRecipeOnly, putRecipeByIdOnly, delRecipeByIdOnly, sortedRecipe, searchedRecipe, showRecipeById} = require('../controller/recipeController')
const app = require('express')
const router = app.Router()
const {protect} = require('../middleware/jwt')
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });


router.get('/recipe', showRecipeOnly)
router.post('/recipe', protect, upload.single('image'), postRecipeOnly)
router.put('/recipe/:id', protect, putRecipeByIdOnly)
router.delete('/recipe/:id', protect, delRecipeByIdOnly)
router.get('/recipe/sorted', sortedRecipe)
router.get('/recipe/searched', searchedRecipe)
router.get('/recipebyid/:id', showRecipeById)



module.exports = router