
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json"
};

const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, "http://localhost").pathname;

  if (pathname === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("Perde AI Studio çalışıyor!");
  }

  const requestedFile =
    pathname === "/" ? "index.html" : pathname.slice(1);

  const filePath = path.resolve(PUBLIC_DIR, requestedFile);

  if (!filePath.startsWith(PUBLIC_DIR + path.sep)) {
    res.writeHead(403);
    return res.end("Erişim reddedildi");
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404);
      return res.end("Dosya bulunamadı");
    }

    const type = mimeTypes[path.extname(filePath)] ||
      "application/octet-stream";

    res.writeHead(200, { "Content-Type": type });
    res.end(content);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Perde AI Studio ${PORT} portunda çalışıyor.`);
});
