var rest = require('../API/RestClient');

exports.displayFavouriteMusic = function getFavouriteMusic(session, username){
    var url = 'https://foodchatbotmsa.azurewebsites.net/tables/m_mBot';
    rest.getFavouriteMusic(url, session, username, handleFavouriteMusicResponse)
};

function handleFavouriteMusicResponse(message, session, username) {
    var favouriteMusicResponse = JSON.parse(message);
    var allMusic = [];
    for (var index in favouriteMusicResponse) {
        var usernameReceived = favouriteMusicResponse[index].username;
        var favouriteMusic = favouriteMusicResponse[index].favouriteMusic;

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase()) {
            //Add a comma after all favourite foods unless last one
            if(favouriteMusicResponse.length - 1) {
                allMusic.push(favouriteMusic);
            }
            else {
                allMusic.push(favouriteMusic + ', ');
            }
        }        
    }
    
    // Print all favourite foods for the user that is currently logged in
    session.send("%s, your favourite music are: %s", username, allMusic);                
    
}

exports.deleteFavouriteMusic = function deleteFavouriteMusic(session,username,favouriteMusic){
    var url  = 'https://foodchatbotmsa.azurewebsites.net/tables/m_mBot';


    rest.getFavouriteMusic(url,session, username,function(message,session,username){
     var   allMusic = JSON.parse(message);

        for(var i in allMusic) {

            if (allMusic[i].favouriteMusic === favouriteMusic && allMusic[i].username === username) {

                console.log(allMusic[i]);

                rest.deleteFavouriteMusic(url,session,username,favouriteMusic, allMusic[i].id ,handleDeletedMusicResponse)

            }
        }
    });
};

function handleDeletedMusicResponse(body,session,username, favouriteMusic) {
    console.log('Done');
}

exports.sendFavouriteMusic = function postFavouriteMusic(session, username, favouriteMusic){
    var url = 'https://foodchatbotmsa.azurewebsites.net/tables/m_mBot';
    rest.postFavouriteMusic(url, username, favouriteMusic);
};