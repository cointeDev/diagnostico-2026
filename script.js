// =========================================================================
// 0. CONFIGURAÇÃO DE CORES E FONTES DO TAILWIND CSS
// =========================================================================
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        cointe: {
          950: "#081a33",
          900: "#0f294a",
          800: "#163b69",
          700: "#1d4ed8",
          600: "#0284c7",
          500: "#0ea5e9",
          100: "#e0f2fe",
          50: "#f0f9ff",
        },
      },
    },
  },
};

// =========================================================================
// 1. DADOS REAIS DA AVALIAÇÃO ANUAL 2026 (n = 8)
// =========================================================================
const likertDimensions = [
  {
    code: "Q1",
    shortLabel: "Atuação Geral da Coordenação (Q1)",
    fullLabel: "Atuação geral da Coordenação Pedagógica (Q1)",
    mean: 4.38,
    median: "4,0",
    sd: "0,52",
    approval: "100,0% (8/8)",
    dist: { n2: 0, n3: 0, n4: 5, n5: 3 },
  },
  {
    code: "Q29",
    shortLabel: "Alimentação nas Formações (Q29)",
    fullLabel: "Alimentação nas formações presenciais (Q29)",
    mean: 4.13,
    median: "4,0",
    sd: "0,64",
    approval: "87,5% (7/8)",
    dist: { n2: 0, n3: 1, n4: 5, n5: 2 },
  },
  {
    code: "Q2",
    shortLabel: "Clareza da Comunicação (Q2)",
    fullLabel: "Clareza e consistência da comunicação (Q2)",
    mean: 4.0,
    median: "4,0",
    sd: "0,93",
    approval: "62,5% (5/8)",
    dist: { n2: 0, n3: 3, n4: 2, n5: 3 },
  },
  {
    code: "Q4",
    shortLabel: "Apoio Pedagógico Anual (Q4)",
    fullLabel: "Apoio pedagógico ao longo do ano (Q4)",
    mean: 3.88,
    median: "4,0",
    sd: "0,83",
    approval: "62,5% (5/8)",
    dist: { n2: 0, n3: 3, n4: 3, n5: 2 },
  },
  {
    code: "Q24",
    shortLabel: "Organização das Formações (Q24)",
    fullLabel:
      "Organização das formações: objetivos, cronograma, materiais (Q24)",
    mean: 3.88,
    median: "4,0",
    sd: "0,64",
    approval: "75,0% (6/8)",
    dist: { n2: 0, n3: 2, n4: 5, n5: 1 },
  },
  {
    code: "Q27",
    shortLabel: "Estruturas Físicas Presenciais (Q27)",
    fullLabel: "Estruturas físicas das formações presenciais (Q27)",
    mean: 3.88,
    median: "4,0",
    sd: "0,64",
    approval: "75,0% (6/8)",
    dist: { n2: 0, n3: 2, n4: 5, n5: 1 },
  },
  {
    code: "Q32",
    shortLabel: "Contribuição das Parcerias (Q32)",
    fullLabel: "Contribuição das parcerias nas ações formativas (Q32)",
    mean: 3.88,
    median: "4,0",
    sd: "0,83",
    approval: "62,5% (5/8)",
    dist: { n2: 0, n3: 3, n4: 3, n5: 2 },
  },
  {
    code: "Q8",
    shortLabel: "Coerência dos Processos (Q8)",
    fullLabel: "Coerência dos processos com as necessidades da equipe (Q8)",
    mean: 3.75,
    median: "3,0",
    sd: "1,04",
    approval: "37,5% (3/8)",
    dist: { n2: 0, n3: 5, n4: 0, n5: 3 },
  },
  {
    code: "Q28",
    shortLabel: "Materiais de Expediente (Q28)",
    fullLabel: "Aquisição de materiais de expediente para formações (Q28)",
    mean: 3.75,
    median: "4,0",
    sd: "0,89",
    approval: "75,0% (6/8)",
    dist: { n2: 1, n3: 1, n4: 5, n5: 1 },
  },
  {
    code: "Q7",
    shortLabel: "Processos Pedagógicos (Q7)",
    fullLabel: "Organização dos processos pedagógicos (Q7)",
    mean: 3.63,
    median: "3,5",
    sd: "1,06",
    approval: "50,0% (4/8)",
    dist: { n2: 1, n3: 3, n4: 2, n5: 2 },
  },
];

