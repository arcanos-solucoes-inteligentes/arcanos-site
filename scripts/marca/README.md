# Logo da Arcanos

`public/images/brand/arcanos-logo-horizontal.png` (cabeçalho, rodapé, apresentação) e
`arcanos-logo-vertical.png` são gerados a partir da arte do logo usada na tabela comercial
(`arte-tabela-comercial.png`, extraída do PDF com `pdfimages`).

A arte é clara sobre fundo quase preto. O script tira esse fundo e deixa o PNG transparente,
mantendo as letras geométricas do "ARCANOS" (os "A" sem travessão, com o arco dourado) e o
slogan "SOLUÇÕES INTELIGENTES." com as linhas laterais.

```bash
python3 fazer_logo.py arte-tabela-comercial.png ../../public/images/brand
```

Use só sobre fundo escuro: sobre fundo claro o prata quase desaparece.
