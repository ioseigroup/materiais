// Para onde levam os links entre produtos.
// No site IOSEI tudo é rota interna, então a lista fica vazia.
// Nos sites próprios (I-RAD, I-RIS, I-PACS) este arquivo muda: as rotas de outros produtos viram endereços externos
// e "/contato" vira a âncora do rodapé da própria página.
export const EXTERNOS: Record<string, string> = {};
