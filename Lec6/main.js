// npm init -y
//keywords npm-ze atanis dros keywordia

console.log("hello");

console.log(__dirname); //TODO directoriis saxeli

console.log(__filename); //TODO filis saxeli / mtliani misamarti

const fs = require("fs/promises");
const path = require("path");

const moment = require("moment");
const { read } = require("fs");

async function main() {
  await fs.mkdir("test"); // makeDirector

  await fs.writeFile("test/first.txt", "Hello");
}

// main();

async function main2() {
  //   await fs.writeFile("result.txt", "hello");
  await fs.appendFile("result.txt", " world\n");
}

// main2();

async function main3() {
  for (let i = 1; i < 1111; i++) {
    await fs.appendFile("result.txt", `${i}\n`);
  }
}

// main3();

async function main4() {
  for (let i = 1; i < 11; i++) {
    await fs.writeFile(`${i}text.txt`, "hello");
  }
}

// main4();

async function main5() {
  await fs.unlink("result.txt"); // Shlis files
  await fs.rmdir(""); // Shlis folders
}

// main5();

//readFile(path, opts)    Read file contents
//writeFile(path, data)    Write or overwrite a file
//appendFile(path, data)    Append data to a file
//readdir(path)    Read contents of a directory
//mkdir(path)    Create a directory
//rmdir(path)    Remove a directory
//unlink(path)    Delete a file
//stat(path)    Get file metadata
//rename(old, new)    Rename or move a file
//copyFile(src, dest)    Copy a file
//access(path)    Check if a file/folder exists or is accessible

async function main6() {
  //?   await fs.rename("test.txt", "result.txt");

  const dirs = await fs.readdir(__dirname);

  //   console.log(dirs);

  for (let dir of dirs) {
    const stat = await fs.stat(dir);
    console.log(dir, "dirs");
    console.log(stat.isDirectory());
  }
}

// main6();

async function main7() {
  //?   await fs.rename("test.txt", "result.txt");

  const dirs = await fs.readdir(__dirname);

  //   console.log(dirs);

  for (let dir of dirs) {
    const stat = await fs.stat(dir);
    if (stat.isDirectory()) {
      await fs.appendFile("result.txt", `dir: ${dir}\n`);
    } else {
      await fs.appendFile("result.txt", `file: ${dir}\n`);
    }
  }
}

// main7();

async function main8() {
  await fs.copyFile("result.txt", "result2.txt");
}

// main8();

// async function foo(fullPath) {
//   console.log(fullPath);

//   const dirs = await fs.readdir(fullPath);

//   for (let dir of dirs) {
//     const stat = await fs.stat(dir);
//     if (stat.isDirectory()) {
//       await fs.appendFile("result.txt", `dir: ${dir}\n`);
//       const list = await fs.readdir(fullPath + "/" + dir);

//       for (let lis of list) {
//         if (stat.isDirectory()) {
//           await fs.appendFile("result.txt", `dir: ${lis}\n`);
//         } else {
//           await fs.appendFile("result.txt", `file ${lis}\n`);
//         }
//       }
//       console.log(list);
//     } else {
//       await fs.appendFile("result.txt", `file: ${dir}\n`);
//     }
//   }
// }

// foo(__dirname);

async function foo1(fullPath) {
  const dirs = await fs.readdir(fullPath);
  for (let dir of dirs) {
    const stat = await fs.stat(path.join(fullPath, dir));
    if (stat.isDirectory()) {
      await fs.appendFile("result.txt", `Dir: ${dir}\n`);
      const absolutePath = path.join(fullPath, dir);
      foo1(absolutePath);
    } else {
      await fs.appendFile("result.txt", ` -File: ${dir}\n`);
    }
  }
}

// foo1(__dirname);

async function main10() {
  console.log(moment().format("YYYY MMMM DD hh:mm:ss"));
}

// main10();

//!momentjs.com

async function mine() {
  const [, , command, title, content] = process.argv;

  const readData = await fs.readFile("posts.json", "utf-8");
  const posts = JSON.parse(readData);

  if (command === "add") {
    const id = posts[posts.length - 1]?.id || 0;

    const newPost = {
      id: id + 1,
      title,
      content,
      createdAt: moment().format("YYYY MMMM DD"),
    };

    posts.push(newPost);

    await fs.writeFile("posts.json", JSON.stringify(posts));
  }
  if (command === "show") {
    console.log(posts);
  }

  if (command === "delete") {
    const index = [posts.findIndex((el) => el.id === Number(title))];
    if (index === -1) {
      console.log("cant delete");
      return;
    }

    const deletedItem = posts.splice(index, 1);
    await fs.writeFile("posts.json", JSON.stringify(posts));
    console.log("deleted  " + deletedItem);
  }
}

mine();

//CRUD
//Create, Read, Update, and Delete
