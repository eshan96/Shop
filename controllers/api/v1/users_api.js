const User = require('../../../models/user')
const jwt = require('jsonwebtoken')
const loginMailer = require('../../../mailers/login_mailer')

module.exports.create = function(req, res) {
    console.log('Confirm Password',req)
    if(req.body.password != req.body.confirm_password) {
        return res.json(422, {
            message: "Password and confirm Password does not match :("
        })
    }

    User.findOne({email: req.body.email}, function(err, user) {
        if(err) {
            return res.json(422, {
                message: "error in finding the user"
            })
        }
        if(!user) {
            User.create(req.body, function(err, user) {
                if(err) {
                   return res.json(422, {
                        message: "Error in creating user while signing up"
                    })
                }
                return res.json(200, {
                    message: "User created successfully",
                    user: user
                })
            })
        }else {
            return res.json(422, {
                message: "Not created"
            })
        }
    })
    
}


module.exports.createSession = async function(req, res) {
      //req.flash('success', 'Logged in Successfully')
    try{
        let user = await User.findOne({
            email: req.body.email
        })

        //loginMailer.userLogin(user)

        if(!user || user.password != req.body.password) {
            return res.json(422, {
                message: "Invalid username or password"
            })
        }
           var token = jwt.sign(user.toJSON(), 'agg')

            return res.json(200, {
            message: "Sign in successfull, here is your token, please keep it safe :)",
            data: {
                token: token,
                decoded: jwt.verify(token, 'agg')
            }
        })
    }catch(err) {
            return res.json(500, {
                message: "Internal Server Error"
            })
    }
    
    
}