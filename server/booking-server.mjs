// Tiny dependency-free booking API. Stores requests in server/bookings.json.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB = path.join(__dirname, "bookings.json");
const PORT = process.env.PORT ? Number(process.env.PORT) : 4321;

function readDb() {
  try {
    return JSON.parse(fs.readFileSync(DB, "utf8"));
  } catch {
    return [];
  }
}

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/api/bookings") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(readDb()));
    return;
  }

  if (req.method === "POST" && req.url === "/api/bookings") {
    let body = "";
    req.on("data", (c) => {
      body += c;
      if (body.length > 1e5) req.destroy();
    });
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        if (!data.branchId || !data.date || !data.time || !data.name || !data.phone) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "missing fields" }));
          return;
        }
        const all = readDb();
        all.push(data);
        fs.writeFileSync(DB, JSON.stringify(all, null, 2));
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true, id: all.length }));
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "bad json" }));
      }
    });
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "not found" }));
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`booking api on :${PORT}`);
});
