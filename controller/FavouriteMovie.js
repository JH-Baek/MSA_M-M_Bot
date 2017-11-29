var rest = require('../API/RestClient');

exports.displayFavouriteMovie = function getFavouriteMovie(session, username){
    var url = 'https://foodchatbotmsa.azurewebsites.net/tables/m_mBot';
    rest.getFavouriteMovie(url, session, username, handleFavouriteMovieResponse)
};

function handleFavouriteMovieResponse(message, session, username) {
    var favouriteMovieResponse = JSON.parse(message);
    var allMovies = [];
    for (var index in favouriteMovieResponse) {
        var usernameReceived = favouriteMovieResponse[index].username;
        var favouriteMovie = favouriteMovieResponse[index].favouriteMovie;

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase()) {
            //Add a comma after all favourite foods unless last one
            if(favouriteMovieResponse.length - 1) {
                allMovies.push(favouriteMovie);
            }
            else {
                allMovies.push(favouriteMovie + ', ');
            }
        }        
    }
    
    // Print all favourite foods for the user that is currently logged in
    session.send("%s, your favourite movies are: %s", username, allMovies);                
    
}

exports.deleteFavouriteMovie = function deleteFavouriteMovie(session,username,favouriteMovie){
    var url  = 'https://foodchatbotmsa.azurewebsites.net/tables/m_mBot';


    rest.getFavouriteMovie(url,session, username,function(message,session,username){
     var   allMovies = JSON.parse(message);

        for(var i in allMovies) {

            if (allMovies[i].favouriteMovie === favouriteMovie && allMovies[i].username === username) {

                console.log(allMovies[i]);

                rest.deleteFavouriteMovie(url,session,username,favouriteMovie, allMovies[i].id ,handleDeletedMovieResponse)

            }
        }
    });
};

function handleDeletedMovieResponse(body,session,username, favouriteMovie) {
    console.log('Done');
}

exports.sendFavouriteMovie = function postFavouriteMovie(session, username, favouriteMovie){
    var url = 'https://foodchatbotmsa.azurewebsites.net/tables/m_mBot';
    rest.postFavouriteMovie(url, username, favouriteMovie);
};