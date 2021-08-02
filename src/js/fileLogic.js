function getTextFile(path, fileName, authCode, callback) {
  var url = "http://localhost:8080/" + path + "/" + fileName;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);

  xhr.setRequestHeader("Authorization", `Basic ${authCode}`);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let fileLabel = document.getElementById("fileLabel");
        fileLabel.textContent = "Main" + path + "/" + fileName;
        callback(xhr.responseText);
      } else if (xhr.status === 401) {
        alert("Session Expired");
        setupLogin();
      }
    }
  };

  xhr.send();
}

function getFile(path, fileName, authCode, callback) {
  var url = "http://localhost:8080/" + path + "/" + fileName + "?format=base64";

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);

  xhr.setRequestHeader("Authorization", `Basic ${authCode}`);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
        callback(xhr.responseText);
      } else if (xhr.status === 401) {
        alert("Session Expired");
        setupLogin();
      }
    }
  };

  xhr.send();
}

function saveTextChanges(path, fileName, authCode, text) {
  var url = "http://localhost:8080/" + path + "/" + fileName;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url);

  xhr.setRequestHeader("Authorization", "Basic " + authCode);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
    } else if (xhr.status === 401) {
      alert("Session Expired");
      setupLogin();
    }
  };

  var data = `content=${btoa(text)}`;

  xhr.send(data);
}

function deleteFile(path, fileName, authCode) {
  var url = "http://localhost:8080/" + path + "/" + fileName;

  var xhr = new XMLHttpRequest();
  xhr.open("DELETE", url);

  xhr.setRequestHeader("Authorization", "Basic " + authCode);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
    }};

  xhr.send();
}

function deleteFolder(path, authCode) {
  var url = "http://localhost:8080/" + path;

  var xhr = new XMLHttpRequest();
  xhr.open("DELETE", url);

  xhr.setRequestHeader("Authorization", "Basic " + authCode);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
    }};

  xhr.send();
}