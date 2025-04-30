const fs = require("fs/promises");

async function main() {
  const data = await fs.readFile("numbers.txt", "utf-8");

  const filtered = data.split(" ");
  console.log(typeof filtered);

  console.log(filtered);

  let sum = 0;

  for (let i = 0; i < filtered.length; i++) {
    console.log(filtered[i]);
    sum += Number(filtered[i]);
  }

  console.log(Number(sum), "3");
}

async function foo() {
  const numbers = await fs.readFile("numbers.txt", "utf-8");
  const numbsArr = numbers
    .split(" ")
    .map((el) => Number(el))
    .reduce((tot, cur) => tot + cur, 0);
  console.log(numbsArr);

  await fs.writeFile("results.txt", JSON.stringify(numbsArr));
}

foo();

//Create CLI Tool where you can manage users
// node main.js add giorgi 20 => u should add new object in users.json
// node main.js show => list of all users [{}]

async function foo1() {
  const [, , operation, val1, val2] = process.argv;
  console.log(operation, val1, val2);

  if (operation === "add") {
    const data = {
      user: {
        name: val1,
        age: val2,
      },
    };

    const readData = await fs.readFile("user.json");
    const data23 = JSON.stringify(data);

    await fs.writeFile("user.json", readData + readData.push(data23));
  }
}

// foo1();

const [, , command, userName, userAge] = process.argv;

async function mine() {
  if (command === "add") {
    const data = await fs.readFile("user.json", "utf-8");
    const users = JSON.parse(data);

    const newdata = {
      name: userName,
      age: userAge,
    };

    users.push(newdata);
    await fs.writeFile("user.json", JSON.stringify(users));
  }

  if (command === "show") {
    console.log(JSON.parse);
  }
}

mine();

//4) Write a random text into a file named text.txt.
// Then, read this file and count how many vowels are present.
