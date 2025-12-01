const fs = require("fs");
const path = require("path");

const helloFolder = path.join(__dirname, "hello");
if(!fs.existsSync(helloFolder)){
    fs.mkdirSync(helloFolder);
}
else{
    console.log(" hello already exists");
}

const messyFolder = path.join(__dirname, "hello", "messy-files-folder");

if(!fs.existsSync(messyFolder)){
    fs.mkdirSync(messyFolder);
    console.log("created messy-files-folder");
}
else{
    console.log(" messy already exists")
}