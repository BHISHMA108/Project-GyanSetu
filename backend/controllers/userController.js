const mongoose = require('mongoose');

const userModel = require('../model/userProfile');
const localStorage = require('localStorage');


const fetchUser = async (req , res)=>{
    try{
        const id = req.params.id;
        const user = await userModel.findOne({uid: id});
        if(user){
            res.status(200).json({
                success: true,
                data: user
            })
        }else{
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
    }catch(error){
        console.log("Oops! Error in fetching user profile : ", error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateUser = async (req , res)=>{
    try{
        const body = req.params.body;
        const id = req.params.id;

        const updatedUser = await userModel.findOneAndReplace({uid : id}, req.body, {new: true});
        if(updatedUser){
            res.status(200).json({
                success: true,
                data: updatedUser
            })
        }
    }catch(error){
        console.log("Oops! Error in updating user profile : ", error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const addUser = async (req, res)=>{
    try{
        const id = req.params.id;
        const existingUser = await userModel.findOne({uid: id});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const newUser = await userModel.create({...req.body, uid: id})
        res.status(201).json({
            success: true,
            data: newUser
        })
    }catch(error){
        console.log("Oops! Error in adding user profile : ", error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {addUser , fetchUser , updateUser};