// core modules
const http = require("http");
const fs = require("fs");
const path = require("path");

// port
const PORT = 3000;

// helper function to serve html files
function serveHTML(res, filePath, statusCode = 200) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    } else {
      res.writeHead(statusCode, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
}

// create server
const server = http.createServer((req, res) => {
  const url = req.url;

  // ROUTES FOR HTML PAGES
  if (url === "/" || url === "/home") {
    serveHTML(res, path.join(__dirname, "pages", "home.html"));
  } 
  else if (url === "/about") {
    serveHTML(res, path.join(__dirname, "pages", "about.html"));
  } 
  else if (url === "/contact") {
    serveHTML(res, path.join(__dirname, "pages", "contact.html"));
  }

  // STATIC FILES (CSS & JS)
  else if (url === "/style.css") {
    fs.readFile(path.join(__dirname, "public", "style.css"), (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end();
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(data);
      }
    });
  } 
  else if (url === "/script.js") {
    fs.readFile(path.join(__dirname, "public", "script.js"), (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end();
      } else {
        res.writeHead(200, { "Content-Type": "text/javascript" });
        res.end(data);
      }
    });
  }

  // 404 PAGE
  else {
    serveHTML(
      res,
      path.join(__dirname, "pages", "404.html"),
      404
    );
  }
});

// start server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
