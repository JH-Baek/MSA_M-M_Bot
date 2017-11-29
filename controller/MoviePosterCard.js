var rest = require('../API/RestClient');
var builder = require('botbuilder');

//Calls 'getYelpData' in RestClient.js with 'displayRestaurantCards' as callback to get list of restaurant information
exports.displayMovieCards = function getMovie(session, movieTitle){
    var url ='http://www.omdbapi.com/?apikey=6afd21ad&t='+ movieTitle;
    
    
    rest.getMusicAPIData(url,session,displayMovieCards);
}

// function getMovieData(message, session){
//     var foodNutritionList = JSON.parse(message);
//     var ndbno = foodNutritionList.list.item[0].ndbno;
//     var url = "https://api.nal.usda.gov/ndb/reports/?ndbno="+ndbno+"&type=f&format=json&api_key=mYfzsyT8gjJWmiIYkHl7ILNxqBNO57HMwNHuWRNc";
    
//     rest.getMusicAPIData(url, session, foodName, displayNutritionCards);

// }

function displayMovieCards(message, session) {
    var attachment = [];
    var movie = JSON.parse(message);
    
    
    //For each restaurant, add herocard with name, address, image and url in attachment
    var title = movie.Title;
    var year = movie.Year;
    var releasedDate = movie.Released;
    var genre = movie.Genre;
    var director = movie.Director;
    var actors = movie.Actors;
    var plot = movie.Plot;
    var rating = movie.Ratings[0].Value;
    var posterURL = movie.Poster;
    

    var card =  new builder.HeroCard(session)
            .title(title)
            .subtitle(releasedDate)
            .text(director + '\n\nGenre: ' + genre + '\n\nActors: ' + actors + '\n\nRating: ' + rating + '\n\nPlot: ' + plot)
            
            .images([
                builder.CardImage.create(session, posterURL)
            ])
            
            
        attachment.push(card);

   
    

    //Displays restaurant hero card carousel in chat box 
    var message = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(attachment);
    session.send(message);
}