var rest = require('../API/RestClient');
var builder = require('botbuilder');

//Calls 'getYelpData' in RestClient.js with 'displayRestaurantCards' as callback to get list of restaurant information
exports.displayMusicAlbumCards = function getMusicAlbumData(session){
    var url ='http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=174f36952d07f45aec30c3ba9bb522ea&artist='+session.dialogData.artistName+'&album='+session.dialogData.albumName+'&format=json';
    
    rest.getMusicAPIData(url,session,displayMusicAlbumCards);
}

function displayMusicAlbumCards(message, session) {
    var attachment = [];
    var jsonResult = JSON.parse(message);
    
    //For each restaurant, add herocard with name, address, image and url in attachment
    var albumName = jsonResult.album.name;
    var artistName = jsonResult.album.artist;
    var imageURL = jsonResult.album.image[2]["#text"];

    var card =  new builder.HeroCard(session)
            .title(albumName)
            .subtitle(artistName)
            .images([
                builder.CardImage.create(session, imageURL)
            ])
            .buttons([
                builder.CardAction.imBack(session, 'Buy Album', 'Buy Album')
            ]);
            
        attachment.push(card);

    

    //Displays restaurant hero card carousel in chat box 
    var message = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(attachment);
    session.send(message);
}