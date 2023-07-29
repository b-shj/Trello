// Server Packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User.js');
const cardRoutes = require('./routes/cardRoutes.js');
const taskRoutes = require('./routes/taskRoutes.js');

dotenv.config()


// Session Packages
const session = require('express-session');
const MongoStore = require('connect-mongo');

//DATABASE CONNECTION
mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });


// Utility Packages/Functions
const { v4: uuidv4 } = require('uuid');
const isValidPass = (currPass) => {
    let hasNumber = false;
    let hasCapLetter = false;
    let isLongEnough = false;

    if (currPass.length >= 5) {
        isLongEnough = true;
    }

    for (let i = 0; i < currPass.length; i++) {
        if (isCap(currPass.charAt(i))){
            hasCapLetter = true;
        }
        else if (isNumber(currPass.charAt(i))){
            hasNumber = true;
        }

        if (hasNumber && hasCapLetter && isLongEnough){
            return true;
        }
    }

    return false;
}
const isLetter = (character) => {
    return character.toUpperCase() !== character.toLowerCase();
}
const isNumber = (character) => {
    if (character >= '0' && character <= '9') {
        return true;
    }
    else {
        return  false;
    }
}
const isCap = (character) => {
    if (!isLetter(character)){
        return false;
    }
    else{
        if (character.toUpperCase() === character){
            return true
        }
        else {
            return false
        }
    }
}

// Initialize App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(session({
    store: new MongoStore({
        mongoUrl: process.env.CONNECTION_URL,
        collection: 'user_sessions',
        }),
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false,
        httpOnly: false,
        }  
    }
));



// ROUTES
app.use('/cards', cardRoutes)
app.use('/tasks', taskRoutes)

// ---- AUTH ROUTES ----
app.get('/active', async (req, res, next) => {
    try {
         
        const user_id = req.session.user_id;
        const userMatch = await User.findOne({ userid: user_id });
        
        if (userMatch){
            res.json({
                sessionActive : true,
                userId : user_id
            })
        }
        else {
            res.json({
                sessionActive : false,
                userId : null
            }) 
            
        }
    }
    catch (error) {
      console.error(error.message)
    }
})


app.delete('/signout', function(req, res) {
    req.session.destroy((err) => {
       if(err){
          console.log(err);
       }
       else{
           req.destroy();
       }
    });
});



// Login Routes
app.post('/login', async (req, res) => {
    try {
        let sessionData = req.session;
        const {email, pass} = req.body;

        const user = await User.findOne({ email, pass });

        if (!user){
            res.json({
                success : false
            })
        }
        else{
            req.session.user_id = user.userid;
            console.log(req.session.user_id);
            res.json({
                success : true,
                email : user.email,
                userid : user.userid,
                sessionData : req.session
            })            
        }
    }
    catch (error) {
      console.error(error.message)
    }
});

app.post('/signup', async (req, res) => {
    try {
        const {email, pass, passConfirm} = req.body;
        if (pass === passConfirm && isValidPass(pass)){
            
            const userid = uuidv4();

            await User.create({ email, pass, userid });

            res.json({
                success : true,
                error : null
            })

        }
        else {
            let error=''
            if (pass !== passConfirm) {
                error = "Passwords Don't Match";
            } else if (!isValidPass(pass)) {
                error = 'Passwords Not Valid';
            } else {
                error = "Passwords Don't Match Nor Are Valid";
            }
            res.json({ success: false, error });
        }
    }
    catch (error) {
      console.error(error.message)
    }
});


// SERVER LISTEN/START
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server has up and running at ${PORT}`);
})