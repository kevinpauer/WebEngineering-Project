function getTextFile(path, fileName, authCode, callback) {
  var url = "http://localhost:8080/" + path + "/" + fileName;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);

  xhr.setRequestHeader("Authorization", `Basic ${authCode}`);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
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
        callback(xhr.responseText);
      } else if (xhr.status === 401) {
        alert("Session Expired");
        setupLogin();
      }
    }
  };

  xhr.send();
}
