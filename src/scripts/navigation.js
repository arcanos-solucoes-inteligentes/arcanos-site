import { montarEmail, paginaDeOrigem, rotuloDoBotao } from "./contato.js";

// Menu mobile
const menuBtn = document.querySelector("[data-menu]");
const nav = document.querySelector("[data-nav]");

if (menuBtn && nav) {
  const setOpen = (open) => {
    nav.dataset.open = String(open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.textContent = open ? "Fechar" : "Menu";
  };
  menuBtn.addEventListener("click", () => setOpen(nav.dataset.open !== "true"));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.dataset.open === "true") {
      setOpen(false);
      menuBtn.focus();
    }
  });
}

// Abas "Para quem" (padrão WAI-ARIA tabs, setas trocam a aba)
document.querySelectorAll("[data-tabs]").forEach((root) => {
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const select = (tab) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(tab));
    tab.addEventListener("keydown", (e) => {
      const dir = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (!dir) return;
      e.preventDefault();
      const next = tabs[(i + dir + tabs.length) % tabs.length];
      select(next);
      next.focus();
    });
  });
});

// Formulário de contato: o e-mail sai com o assunto da intenção (proposta de um plano,
// plano personalizado ou demonstração), o plano escolhido e de onde a pessoa veio.
const form = document.querySelector("[data-contact-form]");
if (form) {
  const params = new URLSearchParams(location.search);
  const sel = form.querySelector("[data-plano]");
  const btn = form.querySelector("[data-enviar]");
  const plano = params.get("plano");
  if (plano && sel && [...sel.options].some((o) => o.value === plano)) sel.value = plano;
  const pagina = paginaDeOrigem(document.referrer, location.origin);
  const botao = params.get("origem");
  const sincronizar = () => { if (btn && sel) btn.textContent = rotuloDoBotao(sel.value); };
  sel?.addEventListener("change", sincronizar);
  sincronizar();

  const status = form.querySelector("[data-sent]");
  const previa = form.querySelector("[data-previa]");
  const reabrir = form.querySelector("[data-reabrir]");
  const copiar = form.querySelector("[data-copiar]");
  let ultimo = null;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const d = Object.fromEntries(new FormData(form));
    ultimo = montarEmail({
      para: form.dataset.to,
      dados: d,
      planoId: sel?.value || "",
      planoNome: sel?.selectedOptions[0]?.text || "",
      pagina,
      botao
    });
    if (previa) previa.textContent = `Assunto: ${ultimo.subject}\n\n${ultimo.body}`;
    if (reabrir) reabrir.href = ultimo.url;
    if (status) status.hidden = false;
    form.dataset.mailto = ultimo.url;
    window.location.href = ultimo.url;
  });

  copiar?.addEventListener("click", async () => {
    if (!ultimo) return;
    try {
      await navigator.clipboard.writeText(`Para: ${form.dataset.to}\nAssunto: ${ultimo.subject}\n\n${ultimo.body}`);
      copiar.textContent = "Mensagem copiada";
    } catch {
      copiar.textContent = "Selecione o texto acima e copie";
    }
  });
}
