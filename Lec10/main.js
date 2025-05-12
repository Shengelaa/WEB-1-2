#!/usr/bin/env node

import { Command } from "commander";
import { readFile, writeFile } from "./utils.js";

const program = new Command();

program
  .name("Movie Cli Tool")
  .description("Simple movie crud")
  .version("1.0.0");

program
  .command("show")
  .option("-g, --genre <genre>")
  .option("-r, --rating <rating>")
  .action(async (opts) => {
    let movies = await readFile("movie.json", true);
    if (opts.genre) {
      movies = movies.filter((el) => el.genre === opts.genre);
      console.log(movies);
    }

    if (opts.rating) {
      movies = movies.filter((el) => el.rating >= Number(opts.rating));
      console.log(movies);
    }
    console.log(movies);
  });

program
  .command("add")
  .argument("<name>")
  .argument("<genre>")
  .argument("<rating>")

  .action(async (name, genre, rating) => {
    const movies = await readFile("movie.json", true);
    const lastId = movies[movies.length - 1]?.id || 0;

    const newMovie = {
      id: lastId + 1,
      name,
      genre,
      rating: Number(rating),
    };

    movies.push(newMovie);
    await writeFile("movie.json", JSON.stringify(movies));
    console.log("added successfully");
  });

program
  .command("delete")
  .argument("<id>")
  .action(async (id) => {
    const movies = await readFile("movie.json", true);
    const index = movies.findIndex((el) => el.id === Number(id));
    if (index === -1) {
      console.log("cannot delete");
      return;
    }

    const deletedItem = movies.splice(index, 1);

    await writeFile("movie.json", JSON.stringify(movies));
    console.log("deleted successfully", deletedItem);
  });

program
  .command("update")
  .argument("<id>")
  .option("-n, --name <name>")
  .option("-g, --genre <genre>")
  .option("-r, --rating <rating>")
  .action(async (id, opts) => {
    const movies = await readFile("movie.json", true);
    const index = movies.findIndex((el) => el.id === Number(id));
    if (index === -1) {
      console.log("cannot delete");
      return;
    }
    if (opts.rating) {
      opts.rating = Number(opts.rating);
    }
    movies[index] = {
      ...movies[index],
      ...opts,
    };
    await writeFile("movie.json", JSON.stringify(movies));
    console.log("updated successfully", movies[index]);
  });
program.parse();
