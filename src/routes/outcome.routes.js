const express = require('express')
const outcomeController = require('../controllers/outcome.controller')
const router = express.Router()
const Auth = require('../middlewares/authentication')

router.post('/', Auth, outcomeController.add)
router.get('/', Auth, outcomeController.list)
router.get('/:id', outcomeController.find)

module.exports = router