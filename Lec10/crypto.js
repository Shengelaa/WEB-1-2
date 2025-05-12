#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

const coinMapper = {
  BTC: "bitcoin",
  ETH: "ethereum",
  XRP: "XRP",
  SOL: "solana",
  DODGE: "dogecoin",
};

program
  .name("Movie Cli Tool")
  .description("Simple movie crud")
  .version("1.0.0");

program
  .command("show")
  .argument("<coinName>")
  .action(async (coinName) => {
    const mappedCoin = coinMapper[coinName] || coinName;
    const resp = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinMapper}&vs_currencies=usd`
    );

    const data = await resp.json();
    console.log(mappedCoin, "mappedCoin is", data[mappedCoin]?.usd);
  });
program.parse();
