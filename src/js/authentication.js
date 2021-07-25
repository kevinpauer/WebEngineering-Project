let authCode;

function login() {
  let form = document.getElementById("loginForm");
  function handleForm(event) {
    event.preventDefault();
  }
  form.addEventListener("submit", handleForm);

  let http = new XMLHttpRequest();

  let username = document.getElementById("usernameInput").value;
  let password = document.getElementById("passwordInput").value;

  http.open("Post", "http://localhost:8080/login", true);

  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function (event) {
    if (http.readyState === 4) {
      console.log(http.status);
      console.log(http.responseText);
      let token = JSON.parse(http.responseText);

      if (token.error !== 'authentication failed'){
        document.getElementById("content").innerHTML = "";

        authCode = btoa(username + ":" + token.token);

        let logBut = document.createElement("button");
        logBut.appendChild(document.createTextNode("Logout"));
        logBut.onclick = logout;

        document.getElementById("content").appendChild(document.createElement("br"));
        document.getElementById("content").appendChild(logBut);

        setupFilesystem();
      } else {
        alert("Falsche Anmeldedaten");
      }
    }    
  }

  username = "admin";
  password = "admin";
  http.send(`username=${username}&password=${password}`);
}

function logout(){
  let url = "http://localhost:8080/logout";

  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.setRequestHeader("Authorization", "Basic" + authCode);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4){
      console.log(xhr.status);
      console.log(xhr.responseText);
    }
  }

  xhr.send()
  setupLogin();
}

function setupLogin(){
  document.getElementById("content").innerHTML = " ";

  let loginHead = document.createElement("h3");
  loginHead.appendChild(document.createTextNode("login"));
  document.getElementById("content").appendChild(loginHead);

  let loginForm = document.createElement("form");
  loginForm.id = "loginForm";

  let usernameInput = document.createElement("input");
  usernameInput.id = "usernameInput";
  usernameInput.type = "text";
  usernameInput.placeholder = "username";
  loginForm.appendChild(usernameInput);
  loginForm.appendChild(document.createElement("br"));

  let passwordInput = document.createElement("input");
  passwordInput.id = "passwordInput";
  passwordInput.type = "password";
  passwordInput.placeholder = "password";
  loginForm.appendChild(passwordInput);

  document.getElementById("content").appendChild(loginForm);

  let loginButton = document.createElement("button");
  loginButton.appendChild(document.createTextNode("login"));
  loginButton.onclick = login;

  document.getElementById("content").appendChild(loginButton);
}
