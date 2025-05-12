#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

program
  .name("Movie Cli Tool")
  .description("Simple movie crud")
  .version("1.0.0");

program
  .command("convert")
  .argument("<ammount>")
  .argument("<from>")
  .argument("<to>")

  .action(async (ammount, from, to) => {
    const resp = await fetch(
      `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${ammount}&access_key=03b4c477902e9d6cb0f92b13b6b84a53`
    );

    const data = await resp.json();

    console.log(`${ammount} ${from} is ${data.result} ${to}`);
  });
program.parse();
