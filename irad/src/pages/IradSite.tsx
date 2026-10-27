import { useEffect, useMemo } from "react";
import { RaizProduto } from "@/components/site/produto/RaizProduto";
import { Destino } from "@/components/site/comum/Destino";
import "@/components/site/irad2/irad2.css";
import iradLogoMono from "@/assets/irad2/irad-logo-mono.png";
import { Seta } from "@/components/site/irad2/pecas";
import { CorpoIrad } from "@/components/site/irad2/CorpoIrad";
import { CenaIrad, type Momento } from "@/components/site/irad2/CenaIrad";
import { criarCamadaTroca } from "@/components/site/irad2/camadaTroca";

const VIDEO = "/midia/irad-troca.mp4";
const POSTER = "/midia/irad-troca.jpg";
const RECEPCAO = { calma: "/midia/recepcao-calma.jpg", pessoas: "/midia/recepcao-pessoas.webp" };

/* progresso da rolagem -> segundo do vídeo (8 s) */
const MAPA: Array<[number, number]> = [[0, 0], [0.07, 0], [0.09, 0.3], [0.41, 7.96], [1, 7.96]];

export default function IradSite() {
  useEffect(() => {
    document.title = "I-RAD | Inteligência operacional para diagnóstico por imagem";
  }, []);
  const desenhar = useMemo(() => criarCamadaTroca(RECEPCAO), []);
  const momentos: Momento[] = [
    {
      de: 0, ate: 0.07, pos: "dir", tema: "noite",
      conteudo: (
        <div className="ir-vidro ir-vidro--g">
          <img src={iradLogoMono} alt="I-RAD Data Health" className="ir-marca-logo" />
          <h1 className="ir-h1">Ajudamos você a melhorar a <span className="ir-acento">eficiência</span> da sua Ressonância Magnética.</h1>
          <p className="ir-lead">Sua ressonância produz dados o dia inteiro. <span className="ir-nq">O I-RAD</span> transforma cada segundo em decisão.</p>
          <Destino to="/contato" className="ir-botao">Solicitar demonstração<Seta /></Destino>
        </div>
      ),
    },
    {
      de: 0.09, ate: 0.205, pos: "esq", tema: "noite",
      conteudo: (
        <div className="ir-vidro">
          <h2 className="ir-h2">Entre um exame e outro, a sala para.</h2>
          <p className="ir-texto">Retirar o paciente, preparar a mesa e posicionar o próximo. Sem medir, ninguém sabe quanto tempo isso leva.</p>
        </div>
      ),
    },
    {
      de: 0.215, ate: 0.33, pos: "esq", tema: "noite",
      conteudo: (
        <div className="ir-vidro">
          <h2 className="ir-h2">Cada minuto acima da meta empurra a agenda inteira.</h2>
          <p className="ir-texto">Quando a troca passa do previsto, o slot real cresce e os últimos exames do dia deixam de caber.</p>
        </div>
      ),
    },
    {
      de: 0.34, ate: 0.42, pos: "esq", tema: "noite",
      conteudo: (
        <div className="ir-vidro">
          <h2 className="ir-h2">O I-RAD mede cada troca, cada protocolo e cada repetição, sala a sala.</h2>
        </div>
      ),
    },
    {
      de: 0.44, ate: 0.585, pos: "esq", tema: "noite",
      conteudo: (
        <div className="ir-vidro">
          <h2 className="ir-h2">Enquanto isso, a recepção enche.</h2>
          <p className="ir-texto">O atraso de cada troca se soma ao longo do dia e vira espera para quem ainda vai entrar.</p>
        </div>
      ),
    },
    {
      de: 0.6, ate: 0.73, pos: "esq", tema: "noite",
      conteudo: (
        <div className="ir-vidro">
          <h2 className="ir-h2">Dados que já existem. A visibilidade e os insights que ainda não estavam disponíveis.</h2>
          <p className="ir-texto">Do evento bruto do equipamento ao indicador que muda a decisão do dia seguinte.</p>
        </div>
      ),
    },
    {
      de: 0.75, ate: 1, pos: "esq", tema: "noite",
      conteudo: (
        <div className="ir-vidro">
          <h2 className="ir-h2">Quando a troca volta para a meta, a fila anda.</h2>
          <p className="ir-texto">O paciente espera menos e a operação realiza mais exames com a mesma estrutura.</p>
        </div>
      ),
    },
  ];
  return (
    <RaizProduto>
    <div className="ir" lang="pt-BR">
      <CenaIrad
        rotulo="I-RAD, a troca de paciente medida em cada segundo"
        video={VIDEO}
        poster={POSTER}
        altura={1150}
        mapa={MAPA}
        momentos={momentos}
        desenhar={desenhar}
      />
      <CorpoIrad />
    </div>
    </RaizProduto>
  );
}
