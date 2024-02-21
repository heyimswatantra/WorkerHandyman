
function getFormValues() {
    // Get values from the form
    var nameValue = document.getElementById('nameInput').value;
    var emailValue = document.getElementById('emailInput').value;
    var passwordValue = document.getElementById('passwordInput').value;

    // Do something with the values (e.g., display them, send them to a server, etc.)
    console.log(nameValue);
    console.log("Email: " + emailValue);
    console.log("Password: " + passwordValue);

    fetch('http://localhost:3000/')
}
