const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;


var app = express();
var dummy = "dummy change";

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');


app.use( (req,res,next) => {
	var now = new Date().toString();
	var log = `${now} : ${req.method,req.url}`;
	
	fs.appendFile('server.log',log+'\n', (err) =>{
		if(err){
			console.log(err);
		}
	});
	console.log(log);
	next();
});

// app.use( (req,res,next) => {
// 	res.render('maintenance.hbs',{
// 		pageTitle: 'Under Maintenance',
// 		name:'Arun Jaganathan'
// 	});
// });

app.use(express.static(__dirname +'/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req,res) => {
	res.render('home.hbs',{
		pageTitle: 'Home Page',
		name:'Arun Jaganathan',
		likes: ['bikes','cycles']
	});	
});

app.get('/about', (req,res) => {
	res.render('about.hbs',{
		pageTitle: 'About Page',
		name:'Arun Jaganathan'
	});
});

app.get('/bad', (req,res) => {
	res.send({
		errorMessage:'Error handle requested'
	});
});

app.get('/projects', (req,res) => {
	res.render('projects.hbs', {
		pageTitle: 'Projects',
		name: 'Arun Jaganathan'
	});
});


app.listen(port , () => {
	console.log(`Server is up on port ${port}`);
});