// Variáveis globais para armazenar as instâncias dos gráficos e estados
let chartRankingInstance = null;
let chartStackedInstance = null;
let tab2ChartsInitialized = false;
let stackedMode = "count"; // 'count' ou 'percent'

// =========================================================================
// 2. INICIALIZAÇÃO DOS GRÁFICOS DA ABA 1
// =========================================================================
function initTab1Charts() {
  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.color = "#334155";

  // Gráfico 1: Barras Horizontais (Ranking Likert)
  const canvasRanking = document.getElementById("chartLikertRanking");
  if (!canvasRanking) return;

  const ctxRanking = canvasRanking.getContext("2d");
  const barColors = likertDimensions.map((item) => {
    if (item.mean >= 4.0) return "#059669"; // Verde (Emerald 600)
    if (item.mean >= 3.8) return "#0284c7"; // Azul (Sky 600)
    return "#e11d48"; // Vermelho (Rose 600)
  });

  chartRankingInstance = new Chart(ctxRanking, {
    type: "bar",
    data: {
      labels: likertDimensions.map((d) => d.shortLabel),
      datasets: [
        {
          label: "Média (1 a 5)",
          data: likertDimensions.map((d) => d.mean),
          backgroundColor: barColors,
          borderRadius: 6,
          barPercentage: 0.72,
        },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          min: 0,
          max: 5,
          ticks: { stepSize: 1, font: { size: 11, weight: "600" } },
          grid: { color: "#f1f5f9" },
        },
        y: {
          ticks: { font: { size: 11, weight: "600" }, color: "#1e293b" },
          grid: { display: false },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#0f294a",
          padding: 12,
          cornerRadius: 10,
          callbacks: {
            title: (items) => likertDimensions[items[0].dataIndex].fullLabel,
            label: (ctx) => {
              const d = likertDimensions[ctx.dataIndex];
              return [
                ` Média: ${d.mean.toFixed(2).replace(".", ",")} / 5,00`,
                ` Mediana: ${d.median} | Desvio Padrão: ${d.sd}`,
                ` Aprovação (Notas 4 e 5): ${d.approval}`,
              ];
            },
          },
        },
      },
    },
  });

  // Gráfico 2: Barras Empilhadas (renderiza apenas se o canvas existir no HTML)
  renderStackedChart("count");
}

function renderStackedChart(mode) {
  const canvasStacked = document.getElementById("chartLikertStacked");
  if (!canvasStacked) return;

  const ctxStacked = canvasStacked.getContext("2d");
  if (chartStackedInstance) {
    chartStackedInstance.destroy();
  }

  const factor = mode === "percent" ? 12.5 : 1; // 1 respondente = 12,5% (n=8)

  chartStackedInstance = new Chart(ctxStacked, {
    type: "bar",
    data: {
      labels: likertDimensions.map((d) => d.code),
      datasets: [
        {
          label: "Nota 2 (Insatisfeito)",
          data: likertDimensions.map((d) => d.dist.n2 * factor),
          backgroundColor: "#e11d48",
          borderRadius: 3,
        },
        {
          label: "Nota 3 (Neutro)",
          data: likertDimensions.map((d) => d.dist.n3 * factor),
          backgroundColor: "#f59e0b",
          borderRadius: 3,
        },
        {
          label: "Nota 4 (Satisfeito)",
          data: likertDimensions.map((d) => d.dist.n4 * factor),
          backgroundColor: "#0ea5e9",
          borderRadius: 3,
        },
        {
          label: "Nota 5 (Muito Satisfeito)",
          data: likertDimensions.map((d) => d.dist.n5 * factor),
          backgroundColor: "#059669",
          borderRadius: 3,
        },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true,
          min: 0,
          max: mode === "percent" ? 100 : 8,
          ticks: {
            stepSize: mode === "percent" ? 25 : 2,
            font: { size: 11, weight: "600" },
            callback: (val) => (mode === "percent" ? `${val}%` : val),
          },
          grid: { color: "#f1f5f9" },
        },
        y: {
          stacked: true,
          ticks: { font: { size: 11, weight: "700" }, color: "#1e293b" },
          grid: { display: false },
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 12,
            usePointStyle: true,
            pointStyle: "rectRounded",
            font: { size: 11, weight: "600" },
          },
        },
        tooltip: {
          backgroundColor: "#0f294a",
          padding: 12,
          cornerRadius: 10,
          callbacks: {
            title: (items) => likertDimensions[items[0].dataIndex].fullLabel,
            label: (ctx) => {
              const rawVal = ctx.raw;
              const count =
                mode === "percent" ? Math.round(rawVal / 12.5) : rawVal;
              const pct = (count * 12.5).toFixed(1).replace(".", ",");
              return ` ${ctx.dataset.label}: ${count} de 8 (${pct}%)`;
            },
          },
        },
      },
    },
  });
}

