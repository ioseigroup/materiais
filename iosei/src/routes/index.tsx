import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import tcImg from "@/assets/TC3.jpg";
import "@/iosei/iosei.css";
import { Cena, type Momento } from "@/iosei/Cena";
import { Botao, Ligacao, Surge, FundoVivo, Seta } from "@/iosei/pecas";
import { MIDIA } from "@/iosei/midia";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IOSEI Group | Radiologia de alta performance" },
      {
        name: "description",
        content:
          "Tecnologia, inteligência artificial e dados para acelerar exames, revelar gargalos e gerar mais valor com os equipamentos que sua instituição já possui.",
      },
      { property: "og:title", content: "IOSEI Group | Radiologia de alta performance" },
      {
        property: "og:description",
        content:
          "Ecossistema de tecnologia para diagnóstico por imagem: aceleração de RM, inteligência operacional, otimização de contraste, dose e PET-CT.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const etapas = [
  { t: "Acelere a aquisição", d: "Reduza o tempo necessário para realizar os exames e libere capacidade do equipamento.", s: "SwiftMR" },
  { t: "Identifique os gargalos", d: "Descubra como tempo de troca, protocolos, atrasos e ociosidade afetam o ciclo completo.", s: "I-RAD" },
  { t: "Elimine desperdícios", d: "Imprima exames somente quando houver uma solicitação real.", s: "I-PRINT" },
  { t: "Otimize doses e insumos", d: "Reduza contraste, radiação, radiofármacos e custos sem perder o foco na qualidade da imagem.", s: "ClariACE · ClariCT.AI · ClariPET-CT" },
];

const pontosCegos = [
  "Quanto do tempo útil do scanner se perde em preparação, troca de pacientes, atrasos e ociosidade entre exames?",
  "Quantos exames impressos nunca são retirados, com custo de filme, toner e armazenamento?",
  "Quanto de contraste e dose ainda poderia ser evitado com protocolos atualizados?",
  "Quanto da fila existe por limite de capacidade, com salas e equipamentos subutilizados?",
  "Sua gestão compara salas, unidades, turnos e protocolos com dados?",
  "Quanta receita se perde em cancelamentos e faltas que a capacidade ociosa não consegue repor?",
];

const objetivos = [
  { text: "Preciso realizar mais exames de ressonância com o mesmo equipamento.", cta: "SwiftMR", to: "/swiftmr" },
  { text: "Preciso reduzir o consumo de contraste iodado.", cta: "ClariACE", to: "/claripi/clariace" },
  { text: "Preciso reduzir dose e ruído em tomografia.", cta: "ClariCT.AI", to: "/claripi/clarict-ai" },
  { text: "Preciso reduzir tempo ou radiofármaco em PET-CT.", cta: "ClariPET-CT", to: "/claripi/claripet-ct" },
  { text: "Preciso reduzir custos com impressões desnecessárias.", cta: "I-PRINT", to: "/iprint" },
  { text: "Preciso descobrir por que algumas salas ou unidades produzem melhor que outras.", cta: "I-RAD", to: "/irad" },
];

const solucoes: Array<{ area: string; h3: string; text: string; marca: ReactNode; to: string }> = [
  {
    area: "Ressonância magnética",
    h3: "Acelere seus exames em até 50%.",
    text: "Reduza o tempo de aquisição, aumente a capacidade do equipamento e melhore a qualidade das imagens com inteligência artificial.",
    marca: <>Swift<b>MR</b></>,
    to: "/swiftmr",
  },
  {
    area: "Inteligência operacional",
    h3: "Descubra onde sua operação perde tempo e performance.",
    text: "Transforme os dados dos equipamentos em indicadores de ciclo, troca, protocolos, atrasos e ociosidade, com visibilidade completa da operação.",
    marca: <>I-RAD <small>Data Health</small></>,
    to: "/irad",
  },
  {
    area: "Contraste iodado",
    h3: "Reduza em até 50% o volume de contraste.",
    text: "Utilize inteligência artificial para potencializar seletivamente o realce do iodo em exames de tomografia contrastada.",
    marca: <>Clari<b>ACE</b></>,
    to: "/claripi/clariace",
  },
  {
    area: "Tomografia computadorizada",
    h3: "Menor dose. Mais clareza. Mais vida útil para o equipamento.",
    text: "Reduza ruídos em imagens de baixa e ultrabaixa dose, preservando a clareza das estruturas anatômicas.",
    marca: <>Clari<b>CT.AI</b></>,
    to: "/claripi/clarict-ai",
  },
  {
    area: "PET-CT",
    h3: "Reduza tempo de exame e uso de radiofármaco.",
    text: "Utilize reconstrução baseada em inteligência artificial para obter maior eficiência operacional e mais conforto para o paciente.",
    marca: <>Clari<b>PET-CT</b></>,
    to: "/claripi/claripet-ct",
  },
  {
    area: "Impressão sob demanda",
    h3: "Pare de imprimir exames que nunca serão retirados.",
    text: "Centralize as solicitações e realize a impressão somente quando houver demanda real do paciente.",
    marca: <>I-PRINT <small>On Demand</small></>,
    to: "/iprint",
  },
];

