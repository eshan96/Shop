const nodeMailer = require('../config/nodemailer')


exports.userLogin = (user) => {
    console.log('inside new comment mailer', user)


    nodeMailer.transporter.sendMail({
        from: 'eshanjindal9@gmail.com',
        to: user.email,
        subject: "Successfully logged in",
        html: '<h1>You have successfully logged in !!<h1>'
    }, (err, info) => {
           if(err){
               console.log('Error in sending the mail', err)
               return
           }  

           console.log('Mail delivered', info)
           return
    })
}