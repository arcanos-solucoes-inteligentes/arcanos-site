// Fonte única de conteúdo do site. Textos comerciais e links ficam aqui para
// que marketing/sócios revisem sem mexer em layout.

export const company = {
  name: "Arcanos",
  product: "CondoSmart",
  legalName: "ARCANOS SOLUÇÕES INTELIGENTES LTDA",
  siteUrl: "https://arcanossolucoes.com",
  contactEmail: "contato@arcanossolucoes.com",
  title: "CondoSmart by Arcanos | Gestão de condomínios: portaria, encomendas e moradores",
  description:
    "CondoSmart é a plataforma da Arcanos que organiza portaria, encomendas, visitantes, reservas e comunicados do condomínio, com rastro de cada ação e conformidade com a LGPD.",
  brandLogo: "/images/brand/arcanos-lockup.svg",
  ogImage: "/images/hero/og-arcanos.svg",
  brandQuote: "Tecnologia só faz sentido quando aproxima pessoas."
};

// Endereços do aplicativo. Hoje o app de produção está montado em
// /condosmart/teg-vm (ver condominio-web/src/utils/resolveBasename.js).
// TODO(produto): quando existir um endereço único para todos os condomínios
// (recomendado: app.arcanossolucoes.com), trocar apenas `appBaseUrl`.
const appBaseUrl = "https://www.arcanossolucoes.com/condosmart/teg-vm";

export const app = {
  baseUrl: appBaseUrl,
  login: `${appBaseUrl}/login`,
  forgotPassword: `${appBaseUrl}/esqueci-senha`,
  invite: `${appBaseUrl}/convite`,
  emergency: `${appBaseUrl}/emergencia`
};

export const navigation = [
  { label: "Funcionalidades", href: "/funcionalidades/" },
  { label: "Para quem", href: "/#para-quem" },
  { label: "Segurança e LGPD", href: "/seguranca/" },
  { label: "Planos", href: "/planos/" },
  { label: "Contato", href: "/contato/" }
];

// Perfis de comprador. Cada um com a dor que reconhece e o que o CondoSmart muda.
export const audiences = [
  {
    id: "sindico",
    name: "Síndico e conselho",
    pain: "Você responde por tudo o que acontece no condomínio, mas a informação está no caderno da portaria, no WhatsApp e na cabeça de quem estava de plantão.",
    gain: "Um painel com o que entrou, quem retirou, o que está atrasado e o que os moradores pediram. Cada ação fica registrada com data, hora e responsável.",
    points: [
      "Relatórios de encomendas, acessos, reservas e equipe da portaria",
      "Comunicados enviados por push e e-mail",
      "Ouvidoria com protocolo, inclusive anônima"
    ]
  },
  {
    id: "administradora",
    name: "Administradora e síndico profissional",
    pain: "Cada condomínio da carteira tem um jeito de trabalhar, e você só descobre o problema quando o morador reclama na assembleia.",
    gain: "Os condomínios da carteira na mesma plataforma, com módulos ligados por contrato e o mesmo padrão de operação em todos.",
    points: [
      "Área da gestora para acompanhar a carteira",
      "Módulos ativados por condomínio, conforme o plano",
      "Trilha de auditoria para prestar contas ao conselho"
    ]
  },
  {
    id: "portaria",
    name: "Portaria",
    pain: "Fila de entregador, interfone tocando e um pacote sem nome legível na etiqueta.",
    gain: "O porteiro aponta a câmera para a etiqueta, confere a unidade sugerida e o morador é avisado na hora. Na retirada, o morador escaneia o QR Code da portaria e o porteiro confirma.",
    points: [
      "Modo Expresso para registrar várias encomendas em sequência",
      "Visitantes e prestadores com horários permitidos",
      "Chaves, achados e perdidos e ocorrências no mesmo lugar"
    ]
  },
  {
    id: "morador",
    name: "Morador",
    pain: "Descer até a portaria para perguntar se chegou alguma coisa.",
    gain: "O aviso chega no celular, com foto, e a retirada é feita escaneando o QR Code da portaria. Reservas, visitantes e comunicados ficam no mesmo app.",
    points: [
      "Instala como aplicativo pelo navegador, sem loja",
      "Em português, inglês, espanhol ou chinês",
      "Cada morador vê só os dados da própria unidade"
    ]
  }
];

