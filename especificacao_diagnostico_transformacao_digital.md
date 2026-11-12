# Especificação para desenvolvimento --- Diagnóstico de Transformação Digital de Processos

## 1. Objetivo

Desenvolver uma aplicação web simples, moderna e responsiva para apoiar
o diagnóstico de processos organizacionais e identificar oportunidades
de transformação digital.

A ferramenta deve permitir que qualquer colaborador descreva um processo
e avalie sintomas relacionados a cinco dimensões:

1.  Visão
2.  Prioridades
3.  Experimentação
4.  Governança
5.  Capacidades

Ao final, a aplicação deve gerar e baixar um arquivo Markdown (`.md`)
contendo o contexto informado, as respostas selecionadas, observações e
instruções completas para que o usuário envie esse arquivo manualmente a
uma ferramenta de IA (Claude, ChatGPT, Gemini etc.).

**A aplicação não deve chamar uma IA, não deve exigir conta e não deve
armazenar dados em servidor.** A análise será feita fora da aplicação,
pelo usuário, após baixar o arquivo.

O projeto deve ser implementado de forma que possa ser publicado
diretamente na Vercel, sem depender de um backend Python ou de um
servidor próprio.

------------------------------------------------------------------------

## 2. Princípios e restrições obrigatórias

### 2.1 Arquitetura sem backend

Priorizar uma aplicação 100% frontend, executada no navegador.

-   Não criar backend em Python, Flask, FastAPI, Django ou similar.
-   Não criar API própria, rotas de servidor ou funções serverless,
    salvo se forem absolutamente indispensáveis --- a princípio, não
    são.
-   Não utilizar banco de dados.
-   Não implementar login, cadastro, autenticação ou controle de
    usuários.
-   Não exigir variáveis de ambiente, chaves de API ou serviços pagos.
-   Não integrar diretamente com Claude, ChatGPT, Gemini ou qualquer
    provedor de IA.
-   Não enviar os dados preenchidos para serviços externos.
-   Não criar analytics, telemetria ou rastreamento de comportamento.
-   Não exigir armazenamento persistente.

O processamento das respostas e a montagem do Markdown devem acontecer
inteiramente no navegador.

### 2.2 Compatibilidade com Vercel

A Vercel será utilizada apenas para hospedar e publicar os arquivos
estáticos da aplicação.

Portanto:

-   Utilizar uma solução frontend compatível com build estático.
-   O comando de build deve gerar os arquivos finais em uma pasta
    publicável pela Vercel (por exemplo, `dist/`).
-   Não depender de runtime Python na Vercel.
-   Não depender de processos em execução continuamente, workers de
    servidor ou armazenamento local no servidor.
-   Configurar o projeto para implantação simples, preferencialmente
    detectável automaticamente pela Vercel.
-   Documentar claramente o comando de build e a pasta de saída.

### 2.3 Privacidade e dados

Os dados preenchidos podem conter informações internas ou sensíveis
sobre processos da organização. Por isso:

-   Manter todo o conteúdo no navegador durante o preenchimento.
-   Gerar o arquivo `.md` localmente usando recursos do navegador, como
    `Blob` e um link temporário de download.
-   Não transmitir respostas para terceiros.
-   Não salvar automaticamente o conteúdo em nuvem.
-   Se for oferecida a opção de manter o preenchimento ao atualizar a
    página, ela deve ser opcional e utilizar somente `localStorage`, com
    explicação clara e opção de limpar os dados.
-   Preferencialmente, oferecer um botão explícito **Limpar
    diagnóstico**.
-   Não incluir dados de exemplo ou respostas preenchidas no arquivo
    final, a menos que tenham sido realmente informadas pelo usuário.

------------------------------------------------------------------------

## 3. Referência conceitual

A ideia foi inspirada no conceito de roteiro de transformação digital
apresentado em *The Digital Transformation Roadmap*, de David L. Rogers.

A referência organiza a transformação digital em cinco dimensões. A
aplicação deve utilizar essas dimensões como estrutura conceitual, mas
criar perguntas, textos explicativos e opções com redação própria.

**Importante sobre direitos autorais:** não reproduzir literalmente
tabelas, frases, descrições ou trechos extensos do livro. Não
digitalizar ou transcrever a tabela original. Desenvolver uma
experiência original, preservando apenas a ideia geral das cinco
dimensões e o contraste entre práticas que dificultam e práticas que
favorecem a transformação.

