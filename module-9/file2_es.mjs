// const {x: y, m:n, add:total} = require("./file1");
// const {x: yy, m:nn} = require("./file3.js");
// 
// //const {add} = require("./utils/add.js");
// //const {subs} = require("./utils/substract.js");
// 
// const {add, subs} = require("./utils");
// 
// 
// console.log(y, n, total, yy, nn);
// 
// console.log(add(15, 10));
// console.log(subs(100, 10));

// common js to esm
import {x, m, add} from "./file1_es.mjs";
console.log(x, m, add);

import {x as xx, m as yy} from "./file3_es.mjs";
console.log(xx, yy);

import utils from "./utils/index.mjs";
console.log(utils.add(5, 7));
console.log(utils.subs(8, 900));