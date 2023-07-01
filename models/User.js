import mongoose from "mongoose";
import bcryptjs from "bcryptjs"


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true },
    },
    password: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        lowercase: true,
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
    },
    createDate: {
        type: Date,
        required: false
    },
    userType: {
        type: String,
        required: true
    },
    refid: {
        type: Boolean,
        required: true
    },
    img: {
        type: String,
        required: false
    }
});

userSchema.pre('save', async function(next) {
    const user = this;
    console.log(user)
    if(!user.isModified('password')) return next();
    try {
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt);
        next()
    }
     catch (error) {
        console.log(error);
        throw new Error('error in has')
     }
});

// userSchema.method.comparePassword = async function(clientPassword) {
//     return await bcryptjs.compare(clientPassword, this.password)
// };
userSchema.method('comparePassword', async function (clientPassword) {
    return await bcryptjs.compare(clientPassword, this.password)
})
export const User = mongoose.model("User", userSchema);