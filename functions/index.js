const functions = require('firebase-functions');

var fetch = require('node-fetch');

const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.sendPushNotification = functions.database.ref()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