function toggleStackedMode(mode) {
  stackedMode = mode;
  const btnCount = document.getElementById("btnStackCount");
  const btnPercent = document.getElementById("btnStackPercent");

  if (btnCount && btnPercent) {
    if (mode === "count") {
      btnCount.className =
        "px-2.5 py-1 rounded-lg text-xs font-semibold bg-white text-cointe-900 shadow-xs cursor-pointer transition-all";
      btnPercent.className =
        "px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer transition-all";
    } else {
      btnPercent.className =
        "px-2.5 py-1 rounded-lg text-xs font-semibold bg-white text-cointe-900 shadow-xs cursor-pointer transition-all";
      btnCount.className =
        "px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer transition-all";
    }
  }
  renderStackedChart(mode);
}

// =========================================================================
// 3. INICIALIZAÇÃO DOS GRÁFICOS DE ROSCA DA ABA 2
// =========================================================================
function initTab2Charts() {
  if (tab2ChartsInitialized) return;
  tab2ChartsInitialized = true;

  const commonDonutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "62%",
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 10,
          padding: 10,
          usePointStyle: true,
          pointStyle: "circle",
          font: { size: 11, weight: "600" },
        },
      },
      tooltip: {
        backgroundColor: "#0f294a",
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (ctx) => {
            const val = ctx.raw;
            const pct = (val * 12.5).toFixed(1).replace(".", ",");
            return ` ${ctx.label}: ${val} resp. (${pct}%)`;
          },
        },
      },
    },
  };

  // Rosca 1: Eventos Externos (Q15)
  new Chart(document.getElementById("chartDonutEventos"), {
    type: "doughnut",
    data: {
      labels: ["Todos (25%)", "Parcialmente (50%)", "Não informado (25%)"],
      datasets: [
        {
          data: [2, 4, 2],
          backgroundColor: ["#059669", "#f59e0b", "#e11d48"],
          borderWidth: 2,
          borderColor: "#ffffff",
        },
      ],
    },
    options: commonDonutOptions,
  });

  // Rosca 2: Informação sobre Parcerias (Q31)
  new Chart(document.getElementById("chartDonutParcerias"), {
    type: "doughnut",
    data: {
      labels: ["Integralmente (50%)", "Parcialmente (50%)"],
      datasets: [
        {
          data: [4, 4],
          backgroundColor: ["#0284c7", "#f59e0b"],
          borderWidth: 2,
          borderColor: "#ffffff",
        },
      ],
    },
    options: commonDonutOptions,
  });

  // Rosca 3: Qualidade Formações Presenciais (Q20)
  new Chart(document.getElementById("chartDonutPresencial"), {
    type: "doughnut",
    data: {
      labels: [
        "Muito satisfatória (12,5%)",
        "Satisfatória (75%)",
        "N/A (12,5%)",
      ],
      datasets: [
        {
          data: [1, 6, 1],
          backgroundColor: ["#059669", "#10b981", "#94a3b8"],
          borderWidth: 2,
          borderColor: "#ffffff",
        },
      ],
    },
    options: commonDonutOptions,
  });

  // Rosca 4: Contribuição Formações Virtuais (Q22)
  new Chart(document.getElementById("chartDonutVirtual"), {
    type: "doughnut",
    data: {
      labels: [
        "Muito satisfatória (12,5%)",
        "Satisfatória (62,5%)",
        "N/A (25%)",
      ],
      datasets: [
        {
          data: [1, 5, 2],
          backgroundColor: ["#4f46e5", "#6366f1", "#94a3b8"],
          borderWidth: 2,
          borderColor: "#ffffff",
        },
      ],
    },
    options: commonDonutOptions,
  });
}

