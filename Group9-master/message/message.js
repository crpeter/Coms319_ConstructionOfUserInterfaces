var config = {
    apiKey: "AIzaSyDWIbVY_BLO-6W1SJ3SUZiPijxN4Ian-mE",
    authDomain: "coms319-e4c91.firebaseapp.com",
    databaseURL: "https://coms319-e4c91.firebaseio.com",
    projectId: "coms319-e4c91",
    storageBucket: "coms319-e4c91.appspot.com",
    messagingSenderId: "805314466728"
};
firebase.initializeApp(config);

var database = firebase.database();

var userList = []
var filteredList = []
var searchedString = ""
var messages = []
var isFiltering = false
var selectedUser = null
selectedRow = -1
var currentUID = ""
var currentEmail = ""
var firstAuthChange = false
var isMessages = false

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {//} && !firstAuthChange) {
        firstAuthChange = true
        currentUID = user.uid
        currentEmail = user.email
        updateUser()
        //console.log("current id:", currentEmail)
    } else {
        back();
      // No user is signed in.
    }
  });

function User(id, name) {
    this.id = id;
    this.name = name;
}

function Message(id, msg, recipient, sender, time) {
    this.id = id
    this.msg = msg
    this.recipient = recipient
    this.sender = sender
    this.time = time
}

function initMessage() {
    console.log("init message, current user:", currentUID)
    document.getElementById('search_text').addEventListener('input', function (e) {
        console.log("poop", e.data);
        isFiltering = true
        if (e.data != null) {
            searchedString += e.data
        } else {
            searchedString = searchedString.slice(0, -1);
            if (searchedString == "") {
                isFiltering = false
            }
        }
        console.log("searched:", searchedString)
        updateList()
    }, false);
    getAllUsers()

    predict();
}

function updateUser() {
    if (currentUID !== "") {
        let path = 'users/' + currentUID
        var d = new Date();
        var n = d.getTime();
        let time = n;
        firebase.database().ref(path).update({
            id: currentUID,
            name: currentEmail,
            email: currentEmail,
            lastSignIn: time
        });
    }
}

function updateList() {
    filteredList = []
    if (isFiltering) {
        for (var i = 0; i < userList.length; i++) {
            if (userList[i].name.includes(searchedString)) {
                filteredList.push(userList[i])
            }
        }
        //console.log("filtered:", filteredList)
        document.getElementById('message_box').innerHTML = ""
        document.getElementById('message_box').appendChild(makeULUser(filteredList));
    } else {
        document.getElementById('message_box').innerHTML = ""
        document.getElementById('message_box').appendChild(makeULUser(userList));
    }
}

function addUserTest() {
    var newUserKey = firebase.database().ref().child('users').push().key;
    let name = document.getElementById('search_text').value
    firebase.database().ref('users/' + newUserKey).set({
        id: newUserKey,
        name: name,
    });
}

function makeULUser(array) {
    var list = document.createElement('ul');
    list.id = "stupid_box"
    for (var i = 0; i < array.length; i++) {
        var item = document.createElement('li');
        item.appendChild(document.createTextNode(array[i].name))
        item.id = i + "user_list_elem mli"
        item.onclick = function(event, id) {
            let row = event.srcElement.id.charAt(0)
            document.getElementById('msg_input').style.opacity = 1.0;
            isMessages = true
            showMessages(row)
        };
        list.appendChild(item);
    }
    return list;
}

function makeULMessage(array) {
    var list = document.createElement('ul');
    list.id = "stupid_box"
    array = sortMessages(array)
    for (var i = 0; i < array.length; i++) {
        var item = document.createElement('li');
        item.appendChild(document.createTextNode(array[i].msg))
        item.id = i + "message_list_elem.mli"
        item.classList.add('mli');
        if (array[i].sender == currentUID) {
            //console.log("found msg from user")
            item.setAttribute("style", "margin-left: 40px; text-align: right; background-color:DodgerBlue; color: white;");
        } else {
            item.setAttribute("style", "text-align: left;")
        }
        item.onclick = function(event, id) {
            let row = event.srcElement.id.charAt(0)
        };
        list.appendChild(item);
        list.style = ("list-style", "none");
    }
    return list;
}

function swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  
  function sortMessages(array) {
    for(var i = 0; i < array.length; i++) {
      var min = i
      for(var j = i + 1; j < array.length; j++) {
        if(array[j].time < array[min].time) {
          min = j
        }
      }
      if(i !== min) {
        swap(array, i, min);
      }
    }
    return array
  }

function sendMessage() {
    let path = 'messages/'
    var d = new Date();
    var n = d.getTime();
    let time = n/1600000.0;
    var newUserKey = firebase.database().ref().child(path).push().key;
    firebase.database().ref(path + newUserKey).set({
        id: newUserKey,
        sender: currentUID,
        recipient: selectedUser.id,
        message: document.getElementById('send_text').value,
        time: time
    });
    document.getElementById('send_text').value = ""
}

function back() {
    document.getElementById('message_header').innerText = "Search Users"
    document.getElementById('back_btn').style.opacity = 0.0
    document.getElementById('msg_input').style.opacity = 0.0
    document.getElementById('search_text').style.opacity = 1.0
    selectedUser = null
    isMessages = false
    getAllUsers()
}

function showMessages(row) {
    selectedUser = userList[row]
    document.getElementById('message_header').innerText = selectedUser.name
    document.getElementById('search_text').style.opacity = 0.0
    document.getElementById('back_btn').style.opacity = 1.0
    firebase.database().ref("messages/").on("value", function(snapshot) {
        messages = []
        if (isMessages) {
            document.getElementById('message_box').innerHTML = ""
        }
        snapshot.forEach(function(data) {
            let senderID = data.val().sender
            let recipientID = data.val().recipient
            if (senderID == selectedUser.id && recipientID == currentUID) {
                //console.log("receivecd message\nselected user:", selectedUser.id, "sender:", data.val().sender, 
                //"rec:", data.val().recipient, "msg:", data.val().message)
                
                messages.push(new Message(data.val().id, data.val().message, data.val().recipient,
                    data.val().sender, data.val().time))
            } else if (recipientID == selectedUser.id && senderID == currentUID) {
                //console.log("sent message\nselected user:", selectedUser.id, "sender:", data.val().sender,
                 //"rec:", data.val().recipient, "msg:", data.val().message)
                
                 messages.push(new Message(data.val().id, data.val().message, data.val().recipient,
                    data.val().sender, data.val().time))
            }
        });
        if (isMessages) {
            document.getElementById('message_box').appendChild(makeULMessage(messages));
        }
    }, function (errorObject) {
        console.log("error: " + errorObject)
    });
}

function getAllUsers() {
    firebase.database().ref("users/").on("value", function(snapshot) {
        userList = []
        if (!isMessages) {
            document.getElementById('message_box').innerHTML = ""
        }
        snapshot.forEach(function(data) {
            if (data.val().id == currentUID) {
            } else {
                userList.push(new User(data.val().id, data.val().name))
            }
        });
        if (!isMessages) {
            document.getElementById('message_box').appendChild(makeULUser(userList));
        }
    }, function (errorObject) {
        console.log("error: " + errorObject)
    });
}

function send_veryspecial() {

}