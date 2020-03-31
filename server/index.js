const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const {PORT} = require('./constants');
const mongoose = require('mongoose');
const data = require('./db.js');
const app = express(); 
module.exports = app;
app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());
const rp = require('request-promise');
app.options('*', cors());

let port = 3000;


app.get("/", async(request, response) =>{

	response.json({coucou:'test'}); 
});

app.get("/movies", async(request, response) =>{
	const movies = await data.find();

	response.json(movies); 
});


/**
 * Populate the database with all the Denzel's movies from IMDb.
*/ 
app.get("/movies/populate/:id", async(request, response) =>{
	const actorId = request.params.id;
	const movies = await data.insertData(actorId);
	response.json(movies); 
});

/**
 * Fetch a specific movie
*/ 
app.get("/movie/:id", async(request, response) =>{
	const itemId = request.params.id;
	const movie = await data.findMovieByID(itemId);
	console.log(movie);
	response.json(movie); 
});

/**
 * Fetch a random must-watch movie.
*/ 
app.get("/mustWatch/movie", async(request, response) =>{
	const movie = await data.rndMustWatchMovie();
	console.log(movie);
	response.json(movie); 
});


/**
 * Search for Denzel's movies.
*/ 
app.get("/movies/search", async(request, response) =>{
	var param = {
		"limit": request.query.limit,
        "metascore": request.query.metascore
    }; 
	const movie = await data.findMovieByMetascore(parseInt(param.limit), parseInt(param.metascore));
	if(movie != null){
		response.json(movie); 
	}
	else{
		response.send("There is no movie with this metascore: "+param.metascore);
	}
});


/**
 * Save a watched date and a review.
*/ 
app.post("/post/movie/:id", async(request, response) =>{
	const itemId = request.params.id;
	const date = request.body.date; 
    const review = request.body.review;

    if (!date || !review) { 
        response.send('Il manque un argument')
    }
	const movie = await data.updateMovieByID(itemId, date, review);

    response.json(movie);
});
 
/**
 * Check that the server is connected 
*/ 
app.listen(port, () =>  { 
    console.log('connected');
})


