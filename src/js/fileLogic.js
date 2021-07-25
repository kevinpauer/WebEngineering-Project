function getTextFile(path, fileName, authCode, callback) {
  var url = "http://localhost:8080/" + path + "/" + fileName;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);

  xhr.setRequestHeader("Authorization", `Basic ${authCode}`);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callback(URL.createObjectURL(this.response));
      } else if (xhr.status === 401) {
        alert("Session Expired");
        setupLogin();
      }
    }
  };

  xhr.send();
}

function getFile(path, fileName, authCode, callback) {
  var url = "http://localhost:8080/" + path + "/" + fileName;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);

  xhr.setRequestHeader("Authorization", `Basic ${authCode}`);

  xhr.responseType = "blob";

  xhr.onload = function (e) {
    if (this.status === 200) {
      callback(URL.createObjectURL(xhr.response));
    } else if (xhr.status === 401) {
      alert("Session Expired");
      setupLogin();
    }
  };

  xhr.send();
}
