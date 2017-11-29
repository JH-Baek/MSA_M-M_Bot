var restify = require('restify');
var builder = require('botbuilder');
var luis = require('./controller/LuisDialog');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: 'e3c16e69-29cc-4e2b-9c75-5d944329dc1a',
    appPassword: 'cihED04)!-tnruWYDHN811#'
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
// This bot ensures user's profile is up to date.
var bot = new builder.UniversalBot(connector, function (session) {
    session.send('Sorry, I did not understand \'%s\'. Type \'options\' if you need assistance.', session.message.text);
});

bot.on('conversationUpdate', function (message) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
            if (identity.id === message.address.bot.id) {
                bot.send(new builder.Message()
                    .address(message.address)
                    .text("Welcome to M&M. You may find information about Movie and Music. Pleas type 'options' for more information."));
            }
        });
    }
});




luis.startDialog(bot);

// bot.dialog('showShirts', function (session) {
//     var msg = new builder.Message(session);
//     msg.attachmentLayout(builder.AttachmentLayout.carousel)
//     msg.attachments([
//         new builder.HeroCard(session)
//             .title("Classic White T-Shirt")
//             .subtitle("100% Soft and Luxurious Cotton")
//             .text("Price is $25 and carried in sizes (S, M, L, and XL)")
//             .images([builder.CardImage.create(session, 'http://petersapparel.parseapp.com/img/whiteshirt.png')])
//             .buttons([
//                 builder.CardAction.imBack(session, "buy classic grey t-shirt", "grey Buy"),
//                 builder.CardAction.imBack(session, "buy classic white t-shirt", "white Buy")
//             ])
//     ]);
//     session.send(msg).endDialog();
// }).triggerAction({ matches: /^(show|list)/i });

// bot.on('conversationUpdate', function (message) {
//     if (message.membersAdded) {
//         message.membersAdded.forEach(function (identity) {
//             if (identity.id === message.address.bot.id) {
//                 var msg = new builder.Message();
//                 msg.attachmentLayout(builder.AttachmentLayout.carousel)
//                 msg.attachments([
//                     new builder.HeroCard()
//                         .title("Classic White T-Shirt")
//                         .subtitle("100% Soft and Luxurious Cotton")
//                         .text("Price is $25 and carried in sizes (S, M, L, and XL)")
//                         // .images([builder.CardImage.create(session, 'http://petersapparel.parseapp.com/img/whiteshirt.png')])
//                         // .buttons([
//                         //     builder.CardAction.imBack(session, "buy classic grey t-shirt", "grey Buy"),
//                         //     builder.CardAction.imBack(session, "buy classic white t-shirt", "white Buy")
//                         // ])
//                 ])
//                 bot.send(msg.address(message.address)).endDialog();
//             }
//         });
//     }
// });





// var bot = new builder.UniversalBot(connector, [
//     function (session) {
//         session.send("Welcome to the dinner reservation.");
//         builder.Prompts.time(session, "Please provide a reservation date and time (e.g.: June 6th at 5pm)");
//     },
//     function (session, results) {
//         session.dialogData.reservationDate = builder.EntityRecognizer.resolveTime([results.response]);
//         builder.Prompts.text(session, "How many people are in your party?");
//     },
//     function (session, results) {
//         session.dialogData.partySize = results.response;
//         builder.Prompts.text(session, "Who's name will this reservation be under?");
//     },
//     function (session, results) {
//         session.dialogData.reservationName = results.response;

//         // Process request and display reservation details
//         session.send(`Reservation confirmed. Reservation details: <br/>Date/Time: ${session.dialogData.reservationDate} <br/>Party size: ${session.dialogData.partySize} <br/>Reservation name: ${session.dialogData.reservationName}`);
//         session.endDialog();
//     }
// ]);