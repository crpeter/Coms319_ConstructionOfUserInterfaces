

function load(){
firebase.auth().onAuthStateChanged(function(user) {
  
    if (user) {

        // User is signed in.
        // document.getElementById("user_div").style.display = "block";
        // document.getElementById("login_div").style.display = "none";
  
        var user = firebase.auth().currentUser;
        if(user != null){
          var email_id = user.email;
        //  alert(email_id)
          document.getElementById("id").innerHTML =  email_id;
        }
      }
  
    
  });}

  function uploadPic(){
      
  }