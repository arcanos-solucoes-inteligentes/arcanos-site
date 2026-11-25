# Proposta de reposicionamento do site — CondoSmart by Arcanos

> 24/11/2026 · branch `feat/novo-site-condosmart`

## 1. Diagnóstico do site anterior

| Problema | Efeito no visitante |
|---|---|
| Falava da Arcanos como “iniciativa” que “desenvolve aplicações personalizadas” | Parecia agência ou freelancer, não produto SaaS |
| O nome do produto (CondoSmart) não aparecia | O visitante não sabia o que estava comprando |
| Nenhuma funcionalidade concreta, nenhuma tela | Não havia o que avaliar, nem motivo para pedir demonstração |
| Público indefinido (“seu negócio”) | Síndico e administradora não se reconheciam no texto |
| Único CTA era “Entrar em contato” por e-mail | Nenhum caminho de venda (demo, planos) |
| Nenhum link de login | Morador e porteiro não tinham como chegar ao app pelo site |
| Navegação por âncoras institucionais (Quem somos, Objetivo) | Estrutura de apresentação, não de venda |

## 2. Posicionamento

**Produto:** CondoSmart, a plataforma de gestão de condomínios da Arcanos. A Arcanos é a empresa; o CondoSmart é o que se vende.

**Promessa:** “O condomínio em ordem, do portão ao apartamento.” Encomendas, visitantes, reservas e comunicados num só lugar, com o registro de cada ação.

**Diferencial que o site sustenta:** nasceu dentro de uma portaria real (TEG Vila Guilherme). A encomenda é o ponto de entrada, porque é a dor número um da portaria e a mais fácil de demonstrar.

**Quem compra × quem usa:**

| Perfil | Papel | O que o site fala para ele |
|---|---|---|
| Síndico e conselho | Decide | Prestação de contas, relatórios, trilha de auditoria |
| Administradora / síndico profissional | Decide em escala | Carteira na mesma plataforma, padrão de operação |
| Portaria | Usa todo dia | Modo Expresso, menos digitação, QR na retirada |
| Morador | Usa e pressiona o síndico | Aviso no celular, retirada por QR, reservas |

## 3. Identidade visual

Mantidas as cores da marca. O que mudou foi o **uso**:

| Token | Hex | Uso |
|---|---|---|
| Noite | `#071225` | Seções de promessa (hero, encomendas, segurança, CTA) |
| Abismo | `#020817` | Rodapé, profundidade do hero |
| Ouro | `#E9A522` | Botão principal, rastro, marcadores de lista |
| Ouro claro | `#F4B942` | Detalhes sobre fundo escuro |
| Ouro texto | `#9A6A07` | Dourado legível sobre fundo claro (contraste AA) |
| Papel | `#F6F7FA` | Seções de produto (frio, não creme) |

- **Tipografia:** Red Hat Display (títulos) + Red Hat Text (texto). Geométrica e sóbria, conversa com o logotipo sem copiar o espaçamento largo dele. Substitui a serifada “Iowan Old Style”, que dava ar de escritório de advocacia.
- **O elemento memorável:** o *rastro dourado* da marca virou literal. No hero ele é o caminho da encomenda, da portaria até a janela do apartamento, que acende quando o aviso chega no celular. É a única animação do site e respeita `prefers-reduced-motion`.
- **Telas do produto:** desenhadas em HTML (Modo Expresso, QR de retirada, painel do síndico) com dados fictícios, no lugar dos SVGs “placeholder”. Ficam nítidas em qualquer tela e não expõem dado real.
- **O que foi evitado de propósito:** grade de cartões idênticos, rótulos em caixa alta sobre cada título, numeração decorativa. Só há números onde existe sequência real (jornada da encomenda e etapas de implantação).

### Vídeos do produto

Três trechos de 7 a 10 segundos, sem som e em loop, gravados no **condomínio DEMO local** (dados fictícios, nunca produção): a portaria (retirada urgente), o morador (encomenda que chegou hoje) e o síndico (relatório de encomendas em 90 dias). Ficam dentro das molduras de celular e de navegador, carregam só quando aparecem na tela (0,4 a 0,7 MB cada) e respeitam "reduzir movimento" e economia de dados.

A chave `productMedia` em `src/data/site.js` alterna entre `"video"` e `"desenho"` (as telas desenhadas em HTML). Para regravar quando o sistema mudar: `scripts/gravacao/README.md`.

### Foco em IA (25/11/2026)

