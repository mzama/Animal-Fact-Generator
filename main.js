let fs = require("fs");

let data = fs.readFileSync("data.json", "utf-8");
console.log(JSON.parse(data));