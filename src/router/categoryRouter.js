const {showCategoryOnly} = require('../controller/categoryController')
const app = require('express')
const router = app.Router()


router.get('/category', showCategoryOnly)


module.exports = router