As cinco dimensões são:

### 3.1 Visão

Avalia se existe entendimento compartilhado sobre o motivo da
transformação, quais resultados se pretende alcançar e como ela
contribui para a estratégia da organização.

Pontos que podem ser investigados: - Clareza do propósito e dos
objetivos do processo. - Compreensão e envolvimento das pessoas. -
Relação entre iniciativas e necessidades reais do negócio. - Existência
de resultados observáveis e indicadores úteis. - Capacidade de antecipar
mudanças, em vez de apenas reagir a problemas.

### 3.2 Prioridades

Avalia se os esforços de melhoria estão concentrados nos problemas e
oportunidades mais relevantes.

Pontos que podem ser investigados: - Existência de prioridades claras. -
Escolha de iniciativas a partir de problemas e oportunidades, não apenas
de ferramentas disponíveis. - Equilíbrio entre eficiência operacional,
qualidade, experiência e crescimento. - Participação das áreas
envolvidas. - Alinhamento entre as iniciativas e as necessidades do
negócio.

### 3.3 Experimentação

Avalia a capacidade de testar ideias, aprender com evidências e ajustar
soluções antes de realizar grandes investimentos.

Pontos que podem ser investigados: - Testes pequenos antes de
implantações amplas. - Uso de evidências e retorno dos usuários para
orientar decisões. - Abertura para revisar soluções. - Aprendizado com
tentativas que não deram certo. - Velocidade para testar, aprender e
evoluir.

### 3.4 Governança

Avalia como as decisões, responsabilidades, recursos e acompanhamento
das iniciativas são organizados.

Pontos que podem ser investigados: - Clareza sobre quem decide e quem
executa. - Participação das áreas necessárias. - Capacidade de aprovar e
priorizar melhorias sem criar gargalos excessivos. - Disponibilidade de
recursos e acompanhamento contínuo. - Capacidade de interromper ou
redirecionar iniciativas que não entregam valor.

### 3.5 Capacidades

Avalia se a organização dispõe de pessoas, tecnologia, dados e condições
de trabalho para melhorar continuamente os processos.

Pontos que podem ser investigados: - Integração entre sistemas e
ferramentas. - Qualidade, disponibilidade e confiabilidade dos dados. -
Acesso às informações necessárias. - Conhecimento e autonomia das
equipes. - Cultura de colaboração, melhoria contínua e participação das
pessoas.

------------------------------------------------------------------------

## 4. Público e experiência desejada

A ferramenta deve ser compreensível para pessoas não técnicas. Pode ser
utilizada por áreas como atendimento, recepção, agendamento,
faturamento, financeiro, RH, compras, TI e gestão.

Evitar linguagem excessivamente técnica, siglas sem explicação e
perguntas que pressuponham conhecimento de tecnologia.

A aplicação não deve parecer uma auditoria ou avaliação individual de
desempenho. O foco é compreender o processo e identificar oportunidades
de melhoria.

Tom de comunicação: - Claro, profissional e acolhedor. - Orientado a
processos, problemas, oportunidades e resultados. - Sem culpabilizar
pessoas ou setores. - Explicar termos técnicos quando forem realmente
necessários.

------------------------------------------------------------------------

## 5. Fluxo funcional

Criar uma experiência guiada, dividida em etapas.

### Etapa 1 --- Apresentação

Apresentar: - Nome da ferramenta. - Explicação curta sobre o objetivo. -
Informação de que o preenchimento não é enviado a um servidor. -
Explicação de que, ao final, será baixado um arquivo Markdown para ser
analisado posteriormente por uma IA. - Botão para iniciar.

Sugestão de título: **Diagnóstico de Transformação Digital de
Processos**

Sugestão de texto introdutório:

"Descreva um processo da sua organização, identifique como ele funciona
atualmente e avalie fatores que podem facilitar ou dificultar sua
evolução. Ao final, você terá um diagnóstico estruturado em um arquivo
que poderá ser analisado por uma ferramenta de inteligência artificial
para apoiar a elaboração de um plano de ação."

### Etapa 2 --- Contexto do processo

Coletar informações por meio de campos simples:

