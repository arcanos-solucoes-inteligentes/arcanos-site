// Gera a apresentação comercial do CondoSmart (PDF, A4 paisagem) a partir do MESMO conteúdo do site
// (src/data/site.js), das mesmas cores e fontes, e de quadros dos vídeos gravados no DEMO.
//
//   npm install && npx playwright install chromium   (uma vez)
//   node gerar.mjs                                    -> CondoSmart-apresentacao.pdf
//   REPRESENTANTE="Nome" TELEFONE="(11) 90000-0000" node gerar.mjs   (opcional: nome/telefone na última página)
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { company, audiences, packageJourney, featureGroups, trustPoints, plans, onboardingSteps, assistente } from "../src/data/site.js";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const fachada = fs.readFileSync(path.join(DIR, "img/fachada.svg"), "utf8").replace(/^<svg class="facade"/, '<svg class="fachada"');
const logo = "../public/images/brand/arcanos-lockup.svg";
const grupo = (id) => featureGroups.find((g) => g.id === id);
const REP = process.env.REPRESENTANTE, TEL = process.env.TELEFONE;
let n = 1; // a capa é a página 1 e não leva número

const rodape = (nota) => `
  <footer class="rodape"><span>CondoSmart by Arcanos · arcanossolucoes.com</span>${nota ? `<span>${esc(nota)}</span>` : ""}<span>${++n}</span></footer>`;
const demo = "Telas do condomínio de demonstração, com dados fictícios.";
const phone = (img, alt) => `<div class="phone"><img src="img/${img}.jpg" alt="${esc(alt)}"></div>`;
const painel = (img, titulo, alt) => `<div class="painel"><div class="painel__top"><i></i><i></i><i></i><em>${esc(titulo)}</em></div><img src="img/${img}.jpg" alt="${esc(alt)}"></div>`;
const checks = (items) => `<ul class="checks">${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;

const paginas = [];

// 1. Capa
paginas.push(`
<section class="page noite capa">
  <div class="capa__txt">
    <img class="capa__logo" src="${logo}" alt="Arcanos Soluções Inteligentes">
    <p class="kicker">Apresentação comercial</p>
    <h1 class="display">O condomínio em ordem, do portão ao apartamento.</h1>
    <p class="lead">CondoSmart é a plataforma da Arcanos para síndicos, administradoras e portarias. Encomendas, visitantes, reservas e comunicados num só lugar, com o ${assistente.name}, um assistente de IA que responde pelo regimento e faz o que cada um pode fazer.</p>
  </div>
  <div class="capa__art">
    ${fachada}
    <div class="notif"><div class="notif__ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f4b942" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8 12 3 3 8v8l9 5 9-5V8Z"/><path d="m3 8 9 5 9-5M12 13v8"/></svg></div>
      <div><p class="notif__app"><span>CondoSmart</span><span>agora</span></p><p class="notif__t">Sua encomenda chegou</p><p class="notif__b">Apto 72, Bloco B. Para retirar, escaneie o QR Code da portaria.</p></div></div>
  </div>
  <p class="capa__frase">${esc(company.brandQuote)}</p>
</section>`);

// 2. Para quem
paginas.push(`
<section class="page papel">
  <header class="cab"><p class="kicker">Para quem é</p><h2 class="h2">Cada pessoa do condomínio vê a parte que lhe cabe.</h2></header>
  <div class="aud4">
    ${audiences.map((a) => `<article class="aud">
      <h3>${esc(a.name)}</h3>
      <p class="aud__dor">${esc(a.pain)}</p>
      <p class="aud__ganho">${esc(a.gain)}</p>
      ${checks(a.points)}
    </article>`).join("")}
  </div>
  ${rodape()}
</section>`);

// 3. Encomendas
paginas.push(`
<section class="page noite">
  <div class="duas">
    <div class="col">
      <p class="kicker">Encomendas</p>
      <h2 class="h2">A encomenda que chega às 14h não pode virar problema às 22h.</h2>
      <p class="sub">É a dor número um da portaria. Por isso foi a primeira coisa que resolvemos.</p>
      <ol class="jornada">${packageJourney.map((s) => `<li><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`).join("")}</ol>
    </div>
    <div class="col col--img">
      <div class="phones">
        <figure>${phone("portaria", "Painel da portaria no CondoSmart com retirada urgente")}<figcaption>Portaria: retirada urgente separada do resto, com a instrução de cada tipo.</figcaption></figure>
        <figure class="baixo">${phone("morador", "App do morador com as encomendas na portaria")}<figcaption>Morador: a encomenda no app assim que é registrada.</figcaption></figure>
      </div>
    </div>
  </div>
  ${rodape(demo)}
