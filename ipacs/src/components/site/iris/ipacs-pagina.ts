// @ts-nocheck
// Página I-PACS: HTML e comportamento. Reaproveita o motor da página I-RIS.
import { iniciarIris } from "./iris-pagina";
export const IPACS_HTML = "<div class=\"iris ipacs\" lang=\"pt-BR\"><section class=\"i5-cena p5-cena\" data-cena-pacs><div class=\"i5-palco\"><div class=\"i5-pontos\" aria-hidden=\"true\"><\/div><canvas class=\"i5-canvas\" aria-hidden=\"true\"><\/canvas><div class=\"p5-mods\"><div class=\"p5-no p5-mod\"><span class=\"sig\">RM<\/span><strong>Ressonância<\/strong><\/div><div class=\"p5-no p5-mod\"><span class=\"sig\">TC<\/span><strong>Tomografia<\/strong><\/div><div class=\"p5-no p5-mod\"><span class=\"sig\">RX<\/span><strong>Raio X<\/strong><\/div><div class=\"p5-no p5-mod\"><span class=\"sig\">US<\/span><strong>Ultrassom<\/strong><\/div><\/div><div class=\"p5-hub\"><div class=\"serv\"><div class=\"rack\"><i><\/i><i><\/i><i><\/i><\/div><strong>Servidor local<\/strong><div class=\"disco\"><span>Disco<\/span><b><i><\/i><\/b><\/div><\/div><div class=\"nuvem\"><svg viewBox=\"0 0 220 140\" aria-hidden=\"true\"><path d=\"M58 122a44 44 0 0 1-6-87.6A56 56 0 0 1 160 30a44 44 0 0 1 4 92z\"/><\/svg><img src=\"./assets/ipacs-principal-negativa.svg\" alt=\"I-PACS Imaging Cloud\" width=\"150\" height=\"23\"><\/div><\/div><div class=\"p5-dests\"><div class=\"p5-no p5-dest\" data-i=\"0\"><svg class=\"dic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 11l9-7 9 7M5 10v10h14V10M10 20v-5h4v5\"/><\/g><\/svg><div><strong>Radiologista<\/strong><small>em casa ou em outra cidade<\/small><em class=\"nao\">Sem acesso<\/em><em class=\"sim\">Laudo de qualquer lugar<\/em><\/div><\/div><div class=\"p5-no p5-dest\" data-i=\"1\"><svg class=\"dic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"7\" r=\"4\"/><path d=\"M4 21c0-4 4-6 8-6s8 2 8 6\"/><\/g><\/svg><div><strong>Médico solicitante<\/strong><small>no consultório<\/small><em class=\"nao\">Sem acesso<\/em><em class=\"sim\">Estudo por link seguro<\/em><\/div><\/div><div class=\"p5-no p5-dest\" data-i=\"2\"><svg class=\"dic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"7\" y=\"2\" width=\"10\" height=\"20\" rx=\"2\"/><path d=\"M11 18h2\"/><\/g><\/svg><div><strong>Paciente<\/strong><small>no celular<\/small><em class=\"nao\">Sem acesso<\/em><em class=\"sim\">Imagens sem CD<\/em><\/div><\/div><div class=\"p5-no p5-dest\" data-i=\"3\"><svg class=\"dic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 21h18M6 21V8l6-4 6 4v13M10 12h4M10 16h4\"/><\/g><\/svg><div><strong>Outra unidade<\/strong><small>da mesma rede<\/small><em class=\"nao\">Sem acesso<\/em><em class=\"sim\">O mesmo histórico<\/em><\/div><\/div><\/div><div class=\"p5-pares\"><div class=\"p5-par\" data-k=\"0\"><div class=\"prob\"><strong>Servidor local no limite<\/strong><p>Hardware que envelhece, disco que enche e manutenção que ninguém planejou.<\/p><\/div><div class=\"resp\"><strong>Arquivo em nuvem<\/strong><p>Arquivo gerenciado, sem hardware na clínica.<\/p><\/div><\/div><div class=\"p5-par\" data-k=\"1\"><div class=\"prob\"><strong>Volume que só cresce<\/strong><p>Cada nova RM e TC gera mais dados. Ampliar vira projeto de TI.<\/p><\/div><div class=\"resp\"><strong>Capacidade que acompanha<\/strong><p>Armazenamento que cresce com o volume de exames.<\/p><\/div><\/div><div class=\"p5-par\" data-k=\"2\"><div class=\"prob\"><strong>Risco de perder o acesso<\/strong><p>Falha de disco, ataque ou queda de energia deixam a operação sem os exames.<\/p><\/div><div class=\"resp\"><strong>Backup e continuidade<\/strong><p>Cópias redundantes e recuperação planejada.<\/p><\/div><\/div><div class=\"p5-par\" data-k=\"3\"><div class=\"prob\"><strong>Laudo preso à estação<\/strong><p>O radiologista precisa estar na clínica, ou depende de conexões lentas.<\/p><\/div><div class=\"resp\"><strong>Laudo de qualquer lugar<\/strong><p>Laudo remoto no navegador, com a mesma imagem.<\/p><\/div><\/div><div class=\"p5-par\" data-k=\"4\"><div class=\"prob\"><strong>Compartilhamento em CD<\/strong><p>Médico solicitante e paciente recebem mídia física, com custo e atraso.<\/p><\/div><div class=\"resp\"><strong>Link seguro<\/strong><p>O estudo chega ao médico e ao paciente por link.<\/p><\/div><\/div><div class=\"p5-par\" data-k=\"5\"><div class=\"prob\"><strong>Unidades isoladas<\/strong><p>Cada unidade com seu próprio arquivo e o histórico espalhado.<\/p><\/div><div class=\"resp\"><strong>Um só arquivo<\/strong><p>O histórico completo do paciente, em todas as unidades.<\/p><\/div><\/div><\/div><div class=\"p5-visor cena-visor\"><div class=\"barra\"><img src=\"./assets/ipacs-principal-negativa.svg\" alt=\"\" width=\"96\" height=\"15\"><span>Visualizador web<\/span><div class=\"ferr\" aria-hidden=\"true\"><i><\/i><i class=\"on\"><\/i><i><\/i><i><\/i><\/div><\/div><div class=\"corpo\"><div class=\"hist\"><p class=\"ht\">Histórico do paciente<\/p><div class=\"ex\" data-ex=\"0\" data-on=\"true\"><strong>RM Crânio<\/strong><small>Hoje<\/small><\/div><div class=\"ex\" data-ex=\"1\" data-on=\"false\"><strong>TC Tórax<\/strong><small>Outra unidade<\/small><\/div><div class=\"ex\" data-ex=\"2\" data-on=\"false\"><strong>TC Abdome<\/strong><small>Arquivo<\/small><\/div><p class=\"lk\"><svg class=\"lic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1\"/><path d=\"M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1\"/><\/g><\/svg>Compartilhar por link<\/p><\/div><div class=\"grade\"><figure><img src=\"./assets/case-braint1-after-OJMBRYR7.jpg\" alt=\"\" loading=\"lazy\"><figcaption><b>Sag T1<\/b><\/figcaption><\/figure><figure><img src=\"./assets/case-braint1-before-5EM4HTCK.jpg\" alt=\"\" loading=\"lazy\"><figcaption><b>Sag T1<\/b> <span>anterior<\/span><\/figcaption><\/figure><figure><img src=\"./assets/case-brainmra-after-U27AN4HR.jpg\" alt=\"\" loading=\"lazy\"><figcaption><b>Angio RM<\/b><\/figcaption><\/figure><figure><img src=\"./assets/case-brainmra-before-ZE2V4MFE.jpg\" alt=\"\" loading=\"lazy\"><figcaption><b>Angio RM<\/b> <span>anterior<\/span><\/figcaption><\/figure><\/div><\/div><\/div><div class=\"i5-cartoes\"><div class=\"i5-cartao\" data-f=\"0\"><img class=\"logo\" src=\"./assets/ipacs-principal-cor.svg\" alt=\"I-PACS Imaging Cloud\" width=\"300\" height=\"45\"><h1 class=\"i5-h1\">Suas imagens, seguras e acessíveis <span class=\"ac\">de qualquer lugar.<\/span><\/h1><p>O I-PACS é um Imaging Cloud: recebe as imagens direto das modalidades, guarda com segurança na nuvem e entrega cada estudo a quem precisa.<\/p><\/div><div class=\"i5-cartao\" data-f=\"1\"><h2 class=\"i5-h2c\">Quando as imagens ficam presas, a radiologia inteira desacelera.<\/h2><p>O exame foi feito em minutos. Mas guardar, encontrar, laudar e compartilhar essas imagens ainda depende de um servidor na sala dos fundos e de CDs.<\/p><\/div><div class=\"i5-cartao\" data-f=\"2\"><h2 class=\"i5-h2c\">Onde estão as imagens da sua operação agora, e quem consegue acessá-las?<\/h2><p>Se o servidor parar, a equipe fica sem os exames. Se o radiologista não estiver na clínica, o laudo espera.<\/p><\/div><div class=\"i5-cartao\" data-f=\"3\"><h2 class=\"i5-h2c\">Seu arquivo de imagens, na nuvem e sem fronteiras.<\/h2><p>Do equipamento à tela de quem precisa: o radiologista, o médico solicitante ou o próprio paciente.<\/p><\/div><div class=\"i5-cartao\" data-f=\"4\"><h2 class=\"i5-h2c\">Toda a imagem, em qualquer tela.<\/h2><p>O estudo abre no navegador, sem instalar programa, com o histórico do paciente ao lado para comparar.<\/p><\/div><div class=\"i5-cartao\" data-f=\"5\"><h2 class=\"i5-h2c\">Suas imagens, sem fronteiras.<\/h2><p>Veja o I-PACS funcionando na sua operação e descubra como levar as suas imagens para a nuvem.<\/p><a class=\"i5-botao\" href=\"#/contato\">Solicitar demonstração<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12h14M13 6l6 6-6 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><\/svg><\/a><\/div><\/div><a class=\"i5-dica\" href=\"#p5-solucao\"><span>Role para baixo e acompanhe a jornada da imagem<\/span><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12 5v14M6 13l6 6 6-6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/><\/svg><\/a><div class=\"i5-prog\" aria-hidden=\"true\"><i><\/i><\/div><\/div><\/section><section class=\"i5-bloco\" id=\"p5-solucao\"><div class=\"i5-faixa\"><div class=\"i5-cab2\" data-surge><h2 class=\"i5-h2\">Seu arquivo de imagens, na nuvem e sem fronteiras.<\/h2><p class=\"i5-lead\">O I-PACS recebe as imagens direto das modalidades, guarda com segurança na nuvem e entrega cada estudo a quem precisa, seja o radiologista, o médico solicitante ou o próprio paciente.<\/p><\/div><ol class=\"p5-gvc\" data-surge><li><span class=\"q\">1<\/span><strong>Guardar<\/strong><p>Direto das modalidades para a nuvem, pelo padrão DICOM.<\/p><\/li><li><span class=\"q\">2<\/span><strong>Ver<\/strong><p>No navegador, de qualquer lugar, com o histórico ao lado.<\/p><\/li><li><span class=\"q\">3<\/span><strong>Compartilhar<\/strong><p>Um link seguro para quem precisa, no lugar do CD.<\/p><\/li><\/ol><div class=\"i5-modulos p5-recursos\"><article data-surge><svg class=\"ic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 19 10a4 4 0 0 1-1 8z\"/><\/g><\/svg><h3 class=\"i5-h3\">Arquivo em nuvem<\/h3><p>Armazenamento que cresce com a operação, sem comprar servidor nem trocar disco.<\/p><\/article><article data-surge><svg class=\"ic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"12\" rx=\"2\"/><path d=\"M8 20h8M12 16v4\"/><\/g><\/svg><h3 class=\"i5-h3\">Visualizador web<\/h3><p>Estudos de RM, TC, RX e US abertos no navegador, com ferramentas para laudo.<\/p><\/article><article data-surge><svg class=\"ic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18\"/><\/g><\/svg><h3 class=\"i5-h3\">Laudo de qualquer lugar<\/h3><p>Radiologistas acessam a fila de onde estiverem, com a mesma imagem da clínica.<\/p><\/article><article data-surge><svg class=\"ic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1\"/><path d=\"M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1\"/><\/g><\/svg><h3 class=\"i5-h3\">Compartilhamento seguro<\/h3><p>Médico solicitante e paciente recebem um link, no lugar do CD.<\/p><\/article><article data-surge><svg class=\"ic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 12a8 8 0 0 1 14-5.3L20 9\"/><path d=\"M20 4v5h-5\"/><path d=\"M20 12a8 8 0 0 1-14 5.3L4 15\"/><path d=\"M4 20v-5h5\"/><\/g><\/svg><h3 class=\"i5-h3\">Backup e continuidade<\/h3><p>Cópias redundantes e recuperação planejada para a operação não parar.<\/p><\/article><article data-surge><svg class=\"ic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"5\" y=\"11\" width=\"14\" height=\"10\" rx=\"2\"/><path d=\"M8 11V7a4 4 0 0 1 8 0v4\"/><\/g><\/svg><h3 class=\"i5-h3\">Segurança e proteção de dados<\/h3><p>Criptografia, acesso por perfil e registro de quem abriu cada exame, alinhados à legislação de proteção de dados aplicável.<\/p><\/article><\/div><\/div><\/section><section class=\"i5-bloco i5-noite p5-noite\" id=\"p5-visualizador\"><div class=\"i5-brilho\" aria-hidden=\"true\"><\/div><div class=\"i5-faixa\"><div class=\"i5-cab2\" data-surge><img class=\"logo p5-logo-n\" src=\"./assets/ipacs-principal-negativa.svg\" alt=\"I-PACS Imaging Cloud\" width=\"220\" height=\"34\"><h2 class=\"i5-h2\">Toda a imagem, em qualquer tela.<\/h2><p class=\"i5-lead\">O estudo abre no navegador, sem instalar programa. Radiologista, médico solicitante e equipe veem a mesma imagem, com o histórico do paciente ao lado para comparar.<\/p><\/div><div class=\"p5-visor-wrap\" data-surge><div class=\"p5-visor sec-visor\"><div class=\"barra\"><img src=\"./assets/ipacs-principal-negativa.svg\" alt=\"\" width=\"96\" height=\"15\"><span>Visualizador web<\/span><div class=\"ferr\" aria-hidden=\"true\"><i><\/i><i class=\"on\"><\/i><i><\/i><i><\/i><\/div><\/div><div class=\"corpo\"><div class=\"hist\"><p class=\"ht\">Histórico do paciente<\/p><button type=\"button\" class=\"ex\" data-ex=\"0\" data-on=\"true\"><strong>RM Crânio<\/strong><small>Hoje<\/small><\/button><button type=\"button\" class=\"ex\" data-ex=\"1\" data-on=\"false\"><strong>TC Tórax<\/strong><small>Outra unidade<\/small><\/button><button type=\"button\" class=\"ex\" data-ex=\"2\" data-on=\"false\"><strong>TC Abdome<\/strong><small>Arquivo<\/small><\/button><p class=\"lk\"><svg class=\"lic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1\"/><path d=\"M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1\"/><\/g><\/svg>Compartilhar por link<\/p><\/div><div class=\"grade\"><figure><img src=\"./assets/case-braint1-after-OJMBRYR7.jpg\" alt=\"\" loading=\"lazy\"><figcaption><b>Sag T1<\/b><\/figcaption><\/figure><figure><img src=\"./assets/case-braint1-before-5EM4HTCK.jpg\" alt=\"\" loading=\"lazy\"><figcaption><b>Sag T1<\/b> <span>anterior<\/span><\/figcaption><\/figure><figure><img src=\"./assets/case-brainmra-after-U27AN4HR.jpg\" alt=\"\" loading=\"lazy\"><figcaption><b>Angio RM<\/b><\/figcaption><\/figure><figure><img src=\"./assets/case-brainmra-before-ZE2V4MFE.jpg\" alt=\"\" loading=\"lazy\"><figcaption><b>Angio RM<\/b> <span>anterior<\/span><\/figcaption><\/figure><\/div><\/div><\/div><p class=\"p5-nota\">Escolha um exame do histórico para abrir no visualizador. Interface e imagens ilustrativas.<\/p><\/div><div class=\"i5-pilares p5-pontos\" data-surge><div><h3 class=\"i5-h3\">Direto no navegador<\/h3><p>Sem instalar programa e sem depender da estação da clínica.<\/p><\/div><div><h3 class=\"i5-h3\">Comparativo lado a lado<\/h3><p>Exame atual e anteriores abertos juntos, mesmo de outra unidade.<\/p><\/div><div><h3 class=\"i5-h3\">Um link, sem CD<\/h3><p>O estudo chega ao médico solicitante e ao paciente com segurança.<\/p><\/div><\/div><\/div><\/section><section class=\"i5-bloco\"><div class=\"i5-faixa\"><div class=\"i5-cab2\" data-surge><h2 class=\"i5-h2\">Da sala do servidor para a nuvem.<\/h2><\/div><div class=\"i5-ad\" data-surge><div class=\"cabs\"><span><\/span><span>Hoje<\/span><span>Com I-PACS<\/span><\/div><div class=\"lin\"><strong>Armazenamento<\/strong><p class=\"hoje\">Servidor local, disco cheio e manutenção de TI.<\/p><p class=\"com\">Arquivo em nuvem gerenciado, sem hardware na clínica.<\/p><\/div><div class=\"lin\"><strong>Laudo<\/strong><p class=\"hoje\">Radiologista preso à estação da clínica.<\/p><p class=\"com\">Laudo remoto no navegador, de qualquer lugar.<\/p><\/div><div class=\"lin\"><strong>Compartilhamento<\/strong><p class=\"hoje\">CD e retirada presencial.<\/p><p class=\"com\">Link seguro para médico solicitante e paciente.<\/p><\/div><div class=\"lin\"><strong>Continuidade<\/strong><p class=\"hoje\">Uma falha e os exames ficam inacessíveis.<\/p><p class=\"com\">Cópias redundantes e recuperação planejada.<\/p><\/div><div class=\"lin\"><strong>Crescimento<\/strong><p class=\"hoje\">Cada expansão vira projeto e investimento.<\/p><p class=\"com\">Capacidade que acompanha o volume de exames.<\/p><\/div><div class=\"lin\"><strong>Multiunidade<\/strong><p class=\"hoje\">Históricos separados em cada unidade.<\/p><p class=\"com\">Um só arquivo, com o histórico completo do paciente.<\/p><\/div><\/div><ul class=\"i5-ganhos\" data-surge><li><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12.5l4.5 4.5L19 7.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><\/svg>Menos mídia física<\/li><li><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12.5l4.5 4.5L19 7.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><\/svg>Laudo sem depender do local<\/li><li><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12.5l4.5 4.5L19 7.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><\/svg>Operação protegida<\/li><li><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12.5l4.5 4.5L19 7.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><\/svg>Histórico sempre à mão<\/li><\/ul><\/div><\/section><section class=\"i5-bloco i5-gelo\"><div class=\"i5-faixa\"><div class=\"i5-cab2\" data-surge><h2 class=\"i5-h2\">A memória do ecossistema.<\/h2><p class=\"i5-lead\">Cada solução do ecossistema gera ou usa imagens. O I-PACS é onde todas elas ficam guardadas e de onde saem para quem precisa, conectado às modalidades pelo padrão DICOM.<\/p><\/div><div class=\"p5-eco\" data-surge><div class=\"mapa\" aria-hidden=\"true\"><svg viewBox=\"0 0 420 420\"><line class=\"fio\" x1=\"210\" y1=\"210\" x2=\"210.0\" y2=\"60.0\" style=\"--d:0\"/><circle class=\"pulso\" r=\"4\" style=\"--d:0\"><animateMotion dur=\"2.6s\" begin=\"0.0s\" repeatCount=\"indefinite\" path=\"M210.0 60.0 L210 210\"/><\/circle><line class=\"fio\" x1=\"210\" y1=\"210\" x2=\"352.7\" y2=\"163.6\" style=\"--d:1\"/><circle class=\"pulso\" r=\"4\" style=\"--d:1\"><animateMotion dur=\"2.6s\" begin=\"0.5s\" repeatCount=\"indefinite\" path=\"M352.7 163.6 L210 210\"/><\/circle><line class=\"fio\" x1=\"210\" y1=\"210\" x2=\"298.2\" y2=\"331.4\" style=\"--d:2\"/><circle class=\"pulso\" r=\"4\" style=\"--d:2\"><animateMotion dur=\"2.6s\" begin=\"1.0s\" repeatCount=\"indefinite\" path=\"M298.2 331.4 L210 210\"/><\/circle><line class=\"fio\" x1=\"210\" y1=\"210\" x2=\"121.8\" y2=\"331.4\" style=\"--d:3\"/><circle class=\"pulso\" r=\"4\" style=\"--d:3\"><animateMotion dur=\"2.6s\" begin=\"1.5s\" repeatCount=\"indefinite\" path=\"M121.8 331.4 L210 210\"/><\/circle><line class=\"fio\" x1=\"210\" y1=\"210\" x2=\"67.3\" y2=\"163.6\" style=\"--d:4\"/><circle class=\"pulso\" r=\"4\" style=\"--d:4\"><animateMotion dur=\"2.6s\" begin=\"2.0s\" repeatCount=\"indefinite\" path=\"M67.3 163.6 L210 210\"/><\/circle><circle class=\"centro\" cx=\"210\" cy=\"210\" r=\"72\"/><circle class=\"sat\" cx=\"210.0\" cy=\"60.0\" r=\"40\"/><text x=\"210.0\" y=\"65.0\">I-RIS<\/text><circle class=\"sat\" cx=\"352.7\" cy=\"163.6\" r=\"40\"/><text x=\"352.7\" y=\"168.6\">SwiftMR<\/text><circle class=\"sat\" cx=\"298.2\" cy=\"331.4\" r=\"40\"/><text x=\"298.2\" y=\"336.4\">ClariPI<\/text><circle class=\"sat\" cx=\"121.8\" cy=\"331.4\" r=\"40\"/><text x=\"121.8\" y=\"336.4\">I-RAD<\/text><circle class=\"sat\" cx=\"67.3\" cy=\"163.6\" r=\"40\"/><text x=\"67.3\" y=\"168.6\">I-PRINT<\/text><\/svg><img src=\"./assets/ipacs-principal-negativa.svg\" alt=\"\" width=\"104\" height=\"16\" class=\"mc\"><\/div><div class=\"lista\"><a class=\"item\" href=\"#/iris\"><strong>I-RIS<\/strong><p>O pedido nasce no I-RIS e chega à modalidade pela worklist. As imagens voltam ao I-PACS já ligadas ao paciente certo.<\/p><span class=\"ir\">Conhecer<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12h14M13 6l6 6-6 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><\/svg><\/span><\/a><a class=\"item\" href=\"#/swiftmr\"><strong>SwiftMR<\/strong><p>As imagens de RM reconstruídas pelo SwiftMR são arquivadas e visualizadas no I-PACS como qualquer estudo.<\/p><span class=\"ir\">Conhecer<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12h14M13 6l6 6-6 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><\/svg><\/span><\/a><a class=\"item\" href=\"#/claripi\"><strong>ClariPI<\/strong><p>Estudos de TC otimizados pelo ClariPI ficam disponíveis no mesmo arquivo e no mesmo visualizador.<\/p><span class=\"ir\">Conhecer<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12h14M13 6l6 6-6 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><\/svg><\/span><\/a><a class=\"item\" href=\"#/irad\"><strong>I-RAD<\/strong><p>Enquanto o I-PACS guarda as imagens, o I-RAD lê os dados DICOM da operação e mostra onde a sala perde tempo.<\/p><span class=\"ir\">Conhecer<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12h14M13 6l6 6-6 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><\/svg><\/span><\/a><a class=\"item\" href=\"#/iprint\"><strong>I-PRINT<\/strong><p>Com a imagem disponível por link, a impressão vira exceção: o I-PRINT imprime só quando o paciente solicita.<\/p><span class=\"ir\">Conhecer<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12h14M13 6l6 6-6 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><\/svg><\/span><\/a><\/div><\/div><\/div><\/section><section class=\"i5-bloco\"><div class=\"i5-faixa\"><div class=\"i5-cab2\" data-surge><h2 class=\"i5-h2\">A jornada da imagem, sem fronteiras.<\/h2><\/div><ol class=\"p5-jornada\" data-surge><li style=\"--d:0\"><span class=\"q\">1<\/span><h3 class=\"i5-h3\">Pedido e worklist<\/h3><p class=\"prods\"><span class=\"\">I-RIS<\/span><\/p><\/li><li style=\"--d:1\"><span class=\"q\">2<\/span><h3 class=\"i5-h3\">Aquisição da imagem<\/h3><p class=\"prods\"><span class=\"\">SwiftMR<\/span><span class=\"\">ClariPI<\/span><\/p><\/li><li style=\"--d:2\"><span class=\"q\">3<\/span><h3 class=\"i5-h3\">Envio automático para a nuvem<\/h3><p class=\"prods\"><span class=\"pacs\">I-PACS<\/span><\/p><\/li><li style=\"--d:3\"><span class=\"q\">4<\/span><h3 class=\"i5-h3\">Laudo no visualizador web<\/h3><p class=\"prods\"><span class=\"pacs\">I-PACS<\/span><span class=\"\">I-RIS<\/span><\/p><\/li><li style=\"--d:4\"><span class=\"q\">5<\/span><h3 class=\"i5-h3\">Link para médico e paciente<\/h3><p class=\"prods\"><span class=\"pacs\">I-PACS<\/span><\/p><\/li><li style=\"--d:5\"><span class=\"q\">6<\/span><h3 class=\"i5-h3\">Impressão só quando pedida<\/h3><p class=\"prods\"><span class=\"\">I-PRINT<\/span><\/p><\/li><li style=\"--d:6\"><span class=\"q\">7<\/span><h3 class=\"i5-h3\">Arquivo e histórico comparativo<\/h3><p class=\"prods\"><span class=\"pacs\">I-PACS<\/span><\/p><\/li><\/ol><p class=\"p5-irad\" data-surge>E o I-RAD acompanha a operação por trás de cada imagem.<\/p><div class=\"i5-cab2 p5-pq-cab\" data-surge><h2 class=\"i5-h2\">Para toda operação que vive de imagem.<\/h2><\/div><div class=\"i5-pq\"><article data-surge><svg class=\"ic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 20V8l8-4 8 4v12M9 20v-6h6v6M12 8v4M10 10h4\"/><\/g><\/svg><h3 class=\"i5-h3\">Clínicas de imagem<\/h3><p>Sem servidor para manter, com laudo remoto para ampliar a equipe médica.<\/p><\/article><article data-surge><svg class=\"ic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 21h18M5 21V5h14v16M12 8v6M9 11h6\"/><\/g><\/svg><h3 class=\"i5-h3\">Hospitais<\/h3><p>Imagens disponíveis para o corpo clínico em qualquer setor, com acesso controlado.<\/p><\/article><article data-surge><svg class=\"ic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 5v4M5 19v-3h14v3M12 9v7\"/><circle cx=\"12\" cy=\"4\" r=\"2\"/><circle cx=\"5\" cy=\"20\" r=\"2\"/><circle cx=\"12\" cy=\"20\" r=\"2\"/><circle cx=\"19\" cy=\"20\" r=\"2\"/><\/g><\/svg><h3 class=\"i5-h3\">Redes e telerradiologia<\/h3><p>Um arquivo único para todas as unidades e laudo distribuído entre radiologistas.<\/p><\/article><\/div><\/div><\/section><section class=\"i5-bloco i5-noite p5-noite i5-fim\"><div class=\"i5-brilho\" aria-hidden=\"true\"><\/div><div class=\"i5-faixa\"><h2 class=\"i5-h2\" data-surge>Perguntas que valem uma conversa.<\/h2><ol class=\"i5-ref\"><li data-surge><span>01<\/span><p>Quanto custa manter, ampliar e proteger o servidor de imagens da sua operação?<\/p><\/li><li data-surge><span>02<\/span><p>Se esse servidor parasse hoje, por quanto tempo sua equipe ficaria sem os exames?<\/p><\/li><li data-surge><span>03<\/span><p>Seus radiologistas conseguem laudar de onde estiverem, com a mesma imagem da clínica?<\/p><\/li><li data-surge><span>04<\/span><p>Quantos CDs você ainda entrega só para compartilhar uma imagem?<\/p><\/li><\/ol><div class=\"i5-cta\" data-surge><img class=\"logo\" src=\"./assets/ipacs-principal-negativa.svg\" alt=\"I-PACS Imaging Cloud\" width=\"240\" height=\"37\"><h2 class=\"i5-h2\">Veja o I-PACS funcionando na sua operação.<\/h2><p class=\"i5-lead\">Agende uma demonstração com o nosso time e descubra como levar as suas imagens para a nuvem, sem fronteiras.<\/p><a class=\"i5-botao claro\" href=\"#/contato\">Agendar demonstração<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12h14M13 6l6 6-6 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><\/svg><\/a><\/div><\/div><\/section><\/div>";
const EXAMES = [[["case-braint1-after-OJMBRYR7.jpg", "Sag T1", false], ["case-braint1-before-5EM4HTCK.jpg", "Sag T1", true], ["case-brainmra-after-U27AN4HR.jpg", "Angio RM", false], ["case-brainmra-before-ZE2V4MFE.jpg", "Angio RM", true]], [["ct_pulmao_depois-GBP4LJIR.jpg", "Pulmão", false], ["ct_pulmao_antes-BKQFUP4Z.jpg", "Pulmão", true], ["ace_tronco_depois-SEU5VIB2.jpg", "Mediastino", false], ["ace_tronco_antes-RO3SRRDW.jpg", "Mediastino", true]], [["ct_abd_depois-5E66JEC6.jpg", "Abdome", false], ["ct_abd_antes-3UQLWNVP.jpg", "Abdome", true], ["ace_arco_depois-FPWX3HXB.jpg", "Arco aórtico", false], ["ace_arco_antes-5N6SLGCD.jpg", "Arco aórtico", true]]];
export function iniciarIpacs(raiz) {
  if (!raiz) return function () {};
  var limpar = [], vivo = true;
  var reduz = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  limpar.push(iniciarIris(raiz));
  var EX = EXAMES;
  var ANT = 'anterior';

  // ---------------- visualizador interativo
  function trocar(visor, i) {
    var botoes = visor.querySelectorAll('.ex');
    botoes.forEach(function (b, k) { b.setAttribute('data-on', k === i ? 'true' : 'false'); });
    var figs = visor.querySelectorAll('.grade figure');
    figs.forEach(function (f, k) {
      var d = EX[i] && EX[i][k]; if (!d) return;
      f.setAttribute('data-troca', 'true');
      setTimeout(function () {
        if (!vivo) return;
        var img = f.querySelector('img'); img.src = './assets/' + d[0];
        var cap = f.querySelector('figcaption');
        cap.innerHTML = '';
        var b = document.createElement('b'); b.textContent = d[1]; cap.appendChild(b);
        if (d[2]) { cap.appendChild(document.createTextNode(' ')); var s = document.createElement('span'); s.textContent = ANT; cap.appendChild(s); }
        f.setAttribute('data-troca', 'false');
      }, reduz ? 0 : 260);
    });
  }
  raiz.querySelectorAll('.sec-visor').forEach(function (v) {
    v.querySelectorAll('button.ex').forEach(function (b, i) {
      var h = function () { trocar(v, i); };
      b.addEventListener('click', h);
      limpar.push(function () { b.removeEventListener('click', h); });
    });
  });

  // ---------------- cena
  var cena = raiz.querySelector('[data-cena-pacs]');
  if (!cena) return fim;
  var palco = cena.querySelector('.i5-palco');
  var mods = [].slice.call(cena.querySelectorAll('.p5-mod'));
  var dests = [].slice.call(cena.querySelectorAll('.p5-dest'));
  var hub = cena.querySelector('.p5-hub');
  var pares = [].slice.call(cena.querySelectorAll('.p5-par'));
  var paresBox = cena.querySelector('.p5-pares');
  var visorC = cena.querySelector('.cena-visor');
  var cartoes = [].slice.call(cena.querySelectorAll('.i5-cartao'));
  var dica = cena.querySelector('.i5-dica');
  var barra = cena.querySelector('.i5-prog i');
  var cv = cena.querySelector('.i5-canvas'), cx = cv.getContext('2d');

  var F = [0, 0.1, 0.4, 0.5, 0.75, 0.9, 1.01];
  var PROB_T = [0.13, 0.17, 0.21, 0.25, 0.29, 0.33];
  var RESP_T = [0.53, 0.565, 0.6, 0.635, 0.67, 0.705];
  var DEST_T = [0.55, 0.6, 0.65, 0.7];
  var NUVEM_T = 0.5;

  var geo = { w: 0, h: 0, dpr: 1, a: [], b: [], hl: null, hr: null, movel: false };
  function medir() {
    var pr = palco.getBoundingClientRect();
    geo.dpr = Math.min(2, window.devicePixelRatio || 1);
    geo.w = pr.width; geo.h = pr.height;
    cv.width = Math.round(pr.width * geo.dpr); cv.height = Math.round(pr.height * geo.dpr);
    geo.movel = window.innerWidth <= 960;
    var hr = hub.getBoundingClientRect();
    var cy = hr.top - pr.top + hr.height / 2;
    geo.hl = { x: hr.left - pr.left + 6, y: cy };
    geo.hr = { x: hr.right - pr.left - 6, y: cy };
    geo.a = mods.map(function (m) { var r = m.getBoundingClientRect(); return { x: r.right - pr.left, y: r.top - pr.top + r.height / 2 }; });
    geo.b = dests.map(function (m) { var r = m.getBoundingClientRect(); return { x: r.left - pr.left, y: r.top - pr.top + r.height / 2 }; });
  }

  var p = 0, nuvem = false, okDest = [];
  function aplicar() {
    var r = cena.getBoundingClientRect();
    p = Math.max(0, Math.min(1, -r.top / ((r.height - window.innerHeight) || 1)));
    barra.style.transform = 'scaleX(' + p.toFixed(4) + ')';
    dica.setAttribute('data-off', p > 0.04 ? 'true' : 'false');
    var f = 0; for (var i = 0; i < F.length - 1; i++) if (p >= F[i] && p < F[i + 1]) f = i;
    cartoes.forEach(function (c, i) { c.setAttribute('data-on', i === f ? 'true' : 'false'); });
    nuvem = p >= NUVEM_T;
    hub.setAttribute('data-nuvem', nuvem ? 'true' : 'false');
    hub.setAttribute('data-alerta', !nuvem && p >= 0.3 ? 'true' : 'false');
    var disco = nuvem ? 30 : Math.min(96, 34 + Math.max(0, p - 0.05) * 160);
    hub.style.setProperty('--disco', disco.toFixed(1) + '%');
    okDest = dests.map(function (d, i) { var ok = p >= DEST_T[i]; d.setAttribute('data-ok', ok ? 'true' : 'false'); return ok; });
    pares.forEach(function (el, k) {
      el.setAttribute('data-on', p >= PROB_T[k] ? 'true' : 'false');
      el.setAttribute('data-ok', p >= RESP_T[k] ? 'true' : 'false');
    });
    var verVisor = f === 4;
    paresBox.setAttribute('data-oculto', (f === 0 || verVisor) ? 'true' : 'false');
    visorC.setAttribute('data-on', verVisor ? 'true' : 'false');
  }

  function bez(a, b, t) {
    var mx = (a.x + b.x) / 2;
    var u = 1 - t;
    // curva cúbica com tangentes horizontais
    var x = u * u * u * a.x + 3 * u * u * t * mx + 3 * u * t * t * mx + t * t * t * b.x;
    var y = u * u * u * a.y + 3 * u * u * t * a.y + 3 * u * t * t * b.y + t * t * t * b.y;
    return { x: x, y: y };
  }
  function curva(a, b) {
    var mx = (a.x + b.x) / 2;
    cx.beginPath(); cx.moveTo(a.x, a.y); cx.bezierCurveTo(mx, a.y, mx, b.y, b.x, b.y); cx.stroke();
  }

  var pts = [], acum = 0, ultimo = 0, raf;
  function quadro(t) {
    if (!vivo) return;
    raf = requestAnimationFrame(quadro);
    var r = cena.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight || geo.movel || !geo.hl) { ultimo = t; return; }
    var dt = Math.min(0.05, ((t - ultimo) || 16) / 1000); ultimo = t;
    acum += dt;
    var iv = reduz ? 0.7 : 0.16;
    while (acum > iv) {
      acum -= iv;
      pts.push({ fase: 0, m: Math.floor(Math.random() * geo.a.length), d: -1, t: 0, v: 0.55 + Math.random() * 0.25 });
    }
    cx.setTransform(geo.dpr, 0, 0, geo.dpr, 0, 0);
    cx.clearRect(0, 0, geo.w, geo.h);
    cx.lineCap = 'round';
    // entradas
    cx.setLineDash([]);
    cx.lineWidth = 1.6;
    cx.strokeStyle = nuvem ? 'rgba(15,110,128,.45)' : 'rgba(24,33,69,.2)';
    geo.a.forEach(function (a) { curva(a, geo.hl); });
    // saídas
    geo.b.forEach(function (b, i) {
      if (okDest[i]) {
        cx.save(); cx.setLineDash([]); cx.lineWidth = 2.4; cx.strokeStyle = 'rgba(15,110,128,.8)'; cx.shadowColor = 'rgba(38,185,218,.6)'; cx.shadowBlur = 10;
        curva(geo.hr, b); cx.restore();
      } else {
        cx.setLineDash([5, 7]); cx.lineWidth = 1.4; cx.strokeStyle = 'rgba(24,33,69,.18)'; curva(geo.hr, b); cx.setLineDash([]);
      }
    });
    // imagens em trânsito
    for (var k = pts.length - 1; k >= 0; k--) {
      var q = pts[k];
      q.t += dt * q.v;
      var pos;
      if (q.fase === 0) {
        if (q.t >= 1) {
          var livres = []; okDest.forEach(function (o, i) { if (o) livres.push(i); });
          if (nuvem && livres.length) { q.fase = 1; q.t = 0; q.d = livres[Math.floor(Math.random() * livres.length)]; }
          else { pts.splice(k, 1); continue; }
        }
        pos = bez(geo.a[q.m], geo.hl, Math.min(1, q.t));
      }
      if (q.fase === 1) {
        if (q.t >= 1) { pts.splice(k, 1); continue; }
        pos = bez(geo.hr, geo.b[q.d], q.t);
      }
      var cor = q.fase === 1 ? '#0f6e80' : (nuvem ? '#1d8ea3' : '#182145');
      cx.save();
      if (q.fase === 1) { cx.shadowColor = 'rgba(38,185,218,.8)'; cx.shadowBlur = 8; }
      cx.fillStyle = cor;
      // pequena "imagem": quadrado arredondado
      var s = q.fase === 1 ? 9 : 8;
      cx.beginPath();
      if (cx.roundRect) cx.roundRect(pos.x - s / 2, pos.y - s / 2, s, s, 2); else cx.rect(pos.x - s / 2, pos.y - s / 2, s, s);
      cx.fill(); cx.restore();
    }
  }
  raf = requestAnimationFrame(function (t) { ultimo = t; quadro(t); });
  limpar.push(function () { cancelAnimationFrame(raf); });

  var aoRolar = function () { aplicar(); };
  var aoRedim = function () { medir(); aplicar(); };
  window.addEventListener('scroll', aoRolar, { passive: true });
  window.addEventListener('resize', aoRedim);
  window.addEventListener('iosei-lang', aoRedim);
  limpar.push(function () { window.removeEventListener('scroll', aoRolar); window.removeEventListener('resize', aoRedim); window.removeEventListener('iosei-lang', aoRedim); });
  medir(); aplicar();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (vivo) aoRedim(); });
  var t2 = setTimeout(aoRedim, 400); limpar.push(function () { clearTimeout(t2); });
  return fim;

  function fim() { vivo = false; limpar.forEach(function (f) { try { f && f(); } catch (e) {} }); }
};

