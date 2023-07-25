const {getUsers, getUsersByEmail, register, delUserById} = require('../model/usersModel')
const {successResponse, errorResponse} = require('../helper/handler')
const {hashPassword, verifyPassword} =  require('../middleware/bcrypt')
const {generateToken} = require('../middleware/jwt')

const usersController = {
    showUsersOnly: async (req, res) => {
    console.log('Control: Running get users')
    try {
      let users_roles = req.payload.roles
      console.log(users_roles)
      if(users_roles != 'admin'){
        return res.status(405).json(errorResponse('Tidak diizinkan melihat, admin only', 405))
      }
        const result = await getUsers();
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
    registerUsers: async (req, res) => {
        console.log('Control: Running register users')
        try {
          const {username, email, password, photo, roles} = req.body
          if(!username || !email || !password){
            return res.status(404).json(errorResponse('Username, email, password harus diisi', 404))
          }

          let user = await getUsersByEmail(email)
          if(user.rows[0]){
            return res.status(404).json(errorResponse('Email sudah digunakan', 404))
          }
          let post = {
            username: username,
            email: email,
            password: await hashPassword(password),
            photo: photo || 'default.png',
            roles: roles || 'member'
          }
          const result = await register(post);
          if (result.rowCount > 0) {
              console.log(result.rows);
              return res.status(200).json(successResponse(result.rowCount, 'Registrasi berhasil!'));
          } 
        } catch(error) {
            console.error(error.message)
            return res.status(500).json(errorResponse('Ada kesalahan', 500))
        }
    },
    login: async (req, res)=>{
        try {
          let {email, password} = req.body
          console.log(email, password)

          if(!email || !password){
              return res.status(404).json(errorResponse('Email dan password harus diisi', 404))
          }

          let data = await getUsersByEmail(email)
          // console.log(data.rows[0])

          if(!data.rows[0]){
              return res.status(404).json(errorResponse('Email belum terdaftar', 404))
          }

          let users = data.rows[0]
          console.log(users)
          const isPasswordMatch = await verifyPassword(password, users.password)
          if(isPasswordMatch){
            const token = generateToken(users)
            users.token = token
            return res.status(200).json(successResponse(users.token, `Correct, ini token untuk akses ${users.email}`))
          } else {
            return res.status(404).json(errorResponse('Incorrect', 404))
          }
        } catch (error) {
          console.error(error)
          res.status(500).json(errorResponse('error get token', 500))
        }
      },
    delUsersByIdOnly: async (req, res) => {
        console.log('Control: Running delete users')
        try {
          const {id} = req.params
        
          let post = {
            id: id
          }

          let users_id = req.payload.roles

          if(users_id != 'admin'){
            return res.status(404).json(errorResponse('Anda tidak memiliki izin, admin only!', 404))
          }

          const result = await delUserById(post);
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

module.exports = usersController