// A jornada da encomenda é uma sequência real do produto, por isso numerada.
export const packageJourney = [
  {
    title: "Chegou na portaria",
    text: "O porteiro lê a etiqueta pela câmera (código de barras ou texto) e o sistema sugere a unidade e o destinatário."
  },
  {
    title: "Morador avisado",
    text: "Push e e-mail para o destinatário e, se ele quiser, para os outros moradores da unidade."
  },
  {
    title: "Retirada com QR Code",
    text: "O morador escaneia no app o QR Code da portaria, o porteiro confirma e a baixa sai com nome, data e hora. Terceiros podem retirar com autorização."
  },
  {
    title: "Nada fica esquecido",
    text: "Encomendas paradas há dias aparecem como atrasadas para a portaria e para o síndico."
  }
];

// Catálogo de funcionalidades. status: "disponivel" | "em-breve".
// Regra de comunicação (docs/conteudo-do-site.md): nada em desenvolvimento
// é anunciado como pronto.
export const featureGroups = [
  {
    id: "portaria",
    title: "Portaria e encomendas",
    summary: "O coração da operação: tudo o que entra e sai do condomínio, com registro.",
    features: [
      { name: "Recebimento de encomendas", text: "Cadastro com foto, unidade, destinatário e transportadora. Busca por unidade com ou sem bloco." },
      { name: "Modo Expresso", text: "Leitura da etiqueta pela câmera do celular ou tablet para registrar pacotes em sequência." },
      { name: "Retirada por QR Code", text: "O morador escaneia o QR Code fixo da portaria e o porteiro confirma a baixa. Terceiros autorizados também podem retirar." },
      { name: "Encomendas especiais", text: "Fluxo próprio para correspondência judicial, medicamentos e itens que exigem cuidado." },
      { name: "Visitantes e prestadores", text: "Autorização prévia pelo morador e horários permitidos para prestadores, inclusive feriados." },
      { name: "Chaves, achados e perdidos", text: "Empréstimo de chaves e itens encontrados com até três fotos e aviso aos moradores." },
      { name: "Controle de acesso", text: "Entradas e saídas registradas por unidade, com histórico pesquisável.", tag: "Módulo adicional" }
    ]
  },
  {
    id: "moradores",
    title: "Moradores e convivência",
    summary: "O condomínio no bolso do morador, sem precisar de mais um grupo de WhatsApp.",
    features: [
      { name: "Comunicados", text: "Avisos com envio por push e e-mail, escolhidos pelo síndico a cada comunicado." },
      { name: "Reservas de áreas comuns", text: "Regras por espaço, convidados, vistoria, períodos, fila de espera e validação pela administração." },
      { name: "Manutenção e chamados", text: "O morador abre o chamado e acompanha o andamento até a conclusão." },
      { name: "Vagas de garagem e sorteio", text: "Cadastro de vagas por unidade e sorteio auditável." },
      { name: "Veículos, pets e ausências", text: "Cadastros que a portaria consulta na hora em que precisa." },
      { name: "Ouvidoria", text: "Relatos com protocolo e senha de acompanhamento. O anonimato é o padrão." },
      { name: "Botão de pânico", text: "Alerta de emergência do morador para a portaria e o síndico.", tag: "Módulo adicional" }
    ]
  },
  {
    id: "gestao",
    title: "Gestão e relatórios",
    summary: "O que o síndico precisa para decidir e para prestar contas.",
    features: [
      { name: "Painel do síndico", text: "Encomendas pendentes, atrasadas, reservas do dia e chamados abertos numa tela." },
      { name: "Relatórios", text: "Encomendas, portaria por porteiro, reservas, achados e perdidos e acessos, com exportação em PDF e planilha." },
      { name: "Unidades, blocos e moradores", text: "Cadastro da estrutura do condomínio, com proprietário, inquilino e co-moradores." },
      { name: "Permissões por função", text: "Síndico, conselho, porteiro, operador e morador enxergam só o que lhes cabe." },
      { name: "Trilha de auditoria", text: "Quem fez o quê, quando e de onde, nas operações sensíveis." },
      { name: "Área da administradora", text: "Visão da carteira de condomínios para administradoras e síndicos profissionais." }
    ]
  },
  {
    id: "em-breve",
    title: "Em desenvolvimento",
    summary: "Ainda não estão disponíveis. Avisamos os clientes quando forem liberados.",
    features: [
      { name: "Assistente de IA", text: "Perguntas em linguagem natural sobre encomendas, reservas e normas do condomínio.", status: "em-breve" },
      { name: "Avisos por WhatsApp", text: "Alerta de encomenda e de atraso pelo WhatsApp.", status: "em-breve" },
      { name: "Mapa de vagas", text: "Planta da garagem com a ocupação de cada vaga.", status: "em-breve" }
    ]
  }
];

