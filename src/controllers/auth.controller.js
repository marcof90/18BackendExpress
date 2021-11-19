const User = require('../models/user')
const authService = require('../services/auth.service')
const msg = require('../helpers/messages')
const { validationResult } = require('express-validator') 
 
const authController = {   
    async login(req, res){
        try {
            const {email, password} = req.body
            if(!email || !password){
                res.status(400).json(msg.fieldsRequired)
            }
            let response = await authService.login(req.body)
            res.status(200).json(response)
        } catch (error) {
            // res.send(err)
            res.status(500).json({"error":error})
        }
    },
    async register(req, res){
        const errors = validationResult(req) 
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()})
        }
        try {
            const user = new User(req.body)
            let token = await authService.register(user)
            res.status(200).json({"token": token})
        } catch (error) {
            res.send(error)
        }
    },
    profile(req, res){
        try {
            const user = new User(req.body)
            // let token = await authService.register(user)
            // res.status(200).json({"token": token})
            res.send("bien")
        } catch (error) {
            res.send(error)
            // res.status(500).json({'error':error})
        }
    },
}

module.exports = authController