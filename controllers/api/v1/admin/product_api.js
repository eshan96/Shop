const Product = require('../../../../models/product')

module.exports.create = async function(req, res) {
    
    Product.create({
        product_name: req.body.product_name,
        product_type: req.body.product_type,
        product_brand: req.body.product_brand,
        product_availability: req.body.product_availability,
        user: req.user._id
    }, function(err, product) {
        if(err) {
            console.log("error....", err)
            return res.json(422,{
                message: "Error in adding the product"
            })
        }

        return res.json(200, {
            message: "Product successfully added",
            product_info: product
        })
    })
}


module.exports.destroy = async function(req, res) {

     let product = await Product.findById(req.params.id)

     if(product.user == req.user.id) {
         product.remove()
         return res.json(200, {
             message: "Product deleted Successfully"
         })
     }else{
         return res.json(401, {
             message: "You cannot delete this Product"
         })
     }
}