function register(){

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
 

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).then(function (user){
        window.location.href="index.html";

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      alert("Error : " + errorMessage);
  
      // ...
    });
  
  }