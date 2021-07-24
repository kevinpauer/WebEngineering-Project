function setupFilesystem(){
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

    //Input field for file upload
    let fileUpload = document.createElement("input");
    fileUpload.appendChild(document.createTextNode("Upload File"));
    fileUpload.type = "file";
    content.appendChild(fileUpload);
    content.appendChild(document.createElement("br"));

    //I dont know what this is?
    let folderButton = document.createElement("button");
    folderButton.appendChild(document.createTextNode("Get Folder"));
    folderButton.onclick = getFolder;
    content.appendChild(folderButton);
    content.appendChild(document.createElement("br"));

    //TextBox to visualize .txt files
    let textBox = document.createElement("textarea");
    textBox.id = "textBox";
    content.appendChild(textBox);
    content.appendChild(document.createElement("br"));

    //Button to clear up textBox
    let clearButton = document.createElement("button");
    clearButton.onclick = clearTextBox;
    clearButton.appendChild(document.createTextNode("Clear"));
    content.appendChild(clearButton);
    content.appendChild(document.createElement("br"));

    //Video
    let videoBox = document.createElement("video");
    videoBox.height = 500;
    videoBox.width = 200;
    videoBox.id = "videoBox";
    content.appendChild(videoBox);
}
function showDirectories(dir, path) {

    let filesystem = document.getElementById("filesystem");
    filesystem.innerHTML = " ";

    let currentDir = document.createElement("label");
    let dirNames = path.split("/");
    console.log(dirNames);
    for (let j=0; j<dirNames.length; j++){
        if (j === 0){
            currentDir.textContent += "Main";
        } else {
            currentDir.textContent += "->" + dirNames[j];
        }
    }
    filesystem.appendChild(document.createElement("br"));
    filesystem.appendChild(currentDir)

    for (let key in dir){
        let folder = document.createElement("ul");
        let link = document.createElement("a");
        link.href = "#";
        folder.appendChild(link);

        folder.id = dir[key].Name;
        link.appendChild(document.createTextNode(folder.id));
        filesystem.appendChild(folder);

        if (dir[key].Type === "dir"){
            folder.addEventListener("click", function (){
                openFolder(path, folder.id);
                goBack(path);
            })
        } else {
            if (dir[key].Type === `text\/plain`){
                folder.addEventListener("click", function (){
                    getTextFile(path, dir[key].Name, authCode, showResponseText);
                })
            }else if (dir[key].Type === "video\/mp4"){
                folder.addEventListener("click", function (){
                    getVideoFile(path, dir[key].Name, authCode, showVideo);
                })
            }
        }
    }
}

function showResponseText(response){
    let textBox = document.getElementById("textBox");
    textBox.textContent = response;
}

function showVideo(video) {
    let videoBox = document.getElementById("videoBox");
    let binaryData = [];
    binaryData.push(video);
    console.log(binaryData);
    let source = document.createElement("source");
    source.src = URL.createObjectURL(new Blob(binaryData, {type: "video\/mp4"}));
    videoBox.appendChild(source);
}

function clearTextBox(){
    document.getElementById("textBox").textContent = "";
}

function goBack(path) {
    document.getElementById("backButton").onclick = function () {
        getFolder(path, showDirectories);
        goBack(removeLastDirectoryPartOf(path));
    }
}

function removeLastDirectoryPartOf(path) {
    let newPath = path.split("/");
    newPath.pop();
    return(newPath.join("/"));
}

function openFolder(path, folderName) {
    getFolder(`${path}/${folderName}`, showDirectories);
}

