const fs = require("fs");
const path = require("path");

const levelFive = path.join(__dirname, "levelFive");

if(!fs.existsSync(levelFive)){
    fs.mkdirSync(levelFive);
}
else{
    console.log("level five folder already exists");
}

const testFiles = ["photo.jpg", "document.pdf", "song.mp3", "script.js", "data.txt"];

testFiles.forEach((fileName) =>{
    const filePath = path.join(levelFive, fileName);

    const content =`FileName: ${fileName} ; Created at: ${new Date().toLocaleString()};
     extension type: ${path.extname(fileName)}
    `
    fs.writeFileSync(filePath, content)
})


const categories = {
    images: [".jpg", ".png", ".gif"],
    documents: [".pdf", ".txt", ".docx"],
    audio: [".mp3", ".wav"],
    code: [".js", ".html", ".css"],
    others: [] // For unknown file types
};

console.log("Available categories: ", Object.keys(categories));

const files = fs.readdirSync(levelFive);

console.log("Found: ", files.length , "Files: ", files);

if(files.length === 0){
    console.log("no file to organize");
}
else{
     console.log("analyzing files");

     files.forEach((fileName, index)=>{
        console.log("File ", index+1, " :", fileName);

        const extension = path.extname(fileName).toLowerCase();

        console.log("Extension: ", extension);

        let category = "others";

        if(extension === ".jpg" || extension === ".png" || extension === ".gif"){
            category = "images";
        }
        else if(extension === ".pdf" || extension === ".txt" || extension === ".docx"){
            category = "documents"
        }
        else if(extension === ".mp3" || extension === ".wav"){
            category = "audio"
        }

        else if(extension === ".js" || extension === ".html" || extension === ".css"){
            category = "code"
        }

      console.log("category: ", category);
     })


}
