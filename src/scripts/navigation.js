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

// Formulário de contato: monta o e-mail com os dados preenchidos.
const form = document.querySelector("[data-contact-form]");
if (form) {
  // Vindo de "Pedir proposta" (/contato/?plano=gestao), o plano já vem marcado.
  const plano = new URLSearchParams(location.search).get("plano");
  const sel = form.querySelector("[data-plano]");
  if (plano && sel && [...sel.options].some((o) => o.value === plano)) sel.value = plano;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const d = new FormData(form);
    const subject = `Demonstração Arcondo: ${d.get("condominio")}`;
    const body = [
      `Nome: ${d.get("nome")}`,
      `Função: ${d.get("funcao")}`,
      `Condomínio ou administradora: ${d.get("condominio")}`,
      `Número de unidades: ${d.get("unidades")}`,
      `Plano de interesse: ${form.querySelector("[data-plano]")?.selectedOptions[0]?.text || "Ainda não sei"}`,
      `Telefone: ${d.get("telefone")}`,
      "",
      d.get("mensagem") || ""
    ].join("\n");
    window.location.href = `mailto:${form.dataset.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    form.querySelector("[data-sent]").hidden = false;
  });
}
