import type { ConfigProduto } from "@/components/site/produto/CascaProduto";

export const PRODUTO: ConfigProduto = {
  logo: "/assets/ipacs-principal-negativa.svg",
  logoAlt: "I-PACS Imaging Cloud",
  cta: "Solicitar demonstração",
  frase: "Suas imagens, seguras e acessíveis de qualquer lugar.",
  descricao: "O I-PACS recebe as imagens direto das modalidades, guarda com segurança na nuvem e entrega cada estudo a quem precisa.",
  contatos: [
    // contato próprio do I-PACS ainda não definido: sem link até o time confirmar
    { rotulo: "Contato comercial", valor: "A definir" },
  ],
  nota: "As funcionalidades e os resultados podem variar de acordo com as características de cada operação.",
  fundo: "#0e1430",
  acento: "#26b9da",
};
