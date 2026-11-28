// Teste do formulário de contato (rode com o site em http://localhost:4321): node testar-contato.mjs
// Para cada caminho até o contato: abre a página, clica no link real, preenche, envia
// e decodifica o mailto que o formulário gerou.
import { chromium } from "playwright";
const BASE = "http://localhost:4321";
const casos = [
  { nome: "Topo (na home)", pagina: "/", link: '.hdr a[href^="/contato/"]', plano: null },
  { nome: "Abertura da home", pagina: "/", link: '.hero__ctas a[href^="/contato/"]', plano: null },
  { nome: "Faixa final (Assistente IA)", pagina: "/assistente-ia/", link: '.cta a[href^="/contato/"]', plano: null },
  { nome: "Rodapé (Segurança)", pagina: "/seguranca/", link: '.ftr a[href^="/contato/"]', plano: null },
  { nome: "Entrar", pagina: "/entrar/", link: '.roles a[href^="/contato/"]', plano: null },
  { nome: "Cartão Essencial", pagina: "/planos/", link: 'a[href^="/contato/?plano=essencial"]' },
  { nome: "Cartão Gestão", pagina: "/planos/", link: 'a[href^="/contato/?plano=gestao"]' },
  { nome: "Cartão Inteligência", pagina: "/planos/", link: 'a[href^="/contato/?plano=inteligencia"]' },
  { nome: "Cartão Personalizado", pagina: "/planos/", link: '.plan--custom a[href^="/contato/"]' },
  { nome: "Seção Personalizado", pagina: "/planos/", link: '#personalizado a[href^="/contato/"]' },
  { nome: "Legenda *", pagina: "/planos/", link: '.matrix-legenda a' },
  { nome: "Acesso direto", pagina: null },
  { nome: "Gestão, mas troca p/ Inteligência", pagina: "/planos/", link: 'a[href^="/contato/?plano=gestao"]', trocar: "inteligencia" }
];
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
let falhas = 0;
for (const c of casos) {
  const p = await ctx.newPage();
  if (c.pagina) {
    await p.goto(BASE + c.pagina, { waitUntil: "networkidle" });
    await p.locator(c.link).first().click();
  } else {
    await p.goto(BASE + "/contato/", { waitUntil: "networkidle" });
  }
  await p.waitForURL(/\/contato\//);
  await p.waitForLoadState("networkidle");
  const botaoAntes = await p.textContent("[data-enviar]");
  if (c.trocar) await p.selectOption("[data-plano]", c.trocar);
  const botao = await p.textContent("[data-enviar]");
  await p.fill("#nome", "Teste QA");
  await p.selectOption("#funcao", "Síndico");
  await p.fill("#condominio", "Residencial Exemplo");
  await p.selectOption("#unidades", { index: 2 });
  await p.fill("#mensagem", "Encomendas acumulando.");
  await p.click("[data-enviar]");
  await p.waitForTimeout(300);
  const url = await p.$eval("[data-contact-form]", (f) => f.dataset.mailto || "");
  const visivel = await p.isVisible("[data-sent]");
  const previa = await p.textContent("[data-previa]");
  const reabrir = await p.getAttribute("[data-reabrir]", "href");
  const u = new URL(url);
  const subject = u.searchParams.get("subject");
  const body = u.searchParams.get("body");
  const linha = (k) => (body.split("\n").find((l) => l.startsWith(k)) || "").slice(k.length).trim();
  const ok = u.protocol === "mailto:" && u.pathname === "contato@arcanossolucoes.com" && visivel && reabrir === url && previa.includes(subject);
  if (!ok) falhas++;
  console.log(`\n[${ok ? "ok" : "FALHA"}] ${c.nome}  (botão: "${botaoAntes.trim()}"${c.trocar ? ` -> "${botao.trim()}"` : ""})`);
  console.log(`  Assunto do e-mail: ${subject}`);
  console.log(`  Plano: ${linha("Plano de interesse:")} | Veio de: ${linha("Veio de:")} | Faixa: ${linha("Faixa de apartamentos:")} | Telefone: ${linha("Telefone ou WhatsApp:")}`);
  await p.close();
}
await b.close();
console.log(`\n${falhas ? falhas + " falha(s)" : "Todos os caminhos geram o e-mail completo."}`);
