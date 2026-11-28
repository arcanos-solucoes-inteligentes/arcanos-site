# Apresentação comercial (PDF)

`Arcondo-apresentacao.pdf` é a apresentação para o marketing mostrar o Arcondo a síndicos, conselhos e
administradoras: 13 slides em 16:9 (projeta bem e abre em qualquer leitor de PDF), com pouco texto, título que
afirma o benefício e imagens grandes. Mesmas cores, fontes e logotipo do site.

Roteiro: ponto de partida (a dor) → solução → encomendas → Marquinhos (IA, 2 slides) → síndico → módulos →
segurança e LGPD → origem (TEG) → implantação → planos → demonstração.

- **Texto:** os slides têm texto de venda escrito para eles em `gerar.mjs`. Planos, etapas de implantação e
  e-mail de contato vêm de `../src/data/site.js`; se mudarem no site, rode de novo.
- **Imagens:** `img/` traz quadros dos vídeos do condomínio DEMO (dados fictícios) e a fachada do hero.
  Para trocar um quadro, extraia outro do vídeo em `../public/videos/` com ffmpeg.
- **Gerar:**
  ```bash
  npm install && npx playwright install chromium   # uma vez
  node gerar.mjs
  ```
  Opcional, para personalizar o último slide: `REPRESENTANTE="Nome" TELEFONE="(11) 90000-0000" node gerar.mjs`.
- `apresentacao.html` é gerado junto e pode ser aberto no navegador para pré-visualizar.
- Precisa de internet na geração (fontes Red Hat do Google Fonts).

## Antes de distribuir (validar com os sócios)

- Afirmações que dependem de confirmação em produção: direitos do titular no app (exportação, exclusão, prazo de
  guarda das fotos), isolamento entre condomínios, Marquinhos e mapa da garagem ligados para os clientes.
- Slide "De onde vem" cita o Condomínio TEG Vila Guilherme: confirmar a autorização de uso do nome e, se houver,
  trocar os três "fatos" por um depoimento assinado do síndico.
- Nenhum número de clientes, unidades ou ganho de tempo é citado, de propósito. Quando houver dado medido e
  autorizado (por exemplo, queda de encomendas atrasadas no TEG), ele deve entrar no slide "De onde vem".

## Teste do formulário de contato

Com o site rodando (`npm run dev` na raiz), `node testar-contato.mjs` passa por todos os caminhos até
o contato (topo, abertura, faixa final, rodapé, Entrar, cartões de plano, Personalizado, legenda e acesso
direto), envia o formulário e confere o e-mail gerado: assunto conforme o pedido, plano e "Veio de".
