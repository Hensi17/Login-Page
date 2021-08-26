const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

const User = require('./models/User');
const team = require('./models/team');


// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://hensiha:t0173663e@nodesupp.zzph5.mongodb.net/Database_delta?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(3000);
        console.log("connected to db");
    })
    .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

app.get('/login/failure', (req, res) => {
    res.render('login_fail', { title: 'Login_fail' });
});

app.get('/logout', (req, res) => {
    res.render('login', { title: 'Login' });
});




var temp1, temp2;

app.post('/login', urlencodedParser, (req, res) => {
    temp1 = req.body.username;
    temp2 = req.body.password;
    var r;
    User.find({ 'Username': temp1 }, 'Password', function(err, r) {
        if (err) {
            res.redirect("/404");
        } else {
            console.log(r);
        }
        if (r.length > 0) {
            console.log(r[0].Password);
            var x = r[0].Password;
            if (x == temp2) {
                res.render('dashboard', { title: 'dashboard', temp1 });
            } else {
                res.redirect("/login/failure");
            }
        }
    });
    module.exports = temp1;
});

app.get('/home', (req, res) => {
    res.render('dashboard', { title: 'dashboard', temp1 });
});

app.post('/login/failure', urlencodedParser, (req, res) => {
    temp1 = req.body.username;
    temp2 = req.body.password;
    var r;
    User.find({ 'Username': temp1 }, 'Password', function(err, r) {
        if (err) {
            res.redirect("/404");
        } else {
            console.log(r);
        }
        if (r.length > 0) {
            console.log(r[0].Password);
            var x = r[0].Password;
            if (x == temp2) {
                res.render('dashboard', { title: 'dashboard', temp1 });
            } else {
                res.redirect("/login/failure");
            }
        }
    });
});


app.get('/register', (req, res) => {
    res.render('Register', { title: 'Register' });
});

app.get('/register/fail', (req, res) => {
    res.render('register_fail', { title: 'register_fail' });
});

app.get('/create/team', (req, res) => {
    res.render('create_team', { title: 'create_team' });
});

app.get('/my/team', (req, res) => {
    res.render('my_team', { title: 'my team' });
});

app.get('/create/team/fail', (req, res) => {
    res.render('team_fail', { title: 'team fail' });
});

app.post('/register', urlencodedParser, (req, res) => {

    var temp_name = req.body.name;
    var temp_phno = req.body.contact_number;
    var temp_email = req.body.emailId;
    var temp_username = req.body.username;
    var temp_password = req.body.password;

    const user = new User({
        Name: temp_name,
        EmailId: temp_email,
        PhoneNumber: temp_phno,
        Username: temp_username,
        Password: temp_password
    });
    user.save()
        .then((result) => {
            console.log(result);
            res.render('register_suc', { title: 'Register_suc' });
        })
        .catch((err) => {
            console.log(err);
            res.redirect("register/fail");
        });
});

app.post('/register/fail', urlencodedParser, (req, res) => {

    var temp_name = req.body.name;
    var temp_phno = req.body.contact_number;
    var temp_email = req.body.emailId;
    var temp_username = req.body.username;
    var temp_password = req.body.password;

    const user = new User({
        Name: temp_name,
        EmailId: temp_email,
        PhoneNumber: temp_phno,
        Username: temp_username,
        Password: temp_password,
        teams: null,
    });
    user.save()
        .then((result) => {
            console.log(result);
            res.render('register_suc', { title: 'Register_suc' });
        })
        .catch((err) => {
            console.log(err);
            res.redirect("register/fail");
        });
});

app.post('/create/team', urlencodedParser, (req, res) => {

    var temp_n = req.body.teamname;
    var temp_a = req.body.admin;

    const t = new team({
        teamname: temp_n,
        admin: temp_a,
    });
    t.save()
        .then((result) => {
            console.log(result);
            var p = result.admin[0];
            User.find({ 'Username': p }, 'teams', function(err, r) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(r);
                }
                if (r.length > 0) {
                    console.log(r[0].teams);
                    var x = r[0].teams[0];
                    if (temp_n != x) {
                        res.render('add_member', { title: 'add_member' });
                    }
                } else {
                    res.redirect("/create/team/fail");
                }
            });
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/create/team/fail");
        });
});



app.get('404', (req, res) => {
    res.render('404', { title: '404 error' });
});