Obrigatórios: - **Nome do processo:** como o processo é conhecido. -
**Área responsável:** setor ou equipe que conduz o processo. -
**Objetivo do processo:** qual resultado ele deve entregar. - **Como
funciona atualmente:** descrição livre das principais etapas. -
**Principal dificuldade:** o que mais prejudica o processo hoje.

Opcionais: - **Pessoas ou áreas envolvidas.** - **Sistemas e ferramentas
utilizados.** - **Frequência ou volume:** por exemplo, quantidade de
solicitações por dia ou mês. - **Quem recebe o resultado do processo:**
cliente, paciente, colaborador, outro setor etc. - **Resultado esperado
com a melhoria.** - **Observações adicionais.**

Não exigir informações que o usuário não tenha. Deixar claro quais
campos são opcionais.

### Etapa 3 --- Diagnóstico das cinco dimensões

Apresentar uma dimensão por vez, com: - Nome da dimensão. - Explicação
simples do que ela avalia. - Perguntas objetivas. - Opções de resposta
compreensíveis. - Campo opcional para comentários ou exemplos.

Não copiar frases do livro. Criar perguntas e alternativas originais com
base nos pontos conceituais descritos neste documento.

#### Modelo recomendado de pergunta

Cada pergunta deve representar uma característica observável do processo
ou da organização. Oferecer respostas em uma escala simples, por
exemplo:

-   Não acontece / não existe.
-   Acontece raramente.
-   Acontece em parte.
-   Acontece na maioria das vezes.
-   Acontece de forma consistente.
-   Não sei informar / não se aplica.

Quando fizer mais sentido, utilizar alternativas descritivas em vez de
uma escala genérica.

As perguntas devem permitir identificar tanto dificuldades quanto
práticas positivas. Evitar perguntas tendenciosas ou que induzam o
usuário a escolher a resposta considerada ideal.

Incluir a opção **Não sei informar** sempre que for razoável. Não
interpretar ausência de informação automaticamente como falha.

#### Quantidade e profundidade

Criar inicialmente de 4 a 6 perguntas por dimensão. Priorizar perguntas
úteis, sem tornar o preenchimento cansativo.

Cada dimensão pode ter uma área de observações adicionais.

### Etapa 4 --- Revisão

Antes de gerar o arquivo, mostrar um resumo com: - Contexto do
processo. - Respostas das cinco dimensões. - Comentários. - Campos que
ficaram sem resposta.

Permitir voltar às etapas e corrigir respostas.

### Etapa 5 --- Geração do arquivo

Criar um botão **Gerar diagnóstico (.md)**.

A aplicação deve montar o conteúdo em Markdown no próprio navegador e
iniciar o download de um arquivo com nome seguro, por exemplo:

`diagnostico-transformacao-digital-nome-do-processo-2026-11-11.md`

O nome deve ser sanitizado para remover caracteres inválidos. A data
deve ser gerada localmente no navegador.

Após o download, apresentar instruções simples:

1.  Abra o ChatGPT, Claude, Gemini ou outra ferramenta de IA.
2.  Anexe o arquivo `.md` baixado.
3.  Envie uma solicitação para analisar o processo e elaborar um plano
    de ação.
4.  Revise as recomendações com as pessoas responsáveis pelo processo
    antes de implementá-las.

Disponibilizar também um botão para copiar o conteúdo Markdown, caso o
usuário prefira copiar e colar em vez de anexar o arquivo.

------------------------------------------------------------------------

## 6. Lógica de análise e interpretação

A aplicação deve registrar as respostas de forma organizada, mas não
deve apresentar uma pontuação como se fosse uma avaliação científica ou
certificação de maturidade.

Se for útil mostrar um resumo visual, utilizar indicadores orientativos
por dimensão, deixando explícito que: - O resultado é uma leitura
inicial baseada nas respostas. - Não representa auditoria, certificação
ou medição científica. - Respostas dependem da percepção de quem
preencheu. - Informações ausentes ou desconhecidas não devem ser
tratadas como evidência de falha.

Não reduzir o diagnóstico a uma nota geral. O mais importante é
preservar as evidências, dificuldades, práticas positivas e lacunas de
informação para a análise posterior da IA.

Se implementar uma classificação visual, explicar a regra utilizada e
permitir que o usuário consulte as respostas que deram origem ao
resultado.

------------------------------------------------------------------------

## 7. Conteúdo do arquivo Markdown gerado

O arquivo deve ser suficientemente completo para que outra IA consiga
compreender o contexto sem precisar acessar a aplicação.

