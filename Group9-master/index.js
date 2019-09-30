var testing = false
var create_user_errors = 0
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if (testing) {
      console.log("user:", user.email, " signed in")
    } else {
      // User is signed in.
      document.getElementById("user_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";

      var user = firebase.auth().currentUser;
      if(user != null){
        var email_id = user.email;
        document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
      }
    }

  } else {
    if (testing) {
      console.log("no user signed in")
    } else {
      // No user is signed in.
      document.getElementById("user_div").style.display = "none";
      document.getElementById("login_div").style.display = "block";
    }
  }
});

function login(){
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  login_user(String(userEmail), String(userPass));
}

function login_user(email, pass) {
  firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (error.code == "auth/user-not-found") {
      //console.log("error:")
      create_user(email, pass)
    } else {
      window.alert("Error : " + errorMessage);
    }
    // ...
  });
}

function create_user(email, pass) {
  firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
    create_user_errors+=1
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + ' - ' + errorMessage);
  })
}

function logout(){
  firebase.auth().signOut();
}

function create_users() {
  create_user_errors = 0
  testing = true
  let names = ["1@gmail.com", "2@gmail.com", "3@gmail.com"]
  let password = "password"
  for (var i = 0; i < names.length; i++) {
    create_user(names[i], password)
  }
}

function check_users() {
  console.log("errors creating users:", create_user_errors)
}

function create_event() {
  document.getElementById('event_dialog').open = false;
  console.log("TODO")
}

//Map Functions
function init_map() {
  var ames = {lat: 42.0308, lng: -93.6319};
  var map = new google.maps.Map(document.getElementById('map'), {zoom: 10, center: ames});
  var geocoder = new google.maps.Geocoder()

  //map listener for click
  map.addListener('click', function(event){
    var marker = new google.maps.Marker({position: event.latLng, map: map});
    document.getElementById('event_dialog').open = true;
    geocoder.geocode({'location' : event.latLng}, function(results, status){
      if(status == 'OK'){
        if (results[0]){
          document.getElementById('address').value = results[0].formatted_address;
        }
      }
    });
  });
  console.log("Init Map ran");
}
