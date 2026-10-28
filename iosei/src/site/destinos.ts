// Para onde levam os links entre produtos.
// No site IOSEI quase tudo é rota interna; o I-RAD tem site oficial próprio (i-rad.co), então sai do site.
// Nos sites próprios (I-RAD, I-RIS, I-PACS) este arquivo muda: as rotas de outros produtos viram endereços externos
// e "/contato" vira a âncora do rodapé da própria página.
export const EXTERNOS: Record<string, string> = {
  "/irad": "https://i-rad.co",
};
