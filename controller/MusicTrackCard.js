var rest = require('../API/RestClient');
var builder = require('botbuilder');

//Calls 'getYelpData' in RestClient.js with 'displayRestaurantCards' as callback to get list of restaurant information
exports.displayMusicTrackCards = function getMusicTrackData(session){
    var url ='http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=174f36952d07f45aec30c3ba9bb522ea&artist='+session.dialogData.artistName+'&track='+session.dialogData.trackName+'&format=json';
    
    rest.getMusicAPIData(url,session,displayMusicTrackCards);
}

function displayMusicTrackCards(message, session) {
    var attachment = [];
    var jsonResult = JSON.parse(message);
    
    //For each restaurant, add herocard with name, address, image and url in attachment
    var trackName = jsonResult.track.name;
    var albumName = jsonResult.track.album.title;
    var artistName = jsonResult.track.artist.name;
    var albumImageURL = jsonResult.track.album.image[2]["#text"];
    var trackURL = jsonResult.track.url;
    var albumURL = jsonResult.track.album.url;
    var artisitURL = jsonResult.track.artist.url;

    var card =  new builder.HeroCard(session)
            .title('Track Name: '+ trackName)
            .subtitle('Album Name: '+ albumName)
            .text('Artisit Name: '+ artistName)
            .images([
                builder.CardImage.create(session, albumImageURL)
            ])
            .buttons([
                builder.CardAction.openUrl(session, trackURL, 'More Information About The Track'),
                builder.CardAction.openUrl(session, albumURL, 'More Information About The Album'),
                builder.CardAction.openUrl(session, artisitURL, 'More Information About The Artist'),
                builder.CardAction.imBack(session, 'Buy Track', 'Buy Track')
            ]);
            
        attachment.push(card);

    

    //Displays restaurant hero card carousel in chat box 
    var message = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(attachment);
    session.send(message);
}