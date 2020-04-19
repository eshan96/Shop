const express = require('express')

const router = express.Router()
const passport = require('passport')

const productApi = require('../../../controllers/api/v1/admin/product_api')

router.post('/admin/add-product', passport.authenticate('jwt', {session: false}), productApi.create)
router.delete('/admin/delete/:id',passport.authenticate('jwt', {session: false}), productApi.destroy)
router.post('/admin/update/:id', passport.authenticate('jwt', {session: false}), productApi.update)

module.exports = router