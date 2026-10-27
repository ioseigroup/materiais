// @ts-nocheck
// Página I-RIS: HTML e comportamento (cena de abertura, revelações, painéis). Sem dependência de janela no carregamento.
export const IRIS_HTML = "<div class=\"iris\" lang=\"pt-BR\"><section class=\"i5-cena\" data-cena><div class=\"i5-palco\"><div class=\"i5-pontos\" aria-hidden=\"true\"><\/div><canvas class=\"i5-canvas\" aria-hidden=\"true\"><\/canvas><div class=\"i5-trilha\"><div class=\"i5-etapa\" data-i=\"0\"><span class=\"n\">01<\/span><strong>Agenda<\/strong><em class=\"vzm\">21,9%<\/em><div class=\"ctl\"><b>Regras e filtro<\/b><small>IPM e ocupação nobre<\/small><\/div><\/div><div class=\"i5-etapa\" data-i=\"1\"><span class=\"n\">02<\/span><strong>Confirmação<\/strong><em class=\"vzm\">15,8%<\/em><div class=\"ctl\"><b>Retenção<\/b><small>No-show e recuperados<\/small><\/div><\/div><div class=\"i5-etapa\" data-i=\"2\"><span class=\"n\">03<\/span><strong>Execução<\/strong><em class=\"vzm\">6,4% vs 8,3%<\/em><div class=\"ctl\"><b>Mat/med por regra<\/b><small>% mat/med sobre exame<\/small><\/div><\/div><div class=\"i5-etapa\" data-i=\"3\"><span class=\"n\">04<\/span><strong>Laudo<\/strong><div class=\"ctl\"><b>Distribuição por cota<\/b><small>Tempo médio de laudo<\/small><\/div><\/div><div class=\"i5-etapa\" data-i=\"4\"><span class=\"n\">05<\/span><strong>Faturamento​<\/strong><em class=\"vzm\">7,14%<\/em><div class=\"ctl\"><b>Checagem 1 e 2<\/b><small>Glosa por operadora<\/small><\/div><\/div><div class=\"i5-etapa\" data-i=\"5\"><span class=\"n\">06<\/span><strong>Banco<\/strong><em class=\"vzm\">Invisível<\/em><div class=\"ctl\"><b>Conciliação<\/b><small>Faturado vs recebido<\/small><\/div><\/div><\/div><div class=\"i5-vaz\" data-etapa=\"0\" data-k=\"0\"><p class=\"num\"><strong>21,9%<\/strong> <span>de abandono<\/span><\/p><p class=\"tit\">Call center que não atende<\/p><\/div><div class=\"i5-vaz\" data-etapa=\"0\" data-k=\"1\"><p class=\"num\"><strong>Classe C<\/strong> <span>no horário nobre<\/span><\/p><p class=\"tit\">Melhor horário, pior pagador<\/p><\/div><div class=\"i5-vaz\" data-etapa=\"1\" data-k=\"2\"><p class=\"num\"><strong>15,8%<\/strong> <span>dos exames agendados<\/span><\/p><p class=\"tit\">Paciente que não chega<\/p><\/div><div class=\"i5-vaz\" data-etapa=\"2\" data-k=\"3\"><p class=\"num\"><strong>6,4% vs 8,3%<\/strong> <span>cobrável<\/span><\/p><p class=\"tit\">Material usado e não cobrado<\/p><\/div><div class=\"i5-vaz\" data-etapa=\"4\" data-k=\"4\"><p class=\"num\"><strong>7,14%<\/strong> <span>de glosa definitiva<\/span><\/p><p class=\"tit\">Glosa descoberta tarde<\/p><\/div><div class=\"i5-vaz\" data-etapa=\"5\" data-k=\"5\"><p class=\"num\"><strong>Invisível<\/strong> <span>faturado vs recebido<\/span><\/p><p class=\"tit\">Faturado que não concilia<\/p><\/div><div class=\"i5-medidor\" aria-hidden=\"true\"><div class=\"rot\"><p data-r=\"0\">A receita escapa pelo caminho<\/p><p data-r=\"1\">5% a 12% da receita anual<\/p><p data-r=\"2\">Glosa definitiva abaixo de 0,5%<\/p><p data-r=\"3\">100% do fluxo rastreável até o banco<\/p><\/div><div class=\"lin\"><span class=\"nm\">Produzido<\/span><span class=\"tr\"><i class=\"prod\"><\/i><\/span><\/div><div class=\"lin\"><span class=\"nm\">No banco<\/span><span class=\"tr\"><i class=\"banco\"><\/i><i class=\"gap\"><\/i><\/span><\/div><\/div><div class=\"i5-copilot\" aria-hidden=\"true\"><div class=\"cab\"><p class=\"de\">De: I-RIS Copilot · Para: Sócios e gestores<\/p><p class=\"ass\">Semana 39 · 3 pontos de atenção · R$ 61,7 mil recuperáveis<\/p><\/div><ol><li data-a=\"0\"><span class=\"nn\">1<\/span><div><strong>Glosa concentrada em uma operadora<\/strong><p>A Operadora 3 glosou 38% das guias de RM por ausência de autorização prévia. Recomendação: ativar a Checagem 1 obrigatória para esta operadora.<\/p><\/div><div class=\"imp\"><small>Impacto estimado<\/small><b>R$ 22,4 mil / mês<\/b><\/div><\/li><li data-a=\"1\"><span class=\"nn\">2<\/span><div><strong>No-show de TC subiu na Unidade Sul<\/strong><p>Passou de 5,1% para 9,4% em duas semanas. A confirmação eletrônica está desligada nessa unidade desde o dia 12. Recomendação: religar e priorizar a fila de retenção de TC.<\/p><\/div><div class=\"imp\"><small>Impacto estimado<\/small><b>R$ 14,9 mil / mês<\/b><\/div><\/li><li data-a=\"2\"><span class=\"nn\">3<\/span><div><strong>Horário nobre ocupado por classe C<\/strong><p>Entre 8h e 10h, 41% das RMs foram para operadoras de menor preço médio. Recomendação: aplicar filtro de agenda com exceção por prazo de 48h.<\/p><\/div><div class=\"imp\"><small>Impacto estimado<\/small><b>R$ 24,4 mil / mês<\/b><\/div><\/li><\/ol><\/div><div class=\"i5-cartoes\"><div class=\"i5-cartao\" data-f=\"0\"><img class=\"logo\" src=\"./assets/iris-principal-cor.svg\" alt=\"I-RIS Business OS\" width=\"240\" height=\"46\"><h1 class=\"i5-h1\">Sua radiologia tem potencial para render mais. <span class=\"ac\">O I-RIS mostra onde. E como.<\/span><\/h1><p>O Business OS do centro de diagnóstico por imagem: 100% do fluxo dentro do sistema, do primeiro contato com o paciente até a conciliação bancária.<\/p><\/div><div class=\"i5-cartao\" data-f=\"1\"><h2 class=\"i5-h2c\">Sua clínica fatura menos do que produz.<\/h2><p>Entre o agendamento e o dinheiro no banco, a receita escapa por seis pontos que quase ninguém mede. Cada um deles tem número.<\/p><\/div><div class=\"i5-cartao\" data-f=\"2\"><h2 class=\"i5-h2c\">Somadas, entre 5% e 12% da receita anual.<\/h2><p>É o que essas oportunidades representam em uma clínica de imagem. O I-RIS existe para conquistá-las, uma a uma, com número.<\/p><\/div><div class=\"i5-cartao\" data-f=\"3\"><h2 class=\"i5-h2c\">Seis etapas, seis controles, seis indicadores.<\/h2><p>Com o I-RIS, cada etapa entrega dado pronto para a próxima, e cada dado vira indicador financeiro.<\/p><\/div><div class=\"i5-cartao\" data-f=\"4\"><h2 class=\"i5-h2c\">Uma inteligência que vigia a sua receita todos os dias.<\/h2><p>O I-RIS Copilot aponta onde o processo está falhando e avisa o gestor antes do fechamento do mês.<\/p><\/div><div class=\"i5-cartao\" data-f=\"5\"><h2 class=\"i5-h2c\">Cada real com rastreabilidade, do caixa ao extrato.<\/h2><p>Quando a conta não fecha, você sabe exatamente em que etapa. Quando fecha, a sua equipe tem como provar que fez certo.<\/p><a class=\"i5-botao\" href=\"#/contato\">Solicitar demonstração<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12h14M13 6l6 6-6 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><\/svg><\/a><\/div><\/div><a class=\"i5-dica\" href=\"#i5-solucao\"><span>Role para baixo e acompanhe a jornada do dinheiro<\/span><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12 5v14M6 13l6 6 6-6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/><\/svg><\/a><div class=\"i5-prog\" aria-hidden=\"true\"><i><\/i><\/div><\/div><\/section><section class=\"i5-bloco\" id=\"i5-solucao\"><div class=\"i5-faixa\"><div class=\"i5-cab2\" data-surge><h2 class=\"i5-h2\">Um RIS que gerencia receita, não só agenda.<\/h2><p class=\"i5-lead\">O I-RIS é o Business OS do centro de diagnóstico por imagem. Cada etapa entrega dado pronto para a próxima, e cada dado vira indicador financeiro.<\/p><\/div><div class=\"i5-numeros\" data-surge><div><strong data-conta=\"13\">13<\/strong><span>módulos integrados<\/span><\/div><div><strong data-conta=\"68\">68<\/strong><span>processos da clínica cobertos<\/span><\/div><div><strong data-conta=\"100%\">100%<\/strong><span>do fluxo rastreável até o banco<\/span><\/div><div><strong data-conta=\"1\">1<\/strong><span>base para várias empresas e marcas<\/span><\/div><\/div><div class=\"i5-modulos\"><article data-surge><svg class=\"ic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 7h16v13H4zM4 11h16M8 4v5M16 4v5\"/><\/g><\/svg><h3 class=\"i5-h3\">Agendamento por regras<\/h3><p>Overlap, overbook, composição de exames, atributos de médico e equipamento, agendas de sedação. O atendente agenda sem precisar conhecer as regras de cada operadora.<\/p><p class=\"res\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12h14M13 6l6 6-6 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><\/svg>Mais exames na mesma estrutura<\/p><\/article><article data-surge><svg class=\"ic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 5h16l-6 8v6l-4-2v-4z\"/><\/g><\/svg><h3 class=\"i5-h3\">Filtro de agenda por operadora<\/h3><p>Classifica horários e fontes pagadoras por rentabilidade e libera os melhores slots primeiro para quem paga melhor, com exceções por prazo, chave e valor.<\/p><p class=\"res\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12h14M13 6l6 6-6 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><\/svg>Preço médio por exame maior<\/p><\/article><article data-surge><svg class=\"ic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 12a8 8 0 1 1-2.3-5.6M20 4v5h-5\"/><\/g><\/svg><h3 class=\"i5-h3\">Célula de retenção<\/h3><p>Todo exame perdido entra automaticamente numa fila de recuperação, por modalidade e rentabilidade, com indicador de recuperáveis e recuperados.<\/p><p class=\"res\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12h14M13 6l6 6-6 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><\/svg>Receita perdida de volta à agenda<\/p><\/article><article data-surge><svg class=\"ic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9 3h6M10 3v4l-4 9a3 3 0 0 0 2.7 4h6.6a3 3 0 0 0 2.7-4l-4-9V3M8 14h8\"/><\/g><\/svg><h3 class=\"i5-h3\">Cobrança automática de mat/med<\/h3><p>O operador informa sim ou não para contraste, sedação e materiais especiais; o sistema cobra o que a regra de cada fonte pagadora permite.<\/p><p class=\"res\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12h14M13 6l6 6-6 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><\/svg>Menos glosa, mais receita, menos retrabalho<\/p><\/article><article data-surge><svg class=\"ic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM8.5 12l2.5 2.5 4.5-5\"/><\/g><\/svg><h3 class=\"i5-h3\">Recebíveis blindados<\/h3><p>Checagem 1 e 2 por operadora, pendências, perdas, pré-faturamento, conciliação de guias por XML e conciliação do faturamento com o financeiro.<\/p><p class=\"res\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12h14M13 6l6 6-6 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><\/svg>Glosa definitiva abaixo de 0,5%<\/p><\/article><article data-surge><svg class=\"ic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 20V10M10 20V4M16 20v-7M22 20H2\"/><\/g><\/svg><h3 class=\"i5-h3\">Financeiro, tesouraria e BI<\/h3><p>Caixas individuais por usuário, malotes, conciliação por OFX, DRE e EBITDA caixa dentro do sistema. Índice de Preço Médio por operadora, mapas de calor e tempos da jornada.<\/p><p class=\"res\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12h14M13 6l6 6-6 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><\/svg>Margem visível todo dia, não no fechamento<\/p><\/article><\/div><\/div><\/section><section class=\"i5-bloco i5-gelo\"><div class=\"i5-faixa i5-integ\"><div data-surge><h2 class=\"i5-h2\">Cada real com dono e trilha.<\/h2><p class=\"i5-lead\">Do caixa da recepção ao extrato bancário, o I-RIS registra quem fez o quê, quando e com qual valor. Nenhum valor é alterado sem registro.<\/p><\/div><ol class=\"i5-passos\" data-surge><li><span class=\"q\">1<\/span><h3 class=\"i5-h3\">Caixas individuais<\/h3><p>Um caixa por usuário, com abertura e fechamento diários.<\/p><\/li><li><span class=\"q\">2<\/span><h3 class=\"i5-h3\">Malotes conferidos<\/h3><p>Valores da unidade seguem para a tesouraria por malote, conferido na chegada.<\/p><\/li><li><span class=\"q\">3<\/span><h3 class=\"i5-h3\">Conciliação completa<\/h3><p>Guia, nota fiscal e extrato bancário (OFX) batem entre si.<\/p><\/li><li><span class=\"q\">4<\/span><h3 class=\"i5-h3\">Trilha de auditoria<\/h3><p>Quem, quando, quanto: cada lançamento tem autor e histórico.<\/p><\/li><\/ol><\/div><\/section><section class=\"i5-bloco i5-noite\" id=\"i5-copilot\"><div class=\"i5-brilho\" aria-hidden=\"true\"><\/div><div class=\"i5-faixa i5-cop\"><div class=\"i5-cop__texto\" data-surge><img class=\"logo\" src=\"./assets/iris-principal-negativa.svg\" alt=\"I-RIS Business OS\" width=\"200\" height=\"38\"><h2 class=\"i5-h2\">Uma inteligência que vigia a sua receita todos os dias.<\/h2><p class=\"i5-lead\">O I-RIS Copilot analisa os dados da operação, aponta onde o processo está falhando e responde a qualquer pergunta sobre a sua clínica.<\/p><div class=\"i5-pilares\"><div><h3 class=\"i5-h3\">Monitora<\/h3><p>Ocupação da agenda, retenção, mix de operadoras nos melhores horários, cobrança de materiais, glosa e conciliação, sempre com meta, tendência e comparação entre unidades.<\/p><\/div><div><h3 class=\"i5-h3\">Recomenda<\/h3><p>Cada alerta vem com a causa provável, a configuração que resolve e o impacto estimado em reais. O gestor decide em minutos, com contexto.<\/p><\/div><div><h3 class=\"i5-h3\">Responde<\/h3><p>Pergunte sobre produção, agenda, faturamento ou remuneração médica. A resposta sai dos dados reais do I-RIS, sem relatório para montar.<\/p><\/div><div><h3 class=\"i5-h3\">Alerta<\/h3><p>Resumo semanal e alertas críticos por e-mail para sócios e gestores. Quem nunca abre o sistema também sabe onde a clínica está perdendo dinheiro.<\/p><\/div><\/div><\/div><div class=\"i5-cop__vivo\" data-surge><div class=\"i5-email\"><div class=\"cab\"><p class=\"de\">De: I-RIS Copilot · Para: Sócios e gestores<\/p><p class=\"ass\">Semana 39 · 3 pontos de atenção · R$ 61,7 mil recuperáveis<\/p><\/div><ol><li><span class=\"nn\">1<\/span><div><strong>Glosa concentrada em uma operadora<\/strong><p>A Operadora 3 glosou 38% das guias de RM por ausência de autorização prévia. Recomendação: ativar a Checagem 1 obrigatória para esta operadora.<\/p><\/div><div class=\"imp\"><small>Impacto estimado<\/small><b>R$ 22,4 mil / mês<\/b><\/div><\/li><li><span class=\"nn\">2<\/span><div><strong>No-show de TC subiu na Unidade Sul<\/strong><p>Passou de 5,1% para 9,4% em duas semanas. A confirmação eletrônica está desligada nessa unidade desde o dia 12. Recomendação: religar e priorizar a fila de retenção de TC.<\/p><\/div><div class=\"imp\"><small>Impacto estimado<\/small><b>R$ 14,9 mil / mês<\/b><\/div><\/li><li><span class=\"nn\">3<\/span><div><strong>Horário nobre ocupado por classe C<\/strong><p>Entre 8h e 10h, 41% das RMs foram para operadoras de menor preço médio. Recomendação: aplicar filtro de agenda com exceção por prazo de 48h.<\/p><\/div><div class=\"imp\"><small>Impacto estimado<\/small><b>R$ 24,4 mil / mês<\/b><\/div><\/li><\/ol><\/div><div class=\"i5-chat\"><p class=\"eu\">Qual foi meu preço médio de RM por operadora no último trimestre, e quem caiu de classe?<\/p><p class=\"ele\"><span class=\"digita\" aria-hidden=\"true\"><i><\/i><i><\/i><i><\/i><\/span><span class=\"txt\">Seu IPM de RM foi R$ 412. A Operadora 7 caiu de classe A para B após o reajuste de julho (-11,7%). Ela ocupa 14% da sua agenda de RM. Quer ver o impacto de movê-la para horários de menor demanda?<\/span><\/p><\/div><\/div><\/div><p class=\"i5-faixa i5-nota-cop\" data-surge><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\"/><\/svg><span>O Copilot identifica e recomenda. Não altera agenda, guia ou lançamento por conta própria: a decisão e a ação são sempre da sua equipe.<\/span><\/p><\/section><section class=\"i5-bloco\" id=\"i5-resultados\"><div class=\"i5-faixa\"><div class=\"i5-cab2\" data-surge><h2 class=\"i5-h2\">Cinco oportunidades, cinco resultados com número.<\/h2><p class=\"i5-lead\">Ganhos recorrentes, medidos em clínicas que operam com a plataforma. As identidades foram preservadas; os números, não.<\/p><\/div><div class=\"i5-res\"><article data-surge data-tipo=\"cai\"><div class=\"vis cai\"><div class=\"lin\"><span class=\"b a\" style=\"--w:100%\"><\/span><b>5,5%<\/b><\/div><div class=\"lin\"><span class=\"b d\" style=\"--w:4%\"><\/span><b class=\"d\">0,22%<\/b><\/div><\/div><p class=\"big\"><span class=\"de\">5,5%<\/span><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12h14M13 6l6 6-6 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/><\/svg><strong>0,22%<\/strong><\/p><h3 class=\"i5-h3\">Glosa definitiva praticamente zerada<\/h3><p>Checagem por operadora, pendências e conciliação de guias colocaram 100% do faturamento sob controle até o banco.<\/p><p class=\"perfil\">Clínica de R$ 10,9 mi · 44.856 exames · 96 colaboradores<\/p><p class=\"ganho\"><span>Ganho recorrente<\/span><b>R$ 577 mil / ano<\/b><\/p><\/article><article data-surge data-tipo=\"anel\"><div class=\"vis anel\"><svg viewBox=\"0 0 120 120\"><circle cx=\"60\" cy=\"60\" r=\"50\" class=\"fundo\"/><circle cx=\"60\" cy=\"60\" r=\"50\" class=\"arco\" style=\"--v:40.8\"/><\/svg><\/div><p class=\"big\"><strong>40,8%<\/strong> <span>das RMs perdidas<\/span><\/p><h3 class=\"i5-h3\">Exames perdidos de volta à agenda<\/h3><p>Recuperação de 40,8% das ressonâncias e 39,7% das tomografias perdidas, sem ferramenta nem indicador antes da migração.<\/p><p class=\"perfil\">Clínica de R$ 18,1 mi · 167.224 exames · 79 colaboradores<\/p><p class=\"ganho\"><span>Ganho recorrente<\/span><b>R$ 394 mil / ano<\/b><\/p><\/article><article data-surge data-tipo=\"sobe\"><div class=\"vis slots\" aria-hidden=\"true\"><div class=\"row\"><small>Antes<\/small><div><i class=\"cc\" style=\"--d:0\">C<\/i><i class=\"cc\" style=\"--d:1\">C<\/i><i class=\"cb\" style=\"--d:2\">B<\/i><i class=\"cc\" style=\"--d:3\">C<\/i><i class=\"ca\" style=\"--d:4\">A<\/i><i class=\"cc\" style=\"--d:5\">C<\/i><i class=\"cb\" style=\"--d:6\">B<\/i><i class=\"cc\" style=\"--d:7\">C<\/i><\/div><\/div><div class=\"row\"><small>Com I-RIS<\/small><div><i class=\"ca\" style=\"--d:0\">A<\/i><i class=\"ca\" style=\"--d:1\">A<\/i><i class=\"cb\" style=\"--d:2\">B<\/i><i class=\"ca\" style=\"--d:3\">A<\/i><i class=\"cb\" style=\"--d:4\">B<\/i><i class=\"cb\" style=\"--d:5\">B<\/i><i class=\"cc\" style=\"--d:6\">C<\/i><i class=\"ca\" style=\"--d:7\">A<\/i><\/div><\/div><\/div><p class=\"big\"><strong>+3,05%<\/strong> <span>no preço médio<\/span><\/p><h3 class=\"i5-h3\">Melhores horários para os melhores pagadores<\/h3><p>O filtro por classe de operadora subiu o preço médio do ultrassom sem perder volume e melhorou as negociações de reajuste.<\/p><p class=\"perfil\">Clínica de R$ 36,2 mi · 268.411 exames · 139 colaboradores<\/p><p class=\"ganho\"><span>Ganho recorrente<\/span><b>R$ 408 mil / ano<\/b><\/p><\/article><article data-surge data-tipo=\"barras\"><div class=\"vis barras\"><div><span style=\"--h:77.7\"><\/span><small>6,42%<\/small><\/div><div><span class=\"d\" style=\"--h:100\"><\/span><small>8,26%<\/small><\/div><\/div><p class=\"big\"><strong>+28,6%<\/strong> <span>de cobrança<\/span><\/p><h3 class=\"i5-h3\">Material cobrado do jeito certo<\/h3><p>Mat/med passou de 6,42% para 8,26% do valor do exame com cobrança automática por regra de operadora, e liberou um colaborador do retrabalho.<\/p><p class=\"perfil\">Clínica de R$ 22,1 mi · 139.231 exames · 102 colaboradores<\/p><p class=\"ganho\"><span>Ganho recorrente<\/span><b>R$ 224 mil / ano<\/b><\/p><\/article><\/div><div class=\"i5-grupo\" data-surge><div class=\"topo\"><h3 class=\"i5-h3\">Seis centrais viraram uma.<\/h3><p>Grupo de R$ 60,1 mi · 7 cidades · 11 unidades · 3 marcas · 13 empresas · 157.332 exames<\/p><\/div><div class=\"cols\"><div><p class=\"big\"><strong>+5,95%<\/strong> <span>de receita<\/span><\/p><p>R$ 2,86 milhões por ano, com 100% das regras de agendamento automatizadas e todas as marcas na mesma base.<\/p><\/div><div><p class=\"big\"><strong>9,99%<\/strong> <span>de abandono de chamadas<\/span><\/p><p>Antes, 21,9%. Queda de 54% no abandono médio, com dimensionamento de 20 para 24 posições de atendimento.<\/p><\/div><div><p class=\"big\"><strong>73,9%<\/strong> <span>de SLA<\/span><\/p><p>Nível de serviço 29% maior, com um único call center para todas as cidades, sem misturar os dados.<\/p><\/div><\/div><\/div><p class=\"i5-nota\" data-surge>Resultados medidos pela própria plataforma, comparando o período anterior e o posterior à migração e à adequação dos processos. Variam conforme o mix de modalidades, operadoras e a disciplina de uso do sistema.<\/p><\/div><\/section><section class=\"i5-bloco i5-gelo\"><div class=\"i5-faixa\"><div class=\"i5-cab2\" data-surge><h2 class=\"i5-h2\">Do atendimento ao banco, cada real conferido.<\/h2><p class=\"i5-lead\">Os números por trás dos resultados, como o I-RIS mostra para o gestor.<\/p><\/div><div class=\"i5-medidas\"><div class=\"i5-painel funil\" data-surge><div class=\"pt\"><strong>Recebíveis em 12 meses<\/strong><span>Clínica de R$ 10,9 mi<\/span><\/div><ul><li class=\"n\"><span class=\"nome\">Total atendido<\/span><span class=\"trilho\"><i style=\"--w:100.0%\"><\/i><\/span><span class=\"val\">R$ 9.992.216<\/span><b>100,00%<\/b><\/li><li class=\"n\"><span class=\"nome\">Liberado<\/span><span class=\"trilho\"><i style=\"--w:99.12%\"><\/i><\/span><span class=\"val\">R$ 9.903.959<\/span><b>99,12%<\/b><\/li><li class=\"n\"><span class=\"nome\">Conciliado com o financeiro<\/span><span class=\"trilho\"><i style=\"--w:99.06%\"><\/i><\/span><span class=\"val\">R$ 9.898.738<\/span><b>99,06%<\/b><\/li><li class=\"n\"><span class=\"nome\">Efetivado pelo financeiro<\/span><span class=\"trilho\"><i style=\"--w:99.05%\"><\/i><\/span><span class=\"val\">R$ 9.897.203<\/span><b>99,05%<\/b><\/li><li class=\"a\"><span class=\"nome\">Recursos de glosa<\/span><span class=\"trilho\"><i style=\"--w:1.17%\"><\/i><\/span><span class=\"val\">R$ 116.495<\/span><b>1,17%<\/b><\/li><li class=\"a\"><span class=\"nome\">Perdas<\/span><span class=\"trilho\"><i style=\"--w:0.6%\"><\/i><\/span><span class=\"val\">R$ 38.328<\/span><b>0,38%<\/b><\/li><li class=\"r\"><span class=\"nome\">Glosa definitiva<\/span><span class=\"trilho\"><i style=\"--w:0.6%\"><\/i><\/span><span class=\"val\">R$ 21.616<\/span><b>0,22%<\/b><\/li><\/ul><p class=\"rod\">Cada real passa por checagem, pendência, conciliação de guias e conciliação com o financeiro antes de virar perda. O que sobra como glosa definitiva é 0,22%.<\/p><\/div><div class=\"i5-coluna2\"><div class=\"i5-painel ret\" data-surge><div class=\"pt\"><strong>Retenções no 1º trimestre<\/strong><span>Clínica de R$ 18,1 mi<\/span><\/div><div class=\"leg\"><span class=\"p\">Perdidos<\/span><span class=\"r\">Recuperáveis<\/span><span class=\"ok\">Recuperados<\/span><\/div><div class=\"grupos\"><div class=\"g\"><div class=\"cols3\"><span class=\"p\" style=\"--h:100.0%\"><b>402<\/b><\/span><span class=\"r\" style=\"--h:63.7%\"><b>256<\/b><\/span><span class=\"ok\" style=\"--h:25.9%\"><b>104<\/b><\/span><\/div><p><strong>40,8%<\/strong> Ressonância<\/p><\/div><div class=\"g\"><div class=\"cols3\"><span class=\"p\" style=\"--h:72.6%\"><b>292<\/b><\/span><span class=\"r\" style=\"--h:32.8%\"><b>132<\/b><\/span><span class=\"ok\" style=\"--h:13.2%\"><b>53<\/b><\/span><\/div><p><strong>39,7%<\/strong> Tomografia<\/p><\/div><\/div><p class=\"rod\">Antes, o exame perdido simplesmente sumia. Com a célula de retenção, 4 em cada 10 ressonâncias e tomografias recuperáveis voltam para a agenda.<\/p><\/div><div class=\"i5-duplo\" data-surge><div class=\"i5-painel ad\"><p class=\"tt\">Mat/med cobrado sobre o valor do exame<\/p><div class=\"pares\"><div><span class=\"ant\" style=\"--h:77.7\"><\/span><b>6,42%<\/b><small>Antes<\/small><\/div><div><span class=\"com\" style=\"--h:100.0\"><\/span><b>8,26%<\/b><small>Com I-RIS<\/small><\/div><\/div><\/div><div class=\"i5-painel ad\"><p class=\"tt\">Abandono de chamadas no call center<\/p><div class=\"pares\"><div><span class=\"ant\" style=\"--h:100.0\"><\/span><b>21,89%<\/b><small>Antes<\/small><\/div><div><span class=\"com\" style=\"--h:45.6\"><\/span><b>9,99%<\/b><small>Com I-RIS<\/small><\/div><\/div><\/div><\/div><\/div><\/div><\/div><\/section><section class=\"i5-bloco\"><div class=\"i5-faixa\"><div class=\"i5-cab2\" data-surge><h2 class=\"i5-h2\">Cada oportunidade, uma resposta.<\/h2><\/div><div class=\"i5-ad\" data-surge><div class=\"cabs\"><span><\/span><span>Hoje<\/span><span>Com I-RIS<\/span><\/div><div class=\"lin\"><strong>Agenda<\/strong><p class=\"hoje\">Regras na cabeça do atendente, horário nobre ocupado por quem paga menos.<\/p><p class=\"com\">Regras 100% automatizadas e filtro por operadora: o melhor slot vai para o melhor pagador.<\/p><\/div><div class=\"lin\"><strong>Paciente perdido<\/strong><p class=\"hoje\">No-show e cancelamento viram horário vazio; ninguém tem a lista.<\/p><p class=\"com\">Célula de retenção com fila automática por rentabilidade e indicador de recuperados.<\/p><\/div><div class=\"lin\"><strong>Sala de exame<\/strong><p class=\"hoje\">Contraste e material cobrados quando alguém lembra de lançar.<\/p><p class=\"com\">Operador marca sim ou não; o sistema cobra pela regra de cada operadora.<\/p><\/div><div class=\"lin\"><strong>Faturamento​<\/strong><p class=\"hoje\">Glosa descoberta no demonstrativo, semanas depois.<\/p><p class=\"com\">Checagem 1 e 2 antes do envio, pendências com dono e conciliação de guias por XML.<\/p><\/div><div class=\"lin\"><strong>Financeiro<\/strong><p class=\"hoje\">Caixa, banco e faturamento em planilhas que não batem.<\/p><p class=\"com\">Tesouraria, malotes, OFX e DRE com EBITDA caixa dentro do sistema.<\/p><\/div><div class=\"lin\"><strong>Controle<\/strong><p class=\"hoje\">Valores ajustados sem registro; quando a conta não fecha, ninguém sabe onde.<\/p><p class=\"com\">Cada real com rastreabilidade, do caixa da recepção ao extrato. Nada muda sem registro.<\/p><\/div><div class=\"lin\"><strong>Gestão<\/strong><p class=\"hoje\">O sócio descobre o problema no fechamento do mês.<\/p><p class=\"com\">O Copilot avisa na semana, com causa, recomendação e valor em reais.<\/p><\/div><\/div><ul class=\"i5-ganhos\" data-surge><li><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12.5l4.5 4.5L19 7.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><\/svg>Mais exames na mesma estrutura<\/li><li><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12.5l4.5 4.5L19 7.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><\/svg>Preço médio maior<\/li><li><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12.5l4.5 4.5L19 7.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><\/svg>Glosa abaixo de 0,5%<\/li><li><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12.5l4.5 4.5L19 7.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><\/svg>Receita previsível<\/li><li><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12.5l4.5 4.5L19 7.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><\/svg>Margem visível todo dia<\/li><\/ul><\/div><\/section><section class=\"i5-bloco i5-gelo\"><div class=\"i5-faixa\"><div class=\"i5-cab2\" data-surge><h2 class=\"i5-h2\">Rápida, em nuvem, sem parar a clínica.<\/h2><p class=\"i5-lead\">O I-RIS foi desenhado para entrar em operação em semanas, não em meses: sem servidor local, com a migração mais automatizada possível, treinamento dentro do próprio sistema e o Copilot para tirar dúvidas da equipe.<\/p><\/div><ol class=\"i5-linha\" data-surge><li><span class=\"q\">1<\/span><h3 class=\"i5-h3\">Plano de projeto<\/h3><p>Levantamento de aderências, regras de agendamento e negociações por operadora. Ambiente em nuvem pronto na semana da assinatura.<\/p><\/li><li><span class=\"q\">2<\/span><h3 class=\"i5-h3\">Migração automatizada<\/h3><p>Procedimentos, tabelas, negociações, médicos e histórico carregados a partir dos principais RIS do mercado.<\/p><\/li><li><span class=\"q\">3<\/span><h3 class=\"i5-h3\">Go-live assistido<\/h3><p>Equipe treinada por perfil, com trilhas dentro do sistema e acompanhamento do primeiro ciclo de faturamento.<\/p><\/li><li><span class=\"q\">4<\/span><h3 class=\"i5-h3\">Copilot ativo<\/h3><p>Indicadores com meta, alertas semanais por e-mail e revisão de resultados com o time I-RIS.<\/p><\/li><\/ol><\/div><\/section><section class=\"i5-bloco\"><div class=\"i5-faixa\"><div class=\"i5-cab2\" data-surge><h2 class=\"i5-h2\">Feito para toda a radiologia e diagnóstico por imagem.<\/h2><\/div><div class=\"i5-pq\"><article data-surge><svg class=\"ic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 20V8l8-4 8 4v12M9 20v-6h6v6M12 8v4M10 10h4\"/><\/g><\/svg><h3 class=\"i5-h3\">Clínicas de imagem<\/h3><p>De qualquer porte e modalidade: RX, US, mamografia, densitometria, TC e RM, em uma ou mais unidades. Agenda cheia, faturamento complexo e margem que precisa aparecer.<\/p><\/article><article data-surge><svg class=\"ic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 5v4M5 19v-3h14v3M12 9v7\"/><circle cx=\"12\" cy=\"4\" r=\"2\"/><circle cx=\"5\" cy=\"20\" r=\"2\"/><circle cx=\"12\" cy=\"20\" r=\"2\"/><circle cx=\"19\" cy=\"20\" r=\"2\"/><\/g><\/svg><h3 class=\"i5-h3\">Redes e grupos multimarca<\/h3><p>Várias empresas, marcas e cidades numa única base, com gestão independente por unidade e visão consolidada para os sócios.<\/p><\/article><article data-surge><svg class=\"ic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 21h18M5 21V5h14v16M12 8v6M9 11h6\"/><\/g><\/svg><h3 class=\"i5-h3\">Medicina nuclear e hospitais<\/h3><p>Fluxos de PET/CT e cintilografia, integração com HIS e ERP por HL7, e pedidos internos, externos e de urgência na mesma fila.<\/p><\/article><\/div><div class=\"i5-difs\" data-surge><div><h3 class=\"i5-h3\">Implantação rápida<\/h3><p>Em nuvem, sem servidor na clínica. Migração automatizada a partir dos principais sistemas do mercado.<\/p><\/div><div><h3 class=\"i5-h3\">Totalmente flexível<\/h3><p>Multiempresa, multimarca e multiunidade na mesma base, com gestão independente em todos os módulos.<\/p><\/div><div><h3 class=\"i5-h3\">Automação que libera a equipe<\/h3><p>Fluxos automatizados de ponta a ponta: menos digitação, mais tempo para o paciente e dado confiável para o Copilot.<\/p><\/div><\/div><\/div><\/section><section class=\"i5-bloco i5-noite i5-fim\"><div class=\"i5-brilho\" aria-hidden=\"true\"><\/div><div class=\"i5-faixa\"><h2 class=\"i5-h2\" data-surge>Perguntas que valem uma conversa.<\/h2><ol class=\"i5-ref\"><li data-surge><span>01<\/span><p>Quanto da sua receita virou glosa definitiva nos últimos 12 meses, e em qual operadora?<\/p><\/li><li data-surge><span>02<\/span><p>Quantas ressonâncias agendadas não aconteceram no mês passado, e quantas alguém tentou recuperar?<\/p><\/li><li data-surge><span>03<\/span><p>Qual operadora ocupa os seus melhores horários, e qual paga o melhor preço médio por exame?<\/p><\/li><li data-surge><span>04<\/span><p>Quanto de contraste e material você usou e não cobrou?<\/p><\/li><li data-surge><span>05<\/span><p>Quem avisa o sócio quando um desses números sai do lugar, antes do fechamento do mês?<\/p><\/li><\/ol><div class=\"i5-cta\" data-surge><img class=\"logo\" src=\"./assets/iris-principal-negativa.svg\" alt=\"I-RIS Business OS\" width=\"220\" height=\"42\"><h2 class=\"i5-h2\">Veja o I-RIS funcionando na sua operação.<\/h2><p class=\"i5-lead\">Na demonstração, percorremos a jornada do dinheiro da sua clínica dentro do sistema, com os fluxos, as operadoras e as modalidades da sua operação. Em uma hora, você sabe exatamente o que muda no seu resultado.<\/p><a class=\"i5-botao claro\" href=\"#/contato\">Agendar demonstração<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12h14M13 6l6 6-6 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><\/svg><\/a><\/div><\/div><\/section><\/div>";
export function iniciarIris(raiz) {
  if (!raiz) return function () {};
  var limpar = [];
  var vivo = true;
  var reduz = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------------- revelação das seções
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      el.setAttribute('data-visto', 'true');
      io.unobserve(el);
      el.querySelectorAll('[data-conta]').forEach(contar);
      if (el.hasAttribute('data-conta')) contar(el);
      if (el.classList.contains('i5-cop__vivo')) {
        var ch = el.querySelector('.i5-chat');
        var t = setTimeout(function () { ch && ch.setAttribute('data-pronto', 'true'); }, reduz ? 0 : 2200);
        limpar.push(function () { clearTimeout(t); });
      }
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -6% 0px' });
  raiz.querySelectorAll('[data-surge]').forEach(function (el) { io.observe(el); });
  limpar.push(function () { io.disconnect(); });

  function contar(el) {
    if (el.__contado) return; el.__contado = true;
    var alvo = el.textContent.trim();
    var m = /^(\D*)(\d+)(.*)$/.exec(alvo);
    if (!m || reduz) return;
    var fim = parseInt(m[2], 10), t0 = performance.now(), dur = 1400;
    (function passo(t) {
      if (!vivo) return;
      var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = k < 1 ? m[1] + Math.round(fim * e) + m[3] : alvo;
      if (k < 1) requestAnimationFrame(passo);
    })(t0);
  }

  // ---------------- cena
  var cena = raiz.querySelector('[data-cena]');
  if (!cena) return function () { vivo = false; limpar.forEach(function (f) { f(); }); };
  var palco = cena.querySelector('.i5-palco');
  var trilha = cena.querySelector('.i5-trilha');
  var etapas = [].slice.call(cena.querySelectorAll('.i5-etapa'));
  var vaz = [].slice.call(cena.querySelectorAll('.i5-vaz'));
  var cartoes = [].slice.call(cena.querySelectorAll('.i5-cartao'));
  var cop = cena.querySelector('.i5-copilot');
  var alertas = [].slice.call(cop.querySelectorAll('li'));
  var dica = cena.querySelector('.i5-dica');
  var med = cena.querySelector('.i5-medidor');
  var medRot = [].slice.call(med.querySelectorAll('.rot p'));
  var barra = cena.querySelector('.i5-prog i');
  var cv = cena.querySelector('.i5-canvas');
  var cx = cv.getContext('2d');

  // fases: [início, fim)
  var F = [0, 0.1, 0.4, 0.5, 0.75, 0.9, 1.01];
  var VAZ_T = [0.13, 0.17, 0.21, 0.25, 0.29, 0.33]; // ordem dos cartões de vazamento
  var OK_T = [0.53, 0.565, 0.6, 0.635, 0.67, 0.705];
  var AL_T = [0.77, 0.81, 0.85];

  var geo = { cxs: [], y: 0, x0: 0, x1: 0, base: [], dpr: 1, w: 0, h: 0, movel: false };
  function medir() {
    var pr = palco.getBoundingClientRect();
    geo.dpr = Math.min(2, window.devicePixelRatio || 1);
    geo.w = pr.width; geo.h = pr.height;
    cv.width = Math.round(pr.width * geo.dpr); cv.height = Math.round(pr.height * geo.dpr);
    geo.movel = window.innerWidth <= 960;
    var tr = trilha.getBoundingClientRect();
    geo.y = tr.bottom - pr.top + 30;
    geo.x0 = tr.left - pr.left; geo.x1 = tr.right - pr.left;
    geo.cxs = []; geo.base = [];
    etapas.forEach(function (e) {
      var r = e.getBoundingClientRect();
      geo.cxs.push(r.left - pr.left + r.width / 2);
      geo.base.push(r.bottom - pr.top);
      e.__w = r.width; e.__x = r.left - pr.left;
    });
    // posiciona cartões de vazamento abaixo da coluna da etapa
    var pilha = {};
    vaz.forEach(function (v) {
      var i = +v.getAttribute('data-etapa'), e = etapas[i];
      v.style.setProperty('--w', e.__w + 'px');
      v.style.left = e.__x + 'px';
      var n = pilha[i] || 0;
      v.style.top = (geo.y + 30 + n) + 'px';
      pilha[i] = n + v.offsetHeight + 10;
    });
  }

  var p = 0;
  function progresso() {
    var r = cena.getBoundingClientRect();
    var total = r.height - window.innerHeight;
    p = Math.max(0, Math.min(1, -r.top / (total || 1)));
    return p;
  }

  var okAte = -1, forte = false;
  function aplicar() {
    progresso();
    barra.style.transform = 'scaleX(' + p.toFixed(4) + ')';
    dica.setAttribute('data-off', p > 0.04 ? 'true' : 'false');
    var f = 0; for (var i = 0; i < F.length - 1; i++) if (p >= F[i] && p < F[i + 1]) f = i;
    cartoes.forEach(function (c, i) { c.setAttribute('data-on', i === f ? 'true' : 'false'); });
    okAte = -1;
    etapas.forEach(function (e, i) {
      var ok = p >= OK_T[i];
      if (ok) okAte = i;
      e.setAttribute('data-ok', ok ? 'true' : 'false');
    });
    forte = f === 2;
    var vazEtapa = {};
    vaz.forEach(function (v, k) {
      var et = +v.getAttribute('data-etapa');
      var on = p >= VAZ_T[k];
      var fim = p >= OK_T[et];
      v.setAttribute('data-on', on ? 'true' : 'false');
      v.setAttribute('data-fim', fim ? 'true' : 'false');
      v.setAttribute('data-forte', forte ? 'true' : 'false');
      if (on && !fim) vazEtapa[et] = true;
    });
    etapas.forEach(function (e, i) { e.setAttribute('data-vaz', vazEtapa[i] ? 'true' : 'false'); });
    geo.vaz = vazEtapa;
    cop.setAttribute('data-on', p >= 0.75 && p < 0.9 ? 'true' : 'false');
    var nVaz = 0; vaz.forEach(function (v, k) { if (p >= VAZ_T[k]) nVaz++; });
    var b = 100 - nVaz * (10 / 6);
    if (okAte >= 0) b = 90 + (okAte + 1) * (9.6 / 6);
    med.style.setProperty('--b', b.toFixed(2) + '%');
    med.setAttribute('data-on', (f >= 1 && f <= 3) || f === 5 ? 'true' : 'false');
    med.setAttribute('data-ok', okAte >= 0 ? 'true' : 'false');
    var r = f === 1 ? 0 : f === 2 ? 1 : f === 3 ? 2 : f === 5 ? 3 : -1;
    medRot.forEach(function (el, i) { el.setAttribute('data-on', i === r ? 'true' : 'false'); });
    alertas.forEach(function (a, i) { a.setAttribute('data-on', p >= AL_T[i] ? 'true' : 'false'); });
  }

  // ---------------- moedas
  var moedas = [], ultimo = 0, acum = 0, pulso = 0;
  function quadro(t) {
    if (!vivo) return;
    raf = requestAnimationFrame(quadro);
    var r = cena.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight || geo.movel) { ultimo = t; return; }
    var dt = Math.min(0.05, ((t - ultimo) || 16) / 1000); ultimo = t;
    var esc = Math.max(0.7, geo.w / 1440);
    var vel = 150 * esc;
    acum += dt;
    var intervalo = reduz ? 0.6 : 0.11;
    while (acum > intervalo) { acum -= intervalo; moedas.push({ x: geo.x0 - 6, y: geo.y + (Math.random() * 6 - 3), vy: 0, cai: false, ok: false, a: 1, vis: -1 }); }

    cx.setTransform(geo.dpr, 0, 0, geo.dpr, 0, 0);
    cx.clearRect(0, 0, geo.w, geo.h);
    // trilho
    cx.lineCap = 'round';
    cx.strokeStyle = 'rgba(24,33,69,.16)'; cx.lineWidth = 2;
    cx.beginPath(); cx.moveTo(geo.x0, geo.y); cx.lineTo(geo.x1, geo.y); cx.stroke();
    for (var i = 0; i < geo.cxs.length; i++) {
      var vz = geo.vaz && geo.vaz[i];
      var ok = i <= okAte;
      cx.strokeStyle = ok ? 'rgba(31,75,165,.7)' : (vz ? 'rgba(226,131,47,.6)' : 'rgba(24,33,69,.18)');
      cx.lineWidth = ok ? 2 : 1.5;
      cx.beginPath(); cx.moveTo(geo.cxs[i], geo.base[i] + 2); cx.lineTo(geo.cxs[i], geo.y - 4); cx.stroke();
      cx.fillStyle = ok ? '#1f4ba5' : (vz ? '#e2832f' : '#b9bdcc');
      cx.beginPath(); cx.arc(geo.cxs[i], geo.y, ok ? 4.5 : 3.5, 0, 6.283); cx.fill();
    }
    if (okAte >= 0) {
      var xa = geo.cxs[okAte];
      var g = cx.createLinearGradient(geo.x0, 0, xa, 0);
      g.addColorStop(0, 'rgba(38,185,218,.9)'); g.addColorStop(1, 'rgba(31,75,165,.95)');
      cx.save(); cx.shadowColor = 'rgba(38,185,218,.55)'; cx.shadowBlur = 12;
      cx.strokeStyle = g; cx.lineWidth = 3;
      cx.beginPath(); cx.moveTo(geo.x0, geo.y); cx.lineTo(xa, geo.y); cx.stroke(); cx.restore();
    }
    // moedas
    var pl = forte ? 0.34 : 0.22;
    for (var k = moedas.length - 1; k >= 0; k--) {
      var m = moedas[k];
      if (m.cai) {
        m.vy += 520 * dt; m.y += m.vy * dt; m.x += vel * 0.18 * dt; m.a -= dt * 2.4;
        if (m.a <= 0) { moedas.splice(k, 1); continue; }
      } else {
        var xAnt = m.x;
        m.x += vel * dt;
        for (var s = 0; s < geo.cxs.length; s++) {
          var c = geo.cxs[s];
          if (xAnt < c && m.x >= c) {
            if (s === geo.cxs.length - 1) { moedas.splice(k, 1); pulso = 1; m = null; break; }
            if (s <= okAte) m.ok = true;
            else if (geo.vaz && geo.vaz[s] && Math.random() < pl) { m.cai = true; m.vy = 30; }
          }
        }
        if (!m) continue;
        if (m.x > geo.x1 + 10) { moedas.splice(k, 1); continue; }
      }
      cx.globalAlpha = Math.max(0, m.a);
      if (m.ok) { cx.save(); cx.shadowColor = 'rgba(38,185,218,.8)'; cx.shadowBlur = 8; cx.fillStyle = '#1f4ba5'; cx.beginPath(); cx.arc(m.x, m.y, 4.6, 0, 6.283); cx.fill(); cx.restore(); }
      else { cx.fillStyle = m.cai ? '#e2832f' : '#182145'; cx.beginPath(); cx.arc(m.x, m.y, 4.2, 0, 6.283); cx.fill(); }
      cx.globalAlpha = 1;
    }
    // banco recebe
    if (pulso > 0) {
      pulso = Math.max(0, pulso - dt * 3);
      var b = etapas[etapas.length - 1];
      b.setAttribute('data-pulso', pulso > 0.5 ? 'true' : 'false');
    }
  }

  var raf = requestAnimationFrame(function (t) { ultimo = t; quadro(t); });
  limpar.push(function () { cancelAnimationFrame(raf); });

  var aoRolar = function () { aplicar(); };
  var aoRedim = function () { medir(); aplicar(); };
  window.addEventListener('scroll', aoRolar, { passive: true });
  window.addEventListener('resize', aoRedim);
  window.addEventListener('iosei-lang', aoRedim);
  limpar.push(function () {
    window.removeEventListener('scroll', aoRolar);
    window.removeEventListener('resize', aoRedim);
    window.removeEventListener('iosei-lang', aoRedim);
  });
  medir(); aplicar();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (vivo) { medir(); aplicar(); } });
  var t2 = setTimeout(aoRedim, 400); limpar.push(function () { clearTimeout(t2); });

  return function () { vivo = false; limpar.forEach(function (f) { f(); }); };
};

