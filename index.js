const express = require('express')
const cors = require('cors')
const app = express()
const port = 8000

const bodyParser = require('body-parser')
const db = require('./config/mongoose')
const session = require('express-session')
const passport = require('passport')
const passportJWT = require('./config/passport-jwt-strategy')
const MongoStore = require('connect-mongo')(session)


var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use(bodyParser.urlencoded() );
app.use(bodyParser.json());






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
