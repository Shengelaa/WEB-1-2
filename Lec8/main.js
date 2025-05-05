const http = require("http");
const path = require("path");
const url = require("url");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  if (parsedUrl.pathname === "/" && req.method === "GET") {
    res.end("Hello world");
  }
  console.log(parsedUrl);
});

server.listen(4000, () => {
  console.log(`your server is running on http://localhost:4000`);
});
