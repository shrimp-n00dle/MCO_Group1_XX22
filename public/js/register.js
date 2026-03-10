function registerUser(){
  var firstName = document.getElementById("firstName").required;
  var lastName = document.getElementById("lastName").required;
  var email = document.getElementById("email").required;
  var username = document.getElementById("username").required;
  var password = document.getElementById("password").required;
  
  document.getElementById("registerTest").innerHTML = firstName;
  document.getElementById("registerTest").innerHTML = lastName;
  document.getElementById("registerTest").innerHTML = email;
  document.getElementById("registerTest").innerHTML = username;
  document.getElementById("registerTest").innerHTML = password;
}