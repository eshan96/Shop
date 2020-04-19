const Product = require('../../../../models/product')
const User = require('../../../../models/user')

module.exports.create = async function(req, res) {

        if(req.user.id == "5e355ee3ce6736201a58a7c8") {

    Product.create({
        product_name: req.body.product_name,
        product_type: req.body.product_type,
        product_brand: req.body.product_brand,
        product_availability: req.body.product_availability,
        user: req.user._id
    }, function(err, product) {
        if(err) {
            console.log("error ", err)
            return res.json(422,{
                message: "Error in adding the product"
            })
        }

        return res.json(200, {
            message: "Product successfully added",
            product_info: product
        })
    })
}else{
    return res.json(401, {
        message: "You are not authorized to add the product on website"
    })
}
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


module.exports.update = async function(req, res) {

     let product = await Product.findById(req.params.id)
     
     if(product.user == req.user.id) {
         Product.findByIdAndUpdate(req.params.id, req.body, function(err, prod) {
              if(err) {
                  res.json(422, {
                      message: "Error in updating the product details"
                  })
              }else {
                  res.json(200, {
                      message: "Product has been updated successfully",
                      updated_product: prod
                  })
              }
         })
     }else {
         res.json(401, {
             message: "You are not authorized to edit the product details"
         })
     }
}