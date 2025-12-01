console.log("Organize your files and folders");

const command = process.argv[2];

console.log("Input your command: ");

if(command === "init"){
    console.log("initialize the folder");
}
else if(command === "organize"){
    console.log("organize the folder")
}
else{
    console.log("enter init or organize in command");
}