export const trustPoints = [
  {
    title: "Cada condomínio isolado",
    text: "Os dados de um condomínio nunca aparecem para outro. O isolamento é aplicado pelo sistema em todas as consultas, não depende de cuidado manual."
  },
  {
    title: "LGPD na prática",
    text: "Fotos de encomendas com prazo de retenção, exportação dos dados do titular, pedido de exclusão com anonimização e consentimento registrado."
  },
  {
    title: "Acesso por função",
    text: "O porteiro vê o que precisa para trabalhar. O morador vê a própria unidade. Ninguém vê mais do que a função exige."
  },
  {
    title: "Rastro de cada ação",
    text: "Registro de quem recebeu, quem entregou, quem alterou e quando. Em caso de dúvida, a resposta está no histórico."
  },
  {
    title: "Infraestrutura em nuvem",
    text: "Hospedado na AWS em São Paulo, com banco de dados gerenciado, backups automáticos e comunicação criptografada."
  },
  {
    title: "Funciona com sinal fraco",
    text: "Em operações suportadas, a portaria continua registrando quando a internet oscila, e o envio é concluído quando a conexão volta."
  }
];

// Implantação: sequência real do onboarding.
export const onboardingSteps = [
  { title: "Conversa e demonstração", text: "Entendemos a rotina do condomínio e mostramos o CondoSmart com os fluxos que você usa." },
  { title: "Configuração", text: "Cadastramos blocos, unidades e áreas comuns, e ligamos os módulos do plano." },
  { title: "Moradores convidados", text: "Cada morador recebe o convite e cria o próprio acesso. Ninguém precisa digitar 300 cadastros." },
  { title: "Treinamento da portaria", text: "Turno a turno, no posto de trabalho, até a equipe operar sozinha." }
];

export const plans = [
  {
    id: "autogestao",
    name: "Autogestão",
    fit: "Condomínios pequenos, sem portaria 24 horas",
    text: "Encomendas por código de barras, comunicados, reservas e ouvidoria para o síndico que administra sozinho.",
    items: ["Encomendas com retirada por QR", "Comunicados e reservas", "Ouvidoria", "Moradores entram por convite"]
  },
  {
    id: "portaria",
    name: "Condomínio com portaria",
    fit: "Prédios e conjuntos com equipe de portaria",
    text: "A operação completa da portaria e do síndico, com os módulos escolhidos para a rotina do condomínio.",
    items: ["Tudo da Autogestão", "Modo Expresso com leitura de etiqueta", "Visitantes, chaves, achados e perdidos", "Relatórios e trilha de auditoria"],
    highlight: true
  },
  {
    id: "administradora",
    name: "Administradoras",
    fit: "Carteiras com vários condomínios",
    text: "Cada condomínio com o seu plano, e a administradora acompanhando a carteira inteira.",
    items: ["Área da administradora", "Implantação em lote", "Condições por volume", "Atendimento dedicado"]
  }
];

export const faq = [
  {
    q: "Precisa instalar alguma coisa?",
    a: "Não. O CondoSmart funciona no navegador do celular, tablet ou computador, e pode ser instalado como aplicativo na tela inicial. A portaria usa o equipamento que já tem, desde que tenha câmera."
  },
  {
    q: "Como os moradores começam a usar?",
    a: "O condomínio envia um convite e cada morador cria o próprio acesso. O síndico aprova e pronto."
  },
  {
    q: "Os dados ficam seguros?",
    a: "Os dados ficam na AWS, em São Paulo, separados por condomínio e acessados conforme a função de cada pessoa. Detalhamos o tratamento de dados pessoais na página de Segurança e LGPD."
  },
  {
    q: "Posso contratar só a parte de encomendas?",
    a: "Sim. Os módulos são ligados por condomínio. Você começa pelo que mais dói e amplia quando fizer sentido."
  },
  {
    q: "E se a internet da portaria cair?",
    a: "Nas operações suportadas, como retiradas, o registro fica guardado no aparelho e é enviado quando a conexão volta."
  },
  {
    q: "Já tenho conta. Onde eu entro?",
    a: "Use o botão Entrar no topo do site. Ele leva para a tela de acesso do CondoSmart, onde também é possível recuperar a senha."
  }
];
