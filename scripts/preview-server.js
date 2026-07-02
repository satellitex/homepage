// 本番ビルド(out/)を GitHub Pages と同じ /homepage ベースパスで配信する確認用サーバ。
// 使い方: pnpm build && pnpm preview → http://localhost:3000/homepage/
const http = require("http")
const fs = require("fs")
const path = require("path")

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000
const BASE_PATH = "/homepage"
const OUT_DIR = path.join(__dirname, "..", "out")

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
}

const server = http.createServer((req, res) => {
  let urlPath
  try {
    urlPath = decodeURIComponent(new URL(req.url, `http://localhost:${PORT}`).pathname)
  } catch {
    res.writeHead(400).end("Bad request")
    return
  }

  if (urlPath === "/") {
    res.writeHead(302, { Location: `${BASE_PATH}/` }).end()
    return
  }
  if (urlPath.startsWith(BASE_PATH)) {
    urlPath = urlPath.slice(BASE_PATH.length) || "/"
  }

  // out/ の外を参照させない
  const resolved = path.join(OUT_DIR, path.normalize(urlPath))
  if (!resolved.startsWith(OUT_DIR + path.sep) && resolved !== OUT_DIR) {
    res.writeHead(403).end("Forbidden")
    return
  }

  // trailingSlash: true のためディレクトリは index.html を返す
  let filePath = resolved
  const stat = fs.statSync(filePath, { throwIfNoEntry: false })
  if (stat?.isDirectory()) {
    filePath = path.join(filePath, "index.html")
  }
  if (!fs.existsSync(filePath)) {
    const notFound = path.join(OUT_DIR, "404.html")
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" })
    res.end(fs.existsSync(notFound) ? fs.readFileSync(notFound) : "Not found")
    return
  }

  res.writeHead(200, {
    "Content-Type": contentTypes[path.extname(filePath)] ?? "application/octet-stream",
  })
  res.end(fs.readFileSync(filePath))
})

server.listen(PORT, () => {
  console.log(`Preview server: http://localhost:${PORT}${BASE_PATH}/`)
})
