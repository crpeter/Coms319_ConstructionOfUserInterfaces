var config = {
    apiKey: "AIzaSyDWIbVY_BLO-6W1SJ3SUZiPijxN4Ian-mE",
    authDomain: "coms319-e4c91.firebaseapp.com",
    databaseURL: "https://coms319-e4c91.firebaseio.com",
    projectId: "coms319-e4c91",
    storageBucket: "coms319-e4c91.appspot.com",
    messagingSenderId: "805314466728"
  };
  firebase.initializeApp(config);
document.getElementById("login_div").style.display = "block";

data = []

function test() {
    var first = document.getElementById("fst_field").value;
    var second = document.getElementById("snd_field").value;

    var testKey = firebase.database().ref().child('test').push().key;
    firebase.database().ref('test/' + testKey).set({
        first: first,
        second: second,
      });
}

function ret() {
    return firebase.database().ref('test').once('value')
        .then(function(snapshot) {
            data = []
            snapshot.forEach(function(childSnapshot) {
                var key = childSnapshot.key;
                var childData = childSnapshot.val();
                console.log("key:", key, "val:", childData)
                data.push(childData.first + " " + childData.second)
            });
            console.log("data:", data)
        });
}