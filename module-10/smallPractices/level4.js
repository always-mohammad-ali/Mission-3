const fs = require("fs");
const path = require("path");

const levelFourFolder = path.join(__dirname, "levelFour");

if(!fs.existsSync(levelFourFolder)){
    fs.mkdirSync(levelFourFolder);
}
else{
    console.log("level four folder exists!");
}

const testFiles = [
    "images.jpg",
    "book.pdf",
    "song.mp3",
    "video.mp4"
]

let totalFileCreated = 0;

testFiles.forEach((fileName) =>{
    const filePath = path.join(levelFourFolder, fileName);

    const content =`
    Path: ${fileName};
    Created: ${new Date().toLocaleString()};
    Type : ${path.extname(fileName)};
    This files were created by my auto program;
    `;

    fs.writeFileSync(filePath, content);
    console.log("created", fileName);
    totalFileCreated++;
    
})

console.log("total files created: ", totalFileCreated);