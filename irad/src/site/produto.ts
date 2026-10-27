import type { ConfigProduto } from "@/components/site/produto/CascaProduto";

export const PRODUTO: ConfigProduto = {
  logo: "/assets/irad-principal-negativa.svg",
  logoAlt: "I-RAD Data Health",
  cta: "Solicitar demonstração",
  entrar: { rotulo: "Entrar", href: "https://bi.i-rad.co" },
  frase: "Ajudamos você a melhorar a eficiência da sua Ressonância Magnética.",
  descricao: "O I-RAD transforma os dados operacionais dos seus equipamentos em indicadores de tempo, fluxo e utilização, para decisões baseadas em evidências.",
  contatos: [
    { rotulo: "WhatsApp", valor: "(62) 99128-0209", href: "https://wa.me/5562991280209" },
    { rotulo: "Site", valor: "i-rad.co", href: "https://i-rad.co" },
  ],
  nota: "As funcionalidades e os resultados podem variar de acordo com o equipamento, o protocolo utilizado e as características de cada operação.",
  fundo: "#0d1433",
  acento: "#26b9da",
  cabecalhoFixo: true,
};