Estrutura obrigatória:

``` markdown
# Diagnóstico de Transformação Digital de Processos

## 1. Objetivo deste documento
Explicar que este documento reúne informações de um processo para apoiar uma análise estruturada e a elaboração de um plano de ação.

## 2. Contexto do processo
- Nome:
- Área responsável:
- Objetivo:
- Funcionamento atual:
- Principal dificuldade:
- Pessoas/áreas envolvidas:
- Sistemas e ferramentas:
- Frequência/volume:
- Destinatários do processo:
- Resultado esperado:
- Observações:

## 3. Diagnóstico por dimensão

### 3.1 Visão
Explicação da dimensão.
Perguntas e respostas selecionadas.
Comentários informados.

### 3.2 Prioridades
Explicação da dimensão.
Perguntas e respostas selecionadas.
Comentários informados.

### 3.3 Experimentação
Explicação da dimensão.
Perguntas e respostas selecionadas.
Comentários informados.

### 3.4 Governança
Explicação da dimensão.
Perguntas e respostas selecionadas.
Comentários informados.

### 3.5 Capacidades
Explicação da dimensão.
Perguntas e respostas selecionadas.
Comentários informados.

## 4. Síntese das informações
Resumo factual das dificuldades, práticas positivas, oportunidades percebidas e informações desconhecidas. Não inventar dados.

## 5. Instruções para a inteligência artificial
[Instruções completas para realizar a análise e produzir o plano de ação.]
```

As respostas devem ser exportadas com o texto integral da pergunta e o
rótulo da alternativa escolhida. Não exportar apenas códigos internos ou
números de escala.

Não omitir respostas "Não sei informar" ou "Não se aplica"; elas são
relevantes para a análise.

------------------------------------------------------------------------

## 8. Instruções que devem constar no Markdown para a IA

Incluir no arquivo gerado um prompt bem estruturado, em português, com
as seguintes orientações:

Você é um consultor experiente em transformação digital, melhoria de
processos, gestão da mudança e inovação organizacional.

Analise o processo descrito neste documento considerando seu contexto
real e as respostas fornecidas nas cinco dimensões: Visão, Prioridades,
Experimentação, Governança e Capacidades.

### Regras da análise

1.  Baseie suas conclusões nas informações fornecidas.
2.  Não invente fatos, números, sistemas, responsáveis ou restrições.
3.  Diferencie claramente fatos informados, interpretações e hipóteses.
4.  Quando faltarem informações importantes, registre as lacunas e
    explique por que elas fazem diferença.
5.  Não presuma que a solução para todo problema seja comprar ou
    desenvolver um sistema.
6.  Considere alternativas como simplificação de etapas, revisão de
    regras, padronização, treinamento, integração, automação, melhoria
    de comunicação e mudança de responsabilidades.
7.  Considere os impactos para as pessoas que executam o processo e para
    quem recebe seu resultado.
8.  Valorize práticas que já funcionam e que possam ser ampliadas.
9.  Não trate respostas desconhecidas como evidência automática de
    problema.
10. Evite recomendações genéricas. Toda recomendação deve estar ligada a
    uma evidência ou hipótese identificada no diagnóstico.

### Estrutura esperada da resposta da IA

**1. Resumo executivo** - O que é o processo. - Principais problemas e
oportunidades. - Leitura geral do cenário. - Potencial de melhoria.

**2. Entendimento do processo atual** - Descrever o funcionamento
informado. - Identificar etapas, participantes, entradas e saídas quando
houver dados suficientes. - Apontar pontos em que faltam informações.

**3. Análise das cinco dimensões** Para cada dimensão: - Principais
evidências. - Práticas positivas identificadas. - Dificuldades ou
riscos. - Causas possíveis, separando hipóteses de fatos. -
Oportunidades de melhoria.

**4. Problemas prioritários** Organizar os problemas por relevância,
explicando: - Evidência que sustenta o problema. - Impacto provável. -
Urgência. - Dependências e incertezas.

**5. Plano de ação recomendado** Apresentar uma tabela com: -
Prioridade. - Ação recomendada. - Problema ou oportunidade
relacionada. - Resultado esperado. - Responsável sugerido por função ou
área (não inventar nomes). - Complexidade estimada (baixa, média ou
alta). - Impacto esperado (baixo, médio ou alto). - Prazo sugerido. -
Dependências ou cuidados.

