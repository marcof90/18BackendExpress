const express = require('express')
const incomeController = require('../controllers/income.controller')
const { check } = require('express-validator')
const router = express.Router()
const Auth = require('../middlewares/authentication')
const mail = require('../services/mail.service')
const Permission = require('../middlewares/permission')

/**
 * @api
 * @apiName
 * @apiGroup
 */
router.post('/', Auth, incomeController.add)
router.get('/', Auth, Permission.High,  incomeController.list)
router.get('/:id', incomeController.find)
router.get('/send/mail', async (req, res)=>{
    const data = await mail.send(
        'bennacho982@gmail.com','💰🤑 gana dinero con este truco',
        'Gran truco para ganar dinero')
    res.send(data)
})


module.exports = router