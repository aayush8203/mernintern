//user Schema

import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "node:crypto";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide your name"],
            trim: true,
            // remove extra spaces
            maxlength: [50, "Name should not be more than 50 characters"],
        },
        email: {
            type: String,
            required: [true, "Please provide your email"],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, "Please provide a valid email"]
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            minlength: [6, "Password should be at least 6 characters long"],
            select: false, // do not return password in any query

        },
        passwordConfirm: {
            type: String,
            required: [true, "Please confirm your password"],
            validate: {
                validator: function (el) {
                    return el === this.password;
                },
                message: "Passwords are not the same!"
            }
        },
        phoneNumber: {
            type: String,
            required: [true, "Please provide your phone number"],
            unique: true,
            trim: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        avatar: {
            url: {type: String},
            public_id: {type: String}
        },
        passwordChangedAt: {
            type: Date,
        },
        passwordResetToken:{
            type: String,
            select: false,
            index:true
        },
        passwordResetExpires:{
            type: Date,
            select: false,
        }
    },

    {timestamps: true}
)

userSchema.set("toJSON", {
    transform: function (doc, ret, options) {
        delete ret.password;
        delete ret.passwordConfirm;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
        delete ret.__v;
        return ret;
    
    }
});
     
//passwword logic
userSchema.pre("save", async function() {
    if (!this.isModified("password")) return ;
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    ;
})

// login check
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);

}
      
//
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }
    return false; // Password has not been changed
} 

//forgot password 
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}


export const User = mongoose.model("User", userSchema);

