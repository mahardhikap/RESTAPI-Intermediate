const {showUsersOnly, registerUsers, login, delUsersByIdOnly, showUsersById, putUsersByIdOnly} = require('../controller/usersController')
const app = require('express')
const router = app.Router()
const {protect} = require('../middleware/jwt')
const upload = require('../middleware/multer')


router.get('/users', protect, showUsersOnly)
router.post('/users', upload.single('photo'), registerUsers)
router.post('/login', login)
router.delete('/users/:id', protect, delUsersByIdOnly)
router.get('/users/id/:id', showUsersById)
router.put('/users/:id', protect, upload.single('photo'), putUsersByIdOnly)


module.exports = router
