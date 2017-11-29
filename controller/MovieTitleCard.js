var rest = require('../API/RestClient');
var builder = require('botbuilder');

//Calls 'getYelpData' in RestClient.js with 'displayRestaurantCards' as callback to get list of restaurant information
exports.displayMovieCards = function getMovie(session){
    var url ='http://www.omdbapi.com/?apikey=6afd21ad&s='+session.dialogData.movieTitle;
    
    
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
    var movies = JSON.parse(message);
    
    for (var index in movies.Search) {
        var movie = movies.Search[index];
        var name = movie.Title;
        var year = movie.Year;
        var posterURL = movie.Poster;
        var idForURL = movie.imdbID;
        var URL = 'http://www.imdb.com/title/'+idForURL;
        

        var card = new builder.HeroCard(session)
            .title(name)
            .subtitle(year)
            .images([
                builder.CardImage.create(session, posterURL)])
            .buttons([
                builder.CardAction.openUrl(session, URL, 'More Information')
            ]);
        attachment.push(card);

    }

    

    //Displays restaurant hero card carousel in chat box 
    var message = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(attachment);
    session.send(message);
}