Separar ações de curto, médio e longo prazo. Priorizar ações viáveis e
que possam gerar aprendizado rapidamente.

**6. Indicadores de acompanhamento** Sugerir indicadores específicos
para o processo. Para cada indicador, explicar: - O que mede. - Como
poderia ser calculado. - Qual dado seria necessário. - Frequência de
acompanhamento.

Não inventar valores atuais nem metas numéricas sem base. Quando sugerir
uma meta, identificá-la como proposta inicial a validar.

**7. Riscos e pontos de atenção** Considerar riscos operacionais,
tecnológicos, de segurança, privacidade, adesão das equipes e
continuidade do processo, quando aplicáveis.

**8. Perguntas para aprofundamento** Listar somente as perguntas cuja
resposta poderia alterar significativamente o diagnóstico ou as
recomendações.

**9. Roteiro de implementação** Propor uma sequência prática de
implantação, com etapas, validações e critérios para avaliar se as
melhorias funcionaram.

**10. Conclusão** Indicar por onde começar e qual seria o próximo passo
mais sensato.

------------------------------------------------------------------------

## 9. Diretrizes de interface e design

A interface deve transmitir clareza, confiança e qualidade profissional.
Evitar aparência de formulário administrativo genérico ou painel
corporativo ultrapassado.

Prioridades: - Hierarquia visual clara. - Tipografia legível. -
Espaçamento consistente. - Poucos elementos por tela. - Navegação
simples. - Excelente experiência em desktop e boa adaptação para
celular. - Estados de foco, hover, seleção, carregamento e validação bem
desenhados. - Feedback visual claro ao avançar, voltar, salvar
localmente (se houver) e baixar o arquivo. - Acessibilidade: contraste
adequado, navegação por teclado, labels associados aos campos e estados
não comunicados apenas por cor.

Utilizar componentes consistentes. Evitar excesso de cards, gradientes,
sombras, bordas e elementos decorativos sem função.

### Skills de design obrigatórias

Antes de implementar o frontend, verificar e utilizar as skills abaixo
no ambiente do Claude Code:

1.  **Emil Kowalski** --- utilizar a skill relacionada aos princípios de
    design de interfaces, microinterações e animações de interface
    associados ao trabalho de Emil Kowalski. Aplicar animações discretas
    e funcionais, com atenção a timing, easing, feedback e estados de
    interação. Não adicionar animações apenas por decoração.
2.  **Impeccable** --- utilizar a skill `impeccable` para orientar a
    qualidade visual, hierarquia, tipografia, espaçamento, consistência
    e acabamento da interface.

Se as skills não estiverem instaladas: - Verificar a documentação e a
forma oficial de instalação de cada uma. - Solicitar ou executar a
instalação conforme os recursos disponíveis no ambiente, sem presumir
nomes de pacotes ou URLs. - Não fingir que uma skill foi utilizada se
ela não estiver disponível. - Se não for possível instalar, registrar
essa limitação e aplicar os princípios de design correspondentes
manualmente.

Não copiar a interface de um produto existente. Criar uma identidade
visual própria e coerente com a proposta.

Respeitar `prefers-reduced-motion`: pessoas que solicitarem redução de
movimento devem receber transições reduzidas ou desativadas.

------------------------------------------------------------------------

## 10. Tecnologias sugeridas

Escolher ferramentas simples, estáveis e compatíveis com hospedagem
estática.

Sugestão inicial: - React. - TypeScript. - Vite. - Tailwind CSS, se
contribuir para a consistência visual. - Biblioteca de ícones leve, se
necessária. - Componentes próprios para o fluxo do diagnóstico.

Não adicionar bibliotecas sem necessidade. Evitar dependências pesadas
para funcionalidades que podem ser implementadas com recursos nativos do
navegador.

Não utilizar Next.js com recursos de servidor se isso não trouxer
benefício concreto. Uma SPA com Vite é suficiente para o escopo inicial.

### Download do Markdown

Implementar o download com APIs nativas do navegador: - Criar o conteúdo
Markdown como string. - Criar um `Blob` com MIME type apropriado
(`text/markdown;charset=utf-8`). - Criar URL temporária com
`URL.createObjectURL`. - Disparar o download por um elemento `a`. -
Revogar a URL temporária após o uso.

### Estado da aplicação

