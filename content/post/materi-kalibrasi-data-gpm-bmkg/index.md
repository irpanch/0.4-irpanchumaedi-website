---
title: "Kalibrasi Data GPM dengan Data BMKG"
summary: "Koreksi bias GPM IMERG V07 menggunakan metode Year-Specific Scaling Factor (M4). Studi kasus Kalimantan Selatan: PBIAS dari −31.9% menjadi +3.5% dan NSE dari −1.06 menjadi 0.77."
authors: ["irpan-chumaedi"]
tags: ["GPM", "BMKG", "kalibrasi", "hidrologi", "data satelit", "R"]
categories: ["Hidrologi"]
date: 2024-02-01
lastmod: 2024-02-01
draft: false
description: "Tutorial kalibrasi data GPM IMERG V07 dengan data BMKG menggunakan metode Year-Specific Scaling Factor (M4). Lengkap dengan visualisasi, metrik validasi, dan kode R."
modul_hecras: true
reading_time: true
share: true
toc: false
---

{{< rawhtml >}}
<style>
.materi-kalibrasi {
  --navy:#0A2342; --blue:#185fa5; --blue-mid:#378add; --blue-light:#85b7eb; --blue-pale:#e6f1fb;
  --red:#B91C1C; --red-light:#fee2e2; --navy2:#1A5276;
  --amber:#B45309; --amber-light:#fef3c7;
  --purple:#6D28D9; --purple-light:#ede9fe;
  --green:#1d6f42; --green-light:#d1fae5;
  --gray-100:#f8fafc; --gray-200:#e2e8f0; --gray-300:#cbd5e1;
  --gray-500:#64748b; --gray-600:#475569; --gray-700:#334155; --gray-900:#0f172a;
  --radius:10px; --radius-sm:6px;
  --shadow:0 2px 12px rgba(0,0,0,0.07);
  --shadow-md:0 4px 20px rgba(0,0,0,0.10);
  --code-bg:#1e1e2e;
}


.materi-kalibrasi, .materi-kalibrasi *::before, .materi-kalibrasi *::after {box-sizing:border-box;margin:0;padding:0;}



