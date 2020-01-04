const express = require('express')
const app = express()
const port = 8000

const db = require('./config/mongoose')
const session = require('express-session')
const passport = require('passport')
const passportJWT = require('./config/passport-jwt-strategy')
const MongoStore = require('connect-mongo')(session)
app.use(express.urlencoded())

app.use(session({
    name: 'agg',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100),
    },
    store: new MongoStore(
        {
       
            mongooseConnection: db,
            autoRemove: 'disabled'
        
    },
    function(err){
        console.log(err)
    }
    )
}))

app.use(passport.initialize())
app.use(passport.session())




app.use('/', require('./routes'))


app.listen(port, function(err) {
    if(err) {
        console.log('Error in running the server:', err)
    }
  console.log('Server is running on port', port)
    
})
