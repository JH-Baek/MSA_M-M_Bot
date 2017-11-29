var rest = require('../API/RestClient');
var builder = require('botbuilder');

//Calls 'getYelpData' in RestClient.js with 'displayRestaurantCards' as callback to get list of restaurant information
exports.displayMusicArtistCards = function getMusicArtistData(session){
    var url ='http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+session.dialogData.artistName+'&api_key=174f36952d07f45aec30c3ba9bb522ea&format=json';
    
    
    rest.getMusicAPIData(url,session,displayMusicArtistCards);
}

function displayMusicArtistCards(message, session) {
    var attachment = [];
    var jsonResult = JSON.parse(message);
    
    //For each restaurant, add herocard with name, address, image and url in attachment
    var artistName = jsonResult.artist.name;
    var artistURL = jsonResult.artist.url;
    var artistWikiURL = jsonResult.artist.bio.links.link.href;
    var artistSummary = jsonResult.artist.bio.summary;
    var imageURL = jsonResult.artist.image[2]["#text"];

    var card =  new builder.HeroCard(session)
            .title(artistName)
            .subtitle(artistSummary)
            .images([
                builder.CardImage.create(session, imageURL)
            ])
            .buttons([
                builder.CardAction.openUrl(session, artistURL, 'More Information'),
                builder.CardAction.openUrl(session, artistWikiURL, 'More Information on Wiki')
            ]);
            
        attachment.push(card);

    

    //Displays restaurant hero card carousel in chat box 
    var message = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(attachment);
    session.send(message);
}