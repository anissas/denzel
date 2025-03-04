const axios = require('axios');
const cheerio = require('cheerio');
const pLimit = require('p-limit');
const pSettle = require('p-settle');
const {IMDB_NAME_URL, IMDB_URL, P_LIMIT} = require('./constants');

/**
 * Get filmography for a given actor
 * @param  {String}  actor - imdb id
 * @return {Array}
 */
const getFilmography = async actor => {
  try {
    const response = await axios(`${IMDB_NAME_URL}/${actor}`);
    const {data} = response;
    const $ = cheerio.load(data);

    return $('#filmo-head-actor + .filmo-category-section .filmo-row b a')
      .map((i, element) => {
        return {
          'link': `${IMDB_URL}${$(element).attr('href')}`,
          'title': $(element).text()
        };
      })
      .get();
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Get movie from an imdb link
 * @param  {String} link
 * @return {Object}
 */
const getMovie = async link => {
  try {
    const response = await axios(link);
    const {data} = response;
    const $ = cheerio.load(data);   
    const movie = {
      link,
      'metascore': Number($('.metacriticScore span').text()),
      'poster': $('.poster img').attr('src'),
      'rating': Number($('span[itemprop="ratingValue"]').text()),
      'synopsis': $('.summary_text')
        .text()
        .trim(),
      'title': $('.title_wrapper h1')
        .text()
        .trim(),
         'votes': Number(
        $('span[itemprop="ratingCount"]')
          .text()
          .replace(',', '.')
      ),
      'year': Number($('#titleYear a').text())

    };
    if(movie.poster == null){
      movie.poster = "https://i.ebayimg.com/images/g/9tUAAOSwcOJbbdFK/s-l640.jpg"
    }
    return movie;
  } catch (error) {
    console.error(error);
    return {};
  }
};

/**
 * Get all filmography for a given actor
 * @param  {String} actor
 * @return {Array}
 */
module.exports = async actor => {
  const limit = pLimit(P_LIMIT);
  const filmography = await getFilmography(actor);

  const promises = filmography.map(filmo => {
    return limit(async () => {
      return await getMovie(filmo.link);
    });
  });

  const results = await pSettle(promises);
  const isFulfilled = results
    .filter(result => result.isFulfilled)
    .map(result => result.value);

  return [].concat.apply([], isFulfilled);
};
