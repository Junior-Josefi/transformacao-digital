# Diagnóstico de Transformação Digital de Processos

Aplicação web moderna, intuitiva e 100% client-side desenvolvida para apoiar o diagnóstico de processos organizacionais e identificar oportunidades reais de transformação digital no **Centro Médico Curitiba** (Adventist Health Brasil).

A metodologia é inspirada no roteiro de 5 dimensões apresentado em *The Digital Transformation Roadmap*, de **David L. Rogers**, adaptado com redação original em Português e foco prático na realidade hospitalar e corporativa.

---

## 🌟 Principais Características

- **100% Frontend e Sem Servidor:** Nenhuma informação é transmitida para a nuvem ou salva em servidores externos. Todos os dados permanecem confidenciais na sessão do navegador do colaborador.
- **Instrução Direta para a IA com PDF Automático:** Gera um prompt completo com um clique no botão **Copiar instrução**, incluindo contexto, respostas e uma ordem explícita para o ChatGPT, Claude ou Gemini analisar o processo e **gerar automaticamente um arquivo PDF pronto para download**.
- **Visual Limpo e Ágil:** Interface objetiva e sem sobrecarga de texto, com opções de resposta diretas e navegação fluida.
- **Identidade Visual Oficial Adventist Health:**
  - **Cores Oficiais:** Azul Adventist (`#1A4A7A`), Azul Claro / Ciano (`#00B5CC`), complementares para destaque de estados (`#B25752`, `#63743A`, `#A1BA66`).
  - **Tipografia Institucional:** *Work Sans* (Títulos), *Lato* (Subtítulos) e *Open Sans* (Corpo do texto).
  - **Assets:** Logo vertical institucional e favicon configurados.
- **Experiência Guiada e Acessível:** Formulário com validação inteligente, campos opcionais colapsáveis, opções de resposta com descritivos claros e design responsivo (desktop, tablet e celular).

---

## 🧭 As 5 Dimensões Avaliadas

1. **Visão:** Propósito compartilhado, foco na experiência do paciente/usuário e metas claras de futuro.
2. **Prioridades:** Foco nos gargalos e problemas reais antes de escolher ferramentas tecnológicas.
3. **Experimentação:** Testes pilotos rápidos, aprendizado com evidências reais e agilidade para corrigir o rumo.
4. **Governança:** Clareza de papéis, autonomia para melhorias pontuais e remoção de barreiras burocráticas.
5. **Capacidades:** Integração entre sistemas, dados confiáveis, capacitação das pessoas e cultura colaborativa.

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- **Node.js** (v18 ou superior)
- **npm** (v9 ou superior)

### Passo a passo
1. Clone ou abra a pasta do projeto no seu terminal:
   ```bash
   cd projetos/transformacao-digital
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

---

## 🎯 Modo Demonstração (Acesso com Hash Secreto)

Para apresentar ou demonstrar a ferramenta sem precisar digitar manualmente todas as respostas, acesse a URL com o hash `#demo`:

```text
http://localhost:5173/#demo
```
*(ou em produção: `https://seu-dominio.vercel.app/#demo`)*

### Cenário Real Pré-carregado:
- **Processo:** *Admissão e Autorização de Exames e Procedimentos Especializados* (Centro Médico Curitiba)
- **Desafio Real:** Desconexão entre o prontuário eletrônico e os portais das operadoras de saúde (TISS/TUSS), digitação duplicada de guias, filas no atendimento e risco de glosas.
- **5 Dimensões Avaliadas:** Todas as 25 perguntas e observações já classificadas de forma autêntica e realista.
- **Navegação Livre:** Todos os passos ficam disponíveis no menu de progresso para avançar ou voltar à vontade durante sua apresentação.
   Acesse a aplicação no navegador em: `http://localhost:5173`

4. Para gerar o build de produção:
   ```bash
   npm run build
   ```
   Os arquivos estáticos otimizados serão gerados na pasta `dist/`.

5. Para testar o build localmente:
   ```bash
   npm run preview
   ```

---

## ☁️ Publicação na Vercel

O projeto foi configurado com arquivo `vercel.json` e build estático pelo **Vite**:

1. Conecte o repositório Git ao painel da [Vercel](https://vercel.com).
2. As seguintes configurações serão detectadas automaticamente:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Clique em **Deploy**. A aplicação estará no ar imediatamente como um site estático de alta performance e custo zero de infraestrutura.

---

## 🎨 Princípios de Design Aplicados

Conforme orientações da especificação técnica:
- Os princípios de microinterações discretas, fluidez de estados e foco funcional inspirados em **Emil Kowalski** foram aplicados manualmente (transições suaves com `ease-out`, estados hover/active táteis e suporte a `prefers-reduced-motion`).
- Os padrões de acabamento, hierarquia visual nítida, consistência de espaçamentos e acessibilidade de contrastes inspirados no guia **Impeccable** foram incorporados através de Tailwind CSS e Google Fonts oficiais da marca.

---

## 📄 Licença e Confidencialidade

Aplicação desenvolvida para o Centro Médico Curitiba. Todos os dados permanecem confidenciais sob posse exclusiva do usuário.

