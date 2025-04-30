const { mkdir } = require("fs");
const fs = require("fs/promises");

const path = require("path");

console.log("second");

console.log(__dirname);
async function main() {
  const fullPath = path.join(__dirname, "..", "test", "secondd.txt");
  //directoriis saxeli, mere amovida ertit zemot dadga
  //shemdeg ipova testis folderi da gaaketa secondd.txt
  //shemdeg chawera secondddd shignit 
  await fs.writeFile("../test/firrst.txt", "Helloooo");
  await fs.writeFile(fullPath, "secondddd");
}

// main();
