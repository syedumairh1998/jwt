import jwt from 'jsonwebtoken'
import UserModel from '../models/User.js'
import dotenv from 'dotenv'
dotenv.config()
const secret = process.env.secret


const checkUserAuth = async (request, response, next) => {
    try {
        let token
        const { authorization } = request.headers
        if (authorization && authorization.startsWith('Bearer')) {
            token = authorization.split(' ')[1]
            const { userID } = jwt.verify(token, secret)
            request.user = await UserModel.findById(userID, { password: 0 })
            next()
        }
        else {
            return response.json({ message: 'User unauthorized - No token provided' })
        }
    }
    catch (error) {
        console.log(error)
        return response.json({ message: 'Some error occurred in auth-middleware.js' })
    }

}

export default checkUserAuth