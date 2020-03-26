/* eslint-disable no-console, no-process-exit */
const imdb = require('./imdb');
const fs = require('fs');

const DENZEL_IMDB_ID = 'nm0000243';
const METASCORE = 70;

async function start (actor = DENZEL_IMDB_ID, metascore = METASCORE) {
  try {
    console.log(`📽️  fetching filmography of ${actor}...`);
    const movies = await imdb(actor);
    const awesome = movies.filter(movie => movie.metascore >= metascore);
    fs.appendFileSync("movies.json", JSON.stringify(awesome, null, 2));
    //console.log(`🍿 ${movies.length} movies found.`);
    //console.log(JSON.stringify(movies, null, 2));
    //console.log(`🥇 ${awesome.length} awesome movies found.`);
    //console.log(JSON.stringify(awesome, null, 2));
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [, , id, metascore] = process.argv;

const data = start(id, metascore);


module.export = data;

