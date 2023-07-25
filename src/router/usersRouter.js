const {showUsersOnly, registerUsers, login, delUsersByIdOnly} = require('../controller/usersController')
const app = require('express')
const router = app.Router()
const {protect} = require('../middleware/jwt')


router.get('/users', protect, showUsersOnly)
router.post('/users', registerUsers)
router.post('/login', login)
router.delete('/users/:id', protect, delUsersByIdOnly)


module.exports = router
