const {x: y, m:n, add:total} = require("./file1");
const {x: yy, m:nn} = require("./file3.js");

const {add} = require("./utils/add.js");
const {subs} = require("./utils/substract.js");

const {add, subs} = require("./utils");


console.log(y, n, total, yy, nn);

console.log(add(15, 10));
console.log(subs(100, 10));

