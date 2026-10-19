// Smoke + visual check. Needs: `npm run server` and `npm run dev` running.
// Usage: node scripts/e2e.mjs
import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
p.on("pageerror", (e) => errors.push("pageerror: " + e.message));
p.on("console", (m) => {
  if (m.type() === "error") errors.push("console: " + m.text());
});

await p.goto("http://localhost:5173/", { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(800);

const probes = ["Большая", "Одна цена на всё меню", "От пхали до рибая", "Невский пр., 54", "Кирпичный пер., 3", "Туристская ул., 34"];
const body = await p.textContent("body");
for (const t of probes) console.log(t, "->", body.includes(t));

// menu tab
await p.click('button[role="tab"]:has-text("Хинкали и выпечка")');
await p.waitForTimeout(400);
console.log("tab items:", await p.locator("#menu li").count());

// booking end-to-end
await p.click("header >> text=Забронировать стол");
await p.waitForTimeout(400);
await p.fill('input[type="text"]', "Проверка");
await p.fill('input[type="tel"]', "+7 900 000-00-00");
await p.click('button:has-text("Отправить заявку")');
await p.waitForTimeout(1200);
const after = await p.textContent("body");
const ok = /Заявка BGK-\d+ принята/.test(after);
console.log("booking success visible:", ok);
await p.screenshot({ path: "scripts/e2e-booking.png" });

console.log("page errors:", errors.length ? errors : "none");
await b.close();
process.exit(ok && errors.length === 0 ? 0 : 1);
