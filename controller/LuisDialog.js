var builder = require('botbuilder');
var customVision = require('./CustomVision');
var musicAlbum = require('./MusicAlbumCard');
var musicTrack = require('./MusicTrackCard');
var musicArtist = require('./MusicArtistCard');
var movieTitleCard = require('./MovieTitleCard');
var movie = require('./FavouriteMovie');
var music = require('./FavouriteMusic');

exports.startDialog = function (bot) {
    
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/c69d2f3f-fdbd-48aa-bb64-9cd95d509db5?subscription-key=5bde11256c654a1a9ba596c41916094f&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    bot.dialog('ShowOptions', function (session) {
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
            new builder.HeroCard(session)
                .title("Please, choose an option to enjoy our services.")
                .subtitle("You may either click an option or type an option.")
                .images([builder.CardImage.create(session, 'http://armdj.com/wp-content/uploads/2015/01/TMMN__HD_ROKU_APP_LOGO.jpg')])
                .buttons([
                    builder.CardAction.imBack(session, "Movie", "Movie"),
                    builder.CardAction.imBack(session, "Music", "Music"),
                    builder.CardAction.imBack(session, "Favourite", "Favourite")
                ])
        ]);
        session.send(msg).endDialog();
    }).triggerAction({
        matches: 'ShowOptions'
    });

    bot.dialog('Favourite', function (session) {
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
            new builder.HeroCard(session)
                .title("Please, choose an option to setup your favourite movie or music.")
                .subtitle("You may either click an option or type an option.")
                .images([builder.CardImage.create(session, 'http://armdj.com/wp-content/uploads/2015/01/TMMN__HD_ROKU_APP_LOGO.jpg')])
                .buttons([
                    builder.CardAction.imBack(session, "Favourite Music", "Favourite Music")
                ])
        ]);
        session.send(msg).endDialog();
    }).triggerAction({
        matches: 'Favourite'
    });

    bot.dialog('FavouriteMusic', function (session) {
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
            new builder.HeroCard(session)
                .title("Please, choose an option to view, add or delete your favourite music.")
                .subtitle("You may either click an option or type an option.")
                .images([builder.CardImage.create(session, 'http://armdj.com/wp-content/uploads/2015/01/TMMN__HD_ROKU_APP_LOGO.jpg')])
                .buttons([
                    builder.CardAction.imBack(session, "View My Favourite Music", "View My Favourite Music"),
                    builder.CardAction.imBack(session, "Add My Favourite Music", "Add My Favourite Music"),
                    builder.CardAction.imBack(session, "Delete My Favourite Music", "Delete My Favourite Music")
                ])
        ]);
        session.send(msg).endDialog();
    }).triggerAction({
        matches: 'FavouriteMusic'
    });

    bot.dialog('GetFavouriteMusic', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter a username to setup your account.");                
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
            

                if (results.response) {
                    session.conversationData["username"] = results.response;
                }

                session.send("Retrieving your favourite music");
                music.displayFavouriteMusic(session, session.conversationData["username"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
            
        }
    ]).triggerAction({
        matches: 'GetFavouriteMusic'
    });

    bot.dialog('AddFavouriteMusic', [
        
        function (session, next) {
            if (!session.dialogData["username"]) {
                builder.Prompts.text(session, "Enter a username to setup your account.");                
            } else {
                next(); // Skip if we already have this info.
            }
            
        },
        function(session, results, next) {
            if (results.response) {
                session.dialogData["username"] = results.response;
            }

            if (!session.dialogData["musicName"]) {
                builder.Prompts.text(session, "Enter a track name to setup your favourite music.");
            } else {
                next();
            }
        },
        function(session, results, next) {
            if (results.response) {
                session.dialogData["musicName"] = results.response;
            }

            if (session.dialogData["musicName"]) {
                session.send('Thanks for telling me that \'%s\' is your favourite music', session.dialogData["musicName"]);
                music.sendFavouriteMusic(session, session.dialogData["username"], session.dialogData["musicName"]);
            }
            
        }
    ]).triggerAction({
        matches: 'AddFavouriteMusic'
    });

    bot.dialog('DeleteFavouriteMusic', [
        
        function (session, next) {
            if (!session.dialogData["username"]) {
                builder.Prompts.text(session, "Enter a username to setup your account.");                
            } else {
                next(); // Skip if we already have this info.
            }
            
        },
        function(session, results, next) {
            if (results.response) {
                session.dialogData["username"] = results.response;
            }

            if (!session.dialogData["musicName"]) {
                builder.Prompts.text(session, "Enter a track name to delete from your favourite music list.");
            } else {
                next();
            }
        },
        function(session, results, next) {
            if (results.response) {
                session.dialogData["musicName"] = results.response;
            }

            if (session.dialogData["musicName"]) {
                session.send('Deleting \'%s\'...', session.dialogData["musicName"]);
                music.deleteFavouriteMusic(session, session.dialogData["username"], session.dialogData["musicName"]);
            }
            
        }
    ]).triggerAction({
        matches: 'DeleteFavouriteMusic'

    });

    bot.dialog('FindMovie', function (session) {
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
            new builder.HeroCard(session)
                .title("Please, choose an option to search a movie.")
                .subtitle("You may either click an option or type an option.")
                .images([builder.CardImage.create(session, 'http://armdj.com/wp-content/uploads/2015/01/TMMN__HD_ROKU_APP_LOGO.jpg')])
                .buttons([
                    builder.CardAction.imBack(session, "Movie Poster", "Movie Poster"),
                    builder.CardAction.imBack(session, "Movie Title", "Movie Title")
                ])
        ]);
        session.send(msg).endDialog();
    }).triggerAction({
        matches: 'FindMovie'
    });

    bot.dialog('FindMoviePoster', [
        function(session) {
            var msg = new builder.Message(session);
            msg.attachmentLayout(builder.AttachmentLayout.carousel)
            msg.attachments([
                new builder.HeroCard(session)
                    .title("Please, type a movie poster's url.")
                    .subtitle("You may click button below to find a url for a movie poster you want to search")
                    .buttons([
                        builder.CardAction.openUrl(session, "https://images.google.com", "Search poster's url")
                    ])
            ]);
            session.send(msg);  
            builder.Prompts.text(session, "E.G. http://www.impawards.com/2008/posters/dark_knight.jpg")
        },
        function(session, results) {
            if(results.response.includes('http')) {
                customVision.retreiveMessage(session);
                return true;
            }
            else {
                session.replaceDialog('FindMoviePoster');
            }
        }
    ]).triggerAction({
        matches: 'FindMoviePoster'
    });

    bot.dialog('FindMovieTitle', [
        function (session) {
            session.send("Here, you can search a movie by providing a movie title.")
            builder.Prompts.text(session, "Please provide a movie title.")
        },
        function(session, results) {
            session.dialogData.movieTitle = results.response;
            movieTitleCard.displayMovieCards(session);
        }
    ]).triggerAction({
        matches: 'FindMovieTitle'
    });

    bot.dialog('FindMusic', function (session) {
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
            new builder.HeroCard(session)
                .title("Please, choose an option.")
                .subtitle("You may either click an option or type an option.")
                .images([builder.CardImage.create(session, 'http://armdj.com/wp-content/uploads/2015/01/TMMN__HD_ROKU_APP_LOGO.jpg')])
                .buttons([
                    builder.CardAction.imBack(session, "Album", "Album"),
                    builder.CardAction.imBack(session, "Artist", "Artist"),
                    builder.CardAction.imBack(session, "Track", "Track")
                ])
        ]);
        session.send(msg).endDialog();
    }).triggerAction({
        matches: 'FindMusic'
    });

    bot.dialog('FindAlbum', [
        function (session) {
            session.send("Here, you can get detailed information about the album.")
            builder.Prompts.text(session, "Please provide an album name.")
        },
        function(session, results) {
            session.dialogData.albumName = results.response;
            builder.Prompts.text(session, "What is the artist name?");
        },
        function(session, results) {
            session.dialogData.artistName = results.response;
            musicAlbum.displayMusicAlbumCards(session);
        }
    ]).triggerAction({
        matches: 'FindAlbum'
    });

    bot.dialog('FindArtist', [
        function (session) {
            session.send("Here, you can get detailed information about the artist.")
            builder.Prompts.text(session, "Please provide an artist name.")
        },
        function(session, results) {
            session.dialogData.artistName = results.response;
            musicArtist.displayMusicArtistCards(session);
        }
    ]).triggerAction({
        matches: 'FindArtist'
    });

    bot.dialog('FindTrack', [
        function (session) {
            session.send("Here, you can get detailed information about the track.")
            builder.Prompts.text(session, "Please provide a track name.")
        },
        function(session, results) {
            session.dialogData.trackName = results.response;
            builder.Prompts.text(session, "What is the artist name?");
        },
        function(session, results) {
            session.dialogData.artistName = results.response;
            musicTrack.displayMusicTrackCards(session);
        }
    ]).triggerAction({
        matches: 'FindTrack'
    });

    bot.dialog('GetFavouriteMovie', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter a username to setup your account.");                
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
            

                if (results.response) {
                    session.conversationData["username"] = results.response;
                }

                session.send("Retrieving your favourite movies");
                movie.displayFavouriteMovie(session, session.conversationData["username"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
            
        }
    ]).triggerAction({
        matches: 'GetFavouriteMovie'
    });

    bot.dialog('AddFavouriteMovie', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter a username to setup your account.");                
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
            

                if (results.response) {
                    session.conversationData["username"] = results.response;
                }
                // Pulls out the food entity from the session if it exists
                var movieEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'movie');
    
                // Checks if the food entity was found
                if (movieEntity) {
                    session.send('Thanks for telling me that \'%s\' is your favourite movie', movieEntity.entity);
                    movie.sendFavouriteMovie(session, session.conversationData["username"], movieEntity.entity); // <-- LINE WE WANT
    
                } else {
                    session.send("No movie identified!!!");
                }
            
        }
    ]).triggerAction({
        matches: 'AddFavouriteMovie'
    });
}