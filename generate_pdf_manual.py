import base64
import subprocess
import os

# Read and encode logo
with open('marca-vertical-centromedico-curitiba-positivo-colorido.png', 'rb') as f:
    logo_base64 = base64.b64encode(f.read()).decode('utf-8')

html_content = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Manual de Uso • Diagnóstico de Transformação Digital</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400&family=Open+Sans:ital,wght@0,400;0,600;0,700;1,400&family=Work+Sans:ital,wght@0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet">
  <style>
    @page {{
      size: A4;
      margin: 14mm 15mm 14mm 15mm;
    }}
    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}
    body {{
      font-family: 'Open Sans', system-ui, -apple-system, sans-serif;
      color: #1E293B;
      line-height: 1.45;
      font-size: 11pt;
      background: #FFFFFF;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }}
    h1, h2, h3, h4 {{
      font-family: 'Work Sans', sans-serif;
      letter-spacing: -0.01em;
      color: #1A4A7A;
    }}
    .font-subheading {{
      font-family: 'Lato', sans-serif;
    }}

    /* Header */
    .header {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid #1A4A7A;
      padding-bottom: 12px;
      margin-bottom: 16px;
    }}
    .header-logo {{
      height: 52px;
      width: auto;
    }}
    .header-titles {{
      text-align: right;
    }}
    .header-titles h1 {{
      font-size: 17pt;
      font-weight: 800;
      color: #1A4A7A;
      line-height: 1.15;
    }}
    .header-titles p {{
      font-size: 9.5pt;
      color: #64748B;
      font-weight: 600;
      margin-top: 2px;
    }}

    /* Hero Banner */
    .hero-banner {{
      background: linear-gradient(135deg, #F0F5FA 0%, #E2ECF7 100%);
      border: 1px solid #CBD5E1;
      border-left: 5px solid #00B5CC;
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }}
    .hero-text h2 {{
      font-size: 12pt;
      font-weight: 700;
      color: #1A4A7A;
      margin-bottom: 3px;
    }}
    .hero-text p {{
      font-size: 9pt;
      color: #334155;
      line-height: 1.35;
    }}
    .badge-demo {{
      background: #1A4A7A;
      color: #FFFFFF;
      font-family: 'Work Sans', sans-serif;
      font-size: 8pt;
      font-weight: 700;
      padding: 4px 8px;
      border-radius: 4px;
      white-space: nowrap;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }}

    /* Workflow Pills */
    .flowchart {{
      display: flex;
      justify-content: space-between;
      gap: 6px;
      margin-bottom: 18px;
    }}
    .flow-step {{
      flex: 1;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 6px;
      padding: 8px 10px;
      text-align: center;
    }}
    .flow-step.active {{
      background: #1A4A7A;
      border-color: #1A4A7A;
      color: #FFFFFF;
    }}
    .flow-step.active .flow-num {{
      background: #00B5CC;
      color: #FFFFFF;
    }}
    .flow-step.active .flow-title {{
      color: #FFFFFF;
    }}
    .flow-num {{
      display: inline-block;
      width: 18px;
      height: 18px;
      line-height: 18px;
      border-radius: 50%;
      background: #E2E8F0;
      color: #1A4A7A;
      font-size: 7.5pt;
      font-weight: 800;
      margin-bottom: 3px;
    }}
    .flow-title {{
      font-family: 'Work Sans', sans-serif;
      font-size: 8pt;
      font-weight: 700;
      color: #1E293B;
      display: block;
    }}

    /* Step Cards */
    .step-card {{
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      margin-bottom: 12px;
      background: #FFFFFF;
      overflow: hidden;
      page-break-inside: avoid;
    }}
    .step-card-header {{
      background: #F8FAFC;
      border-bottom: 1px solid #E2E8F0;
      padding: 8px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }}
    .step-card-header-left {{
      display: flex;
      align-items: center;
      gap: 8px;
    }}
    .step-badge {{
      background: #1A4A7A;
      color: #FFFFFF;
      font-size: 8pt;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 4px;
    }}
    .step-title {{
      font-size: 11pt;
      font-weight: 700;
      color: #1A4A7A;
    }}
    .step-card-body {{
      padding: 12px 14px;
      font-size: 9.5pt;
      color: #334155;
    }}

    /* Grid layout */
    .grid-2 {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 6px;
    }}
    .sub-box {{
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 6px;
      padding: 8px 10px;
    }}
    .sub-box strong {{
      color: #1A4A7A;
      font-size: 8.5pt;
      display: block;
      margin-bottom: 2px;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }}
    .sub-box p {{
      font-size: 8.5pt;
      color: #475569;
      line-height: 1.35;
    }}

    /* Dimension list */
    .dimension-item {{
      display: flex;
      align-items: flex-start;
      gap: 8px;
      margin-bottom: 5px;
    }}
    .dim-tag {{
      background: #F0F5FA;
      color: #1A4A7A;
      font-size: 7.5pt;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 3px;
      white-space: nowrap;
      border: 1px solid #DCE7F3;
      margin-top: 1px;
    }}

    /* Options pills */
    .options-row {{
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px dashed #CBD5E1;
    }}
    .opt-pill {{
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      border-radius: 4px;
      font-size: 7.5pt;
      padding: 3px 6px;
      color: #334155;
      font-weight: 600;
    }}

    /* Code block */
    .code-pill {{
      font-family: monospace;
      background: #1E293B;
      color: #00B5CC;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 8pt;
    }}

    /* Callout */
    .callout-success {{
      background: #ECFDF5;
      border: 1px solid #A7F3D0;
      border-left: 4px solid #10B981;
      border-radius: 6px;
      padding: 8px 12px;
      margin-top: 8px;
      font-size: 8.5pt;
      color: #065F46;
      line-height: 1.35;
    }}

    .page-break {{
      page-break-before: always;
    }}

    /* Footer */
    .footer {{
      margin-top: 14px;
      padding-top: 8px;
      border-top: 1px solid #E2E8F0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 8pt;
      color: #64748B;
    }}
  </style>
</head>
<body>

  <!-- Page 1 -->
  <div class="header">
    <img src="data:image/png;base64,{logo_base64}" class="header-logo" alt="Centro Médico Curitiba">
    <div class="header-titles">
      <h1>Manual de Uso Rápido</h1>
      <p class="font-subheading">Diagnóstico de Transformação Digital de Processos • Metodologia Base Rogers</p>
    </div>
  </div>

  <div class="hero-banner">
    <div class="hero-text">
      <h2>Transforme processos em planos de ação práticos com IA</h2>
      <p>Este guia orienta como utilizar a ferramenta para mapear gargalos, avaliar as 5 dimensões e gerar automaticamente um relatório executivo em PDF no ChatGPT ou Claude.</p>
    </div>
    <div class="badge-demo">
      100% Local & Privado
    </div>
  </div>

  <div class="flowchart">
    <div class="flow-step">
      <span class="flow-num">1</span>
      <span class="flow-title">Acesso</span>
    </div>
    <div class="flow-step">
      <span class="flow-num">2</span>
      <span class="flow-title">Contexto</span>
    </div>
    <div class="flow-step">
      <span class="flow-num">3</span>
      <span class="flow-title">5 Dimensões</span>
    </div>
    <div class="flow-step active">
      <span class="flow-num">4</span>
      <span class="flow-title">Copiar Instrução</span>
    </div>
    <div class="flow-step active">
      <span class="flow-num">5</span>
      <span class="flow-title">Gerar PDF na IA</span>
    </div>
  </div>

  <!-- Passo 1 -->
  <div class="step-card">
    <div class="step-card-header">
      <div class="step-card-header-left">
        <span class="step-badge">PASSO 1</span>
        <span class="step-title">Acessar a Ferramenta</span>
      </div>
      <span style="font-size: 8pt; color: #64748B; font-weight: 600;">Navegador Web</span>
    </div>
    <div class="step-card-body">
      <p>Abra o link da aplicação no seu navegador (Google Chrome, Edge, Firefox ou Safari):</p>
      <div class="grid-2">
        <div class="sub-box">
          <strong>Modo Normal (Novo Diagnóstico)</strong>
          <p>Acesse a página inicial e clique em <strong>"Iniciar Diagnóstico"</strong> para preencher o formulário do zero com os dados do seu setor.</p>
        </div>
        <div class="sub-box" style="border-color: #00B5CC; background: #F0FBFD;">
          <strong style="color: #008294;">Modo Demonstração (Com Hash Secreto)</strong>
          <p>Adicione <span class="code-pill">#demo</span> na URL (ex: <code style="font-size: 7.5pt;">http://localhost:5173/#demo</code>) para carregar instantaneamente um caso real de saúde pré-preenchido para apresentações.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Passo 2 -->
  <div class="step-card">
    <div class="step-card-header">
      <div class="step-card-header-left">
        <span class="step-badge">PASSO 2</span>
        <span class="step-title">Preencher o Contexto do Processo</span>
      </div>
      <span style="font-size: 8pt; color: #64748B; font-weight: 600;">5 Campos Essenciais</span>
    </div>
    <div class="step-card-body">
      <p>Preencha os campos obrigatórios com linguagem simples e factual sobre a rotina avaliada:</p>
      <div class="grid-2">
        <div class="sub-box">
          <strong>1. Nome do Processo</strong>
          <p>Como a rotina é conhecida (ex: <em>Admissão e Autorização Ambulatorial</em>).</p>
        </div>
        <div class="sub-box">
          <strong>2. Área Responsável</strong>
          <p>Setor líder do processo (ex: <em>Central de Atendimento / Recepção</em>).</p>
        </div>
        <div class="sub-box">
          <strong>3. Objetivo Principal</strong>
          <p>Qual resultado deve entregar (ex: <em>Garantir agendamento sem filas</em>).</p>
        </div>
        <div class="sub-box">
          <strong>4. Como Funciona Hoje</strong>
          <p>Resumo das etapas atuais (desde o pedido do paciente até o atendimento).</p>
        </div>
      </div>
      <div class="sub-box" style="margin-top: 6px; border-color: #FCA5A5; background: #FFF5F5;">
        <strong style="color: #B91C1C;">5. Principal Dor ou Gargalo</strong>
        <p style="color: #7F1D1D;">O que mais desacelera ou gera retrabalho (ex: <em>Redigitação manual de dados entre prontuário e portais de convênios</em>).</p>
      </div>
      <p style="font-size: 8pt; color: #64748B; margin-top: 6px; font-style: italic;">
        * Informações complementares (sistemas, volume diário e envolvidos) são opcionais.
      </p>
    </div>
  </div>

  <div class="footer">
    <span>Centro Médico Curitiba • Manual de Uso</span>
    <span>Página 1 de 2</span>
  </div>

  <!-- Page 2 -->
  <div class="page-break"></div>

  <div class="header">
    <img src="data:image/png;base64,{logo_base64}" class="header-logo" alt="Centro Médico Curitiba">
    <div class="header-titles">
      <h1>Manual de Uso Rápido</h1>
      <p class="font-subheading">Avaliação das 5 Dimensões e Geração do PDF</p>
    </div>
  </div>

  <!-- Passo 3 -->
  <div class="step-card">
    <div class="step-card-header">
      <div class="step-card-header-left">
        <span class="step-badge">PASSO 3</span>
        <span class="step-title">Avaliar as 5 Dimensões de Transformação</span>
      </div>
      <span style="font-size: 8pt; color: #64748B; font-weight: 600;">David L. Rogers</span>
    </div>
    <div class="step-card-body">
      <p style="margin-bottom: 8px;">Para cada dimensão, marque a opção objetiva que melhor descreve o cenário real:</p>
      
      <div class="dimension-item">
        <span class="dim-tag">1. Visão</span>
        <p style="font-size: 8.5pt;">Propósito claro para quem executa, foco na experiência do paciente e metas de futuro.</p>
      </div>
      <div class="dimension-item">
        <span class="dim-tag">2. Prioridades</span>
        <p style="font-size: 8.5pt;">Foco nos problemas críticos antes de pensar na compra de softwares ou tecnologias.</p>
      </div>
      <div class="dimension-item">
        <span class="dim-tag">3. Experimentação</span>
        <p style="font-size: 8.5pt;">Testes pilotos em escala reduzida, validação com evidências reais e agilidade de ajuste.</p>
      </div>
      <div class="dimension-item">
        <span class="dim-tag">4. Governança</span>
        <p style="font-size: 8.5pt;">Papéis claros, autonomia para a equipe operacional e eliminação de rotinas burocráticas.</p>
      </div>
      <div class="dimension-item">
        <span class="dim-tag">5. Capacidades</span>
        <p style="font-size: 8.5pt;">Sistemas integrados, dados confiáveis, equipe treinada e automação de rotinas mecânicas.</p>
      </div>

      <div class="options-row">
        <span class="opt-pill">Não acontece / Não existe</span>
        <span class="opt-pill">Acontece raramente</span>
        <span class="opt-pill">Acontece em parte</span>
        <span class="opt-pill">Na maioria das vezes</span>
        <span class="opt-pill">De forma consistente</span>
        <span class="opt-pill" style="color: #64748B;">Não sei informar / N/A</span>
      </div>
    </div>
  </div>

  <!-- Passo 4 e 5 -->
  <div class="step-card">
    <div class="step-card-header">
      <div class="step-card-header-left">
        <span class="step-badge" style="background: #00B5CC;">PASSOS 4 & 5</span>
        <span class="step-title">Copiar a Instrução e Gerar o PDF na IA</span>
      </div>
      <span style="font-size: 8pt; color: #008294; font-weight: 700;">1 Clique</span>
    </div>
    <div class="step-card-body">
      <div class="grid-2">
        <div class="sub-box" style="border-left: 3px solid #1A4A7A;">
          <strong>Passo 4: Na Ferramenta</strong>
          <p>1. Revise as respostas na tela de <strong>Revisão</strong>.</p>
          <p>2. Clique em <strong>"Avançar para Instrução"</strong>.</p>
          <p>3. Clique no botão azul: <strong style="color: #1A4A7A;">"Copiar instrução"</strong>.</p>
          <p style="margin-top: 4px; font-size: 8pt; color: #10B981; font-weight: 600;">✓ Tudo é copiado para a área de transferência.</p>
        </div>
        <div class="sub-box" style="border-left: 3px solid #00B5CC;">
          <strong>Passo 5: No ChatGPT ou Claude</strong>
          <p>1. Abra uma nova conversa no ChatGPT ou Claude.</p>
          <p>2. Dê <strong>Ctrl + V</strong> (colar) e envie.</p>
          <p>3. A IA analisará todo o diagnóstico e entregará:</p>
          <p style="font-size: 8pt; color: #1E293B; margin-top: 3px;">
            • Diagnóstico executivo sintético.<br>
            • <strong>Plano de Ação estruturado em tabela</strong> (Curto, Médio e Longo Prazo).<br>
            • <strong>Link de download do arquivo PDF formatado</strong>.
          </p>
        </div>
      </div>

      <div class="callout-success">
        <strong>💡 Sem retrabalho:</strong> O texto copiado já inclui o comando mandatório para a IA gerar o PDF enxuto e diagramado (2 a 3 páginas). Você não precisa digitar comandos adicionais.
      </div>
    </div>
  </div>

  <!-- Destaques de Privacidade -->
  <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; padding: 10px 14px; font-size: 8.5pt; color: #475569; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <strong style="color: #1A4A7A; display: block;">🔒 Privacidade e Proteção de Dados:</strong>
      Nenhuma resposta ou dado de processo é salvo em nuvem. Toda a digitação ocorre 100% no seu navegador.
    </div>
    <div style="font-weight: 700; color: #059669; font-size: 8pt; text-align: right; white-space: nowrap; margin-left: 10px;">
      ✓ Sem Servidor Externo<br>✓ Sem Cadastro ou Login
    </div>
  </div>

  <div class="footer">
    <span>Centro Médico Curitiba • Adventist Health Brasil</span>
    <span>Página 2 de 2</span>
  </div>

</body>
</html>
"""

# Write HTML file
with open('manual_temp.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

# Run chrome headless print to pdf
output_pdf = "Manual_de_Uso_Diagnostico_Transformacao_Digital.pdf"
cmd = [
    "/usr/bin/google-chrome",
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    f"--print-to-pdf={output_pdf}",
    "--print-to-pdf-no-header",
    "manual_temp.html"
]

print("Running command:", " ".join(cmd))
res = subprocess.run(cmd, capture_output=True, text=True)
print("Return code:", res.returncode)
if res.stderr:
    print("Stderr:", res.stderr)

if os.path.exists(output_pdf):
    print(f"Success! PDF generated: {output_pdf} ({os.path.getsize(output_pdf)} bytes)")
    if os.path.exists('manual_temp.html'):
        os.remove('manual_temp.html')
else:
    print("Failed to generate PDF")
