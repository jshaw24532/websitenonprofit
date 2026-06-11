import fs from "fs";
const h = fs.readFileSync("index.html", "utf8");
console.log("josephproject/government:", (h.match(/\/josephproject\/government/g) || []).length);
console.log('"/government', (h.match(/"\/government/g) || []).length);
console.log("href=/government", (h.match(/href="\/government/g) || []).length);
