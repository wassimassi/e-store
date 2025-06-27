
// Get the signup form element
const signupBtn = document.getElementById("signup")

// Add submit event listener to the form
signupBtn.addEventListener("click", Send)
function Send()
{

  // Get form input values
  var name = document.getElementById("name").value
  var email = document.getElementById("email").value
  var password = document.getElementById("password").value
  var confirmPassword = document.getElementById("confirm-password").value

  // Validate passwords match
  if (password !== confirmPassword) {
    alert("Passwords do not match!")
  }
  else {
    // Store user in localStorage
    localStorage.setItem("Name", name)
    localStorage.setItem("Password", password)
    localStorage.setItem("Email", email)

    // Redirect to login page after 1 second
    setTimeout(() => {
       //window.location.href = "login.html"
      location = "login.html"
    }, 1000)
  }


}

