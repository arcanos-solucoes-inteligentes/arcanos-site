# Arcanos Site Institucional

Primeira base técnica do site institucional da **ARCANOS SOLUÇÕES INTELIGENTES LTDA**, construída em Astro com geração estática, HTML semântico, CSS próprio e JavaScript mínimo para navegação e galeria.

## Objetivo do projeto

Este repositório contém a primeira versão estrutural do site institucional da Arcanos. O foco desta etapa é:

- apresentar a empresa e a proposta institucional da Arcanos;
- organizar a base técnica para evolução futura;
- manter o conteúdo desta fase inicial claro e objetivo;
- preparar o site para futura publicação, sem realizar deploy nesta etapa.

## Tecnologias utilizadas

- Astro
- HTML semântico com componentes `.astro`
- CSS próprio organizado por tokens, componentes e seções
- JavaScript puro apenas para menu mobile, galeria e animações leves
- Node.js e npm

## Pré-requisitos

- Node.js `22.12.0` ou superior
- npm compatível com a versão do Node

## Instalação das dependências

```bash
npm install
```

## Execução local

```bash
npm run dev
```

## Build de produção

```bash
npm run build
```

## Visualização do build

```bash
npm run preview
```

## Estrutura de pastas

```text
arcanos-site/
├── public/
│   ├── favicon.svg
│   ├── manifest.webmanifest
│   ├── robots.txt
│   └── images/
├── src/
│   ├── components/
│   ├── data/
│   ├── layouts/
│   ├── pages/
│   ├── scripts/
│   └── styles/
├── docs/
├── .github/
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

## Criação e manutenção de componentes

- Componentes reutilizáveis ficam em `src/components/`.
- Prefira dados em `src/data/` quando o conteúdo for repetitivo.
- Mantenha o HTML semântico e a acessibilidade como prioridade.
- Evite adicionar JavaScript sem necessidade real.

## Alteração das cores

- Tokens visuais centralizados em `src/styles/tokens.css`.
- Ajuste ali as cores principais, superfícies, sombras, espaçamentos e tipografia.

## Substituição dos logos

- Placeholders atuais ficam em `public/images/brand/`.
- Substituir pelos arquivos oficiais recomendados:
  - `logo-horizontal-light.svg`
  - `logo-horizontal-dark.svg`
  - `symbol.svg`
  - `favicon.svg`

## Substituição das capturas

- Capturas reais podem ser adicionadas depois, caso esta fase deixe de ser apenas institucional.

## Edição dos dados da empresa

- Dados institucionais, contato e metadados base ficam em `src/data/company.js`.
- Navegação fica em `src/data/navigation.js`.
- As seções da home ficam em `src/pages/index.astro`.

## Edição dos contatos

- Atualize o e-mail institucional e os textos de contato em `src/data/company.js`.
- Validar antes da publicação:
  - `contato@arcanossolucoes.com`

## Cuidados antes da publicação

- validar conteúdo comercial;
- substituir placeholders de marca e capturas;
- revisar SEO final;
- revisar canonical e Open Graph com ativos finais;
- confirmar domínio e analytics.

## Processo recomendado de Pull Request

1. Criar branch de trabalho específica.
2. Implementar e validar com `npm run build`.
3. Revisar conteúdo, acessibilidade e responsividade.
4. Abrir Pull Request para revisão dos sócios e responsáveis.
5. Publicar somente após aprovação de conteúdo, marca e versão final.
