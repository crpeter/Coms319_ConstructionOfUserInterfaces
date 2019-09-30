'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const logging = require('@google-cloud/logging');

// When a user is created, save the time of creation inside user
exports.userCreatedListener = functions.auth.user().onCreate((user) => {
      return admin.database().ref(`/users/${user.uid}`)
                             .update({ time_created: admin.database.ServerValue.TIMESTAMP });
  });

// When a user deletes their account, clean up after them
exports.cleanupUser = functions.auth.user().onDelete((user) => {
  return admin.database().ref(`/users/${user.uid}`).once('value').then(() => {
        return admin.database().ref(`/users/${user.uid}`).remove();
      }).then(() => {
        const messageRef = admin.database().ref('/messages/');
        return messageRef.once('value').then(snapshot => {
          snapshot.forEach(function(child) {
            console.log("key: ", child.key);
            var value = child.val()
            const sender = value.sender
            const recipient = value.recipient
            const id = value.id;
            console.log("value: ", sender, recipient)
            if (user.uid == sender || user.uid == recipient) {
              console.log("found removable message")
              messageRef.child(`${id}`).remove();
            }
        });
      })
    });
  });