// =========================================================================
// 4. NAVEGAÇÃO POR ABAS & MODO APRESENTAÇÃO
// =========================================================================
function switchTab(tabId) {
  // Oculta todas as abas
  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.add("hidden");
  });

  // Reseta estilos dos botões de aba
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("bg-white", "text-cointe-900", "shadow-sm");
    btn.classList.add("text-sky-100", "hover:bg-white/10");
    const icon = btn.querySelector("svg");
    if (icon) icon.classList.remove("text-sky-600");
  });

  // Exibe a aba selecionada
  const targetPanel = document.getElementById(tabId);
  if (targetPanel) {
    targetPanel.classList.remove("hidden");
  }

  // Destaca o botão da aba ativa
  const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
  if (activeBtn) {
    activeBtn.classList.remove("text-sky-100", "hover:bg-white/10");
    activeBtn.classList.add("bg-white", "text-cointe-900", "shadow-sm");
    const icon = activeBtn.querySelector("svg");
    if (icon) icon.classList.add("text-sky-600");
  }

  // Inicializa os gráficos da Aba 2 apenas na primeira vez que ela for aberta
  if (tabId === "tab2") {
    requestAnimationFrame(() => {
      initTab2Charts();
    });
  }
}

function togglePresentationMode() {
  const body = document.body;
  const isPresenting = body.classList.toggle("presentation-mode");
  const btn = document.getElementById("btnPresentationMode");
  const label = document.getElementById("labelPresentation");

  if (isPresenting) {
    btn.className =
      "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-amber-400 hover:bg-amber-300 text-cointe-950 border border-amber-300 transition-all shadow-md cursor-pointer";
    label.textContent = "Sair do Modo Apresentação";
  } else {
    btn.className =
      "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all shadow-sm cursor-pointer";
    label.textContent = "Modo Apresentação";
  }

  // Redimensiona os gráficos ativos para acompanhar a nova largura da tela
  setTimeout(() => {
    window.dispatchEvent(new Event("resize"));
  }, 150);
}

// =========================================================================
// 5. FILTROS INTERATIVOS (ABA 2 E ABA 3)
// =========================================================================
function filterQualitative(category) {
  document.querySelectorAll(".q-filter-btn").forEach((btn) => {
    if (btn.dataset.qfilter === category) {
      btn.className =
        "q-filter-btn px-3.5 py-2 rounded-xl text-xs font-semibold bg-cointe-900 text-white shadow-xs cursor-pointer transition-all";
    } else {
      btn.className =
        "q-filter-btn px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer transition-all";
    }
  });

  const grid = document.getElementById("qualitativeCardsGrid");
  const cards = document.querySelectorAll(".q-card");
  cards.forEach((card) => {
    if (category === "todos" || card.dataset.qcategory === category) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });

  // Ajusta o grid para 1 coluna se apenas um filtro estiver selecionado
  if (category === "todos") {
    grid.classList.add("md:grid-cols-2");
  } else {
    grid.classList.remove("md:grid-cols-2");
  }
}

function filterAxis(axisId) {
  document.querySelectorAll(".a-filter-btn").forEach((btn) => {
    if (btn.dataset.afilter === axisId) {
      btn.className =
        "a-filter-btn px-3.5 py-2 rounded-xl text-xs font-semibold bg-white text-cointe-900 shadow-xs cursor-pointer transition-all";
    } else {
      btn.className =
        "a-filter-btn px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-white/20 cursor-pointer transition-all";
    }
  });

  const grid = document.getElementById("axisCardsGrid");
  document.querySelectorAll(".axis-card").forEach((card) => {
    if (axisId === "todos" || card.dataset.axis === axisId) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });

  if (axisId === "todos") {
    grid.classList.add("lg:grid-cols-2");
  } else {
    grid.classList.remove("lg:grid-cols-2");
  }
}

// =========================================================================
// 6. INICIALIZAÇÃO AO CARREGAR A PÁGINA
// =========================================================================
window.onload = function () {
  try {
    if (window.lucide) {
      lucide.createIcons();
    }
    initTab1Charts();
  } catch (err) {
    console.error("Erro ao inicializar componentes do painel:", err);
  }
};
