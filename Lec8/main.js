const http = require("http");
const path = require("path");
const url = require("url");

const queryString = require("querystring");

const fs = require("fs/promises");
const { readFileAndParse, writeFileAndStringify } = require("./utils");

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url);
  if (parsedUrl.pathname === "/" && req.method === "GET") {
    // res.statusCode = 200;
    res.writeHead(201, {
      "content-type": "text/html", //application/json //html
    });
    res.end("Hello world");
  }

  if (parsedUrl.pathname === "/users" && req.method === "GET") {
    // const rawUsers = await fs.readFile("users.json", "utf-8");
    const users = await readFileAndParse("users.json", true);
    res.writeHead(200, {
      "content-type": "application/json",
    });

    res.end(JSON.stringify(users));
  }
  if (parsedUrl.pathname === "/echo" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      console.log(chunk, "chunk");
      body += chunk;
    });

    req.on("end", () => {
      console.log(body, "body");
    });

    res.end("rame");
  }

  if (parsedUrl.pathname === "/users" && req.method === "POST") {
    let body = "";
    let parsedData;
    req.on("data", (chunk) => {
      console.log(chunk, "chunk");
      body += chunk;
    });

    req.on("end", () => {
      parsedData = JSON.parse(body);
    });

    const users = await readFileAndParse("users.json", true);
    const lastId = users[users.length - 1]?.id || 0;
    const newUser = {
      id: lastId + 1,
      name: parsedData.name,
      email: parsedData.email,
    };

    users.push(newUser);
    await writeFileAndStringify("users.json", users, true);

    res.writeHead(201, {
      "content-type": "text/plain",
    });

    res.end("user created successfully");
  }
  if (parsedUrl.pathname === "/posts" && req.method === "GET") {
    const query = queryString.parse(parsedUrl.query);
    console.log(req.url, "req.url");
    console.log(query, "query");
    let page = Number(query.page || 1);
    let take = Number(query.takae || 30);
    take = Math.min(30, take);
    const start = (page - 1) * take;
    const end = page * take;
    const posts = await readFileAndParse("posts.json", true);

    res.writeHead(200, {
      "content-type": "application/json",
    });

    res.end(JSON.stringify(posts.slice(start, end)));
  }
  console.log(parsedUrl);
});

server.listen(4000, () => {
  console.log(`your server is running on http://localhost:4000`);
});