const indicadores = [
  { t: "Faturamento", d: "Mais exames realizados com a mesma estrutura.", sobe: true, cor: "#1597c2" },
  { t: "ROI", d: "Mais retorno dos equipamentos que você já possui.", sobe: true, cor: "#2a5bd7" },
  { t: "NPS", d: "Menos espera e menos atraso para o paciente.", sobe: true, cor: "#26b9da" },
  { t: "Custo fixo", d: "Menos desperdício de insumos, contraste e tempo.", sobe: false, cor: "#b7c2ee" },
];

const calculadoras = [
  { t: "Capacidade e retorno com SwiftMR", d: "Estime a capacidade adicional em ressonância e o ganho financeiro por equipamento.", href: "https://calculator.iosei.co/swiftmr.html" },
  { t: "Economia com contraste e ClariPI", d: "Calcule a redução de custo com contraste iodado em tomografia contrastada.", href: "https://calculator.iosei.co/clariace.html" },
  { t: "Economia com impressão sob demanda", d: "Descubra o quanto sua instituição gasta com impressões que nunca são retiradas.", href: "https://calculator.iosei.co/i-print.html" },
];

function HomePage() {
  const momentos: Momento[] = [
    {
      de: 0, ate: 0.2, pos: "dir",
      conteudo: (
        <div className="io-painel io-painel--g io-vidro">
          <h1 className="io-h1">Radiologia de <span className="io-acento">alta performance</span> começa com inteligência em cada etapa.</h1>
          <p className="io-lead">Tecnologia, inteligência artificial e dados para acelerar exames, revelar gargalos, reduzir desperdícios e gerar mais valor com os equipamentos que sua instituição já possui.</p>
          <div className="io-acoes">
            <Botao para="#solucoes">Conhecer nossas soluções</Botao>
            <Botao para="/contato" vidro seta={false}>Falar com um especialista</Botao>
          </div>
          <p className="io-nota">Operação em seis países: Brasil, Espanha, Portugal, Paraguai, Panamá e Estados Unidos.</p>
        </div>
      ),
    },
    {
      de: 0.23, ate: 0.42, pos: "dir",
      conteudo: (
        <div className="io-painel io-vidro">
          <h2 className="io-h2">A performance da radiologia não depende de uma única etapa.</h2>
          <ul className="io-itens">
            {etapas.map((e) => (
              <li key={e.t}>
                <strong>{e.t}</strong>
                <span>{e.d}</span>
                <span className="io-acento">{e.s}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      de: 0.44, ate: 0.6, pos: "dir",
      conteudo: (
        <div className="io-painel io-painel--g io-vidro">
          <h2 className="io-h2">Agenda cheia não significa eficiência.</h2>
          <ul className="io-itens io-itens--2">
            {pontosCegos.map((q) => <li key={q}><span>{q}</span></li>)}
          </ul>
          <p className="io-texto2">A IOSEI conecta tecnologia, inteligência artificial e dados para transformar esses pontos cegos em <span className="io-acento">oportunidades mensuráveis de performance</span>.</p>
        </div>
      ),
    },
    {
      de: 0.62, ate: 0.8, pos: "dir",
      conteudo: (
        <div className="io-painel io-vidro">
          <h2 className="io-h2">Alta performance aparece no resultado.</h2>
          <ul className="io-indicadores">
            {indicadores.map((d) => (
              <li key={d.t} data-sobe={d.sobe ? "true" : "false"} style={{ ["--cor" as any]: d.cor }}>
                <svg viewBox="0 0 120 40" aria-hidden="true"><path d={d.sobe ? "M2 34 C 30 32, 44 26, 62 20 S 96 8, 118 4" : "M2 6 C 30 8, 44 14, 62 20 S 96 31, 118 35"} /></svg>
                <div><strong>{d.t}<i aria-hidden="true">{d.sobe ? "↑" : "↓"}</i></strong><span>{d.d}</span></div>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      de: 0.82, ate: 1, pos: "dir",
      conteudo: (
        <div className="io-painel io-painel--g io-vidro">
          <h2 className="io-h2">Qual resultado sua instituição precisa alcançar?</h2>
          <div className="io-atalhos">
            {objetivos.map((o) => (
              <Link key={o.to} to={o.to as any}>
                <span>{o.text}</span>
                <em>{o.cta}<Seta /></em>
              </Link>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="io" data-tema="claro" lang="pt-BR">
      <Cena
        rotulo="IOSEI, do mapa de operações à decolagem dos resultados"
        video={MIDIA.home}
        poster={MIDIA.homePoster}
        altura={620}
        tema="noite"
        claroEm={0.84}
        foco={15}
        momentos={momentos}
      />

      <div className="io-fluxo">
        <FundoVivo />
        <section id="solucoes" className="io-bloco">
          <div className="io-faixa">
            <Surge className="io-cab io-cab--largo">
              <h2 className="io-h2">Seis soluções, uma operação de alta performance.</h2>
            </Surge>
            <Surge className="io-trilho io-cascata">
              {solucoes.map((s) => (
                <Link key={s.to} to={s.to as any}>
                  <h3>{s.h3}</h3>
                  <p>{s.text}</p>
                  <div className="io-trilho__fim">
                    <span className="io-marca">{s.marca}</span>
                    <span>{s.area}</span>
                    <Seta />
                  </div>
                </Link>
              ))}
            </Surge>
          </div>
        </section>

        <section className="io-janela" data-tema="noite">
          <img src={tcImg} alt="Tomógrafo em sala de exame" loading="lazy" />
          <div className="io-faixa">
            <Surge className="io-painel io-painel--g io-vidro">
              <h2 className="io-h2">Tecnologia desenvolvida para quem vive a realidade da radiologia.</h2>
              <p className="io-texto2">A IOSEI Group atua na transformação de operações de diagnóstico por imagem por meio de tecnologia, inteligência artificial e gestão orientada por dados.</p>
              <p className="io-texto2">Nosso portfólio reúne soluções para ressonância magnética, tomografia, PET-CT, inteligência operacional e redução de desperdícios.</p>
              <p className="io-texto2">Mais do que implementar tecnologias, trabalhamos para que cada solução gere impacto real na produtividade, na previsibilidade da operação, na experiência do paciente e na rentabilidade da instituição.</p>
              <Ligacao para="/quem-somos">Conhecer a IOSEI Group</Ligacao>
            </Surge>
          </div>
        </section>

        <section className="io-bloco" style={{ paddingTop: "clamp(64px, 10vw, 132px)" }}>
          <div className="io-faixa">
            <Surge className="io-cab io-cab--largo">
              <h2 className="io-h2">Descubra quanto sua operação pode economizar ou produzir.</h2>
              <p className="io-lead">Utilize nossas calculadoras para estimar o impacto financeiro das soluções a partir dos dados reais da sua instituição.</p>
            </Surge>
            <Surge className="io-colunas io-cascata">
              {calculadoras.map((c) => (
                <a key={c.href} className="io-coluna-link" href={c.href} target="_blank" rel="noreferrer">
                  <h3 className="io-h3">{c.t}</h3>
                  <p>{c.d}</p>
                  <span className="io-link">Calcular meu retorno<Seta /></span>
                </a>
              ))}
            </Surge>
            <div className="io-acoes" style={{ marginTop: "clamp(28px, 4vw, 48px)" }}>
              <Botao para="https://calculator.iosei.co/" vidro>Acessar todas as calculadoras</Botao>
            </div>
          </div>
        </section>

        <section className="io-final">
          <div className="io-faixa">
            <Surge>
              <h2 className="io-h1">O gargalo da sua radiologia pode estar escondido na rotina operacional.</h2>
              <p className="io-lead">Converse com nossos especialistas e descubra onde tecnologia, inteligência artificial e dados podem gerar resultados na sua instituição.</p>
              <div className="io-acoes">
                <Botao para="/contato">Avaliar minha operação</Botao>
              </div>
            </Surge>
          </div>
        </section>
      </div>
    </div>
  );
}
