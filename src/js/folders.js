function getFolder(path, callback) {
  let url = "http://localhost:8080/" + path;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url);
  xhr.setRequestHeader("Authorization", "Basic " + authCode);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callback(JSON.parse(xhr.responseText), path);
      } else if (xhr.status === 401) {
        alert("Session Expired");
        setupLogin();
      }
    }
  };
  xhr.send();
}

function createFolder(folderName) {
  var url = "http://localhost:8080/" + folderName;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url);

  xhr.setRequestHeader("Authorization", "Basic " + authCode);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
    }
  };

  var data = "type=dir";

  xhr.send(data);
}
