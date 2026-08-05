const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.resolve('D:/Desktop/protofoliokarim/LUXE store');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.mp4': 'video/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};
http.createServer((req, res) => {
  let reqPath = decodeURIComponent((req.url || '/').split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.normalize(path.join(root, reqPath));
  if (!filePath.startsWith(root)) {
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end('Not found');
      return;
    }
    res.setHeader('Content-Type', mime[path.extname(filePath).toLowerCase()] || 'application/octet-stream');
    res.end(data);
  });
}).listen(8080, '127.0.0.1', () => {
  console.log('LUXE server running on http://127.0.0.1:8080');
});
