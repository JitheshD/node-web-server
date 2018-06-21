const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname +'/views/partials');

//app.set before app.use
//app.set set  various express related to the configuration
//here we use view engine (key value)
app.set('view engine','hbs');



app.use((req,res,next) =>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	fs.appendFile('server.log',log + '\n');
	console.log(now);
	next();
});

hbs.registerHelper('getCompleteYear',()=>{
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text) =>{
	return text.toUpperCase();
});

// app.use((req,res,next) => {
// 	res.render('maintainance.hbs',{
// 		pageTitle:'maintainance Page'
// 	});
// });

app.use(express.static(__dirname + '/public'));

//create an handler to handle http get request
app.get('/', (request, response) =>{
	//response.send('Hello Express..!');

	//response.send({
	//	name:'Jithesh',
	//	likes:[
		//	'WebApp devoloper',
			//'Photo editing'
		//]
	//});
	response.render('home.hbs',{
		pageTitle:'Home Page',
		welcomeMessage:'Welcome User'
	})
});

app.get('/about', (request, response) =>{
	response.render('about.hbs',{
		pageTitle:'About Page'
		});
});

app.get('/project', (req,res) =>{
	res.render('project.hbs',{
		pageTitle: "Project page"
	});
});

app.get('/bad', (req, res)=>{
	res.send({
		errorMessage:'Unable trace your request'
	});

});



//listen is bind an application to the port on our mechine (local port -3000)
app.listen(port,() =>{
	console.log(`Server is started with port ${port}`);
});
