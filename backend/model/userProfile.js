const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
    uid: {
    type: String,
    required: true,
    unique: true
  },
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    phoneno:{
        type: Number,
    },
    religion:{
        type: String,
    },
    bio:{
        type: String,
    },
    profilePicture:{
        type: String,
        default: "./profile.jpeg"
    },
})

const model = mongoose.model( 'users' , userProfileSchema)

module.exports = model;