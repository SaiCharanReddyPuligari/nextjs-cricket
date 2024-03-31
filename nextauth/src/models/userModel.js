import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"], 
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgorPasswordToken: String,
    forgorPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

//How forgotpasswordtoken works
//The app sends the verifytoken and expiry to the database and user via email
//whenever you are trying to access it, it checks if the token is valid and is in expiry time
//if the token is expired, we aks the user to sign in
//similarly, we use the tokens for the forgot password to generate new password

//const User= mongoose.model("user", userSchema)

const User= mongoose.models.users || mongoose.model("users", userSchema)

//fro nextjs, we have to check if the users model already exists or not and
//with express mongodb makes all the letter lowercase and plural, but for next, it is better to give it in model
export default User;