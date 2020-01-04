const express = require('express')

const router = express.Router()
const passport = require('passport')

const addProductApi = require('../../../controllers/api/v1/admin/product_api')

router.post('/admin/add-product', passport.authenticate('jwt', {session: false}), addProductApi.create)
router.delete('/admin/delete/:id',passport.authenticate('jwt', {session: false}), addProductApi.destroy)

module.exports = router