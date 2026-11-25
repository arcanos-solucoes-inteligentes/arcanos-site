# Gravação dos vídeos do site

Os vídeos em `public/videos/` são trechos de 7 a 10 segundos do CondoSmart funcionando,
gravados **no condomínio DEMO rodando na máquina local** (dados fictícios). Nunca grave
em produção: lá aparecem nomes, unidades e fotos de moradores reais.

| Cena | Conta | Tela | Tamanho |
|---|---|---|---|
| `portaria` | porteiro do DEMO | `/porteiro` (retirada urgente) | celular 390×844 @2x |
| `morador` | morador A-101 do DEMO | `/morador` (encomendas + detalhe) | celular 390×844 @2x |
| `sindico` | síndica do DEMO | `/admin/relatorios` → Encomendas, 90 dias | 1280×800 @2x |
| `zelo_morador` | morador A-101 | `/assistente`: pergunta do regimento + reserva pelo chat | celular 390×844 @2x |
| `zelo_sindico` | síndica | `/assistente`: pendências + resumo do mês | 880×640 @2x |
| `vagas` | síndica | `/admin/vagas` → Mapa, busca da S1-08 | 1280×800 @2x |

## Como regravar

1. Suba o banco local com o DEMO (`dados-demo/popular.sh`), a `condominio-api` e o `condominio-web`,
   de preferência a partir da `main`. Os endereços vêm de `BASE` (padrão `http://localhost:5174`) e
   `API` (padrão `http://localhost:5139/api`).
   Para as cenas do Zelo e das vagas, o DEMO precisa dos módulos `AI_ASSISTANT` (plano Pro, ações ligadas,
   documentos de exemplo carregados) e `PARKING_MAP` (mapa publicado; "Gerar planta esquemática" no editor).
2. Instale as ferramentas desta pasta (uma vez):
   ```bash
   npm install && npx playwright install chromium
   ```
3. Defina as contas (estão em `dados-demo/CREDENCIAIS-E-ROTEIRO.md`):
   ```bash
   export DEMO_SENHA='...' DEMO_SINDICA='...' DEMO_MORADOR='...' DEMO_MORADOR_ID='<users.id do A-101>'
   ```
4. Opcional: crie uma encomenda "de hoje" para o morador, para a cena não mostrar só pacotes antigos:
   ```bash
   node preparar.mjs
   ```
5. Grave (todas as cenas, ou uma: `node gravar.mjs morador`) e comprima:
   ```bash
   node gravar.mjs
   ./comprimir.sh portaria 540 && ./comprimir.sh morador 540 && ./comprimir.sh sindico 1440
   ./comprimir.sh zelo_morador 540 && ./comprimir.sh zelo_sindico 1320 && ./comprimir.sh vagas 1440
   cp final/* ../../public/videos/
   ```

A gravação usa o screencast do Chrome (quadros em 2x, nítidos em tela retina) e o ffmpeg
gera MP4 (H.264) e WebM (VP9) sem som, mais a imagem parada (`.jpg`).

O login local tem limite de tentativas. Se a gravação falhar com tempo esgotado no login,
espere um minuto e rode de novo.

## Trocar vídeo por tela desenhada

Em `src/data/site.js`, `productMedia = "video"` mostra os vídeos e `productMedia = "desenho"`
volta às telas desenhadas em HTML.
