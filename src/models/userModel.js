import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, "Plase provide email"],
        unique: true,

    },
    password:{
        type: String,
        required: [true, "Plase provide password"],
    },
    username:{
        type: String,
        required: [true, "Plase provide username"],
        unique: true,
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default: true,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiryToken: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,  
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;