</section>`);

// 4. Marquinhos
paginas.push(`
<section class="page noite">
  <div class="duas">
    <div class="col">
      <p class="kicker">Assistente de IA</p>
      <h2 class="h2">Conheça o ${assistente.name}. Ele leu o regimento e sabe usar o app.</h2>
      <p class="sub">O morador pergunta, a portaria pede, o síndico consulta. O ${assistente.name} responde com a fonte e faz o que a função de cada um permite, sempre com confirmação.</p>
      <ul class="pilares">${assistente.pillars.map((p) => `<li><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p><p class="ex">${esc(p.example)}</p></li>`).join("")}</ul>
    </div>
    <div class="col col--img">
      <div class="combo">
        ${phone("assistente-morador", "Marquinhos no celular do morador confirmando a reserva da churrasqueira")}
        ${painel("assistente-sindico", `${assistente.name} · painel do síndico`, "Marquinhos no painel do síndico com o resumo do condomínio no mês")}
      </div>
    </div>
  </div>
  ${rodape(demo)}
</section>`);

// 5. Marquinhos: o que faz e proteções
paginas.push(`
<section class="page papel">
  <header class="cab"><p class="kicker">Assistente de IA</p><h2 class="h2">O que cada perfil pede ao ${assistente.name}, e por que é seguro.</h2></header>
  <div class="acoes">
    ${assistente.actions.map((a) => `<div><h3>${esc(a.profile)}</h3>${checks(a.items)}</div>`).join("")}
  </div>
  <div class="regra"></div>
  <div class="trust trust--sm">${assistente.safety.map((t) => `<div><h3>${esc(t.title)}</h3><p>${esc(t.text)}</p></div>`).join("")}</div>
  <p class="tecnica">${assistente.tech.map(esc).join(" · ")}</p>
  ${rodape()}
</section>`);

// 6. Funcionalidades
const lista = (g) => `<div class="fg"><h3>${esc(g.title)}</h3><p>${esc(g.summary)}</p><ul>${g.features.map((f) => `<li>${esc(f.name)}${f.tag ? ` <span class="tag">${esc(f.tag)}</span>` : ""}</li>`).join("")}</ul></div>`;
paginas.push(`
<section class="page branco">
  <div class="duas duas--func">
    <div class="col">
      <p class="kicker">Funcionalidades</p>
      <h2 class="h2">Da portaria à prestação de contas.</h2>
      <p class="sub">Os módulos são ligados por condomínio. Comece pelo que mais pesa e amplie quando fizer sentido.</p>
      <div class="fgs">${["portaria", "moradores", "gestao"].map((id) => lista(grupo(id))).join("")}</div>
      <p class="faixa">Funciona no navegador do celular, tablet ou computador, sem passar pela loja de aplicativos. Interface em português, inglês, espanhol ou chinês.</p>
      <p class="breve">Em desenvolvimento: ${grupo("em-breve").features.map((f) => esc(f.name)).join(", ")}.</p>
    </div>
    <div class="col col--img">
      <figure>${painel("sindico", "CondoSmart · Relatórios do síndico", "Relatórios do síndico: encomendas em 90 dias")}<figcaption>Relatórios do síndico, com exportação em PDF e planilha.</figcaption></figure>
      <figure>${painel("vagas", "CondoSmart · Mapa da garagem", "Mapa da garagem com a vaga S1-08 destacada")}<figcaption>Mapa da garagem: planta, situação de cada vaga e sorteio auditável.</figcaption></figure>
    </div>
  </div>
  ${rodape(demo)}
</section>`);

// 7. Segurança e LGPD
paginas.push(`
<section class="page noite">
  <header class="cab"><p class="kicker">Segurança e LGPD</p><h2 class="h2">Dados de moradores são responsabilidade do síndico. Cuidamos deles como se fossem nossos.</h2></header>
  <div class="trust">${trustPoints.map((t) => `<div><h3>${esc(t.title)}</h3><p>${esc(t.text)}</p></div>`).join("")}</div>
  <p class="manifesto">Cada condomínio isolado. Cada pessoa na sua função. Cada ação registrada.</p>
  ${rodape()}
