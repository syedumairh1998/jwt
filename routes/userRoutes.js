import express from 'express'
import checkUserAuth from '../middlewares/auth-middleware.js'
const router = express.Router()
import { userRegistration, userLogin, changePassword, loggedUser } from '../controllers/UserController.js'


router.use('/changepassword',checkUserAuth)
router.use('/loggedUser',checkUserAuth)


router.post('/register', userRegistration)
router.post('/login', userLogin)
router.post('/changepassword', changePassword)
router.post('/loggedUser', loggedUser)

export default router