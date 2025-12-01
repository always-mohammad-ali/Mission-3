const fs = require("fs");
const path = require("path");

const organizedFolder = path.join(__dirname, "organizedFolder");

if(!fs.existsSync(organizedFolder)){
    fs.mkdirSync(organizedFolder, {recursive : true});

}
else{
    console.log("organized folder already exists")
}

 const categories = {
    images: [".jpg", ".png", ".gif"],
    documents: [".pdf", ".txt", ".docx"],
    audio: [".mp3", ".wav"],
    code: [".js", ".html", ".css"],
    others: [] // For unknown file types
   };

   Object.keys(categories).forEach((category)=>{
    const categoryFolder = path.join(organizedFolder, category);

    if(!fs.existsSync(categoryFolder)){
        fs.mkdirSync(categoryFolder);
    }
    else{
        console.log(`${category} already exists.`);
    }
   })

const messyFolder = path.join(__dirname, "messyFolder");

if(!fs.existsSync(messyFolder)){
    fs.mkdirSync(messyFolder, {recursive : true})

    const testFiles = ["photo.jpg", "document.pdf","folder1", "song.mp3", "script.js", "data.txt", "v.xyzm"];

    testFiles.forEach((fileName)=>{
        const filePath = path.join(messyFolder, fileName);
        
        fs.writeFileSync(filePath, `${fileName} created just right now by ali`);
        
    })
}
else{
    console.log("messy folder already exists!");
}

const files = fs.readdirSync(messyFolder);
//console.log(files.length); output=5;

if(files.length === 0){
    console.log("No folder to organized");
}else{
   
    console.log("starting organize file into category");
    
    let fileOrganized = 0;
    files.forEach((fileName, index) =>{
        
        console.log("File : ", index+1 , fileName);
        const sourceFilePath = path.join(messyFolder, fileName);

        const fileStats = fs.statSync(sourceFilePath);
        if(fileStats.isDirectory()){
            console.log("skipping folder: ", fileName);
            return;
        }

        const ext = path.extname(fileName).toLowerCase();
        console.log( "the extension name of ", fileName, " = ", ext);

        let category = "others";

        if(ext === "jpg" || ext === "png" || ext === "gif"){
            category = "images"
        }
        else if(ext === "pdf" || ext === "txt" || ext === "docx"){
            category = "documents"
        }
        else if(ext === "mp3" || ext === "wav"){
            category = "audio"
        }
        else if(ext === "js" || ext === "html" || ext === "css"){
            category = "code"
        }

        const destinationFolderPath = path.join(organizedFolder, category);
        const destinationFilePath = path.join(destinationFolderPath, fileName);

        fs.copyFileSync(sourceFilePath, destinationFilePath);
        console.log("copied to ", category , "/", fileName);
        fileOrganized++;


    })

    console.log("total organized file: ",fileOrganized);

    
    
}


