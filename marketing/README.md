# Apresentação comercial (PDF)

`CondoSmart-apresentacao.pdf` é o material para o marketing apresentar o CondoSmart a síndicos,
conselhos e administradoras: 9 páginas A4 paisagem, mesmo conteúdo, cores e fontes do site.

- **Fonte única do texto:** `../src/data/site.js`. Mudou o site, rode de novo e o PDF acompanha.
- **Imagens:** `img/` traz quadros dos vídeos gravados no condomínio DEMO (dados fictícios) e a fachada do
  hero. Para atualizar um quadro, extraia outro do vídeo em `../public/videos/` com ffmpeg.
- **Gerar:**
  ```bash
  npm install && npx playwright install chromium   # uma vez
  node gerar.mjs
  ```
  Opcional, para personalizar a última página: `REPRESENTANTE="Nome" TELEFONE="(11) 90000-0000" node gerar.mjs`.
- `apresentacao.html` é gerado junto e pode ser aberto no navegador para pré-visualizar.
- Precisa de internet na geração (fontes Red Hat do Google Fonts).
