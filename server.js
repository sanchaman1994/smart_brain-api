
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const register =require('./controllers/register');
const signin =require('./controllers/signin');
const profile =require('./controllers/profile');
const image =require('./controllers/image');

const db =	knex({
	    client: 'pg',
	    connection: {
		    host : '127.0.0.1',
		    user : 'sanchaman',
		    password : '',
		    database : 'smart-brain'
        }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());


// sign in 

app.post('/signin',(req, res)=>{ signin.handleSignin(req,res,db,bcrypt)});



// register user 

app.post('/register',(req, res) => {register.handleRegister(req,res,db,bcrypt)});

// progile


app.get('/profile/:id',(req, res)=>{ profile.handleProfileGet(req,res,db)});

// image

app.put('/image',(req,res)=>{ image.handleImage(req,res,db)});




app.listen(3000, ()=>{
	console.log('app is running on port 3000');
});
