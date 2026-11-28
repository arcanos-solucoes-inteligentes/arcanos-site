// Monta o e-mail do formulário de contato. Função pura (sem DOM), para dar para testar
// o texto que chega na caixa da Arcanos: assunto conforme a intenção, plano escolhido e
// de onde a pessoa veio (página e botão).

const PAGINAS = {
  "/": "Início",
  "/funcionalidades/": "Funcionalidades",
  "/assistente-ia/": "Assistente de IA",
  "/seguranca/": "Segurança e LGPD",
  "/planos/": "Planos",
  "/entrar/": "Entrar",
  "/contato/": "Contato"
};

const BOTOES = {
  topo: "botão \"Agendar demonstração\" do topo",
  inicio: "botão \"Agendar demonstração\" da abertura",
  faixa: "botão \"Agendar demonstração\" do fim da página",
  rodape: "link \"Falar com a Arcanos\" do rodapé",
  entrar: "link \"Agende uma demonstração\" da página Entrar",
  cartao: "botão do cartão de plano",
  personalizado: "botão \"Montar meu plano\" da seção Personalizado",
  legenda: "link \"consulte um especialista\" da comparação de planos"
};

/** Nome legível da página de onde a pessoa veio (só o mesmo site conta). */
export function paginaDeOrigem(referrer, origin) {
  if (!referrer) return null;
  try {
    const u = new URL(referrer);
    if (u.origin !== origin) return null;
    return PAGINAS[u.pathname] || u.pathname;
  } catch {
    return null;
  }
}

/** Assunto conforme a intenção: proposta de um plano, plano personalizado ou demonstração. */
export function assuntoDe(planoId, planoNome) {
  if (planoId === "personalizado") return "Montar um plano personalizado";
  if (planoId) return `Proposta do plano ${planoNome}`;
  return "Agendar demonstração";
}

/** Texto do botão de enviar, com o mesmo nome da ação que a pessoa escolheu. */
export function rotuloDoBotao(planoId) {
  if (planoId === "personalizado") return "Montar meu plano";
  if (planoId) return "Pedir proposta";
  return "Pedir demonstração";
}

const ou = (v, vazio = "não informado") => (v && String(v).trim()) || vazio;

// Etiqueta fixa no começo de todo assunto que sai do site. É o gatilho do filtro do Gmail
// que leva os pedidos para o marcador de vendas (ver docs/filtro-email-vendas.md).
// Não mude sem atualizar o filtro: os e-mails deixariam de cair no marcador.
export const ETIQUETA = "[Site Arcondo]";

/**
 * @param {object} c
 * @param {string} c.para          e-mail da Arcanos
 * @param {object} c.dados         campos do formulário
 * @param {string} c.planoId       "" | "essencial" | "gestao" | "inteligencia" | "personalizado"
 * @param {string} c.planoNome     nome do plano como aparece no site
 * @param {string|null} c.pagina   página de onde veio
 * @param {string|null} c.botao    chave de BOTOES (parâmetro ?origem=)
 */
export function montarEmail({ para, dados, planoId, planoNome, pagina, botao }) {
  const assunto = assuntoDe(planoId, planoNome);
  const veioDe = [pagina ? `página ${pagina}` : "acesso direto ao formulário", BOTOES[botao]].filter(Boolean).join(", ");
  const subject = `${ETIQUETA} ${assunto} | ${ou(dados.condominio, "sem condomínio")}`;
  const body = [
    `Pedido: ${assunto}`,
    `Plano de interesse: ${planoId ? planoNome : "Ainda não sei"}`,
    `Veio de: ${veioDe}`,
    "",
    `Nome: ${ou(dados.nome)}`,
    `Função: ${ou(dados.funcao)}`,
    `Condomínio ou administradora: ${ou(dados.condominio)}`,
    `Faixa de apartamentos: ${ou(dados.unidades)}`,
    `Telefone ou WhatsApp: ${ou(dados.telefone)}`,
    "",
    "O que mais pesa hoje no condomínio:",
    ou(dados.mensagem),
    "",
    "--",
    `${ETIQUETA} Enviado pelo formulário de contato do site arcanossolucoes.com.`
  ].join("\n");
  const url = `mailto:${para}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { assunto, subject, body, url };
}
