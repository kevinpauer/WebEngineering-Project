function setUpTextView() {

    clear();

    let subContent = document.getElementById("subContent");
    subContent.appendChild(document.createElement("br"));

    //Label with fileName of opened .txt file
    let fileLabel = document.createElement("label");
    fileLabel.id = "fileLabel";
    subContent.appendChild(fileLabel);
    subContent.appendChild(document.createElement("br"));
    subContent.appendChild(document.createElement("br"));

    //TextBox to visualize .txt files
    let textBox = document.createElement("textarea");
    textBox.id = "textBox";
    subContent.appendChild(textBox);
    subContent.appendChild(document.createElement("br"));

    //Button to clear up textBox
    let clearButton = document.createElement("button");
    clearButton.onclick = clearTextBox;
    clearButton.appendChild(document.createTextNode("Clear"));
    subContent.appendChild(clearButton);

    //Save Button
    let saveButton = document.createElement("button");
    saveButton.id = "saveButton";
    saveButton.appendChild(document.createTextNode("Save"));
    subContent.appendChild(saveButton);
    subContent.appendChild(document.createElement("br"));

    //Download Button
    setUpDownload()
    subContent.appendChild(document.createElement("br"));

    //Delete Button
    setUpDelete()
}

function setUpVideoView() {
    clear()

    let subContent = document.getElementById("subContent");
    subContent.appendChild(document.createElement("br"));

    //Video
    let videoBox = document.createElement("video");
    videoBox.height = 1000;
    videoBox.width = 1000;
    videoBox.id = "videoBox";
    videoBox.src = "";
    videoBox.controls = "true";
    subContent.appendChild(videoBox);
    subContent.appendChild(document.createElement("br"));

    //Download Button
    setUpDownload()
    subContent.appendChild(document.createElement("br"));

    //Delete Button
    setUpDelete()
}

function setUpViewMP3() {
    clear()

    let subContent = document.getElementById("subContent");
    subContent.appendChild(document.createElement("br"));

    //MP3
    let audio = document.createElement("audio");
    audio.id = "audio";
    audio.autoplay = "autoplay";
    audio.controls = "controls";
    audio.src = "";
    subContent.appendChild(audio);

    //Download Button
    setUpDownload()
    subContent.appendChild(document.createElement("br"));

    //Delete Button
    setUpDelete()
}

function setUpViewPicture() {
    clear();

    let subContent = document.getElementById("subContent");
    subContent.appendChild(document.createElement("br"));

    //Picture
    let picture = document.createElement("img");
    picture.id = "picture";
    picture.src = "";
    subContent.appendChild(picture);
    subContent.appendChild(document.createElement("br"));

    //Download Button
    setUpDownload()
    subContent.appendChild(document.createElement("br"));

    //Delete Button
    setUpDelete()
}

function setUpUndefinedView(fileName) {
    clear();

    let subContent = document.getElementById("subContent");
    subContent.appendChild(document.createElement("br"));

    //Label
    let fileNameLabel = document.createElement("label");
    fileNameLabel.textContent = fileName
    subContent.appendChild(fileNameLabel);
    subContent.appendChild(document.createElement("br"));

    //Delete Button
    setUpDelete()
}

function createTxtFileView(path) {
    clear()

    document.getElementById("backButton").onclick = function () {
        getFolder("", showDirectories);
        subContent.innerHTML = "";
    };

    let subContent = document.getElementById("subContent");
    subContent.appendChild(document.createElement("br"));

    let label = document.createElement("label");
    label.textContent = "Current dir: Main" + path;
    subContent.appendChild(label)
    subContent.appendChild(document.createElement("br"));

    let fileName = document.createElement("input");
    fileName.type = "text";
    subContent.appendChild(fileName);
    let txtEnding = document.createElement("label");
    txtEnding.textContent = ".txt"
    subContent.appendChild(txtEnding);
    subContent.appendChild(document.createElement("br"));
    subContent.appendChild(document.createElement("br"));

    let textArea = document.createElement("textarea");
    textArea.id = "newTextContent";
    subContent.appendChild(textArea);
    subContent.appendChild(document.createElement("br"));

    let saveNewFileButton = document.createElement("button");
    saveNewFileButton.addEventListener("click", function (){
        saveTextChanges(path, fileName.value, authCode, textArea.value);
        document.getElementById("subContent").innerHTML = "";
        getFolder(path, showDirectories);
    })
    saveNewFileButton.appendChild(document.createTextNode("Save"))
    subContent.appendChild(saveNewFileButton);
    subContent.appendChild(document.createElement("br"));
}

function setUpDownload() {
    let subContent = document.getElementById("subContent");

    //Download Button
    let downloadButton = document.createElement("a");
    downloadButton.id = "downloadButton";
    downloadButton.appendChild(document.createTextNode("Download"));
    subContent.appendChild(downloadButton);
}

function setUpDelete() {
    let subContent = document.getElementById("subContent");

    //Delete Button
    let downloadButton = document.createElement("button");
    downloadButton.id = "deleteButton";
    downloadButton.appendChild(document.createTextNode("Delete"));
    subContent.appendChild(downloadButton);
}