// Get the login form element
const loginBtn = document.getElementById("login")

// Add submit event listener to the form
loginBtn.addEventListener("click", Send)
function Send()
{

  // Get form input values
  var email = document.getElementById("email").value
  var password = document.getElementById("password").value
// Get form local storage values
  var stored_email = localStorage.getItem("Email")
  var stored_password = localStorage.getItem("Password")
  // Validate passwords match
  if (password !== stored_password || email !== stored_email) {
    alert("Credencials are not correct!")
  }
  else {
    // Redirect to home page after 1 second
    setTimeout(() => {
       //window.location.href = "login.html"
      location = "index.html"
    }, 1000)
  }


}
