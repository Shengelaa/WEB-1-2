console.log("hello world"); //window is not defined

//! console.log(process.argv, process.argv[2], "mesame");
//Todo 1  sad inaxeba da 2 romeli faili amis gamshvebi, rame 123

//cli brzanebebi utxra backendis aplikacias
const [, , operation, val1, val2] = process.argv;
console.log(operation, val1, val2);

//normal calculator

if (operation === "add") {
  console.log(Number(val1) + Number(val2)); // Sul stringad gadascems Cli
}

if (operation === "remove") {
  if (Number(val1) >= Number(val2)) {
    console.log(Number(val1) - Number(val2));
  } else {
    console.log(Number(val2) - Number(val1));
  }
}

if (operation === "multiply") {
  console.log(Number(val1) * Number(val2));
}

if (operation === "divide") {
  console.log(Number(val1) / Number(val2));
}

console.log(1);

setTimeout(() => console.log(2), 2000);

console.log(3);

// process.on("exit", () => console.log("on exit")); //todo process chashenebuli funkciaa,
//!  process.exit(); process acherebs

const os = require("os");
// Import os from OS

console.log(os.userInfo(), "os");

console.log(os.cpus(), "cpu");

console.log(os.arch(), "arch");

console.log(os.totalmem(), "totalMem");

console.log(os.freemem() / 1024 / 1024, "freememory");

//! FS module File system

const fs = require("fs/promises");

fs.readFile("first.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(data, "read data");
  fs.readFile("second.txt", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(data, "read data");
  });
});

console.log(1);

async function main() {
  const first = await fs.readFile("first.txt", "utf-8");
  const second = await fs.readFile("second.txt", "utf-8");
  const third = await fs.readFile("third.txt", "utf-8");
  console.log(first);
  console.log(second);
  console.log(third);
}

main();

console.log(55);

async function main1() {
  const user = {
    name: "giorgi",
    age: 20,
    isSmoker: false,
  };
  const readData = await fs.readFile("third.txt");
  await fs.writeFile("first.txt", "helloooooo");
  await fs.writeFile("third.txt", `${readData} Hello123`);
  await fs.writeFile("user.json", JSON.stringify({ user }));
}

main1();