/.materi-kalibrasi * STICKY NAV */
.sticky-nav {position:sticky;top:0;z-index:200;background:#fff;border-bottom:1px solid var(--gray-200);box-shadow:var(--shadow);}
.materi-kalibrasi .sticky-inner {max-width:900px;margin:0 auto;padding:0 1.25rem;display:flex;align-items:center;gap:1rem;height:52px;}
.materi-kalibrasi .sticky-title {font-size:13px;font-weight:600;color:var(--navy);white-space:nowrap;}
.materi-kalibrasi .progress-track {flex:1;height:4px;background:var(--gray-200);border-radius:2px;}
.materi-kalibrasi .progress-fill {height:100%;background:linear-gradient(90deg,var(--blue),var(--purple));border-radius:2px;width:0%;transition:width 0.3s;}
.materi-kalibrasi .sticky-pct {font-size:12px;color:var(--gray-500);min-width:32px;}

/.materi-kalibrasi * FLOATING TOC */
.toc-float {position:fixed;top:80px;right:0;width:180px;background:#fff;border:1px solid var(--gray-200);border-right:none;border-radius:var(--radius) 0 0 var(--radius);box-shadow:-2px 4px 16px rgba(0,0,0,0.09);z-index:150;transition:all 0.28s cubic-bezier(0.4,0,0.2,1);overflow:hidden;}
.materi-kalibrasi .toc-float.collapsed {width:32px;}
.materi-kalibrasi .toc-head {display:flex;align-items:center;justify-content:space-between;padding:8px 10px 8px 12px;border-bottom:1px solid var(--gray-200);cursor:pointer;user-select:none;background:var(--navy);border-radius:var(--radius) 0 0 0;}
.materi-kalibrasi .toc-head:hover {background:#1a3a5c;}
.materi-kalibrasi .toc-title {font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:rgba(255,255,255,0.9);white-space:nowrap;overflow:hidden;}
.materi-kalibrasi .toc-chevron {font-size:11px;color:rgba(255,255,255,0.7);flex-shrink:0;transition:transform 0.25s;margin-left:6px;}
.materi-kalibrasi .toc-float.collapsed .toc-chevron {transform:rotate(180deg);}
.materi-kalibrasi .toc-float.collapsed .toc-title {opacity:0;width:0;margin:0;}
.materi-kalibrasi .toc-body {padding:8px 6px;max-height:calc(100vh - 140px);overflow-y:auto;scrollbar-width:thin;scrollbar-color:var(--gray-300) transparent;}
.materi-kalibrasi .toc-body::-webkit-scrollbar {width:3px;}
.materi-kalibrasi .toc-body::-webkit-scrollbar-thumb {background:var(--gray-300);border-radius:2px;}
.materi-kalibrasi .toc-float.collapsed .toc-body {display:none;}
.materi-kalibrasi .toc-link {display:block;font-size:11px;color:var(--gray-600);text-decoration:none;padding:3px 8px;border-radius:4px;border-left:2px solid transparent;margin-bottom:1px;transition:all 0.15s;line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.materi-kalibrasi .toc-link:hover {background:var(--blue-pale);color:var(--blue);border-left-color:var(--blue);}
.materi-kalibrasi .toc-link.active {background:var(--blue-pale);color:var(--blue);border-left-color:var(--blue);font-weight:600;}
.materi-kalibrasi .toc-link.sub {padding-left:14px;font-size:10px;color:var(--gray-500);}
.materi-kalibrasi .toc-link.sub.active {color:var(--blue);}
.materi-kalibrasi .toc-toggle {display:none;position:fixed;bottom:20px;right:16px;width:40px;height:40px;border-radius:50%;background:var(--navy);color:#fff;border:none;font-size:16px;cursor:pointer;box-shadow:var(--shadow-md);z-index:160;align-items:center;justify-content:center;}
@.materi-kalibrasi media(max-width:1100px) {.toc-float{display:none;}.materi-kalibrasi .toc-toggle {display:flex;}.materi-kalibrasi }

/* HERO */
.hero {background:linear-gradient(135deg,#0A2342 0%,#1A3a5c 55%,#2d1065 100%);color:#fff;padding:3rem 1.5rem 2.5rem;border-radius:0 0 var(--radius) var(--radius);margin-bottom:2rem;position:relative;overflow:hidden;}
.materi-kalibrasi .hero::before {content:'';position:absolute;top:-80px;right:-60px;width:300px;height:300px;border-radius:50%;background:rgba(55,138,221,0.12);}
.materi-kalibrasi .hero::after {content:'';position:absolute;bottom:-100px;left:10%;width:250px;height:250px;border-radius:50%;background:rgba(109,40,217,0.10);}
.materi-kalibrasi .hero-inner {max-width:900px;margin:0 auto;position:relative;z-index:1;}
.materi-kalibrasi .hero-badge {display:inline-block;background:rgba(55,138,221,0.25);color:#85b7eb;font-size:11px;padding:3px 10px;border-radius:20px;margin-bottom:0.75rem;letter-spacing:0.04em;}
.materi-kalibrasi .hero h1 {font-size:clamp(22px,4vw,30px);font-weight:700;line-height:1.3;margin-bottom:0.5rem;}
.materi-kalibrasi .hero-sub {font-size:14px;color:rgba(255,255,255,0.65);margin-bottom:1.5rem;}
.materi-kalibrasi .hero-pills {display:flex;flex-wrap:wrap;gap:8px;margin-top:1rem;}
.materi-kalibrasi .hero-pill {display:inline-block;font-size:11px;padding:4px 10px;border-radius:20px;font-weight:600;border:1px solid;}
.materi-kalibrasi .pill-red {background:rgba(185,28,28,0.25);color:#fca5a5;border-color:rgba(185,28,28,0.4);}
.materi-kalibrasi .pill-blue {background:rgba(26,82,118,0.3);color:#85b7eb;border-color:rgba(26,82,118,0.5);}
.materi-kalibrasi .pill-amber {background:rgba(180,83,9,0.25);color:#fcd34d;border-color:rgba(180,83,9,0.4);}
.materi-kalibrasi .pill-purple {background:rgba(109,40,217,0.25);color:#c4b5fd;border-color:rgba(109,40,217,0.4);}
.materi-kalibrasi .hero-meta {display:flex;flex-wrap:wrap;gap:1.25rem;margin-top:1rem;}
.materi-kalibrasi .hero-meta-item {font-size:12px;color:rgba(255,255,255,0.55);}

/.materi-kalibrasi * LAYOUT */
.wrap {max-width:900px;margin:0 auto;padding:0 1.25rem 4rem;}

/.materi-kalibrasi * SECTIONS */
.section {margin-bottom:3rem;}
.materi-kalibrasi .section-header {display:flex;align-items:center;gap:12px;margin-bottom:1.25rem;}
.materi-kalibrasi .section-num {width:32px;height:32px;border-radius:50%;background:var(--navy);color:#fff;font-size:13px;font-weight:600;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.materi-kalibrasi .section-header h2 {font-size:20px;font-weight:700;color:var(--gray-900);}

/.materi-kalibrasi * CARDS */
.card {background:#fff;border-radius:var(--radius);padding:1.25rem 1.5rem;box-shadow:var(--shadow);margin-bottom:1rem;}
.materi-kalibrasi .card-navy {border-left:4px solid var(--navy);}
.materi-kalibrasi .card-blue {border-left:4px solid var(--blue-mid);}
.materi-kalibrasi .card-red {border-left:4px solid var(--red);}
.materi-kalibrasi .card-amber {border-left:4px solid var(--amber);}
.materi-kalibrasi .card-green {border-left:4px solid var(--green);}
.materi-kalibrasi .card-purple {border-left:4px solid var(--purple);}
.materi-kalibrasi .card-label {font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.07em;color:var(--gray-500);margin-bottom:6px;}
.materi-kalibrasi .card p {font-size:13px;color:var(--gray-600);line-height:1.65;}

/.materi-kalibrasi * GRID */
.grid-2 {display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;}
.materi-kalibrasi .grid-3 {display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;margin-bottom:1rem;}
.materi-kalibrasi .grid-4 {display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;}
@.materi-kalibrasi media(max-width:640px) {.grid-2,.grid-3,.grid-4{grid-template-columns:1fr;}.materi-kalibrasi }

/* METRIC CARDS */
.metric-card {background:#fff;border-radius:var(--radius);padding:1rem 1.1rem;box-shadow:var(--shadow);text-align:center;position:relative;overflow:hidden;}
.materi-kalibrasi .metric-card::before {content:'';position:absolute;top:0;left:0;right:0;height:3px;}
.materi-kalibrasi .metric-card.red::before {background:var(--red);}
.materi-kalibrasi .metric-card.blue::before {background:var(--navy2);}
.materi-kalibrasi .metric-card.green::before {background:var(--green);}
.materi-kalibrasi .metric-card.amber::before {background:var(--amber);}
.materi-kalibrasi .metric-label {font-size:11px;color:var(--gray-500);font-weight:600;margin-bottom:4px;}
.materi-kalibrasi .metric-raw {font-size:14px;font-weight:700;color:var(--red);}
.materi-kalibrasi .metric-m4 {font-size:14px;font-weight:700;color:var(--navy2);}
.materi-kalibrasi .metric-arrow {font-size:11px;color:var(--green);margin:3px 0;}
.materi-kalibrasi .metric-thresh {font-size:10px;color:var(--gray-500);}

/.materi-kalibrasi * INFO BOXES */
.info-box {display:flex;gap:10px;background:var(--blue-pale);border:1px solid #b5d4f4;border-radius:var(--radius-sm);padding:.9rem 1rem;font-size:13px;color:#0c447c;margin:1rem 0;line-height:1.55;}
.materi-kalibrasi .warn-box {display:flex;gap:10px;background:var(--amber-light);border:1px solid #fac775;border-radius:var(--radius-sm);padding:.9rem 1rem;font-size:13px;color:var(--amber);margin:1rem 0;line-height:1.55;}
.materi-kalibrasi .success-box {display:flex;gap:10px;background:var(--green-light);border:1px solid #a7f3d0;border-radius:var(--radius-sm);padding:.9rem 1rem;font-size:13px;color:var(--green);margin:1rem 0;line-height:1.55;}
.materi-kalibrasi .purple-box {display:flex;gap:10px;background:var(--purple-light);border:1px solid #c4b5fd;border-radius:var(--radius-sm);padding:.9rem 1rem;font-size:13px;color:var(--purple);margin:1rem 0;line-height:1.55;}
.materi-kalibrasi .box-icon {font-size:18px;flex-shrink:0;line-height:1.3;}

/.materi-kalibrasi * FORMULA */
.formula-block {background:#0f172a;border-radius:var(--radius-sm);padding:1rem 1.25rem;margin:.75rem 0;font-family:'Consolas','Courier New',monospace;font-size:14px;color:#e2e8f0;text-align:center;letter-spacing:0.02em;border-left:4px solid var(--purple);}
.materi-kalibrasi .formula-block .eq-label {font-size:11px;color:#94a3b8;display:block;margin-bottom:4px;text-align:left;}
.materi-kalibrasi .formula-block .eq-main {color:#c4b5fd;font-size:15px;}
.materi-kalibrasi .formula-block .eq-desc {font-size:11px;color:#64748b;display:block;margin-top:6px;text-align:left;}

/.materi-kalibrasi * STEP FLOW */
.step-flow {margin:1rem 0;}
.materi-kalibrasi .step-item {display:flex;gap:14px;}
.materi-kalibrasi .step-line {display:flex;flex-direction:column;align-items:center;}
.materi-kalibrasi .step-dot {width:30px;height:30px;border-radius:50%;background:var(--blue-mid);color:#fff;font-size:12px;font-weight:600;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.materi-kalibrasi .step-dot.navy {background:var(--navy);}
.materi-kalibrasi .step-dot.purple {background:var(--purple);}
.materi-kalibrasi .step-connector {width:2px;background:var(--gray-200);flex:1;min-height:16px;margin:3px 0;}
.materi-kalibrasi .step-body {padding-bottom:20px;flex:1;}
.materi-kalibrasi .step-title {font-size:14px;font-weight:600;color:var(--gray-800);margin-bottom:4px;}
.materi-kalibrasi .step-desc {font-size:13px;color:var(--gray-600);line-height:1.6;}

/.materi-kalibrasi * CODE */
.code-wrap {background:var(--code-bg);border-radius:var(--radius-sm);overflow:hidden;margin:.75rem 0;box-shadow:var(--shadow-md);}
.materi-kalibrasi .code-header {background:#2a2a3e;padding:7px 14px;display:flex;align-items:center;justify-content:space-between;}
.materi-kalibrasi .code-lang {font-size:11px;color:#a0aec0;font-weight:600;letter-spacing:0.05em;display:flex;align-items:center;gap:6px;}
.materi-kalibrasi .code-lang .dot {width:8px;height:8px;border-radius:50%;}
.materi-kalibrasi .copy-btn {font-size:11px;color:#a0aec0;cursor:pointer;background:none;border:none;padding:2px 8px;border-radius:4px;transition:all 0.2s;}
.materi-kalibrasi .copy-btn:hover {background:rgba(255,255,255,0.1);color:#fff;}
.materi-kalibrasi pre {padding:1rem 1.25rem;overflow-x:auto;font-family:'Consolas','Courier New',monospace;font-size:12.5px;line-height:1.75;color:#cdd6f4;}
.materi-kalibrasi pre::-webkit-scrollbar {height:4px;}
.materi-kalibrasi pre::-webkit-scrollbar-thumb {background:#4a4a6a;border-radius:2px;}
.materi-kalibrasi .kw {color:#cba6f7;}.materi-kalibrasi .fn {color:#89b4fa;}.materi-kalibrasi .str {color:#a6e3a1;}.materi-kalibrasi .num {color:#fab387;}.materi-kalibrasi .cm {color:#6c7086;font-style:italic;}.materi-kalibrasi .op {color:#89dceb;}.materi-kalibrasi .pkg {color:#f38ba8;}

/.materi-kalibrasi * IMAGE FIGURE */
.fig-wrap {background:#fff;border-radius:var(--radius);box-shadow:var(--shadow-md);overflow:hidden;margin-bottom:1.5rem;}
.materi-kalibrasi .fig-header {background:var(--gray-100);padding:8px 14px;font-size:11px;font-weight:600;color:var(--gray-500);border-bottom:1px solid var(--gray-200);display:flex;align-items:center;gap:6px;}
.materi-kalibrasi .fig-img {width:100%;display:block;}
.materi-kalibrasi .fig-caption {padding:8px 14px;font-size:12px;color:var(--gray-500);border-top:1px solid var(--gray-200);font-style:italic;}

/.materi-kalibrasi * TABLE */
.tbl-wrap {overflow-x:auto;margin-bottom:1rem;}
.materi-kalibrasi .data-tbl {width:100%;border-collapse:collapse;font-size:13px;min-width:400px;}
.materi-kalibrasi .data-tbl th {background:var(--navy);color:#fff;padding:8px 12px;text-align:center;font-weight:600;font-size:12px;}
.materi-kalibrasi .data-tbl td {padding:6px 12px;border-bottom:1px solid var(--gray-200);text-align:right;font-family:'Consolas',monospace;font-size:12px;}
.materi-kalibrasi .data-tbl td:first-child {text-align:center;font-family:inherit;font-weight:600;color:var(--gray-700);}
.materi-kalibrasi .data-tbl tr:hover td {background:var(--blue-pale);}
.materi-kalibrasi .data-tbl .pos {color:var(--red);font-weight:700;}
.materi-kalibrasi .data-tbl .neg {color:var(--navy2);}
.materi-kalibrasi .data-tbl .good {color:var(--green);font-weight:700;}
.materi-kalibrasi .data-tbl .bad {color:var(--red);}
.materi-kalibrasi .data-tbl .head-raw {background:var(--red)!important;}
.materi-kalibrasi .data-tbl .head-m4 {background:var(--navy2)!important;}
.materi-kalibrasi .data-tbl .head-obs {background:var(--amber)!important;}
.materi-kalibrasi .data-tbl .head-fk {background:var(--purple)!important;}

/.materi-kalibrasi * CHART */
.chart-card {background:#fff;border-radius:var(--radius);padding:1.25rem 1.5rem 1rem;box-shadow:var(--shadow);margin-bottom:1.25rem;}
.materi-kalibrasi .chart-title {font-size:13px;font-weight:600;color:var(--gray-700);margin-bottom:2px;}
.materi-kalibrasi .chart-sub {font-size:11px;color:var(--gray-400);margin-bottom:1rem;}
.materi-kalibrasi .chart-wrap {position:relative;width:100%;}
.materi-kalibrasi .legend-row {display:flex;flex-wrap:wrap;gap:12px;margin-top:10px;font-size:11px;color:var(--gray-500);}
.materi-kalibrasi .legend-item {display:flex;align-items:center;gap:5px;}
.materi-kalibrasi .legend-sq {width:10px;height:10px;border-radius:2px;flex-shrink:0;}

/.materi-kalibrasi * COMPARISON TABLE */
.compare-tbl {width:100%;border-collapse:collapse;margin-bottom:1rem;}
.materi-kalibrasi .compare-tbl th {padding:10px 14px;font-size:12px;font-weight:600;text-align:center;}
.materi-kalibrasi .compare-tbl td {padding:9px 14px;border-bottom:1px solid var(--gray-200);font-size:13px;}
.materi-kalibrasi .compare-tbl .metric-name {font-weight:600;color:var(--gray-700);background:var(--gray-100);}
.materi-kalibrasi .compare-tbl .val-raw {color:var(--red);font-weight:600;text-align:center;font-family:monospace;}
.materi-kalibrasi .compare-tbl .val-m4 {color:var(--navy2);font-weight:700;text-align:center;font-family:monospace;}
.materi-kalibrasi .compare-tbl .thresh {color:var(--gray-500);text-align:center;font-size:12px;}
.materi-kalibrasi .compare-tbl .status-good {color:var(--green);font-weight:700;text-align:center;}
.materi-kalibrasi .compare-tbl .status-bad {color:var(--red);text-align:center;}
.materi-kalibrasi .compare-tbl thead th:nth-child(2) {background:rgba(185,28,28,0.1);color:var(--red);}
.materi-kalibrasi .compare-tbl thead th:nth-child(3) {background:rgba(26,82,118,0.1);color:var(--navy2);}

/.materi-kalibrasi * TAG */
.tag {display:inline-block;font-size:11px;padding:3px 10px;border-radius:20px;margin:2px;font-weight:500;}
.materi-kalibrasi .tag-blue {background:var(--blue-pale);color:#0c447c;}
.materi-kalibrasi .tag-red {background:var(--red-light);color:var(--red);}
.materi-kalibrasi .tag-purple {background:var(--purple-light);color:var(--purple);}
.materi-kalibrasi .tag-green {background:var(--green-light);color:var(--green);}
.materi-kalibrasi .tag-amber {background:var(--amber-light);color:var(--amber);}

/.materi-kalibrasi * DIVIDER */
.divider {height:1px;background:var(--gray-200);margin:2.5rem 0;}

/.materi-kalibrasi * ANIMATE */
@keyframes fadeUp {from{opacity:0;transform:translateY(16px);}.materi-kalibrasi to {opacity:1;transform:translateY(0);}.materi-kalibrasi }
.anim-in {opacity:1;}
.materi-kalibrasi .anim-in.visible {animation:fadeUp 0.45s ease both;}


/* === LAYOUT FIX: integrasi Wowchemy === */
.materi-kalibrasi { box-sizing: border-box; width: 100%; overflow-x: hidden; }
.materi-kalibrasi * { box-sizing: border-box; }
.materi-kalibrasi .wrap, .materi-kalibrasi .section { max-width: 100%; }



/* === DARK MODE === */
body.dark .materi-kalibrasi { color:#8e94b5; }

/* Heading & teks utama */
body.dark .materi-kalibrasi h1,
body.dark .materi-kalibrasi h2,
body.dark .materi-kalibrasi h3,
body.dark .materi-kalibrasi h4 { color:#e8eaf6 !important; }
body.dark .materi-kalibrasi p { color:#8e94b5; }
body.dark .materi-kalibrasi strong { color:#e8eaf6; }
body.dark .materi-kalibrasi li { color:#8e94b5; }

/* Section header */
body.dark .materi-kalibrasi .section-header { border-color:#343858; }
body.dark .materi-kalibrasi .section-header h2 { color:#e8eaf6 !important; }
body.dark .materi-kalibrasi .section-num {
  background:#1e3a6e !important;
  color:#5b8fff !important;
  border-color:#2a4a8e !important;
}
body.dark .materi-kalibrasi .subsection h3 { color:#c8ccdf !important; }

/* Cards — background & border */
body.dark .materi-kalibrasi [class*="card"],
body.dark .materi-kalibrasi .card,
body.dark .materi-kalibrasi .metric-card {
  background:#222638 !important;
  border-color:#343858 !important;
  box-shadow: 0 2px 12px rgba(0,0,0,0.3) !important;
}

/* Card teks — SEMUA varian label & nilai */
body.dark .materi-kalibrasi .card-label,
body.dark .materi-kalibrasi .metric-label,
body.dark .materi-kalibrasi .metric-sub {
  color:#8e94b5 !important;
}
body.dark .materi-kalibrasi .card p,
body.dark .materi-kalibrasi .card-body {
  color:#8e94b5 !important;
}
body.dark .materi-kalibrasi .metric-val {
  /* warna nilai (biru/amber/dll) tetap — biarkan dari CSS asli */
  filter: brightness(1.2);
}

/* Teks dengan var gray-* — override via CSS variable remapping */
body.dark .materi-kalibrasi {
  --gray-100:#1b1d27;
  --gray-200:#222638;
  --gray-300:#2a2e42;
  --gray-500:#8e94b5;
  --gray-600:#a0a8cc;
  --gray-700:#c8ccdf;
  --gray-900:#e8eaf6;
  --navy:#e8eaf6;
  --navy2:#c8ccdf;
  --blue:#5b8fff;
  --blue-mid:#7aa5ff;
  --blue-pale:#1e2a42;
  --red:#e05a5a;
  --red-light:#2d1515;
  --amber:#f4a642;
  --amber-light:#2d2010;
  --purple:#9d7cf8;
  --purple-light:#1e1530;
  --green:#3ecf8e;
  --green-light:#0d2418;
  --shadow: 0 2px 12px rgba(0,0,0,0.35);
  --shadow-md: 0 4px 20px rgba(0,0,0,0.45);
  --code-bg:#12151f;
}

/* Table */
body.dark .materi-kalibrasi table { border-color:#343858; }
body.dark .materi-kalibrasi th {
  background:#2a2e42 !important;
  color:#8e94b5 !important;
  border-color:#343858 !important;
}
body.dark .materi-kalibrasi td {
  border-color:#343858 !important;
  color:#8e94b5 !important;
}
body.dark .materi-kalibrasi tr:nth-child(even) { background:#1e2235 !important; }
body.dark .materi-kalibrasi tr:hover td { background:#252840 !important; }

/* Code */
body.dark .materi-kalibrasi code,
body.dark .materi-kalibrasi pre {
  background:#12151f !important;
  color:#a8b4ff !important;
}

/* Form inputs */
body.dark .materi-kalibrasi select,
body.dark .materi-kalibrasi input[type=number],
body.dark .materi-kalibrasi input[type=text] {
  background:#2a2e42 !important;
  border-color:#343858 !important;
  color:#e8eaf6 !important;
}

/* Result/output boxes */
body.dark .materi-kalibrasi [class*="result"],
body.dark .materi-kalibrasi [id*="result"],
body.dark .materi-kalibrasi [class*="output"],
body.dark .materi-kalibrasi [id*="output"] {
  background:#222638 !important;
  border-color:#343858 !important;
  color:#8e94b5 !important;
}

/* Grid boxes */
body.dark .materi-kalibrasi .grid-2>*,
body.dark .materi-kalibrasi .grid-3>*,
body.dark .materi-kalibrasi .grid-4>* {
  background:#222638 !important;
  border-color:#343858 !important;
}

/* Info/alert boxes */
body.dark .materi-kalibrasi [class*="info-"],
body.dark .materi-kalibrasi [class*="alert-"],
body.dark .materi-kalibrasi [class*="note-"] {
  background:#1e2235 !important;
  border-color:#343858 !important;
  color:#8e94b5 !important;
}

/* Links */
body.dark .materi-kalibrasi a { color:#5b8fff; }
body.dark .materi-kalibrasi hr { border-color:#343858; }

/* Fix teks inline style hardcoded */
body.dark .materi-kalibrasi [style*="color:#0f172a"],
body.dark .materi-kalibrasi [style*="color:#1e293b"],
body.dark .materi-kalibrasi [style*="color:#334155"],
body.dark .materi-kalibrasi [style*="color:#475569"] {
  color:#e8eaf6 !important;
}
body.dark .materi-kalibrasi [style*="background:#fff"],
body.dark .materi-kalibrasi [style*="background:#f4f6f9"],
body.dark .materi-kalibrasi [style*="background:#f8fafc"],
body.dark .materi-kalibrasi [style*="background:#f1f5f9"] {
  background:#222638 !important;
}

</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
<div class="materi-kalibrasi">
<!-- ===== S1: LATAR BELAKANG ===== -->
  <section class="section anim-in" id="s1">
    <div class="section-header"><div class="section-num">1</div><h2>Latar Belakang</h2></div>

    <div class="card card-navy">
      <div class="card-label">Masalah Utama</div>
      <p>GPM IMERG adalah produk curah hujan satelit presisi tinggi dari NASA dengan resolusi 0.1° × 0.1° dan temporal 30 menit. Namun dalam analisis hidrologi — khususnya untuk menentukan <strong>Hujan Harian Maksimum Tahunan (HHMT)</strong> sebagai input desain bangunan air — data mentah (raw) GPM sering menunjukkan <strong>bias sistematis negatif yang signifikan</strong> dibandingkan observasi BMKG di lapangan.</p>
    </div>

    <div class="grid-2">
      <div class="card card-red">
        <div class="card-label">⚠️ GPM Raw — Masalah</div>
        <p>PBIAS = <strong>−31.9%</strong> artinya GPM Raw secara rata-rata <em>meremehkan</em> curah hujan sebesar hampir sepertiga dari nilai sesungguhnya. NSE = −1.06 menunjukkan model bahkan lebih buruk dari sekedar menggunakan nilai rata-rata — tidak layak digunakan langsung untuk desain hidrologi.</p>
      </div>
      <div class="card card-blue">
        <div class="card-label">✅ GPM M4 — Solusi</div>
        <p>Setelah kalibrasi dengan metode <strong>Year-Specific Scaling Factor (M4)</strong>, PBIAS turun menjadi <strong>+3.5%</strong> — hampir tidak ada bias. NSE meningkat ke 0.77 dan KGE ke 0.88, keduanya masuk kategori <em>Sangat Baik</em> menurut SNI 2415:2016.</p>
      </div>
    </div>

    <div class="grid-4">
      <div class="metric-card red">
        <div class="metric-label">PBIAS</div>
        <div class="metric-raw">−31.9%</div>
        <div class="metric-arrow">↓ 91%</div>
        <div class="metric-m4">+3.5%</div>
        <div class="metric-thresh">Threshold: &lt;10%</div>
      </div>
      <div class="metric-card blue">
        <div class="metric-label">NSE</div>
        <div class="metric-raw">−1.062</div>
        <div class="metric-arrow">↑ 172%</div>
        <div class="metric-m4">0.772</div>
        <div class="metric-thresh">Threshold: ≥0.75</div>
      </div>
      <div class="metric-card green">
        <div class="metric-label">KGE</div>
        <div class="metric-raw">0.206</div>
        <div class="metric-arrow">↑ 326%</div>
        <div class="metric-m4">0.879</div>
        <div class="metric-thresh">Threshold: ≥0.75</div>
      </div>
      <div class="metric-card amber">
        <div class="metric-label">RMSE</div>
        <div class="metric-raw">47.4 mm</div>
        <div class="metric-arrow">↓ 67%</div>
        <div class="metric-m4">15.8 mm</div>
        <div class="metric-thresh">Semakin kecil</div>
      </div>
    </div>

    <div class="success-box"><span class="box-icon">🎯</span><span>Kalibrasi dengan metode M4 berhasil mengubah data GPM yang <em>tidak layak pakai</em> menjadi data yang masuk kategori <strong>Sangat Baik (SB)</strong> untuk semua metrik validasi menurut Moriasi et al. (2007) dan SNI 2415:2016.</span></div>
  </section>

  <div class="divider"></div>

  <!-- ===== S2: DATA & WILAYAH ===== -->
  <section class="section anim-in" id="s2">
    <div class="section-header"><div class="section-num">2</div><h2>Data &amp; Wilayah Studi</h2></div>

    <div id="s2a"></div>
    <div class="card card-blue" style="margin-bottom:1rem;">
      <div class="card-label">🛰️ Piksel GPM B4 — Titik Referensi</div>
      <p>Analisis berfokus pada satu piksel GPM IMERG V07 yang merepresentasikan wilayah Kota Banjarmasin, yang selanjutnya disebut <strong>Piksel B4</strong>.</p>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-label">Koordinat Piksel B4</div>
        <p style="font-family:monospace;font-size:14px;color:var(--navy);">114.60°E, 3.30°S</p>
        <p style="margin-top:6px;">Bounding Box: 114.487–114.687°E, 3.197–3.397°S</p>
      </div>
      <div class="card">
        <div class="card-label">Produk GPM</div>
        <p><strong>GPM IMERG V07 Final Run</strong> (NASA Giovanni)<br>Resolusi: 0.1° × 0.1° · Temporal: Daily<br>Variabel: Presipitasi harian (mm)</p>
      </div>
    </div>

    <div id="s2b"></div>
    <div class="card-label" style="font-size:11px;margin-bottom:10px;">🌧️ Stasiun Observasi BMKG (Ground Truth)</div>
    <div class="grid-2">
      <div class="card card-amber">
        <div class="card-label">Stasiun SY — Syamsuddin Noor</div>
        <p><strong>Lokasi:</strong> Banjarmasin, Kalimantan Selatan<br><strong>Piksel GPM-nya:</strong> 114.80°E, 3.40°S<br><strong>Periode:</strong> 1998–2025 (28 tahun)<br><strong>Catatan:</strong> Tahun 2010 data = 0 mm (tidak valid, hanya BMKG Kalsel yang digunakan)</p>
      </div>
      <div class="card card-amber">
        <div class="card-label">Stasiun KS — BMKG Kalsel (Banjarbaru)</div>
        <p><strong>Lokasi:</strong> Banjarbaru, Kalimantan Selatan<br><strong>Piksel GPM-nya:</strong> 114.85°E, 3.45°S<br><strong>Periode:</strong> 1998–2025 (28 tahun)<br><strong>Catatan:</strong> Digunakan sebagai data pembanding &amp; pengisi ketika SY tidak tersedia</p>
      </div>
    </div>

    <div id="s2c"></div>
    <div class="card-label" style="font-size:11px;margin-bottom:8px;">📊 Tabel Data Lengkap — HHMT 1998–2025</div>
    <div class="tbl-wrap">
      <table class="data-tbl">
        <thead>
          <tr>
            <th>Tahun</th>
            <th class="head-raw">GPM Raw (mm)</th>
            <th class="head-fk">Fk M4</th>
            <th class="head-m4">GPM M4 (mm)</th>
            <th class="head-obs">Obs BMKG (mm)</th>
            <th class="head-raw">Error Raw (mm)</th>
            <th class="head-m4">Error M4 (mm)</th>
          </tr>
        </thead>
        <tbody id="tblBody"></tbody>
      </table>
    </div>
    <div class="info-box"><span class="box-icon">ℹ️</span><span>HHMT = Hujan Harian Maksimum Tahunan. Error = GPM − Obs BMKG. Nilai negatif berarti GPM meremehkan observasi. Tahun 2010: data BMKG SY = 0 mm (tidak valid), Fk dihitung dari stasiun KS saja.</span></div>
  </section>

  <div class="divider"></div>

  <!-- ===== S3: METODE ===== -->
  <section class="section anim-in" id="s3">
    <div class="section-header"><div class="section-num">3</div><h2>Metode Koreksi Bias M4</h2></div>

    <p style="font-size:13px;color:var(--gray-600);margin-bottom:1.25rem;line-height:1.7;">Terdapat beberapa metode koreksi bias yang umum digunakan dalam hidrologi berbasis data satelit. Analisis ini membandingkan empat metode (M1–M4) dan memilih <strong>M4: Year-Specific Scaling Factor</strong> sebagai yang terbaik.</p>

    <div id="s3a"></div>
    <div class="card" style="margin-bottom:1.25rem;">
      <div class="card-label" style="margin-bottom:10px;">Perbandingan 4 Metode Koreksi Bias</div>
      <div class="tbl-wrap">
        <table class="compare-tbl">
          <thead>
            <tr>
              <th style="text-align:left;background:var(--gray-100);color:var(--gray-700);">Metode</th>
              <th style="text-align:left;background:var(--gray-100);color:var(--gray-700);">Prinsip</th>
              <th style="background:var(--gray-100);color:var(--gray-700);">Keunggulan</th>
              <th style="background:var(--gray-100);color:var(--gray-700);">Keterbatasan</th>
              <th style="background:var(--gray-100);color:var(--gray-700);">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="font-weight:700;color:var(--red);">M1 — CF Bulanan</td>
              <td style="font-size:12px;color:var(--gray-600);">GPM × faktor koreksi per bulan HHMT</td>
              <td style="font-size:12px;text-align:center;">Mempertimbangkan musim</td>
              <td style="font-size:12px;text-align:center;">CF dihitung hanya dari 1 stasiun</td>
              <td style="text-align:center;"><span class="tag tag-amber">Cukup Baik</span></td>
            </tr>
            <tr>
              <td style="font-weight:700;color:var(--amber);">M2 — Direct Scaling</td>
              <td style="font-size:12px;color:var(--gray-600);">GPM × (rerata Obs / rerata GPM) global</td>
              <td style="font-size:12px;text-align:center;">Sangat sederhana</td>
              <td style="font-size:12px;text-align:center;">Satu faktor untuk semua tahun</td>
              <td style="text-align:center;"><span class="tag tag-amber">Cukup Baik</span></td>
            </tr>
            <tr>
              <td style="font-weight:700;color:var(--purple);">M3 — Quantile Mapping</td>
              <td style="font-size:12px;color:var(--gray-600);">Rank-to-rank GPM vs Obs (CDF matching)</td>
              <td style="font-size:12px;text-align:center;">Koreksi distribusi penuh</td>
              <td style="font-size:12px;text-align:center;">Butuh data lebih banyak; asumsi stasioner</td>
              <td style="text-align:center;"><span class="tag tag-blue">Baik</span></td>
            </tr>
            <tr style="background:rgba(26,82,118,0.04);">
              <td style="font-weight:700;color:var(--navy2);">M4 — Year-Specific ✅</td>
              <td style="font-size:12px;color:var(--gray-600);">GPM × Fk per tahun dari semua stasiun tersedia</td>
              <td style="font-size:12px;text-align:center;font-weight:600;color:var(--green);">Fk unik tiap tahun, multi-stasiun</td>
              <td style="font-size:12px;text-align:center;">Butuh data BMKG per tahun</td>
              <td style="text-align:center;"><span class="tag tag-green">🏆 Terbaik</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div id="s3b"></div>
    <div class="card card-purple">
      <div class="card-label">Formula Inti — Metode M4</div>
    </div>
    <div class="formula-block">
      <span class="eq-label">Langkah 1: Faktor Koreksi per Stasiun per Tahun</span>
      <span class="eq-main">Fk_SY = HHMT_Ground_SY / HHMT_GPM_B4</span>
    </div>
    <div class="formula-block">
      <span class="eq-label">Langkah 2: Fk Akhir = Rata-rata dari semua stasiun tersedia</span>
      <span class="eq-main">Fk = mean(Fk_SY, Fk_KS)</span>
      <span class="eq-desc">Jika hanya satu stasiun tersedia (mis. 2010): Fk = Fk dari stasiun yang ada</span>
    </div>
    <div class="formula-block">
      <span class="eq-label">Langkah 3: GPM Terkoreksi</span>
      <span class="eq-main">GPM_M4 = GPM_Raw_B4 × Fk</span>
      <span class="eq-desc">Hasil: HHMT tahunan yang sudah dikalibrasi terhadap observasi BMKG</span>
    </div>

    <div class="step-flow" style="margin-top:1.25rem;">
      <div class="card-label" style="margin-bottom:10px;">Alur Kerja M4 Step-by-Step</div>
      <div class="step-item">
        <div class="step-line"><div class="step-dot navy">1</div><div class="step-connector"></div></div>
        <div class="step-body">
          <div class="step-title">Ekstrak HHMT GPM Raw dari Piksel B4</div>
          <div class="step-desc">Download data harian GPM IMERG V07 dari NASA Giovanni untuk piksel 114.60°E, 3.30°S. Ekstrak nilai HHMT (nilai maksimum harian dalam setahun) untuk setiap tahun 1998–2025.</div>
        </div>
      </div>
      <div class="step-item">
        <div class="step-line"><div class="step-dot navy">2</div><div class="step-connector"></div></div>
        <div class="step-body">
          <div class="step-title">Ekstrak HHMT Ground Truth dari BMKG</div>
          <div class="step-desc">Ambil data harian dari dua stasiun BMKG: Syamsuddin Noor (SY) dan BMKG Kalsel/Banjarbaru (KS). Hitung HHMT per tahun dari masing-masing stasiun.</div>
        </div>
      </div>
      <div class="step-item">
        <div class="step-line"><div class="step-dot navy">3</div><div class="step-connector"></div></div>
        <div class="step-body">
          <div class="step-title">Hitung Faktor Koreksi Fk per Tahun</div>
          <div class="step-desc">Fk_SY = Gnd_SY / GPM_B4; Fk_KS = Gnd_KS / GPM_B4. Fk final = rata-rata dari stasiun yang tersedia. Jika data SY tidak valid (tahun 2010: Gnd_SY = 0 mm), gunakan Fk_KS saja.</div>
        </div>
      </div>
      <div class="step-item">
        <div class="step-line"><div class="step-dot navy">4</div><div class="step-connector"></div></div>
        <div class="step-body">
          <div class="step-title">Terapkan Fk ke GPM Raw</div>
          <div class="step-desc">GPM_M4 = GPM_Raw × Fk. Setiap tahun mendapatkan faktor koreksi yang berbeda — ini yang membuat M4 lebih akurat dibandingkan M2 (satu faktor global).</div>
        </div>
      </div>
      <div class="step-item">
        <div class="step-line"><div class="step-dot navy">5</div><div class="step-connector"></div></div>
        <div class="step-body">
          <div class="step-title">Validasi dengan Metrik Goodness-of-Fit</div>
          <div class="step-desc">Hitung R, NSE, KGE, PBIAS, RMSE, MAE untuk membandingkan GPM M4 vs Obs BMKG. Bandingkan dengan threshold SNI 2415:2016 kategori Sangat Baik (SB): NSE ≥ 0.75, KGE ≥ 0.75, |PBIAS| &lt; 10%.</div>
        </div>
      </div>
    </div>

    <div class="warn-box"><span class="box-icon">⚠️</span><span>Metode M4 bersifat <em>year-specific</em> — artinya Fk dikalibrasi untuk periode historis yang sudah ada data BMKG-nya. Untuk proyeksi masa depan, perlu diasumsikan Fk konstan (nilai median atau rata-rata historis) karena tidak ada data ground truth masa depan.</span></div>
  </section>

  <div class="divider"></div>

  <!-- ===== S4: VISUALISASI ===== -->
  <section class="section anim-in" id="s4">
    <div class="section-header"><div class="section-num">4</div><h2>Hasil Visualisasi</h2></div>

    <div id="s4a"></div>
    <div class="fig-wrap">
      <div class="fig-header">📈 Panel 1 — Time Series HHMT Tahunan</div>
      <img src="/images/kalibrasi-gpm/timeseries-hhmt-tahunan.jpg" alt="Time series HHMT tahunan GPM Raw vs GPM M4 vs Observasi BMKG 1998-2025" loading="lazy" style="width:100%;border-radius:8px;margin:0.5rem 0;">
      <div class="fig-caption">Time series HHMT tahunan: GPM Raw (merah solid) vs GPM M4 (navy solid) vs Observasi BMKG (oranye dashed). Label kotak menunjukkan nilai puncak tahun 2021 = 252.2 mm.</div>
    </div>

    <div class="card card-navy" style="margin-bottom:1.5rem;">
      <div class="card-label">Interpretasi Time Series</div>
      <p>GPM Raw secara konsisten <em>berada di bawah</em> observasi BMKG sepanjang 28 tahun — mencerminkan bias negatif yang sistematis. Setelah kalibrasi M4, GPM M4 (garis navy) <strong>mengikuti pola observasi BMKG dengan sangat baik</strong>, termasuk menangkap puncak ekstrem tahun 2021 (252.2 mm) yang berkorelasi dengan banjir besar Banjarmasin Januari 2021.</p>
    </div>

    <div id="s4b"></div>
    <div class="fig-wrap">
      <div class="fig-header">📊 Panel 2 — Bar Chart Perbandingan Tahunan</div>
      <img src="/images/kalibrasi-gpm/barchart-perbandingan-tahunan.jpg" alt="Bar chart perbandingan HHMT tahunan GPM Raw vs GPM M4 vs Observasi BMKG 1998-2025" loading="lazy" style="width:100%;border-radius:8px;margin:0.5rem 0;">
      <div class="fig-caption">Bar chart dengan 3 seri per tahun: GPM Raw (merah), GPM M4 (navy), Obs BMKG (oranye). Terlihat GPM M4 jauh lebih mendekati bar oranye dibanding GPM Raw.</div>
    </div>

    <div class="chart-card">
      <div class="chart-title">Residual Error per Tahun (GPM − Obs BMKG)</div>
      <div class="chart-sub">Zona hijau = ±10 mm (toleransi ideal) · GPM M4 hampir selalu di dalam zona hijau</div>
      <div class="chart-wrap" style="height:240px;"><canvas id="chartResidual" role="img" aria-label="Bar chart residual error GPM Raw vs GPM M4 per tahun. GPM M4 jauh lebih dekat ke nol."></canvas></div>
      <div class="legend-row">
        <div class="legend-item"><div class="legend-sq" style="background:rgba(185,28,28,0.75);"></div>Error GPM Raw</div>
        <div class="legend-item"><div class="legend-sq" style="background:rgba(26,82,118,0.75);"></div>Error GPM M4</div>
        <div class="legend-item"><div class="legend-sq" style="background:rgba(29,111,66,0.2);border:1px dashed #1d6f42;"></div>Zona ±10 mm</div>
      </div>
    </div>

    <div id="s4c"></div>
    <div class="fig-wrap">
      <div class="fig-header">🔵 Panel 3 — Scatter Plot: GPM Raw vs GPM M4 terhadap Observasi BMKG</div>
      <img src="/images/kalibrasi-gpm/scatterplot-gpm-vs-bmkg.jpg" alt="Scatter plot GPM Raw vs Obs BMKG dan GPM M4 vs Obs BMKG" loading="lazy" style="width:100%;border-radius:8px;margin:0.5rem 0;">
      <div class="fig-caption">Kiri: Scatter GPM Raw vs Obs BMKG — titik tersebar jauh dari garis 1:1 (R=0.373). Kanan: Scatter GPM M4 vs Obs BMKG — titik mengikuti garis 1:1 dengan rapat (R=0.900).</div>
    </div>

    <div class="success-box"><span class="box-icon">🎯</span><span>Garis putus-putus abu-abu pada scatter plot adalah garis <strong>1:1 (perfect fit)</strong>. Semakin dekat titik ke garis ini, semakin baik kalibrasi. GPM M4 (kanan) menunjukkan sebaran yang sangat rapat di sekitar garis 1:1 dengan CI band yang sempit — bukti kalibrasi yang sangat berhasil.</span></div>
  </section>

  <div class="divider"></div>

  <!-- ===== S5: METRIK VALIDASI ===== -->
  <section class="section anim-in" id="s5">
    <div class="section-header"><div class="section-num">5</div><h2>Metrik Validasi Statistik</h2></div>

    <div class="chart-card">
      <div class="chart-title">Perbandingan Metrik Goodness-of-Fit — GPM Raw vs GPM M4</div>
      <div class="chart-sub">Threshold Sangat Baik (SNI 2415:2016 / Moriasi et al. 2007) ditampilkan sebagai garis putus-putus</div>
      <div class="chart-wrap" style="height:280px;"><canvas id="chartMetrik" role="img" aria-label="Bar chart metrik validasi R NSE KGE untuk GPM Raw dan GPM M4. Semua metrik GPM M4 melampaui threshold SB."></canvas></div>
    </div>

    <div class="tbl-wrap">
      <table class="compare-tbl" style="width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th style="text-align:left;background:var(--gray-100);color:var(--gray-700);padding:10px 14px;font-size:12px;">Metrik</th>
            <th style="background:rgba(185,28,28,0.1);color:var(--red);padding:10px 14px;font-size:12px;text-align:center;">GPM Raw (M0)</th>
            <th style="background:rgba(26,82,118,0.1);color:var(--navy2);padding:10px 14px;font-size:12px;text-align:center;">GPM M4</th>
            <th style="background:var(--gray-100);color:var(--gray-700);padding:10px 14px;font-size:12px;text-align:center;">Threshold SB</th>
            <th style="background:var(--gray-100);color:var(--gray-700);padding:10px 14px;font-size:12px;text-align:center;">Status M4</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="metric-name" style="padding:9px 14px;font-weight:600;background:var(--gray-100);">R (Korelasi Pearson)</td><td class="val-raw" style="padding:9px 14px;">0.373</td><td class="val-m4" style="padding:9px 14px;">0.900</td><td class="thresh" style="padding:9px 14px;">≥ 0.75</td><td class="status-good" style="padding:9px 14px;">✅ SB</td></tr>
          <tr><td class="metric-name" style="padding:9px 14px;font-weight:600;background:var(--gray-100);">R² (Koef. Determinasi)</td><td class="val-raw" style="padding:9px 14px;">0.139</td><td class="val-m4" style="padding:9px 14px;">0.811</td><td class="thresh" style="padding:9px 14px;">≥ 0.75</td><td class="status-good" style="padding:9px 14px;">✅ SB</td></tr>
          <tr><td class="metric-name" style="padding:9px 14px;font-weight:600;background:var(--gray-100);">NSE (Nash-Sutcliffe Eff.)</td><td class="val-raw" style="padding:9px 14px;">−1.062</td><td class="val-m4" style="padding:9px 14px;">0.772</td><td class="thresh" style="padding:9px 14px;">≥ 0.75</td><td class="status-good" style="padding:9px 14px;">✅ SB</td></tr>
          <tr><td class="metric-name" style="padding:9px 14px;font-weight:600;background:var(--gray-100);">KGE (Kling-Gupta Eff.)</td><td class="val-raw" style="padding:9px 14px;">0.206</td><td class="val-m4" style="padding:9px 14px;">0.879</td><td class="thresh" style="padding:9px 14px;">≥ 0.75</td><td class="status-good" style="padding:9px 14px;">✅ SB</td></tr>
          <tr><td class="metric-name" style="padding:9px 14px;font-weight:600;background:var(--gray-100);">PBIAS (%)</td><td class="val-raw" style="padding:9px 14px;">−31.9%</td><td class="val-m4" style="padding:9px 14px;">+3.5%</td><td class="thresh" style="padding:9px 14px;">|PBIAS| &lt; 10%</td><td class="status-good" style="padding:9px 14px;">✅ SB</td></tr>
          <tr><td class="metric-name" style="padding:9px 14px;font-weight:600;background:var(--gray-100);">RMSE (mm)</td><td class="val-raw" style="padding:9px 14px;">47.44 mm</td><td class="val-m4" style="padding:9px 14px;">15.79 mm</td><td class="thresh" style="padding:9px 14px;">Min (↓)</td><td class="status-good" style="padding:9px 14px;">✅ −67%</td></tr>
          <tr><td class="metric-name" style="padding:9px 14px;font-weight:600;background:var(--gray-100);">MAE (mm)</td><td class="val-raw" style="padding:9px 14px;">38.72 mm</td><td class="val-m4" style="padding:9px 14px;">11.14 mm</td><td class="thresh" style="padding:9px 14px;">Min (↓)</td><td class="status-good" style="padding:9px 14px;">✅ −71%</td></tr>
        </tbody>
      </table>
    </div>

    <div class="grid-2" style="margin-top:1rem;">
      <div class="card card-blue">
        <div class="card-label">Tentang NSE (Nash-Sutcliffe Efficiency)</div>
        <p>NSE = 1 adalah sempurna. NSE = 0 berarti model sama akuratnya dengan rata-rata observasi. NSE &lt; 0 berarti model <em>lebih buruk</em> dari rata-rata. GPM Raw dengan NSE = −1.06 sangat tidak layak. GPM M4 dengan NSE = 0.77 masuk kategori Sangat Baik.</p>
      </div>
      <div class="card card-purple">
        <div class="card-label">Tentang KGE (Kling-Gupta Efficiency)</div>
        <p>KGE menggabungkan korelasi, bias, dan variabilitas dalam satu metrik. KGE ≥ 0.75 = Sangat Baik. KGE GPM M4 = 0.879 menunjukkan keseimbangan yang baik antara tiga komponen tersebut — model tidak hanya berkorelasi tinggi, tapi juga reproduksi variabilitasnya bagus.</p>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- ===== S6: FAKTOR KOREKSI ===== -->
  <section class="section anim-in" id="s6">
    <div class="section-header"><div class="section-num">6</div><h2>Distribusi Faktor Koreksi (Fk)</h2></div>

    <div class="chart-card">
      <div class="chart-title">Faktor Koreksi Fk per Tahun (Year-Specific Scaling Factor)</div>
      <div class="chart-sub">Fk = mean(Gnd_SY/GPM_B4, Gnd_KS/GPM_B4) · Garis putus-putus = Median Fk · Garis titik-titik = Fk=1.0 (tidak ada koreksi)</div>
      <div class="chart-wrap" style="height:260px;"><canvas id="chartFk" role="img" aria-label="Bar chart faktor koreksi Fk per tahun 1998-2025. Sebagian besar Fk di atas 1.0 artinya GPM meremehkan observasi."></canvas></div>
      <div class="legend-row">
        <div class="legend-item"><div class="legend-sq" style="background:rgba(109,40,217,0.75);"></div>Fk per tahun</div>
        <div class="legend-item"><div style="width:20px;border-top:2px dashed var(--purple);margin-top:5px;"></div>&nbsp;Median Fk</div>
        <div class="legend-item"><div style="width:20px;border-top:2px dotted #94a3b8;margin-top:5px;"></div>&nbsp;Fk = 1.0</div>
      </div>
    </div>

    <div class="grid-3">
      <div class="card">
        <div class="card-label">Median Fk</div>
        <p style="font-size:22px;font-weight:700;color:var(--purple);">1.402</p>
        <p style="margin-top:4px;">GPM secara rata-rata meremehkan observasi sebesar <strong>~40%</strong>. Fk &gt; 1 artinya observasi lebih tinggi dari GPM.</p>
      </div>
      <div class="card">
        <div class="card-label">Rentang Fk</div>
        <p style="font-size:13px;line-height:1.8;margin-top:4px;">
          Min: <strong>0.842</strong> (2011) — tahun saat GPM justru lebih tinggi<br>
          Max: <strong>2.466</strong> (2014) — GPM sangat meremehkan<br>
          StDev: ±0.37 (variasi antar tahun tinggi)
        </p>
      </div>
      <div class="card">
        <div class="card-label">Implikasi Fk Tinggi</div>
        <p style="margin-top:4px;">Tahun dengan Fk &gt; 2.0 (2014, 2020, 2021, 2022, 2023) adalah tahun-tahun dengan curah hujan ekstrem tinggi di Banjarmasin — satelit GPM <em>secara struktural</em> kesulitan menangkap puncak intensitas.</p>
      </div>
    </div>

    <div class="warn-box"><span class="box-icon">⚠️</span><span>Variabilitas Fk yang tinggi antar tahun (0.84 – 2.47) menunjukkan bahwa metode koreksi bias tunggal (M2) tidak cukup — justru inilah alasan utama M4 unggul: setiap tahun mendapat koreksi yang sesuai kondisinya.</span></div>
  </section>

  <div class="divider"></div>

  <!-- ===== S7: KODE R ===== -->
  <section class="section anim-in" id="s7">
    <div class="section-header"><div class="section-num">7</div><h2>Kode R — Reproduksi Analisis</h2></div>

    <p style="font-size:13px;color:var(--gray-600);margin-bottom:1.25rem;line-height:1.7;">Seluruh analisis dikerjakan menggunakan R dengan package <code style="background:var(--gray-100);padding:1px 5px;border-radius:3px;font-size:12px;">ggplot2</code>, <code style="background:var(--gray-100);padding:1px 5px;border-radius:3px;font-size:12px;">patchwork</code>, <code style="background:var(--gray-100);padding:1px 5px;border-radius:3px;font-size:12px;">readxl</code>, dan <code style="background:var(--gray-100);padding:1px 5px;border-radius:3px;font-size:12px;">dplyr</code>. Kode di bawah dapat langsung dijalankan dengan file Excel yang disediakan.</p>

    <div class="code-wrap">
      <div class="code-header">
        <span class="code-lang"><span class="dot" style="background:#4fc3f7;"></span>R · Setup & Import Data</span>
        <button class="copy-btn" onclick="copyCode(this)">Salin</button>
      </div>
      <pre><span class="fn">library</span>(<span class="pkg">ggplot2</span>); <span class="fn">library</span>(<span class="pkg">readxl</span>); <span class="fn">library</span>(<span class="pkg">patchwork</span>)
<span class="fn">library</span>(<span class="pkg">scales</span>);  <span class="fn">library</span>(<span class="pkg">dplyr</span>);   <span class="fn">library</span>(<span class="pkg">tidyr</span>)
<span class="fn">library</span>(<span class="pkg">ggrepel</span>)   <span class="cm"># label titik scatter plot</span>

<span class="cm"># ── Baca data utama dari Excel ───────────────────────────────</span>
xl  <span class="op">&lt;-</span> <span class="str">"Input_Plot_GPM_NoWMO.xlsx"</span>
df  <span class="op">&lt;-</span> <span class="fn">read_excel</span>(xl, sheet <span class="op">=</span> <span class="str">"DATA_UTAMA"</span>, skip <span class="op">=</span> <span class="num">3</span>)
met <span class="op">&lt;-</span> <span class="fn">read_excel</span>(xl, sheet <span class="op">=</span> <span class="str">"METRIK_VALIDASI"</span>, skip <span class="op">=</span> <span class="num">3</span>)

<span class="cm"># ── Bersihkan nama kolom & konversi tipe data ────────────────</span>
df <span class="op">&lt;-</span> df <span class="op">|&gt;</span>
  <span class="fn">rename</span>(raw <span class="op">=</span> <span class="str">`GPM_Raw
(mm)`</span>, m4 <span class="op">=</span> <span class="str">`M4_Baru
(mm)`</span>,
         obs <span class="op">=</span> <span class="str">`Obs_BMKG
(mm)`</span>, fk <span class="op">=</span> <span class="str">`Fk_Baru
(rata²)`</span>) <span class="op">|&gt;</span>
  <span class="fn">filter</span>(<span class="op">!</span><span class="fn">is.na</span>(Tahun)) <span class="op">|&gt;</span>
  <span class="fn">mutate</span>(<span class="fn">across</span>(<span class="fn">c</span>(Tahun, raw, m4, obs, fk), as.numeric),
         tahun <span class="op">=</span> <span class="fn">as.integer</span>(Tahun),
         err_raw <span class="op">=</span> raw <span class="op">-</span> obs,
         err_m4  <span class="op">=</span> m4  <span class="op">-</span> obs)</pre>
    </div>

    <div class="code-wrap">
      <div class="code-header">
        <span class="code-lang"><span class="dot" style="background:#4fc3f7;"></span>R · Hitung Faktor Koreksi Fk & Terapkan ke GPM</span>
        <button class="copy-btn" onclick="copyCode(this)">Salin</button>
      </div>
      <pre><span class="cm"># ── Data referensi: HHMT dari stasiun BMKG & piksel GPM ─────</span>
<span class="cm"># Asumsi: df sudah memiliki kolom gnd_sy, gnd_ks, gpm_b4</span>

df <span class="op">&lt;-</span> df <span class="op">|&gt;</span>
  <span class="fn">mutate</span>(
    <span class="cm"># Fk per stasiun = BMKG / GPM_B4 (untuk setiap tahun)</span>
    fk_sy <span class="op">=</span> gnd_sy <span class="op">/</span> gpm_b4,
    fk_ks <span class="op">=</span> gnd_ks <span class="op">/</span> gpm_b4,

    <span class="cm"># Fk final = rata-rata stasiun yang tersedia</span>
    <span class="cm"># Jika salah satu NA (mis. 2010: gnd_sy = 0), gunakan yang ada</span>
    fk_m4 <span class="op">=</span> <span class="fn">case_when</span>(
      <span class="fn">is.na</span>(fk_sy) <span class="op">|</span> gnd_sy <span class="op">==</span> <span class="num">0</span> <span class="op">~</span> fk_ks,
      <span class="fn">is.na</span>(fk_ks)             <span class="op">~</span> fk_sy,
      <span class="kw">.default</span>                 <span class="op">~</span> <span class="fn">mean</span>(<span class="fn">c</span>(fk_sy, fk_ks))
    ),

    <span class="cm"># Terapkan Fk ke GPM Raw piksel B4</span>
    gpm_m4 <span class="op">=</span> gpm_b4 <span class="op">*</span> fk_m4
  )

<span class="cm"># ── Ringkasan statistik ──────────────────────────────────────</span>
<span class="fn">cat</span>(<span class="str">"Median Fk:"</span>, <span class="fn">round</span>(<span class="fn">median</span>(df<span class="op">$</span>fk_m4, na.rm <span class="op">=</span> <span class="kw">TRUE</span>), <span class="num">3</span>), <span class="str">"
"</span>)
<span class="fn">cat</span>(<span class="str">"Rentang:"</span>, <span class="fn">round</span>(<span class="fn">min</span>(df<span class="op">$</span>fk_m4), <span class="num">3</span>), <span class="str">"–"</span>,
                <span class="fn">round</span>(<span class="fn">max</span>(df<span class="op">$</span>fk_m4), <span class="num">3</span>), <span class="str">"
"</span>)</pre>
    </div>

    <div class="code-wrap">
      <div class="code-header">
        <span class="code-lang"><span class="dot" style="background:#4fc3f7;"></span>R · Hitung Metrik Validasi</span>
        <button class="copy-btn" onclick="copyCode(this)">Salin</button>
      </div>
      <pre><span class="cm"># ── Fungsi hitung metrik validasi ───────────────────────────</span>
<span class="fn">hitung_metrik</span> <span class="op">&lt;-</span> <span class="kw">function</span>(sim, obs) {
  n     <span class="op">&lt;-</span> <span class="fn">length</span>(sim)
  bias  <span class="op">&lt;-</span> sim <span class="op">-</span> obs
  R_val <span class="op">&lt;-</span> <span class="fn">cor</span>(obs, sim)
  NSE   <span class="op">&lt;-</span> <span class="num">1</span> <span class="op">-</span> <span class="fn">sum</span>(bias<span class="op">^</span><span class="num">2</span>) <span class="op">/</span> <span class="fn">sum</span>((obs <span class="op">-</span> <span class="fn">mean</span>(obs))<span class="op">^</span><span class="num">2</span>)
  KGE   <span class="op">&lt;-</span> <span class="num">1</span> <span class="op">-</span> <span class="fn">sqrt</span>((R_val<span class="op">-</span><span class="num">1</span>)<span class="op">^</span><span class="num">2</span> <span class="op">+</span>
                        (<span class="fn">sd</span>(sim)<span class="op">/</span><span class="fn">sd</span>(obs)<span class="op">-</span><span class="num">1</span>)<span class="op">^</span><span class="num">2</span> <span class="op">+</span>
                        (<span class="fn">mean</span>(sim)<span class="op">/</span><span class="fn">mean</span>(obs)<span class="op">-</span><span class="num">1</span>)<span class="op">^</span><span class="num">2</span>)
  PBIAS <span class="op">&lt;-</span> <span class="fn">sum</span>(bias) <span class="op">/</span> <span class="fn">sum</span>(obs) <span class="op">*</span> <span class="num">100</span>
  RMSE  <span class="op">&lt;-</span> <span class="fn">sqrt</span>(<span class="fn">mean</span>(bias<span class="op">^</span><span class="num">2</span>))
  MAE   <span class="op">&lt;-</span> <span class="fn">mean</span>(<span class="fn">abs</span>(bias))
  <span class="fn">data.frame</span>(R=R_val, NSE=NSE, KGE=KGE, PBIAS=PBIAS, RMSE=RMSE, MAE=MAE)
}

<span class="cm"># ── Bandingkan M0 (Raw) vs M4 ────────────────────────────────</span>
metrik_raw <span class="op">&lt;-</span> <span class="fn">hitung_metrik</span>(df<span class="op">$</span>raw, df<span class="op">$</span>obs)
metrik_m4  <span class="op">&lt;-</span> <span class="fn">hitung_metrik</span>(df<span class="op">$</span>m4,  df<span class="op">$</span>obs)

<span class="fn">bind_rows</span>(
  <span class="fn">mutate</span>(metrik_raw, Metode <span class="op">=</span> <span class="str">"GPM Raw"</span>),
  <span class="fn">mutate</span>(metrik_m4,  Metode <span class="op">=</span> <span class="str">"GPM M4"</span>)
) <span class="op">|&gt;</span> <span class="fn">select</span>(Metode, R, NSE, KGE, PBIAS, RMSE, MAE)</pre>
    </div>

    <div class="code-wrap">
      <div class="code-header">
        <span class="code-lang"><span class="dot" style="background:#4fc3f7;"></span>R · Time Series Plot (Panel 1)</span>
        <button class="copy-btn" onclick="copyCode(this)">Salin</button>
      </div>
      <pre><span class="cm"># ── Reshape ke long format untuk ggplot ──────────────────────</span>
df_long <span class="op">&lt;-</span> df <span class="op">|&gt;</span>
  <span class="fn">select</span>(tahun, raw, m4, obs) <span class="op">|&gt;</span>
  <span class="fn">pivot_longer</span>(<span class="fn">c</span>(raw, m4, obs), names_to <span class="op">=</span> <span class="str">"seri"</span>, values_to <span class="op">=</span> <span class="str">"hhmt"</span>) <span class="op">|&gt;</span>
  <span class="fn">mutate</span>(seri <span class="op">=</span> <span class="fn">factor</span>(seri,
    levels <span class="op">=</span> <span class="fn">c</span>(<span class="str">"obs"</span>, <span class="str">"m4"</span>, <span class="str">"raw"</span>),
    labels <span class="op">=</span> <span class="fn">c</span>(<span class="str">"Obs BMKG"</span>, <span class="str">"GPM M4 (Koreksi)"</span>, <span class="str">"GPM Raw"</span>)))

p1 <span class="op">&lt;-</span> <span class="fn">ggplot</span>(df_long, <span class="fn">aes</span>(x <span class="op">=</span> tahun, y <span class="op">=</span> hhmt,
       color <span class="op">=</span> seri, linetype <span class="op">=</span> seri, linewidth <span class="op">=</span> seri)) <span class="op">+</span>
  <span class="fn">geom_line</span>(na.rm <span class="op">=</span> <span class="kw">TRUE</span>) <span class="op">+</span>
  <span class="fn">geom_point</span>(data <span class="op">=</span> <span class="op">.</span> <span class="op">|&gt;</span> <span class="fn">filter</span>(seri <span class="op">==</span> <span class="str">"Obs BMKG"</span>),
             size <span class="op">=</span> <span class="num">1.8</span>, shape <span class="op">=</span> <span class="num">21</span>) <span class="op">+</span>
  <span class="fn">geom_label</span>(data <span class="op">=</span> df <span class="op">|&gt;</span> <span class="fn">filter</span>(m4 <span class="op">&gt;</span> <span class="num">200</span>),
             <span class="fn">aes</span>(x <span class="op">=</span> tahun, y <span class="op">=</span> m4 <span class="op">+</span> <span class="num">8</span>,
                 label <span class="op">=</span> <span class="fn">paste0</span>(tahun, <span class="str">"
"</span>, m4, <span class="str">"mm"</span>)),
             inherit.aes <span class="op">=</span> <span class="kw">FALSE</span>, size <span class="op">=</span> <span class="num">2.8</span>, color <span class="op">=</span> <span class="str">"#1A5276"</span>) <span class="op">+</span>
  <span class="fn">scale_color_manual</span>(
    values <span class="op">=</span> <span class="fn">c</span>(<span class="str">"Obs BMKG"</span><span class="op">=</span><span class="str">"#B45309"</span>, <span class="str">"GPM M4 (Koreksi)"</span><span class="op">=</span><span class="str">"#1A5276"</span>,
               <span class="str">"GPM Raw"</span><span class="op">=</span><span class="str">"#B91C1C"</span>), name <span class="op">=</span> <span class="kw">NULL</span>) <span class="op">+</span>
  <span class="fn">scale_linetype_manual</span>(
    values <span class="op">=</span> <span class="fn">c</span>(<span class="str">"Obs BMKG"</span><span class="op">=</span><span class="str">"dashed"</span>, <span class="str">"GPM M4 (Koreksi)"</span><span class="op">=</span><span class="str">"solid"</span>,
               <span class="str">"GPM Raw"</span><span class="op">=</span><span class="str">"solid"</span>), name <span class="op">=</span> <span class="kw">NULL</span>) <span class="op">+</span>
  <span class="fn">scale_y_continuous</span>(
    limits <span class="op">=</span> <span class="fn">c</span>(<span class="num">0</span>, <span class="num">280</span>),
    labels <span class="op">=</span> <span class="kw">function</span>(x) <span class="fn">paste0</span>(x, <span class="str">" mm"</span>)) <span class="op">+</span>
  <span class="fn">labs</span>(
    title    <span class="op">=</span> <span class="str">"Time Series HHMT Tahunan"</span>,
    subtitle <span class="op">=</span> <span class="str">"GPM Raw vs GPM M4 vs Observasi BMKG | 1998–2025"</span>,
    x <span class="op">=</span> <span class="kw">NULL</span>, y <span class="op">=</span> <span class="str">"HHMT (mm)"</span>,
    caption  <span class="op">=</span> <span class="str">"Sumber: GPM IMERG V07 (NASA) | BMKG Syamsuddin Noor + BMKG Kalsel"</span>
  ) <span class="op">+</span>
  <span class="fn">theme_minimal</span>(base_size <span class="op">=</span> <span class="num">11</span>) <span class="op">+</span>
  <span class="fn">theme</span>(plot.title <span class="op">=</span> <span class="fn">element_text</span>(face <span class="op">=</span> <span class="str">"bold"</span>))

<span class="cm"># ── Scatter Plot: M4 vs Obs ───────────────────────────────────</span>
p_scatter <span class="op">&lt;-</span> <span class="fn">ggplot</span>(df, <span class="fn">aes</span>(x <span class="op">=</span> obs, y <span class="op">=</span> m4)) <span class="op">+</span>
  <span class="fn">geom_abline</span>(slope <span class="op">=</span> <span class="num">1</span>, intercept <span class="op">=</span> <span class="num">0</span>,
              linetype <span class="op">=</span> <span class="str">"dashed"</span>, color <span class="op">=</span> <span class="str">"#94A3B8"</span>) <span class="op">+</span>
  <span class="fn">geom_point</span>(color <span class="op">=</span> <span class="str">"#1A5276"</span>, size <span class="op">=</span> <span class="num">3</span>, shape <span class="op">=</span> <span class="num">21</span>) <span class="op">+</span>
  <span class="fn">ggrepel</span>::<span class="fn">geom_text_repel</span>(<span class="fn">aes</span>(label <span class="op">=</span> tahun),
              size <span class="op">=</span> <span class="num">2.5</span>, color <span class="op">=</span> <span class="str">"#475569"</span>) <span class="op">+</span>
  <span class="fn">geom_smooth</span>(method <span class="op">=</span> <span class="str">"lm"</span>, se <span class="op">=</span> <span class="kw">TRUE</span>,
              color <span class="op">=</span> <span class="str">"#1A5276"</span>, fill <span class="op">=</span> <span class="str">"#1A527622"</span>) <span class="op">+</span>
  <span class="fn">coord_equal</span>() <span class="op">+</span>
  <span class="fn">labs</span>(title <span class="op">=</span> <span class="str">"Scatter: GPM M4 vs Obs BMKG"</span>,
       x <span class="op">=</span> <span class="str">"Observasi BMKG (mm)"</span>, y <span class="op">=</span> <span class="str">"GPM M4 (mm)"</span>)

<span class="cm"># ── Gabung & simpan ──────────────────────────────────────────</span>
fig_final <span class="op">&lt;-</span> p1 <span class="op">/</span> p_scatter <span class="op">+</span>
  <span class="fn">plot_annotation</span>(
    title   <span class="op">=</span> <span class="str">"Koreksi Bias GPM IMERG V07 — WPG Banjarmasin"</span>,
    caption <span class="op">=</span> <span class="str">"SNI 2415:2016 | Teutschbein & Seibert (2012)"</span>)

<span class="fn">ggsave</span>(<span class="str">"hasil_kalibrasi_gpm.png"</span>, fig_final,
       width <span class="op">=</span> <span class="num">36</span>, height <span class="op">=</span> <span class="num">30</span>, units <span class="op">=</span> <span class="str">"cm"</span>, dpi <span class="op">=</span> <span class="num">300</span>)</pre>
    </div>
  </section>

  <div class="divider"></div>

  <!-- ===== S8: KESIMPULAN ===== -->
  <section class="section anim-in" id="s8">
    <div class="section-header"><div class="section-num">8</div><h2>Kesimpulan</h2></div>

    <div class="card card-green">
      <div class="card-label" style="margin-bottom:10px;">Ringkasan Hasil</div>
      <div class="step-flow">
        <div class="step-item">
          <div class="step-line"><div class="step-dot" style="background:var(--green);">✓</div><div class="step-connector"></div></div>
          <div class="step-body">
            <div class="step-title">GPM Raw tidak layak digunakan langsung</div>
            <div class="step-desc">PBIAS = −31.9% dan NSE = −1.06 mengonfirmasi bahwa data mentah GPM IMERG secara sistematis meremehkan HHMT di wilayah Banjarmasin sebesar ~32% — tidak memenuhi threshold SNI 2415:2016 untuk analisis hidrologi desain.</div>
          </div>
        </div>
        <div class="step-item">
          <div class="step-line"><div class="step-dot" style="background:var(--green);">✓</div><div class="step-connector"></div></div>
          <div class="step-body">
            <div class="step-title">Metode M4 (Year-Specific Scaling) adalah yang terbaik</div>
            <div class="step-desc">Dibandingkan M1 (CF bulanan), M2 (direct scaling), dan M3 (quantile mapping), metode M4 menghasilkan metrik terbaik karena Fk dikalibrasi unik per tahun dari rata-rata dua stasiun BMKG — menangkap variabilitas antar tahun yang signifikan.</div>
          </div>
        </div>
        <div class="step-item">
          <div class="step-line"><div class="step-dot" style="background:var(--green);">✓</div><div class="step-connector"></div></div>
          <div class="step-body">
            <div class="step-title">Semua metrik validasi masuk kategori Sangat Baik</div>
            <div class="step-desc">Setelah kalibrasi M4: R=0.900, NSE=0.772, KGE=0.879, PBIAS=+3.5%, RMSE=15.8 mm. Semua nilai melampaui threshold Sangat Baik (SB) menurut Moriasi et al. (2007) dan SNI 2415:2016.</div>
          </div>
        </div>
        <div class="step-item">
          <div class="step-line"><div class="step-dot" style="background:var(--green);">✓</div><div class="step-connector"></div></div>
          <div class="step-body">
            <div class="step-title">Aplikasi praktis: data GPM M4 layak untuk analisis frekuensi</div>
            <div class="step-desc">Dengan kualitas data yang sudah masuk SB, GPM M4 dapat digunakan sebagai data curah hujan dalam analisis frekuensi (menghitung return period 25, 50, 100 tahun) untuk desain bangunan air di wilayah yang tidak memiliki stasiun observasi.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid-2" style="margin-top:1rem;">
      <div class="card">
        <div class="card-label">Referensi Utama</div>
        <p style="line-height:2; font-size:12px;">
          📚 Moriasi et al. (2007) — Model Evaluation Guidelines<br>
          📚 Teutschbein &amp; Seibert (2012) — Bias Correction Methods<br>
          📚 Knoben et al. (2019) — KGE Commentary<br>
          📚 SNI 2415:2016 — Tata Cara Perhitungan Debit Banjir Rencana<br>
          🛰️ NASA GPM IMERG V07 Final Run<br>
          🌧️ BMKG Stasiun Syamsuddin Noor &amp; BMKG Kalsel
        </p>
      </div>
      <div class="card">
        <div class="card-label">Keterbatasan &amp; Pengembangan</div>
        <p style="line-height:1.8; font-size:12px;">
          ⚠️ Fk bersifat historis — proyeksi masa depan asumsi Fk = median<br>
          ⚠️ Hanya 2 stasiun BMKG — wilayah DAS besar butuh lebih banyak<br>
          ⚠️ Koreksi bias pada level HHMT — bukan distribusi harian penuh<br>
          🔭 Pengembangan: uji pada stasiun lain &amp; periode lebih panjang<br>
          🔭 Kombinasikan M4 dengan M3 (Quantile Mapping) untuk distribusi
        </p>
      </div>
    </div>

    <div style="background:linear-gradient(135deg,#0A2342,#1A3a5c 60%,#2d1065);color:#fff;border-radius:var(--radius);padding:1.75rem 2rem;text-align:center;margin-top:1.5rem;">
      <div style="font-size:18px;font-weight:700;margin-bottom:8px;">Ada pertanyaan tentang kalibrasi data GPM?</div>
      <p style="font-size:13px;color:rgba(255,255,255,0.65);margin-bottom:1.25rem;">Diskusi metodologi, data, atau implementasi di proyekmu</p>
      <a href="https://www.irpanchumaedi.com/#contact" target="_top" style="display:inline-block;background:var(--blue-mid);color:#fff;font-size:13px;font-weight:600;padding:10px 24px;border-radius:20px;text-decoration:none;">Hubungi saya →</a>
    </div>
  </section>
</div>
<script>

/* DATA */
const years   = [1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
const rawData = [62.8, 71.0, 75.4, 66.4, 64.6, 70.6, 89.3, 63.4, 76.1, 70.7, 82.7, 58.3, 81.5, 161.3, 64.8, 74.6, 67.2, 53.1, 71.1, 92.9, 72.8, 67.9, 57.2, 105.2, 62.7, 57.1, 103.1, 63.9];
const m4Data  = [105.3, 92.2, 98.3, 83.8, 95.0, 139.6, 136.0, 64.2, 85.5, 97.9, 149.1, 101.9, 90.5, 135.8, 94.0, 103.0, 165.7, 107.4, 108.0, 99.5, 101.7, 84.0, 124.1, 252.2, 135.0, 131.1, 127.7, 92.6];
const obsData = [86.1, 93.1, 101.0, 78.9, 119.8, 119.8, 136.1, 62.2, 80.0, 109.3, 116.2, 105.2, 90.5, 113.0, 92.4, 118.2, 117.5, 98.9, 108.0, 111.8, 112.1, 70.5, 122.1, 249.0, 120.8, 127.6, 148.4, 84.4];
const fkData  = [1.6768, 1.2979, 1.3031, 1.262, 1.4706, 1.978, 1.523, 1.0134, 1.1229, 1.3847, 1.8035, 1.7479, 1.1104, 0.8419, 1.4506, 1.3807, 2.4658, 2.0235, 1.519, 1.071, 1.397, 1.2364, 2.1696, 2.3969, 2.1531, 2.296, 1.2386, 1.4491];
const errRaw  = rawData.map((v,i) => parseFloat((v - obsData[i]).toFixed(1)));
const errM4   = m4Data.map((v,i)  => parseFloat((v - obsData[i]).toFixed(1)));
const medFk   = (() => { const s=[...fkData].sort((a,b)=>a-b); const m=Math.floor(s.length/2); return s.length%2?s[m]:(s[m-1]+s[m])/2; })();

/* PROGRESS */
function updateProgress() {
  const pct = Math.round((window.scrollY/(document.body.scrollHeight-window.innerHeight))*100)||0;
  document.getElementById('progBar').style.width = pct+'%';
  document.getElementById('progPct').textContent = pct+'%';
  updateToc();
}
window.addEventListener('scroll', updateProgress, {passive:true});

/* TOC */
function updateToc() {
  const secs  = document.querySelectorAll('section[id],div[id]');
  const links = document.querySelectorAll('.toc-link');
  let active = '';
  secs.forEach(s => { if(s.getBoundingClientRect().top < 120) active = s.id; });
  links.forEach(l => {
    const href = l.getAttribute('href').slice(1);
    l.classList.toggle('active', href === active);
  });
}
function toggleToc() {
  const toc = document.getElementById('tocFloat');
  toc.classList.toggle('collapsed');
  // Save state
  try { localStorage.setItem('tocCollapsed', toc.classList.contains('collapsed')); } catch(e){}
}
function toggleTocMobile() {
  const toc = document.getElementById('tocFloat');
  toc.style.display = toc.style.display === 'block' ? 'none' : 'block';
}
// Restore collapse state
(function(){
  try {
    if(localStorage.getItem('tocCollapsed') === 'true') {
      document.getElementById('tocFloat').classList.add('collapsed');
    }
  } catch(e){}
})();

/* FILL TABLE */
const tbody = document.getElementById('tblBody');
const rowData = [
  [1998,62.8,1.677,105.3,86.1],   [1999,71.0,1.298,92.2,93.1],
  [2000,75.4,1.303,98.3,101.0],   [2001,66.4,1.262,83.8,78.9],
  [2002,64.6,1.471,95.0,119.8],   [2003,70.6,1.978,139.6,119.8],
  [2004,89.3,1.523,136.0,136.1],  [2005,63.4,1.013,64.2,62.2],
  [2006,76.1,1.123,85.5,80.0],    [2007,70.7,1.385,97.9,109.3],
  [2008,82.7,1.804,149.1,116.2],  [2009,58.3,1.748,101.9,105.2],
  [2010,81.5,1.110,90.5,90.5],    [2011,161.3,0.842,135.8,113.0],
  [2012,64.8,1.451,94.0,92.4],    [2013,74.6,1.381,103.0,118.2],
  [2014,67.2,2.466,165.7,117.5],  [2015,53.1,2.024,107.4,98.9],
  [2016,71.1,1.519,108.0,108.0],  [2017,92.9,1.071,99.5,111.8],
  [2018,72.8,1.397,101.7,112.1],  [2019,67.9,1.236,84.0,70.5],
  [2020,57.2,2.170,124.1,122.1],  [2021,105.2,2.397,252.2,249.0],
  [2022,62.7,2.153,135.0,120.8],  [2023,57.1,2.296,131.1,127.6],
  [2024,103.1,1.239,127.7,148.4], [2025,63.9,1.449,92.6,84.4]
];
rowData.forEach(([yr,raw,fk,m4,obs]) => {
  const er = parseFloat((raw-obs).toFixed(1));
  const em = parseFloat((m4-obs).toFixed(1));
  const tr = document.createElement('tr');
  tr.innerHTML = `<td>${yr}</td>
    <td class="${er<0?'neg':'pos'}">${raw}</td>
    <td style="color:#6D28D9;font-weight:600;">${fk.toFixed(3)}</td>
    <td class="${Math.abs(em)<15?'good':''}">${m4}</td>
    <td>${obs}</td>
    <td class="${er<0?'bad':'pos'}">${er>0?'+':''}${er}</td>
    <td class="${Math.abs(em)<15?'good':'bad'}">${em>0?'+':''}${em}</td>`;
  tbody.appendChild(tr);
});

/* CHARTS */
const CH = {};
function buildCharts() {
  // ── Residual Error ──────────────────────────────────────────
  const ctx1 = document.getElementById('chartResidual');
  if(ctx1 && !CH.r) {
    ctx1.height = 240;
    CH.r = new Chart(ctx1, {
      type:'bar',
      data:{
        labels: years,
        datasets:[
          {label:'Error GPM Raw', data:errRaw, backgroundColor:'rgba(185,28,28,0.72)', borderRadius:3},
          {label:'Error GPM M4',  data:errM4,  backgroundColor:'rgba(26,82,118,0.78)',  borderRadius:3},
          {type:'line', label:'Zona +10mm', data:Array(28).fill(10),
            borderColor:'rgba(29,111,66,0.5)', borderWidth:1.5, borderDash:[5,4], pointRadius:0, fill:false},
          {type:'line', label:'Zona -10mm', data:Array(28).fill(-10),
            borderColor:'rgba(29,111,66,0.5)', borderWidth:1.5, borderDash:[5,4], pointRadius:0, fill:'-1',
            backgroundColor:'rgba(29,111,66,0.08)'}
        ]
      },
      options:{
        responsive:true, maintainAspectRatio:false,
        plugins:{
          legend:{display:true, position:'bottom', labels:{font:{size:11}, usePointStyle:true,
            filter: item => !item.text.startsWith('Zona')}},
          tooltip:{callbacks:{label:c => {
            if(c.dataset.label.startsWith('Zona')) return null;
            const sign = c.raw > 0 ? '+' : '';
            return c.dataset.label + ': ' + sign + c.raw + ' mm';
          }}}
        },
        scales:{
          x:{ticks:{font:{size:10}, maxRotation:60, autoSkip:false}, grid:{display:false}},
          y:{title:{display:true, text:'Error (mm)'}, ticks:{font:{size:11}},
             grid:{color:'rgba(0,0,0,0.06)'}}
        },
        animation:{duration:700}
      }
    });
  }

  // ── Metrik Validasi ─────────────────────────────────────────
  const ctx2 = document.getElementById('chartMetrik');
  if(ctx2 && !CH.m) {
    ctx2.height = 280;
    CH.m = new Chart(ctx2, {
      type:'bar',
      data:{
        labels:['R (Korelasi)', 'R² (Determinasi)', 'NSE (Nash-Sutcliffe)', 'KGE (Kling-Gupta)'],
        datasets:[
          {label:'GPM Raw', data:[0.373,0.139,-1.062,0.206], backgroundColor:'rgba(185,28,28,0.75)', borderRadius:4},
          {label:'GPM M4',  data:[0.900,0.811, 0.772, 0.879], backgroundColor:'rgba(26,82,118,0.80)',  borderRadius:4},
          {type:'line', label:'Threshold SB (0.75)', data:[0.75,0.75,0.75,0.75],
            borderColor:'#1d6f42', borderWidth:2, borderDash:[6,4], pointRadius:0, fill:false}
        ]
      },
      options:{
        responsive:true, maintainAspectRatio:false,
        plugins:{
          legend:{position:'bottom', labels:{font:{size:11}, usePointStyle:true}},
          tooltip:{callbacks:{label:c => c.dataset.label + ': ' + Number(c.raw).toFixed(3)}}
        },
        scales:{
          x:{ticks:{font:{size:11}}, grid:{display:false}},
          y:{min:-1.2, max:1.05, title:{display:true, text:'Nilai Metrik'}, ticks:{font:{size:11}}}
        },
        animation:{duration:800}
      }
    });
  }

  // ── Faktor Koreksi Fk ───────────────────────────────────────
  const ctx3 = document.getElementById('chartFk');
  if(ctx3 && !CH.fk) {
    ctx3.height = 260;
    const medLabel = 'Median Fk (' + medFk.toFixed(3) + ')';
    CH.fk = new Chart(ctx3, {
      type:'bar',
      data:{
        labels: years,
        datasets:[
          {label:'Fk per tahun', data:fkData, backgroundColor:'rgba(109,40,217,0.75)', borderRadius:3},
          {type:'line', label: medLabel, data:Array(28).fill(medFk),
            borderColor:'#6D28D9', borderWidth:2, borderDash:[6,4], pointRadius:0, fill:false},
          {type:'line', label:'Fk = 1.0', data:Array(28).fill(1.0),
            borderColor:'#94a3b8', borderWidth:1.5, borderDash:[3,3], pointRadius:0, fill:false}
        ]
      },
      options:{
        responsive:true, maintainAspectRatio:false,
        plugins:{
          legend:{display:false},
          tooltip:{callbacks:{label:c => {
            if(c.datasetIndex === 0) return 'Fk: ' + Number(c.raw).toFixed(3);
            return c.dataset.label;
          }}}
        },
        scales:{
          x:{ticks:{font:{size:10}, maxRotation:60, autoSkip:false}, grid:{display:false}},
          y:{min:0, max:2.85, title:{display:true, text:'Fk (-)'}, ticks:{font:{size:11}}}
        },
        animation:{duration:700}
      }
    });
  }
}

/* INTERSECTION OBSERVER */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.classList.add('visible');
      buildCharts();
    }
  });
}, {threshold:0.01, rootMargin:'0px 0px -10px 0px'});
document.querySelectorAll('.anim-in').forEach(el => io.observe(el));

// Fallback: build charts immediately in case IO doesn't fire (iframe context)
setTimeout(buildCharts, 400);

/* COPY */
function copyCode(btn) {
  const text = btn.closest('.code-wrap').querySelector('pre').innerText;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent='✓ Tersalin!';
    setTimeout(()=>btn.textContent='Salin',2000);
  });
}

updateProgress();
buildCharts();

</script>
{{< /rawhtml >}}