Manter o estado do formulário no frontend, com estrutura tipada em
TypeScript.

O usuário deve conseguir avançar e voltar sem perder as respostas
durante a sessão.

`localStorage` é opcional. Se utilizado: - Não armazenar dados sem
informar o usuário. - Permitir limpar tudo. - Tratar erros de acesso ao
armazenamento. - Não depender dele para o funcionamento básico.

------------------------------------------------------------------------

## 11. Organização e qualidade do código

-   Separar dados das perguntas e alternativas da lógica dos
    componentes.
-   Manter as perguntas em estruturas tipadas e fáceis de editar.
-   Separar a lógica de geração do Markdown da interface.
-   Criar funções reutilizáveis para validação, formatação e sanitização
    do nome do arquivo.
-   Evitar componentes gigantes.
-   Não duplicar conteúdo das perguntas em vários locais.
-   Não inserir informações fictícias como se fossem dados reais.
-   Tratar campos opcionais e respostas ausentes corretamente.
-   Manter o projeto simples e compreensível para futuras alterações.

Sugestão de módulos: - `src/data/`: dimensões, perguntas e
alternativas. - `src/types/`: tipos TypeScript. - `src/components/`:
componentes de interface. - `src/pages/` ou equivalente: etapas da
aplicação. - `src/utils/`: geração de Markdown, download, validação e
formatação. - `src/hooks/`: estado e lógica de navegação, se necessário.

A estrutura final pode ser adaptada pelo agente, desde que mantenha
separação clara de responsabilidades.

------------------------------------------------------------------------

## 12. Critérios de aceite

Considerar o projeto concluído somente quando:

-   [ ] A aplicação inicia localmente com instruções documentadas.
-   [ ] O usuário consegue preencher o contexto do processo.
-   [ ] As cinco dimensões possuem perguntas e alternativas claras,
    originais e coerentes.
-   [ ] O usuário consegue avançar e voltar sem perder respostas.
-   [ ] O usuário consegue revisar o diagnóstico antes de exportar.
-   [ ] O Markdown gerado inclui contexto, perguntas, respostas,
    observações e prompt de análise.
-   [ ] O arquivo pode ser baixado sem backend.
-   [ ] O conteúdo também pode ser copiado.
-   [ ] O arquivo não contém respostas fictícias nem códigos internos
    sem explicação.
-   [ ] A aplicação funciona sem login, banco de dados, chave de API ou
    serviço externo.
-   [ ] Nenhum dado preenchido é enviado para um servidor.
-   [ ] O build de produção funciona e pode ser publicado na Vercel como
    site estático.
-   [ ] A interface é responsiva e acessível.
-   [ ] As skills de frontend solicitadas foram verificadas e
    utilizadas, ou a indisponibilidade foi documentada.
-   [ ] Existe um README com instalação, execução local, build e
    publicação na Vercel.

------------------------------------------------------------------------

## 13. Sequência de trabalho para o Claude Code

Não comece criando muitos componentes ou escrevendo código sem antes
entender o escopo.

Siga esta ordem:

1.  Inspecione o repositório atual. Se estiver vazio, inicialize o
    projeto com a stack simples indicada.
2.  Verifique as skills **Emil Kowalski** e **Impeccable** e leia suas
    instruções antes de desenhar a interface.
3.  Apresente um plano curto de implementação e a estrutura proposta.
4.  Defina as perguntas e alternativas originais para as cinco
    dimensões, mantendo linguagem acessível e evitando redundância.
5.  Implemente o fluxo completo, incluindo contexto, diagnóstico,
    revisão e exportação.
6.  Implemente e teste a geração do Markdown com diferentes combinações
    de respostas, incluindo campos vazios, "Não sei informar" e "Não se
    aplica".
7.  Execute o build de produção e corrija os erros.
8.  Verifique responsividade, acessibilidade e estados de interação.
9.  Documente como executar e publicar na Vercel.

### Regra importante

Priorize entregar uma primeira versão funcional, completa e simples. Não
introduza backend, banco, autenticação, integrações de IA ou
infraestrutura que não sejam necessárias para cumprir o objetivo.

Se houver alguma decisão pequena em aberto, escolha a alternativa mais
simples, segura e compatível com hospedagem estática, documentando a
decisão. Só interrompa para perguntar quando houver uma ambiguidade
realmente impeditiva.
