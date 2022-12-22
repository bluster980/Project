const mongoose = require('mongoose')
const express = require("express")
const bodyParser = require('body-parser');
const { response } = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const app = express();
app.use(express.static('public'));
mongoose.set('strictQuery', true);

const dburl = 'mongodb+srv://Jpd:Jpd123@clusterx.qykbyfg.mongodb.net/?retryWrites=true&w=majority';
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(dburl, connectionParams).then(() => {
    console.info("Connected To Database");
})

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

const User = mongoose.model('User', userSchema);


app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile((__dirname + '/index.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile((__dirname + '/signup.html'));
});
app.get('/home', (req, res) => {
    res.sendFile((__dirname + '/home.html'));
});
app.get('/about', (req, res) => {
    res.sendFile((__dirname + '/about.html'));
});
app.get('/service', (req, res) => {
    res.sendFile((__dirname + '/service.html'));
});
app.get('/design', (req, res) => {
    res.sendFile((__dirname + '/design.html'));
});
app.get('/contact', (req, res) => {
    res.sendFile((__dirname + '/contact.html'));
});

app.post('/', async (req, res) => {
    const mail = req.body.email;
    const pass = req.body.pwd;

    if(response.statusCode === 200){
        const ur = await User.findOne({email: mail});
            if (!ur){
                console.log("Login Failed");
                res.sendFile(__dirname + '/signup.html');
            }
            else{
                console.log(ur.password);
                const tyu = await comparePassword(pass,ur.password);                
            }
        async function comparePassword(plaintextPassword, hash) {
            bcrypt.compare(plaintextPassword, hash)
                .then(result => {
                    console.log(result);
                    if(result === true){
                        console.log("Successful");
                        res.sendFile(__dirname + '/home.html')
                    }
                    else{
                        console.log("Unsuccessful");
                        res.sendFile(__dirname + '/signup.html');
                    }
                    return result
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    // res.sendFile(__dirname + '/index.html');
});

app.post('/signup', async (req, res) => {
    const mail = req.body.email;
    const pass = req.body.pwd;
    hashPassword(pass);
    function hashPassword(plaintextPassword) {
        bcrypt.hash(plaintextPassword, 10)
            .then(hash => {
                console.log(hash);
                if (response.statusCode === 200) {
                    const newUser = new User({
                        email: mail,
                        password: hash
                    })
                    newUser.save();
                }   
            })
            .catch(err => {
                console.log(err)
            })
    }
    

    console.log(mail);
    console.log(pass);
    res.sendFile(__dirname + '/index.html');
});

app.listen(56789);