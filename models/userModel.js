import mongoose from "mongoose"
import crypto from "crypto"

import {v4 as uuidv4} from "uuid"


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:true,
        trim:true,
        unique:true,
        required:true
    },
    hashed_password:{
        type:String,
        required:true
    },
    salt:{
        type:String
    },
    role:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

// virtual field

userSchema  .virtual("password")
            .set(function(password){
                this._password = password;
                this.salt = uuidv4,
                this,hashed_password = this.encryptPassword(password)
            })
            .get(function(){
                return this._password
            })

userSchema.methods = {
    auth:function(plainText){
        return this.encryptPassword(plainText)===this.hashed_password
    },
    encryptPassword:function(password){
        if(!password) return "";
        try{
            return crypto
                        .createHmac("sha1",this.salt)
                        .update(password)
                        .digest("hex")
        }
        catch(err){
            return "";
        }
    }
}            

// exclude the unwanted fields

userSchema.methods.toJSON = function(){
    var obj = this.toObject();
    delete obj.hashed_password
    delete obj.salt
    delete obj.__v
    delete obj
}

module.exports = mongoose.model("User",userSchema)