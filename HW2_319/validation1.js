function validate() {
    var image1 = getImage(emptyCheck(document.forms["contact information"]["first_name"].value) && alphaNumCheck(document.forms["contact information"]["first_name"].value), 'first_name')
    document.getElementById("FirstName").appendChild(image1)

    var image2 = getImage(emptyCheck(document.forms["contact information"]["last_name"].value) && alphaNumCheck(document.forms["contact information"]["first_name"].value), 'last_name')
    document.getElementById("LastName").appendChild(image2)

    var image3 = getImage(emptyCheck(document.forms["contact information"]["gender"].value), 'gender')
    document.getElementById("Gender").appendChild(image3)
    
    var image4 = getImage(emptyCheck(document.forms["contact information"]["state"].value), 'state')
    document.getElementById("State").appendChild(image4)
}

function getImage(bool, ID) {
    var image = document.getElementById("image" + ID);
    if (image == null) {
        console.log("new image")
        image = new Image(15, 15);
        image.id = "image" + ID;
    }
    image.src = bool ? './correct.png' : './wrong.png';
    return image;
}

function emailCheck(email) {
    atSplit = email.split('@');
    if (atSplit.length == 2 && alphaNumCheck(atSplit[0])) {
        periodSplit = atSplit[1].split('.')
        if (periodSplit.length == 2 && alphaNumCheck(periodSplit[0] + periodSplit[1])) {
            return true;
        }
    }
    valCheck = false;
    return false;
}

function alphaNumCheck(entry) {
    let regex = /^[a-z0-9]+$/i;
    if (entry != null && entry.match(regex)) {
        return true;
    } else {
        return false;
    }
}

function emptyCheck(string_value) {
    if (string_value == '--') {
        return false
    }
    if (string_value.length > 0) {
        return true
    } else {
        return false
    }
}

function deleteCookie( name ) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}