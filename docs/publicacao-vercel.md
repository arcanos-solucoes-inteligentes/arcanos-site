# Publicação no Vercel

Este projeto já está preparado para publicação estática com Astro.

## Antes de publicar

1. Validar localmente:
   - `npm run check`
   - `npm run build`
2. Revisar a home final no navegador.
3. Confirmar que o conteúdo, as imagens e o e-mail público estão corretos.

## Publicação recomendada

Fluxo recomendado:

1. Criar um repositório no GitHub.
2. Subir o conteúdo do `arcanos-site` para esse repositório.
3. Importar o repositório no Vercel.
4. Publicar primeiro em uma URL temporária do Vercel.
5. Depois conectar o domínio oficial, se desejar.

## Configuração no Vercel

Ao importar o projeto, use:

- Framework preset: `Astro`
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

## Passo a passo resumido

### 1. Criar o repositório

Crie um repositório no GitHub para o site institucional da Arcanos.

### 2. Subir o projeto

Dentro da pasta `arcanos-site`, use:

```bash
git init
git add .
git commit -m "feat: primeira versão do site institucional da Arcanos"
git branch -M main
git remote add origin <URL_DO_REPOSITORIO>
git push -u origin main
```

Se este repositório já estiver conectado a um remoto, ajuste apenas os comandos necessários.

### 3. Importar no Vercel

1. Entrar em `https://vercel.com`
2. Clicar em `Add New Project`
3. Conectar o GitHub
4. Selecionar o repositório do site
5. Revisar as configurações de build
6. Clicar em `Deploy`

### 4. Validar a publicação

Depois do deploy:

- abrir a URL gerada pelo Vercel;
- revisar menu, hero, seções e contato;
- testar no celular e no desktop;
- confirmar se o e-mail abre corretamente.

### 5. Conectar domínio próprio

Se o site estiver aprovado:

1. Entrar no projeto dentro do Vercel
2. Abrir `Settings > Domains`
3. Adicionar `arcanossolucoes.com`
4. Seguir as instruções de DNS mostradas pelo Vercel

## Observação

Se o domínio oficial ainda não for conectado agora, o site pode ficar publicado primeiro com a URL temporária do Vercel.
