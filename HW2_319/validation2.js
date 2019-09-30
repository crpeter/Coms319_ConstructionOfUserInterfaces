function validate() {
    var image1 = getImage(emailCheck(document.forms["contact information"]["email"].value), 'email')
    document.getElementById("Email").appendChild(image1)

    var image2 = getImage(numberCheck(document.forms["contact information"]["phone"].value) || tenDigitNumber(document.forms["contact information"]["phone"].value), 'phone')
    document.getElementById("Phone").appendChild(image2)

    var image3 = getImage(addressCheck(document.forms["contact information"]["address"].value), 'address')
    document.getElementById("Address").appendChild(image3)
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
    return false
}

function alphaNumCheck(entry) {
    let regex = /^[a-z0-9]+$/i;
    if (entry != null && entry.match(regex)) {
        return true;
    } else {
        return false;
    }
}

function numberCheck(number) {
    atSplit = number.split('-')
    if (atSplit.length != 3) {
        return false
    }
    for (var i = 0; i < atSplit.length; i++) {
        console.log(atSplit[i])
        if (i != atSplit.length - 1) {
            if (atSplit[i].length != 3) {
                return false
            }
        } else {
            if (atSplit[i].length != 4) {
                return false
            }
        }
    }
    return true
}

function tenDigitNumber(number) {
    if (number.length != 10) {
        return false
    }
    if (allNumbers(number)) {
        return true
    }
    return false
}

function allNumbers(entry) {
    let regex = /^[0-9]+$/i
    if (entry != null && entry.match(regex)) {
        return true
    } else {
        return false
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

function addressCheck(entry) {
    atSplit = entry.split(',')
    if (atSplit.length != 2) {
        return false
    }
    for (var i = 0; i < atSplit.length; i++) {
        if (!allChars(atSplit[i])) {
            return false
        }
    }
    return true
}

function allChars(entry) {
    let regex = /^[a-z ]+$/i
    if (entry != null && entry.match(regex)) {
        return true
    } else {
        return false
    }
}

function deleteCookie( name ) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}