var request = require('request'); //node module for http post requests
var moviePosterCard = require('./MoviePosterCard');
exports.retreiveMessage = function (session){

    request.post({
        url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/276e4dbf-91c7-46d4-b4d3-a40aa26e0d3c/url?iterationId=841b2d09-227e-40b7-b07d-7f0aff0664a9',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Prediction-Key': '276ff48006a24c9e803072f4783da479'
        },
        body: { 'Url': session.message.text }
    }, function(error, response, body){
        //console.log(validResponse(body));
        // session.send(validResponse(body));
        displayMoviePosterCard(session, body);
    });
}

// function validResponse(body){
//     if (body && body.Predictions && body.Predictions[0].Tag){
//         return "This is " + body.Predictions[0].Tag
//     } else{
//         console.log('Oops, please try again!');
//     }
// }

function displayMoviePosterCard(session, body){
    if (body && body.Predictions && body.Predictions[0].Tag){
        var movieTitle = body.Predictions[0].Tag
        moviePosterCard.displayMovieCards(session, movieTitle);
    } else{
        console.log('Oops, please try again!');
    }
}