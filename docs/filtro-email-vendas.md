# Pedidos do site no Gmail: marcador de vendas

Todo e-mail que sai do formulário de contato do site começa o assunto com **`[Site Arcondo]`**
e termina com a linha `[Site Arcondo] Enviado pelo formulário de contato do site arcanossolucoes.com.`
(a etiqueta fica em `src/scripts/contato.js`, constante `ETIQUETA`). O filtro abaixo usa essa etiqueta.

Exemplos de assunto:

- `[Site Arcondo] Proposta do plano Gestão | Residencial Exemplo`
- `[Site Arcondo] Montar um plano personalizado | Residencial Exemplo`
- `[Site Arcondo] Agendar demonstração | Residencial Exemplo`

## Criar o filtro (Gmail na web, uma vez)

O app do Gmail no celular não cria filtros; faça pelo computador, logado em `contato@arcanossolucoes.com`.

1. Na barra de pesquisa do Gmail, cole: `subject:"Site Arcondo"` e clique no ícone de opções da pesquisa (à direita da barra).
2. Clique em **Criar filtro**.
3. Marque:
   - **Aplicar o marcador** → *Novo marcador* → `Vendas/Site` (a barra cria um submarcador dentro de "Vendas").
   - **Nunca enviar para spam** (o e-mail vem do endereço do visitante, que o Gmail não conhece).
   - **Sempre marcar como importante**.
   - Opcional: **Pular a Caixa de entrada (arquivar)**, se quiser que os pedidos fiquem **só** no marcador. Se marcar, crie o hábito de abrir `Vendas/Site`; o número de não lidos aparece ao lado dele.
   - **Também aplicar filtro às conversas correspondentes** (organiza o que já chegou).
4. Clique em **Criar filtro**.

## Separar por tipo de pedido (opcional)

Repita o passo a passo com estas pesquisas, cada uma com o seu submarcador:

| Pesquisa | Marcador |
|---|---|
| `subject:"Site Arcondo" subject:"Proposta do plano"` | `Vendas/Site/Propostas` |
| `subject:"Site Arcondo" subject:"plano personalizado"` | `Vendas/Site/Personalizado` |
| `subject:"Site Arcondo" subject:"Agendar demonstração"` | `Vendas/Site/Demonstrações` |

## Cuidados

- **Não mude a etiqueta** `[Site Arcondo]` no código sem atualizar o filtro: os pedidos voltariam para a caixa de entrada geral.
- Se a pessoa apagar o assunto antes de enviar, a linha final do corpo ainda tem a etiqueta. Para pegar também esse caso, use no filtro a pesquisa `"Site Arcondo" "Enviado pelo formulário"` (procura no corpo).
- O `contato@` também envia as notificações do aplicativo (encomendas, reservas, lembretes). Elas não têm a etiqueta e continuam fora do marcador.
