function setupFilesystem() {
  let content = document.getElementById("content");
  content.appendChild(document.createElement("br"));

  //back button for browser history
  let backButton = document.createElement("button");
  backButton.id = "backButton";
  backButton.appendChild(document.createTextNode("Back"));
  content.appendChild(backButton);
  document.createElement("button");

  //filesystem basic structure
  let filesystem = document.createElement("div");
  filesystem.id = "filesystem";
  content.appendChild(filesystem);

  getFolder("", showDirectories);

  //User options
  let userOptions = document.createElement("div");
  userOptions.id = "userOptions";
  content.appendChild(userOptions);

  //SubContent from files
  let subContent = document.createElement("div");
  subContent.id = "subContent";
  content.appendChild(subContent);
  content.appendChild(document.createElement("br"));
}

function showDirectories(dir, path) {
  let filesystem = document.getElementById("filesystem");
  filesystem.innerHTML = "";

  //Show user options
  setUpUserOptions()

  //Shows current dir to user
  let currentDir = document.createElement("label");
  let dirNames = path.split("/");
  console.log(dirNames);
  for (let j = 0; j < dirNames.length; j++) {
    if (j === 0) {
      currentDir.textContent += "Main";
    } else {
      currentDir.textContent += "/" + dirNames[j];
    }
  }
  filesystem.appendChild(document.createElement("br"));
  filesystem.appendChild(currentDir);

  for (let key in dir) {
    let folder = document.createElement("ul");
    let link = document.createElement("a");
    link.href = "#";
    folder.appendChild(link);

    folder.id = dir[key].Name;
    link.appendChild(document.createTextNode(folder.id));
    filesystem.appendChild(folder);

    if (dir[key].Type === "dir") {
      folder.addEventListener("click", function () {
        openFolder(path, folder.id);
        goBack(path);
      });
    } else {
      if (dir[key].Type === `text\/plain`) {
        folder.addEventListener("click", function () {
          setUpTextView();
          getTextFile(path, dir[key].Name, authCode, showResponseText);
          saveText(path, dir[key].Name);
          deleteHelper(path, dir[key].Name)
        });
      } else if (dir[key].Type === "video/mp4") {
        folder.addEventListener("click", function () {
          setUpVideoView();
          getFile(path, dir[key].Name, authCode, showVideo);
          deleteHelper(path, dir[key].Name)
        });
      } else if (dir[key].Type === "image/png") {
        folder.addEventListener("click", function () {
          setUpViewPicture()
          getFile(path, dir[key].Name, authCode, showPic);
          deleteHelper(path, dir[key].Name)
        });
      } else if (dir[key].Type === "audio/mpeg") {
        folder.addEventListener("click", function () {
          setUpViewMP3()
          getFile(path, dir[key].Name, authCode, showSound);
          deleteHelper(path, dir[key].Name)
        });
      } else {
        folder.addEventListener("click", function () {
          setUpUndefinedView(dir[key].Name);
          deleteHelper(path, dir[key].Name)
        })
      }
    }
  }
}

function setUpUserOptions() {
  document.getElementById("userOptions").innerHTML = "";
  let userOptions = document.getElementById("userOptions");

  // //Input field for file upload
  // let fileUpload = document.createElement("input");
  // fileUpload.appendChild(document.createTextNode("Upload File"));
  // fileUpload.type = "file";
  // userOptions.appendChild(fileUpload);
  // userOptions.appendChild(document.createElement("br"));

  //Delete Folder
  let folderDeleteButton = document.createElement("button");
  folderDeleteButton.appendChild(document.createTextNode("Delete Folder"));
  folderDeleteButton.id = "folderDeleteButton";
  userOptions.appendChild(folderDeleteButton);
  userOptions.appendChild(document.createElement("br"));

  //I dont know what this is?
  let folderButton = document.createElement("button");
  folderButton.appendChild(document.createTextNode("Get Folder"));
  folderButton.onclick = getFolder;
  userOptions.appendChild(folderButton);
  userOptions.appendChild(document.createElement("br"));

  //Create .txt file
  let fileCreateButton = document.createElement("button");
  fileCreateButton.id = "fileCreateButton";
  fileCreateButton.appendChild(document.createTextNode("Create Text-File"));
  fileCreateButton.addEventListener("click", function (){
    createTxtFileView("");
  })
  userOptions.appendChild(fileCreateButton);
  userOptions.appendChild(document.createElement("br"));
}

function showResponseText(response) {
  let textBox = document.getElementById("textBox");
  textBox.value = response;
  let downloadButton = document.getElementById("downloadButton");
  downloadButton.setAttribute("href","data:text/plain;base64," + btoa(response));
  downloadButton.setAttribute("download", "text")
}

function showVideo(response) {
  let videoBox = document.getElementById("videoBox");
  videoBox.src = "data:video/mp4;base64," + response;
  let downloadButton = document.getElementById("downloadButton");
  downloadButton.setAttribute("href","data:video/mp4;base64," + response);
  downloadButton.setAttribute("download", "text")
}

function showPic(response) {
  let picture = document.getElementById("picture");
  picture.src = "data:image/png;base64," + response;
  let downloadButton = document.getElementById("downloadButton");
  downloadButton.setAttribute("href","data:image/png;base64," + response);
  downloadButton.setAttribute("download", "text")
}

function showSound(response) {
  let audio = document.getElementById("audio");
  audio.src = "data:audio/mpeg;base64," + response;
  let downloadButton = document.getElementById("downloadButton");
  downloadButton.setAttribute("href","data:audio/mpeg;base64," + response);
  downloadButton.setAttribute("download", "text")
}

function clearTextBox() {
  document.getElementById("textBox").value = "";
}

function goBack(path) {
  document.getElementById("subContent").innerHTML = "";
  document.getElementById("backButton").onclick = function () {
    getFolder(path, showDirectories);
    goBack(removeLastDirectoryPartOf(path));
  };
}

function removeLastDirectoryPartOf(path) {
  let newPath = path.split("/");
  newPath.pop();
  return newPath.join("/");
}

function openFolder(path, folderName) {
  getFolder(`${path}/${folderName}`, showDirectories);

  let deleteFolderButton = document.getElementById("folderDeleteButton");
  deleteFolderButton.addEventListener("click", function () {
    deleteFolder(`${path}/${folderName}`, authCode);
  })
}

function saveText(path, fileName) {
  let saveButton = document.getElementById("saveButton");
  let textArea = document.getElementById("textBox");
  saveButton.addEventListener("click", function () {
    saveTextChanges(path, fileName, authCode, textArea.value);
  });
}

function deleteHelper(path, fileName) {
  let deleteButton = document.getElementById("deleteButton");
  deleteButton.addEventListener("click", function () {
    deleteFile(path, fileName, authCode)
    document.getElementById("subContent").innerHTML = "";
    getFolder(path, showDirectories);
  })
}

function clear() {
  document.getElementById("filesystem").innerHTML = "";
  document.getElementById("subContent").innerHTML = "";
  document.getElementById("userOptions").innerHTML = "";
}