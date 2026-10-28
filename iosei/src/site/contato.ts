// WhatsApp do comercial da IOSEI, usado em todos os botões de contato do site IOSEI.
export const WHATSAPP_COMERCIAL = "5562996725667";
export const WHATSAPP_EXIBICAO = "(62) 99672-5667";
export const MSG_PADRAO = "Olá! Acessei o site da IOSEI Group e gostaria de falar com um especialista.";
export const whatsapp = (mensagem: string = MSG_PADRAO) =>
  `https://wa.me/${WHATSAPP_COMERCIAL}?text=${encodeURIComponent(mensagem)}`;
