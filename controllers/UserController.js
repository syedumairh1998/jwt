import UserModel from '../models/User.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()
const secret = process.env.secret;



const userRegistration = async (request, response) => {

    try {

        const { name, email, password, password_confirmation, tc } = request.body
        const user = await UserModel.findOne({ email })
        if (user) {
            return response.json({ message: 'User already exists' })
        }
        if (name && email && password && password_confirmation && tc) {
            if (password == password_confirmation) {
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, salt)
                const newUserDoc = new UserModel({ name, email, password: hashedPassword, tc })
                await newUserDoc.save()
                const savedUser = new UserModel({ email })

                const token = jwt.sign({ userID: savedUser._id }, secret, { expiresIn: '5d' })

                return response.json({ message: 'User created successfully', userDetail: newUserDoc, token },)

            }
            else {
                return response.json({ message: 'Password and confirm password do not match' })
            }
        }
        else {
            return response.json({ message: 'All fields are required' })
        }
    }
    catch (error) {
        console.log('Some error occurred in UserController', error)
        return response.json({ message: 'Some error occurred in UserController userRegistration function' })

    }
}

const userLogin = async (request, response) => {
    try {
        const { email, password } = request.body
        if (email && password) {
            const user = await UserModel.findOne({ email })
            if (user) {
                const isCorrectPassword = await bcrypt.compare(password, user.password)
                if (user.email == email && isCorrectPassword) {
                    const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '5d' })
                    return response.json({ message: 'User login successfull', userDetail: user, token })
                }
                else {
                    return response.json({ message: 'User login failed' })
                }
            }
            else {
                return response.json({ message: 'User does not exists' })
            }
        }
        else {
            return response.json({ message: 'Email and password are required' })
        }
    }
    catch (error) {
        console.log('Some error occurred in UserController login function', error)
        return response.json({ message: 'Some error occurred in UserController userLogin function' })
    }
}

const changePassword = async (request, response) => {


    try {
        const { password, confirmPassword } = request.body

        if (password && confirmPassword) {
            if (password === confirmPassword) {
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, salt)
                const updatedUser = await UserModel.findOneAndUpdate({ email: request.user.email }, { password: hashedPassword })
                if (updatedUser) {
                    return response.json({ message: 'Password changed successfully' })
                }
                else {
                    return response.json({ message: 'Password updation failed' })
                }
            }
            else {
                return response.json({ message: 'password and confirm password does not match' })
            }
        }
        else {
            return response.json({ message: 'All fields are required' })
        }
    }
    catch (error) {
        console.log('Some error occurred in UserController', error)
        return response.json({ message: 'Some error occurred in UserController changePassword function' })
    }
}

const loggedUser = async (request, response) => {


    try {
        return response.json({ message: 'user data', data: request.user })
    }
    catch (error) {
        console.log('Some error occurred in UserController', error)
        return response.json({ message: 'Some error occurred in UserController changePassword function' })
    }
}

export { userRegistration, userLogin, changePassword, loggedUser }