// Fonte única de conteúdo do site. Textos comerciais e links ficam aqui para
// que marketing/sócios revisem sem mexer em layout.

export const company = {
  name: "Arcanos",
  product: "Arcondo",
  legalName: "ARCANOS SOLUÇÕES INTELIGENTES LTDA",
  siteUrl: "https://arcanossolucoes.com",
  contactEmail: "contato@arcanossolucoes.com",
  title: "Arcondo by Arcanos | Gestão de condomínios: portaria, encomendas e moradores",
  description:
    "Arcondo é a plataforma da Arcanos que organiza portaria, encomendas, visitantes, reservas e comunicados do condomínio, com rastro de cada ação e conformidade com a LGPD.",
  brandLogo: "/images/brand/arcanos-logo-horizontal.png",
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

// Como o site mostra o produto:
//  "video"   -> trechos curtos gravados no condomínio DEMO (public/videos/)
//  "desenho" -> telas desenhadas em HTML (components/Devices.astro e AdminPanel.astro)
export const productMedia = "video";

export const navigation = [
  { label: "Funcionalidades", href: "/funcionalidades/" },
  { label: "Assistente IA", href: "/assistente-ia/" },
  { label: "Segurança e LGPD", href: "/seguranca/" },
  { label: "Planos", href: "/planos/" }
];

// Perfis de comprador. Cada um com a dor que reconhece e o que o Arcondo muda.
export const audiences = [
  {
    id: "sindico",
    name: "Síndico e conselho",
    pain: "Você responde por tudo o que acontece no condomínio, mas a informação está no caderno da portaria, no WhatsApp e na cabeça de quem estava de plantão.",
    gain: "Um painel com o que entrou, quem retirou, o que está atrasado e o que os moradores pediram. Cada ação fica registrada com data, hora e responsável.",
    points: [
      "Relatórios de encomendas, acessos, reservas e equipe da portaria",
      "Comunicados enviados por push e e-mail",
      "Ouvidoria com protocolo, inclusive anônima",
      "Pergunte ao Marquinhos o que está pendente e receba o resumo do mês"
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
      "Cada morador vê só os dados da própria unidade",
      "Pergunte ao Marquinhos e ele responde pelo regimento ou faz a reserva"
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

// Catálogo de funcionalidades, organizado pela tabela comercial
// ("Planos e módulos do aplicativo", nov/2026): o que vem em todos os planos, o que
// depende do plano, os 6 módulos adicionais e o que existe no app mas ainda não está
// na tabela. Regra de comunicação (docs/conteudo-do-site.md): nada em desenvolvimento
// é anunciado como pronto, e o site não publica preços.
export const featureGroups = [
  {
    id: "base",
    title: "Em todos os planos",
    summary: "O que todo condomínio recebe desde o plano Essencial.",
    features: [
      { name: "Gestão de encomendas", text: "Recebimento, histórico, retirada manual e guarda, com busca por unidade com ou sem bloco." },
      { name: "Moradores e unidades", text: "Cadastros, blocos, vínculos e permissões por função." },
      { name: "Cadastro de veículos", text: "Veículos dos moradores, para a portaria consultar na hora." },
      { name: "Cadastro de pets", text: "Animais vinculados aos moradores." },
      { name: "Notificações em 4 idiomas", text: "E-mails operacionais, e o app em português, inglês, espanhol e chinês." },
      { name: "Dashboard e relatórios", text: "Indicadores de encomendas: básicos no Essencial, gerenciais no Gestão e ampliados no Inteligência." }
    ]
  },
  {
    id: "plano",
    title: "Conforme o plano",
    summary: "Recursos que entram a partir de um plano específico. No Personalizado, são contratados separadamente.",
    features: [
      { name: "Retirada por QR Code", text: "O morador escaneia o QR Code fixo da portaria e o porteiro confirma a baixa.", tag: "Gestão e Inteligência" },
      { name: "Analytics do morador", text: "Painel com os números e o histórico das encomendas do próprio morador.", tag: "Inteligência" },
      { name: "Assistente de IA Marquinhos", text: "Respostas a partir de atas, convenção, regimento e documentos autorizados, com a fonte citada.", tag: "Inteligência", note: "Ativação após homologação." }
    ]
  },
  {
    id: "adicionais",
    title: "Módulos adicionais",
    summary: "Seis módulos para escolher. O Gestão inclui 1, o Inteligência inclui 2, e os outros podem ser contratados à parte. No Personalizado, todos são contratados separadamente.",
    features: [
      { name: "Comunicados", text: "Publicação de avisos e informações aos moradores, por push e e-mail.", tag: "Adicional" },
      { name: "Achados e perdidos", text: "Registro, acompanhamento e devolução de objetos, com fotos.", tag: "Adicional" },
      { name: "Chamados e ouvidoria", text: "Solicitações e manifestações com protocolo e acompanhamento, inclusive anônimas.", tag: "Adicional" },
      { name: "Reservas de ambientes", text: "Agendamento, cancelamento, regras por espaço e validação externa de reservas.", tag: "Adicional" },
      { name: "Controle de acesso e visitantes", text: "Cadastro e autorização de visitantes e registro de entradas e saídas.", tag: "Adicional" },
      { name: "Gestão de vagas", text: "Administração das vagas e dos vínculos com veículos e unidades.", tag: "Adicional" }
    ]
  },
  {
    id: "outros",
    title: "Outros recursos do aplicativo",
    summary: "Já existem no app, mas ainda não fazem parte da tabela de planos. Consulte a disponibilidade para o seu condomínio.",
    features: [
      { name: "Modo Expresso", text: "Leitura da etiqueta pela câmera para registrar várias encomendas em sequência.", tag: "Consulte" },
      { name: "Encomendas especiais", text: "Fluxo próprio para correspondência judicial e medicamentos.", tag: "Consulte" },
      { name: "Mapa da garagem", text: "Planta da garagem com a situação de cada vaga. Sem planta? O sistema desenha uma.", tag: "Consulte", note: "Requer o módulo Gestão de vagas." },
      { name: "Sorteio de vagas", text: "Sorteio auditável, com impressão do resultado para a ata.", tag: "Consulte", note: "Requer o módulo Gestão de vagas." },
      { name: "Chaves", text: "Empréstimo e devolução de chaves registrados pela portaria.", tag: "Consulte" },
      { name: "Botão de pânico", text: "Alerta de emergência do morador para a portaria e o síndico.", tag: "Consulte" },
      { name: "Área da administradora", text: "Visão da carteira de condomínios para administradoras e síndicos profissionais.", tag: "Consulte" }
    ]
  },
  {
    id: "em-breve",
    title: "Em desenvolvimento",
    summary: "Ainda não está disponível. Avisamos os clientes quando for liberado.",
    features: [
      { name: "Avisos por WhatsApp", text: "Alerta de encomenda e de atraso pelo WhatsApp.", status: "em-breve" }
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

// Implantação: sequência real do onboarding (tabela comercial, item 05).
export const onboardingSteps = [
  { title: "Conversa e demonstração", text: "Entendemos a rotina do condomínio e mostramos o Arcondo com os fluxos que você usa." },
  { title: "Configuração", text: "Configuramos o condomínio e fazemos uma importação de planilha padronizada com blocos, unidades e moradores." },
  { title: "Moradores convidados", text: "Cada morador recebe o convite e cria o próprio acesso. Ninguém precisa digitar 300 cadastros." },
  { title: "Treinamento remoto", text: "Dois treinamentos remotos de até 60 minutos e 15 dias de apoio, até a equipe operar sozinha." }
];

export const implantacao = {
  items: [
    "Configuração inicial do condomínio",
    "1 importação de planilha padronizada",
    "2 treinamentos remotos de até 60 minutos",
    "15 dias de apoio depois da implantação"
  ],
  note: "Acima de 500 apartamentos, sob consulta. Equipamentos, integrações especiais e atendimento presencial são orçados à parte."
};

// Faixas de cobrança da tabela comercial. O site mostra as faixas, nunca os valores.
export const faixas = ["1 a 50", "51 a 100", "101 a 200", "201 a 300", "301 a 500", "501 ou mais"];

// Planos da tabela comercial (Essencial, Gestão, Inteligência) e o Personalizado.
export const plans = [
  {
    id: "essencial",
    name: "Essencial",
    fit: "A base da portaria e dos moradores",
    modules: "Nenhum módulo adicional incluído",
    items: ["Gestão de encomendas com retirada manual", "Moradores, unidades, veículos e pets", "Notificações por e-mail em 4 idiomas", "Dashboard e relatórios básicos"]
  },
  {
    id: "gestao",
    name: "Gestão",
    fit: "Para o síndico acompanhar e decidir",
    modules: "1 módulo adicional à escolha",
    items: ["Tudo do Essencial", "Retirada por QR Code", "Dashboard e relatórios gerenciais", "1 módulo adicional à escolha"],
    highlight: true
  },
  {
    id: "inteligencia",
    name: "Inteligência",
    fit: "A operação completa, com análise e IA",
    modules: "2 módulos adicionais à escolha",
    items: ["Tudo do Gestão", "Dashboard e relatórios ampliados", "Analytics do morador", "Assistente de IA Marquinhos**", "2 módulos adicionais à escolha"]
  },
  {
    id: "personalizado",
    name: "Personalizado",
    fit: "O síndico escolhe o que entra",
    modules: "Cada item contratado separadamente",
    items: ["Escolha cada funcionalidade e módulo", "Inclusive encomendas, QR Code, Analytics e Marquinhos", "Combinação conferida por um especialista", "Proposta só com o que o condomínio escolheu"],
    custom: true
  }
];

// Tabela "Funcionalidades fixas de cada plano" (item 03), com a coluna do Personalizado.
export const planMatrix = {
  columns: ["Essencial", "Gestão", "Inteligência", "Personalizado"],
  rows: [
    { name: "Gestão de encomendas", text: "Recebimento, histórico, retirada manual e guarda", values: ["Incluído", "Incluído", "Incluído", "Contratar*"] },
    { name: "Moradores e unidades", text: "Cadastros, blocos, vínculos e permissões", values: ["Incluído", "Incluído", "Incluído", "Contratar*"] },
    { name: "Cadastro de veículos", text: "Veículos dos moradores, sem gestão de vagas", values: ["Incluído", "Incluído", "Incluído", "Contratar*"] },
    { name: "Cadastro de pets", text: "Animais vinculados aos moradores", values: ["Incluído", "Incluído", "Incluído", "Contratar*"] },
    { name: "Notificações e 4 idiomas", text: "E-mails operacionais; português, inglês, espanhol e chinês", values: ["Incluído", "Incluído", "Incluído", "Contratar*"] },
    { name: "Retirada por QR Code", text: "Confirmação digital da retirada de encomendas", values: ["—", "Incluído", "Incluído", "Contratar*"] },
    { name: "Dashboard e relatórios", text: "Indicadores de encomendas conforme o nível do plano", values: ["Básicos", "Gerenciais", "Ampliados", "Contratar*"] },
    { name: "Analytics do morador", text: "Painel analítico do morador", values: ["—", "—", "Incluído", "Contratar*"] },
    { name: "Assistente de IA Marquinhos", text: "Consultas a atas, convenção e documentos autorizados", values: ["—", "—", "Incluído**", "Contratar*"] },
    { name: "Módulos adicionais incluídos", text: "Entre os 6 módulos adicionais", values: ["0", "1", "2", "Contratar*"] }
  ],
  // Legenda: "*" é do Personalizado (pedido do comercial); "**" é a nota do Marquinhos da tabela.
  legend: [
    { mark: "*", text: "No Personalizado, cada item é contratado separadamente. Um módulo pode depender de outro para funcionar:", link: { label: "consulte um especialista", href: "/contato/?plano=personalizado" } },
    { mark: "**", text: "Marquinhos: recurso fixo do Inteligência, sem ocupar a escolha de módulo. Ativação após homologação; a franquia de consultas é informada na proposta." }
  ]
};

// O que depende do quê, para montar o Personalizado sem combinação que não funciona.
// Evidência no código: PARKING_MAP fica sobre o PARKING_SPOTS (ParkingMapsController);
// as ações do Marquinhos passam pelo [RequiresModule] do endpoint (AssistantEndpointInvoker).
export const dependencias = [
  { item: "Retirada por QR Code e Analytics do morador", rule: "Funcionam sobre a Gestão de encomendas." },
  { item: "Gestão de vagas", rule: "Usa o cadastro de moradores e unidades e o cadastro de veículos." },
  { item: "Mapa e sorteio de vagas", rule: "Só funcionam com o módulo Gestão de vagas contratado." },
  { item: "Validação externa de reservas", rule: "Faz parte de Reservas de ambientes e não é contratada separadamente." },
  { item: "Chamados e ouvidoria; Controle de acesso e visitantes", rule: "Cada par é um único módulo e vem junto." },
  { item: "Marquinhos agindo pelo chat", rule: "Ele só reserva, autoriza visitante, abre chamado ou publica comunicado se o módulo correspondente estiver contratado. Sem esses módulos, continua respondendo pelos documentos do condomínio." }
];

export const faq = [
  {
    q: "Precisa instalar alguma coisa?",
    a: "Não. O Arcondo funciona no navegador do celular, tablet ou computador, e pode ser instalado como aplicativo na tela inicial. A portaria usa o equipamento que já tem, desde que tenha câmera."
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
    a: "Sim. O plano Essencial já cobre encomendas, moradores, veículos e pets. Os módulos adicionais entram quando fizer sentido, ou você monta um plano personalizado."
  },
  {
    q: "E se a internet da portaria cair?",
    a: "Nas operações suportadas, como retiradas, o registro fica guardado no aparelho e é enviado quando a conexão volta."
  },
  {
    q: "Já tenho conta. Onde eu entro?",
    a: "Use o botão Entrar no topo do site. Ele leva para a tela de acesso do Arcondo, onde também é possível recuperar a senha."
  }
];

// Assistente de IA (Marquinhos). Resumo da documentação do produto:
// condominio-api/docs/ASSISTENTE-ACOES-E-LGPD.md, ASSISTENTE-GUARDRAILS.md e ASSISTENTE-BEDROCK.md.
export const assistente = {
  name: "Marquinhos",
  promise: "Um assistente que conhece as regras do condomínio e faz o que a sua função permite.",
  pillars: [
    {
      title: "Responde",
      text: "Normas do regimento, da convenção e dos comunicados, sempre com a fonte citada. Dúvidas sobre o app com respostas revisadas para cada perfil.",
      example: "“Até que horas posso fazer barulho?” → regimento interno, art. 5."
    },
    {
      title: "Faz",
      text: "Monta um cartão com o pedido, pergunta só o que falta e grava depois que a pessoa confirma.",
      example: "“Quero reservar a churrasqueira no sábado à noite” → reserva confirmada."
    },
    {
      title: "Avisa",
      text: "Resumo do mês e pendências para o síndico. Alerta quando vários moradores relatam o mesmo problema e relatório do que mais perguntam.",
      example: "“O que está pendente?” → reservas, chamados e encomendas atrasadas."
    }
  ],
  actions: [
    { profile: "Morador", items: ["Reservar e cancelar espaço", "Autorizar visitante e retirada por terceiro", "Abrir chamado", "Ver encomendas e reservas", "Cadastrar pet e veículo", "Avisar ausência"] },
    { profile: "Portaria", items: ["Registrar encomenda", "Entrada e saída de visitante", "Empréstimo e devolução de chave", "Convidados de reserva", "Registrar achado"] },
    { profile: "Síndico e administração", items: ["Pendências e resumo do mês", "Aprovar ou recusar reserva", "Atualizar chamado", "Publicar comunicado com push e e-mail", "Reservar em nome do morador", "Cadastrar morador, bloco e unidade"] }
  ],
  safety: [
    { title: "Mesmas regras da tela", text: "O Marquinhos não tem permissão própria. Antes de cada ação ele confere as mesmas regras de acesso da tela correspondente." },
    { title: "Nada sem confirmação", text: "Nada é gravado antes do botão de confirmar. Clique duplo não grava duas vezes e há limite de ações por hora." },
    { title: "Fora do alcance do chat", text: "Excluir registros, senha, permissões, módulos, pagamentos e pedidos de LGPD só pela tela." },
    { title: "Dado pessoal protegido", text: "CPF, telefone, e-mail e placa são mascarados e nunca vão para o modelo de linguagem. O morador não consulta dados de outra unidade." },
    { title: "Emergência não espera a IA", text: "Pedidos de socorro são reconhecidos antes de qualquer processamento e direcionam para 190, 192 e 193." },
    { title: "LGPD", text: "Histórico na exportação dos dados do titular, botão para apagar o próprio histórico e documentos com visibilidade por público." }
  ],
  tech: [
    "A inteligência artificial roda em servidores no Brasil (AWS, em São Paulo)",
    "Incluído no plano Inteligência e disponível no Personalizado; ativação após homologação",
    "Testado contra tentativas de burlar as regras ou acessar dados de outra unidade"
  ]
};
