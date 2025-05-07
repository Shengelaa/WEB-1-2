#!/usr/bin/env node
const { Command } = require("commander");
const { readFile } = require("./utils");
const fs = require("fs/promises");

const program = new Command();
program.name("test cli with commander").description("test").version("1.0.0");

program
  .command("add")
  .argument("<num>")
  .argument("<name>")
  .option("--g")
  .action(async (num, name, opts) => {
    console.log(num);
    console.log(name);

    console.log(opts);

    const data = await readFile("phone.json", true);
    const lastId = data[data.length - 1]?.id || 0;
    if (opts) {
      num = "+" + 995 + " " + num;
    }
    const newUser = {
      id: lastId + 1,
      phone: num,
      newname: name,
    };

    data.push(newUser);
    await fs.writeFile("phone.json", JSON.stringify(data));
  });

program
  .command("delete")
  .argument("<idd>")
  .action(async (idd) => {
    console.log(idd);
    const data = await readFile("phone.json", true);
    console.log(data);

    const filteredProducts = data.filter((data) => data.id !== Number(idd));

    console.log(filteredProducts);

    await fs.writeFile("phone.json", JSON.stringify(filteredProducts));
  });

program.command("show").action(async () => {
  const data = await readFile("phone.json", true);
  console.log(data);
});
program.parse();