</section>`);

// 8. Planos e implantação
paginas.push(`
<section class="page papel">
  <header class="cab"><p class="kicker">Planos e implantação</p><h2 class="h2">O plano acompanha o tamanho e a rotina do condomínio.</h2></header>
  <div class="planos">
    ${plans.map((p) => `<article class="plano${p.highlight ? " plano--hi" : ""}"><h3>${esc(p.name)}</h3><p class="fit">${esc(p.fit)}</p><p>${esc(p.text)}</p>${checks(p.items)}<p class="preco">Sob proposta<small>Calculado pelo número de unidades</small></p></article>`).join("")}
  </div>
  <p class="nota">Módulos adicionais, como controle de acesso, botão de pânico e o assistente de IA, podem ser ligados em qualquer plano. As ações pelo chat fazem parte do plano Pro do assistente.</p>
  <h3 class="h3 impl">Do primeiro contato à portaria operando sozinha</h3>
  <ol class="etapas">${onboardingSteps.map((s) => `<li><h4>${esc(s.title)}</h4><p>${esc(s.text)}</p></li>`).join("")}</ol>
  ${rodape()}
</section>`);

// 9. Contato
paginas.push(`
<section class="page noite fim">
  <div class="fim__txt">
    <img class="capa__logo" src="${logo}" alt="Arcanos Soluções Inteligentes">
    <h2 class="display fim__h">Veja o CondoSmart funcionando na rotina do seu condomínio.</h2>
    <p class="lead">Uma demonstração de 30 minutos, por vídeo ou presencial, com os fluxos que você usa hoje: encomendas, visitantes, reservas e comunicados. Depois, uma proposta pelo número de unidades e pelos módulos.</p>
  </div>
  <div class="fim__card">
    <h3>Agende sua demonstração</h3>
    <p><span>E-mail</span><b>${esc(company.contactEmail)}</b></p>
    <p><span>Site</span><b>arcanossolucoes.com</b></p>
    ${REP ? `<p><span>Contato</span><b>${esc(REP)}</b></p>` : ""}
    ${TEL ? `<p><span>Telefone</span><b>${esc(TEL)}</b></p>` : ""}
    <p class="fim__cli">Já usa o CondoSmart? Entre pelo botão <b>Entrar</b> em arcanossolucoes.com.</p>
  </div>
  <p class="capa__frase">${esc(company.brandQuote)}</p>
  <p class="legal">${esc(company.legalName)}</p>
