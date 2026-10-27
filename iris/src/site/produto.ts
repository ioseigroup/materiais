import type { ConfigProduto } from "@/components/site/produto/CascaProduto";

export const PRODUTO: ConfigProduto = {
  logo: "/assets/iris-principal-negativa.svg",
  logoAlt: "I-RIS Business OS",
  cta: "Solicitar demonstração",
  frase: "Controle a receita da agenda ao banco.",
  descricao: "O Business OS do centro de diagnóstico por imagem: 100% do fluxo dentro do sistema, do primeiro contato com o paciente até a conciliação bancária.",
  contatos: [
    { rotulo: "WhatsApp", valor: "(62) 99128-0209", href: "https://wa.me/5562991280209" },
    { rotulo: "E-mail", valor: "contato@i-ris.com", href: "mailto:contato@i-ris.com" },
    { rotulo: "Site", valor: "i-ris.com", href: "https://i-ris.com" },
  ],
  nota: "As funcionalidades e os resultados podem variar de acordo com as características de cada operação.",
  fundo: "#0e1430",
  acento: "#26b9da",
};
