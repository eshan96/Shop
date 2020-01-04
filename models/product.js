const mongoose = require('mongoose')

const productSchema = mongoose.Schema({

    product_name: {
        type: String,
        required: true,
        unique: true
    },

    product_type: {
        type: String,
        required: true
    },

    product_brand: {
        type: String,
        required: true
    },

    product_availability: {
        type: Boolean,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product