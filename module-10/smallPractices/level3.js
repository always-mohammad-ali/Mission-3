const fs = require("fs");
const path = require("path");

const nsuFolder = path.join(__dirname, "NSU");

if(!fs.existsSync(nsuFolder)){
    fs.mkdirSync(nsuFolder);
}
else{
    console.log("nsu folder already exists my man");
}

const cseFolder = path.join(nsuFolder, "CSE");

if(!fs.existsSync(cseFolder)){
    fs.mkdirSync(cseFolder);
}
else{
    console.log("cse folder inside cse exists");
}

const textFiles = path.join(cseFolder, "book.txt");
console.log("text files are creating");

fs.writeFileSync(textFiles, "hello this is the text inside book . txt");