</section>`);

const css = `
@page { size: 297mm 210mm; margin: 0; }
:root { --noite:#071225; --abismo:#020817; --noite2:#0e1c38; --ouro:#e9a522; --ouro-claro:#f4b942; --ouro-texto:#9a6a07; --papel:#f6f7fa; --tinta:#0e1a30; --nevoa:#556074; --nevoa-e:#a9b3c4; --linha:#dde2eb; --linha-e:rgba(255,255,255,.14); }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font-family: "Red Hat Text", "Segoe UI", sans-serif; font-size: 10.2pt; line-height: 1.5; color: var(--tinta); }
h1,h2,h3,h4 { font-family: "Red Hat Display", "Segoe UI", sans-serif; margin: 0; line-height: 1.12; letter-spacing: -.015em; }
p { margin: 0; } ul, ol { margin: 0; padding: 0; list-style: none; } img { display: block; }
.page { position: relative; width: 297mm; height: 210mm; padding: 15mm 17mm 14mm; overflow: hidden; break-after: page; }
.page:last-child { break-after: auto; }
.noite { background: radial-gradient(120% 90% at 85% 8%, var(--noite2) 0%, var(--noite) 45%, var(--abismo) 100%); color: #fff; }
.papel { background: var(--papel); } .branco { background: #fff; }
.kicker { font: 600 10.5pt "Red Hat Display"; color: var(--ouro-texto); margin-bottom: 2.4mm; } .noite .kicker { color: var(--ouro-claro); }
.display { font-size: 35pt; font-weight: 700; letter-spacing: -.03em; line-height: 1.05; }
.h2 { font-size: 24pt; font-weight: 700; letter-spacing: -.025em; } .h3 { font-size: 13pt; font-weight: 600; }
.lead, .sub { font-size: 12pt; line-height: 1.5; } .noite .lead, .noite .sub { color: #c8d0dd; } .sub { margin-top: 3.5mm; color: var(--nevoa); }
.cab { max-width: 215mm; margin-bottom: 7mm; }
.checks li { position: relative; padding: 1.5mm 0 1.5mm 6.5mm; border-bottom: .2mm solid var(--linha); }
.checks li::before { content:""; position:absolute; left:0; top:2.7mm; width:3mm; height:1.7mm; border-left:.55mm solid var(--ouro); border-bottom:.55mm solid var(--ouro); transform: rotate(-45deg); }
.noite .checks li { border-color: var(--linha-e); }
.rodape { position:absolute; left:17mm; right:17mm; bottom:7mm; display:flex; justify-content:space-between; gap:8mm; font-size:7pt; color: var(--nevoa); }
.noite .rodape { color: var(--nevoa-e); }
.tag { font: 600 6.2pt "Red Hat Text"; padding: .3mm 1.6mm; border: .2mm solid var(--linha); border-radius: 5mm; color: var(--nevoa); white-space: nowrap; }

/* capa */
.capa { display:grid; grid-template-columns: 1.05fr 1fr; gap: 6mm; align-items:center; }
.capa__logo { height: 16mm; width:auto; margin-bottom: 13mm; }
.capa__txt .kicker { margin-bottom: 4mm; } .capa__txt .lead { margin-top: 7mm; max-width: 120mm; }
.capa__art { position:relative; height: 170mm; } .fachada { width:100%; height:100%; }
.fachada .win{fill:#13254a} .fachada .win--on{fill:#f4c46a} .fachada .win--alvo{fill:#ffd27a}
.fachada .trail{fill:none;stroke:url(#rastro);stroke-width:3.5;stroke-linecap:round} .fachada .trail-soft{fill:none;stroke:rgba(244,185,66,.28);stroke-width:12;stroke-linecap:round}
.notif { position:absolute; left:0; top:12mm; width:72mm; background:rgba(255,255,255,.97); color:var(--tinta); border-radius:4mm; padding:3mm; display:grid; grid-template-columns:9mm 1fr; gap:2.6mm; box-shadow:0 6mm 12mm -3mm rgba(0,0,0,.5); }
.notif__ic { width:9mm; height:9mm; border-radius:2.4mm; background:var(--noite); display:grid; place-items:center; }
.notif__app { font-size:6.5pt; color:var(--nevoa); display:flex; justify-content:space-between; } .notif__t { font:700 8.6pt "Red Hat Display"; } .notif__b { font-size:7.4pt; color:var(--nevoa); line-height:1.35; }
.capa__frase { position:absolute; left:17mm; bottom:10mm; font:500 8.6pt "Red Hat Display"; color: var(--ouro-claro); }

/* para quem */
.aud4 { display:grid; grid-template-columns: repeat(4,1fr); gap: 6mm; }
.aud { background:#fff; border:.2mm solid var(--linha); border-radius:3mm; padding:5.5mm 5mm; display:flex; flex-direction:column; }
.aud h3 { font-size: 14pt; padding-bottom:3mm; margin-bottom:3mm; border-bottom: .5mm solid var(--ouro); }
.aud__dor { color: var(--nevoa); font-size: 9.2pt; padding-bottom:3mm; }
.aud__ganho { font: 600 11pt/1.38 "Red Hat Display"; margin-bottom:3.5mm; flex:1; }
.aud .checks li { font-size: 9pt; }

/* duas colunas */
.duas { display:grid; grid-template-columns: 1.05fr 1fr; gap: 9mm; height: 176mm; align-items:start; }
.col--img { height:100%; display:flex; align-items:center; justify-content:center; }
.jornada { margin-top: 7mm; position:relative; counter-reset: p; }
.jornada li { position:relative; padding: 0 0 7mm 12mm; counter-increment:p; }
.jornada li::before { content: counter(p); position:absolute; left:0; top:0; width:7.6mm; height:7.6mm; border-radius:50%; border:.5mm solid var(--ouro); background:var(--noite); color:var(--ouro-claro); font:700 9pt "Red Hat Display"; display:grid; place-items:center; z-index:1; }
.jornada li:not(:last-child)::after { content:""; position:absolute; left:3.7mm; top:7.6mm; bottom:0; width:.4mm; background:linear-gradient(var(--ouro), rgba(233,165,34,.2)); }
.jornada h3 { font-size:13pt; margin-bottom:.8mm; } .jornada p { color:var(--nevoa-e); font-size:9.8pt; }
.phones { display:flex; gap:7mm; align-items:flex-start; } .phones figure { margin:0; width:52mm; } .phones .baixo { margin-top:12mm; }
figcaption { margin-top:2.6mm; font-size:8.4pt; color:var(--nevoa-e); line-height:1.4; } .branco figcaption { color: var(--nevoa); }
.phone { background:var(--abismo); border-radius:7mm; padding:1.5mm; box-shadow:0 8mm 14mm -6mm rgba(0,0,0,.6), inset 0 0 0 .2mm rgba(255,255,255,.1); }
.phone img { width:100%; border-radius:5.6mm; }
.painel { background:#fff; border:.2mm solid var(--linha); border-radius:3mm; overflow:hidden; box-shadow:0 8mm 14mm -8mm rgba(7,18,37,.4); }
.painel__top { display:flex; align-items:center; gap:1.2mm; padding:2mm 3mm; background:var(--noite); color:var(--nevoa-e); font-size:6.8pt; } .painel__top i { width:1.8mm; height:1.8mm; border-radius:50%; background:rgba(255,255,255,.2); } .painel__top em { font-style:normal; margin-left:2mm; }
.painel img { width:100%; }

/* marquinhos */
.pilares { margin-top:7mm; display:grid; gap:6mm; }
.pilares li { padding-left:4.2mm; border-left:.6mm solid var(--ouro); }
.pilares h3 { font-size:14pt; margin-bottom:.8mm; } .pilares p { color:var(--nevoa-e); font-size:9.8pt; } .pilares .ex { margin-top:1.2mm; color:var(--ouro-claro); font-size:9pt; }
.combo { display:flex; gap:6mm; align-items:flex-end; } .combo .phone { width:54mm; flex-shrink:0; } .combo .painel { width:84mm; margin-bottom:6mm; }
.acoes { display:grid; grid-template-columns:repeat(3,1fr); gap:9mm; } .acoes h3 { font-size:13pt; margin-bottom:2mm; } .acoes .checks li { font-size:9.6pt; padding-block:1.4mm; } .acoes .checks li::before { top:2.5mm; }
.regra { height:.2mm; background:var(--linha); margin:7mm 0; }
.trust { display:grid; grid-template-columns:repeat(3,1fr); gap: 12mm 10mm; }
.trust h3 { font-size:14pt; padding-top:3.4mm; border-top:.6mm solid var(--ouro); margin-bottom:2mm; } .trust p { color: var(--nevoa-e); font-size:10.3pt; }
.papel .trust p { color: var(--nevoa); } .trust--sm { gap: 6mm 9mm; } .trust--sm h3 { font-size:11.5pt; padding-top:2.4mm; } .trust--sm p { font-size:9pt; line-height:1.42; }
.tecnica { margin-top:6mm; font-size:8.6pt; color:var(--nevoa); }

.manifesto { position:absolute; left:17mm; right:17mm; bottom:19mm; padding-top:6mm; border-top:.2mm solid var(--linha-e); font:700 20pt "Red Hat Display"; letter-spacing:-.02em; color:var(--ouro-claro); }

/* funcionalidades */
.duas--func { grid-template-columns: 1.25fr .85fr; }
.fgs { display:grid; grid-template-columns:repeat(3,1fr); gap:6mm; margin-top:7mm; }
.fg h3 { font-size:11.8pt; padding-top:2.2mm; border-top:.6mm solid var(--ouro); margin-bottom:1.2mm; } .fg > p { font-size:8.2pt; color:var(--nevoa); margin-bottom:2mm; line-height:1.4; }
.fg li { font-size:9pt; padding:1.3mm 0; border-bottom:.2mm solid var(--linha); line-height:1.3; }
.faixa { margin-top:9mm; padding-left:4.2mm; border-left:.6mm solid var(--ouro); font:500 10.5pt/1.45 "Red Hat Display"; max-width:130mm; }
.breve { margin-top:6mm; font-size:8.8pt; color:var(--nevoa); }
.duas--func .col--img { flex-direction:column; gap:7mm; justify-content:center; } .duas--func figure { margin:0; width:100%; }

/* planos */
.planos { display:grid; grid-template-columns:repeat(3,1fr); gap:6mm; }
.plano { background:#fff; border:.2mm solid var(--linha); border-radius:3mm; padding:5mm; display:flex; flex-direction:column; }
.plano--hi { border:.6mm solid var(--ouro); } .plano h3 { font-size:14pt; } .fit { color:var(--nevoa); font-size:9pt; margin:.8mm 0 2.4mm; }
.plano > p:not(.fit):not(.preco) { font-size:9.2pt; } .plano .checks { margin:2.4mm 0 3mm; flex:1; } .plano .checks li { font-size:9pt; padding-block:1.3mm; } .plano .checks li::before { top:2.4mm; }
.preco { font:700 12.5pt "Red Hat Display"; padding-top:3mm; border-top:.2mm solid var(--linha); } .preco small { display:block; font:400 7.4pt "Red Hat Text"; color:var(--nevoa); }
.nota { margin-top:5mm; font-size:8.6pt; color:var(--nevoa); } .impl { margin:9mm 0 4mm; }
.etapas { display:grid; grid-template-columns:repeat(4,1fr); gap:6mm; counter-reset:e; } .etapas li { counter-increment:e; } .etapas li::before { content:"Etapa " counter(e); display:block; font:600 9pt "Red Hat Display"; color:var(--ouro-texto); margin-bottom:1mm; }
.etapas h4 { font-size:10.8pt; margin-bottom:1mm; } .etapas p { font-size:8.8pt; color:var(--nevoa); line-height:1.4; }

/* fim */
.fim { display:grid; grid-template-columns:1.15fr 1fr; gap:14mm; align-items:center; }
.fim__h { font-size:30pt; margin:0 0 6mm; } .fim .capa__logo { margin-bottom: 12mm; }
.fim__card { background:rgba(255,255,255,.06); border:.2mm solid var(--linha-e); border-radius:4mm; padding:8mm; }
.fim__card h3 { font-size:14pt; margin-bottom:5mm; padding-bottom:3mm; border-bottom:.6mm solid var(--ouro); }
.fim__card p { display:flex; justify-content:space-between; gap:5mm; padding:2.2mm 0; border-bottom:.2mm solid var(--linha-e); font-size:9.6pt; } .fim__card span { color:var(--nevoa-e); } .fim__card b { font-family:"Red Hat Display"; }
.fim__card .fim__cli { display:block; border:0; margin-top:4mm; color:var(--nevoa-e); font-size:8.6pt; } .fim__cli b { color:#fff; }
.legal { position:absolute; right:17mm; bottom:10mm; font-size:7pt; color:var(--nevoa-e); }
`;

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>CondoSmart by Arcanos | Apresentação comercial</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@500;600;700&family=Red+Hat+Text:wght@400;500;600&display=swap">
<style>${css}</style></head><body>${paginas.join("\n")}</body></html>`;

fs.writeFileSync(path.join(DIR, "apresentacao.html"), html);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("file://" + path.join(DIR, "apresentacao.html"), { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
const fontes = await page.evaluate(() => ["Red Hat Display", "Red Hat Text"].map((f) => `${f}: ${document.fonts.check(`12px "${f}"`)}`));
console.log("fontes:", fontes.join(" | "));
const estouro = await page.evaluate(() => [...document.querySelectorAll(".page")].map((p, i) => {
  const lim = p.getBoundingClientRect(); const rod = p.querySelector(".rodape")?.getBoundingClientRect();
  const filhos = [...p.children].filter((c) => !c.classList.contains("rodape") && getComputedStyle(c).position !== "absolute");
  const base = Math.max(...filhos.map((c) => c.getBoundingClientRect().bottom));
  return { pagina: i + 1, sobra_mm: Math.round(((rod ? rod.top : lim.bottom - 20) - base) / 3.7795), };
}));
console.log("folga até o rodapé (mm, negativo = estoura):", estouro.map((e) => `${e.pagina}:${e.sobra_mm}`).join("  "));
await page.pdf({ path: path.join(DIR, "CondoSmart-apresentacao.pdf"), width: "297mm", height: "210mm", printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log("PDF gerado");
