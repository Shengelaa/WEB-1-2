#!/usr/bin/env node

const { Command } = require("commander");
const { readFile } = require("./utils");

const program = new Command();
program.name("test cli with commander").description("test").version("1.0.0");

program.command("sayhi").action(() => {
  console.log("hello");
});

program
  .command("add")
  .argument("<num1>", "number 1")
  .argument("<num2>", "number 2")
  .action((num1, num2) => {
    console.log(Number(num1) + Number(num2));
  });

//argument is required field, tu ar gaqvs arcerti mashin erroria

program
  .command("echo")
  .argument("<text>")
  .option("-u, --uppercase", "changing text to uppercase") //u da uppercase tamashobs ert rols
  .action((text, opts) => {
    if (opts.uppercase) {
      console.log(text.toUpperCase());
      return; //acherebs funqcias rom shemdeg console.log ar waikitxos
    }
    console.log(text, opts);
  });

program
  .command("sayHello")
  .option("-n, --name <name>", "this is name", "world")
  .action((opts) => {
    console.log(opts);
    if (opts.name) {
      console.log("hello " + opts.name); // only this will work if we have third argument in option "World"
      return;
    }
    console.log(opts, "opts");
  });

program
  .command("show")
  .argument("<name>")
  .action(async (name) => {
    const data = await readFile(`${name}.json`, true);
    console.log(data);
  });

program.parse();
