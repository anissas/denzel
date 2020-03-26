const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://sayah:anissa@denzelclust-q0ngc.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser:true, useUnifiedTopology: true });
const imdb = require('./imdb');
ObjectID = require('mongodb').ObjectID;


/**
 * Connect to my cluster in Mongo 
 * Drop the table (for maj in imdb) 
 * call the createListing function which inserts the data in the database
 * @param  {String} actor
*/ 
module.exports.insertData = async(actor)=>{  
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        if((await client.db("myDB").collection("test").countDocuments())>0)
        {await client.db("myDB").collection("test").drop(); }
        await createListing(client, actor);
        var movies = client.db("myDB").collection("test").find(); 
        movies = await movies.toArray();
        return movies;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

/**
 * Insert the movies in the DB
 * @param  {MongoClient} client
 * @param  {String} actor
*/
async function createListing(client, actor){
    const movies = await imdb(actor); 
    const result = await client.db("myDB").collection("test").insertMany(movies);
    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);
}


/**
 * Find a random must watch movie(with metascore > 70) in the DB
*/
module.exports.rndMustWatchMovie = async()=>{
 try {
        // Connect to the MongoDB cluster
        await client.connect();
        var n = await client.db("myDB").collection("test").countDocuments({"metascore":{$gt:70}});
        var mustWatchMovies = await client.db("myDB").collection("test").find({"metascore":{$gt:70}});
        var rnd = Math.floor(Math.random() * (n));
        movie = await mustWatchMovies.toArray();
        console.log(movie[rnd]);
        return movie[rnd];
     } catch (e) {
        console.error(e);
    } 
}

/**
 * Find a movie by ID in the DB
 * @param  {Int} id
*/
module.exports.findMovieByID = async(id)=>{
    try {
        // Connect to the MongoDB cluster
        movie = []
        await client.connect();
        var objectId = new ObjectID(id);
        var query = await client.db("myDB").collection("test").findOne({ "_id": objectId});
        await movie.push(query);
        return movie;
    } catch (e) {
        console.error(e);
    } 
}

/**
 * Find the movies by metascore and with a defined limit
 * @param  {Int} limit
 * @param  {Int} metascore
 * @return {Array} 
*/
module.exports.findMovieByMetascore = async(limit, metascore)=>{
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        var query = await client.db("myDB").collection("test").find({ "metascore": metascore}).limit(limit);
        movies = await query.toArray();
        console.log(movies);
        return movies;
    } catch (e) {
        console.error(e);
    } 
}

/**
 * Find a movie by ID
 * Update this movie with the new fields date and review
 * @param  {Int} Id
 * @param  {Int} da(=date)
 * @param  {String} rev(=review)
 * return the movie updated
*/
module.exports.updateMovieByID = async(id, da, rev)=>{
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        var objectId = new ObjectID(id);
        var query = await client.db("myDB").collection("test").aggregate([{ $match: { "_id": objectId } }, { $addFields:{"date": da, "review": rev}}]);
        const movie = await query.toArray();
        return movie;
    } catch (e) {
        console.error(e);
    } 
}


module.exports.find = async()=>{
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        var query = await client.db("myDB").collection("test").find();
        const movie = await query.toArray();
        return movie;
    } catch (e) {
        console.error(e);
    } 
}