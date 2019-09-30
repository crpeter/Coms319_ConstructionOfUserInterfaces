function register() {

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
 
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).then(function (user){
      console.log("success on second")
      //window.location.href="index.html";
    }).then(() => { 
      firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).then(function (user){
        console.log("success on second")
      })
        .catch(function(error) {
          // Handle Errors here.
          console.log("error:", error)
          var errorCode = error.code;
          var errorMessage = error.message;
        });
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("error:", error)
        
        // ...
      });
  }