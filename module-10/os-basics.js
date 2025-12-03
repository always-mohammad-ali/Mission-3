const os = require("os");

console.log("System info \n");
console.log("-".repeat(50));

console.log("Platform Details: ");
console.log("Platform: ", os.platform());
console.log("Architecture: ", os.arch());
console.log("Os type: ", os.type());
console.log("Os release: ", os.release());
console.log("HostNAME: ", os.hostname());

console.log("-".repeat(50));
console.log("\n CPU INFO: ");
const cpus = os.cpus();
console.log("CPU MODEL: ", cpus[0].model);
console.log("Number of cores : ", cpus.length);
console.log("CPU SPEED : ", cpus[0].speed);

console.log("-".repeat(50));
//RAM SPACE
const totalMem = os.totalmem();
console.log("TOTAL MEMORY : ", (totalMem/1024/1024/1024).toFixed(2), "GB");

console.log("-".repeat(50));

const freeMem = os.freemem();
console.log("Total free ram memory : ", (freeMem/1024/1024/1024).toFixed(2), "GB");

const upTime = os.uptime();

const days = Math.floor(upTime / 86400);
const hours = Math.floor((upTime % 86400) / 3600);
const minutes = Math.floor((upTime % 3600) / 60);
console.log("-".repeat(50));
console.log(`${days} days ${hours} hours ${minutes} minutes`);