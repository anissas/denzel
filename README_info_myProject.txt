PROJECT INFORMATIONS ABOUT REACT AND THE API

->Link to my react-api: https://elastic-edison-bc49b9.netlify.com

My react-api site information:

Section:

-- MustWatch: 

Display a random movie with a metascore>70
You can refresh the page to see an other must watch random movie

-->Allmovies:

Display all the movies in the db

-- MovieByID:

Find a movie by an ID entered in the url
By default I have enter the id : 5e82fd47643b792b3450cdb1 in the url 
So the url is by default: https://elastic-edison-bc49b9.netlify.com/movie/5e82fd47643b792b3450cdb1

You can change the id in the url and refresh the page to find another movie

-- MovieByMetascore:

Find movies by the metascore and thelimit entered in the url
By default I have enter the metascore 77 and the limit 5
So the url is by default: https://elastic-edison-bc49b9.netlify.com/movies/search?limit=5&metascore=77

You can change the limit and the metascore in the url and refresh the page to find other movies

-- UpdateMovie:

Update a movie by an ID entered in the url (Add your review and the current date of your update)
By default I have enter the id : 5e82fd47643b792b3450cdb1 in the url 
So the url is by default: https://elastic-edison-bc49b9.netlify.com/movie/5e82fd47643b792b3450cdb1

You can change the id in the url and refresh the page to update another movie. 

⚠️ Don't forget to tap enter if you changes the id in the url.
Else if you do not tap enter you will update the movie with url by default.

If the operation is a success, you are redirect to the page which diplays the movie 
updated with your review added and the date of it.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

->Link to my api: https://server-theta-one.now.sh/

-- https://server-theta-one.now.sh/:
Display a test : no interaction with my DB.

-- https://server-theta-one.now.sh//movies:
Display all the movies in the DB

-- https://server-theta-one.now.sh/movie/:id:
Find a movie by an ID entered in the url

-- https://server-theta-one.now.sh/mustWatch/movie:
Display a random movie with a metascore>70

-- https://server-theta-one.now.sh/movies/search:
Exemple of url search: https://server-theta-one.now.sh/movies/search?limit=5&metascore=77
Find movies by the metascore and the limit entered in the url