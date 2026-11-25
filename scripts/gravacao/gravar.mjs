// Grava as três cenas do site no DEMO local (localhost). Cada cena:
// login fora da gravação -> contexto gravando -> ações com ritmo calmo.
// Gera <cena>.webm bruto + <cena>.json com o instante em que a cena começa (para cortar).
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE = "http://localhost:5173";
const SENHA = process.env.DEMO_SENHA;
if (!SENHA) throw new Error("Defina DEMO_SENHA (ver scripts/gravacao/README.md)"); // senha das contas do DEMO (dados-demo/CREDENCIAIS-E-ROTEIRO.md)
const OUT = path.join(path.dirname(new URL(import.meta.url).pathname), "bruto");
fs.mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Indicador de toque: um círculo que aparece onde a cena "toca".
const TOQUE_CSS = `
.__toque{position:fixed;z-index:2147483647;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;
background:rgba(233,165,34,.35);border:2px solid rgba(233,165,34,.95);pointer-events:none;
animation:__t .55s ease-out forwards}
@keyframes __t{0%{transform:scale(.5);opacity:1}100%{transform:scale(1.35);opacity:0}}
*{scrollbar-width:none!important}*::-webkit-scrollbar{display:none!important}`;

async function tocar(page, locator) {
  await locator.scrollIntoViewIfNeeded();
  const b = await locator.boundingBox();
  const x = b.x + b.width / 2, y = b.y + b.height / 2;
  await page.mouse.move(x, y, { steps: 8 });
  await page.evaluate(([x, y]) => {
    const d = document.createElement("div");
    d.className = "__toque"; d.style.left = x + "px"; d.style.top = y + "px";
    document.body.appendChild(d); setTimeout(() => d.remove(), 700);
  }, [x, y]);
  await sleep(260);
  await locator.click();
}

async function rolar(page, total, { passo = 6, intervalo = 16, x, y } = {}) {
  const vp = page.viewportSize();
  await page.mouse.move(x ?? vp.width / 2, y ?? vp.height / 2);
  for (let feito = 0; feito < total; feito += passo) {
    await page.mouse.wheel(0, passo);
    await sleep(intervalo);
  }
}

// Rolagem com easing pela página inteira (sem eventos de roda, sem tooltip de mouse).
async function rolarSuave(page, dy, ms) {
  await page.mouse.move(1, page.viewportSize().height - 1);
  await page.evaluate(([dy, ms]) => new Promise((ok) => {
    const el = document.scrollingElement, y0 = el.scrollTop, t0 = performance.now();
    const ease = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const passo = (now) => { const t = Math.min(1, (now - t0) / ms); el.scrollTop = y0 + dy * ease(t); t < 1 ? requestAnimationFrame(passo) : ok(); };
    requestAnimationFrame(passo);
  }), [dy, ms]);
}

async function sessao(browser, email, vp) {
  const ctx = await browser.newContext({ viewport: vp, locale: "pt-BR", timezoneId: "America/Sao_Paulo" });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/login`);
  await page.fill("#email", email);
  await page.fill("#password", SENHA);
  await page.keyboard.press("Enter");
  await page.waitForURL((u) => !u.pathname.includes("login"), { timeout: 15000 });
  await sleep(1500);
  const estado = await ctx.storageState();
  await ctx.close();
  return estado;
}

async function gravar(browser, nome, { email, vp, dpr, rota, cena, pronto, preparo }) {
  const storageState = await sessao(browser, email, vp);
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: dpr, storageState, locale: "pt-BR", timezoneId: "America/Sao_Paulo" });
  await ctx.addInitScript((css) => {
    document.addEventListener("DOMContentLoaded", () => {
      const s = document.createElement("style"); s.textContent = css; document.head.appendChild(s);
    });
  }, TOQUE_CSS);
  const page = await ctx.newPage();
  await page.goto(BASE + rota);
  await page.waitForLoadState("networkidle").catch(() => {});
  if (pronto) await page.getByText(pronto, { exact: true }).first().waitFor({ timeout: 20000 });
  if (preparo) await preparo(page);
  await sleep(800);

  // Screencast do Chrome: quadros JPEG em pixels de dispositivo (nítido em 2x).
  const dir = path.join(OUT, nome);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const quadros = [];
  const cdp = await ctx.newCDPSession(page);
  cdp.on("Page.screencastFrame", async ({ data, metadata, sessionId }) => {
    const f = path.join(dir, `${String(quadros.length).padStart(5, "0")}.jpg`);
    fs.writeFileSync(f, Buffer.from(data, "base64"));
    quadros.push({ f, t: metadata.timestamp });
    await cdp.send("Page.screencastFrameAck", { sessionId }).catch(() => {});
  });
  await cdp.send("Page.startScreencast", { format: "jpeg", quality: 92, everyNthFrame: 1 });
  // Força um primeiro quadro e espera estabilizar.
  await page.evaluate(() => { document.body.style.outline = "0 solid transparent"; });
  await sleep(700);
  const inicio = Date.now() / 1000;
  await cena(page);
  const fim = Date.now() / 1000;
  await cdp.send("Page.stopScreencast");
  await sleep(300);
  await ctx.close();

  // Lista do concat com a duração real de cada quadro, cortada em [inicio, fim].
  const linhas = [];
  for (let i = 0; i < quadros.length; i++) {
    const t0 = Math.max(quadros[i].t, inicio);
    const t1 = Math.min(i + 1 < quadros.length ? quadros[i + 1].t : fim, fim);
    if (t1 <= t0) continue;
    linhas.push(`file '${quadros[i].f}'`, `duration ${(t1 - t0).toFixed(4)}`);
  }
  linhas.push(linhas[linhas.length - 2]);
  fs.writeFileSync(path.join(OUT, `${nome}.txt`), linhas.join("\n") + "\n");
  console.log(nome, { quadros: quadros.length, duracao: (fim - inicio).toFixed(1) });
}

const browser = await chromium.launch();
const apenas = process.argv[2];

const cenas = {
  portaria: {
    email: "porteiro.bosque@demo.local", vp: { width: 390, height: 844 }, dpr: 2, rota: "/porteiro",
    cena: async (page) => {
      await sleep(1300);
      await rolar(page, 520, { passo: 5, intervalo: 16 });
      await sleep(1600);
      await rolar(page, 200, { passo: 5, intervalo: 16 });
      await sleep(1600);
    }
  },
  morador: {
    email: process.env.DEMO_MORADOR, vp: { width: 390, height: 844 }, dpr: 2, rota: "/morador",
    cena: async (page) => {
      await sleep(1400);
      await rolar(page, 300, { passo: 5, intervalo: 16 });
      await sleep(700);
      await tocar(page, page.getByText("Livros", { exact: false }).first());
      await sleep(2600);
    }
  },
  sindico: {
    email: process.env.DEMO_SINDICA, vp: { width: 1280, height: 800 }, dpr: 2, rota: "/admin/relatorios",
    preparo: async (page) => {
      await page.getByRole("tab", { name: "Encomendas", exact: true }).click();
      await page.getByText("90 dias", { exact: true }).first().click();
      await page.waitForLoadState("networkidle").catch(() => {});
      await sleep(1500);
      await page.evaluate(() => window.scrollTo(0, 0));
    },
    cena: async (page) => {
      await sleep(1200);
      await rolarSuave(page, 430, 1600);
      await sleep(1500);
      await rolarSuave(page, 470, 1800);
      await sleep(2300);
    }
  }
};

for (const [nome, c] of Object.entries(cenas)) {
  if (apenas && apenas !== nome) continue;
  await gravar(browser, nome, c);
}
await browser.close();
