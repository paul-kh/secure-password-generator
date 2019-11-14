
// Pseudo Codes
//*********************************************************************
// Collect user's input by having them confirming:
// > Passwor length: must be betwen 8 - 12
// > Capital letter
// > Special character
// > Numberic character 
// ------------------------------
// Store user's inputs/confirmations
// -------------------------------------
// Generate password
// > create a password array with length of password length
// > Select lower case characters randomly from an array of alphabets
// > Insert the random lowercase characters from alphabet array into the password array
// > Slide the password array at random position with the user's inputs: Capital char, special char, numeric char
// > Display password array on the screen
// > Copy password to clib board

// declare global variable to be accessible for the 2 functions (genSecurePwd() and copyToClipboard() )
const securePwdInputEl = document.getElementById("securePwdInput");

function genSecurePwd() {
    // declare basic variables
    const specialChars = ["@", "?", "!", "#", "$", "%", "&", "*", "+", "-", ".", ";", "^"];// 13 items
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    // generate random index of array with a given array length
    function randomizeArrayIndex(arrLen) {
        return Math.floor(Math.random() * arrLen);
    }

    // create random lower case letters
    function randomizeLowerCaseArr(arrLen) {
        let strLowerCasePwd = "";
        let randomLowerCaseLetters = [];
        //get random item from lower case letters array
        for (let i = 0; i < arrLen; i++) {
            randomLowerCaseLetters[i] = letters[randomizeArrayIndex(25)];
        }
        return randomLowerCaseLetters;
    }

    // validate and return user's input for password length
    function getUserPwdLen() {
        let pwdLength = prompt("Choose your password length between 8 and 16 characters:");
        console.log("Pwd lenght: ", pwdLength, Number.isInteger(parseInt(pwdLength)));
        // if user clicks cancel
        if (pwdLength === null) { return null }

        while (Number.isInteger(parseInt(pwdLength)) === false || parseInt(pwdLength) < 8 || parseInt(pwdLength) > 16) {
            pwdLength = prompt("Please input your password length in a NUMBER FORMAT between 8-16:");
            console.log(pwdLength, " ", Number.isInteger(parseInt(pwdLength)));
            // if user clicks Cancel button, exit the while loop
            if (pwdLength === null) { break; }
        }
        return parseInt(pwdLength);
    }

    const pwdLen = getUserPwdLen();
    // if user click cancel then stop executing codes
    if (pwdLen === null) { return }

    let securePwdArr = randomizeLowerCaseArr(pwdLen);;

    // get userConfirmation for password criteria
    const capCharBool = confirm("Do you want capital characters?");
    const specialCharBool = confirm("Do you want special character?");
    const numCharBool = confirm("Do you want numeric characters?");
    let strSecurePwd = "";

    // check if user confirmed ok for password criteria
    if (capCharBool === true) {
        capChar = letters[randomizeArrayIndex(25)].toUpperCase();
        //splice capital char at random index from 0 to 2
        securePwdArr.splice(randomizeArrayIndex(3), 1, capChar);
        console.log("Capital char: ", capChar, "slice at position:", randomizeArrayIndex(3));
    };
    if (specialCharBool === true) {
        specialChar = specialChars[randomizeArrayIndex(12)];
        //splice special char at random index from 3 to 5 
        securePwdArr.splice(3 + randomizeArrayIndex(3), 1, specialChar);
        console.log("Special char: ", specialChar, "slice at position:", 3 + randomizeArrayIndex(3));
    };
    if (numCharBool === true) {
        numChar = numbers[randomizeArrayIndex(9)];
        //splice numeric char at random index from 6 to the array length
        securePwdArr.splice((6 + randomizeArrayIndex(securePwdArr.length - 6)), 1, numChar);
        console.log("Num char: ", numChar, "slice at position:", 7 + randomizeArrayIndex(securePwdArr.length - 6));
    };

    for (let i = 0; i < pwdLen; i++) {
        strSecurePwd = strSecurePwd + securePwdArr[i];
    }
    securePwdInputEl.value = strSecurePwd;
}

// copy the secure password to clip board
function copyToClipboard() {
    // tweek codes from W3Schools
    securePwdInputEl.disabled = false;
    securePwdInputEl.select();
    securePwdInputEl.setSelectionRange(0, 99999)
    document.execCommand("copy");
    securePwdInputEl.disabled = true;
}