O Zelo é o diferencial que nenhum concorrente analisado tem: responde pelo regimento com a fonte, faz pelo chat o que a função permite e avisa o síndico. Ele ganhou seção logo depois de "Para quem", item no menu, página `/assistente-ia/` e menção no hero. A abertura continua na operação (portaria e encomendas), porque é o que o síndico compra; a IA é o motivo para escolher a Arcanos. Para manter a home focada, "Implantação" foi para `/planos/`.

O resumo do que o Zelo faz está em `src/data/site.js` (`zelo`), tirado de `condominio-api/docs/ASSISTENTE-ACOES-E-LGPD.md`, `ASSISTENTE-GUARDRAILS.md` e `ASSISTENTE-BEDROCK.md`.

## 4. Mapa do site

| Página | Objetivo | CTA principal |
|---|---|---|
| `/` | Convencer em 1 rolagem: promessa, para quem, encomenda, módulos, síndico, segurança, origem, implantação, FAQ | Agendar demonstração |
| `/funcionalidades/` | Catálogo completo por área, com selo “Módulo adicional” e “Em breve” | Agendar demonstração |
| `/assistente-ia/` | Mostrar o Zelo: o que responde, o que faz por perfil e por que é seguro | Agendar demonstração |
| `/seguranca/` | Responder à objeção LGPD do síndico | Agendar demonstração |
| `/planos/` | Mostrar que existe plano para cada porte | Pedir proposta |
| `/contato/` | Qualificar o lead (função, unidades, dor) | Pedir demonstração |
| `/entrar/` | Porta de entrada de quem já é cliente | Acessar o CondoSmart |

**Cabeçalho:** Funcionalidades · Para quem · Segurança e LGPD · Planos · Contato · **Entrar** (secundário) · **Agendar demonstração** (principal). O padrão de SaaS B2B: quem já é cliente acha o login em um clique; quem não é, cai na demonstração.

## 5. Como um cliente acessa o login

Hoje o app só está montado em `https://www.arcanossolucoes.com/condosmart/teg-vm/` (`condominio-web/src/utils/resolveBasename.js`). Um condomínio novo não tem endereço próprio.

**Feito agora:** página `/entrar/` com “Acessar o CondoSmart”, “Esqueci minha senha”, “Recebi um convite” e orientação por perfil (morador, porteiro, síndico). Todos os links vêm de `src/data/site.js` → `appBaseUrl`.

**Recomendado (fora deste PR):** um endereço único de login para todos os condomínios, por exemplo `app.arcanossolucoes.com` ou `/condosmart/` sem o slug do condomínio. O login já é por e-mail e o usuário pode ter vários condomínios (Onda 1), então o slug na URL não é necessário. Quando existir, basta trocar `appBaseUrl`.

## 6. Regras de comunicação aplicadas

- Nada em desenvolvimento aparece como pronto. Só os avisos por WhatsApp estão em “Em desenvolvimento”, com selo “Em breve”. O assistente de IA (Zelo) e o mapa da garagem estão na `main` (PRs #368, #382, #391, #400–#413) e foram marcados como disponíveis em 25/11/2026, a pedido.
- Nenhum número de clientes, unidades ou métrica publicado.
- Nenhum depoimento inventado. A seção de origem usa fatos (onde, quem usa) e deixa `TODO` para um depoimento real e autorizado.
- LGPD descrita pelo que o sistema faz, sem prometer “conformidade total”.
- Preços como “Sob proposta” até o catálogo ser aprovado.

## 7. Pendências para aprovação dos sócios

1. **Validar afirmações técnicas** antes de publicar: Zelo e mapa de vagas ligados em produção (Bedrock, plano Pro, permissão de vagas para a portaria), modo offline “em operações suportadas” (as fases do plano offline estão em branches não pushadas), push em produção, exportação de dados do titular pelo app, retenção automática de fotos.
2. **Depoimento** do síndico do TEG, por escrito, com autorização de uso.
3. **Vídeo × desenho:** escolher qual versão vai ao ar (`productMedia`).
4. **Preços:** publicar faixa “a partir de” quando o catálogo da Plataforma Deus for fechado.
5. **Formulário:** trocar o envio por `mailto` por um CRM (HubSpot, RD Station) para não perder lead de quem não tem cliente de e-mail configurado.
6. **Política de Privacidade e encarregado (DPO)** publicados, com link no rodapé.
7. **Endereço único de login** (seção 5).
8. **Imagem de compartilhamento (OG)** em PNG 1200×630 com a nova identidade; redes sociais não leem SVG.
