---
title: "Perhitungan Debit Banjir Rencana"
summary: "Panduan lengkap perhitungan debit banjir rencana menggunakan metode Nakayasu, Snyder, dan Rational. Dilengkapi kalkulator interaktif dan contoh penerapan SNI 2415:2016."
authors: ["irpan-chumaedi"]
tags: ["debit banjir", "hidrograf satuan", "Nakayasu", "hidrologi", "SNI 2415", "R"]
categories: ["Hidrologi"]
date: 2024-02-03
lastmod: 2024-02-03
draft: false
description: "Cara menghitung debit banjir rencana dengan metode Nakayasu, Snyder, dan Rational. Kalkulator interaktif dan contoh numerik lengkap."
modul_hecras: true
reading_time: true
share: true
toc: false
---

{{< rawhtml >}}
<style>
.materi-debit {
  --navy:#0A2342;--blue:#185fa5;--blue-mid:#378add;--blue-light:#85b7eb;--blue-pale:#e6f1fb;
  --red:#B91C1C;--red-light:#fee2e2;--navy2:#1A5276;
  --amber:#B45309;--amber-light:#fef3c7;
  --purple:#6D28D9;--purple-light:#ede9fe;
  --green:#1d6f42;--green-light:#d1fae5;
  --teal:#0d6efd;--teal-light:#e7f1ff;
  --gray-100:#f8fafc;--gray-200:#e2e8f0;--gray-300:#cbd5e1;
  --gray-500:#64748b;--gray-600:#475569;--gray-700:#334155;--gray-900:#0f172a;
  --radius:10px;--radius-sm:6px;
  --shadow:0 2px 12px rgba(0,0,0,0.07);--shadow-md:0 4px 20px rgba(0,0,0,0.10);
  --code-bg:#1e1e2e;
}


.materi-debit, .materi-debit *::before, .materi-debit *::after {box-sizing:border-box;margin:0;padding:0;}


.materi-debit .sticky-nav {position:sticky;top:0;z-index:200;background:#fff;border-bottom:1px solid var(--gray-200);box-shadow:var(--shadow);}
.materi-debit .sticky-inner {max-width:960px;margin:0 auto;padding:0 1.25rem;display:flex;align-items:center;gap:1rem;height:52px;}
.materi-debit .sticky-title {font-size:13px;font-weight:600;color:var(--navy);white-space:nowrap;}
.materi-debit .progress-track {flex:1;height:4px;background:var(--gray-200);border-radius:2px;}
.materi-debit .progress-fill {height:100%;background:linear-gradient(90deg,var(--blue),var(--purple));border-radius:2px;width:0%;transition:width 0.3s;}
.materi-debit .sticky-pct {font-size:12px;color:var(--gray-500);min-width:32px;}
.materi-debit .toc-float {position:fixed;top:80px;right:0;width:200px;background:#fff;border:1px solid var(--gray-200);border-right:none;border-radius:var(--radius) 0 0 var(--radius);box-shadow:-2px 4px 16px rgba(0,0,0,0.09);z-index:150;transition:all 0.28s cubic-bezier(0.4,0,0.2,1);overflow:hidden;}
.materi-debit .toc-float.collapsed {width:32px;}
.materi-debit .toc-head {display:flex;align-items:center;justify-content:space-between;padding:8px 10px 8px 12px;border-bottom:1px solid var(--gray-200);cursor:pointer;user-select:none;background:var(--navy);border-radius:var(--radius) 0 0 0;}
.materi-debit .toc-head:hover {background:#1a3a5c;}
.materi-debit .toc-title {font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:rgba(255,255,255,0.9);white-space:nowrap;overflow:hidden;}
.materi-debit .toc-chevron {font-size:11px;color:rgba(255,255,255,0.7);flex-shrink:0;transition:transform 0.25s;margin-left:6px;}
.materi-debit .toc-float.collapsed .toc-chevron {transform:rotate(180deg);}
.materi-debit .toc-float.collapsed .toc-title {opacity:0;width:0;margin:0;}
.materi-debit .toc-body {padding:8px 6px;max-height:calc(100vh - 140px);overflow-y:auto;scrollbar-width:thin;scrollbar-color:var(--gray-300) transparent;}
.materi-debit .toc-body::-webkit-scrollbar {width:3px;}
.materi-debit .toc-body::-webkit-scrollbar-thumb {background:var(--gray-300);border-radius:2px;}
.materi-debit .toc-float.collapsed .toc-body {display:none;}
.materi-debit .toc-link {display:block;font-size:11px;color:var(--gray-600);text-decoration:none;padding:3px 8px;border-radius:4px;border-left:2px solid transparent;margin-bottom:1px;transition:all 0.15s;line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.materi-debit .toc-link:hover {background:var(--blue-pale);color:var(--blue);border-left-color:var(--blue);}
.materi-debit .toc-link.active {background:var(--blue-pale);color:var(--blue);border-left-color:var(--blue);font-weight:600;}
.materi-debit .toc-link.sub {padding-left:14px;font-size:10px;color:var(--gray-500);}
.materi-debit .toc-link.sub.active {color:var(--blue);}
.materi-debit .toc-toggle {display:none;position:fixed;bottom:20px;right:16px;width:40px;height:40px;border-radius:50%;background:var(--navy);color:#fff;border:none;font-size:16px;cursor:pointer;box-shadow:var(--shadow-md);z-index:160;align-items:center;justify-content:center;}
@.materi-debit media(max-width:1100px) {.toc-float{display:none;}.materi-debit .toc-toggle {display:flex;}.materi-debit }
.hero {background:linear-gradient(135deg,#0A2342 0%,#0e3a6b 50%,#1a1065 100%);color:#fff;padding:3rem 1.5rem 2.5rem;border-radius:0 0 var(--radius) var(--radius);margin-bottom:2rem;position:relative;overflow:hidden;}
.materi-debit .hero::before {content:'';position:absolute;top:-80px;right:-60px;width:300px;height:300px;border-radius:50%;background:rgba(55,138,221,0.12);}
.materi-debit .hero::after {content:'';position:absolute;bottom:-100px;left:10%;width:250px;height:250px;border-radius:50%;background:rgba(109,40,217,0.10);}
.materi-debit .hero-inner {max-width:960px;margin:0 auto;position:relative;z-index:1;}
.materi-debit .hero-badge {display:inline-block;background:rgba(55,138,221,0.25);color:#85b7eb;font-size:11px;padding:3px 10px;border-radius:20px;margin-bottom:0.75rem;letter-spacing:0.04em;}
.materi-debit .hero h1 {font-size:clamp(22px,4vw,30px);font-weight:700;line-height:1.3;margin-bottom:0.5rem;}
.materi-debit .hero-sub {font-size:14px;color:rgba(255,255,255,0.65);margin-bottom:1.5rem;}
.materi-debit .hero-pills {display:flex;flex-wrap:wrap;gap:8px;margin-top:1rem;}
.materi-debit .hero-pill {display:inline-block;font-size:11px;padding:4px 10px;border-radius:20px;font-weight:600;border:1px solid;}
.materi-debit .pill-blue {background:rgba(26,82,118,0.3);color:#85b7eb;border-color:rgba(26,82,118,0.5);}
.materi-debit .pill-amber {background:rgba(180,83,9,0.25);color:#fcd34d;border-color:rgba(180,83,9,0.4);}
.materi-debit .pill-purple {background:rgba(109,40,217,0.25);color:#c4b5fd;border-color:rgba(109,40,217,0.4);}
.materi-debit .pill-green {background:rgba(29,111,66,0.25);color:#6ee7b7;border-color:rgba(29,111,66,0.4);}
.materi-debit .pill-red {background:rgba(185,28,28,0.25);color:#fca5a5;border-color:rgba(185,28,28,0.4);}
.materi-debit .hero-meta {display:flex;flex-wrap:wrap;gap:1.25rem;margin-top:1rem;}
.materi-debit .hero-meta-item {font-size:12px;color:rgba(255,255,255,0.55);}
.materi-debit .wrap {max-width:960px;margin:0 auto;padding:0 1.25rem 4rem;}
.materi-debit .section {margin-bottom:3rem;}
.materi-debit .section-header {display:flex;align-items:center;gap:12px;margin-bottom:1.25rem;}
.materi-debit .section-num {width:32px;height:32px;border-radius:50%;background:var(--navy);color:#fff;font-size:13px;font-weight:600;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.materi-debit .section-header h2 {font-size:20px;font-weight:700;color:var(--gray-900);}
.materi-debit .subsection {margin:1.5rem 0 0.75rem;}
.materi-debit .subsection h3 {font-size:15px;font-weight:700;color:var(--gray-700);padding-left:10px;border-left:3px solid var(--blue-mid);margin-bottom:0.75rem;}
.materi-debit .card {background:#fff;border-radius:var(--radius);padding:1.25rem 1.5rem;box-shadow:var(--shadow);margin-bottom:1rem;}
.materi-debit .card-navy {border-left:4px solid var(--navy);}
.materi-debit .card-blue {border-left:4px solid var(--blue-mid);}
.materi-debit .card-red {border-left:4px solid var(--red);}
.materi-debit .card-amber {border-left:4px solid var(--amber);}
.materi-debit .card-green {border-left:4px solid var(--green);}
.materi-debit .card-purple {border-left:4px solid var(--purple);}
.materi-debit .card-label {font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.07em;color:var(--gray-500);margin-bottom:6px;}
.materi-debit .card p {font-size:13px;color:var(--gray-600);line-height:1.7;}
.materi-debit .card strong {color:var(--gray-800);}
.materi-debit .grid-2 {display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;}
.materi-debit .grid-3 {display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;margin-bottom:1rem;}
.materi-debit .grid-4 {display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;}
@.materi-debit media(max-width:700px) {.grid-2,.grid-3,.grid-4{grid-template-columns:1fr;}.materi-debit }
@media(max-width:900px) and (min-width:701px) {.grid-3{grid-template-columns:1fr 1fr;}.materi-debit .grid-4 {grid-template-columns:1fr 1fr;}.materi-debit }
.metric-card {background:#fff;border-radius:var(--radius);padding:1rem 1.1rem;box-shadow:var(--shadow);text-align:center;position:relative;overflow:hidden;}
.materi-debit .metric-card::before {content:'';position:absolute;top:0;left:0;right:0;height:3px;}
.materi-debit .metric-card.blue::before {background:var(--blue);}
.materi-debit .metric-card.green::before {background:var(--green);}
.materi-debit .metric-card.amber::before {background:var(--amber);}
.materi-debit .metric-card.purple::before {background:var(--purple);}
.materi-debit .metric-card.red::before {background:var(--red);}
.materi-debit .metric-card.navy::before {background:var(--navy);}
.materi-debit .metric-label {font-size:11px;color:var(--gray-500);font-weight:600;margin-bottom:4px;}
.materi-debit .metric-val {font-size:20px;font-weight:700;color:var(--navy);}
.materi-debit .metric-unit {font-size:11px;color:var(--gray-500);margin-top:3px;}
.materi-debit .info-box {display:flex;gap:10px;background:var(--blue-pale);border:1px solid #b5d4f4;border-radius:var(--radius-sm);padding:.9rem 1rem;font-size:13px;color:#0c447c;margin:1rem 0;line-height:1.55;}
.materi-debit .warn-box {display:flex;gap:10px;background:var(--amber-light);border:1px solid #fac775;border-radius:var(--radius-sm);padding:.9rem 1rem;font-size:13px;color:var(--amber);margin:1rem 0;line-height:1.55;}
.materi-debit .success-box {display:flex;gap:10px;background:var(--green-light);border:1px solid #a7f3d0;border-radius:var(--radius-sm);padding:.9rem 1rem;font-size:13px;color:var(--green);margin:1rem 0;line-height:1.55;}
.materi-debit .purple-box {display:flex;gap:10px;background:var(--purple-light);border:1px solid #c4b5fd;border-radius:var(--radius-sm);padding:.9rem 1rem;font-size:13px;color:var(--purple);margin:1rem 0;line-height:1.55;}
.materi-debit .box-icon {font-size:18px;flex-shrink:0;line-height:1.3;}
.materi-debit .formula-block {background:#0f172a;border-radius:var(--radius-sm);padding:1rem 1.25rem;margin:.75rem 0;font-family:'Consolas','Courier New',monospace;font-size:14px;color:#e2e8f0;letter-spacing:0.02em;border-left:4px solid var(--purple);}
.materi-debit .formula-block .eq-label {font-size:11px;color:#94a3b8;display:block;margin-bottom:4px;}
.materi-debit .formula-block .eq-main {color:#c4b5fd;font-size:15px;display:block;text-align:center;margin:6px 0;}
.materi-debit .formula-block .eq-desc {font-size:11px;color:#64748b;display:block;margin-top:6px;}
.materi-debit .step-flow {margin:1rem 0;}
.materi-debit .step-item {display:flex;gap:14px;}
.materi-debit .step-line {display:flex;flex-direction:column;align-items:center;}
.materi-debit .step-dot {width:30px;height:30px;border-radius:50%;background:var(--blue-mid);color:#fff;font-size:12px;font-weight:600;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.materi-debit .step-dot.navy {background:var(--navy);}
.materi-debit .step-dot.green {background:var(--green);}
.materi-debit .step-dot.purple {background:var(--purple);}
.materi-debit .step-dot.amber {background:var(--amber);}
.materi-debit .step-dot.red {background:var(--red);}
.materi-debit .step-connector {width:2px;background:var(--gray-200);flex:1;min-height:16px;margin:3px 0;}
.materi-debit .step-body {padding-bottom:20px;flex:1;}
.materi-debit .step-title {font-size:14px;font-weight:600;color:var(--gray-800);margin-bottom:4px;}
.materi-debit .step-desc {font-size:13px;color:var(--gray-600);line-height:1.6;}
.materi-debit .code-wrap {background:var(--code-bg);border-radius:var(--radius-sm);overflow:hidden;margin:.75rem 0;box-shadow:var(--shadow-md);}
.materi-debit .code-header {background:#2a2a3e;padding:7px 14px;display:flex;align-items:center;justify-content:space-between;}
.materi-debit .code-lang {font-size:11px;color:#a0aec0;font-weight:600;letter-spacing:0.05em;display:flex;align-items:center;gap:6px;}
.materi-debit .code-lang .dot {width:8px;height:8px;border-radius:50%;}
.materi-debit .copy-btn {font-size:11px;color:#a0aec0;cursor:pointer;background:none;border:none;padding:2px 8px;border-radius:4px;transition:all 0.2s;}
.materi-debit .copy-btn:hover {background:rgba(255,255,255,0.1);color:#fff;}
.materi-debit pre {padding:1rem 1.25rem;overflow-x:auto;font-family:'Consolas','Courier New',monospace;font-size:12.5px;line-height:1.75;color:#cdd6f4;}
.materi-debit pre::-webkit-scrollbar {height:4px;}
.materi-debit pre::-webkit-scrollbar-thumb {background:#4a4a6a;border-radius:2px;}
.materi-debit .kw {color:#cba6f7;}.materi-debit .fn {color:#89b4fa;}.materi-debit .str {color:#a6e3a1;}.materi-debit .num {color:#fab387;}.materi-debit .cm {color:#6c7086;font-style:italic;}.materi-debit .op {color:#89dceb;}.materi-debit .pkg {color:#f38ba8;}
.materi-debit .tbl-wrap {overflow-x:auto;margin-bottom:1rem;}
.materi-debit .data-tbl {width:100%;border-collapse:collapse;font-size:13px;min-width:380px;}
.materi-debit .data-tbl th {background:var(--navy);color:#fff;padding:8px 12px;text-align:center;font-weight:600;font-size:12px;}
.materi-debit .data-tbl td {padding:7px 12px;border-bottom:1px solid var(--gray-200);text-align:center;font-family:'Consolas',monospace;font-size:12px;color:var(--gray-700);}
.materi-debit .data-tbl td.td-label {text-align:left;font-family:inherit;font-weight:600;color:var(--gray-700);}
.materi-debit .data-tbl tr:hover td {background:var(--blue-pale);}
.materi-debit .data-tbl .best {color:var(--green);font-weight:700;}
.materi-debit .data-tbl .highlight {background:rgba(26,82,118,0.06)!important;}
.materi-debit .data-tbl .th-blue {background:var(--navy2)!important;}
.materi-debit .data-tbl .th-red {background:var(--red)!important;}
.materi-debit .data-tbl .th-green {background:var(--green)!important;}
.materi-debit .data-tbl .th-purple {background:var(--purple)!important;}
.materi-debit .data-tbl .th-amber {background:var(--amber)!important;}
.materi-debit .chart-card {background:#fff;border-radius:var(--radius);padding:1.25rem 1.5rem 1rem;box-shadow:var(--shadow);margin-bottom:1.25rem;}
.materi-debit .chart-title {font-size:13px;font-weight:700;color:var(--gray-700);margin-bottom:2px;}
.materi-debit .chart-sub {font-size:11px;color:var(--gray-500);margin-bottom:1rem;}
.materi-debit .chart-wrap {position:relative;width:100%;}
.materi-debit .legend-row {display:flex;flex-wrap:wrap;gap:12px;margin-top:10px;font-size:11px;color:var(--gray-500);}
.materi-debit .legend-item {display:flex;align-items:center;gap:5px;}
.materi-debit .legend-sq {width:10px;height:10px;border-radius:2px;flex-shrink:0;}
.materi-debit .tag {display:inline-block;font-size:11px;padding:3px 10px;border-radius:20px;margin:2px;font-weight:500;}
.materi-debit .tag-blue {background:var(--blue-pale);color:#0c447c;}
.materi-debit .tag-red {background:var(--red-light);color:var(--red);}
.materi-debit .tag-purple {background:var(--purple-light);color:var(--purple);}
.materi-debit .tag-green {background:var(--green-light);color:var(--green);}
.materi-debit .tag-amber {background:var(--amber-light);color:var(--amber);}
.materi-debit .divider {height:1px;background:var(--gray-200);margin:2.5rem 0;}
.materi-debit .analogy-box {background:linear-gradient(135deg,#f0f7ff,#f8f0ff);border:1px solid #c4d9f7;border-radius:var(--radius);padding:1.1rem 1.3rem;margin:1rem 0;}
.materi-debit .analogy-badge {font-size:10px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:var(--blue);margin-bottom:6px;}
.materi-debit .analogy-box p {font-size:13px;color:var(--gray-700);line-height:1.7;font-style:italic;}
/.materi-debit * INTERACTIVE CALCULATOR */
.calc-box {background:#fff;border-radius:var(--radius);padding:1.5rem;box-shadow:var(--shadow-md);border:1px solid var(--gray-200);margin:1rem 0;}
.materi-debit .calc-title {font-size:13px;font-weight:700;color:var(--navy);margin-bottom:1.1rem;display:flex;align-items:center;gap:8px;}
.materi-debit .calc-grid {display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;margin-bottom:1.2rem;}
@.materi-debit media(max-width:600px) {.calc-grid{grid-template-columns:1fr;}.materi-debit }
.calc-field label {display:block;font-size:11px;font-weight:600;color:var(--gray-600);margin-bottom:4px;text-transform:uppercase;letter-spacing:0.05em;}
.materi-debit .calc-field input[type=range] {width:100%;accent-color:var(--blue);}
.materi-debit .calc-field select {width:100%;padding:5px 8px;border:1px solid var(--gray-300);border-radius:6px;font-size:13px;background:#fff;}
.materi-debit .calc-field .val-display {font-size:13px;font-weight:600;color:var(--navy);margin-top:3px;}
.materi-debit .calc-result {background:linear-gradient(135deg,var(--navy),#1a3a6b);border-radius:8px;padding:1rem 1.25rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;}
.materi-debit .calc-result-label {font-size:12px;color:rgba(255,255,255,0.7);font-weight:600;}
.materi-debit .calc-result-val {font-size:28px;font-weight:700;color:#fff;}
.materi-debit .calc-result-unit {font-size:13px;color:rgba(255,255,255,0.6);}
/.materi-debit * HYDROGRAPH CONTROLS */
.hydro-controls {display:flex;gap:8px;flex-wrap:wrap;margin-bottom:1rem;}
.materi-debit .hydro-btn {padding:5px 14px;border-radius:20px;border:1.5px solid;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.2s;background:#fff;}
.materi-debit .hydro-btn.active {color:#fff!important;}
/.materi-debit * DAS SCHEMATIC */
.das-grid {display:grid;grid-template-columns:repeat(3,1fr);gap:0.6rem;margin:1rem 0;}
@.materi-debit media(max-width:600px) {.das-grid{grid-template-columns:1fr 1fr;}.materi-debit }
.das-param {background:#fff;border-radius:8px;padding:0.7rem 0.9rem;box-shadow:var(--shadow);border-top:3px solid var(--blue-mid);}
.materi-debit .das-param-name {font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--gray-500);margin-bottom:3px;}
.materi-debit .das-param-val {font-size:16px;font-weight:700;color:var(--navy);}
.materi-debit .das-param-unit {font-size:11px;color:var(--gray-500);}
/.materi-debit * METHOD BADGE */
.method-badge {display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:8px;}
.materi-debit .nav-link {display:flex;align-items:center;gap:1rem;padding:0.9rem 1.2rem;background:#fff;border:1px solid var(--gray-200);border-radius:10px;text-decoration:none;transition:all 0.2s;margin-bottom:0.5rem;box-shadow:var(--shadow);}
.materi-debit .nav-link:hover {border-color:var(--blue-mid);box-shadow:var(--shadow-md);}
.materi-debit .nav-link-label {font-size:10px;font-weight:700;letter-spacing:0.09em;text-transform:uppercase;color:var(--gray-500);margin-bottom:3px;}
.materi-debit .nav-link-title {font-size:14px;font-weight:700;color:var(--navy);}
.materi-debit .nav-link-dim {opacity:0.5;cursor:default;}
.materi-debit .nav-link-dim:hover {border-color:var(--gray-200);box-shadow:var(--shadow);}
@.materi-debit keyframes fadeUp {from{opacity:0;transform:translateY(16px);}.materi-debit to {opacity:1;transform:translateY(0);}.materi-debit }
.anim-in {opacity:1;}.materi-debit .anim-in.visible {animation:fadeUp 0.45s ease both;}


/* === LAYOUT FIX: integrasi Wowchemy === */
.materi-debit { box-sizing: border-box; width: 100%; overflow-x: hidden; }
.materi-debit * { box-sizing: border-box; }
.materi-debit .wrap, .materi-debit .section { max-width: 100%; }



/* === DARK MODE === */
body.dark .materi-debit { color:#8e94b5; }

/* Heading & teks utama */
body.dark .materi-debit h1,
body.dark .materi-debit h2,
body.dark .materi-debit h3,
body.dark .materi-debit h4 { color:#e8eaf6 !important; }
body.dark .materi-debit p { color:#8e94b5; }
body.dark .materi-debit strong { color:#e8eaf6; }
body.dark .materi-debit li { color:#8e94b5; }

/* Section header */
body.dark .materi-debit .section-header { border-color:#343858; }
body.dark .materi-debit .section-header h2 { color:#e8eaf6 !important; }
body.dark .materi-debit .section-num {
  background:#1e3a6e !important;
  color:#5b8fff !important;
  border-color:#2a4a8e !important;
}
body.dark .materi-debit .subsection h3 { color:#c8ccdf !important; }

/* Cards — background & border */
body.dark .materi-debit [class*="card"],
body.dark .materi-debit .card,
body.dark .materi-debit .metric-card {
  background:#222638 !important;
  border-color:#343858 !important;
  box-shadow: 0 2px 12px rgba(0,0,0,0.3) !important;
}

/* Card teks — SEMUA varian label & nilai */
body.dark .materi-debit .card-label,
body.dark .materi-debit .metric-label,
body.dark .materi-debit .metric-sub {
  color:#8e94b5 !important;
}
body.dark .materi-debit .card p,
body.dark .materi-debit .card-body {
  color:#8e94b5 !important;
}
body.dark .materi-debit .metric-val {
  /* warna nilai (biru/amber/dll) tetap — biarkan dari CSS asli */
  filter: brightness(1.2);
}

/* Teks dengan var gray-* — override via CSS variable remapping */
body.dark .materi-debit {
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
body.dark .materi-debit table { border-color:#343858; }
body.dark .materi-debit th {
  background:#2a2e42 !important;
  color:#8e94b5 !important;
  border-color:#343858 !important;
}
body.dark .materi-debit td {
  border-color:#343858 !important;
  color:#8e94b5 !important;
}
body.dark .materi-debit tr:nth-child(even) { background:#1e2235 !important; }
body.dark .materi-debit tr:hover td { background:#252840 !important; }

/* Code */
body.dark .materi-debit code,
body.dark .materi-debit pre {
  background:#12151f !important;
  color:#a8b4ff !important;
}

/* Form inputs */
body.dark .materi-debit select,
body.dark .materi-debit input[type=number],
body.dark .materi-debit input[type=text] {
  background:#2a2e42 !important;
  border-color:#343858 !important;
  color:#e8eaf6 !important;
}

/* Result/output boxes */
body.dark .materi-debit [class*="result"],
body.dark .materi-debit [id*="result"],
body.dark .materi-debit [class*="output"],
body.dark .materi-debit [id*="output"] {
  background:#222638 !important;
  border-color:#343858 !important;
  color:#8e94b5 !important;
}

/* Grid boxes */
body.dark .materi-debit .grid-2>*,
body.dark .materi-debit .grid-3>*,
body.dark .materi-debit .grid-4>* {
  background:#222638 !important;
  border-color:#343858 !important;
}

/* Info/alert boxes */
body.dark .materi-debit [class*="info-"],
body.dark .materi-debit [class*="alert-"],
body.dark .materi-debit [class*="note-"] {
  background:#1e2235 !important;
  border-color:#343858 !important;
  color:#8e94b5 !important;
}

/* Links */
body.dark .materi-debit a { color:#5b8fff; }
body.dark .materi-debit hr { border-color:#343858; }

/* Fix teks inline style hardcoded */
body.dark .materi-debit [style*="color:#0f172a"],
body.dark .materi-debit [style*="color:#1e293b"],
body.dark .materi-debit [style*="color:#334155"],
body.dark .materi-debit [style*="color:#475569"] {
  color:#e8eaf6 !important;
}
body.dark .materi-debit [style*="background:#fff"],
body.dark .materi-debit [style*="background:#f4f6f9"],
body.dark .materi-debit [style*="background:#f8fafc"],
body.dark .materi-debit [style*="background:#f1f5f9"] {
  background:#222638 !important;
}

</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
<div class="materi-debit">
<!-- S1: LATAR BELAKANG -->
<section class="section anim-in" id="s1">
  <div class="section-header"><div class="section-num">1</div><h2>Latar Belakang — Mengapa Perlu Debit Banjir Rencana?</h2></div>
  <div class="card card-navy">
    <div class="card-label">Dari Angka Hujan ke Angka Desain</div>
    <p>Artikel sebelumnya menghasilkan <strong>curah hujan rencana R_T</strong> (mm) dan <strong>kurva IDF</strong> untuk berbagai kala ulang. Tapi para <em>engineer</em> tidak mendesain jembatan dengan satuan "milimeter hujan" — mereka mendesain dengan satuan <strong>meter kubik per detik (m³/s)</strong>.</p>
    <p style="margin-top:8px;">Pertanyaannya: <em>"Kalau hujan 152 mm turun dalam satu hari di DAS seluas 50 km², berapa debit puncak yang akan terjadi di outlet sungai?"</em> — Inilah yang dijawab oleh perhitungan debit banjir rencana.</p>
  </div>
  <div class="grid-2">
    <div class="card card-blue">
      <div class="card-label">Input — dari Artikel Sebelumnya</div>
      <p><strong>Curah Hujan Rencana R_T:</strong><br>
      T=2: 96.4 mm &nbsp;|&nbsp; T=5: 118.7 mm<br>
      T=10: 133.4 mm &nbsp;|&nbsp; T=25: 151.9 mm<br>
      T=50: 165.6 mm &nbsp;|&nbsp; T=100: 179.2 mm<br><br>
      <strong>Intensitas IDF</strong> dari rumus Mononobe untuk berbagai durasi.</p>
    </div>
    <div class="card card-green">
      <div class="card-label">Output — yang Dihasilkan di Artikel Ini</div>
      <p><strong>Debit Puncak Q_T (m³/s)</strong> untuk setiap kala ulang, menggunakan:<br><br>
      📌 Metode Rasional → Q puncak saja<br>
      📌 HSS Nakayasu → hidrograf penuh Q(t)<br><br>
      Output ini menjadi input langsung untuk HEC-RAS, desain bendung, dan drainase.</p>
    </div>
  </div>
  <div class="analogy-box">
    <div class="analogy-badge">💡 Analogi Bak Mandi</div>
    <p>Bayangkan hujan adalah air yang dituang ke bak mandi besar (DAS). Seberapa cepat air mengalir keluar dari saluran pembuangan (outlet sungai) tergantung pada: seberapa besar bak (luas DAS), seberapa curam kemiringannya (slope), dan seberapa banyak air yang meresap ke tanah vs mengalir di permukaan. Debit banjir rencana menghitung laju aliran di saluran pembuangan itu — bukan berapa air yang dituang.</p>
  </div>
</section>

<div class="divider"></div>

<!-- S2: ALUR -->
<section class="section anim-in" id="s2">
  <div class="section-header"><div class="section-num">2</div><h2>Alur: Dari Curah Hujan ke Debit Banjir</h2></div>
  <p style="font-size:13px;color:var(--gray-600);line-height:1.7;margin-bottom:1rem;">Tidak semua hujan yang jatuh menjadi debit di sungai. Ada yang meresap ke tanah (infiltrasi), ada yang menguap (evapotranspirasi), dan sisanya baru menjadi aliran permukaan (runoff). Proses ini dipengaruhi karakteristik DAS dan kondisi lahan.</p>
  <div class="card" style="background:#0f172a;border:none;padding:1.5rem;">
    <div style="display:flex;align-items:center;justify-content:center;gap:0;flex-wrap:wrap;">
      <div style="text-align:center;padding:0.8rem;">
        <div style="font-size:1.6rem;">🌧️</div>
        <div style="font-size:12px;font-weight:700;color:#85b7eb;margin-top:4px;">CH Rencana</div>
        <div style="font-size:10px;color:#64748b;">R_T (mm)</div>
      </div>
      <div style="font-size:20px;color:#334155;padding:0 4px;">→</div>
      <div style="text-align:center;padding:0.8rem;background:rgba(26,82,118,0.3);border-radius:8px;border:1px solid #1A5276;">
        <div style="font-size:1.6rem;">🌿</div>
        <div style="font-size:12px;font-weight:700;color:#6ee7b7;margin-top:4px;">Hujan Efektif</div>
        <div style="font-size:10px;color:#64748b;">R_eff = R_T × (1-abstraksi)</div>
      </div>
      <div style="font-size:20px;color:#334155;padding:0 4px;">→</div>
      <div style="text-align:center;padding:0.8rem;background:rgba(109,40,217,0.2);border-radius:8px;border:1px solid #6D28D9;">
        <div style="font-size:1.6rem;">🏔️</div>
        <div style="font-size:12px;font-weight:700;color:#c4b5fd;margin-top:4px;">Karakteristik DAS</div>
        <div style="font-size:10px;color:#64748b;">A, L, S, landuse</div>
      </div>
      <div style="font-size:20px;color:#334155;padding:0 4px;">→</div>
      <div style="text-align:center;padding:0.8rem;background:rgba(29,111,66,0.2);border-radius:8px;border:1px solid #1d6f42;">
        <div style="font-size:1.6rem;">📈</div>
        <div style="font-size:12px;font-weight:700;color:#6ee7b7;margin-top:4px;">Model Transformasi</div>
        <div style="font-size:10px;color:#64748b;">Rasional / Nakayasu</div>
      </div>
      <div style="font-size:20px;color:#334155;padding:0 4px;">→</div>
      <div style="text-align:center;padding:0.8rem;background:rgba(180,83,9,0.25);border-radius:8px;border:1px solid #B45309;">
        <div style="font-size:1.6rem;">💧</div>
        <div style="font-size:12px;font-weight:700;color:#fcd34d;margin-top:4px;">Debit Banjir</div>
        <div style="font-size:10px;color:#64748b;">Q_T (m³/s)</div>
      </div>
    </div>
  </div>
  <div class="info-box"><span class="box-icon">ℹ️</span><span>Proses transformasi hujan menjadi debit disebut <strong>rainfall-runoff transformation</strong>. Dua faktor utama yang menentukan hasilnya: (1) <em>berapa banyak hujan yang jadi runoff</em> (hujan efektif), dan (2) <em>seberapa cepat runoff itu mencapai outlet</em> (karakteristik DAS).</span></div>
</section>

<div class="divider"></div>

<!-- S3: DATA DAS -->
<section class="section anim-in" id="s3">
  <div class="section-header"><div class="section-num">3</div><h2>Data Daerah Aliran Sungai (DAS)</h2></div>
  <div id="s3a"></div>
  <div class="subsection"><h3>Karakteristik DAS yang Diperlukan</h3></div>
  <p style="font-size:13px;color:var(--gray-600);line-height:1.7;margin-bottom:1rem;">Untuk menghitung debit banjir, kita perlu mengkarakterisasi DAS terlebih dahulu. Data ini bisa didapat dari analisis DEM (SRTM/DEMNAS) di QGIS atau Global Mapper.</p>
  <div class="das-grid" id="dasParams"></div>
  <div class="grid-2" style="margin-top:1rem;">
    <div class="card card-blue">
      <div class="card-label">Sumber Data DAS</div>
      <p><strong>Peta topografi / DEM:</strong> DEMNAS (8m, BIG), SRTM 30m — untuk delineasi DAS, panjang sungai, dan kemiringan.<br><br><strong>Peta tata guna lahan:</strong> RTRW, citra satelit Sentinel/Landsat — untuk koefisien limpasan (C).<br><br><strong>Peta jenis tanah:</strong> untuk CN SCS atau parameter infiltrasi.</p>
    </div>
    <div class="card card-amber">
      <div class="card-label">Tools yang Digunakan</div>
      <p><strong>QGIS:</strong> Delineasi DAS otomatis dari DEM menggunakan plugin SAGA atau GRASS. Hitung luas, panjang sungai, slope rerata.<br><br><strong>Global Mapper:</strong> Analisis watershed, profil memanjang sungai, ekstrak parameter morfometri DAS dengan mudah.</p>
    </div>
  </div>
  <div id="s3b"></div>
  <div class="subsection"><h3>Waktu Konsentrasi (t_c)</h3></div>
  <div class="card card-purple">
    <div class="card-label">Definisi</div>
    <p><strong>Waktu konsentrasi (t_c)</strong> adalah waktu yang dibutuhkan tetesan air dari titik terjauh dalam DAS untuk mencapai outlet (titik pengukuran). Ini adalah parameter kunci — intensitas hujan yang dipakai dalam metode rasional diambil pada durasi = t_c.</p>
  </div>
  <div class="grid-2">
    <div>
      <div class="card card-blue" style="margin-bottom:0.6rem;">
        <div class="card-label">① Metode Kirpich (1940)</div>
        <p>Paling umum untuk DAS kecil. Menggunakan panjang saluran dan beda tinggi.</p>
      </div>
      <div class="formula-block">
        <span class="eq-label">Rumus Kirpich</span>
        <span class="eq-main">t_c = 0.0195 · L^0.77 · S^(−0.385)</span>
        <span class="eq-desc">t_c dalam menit  |  L = panjang saluran terpanjang (meter)  |  S = kemiringan rata-rata (m/m)
Contoh: L=5000 m, S=0.010 → t_c = 0.0195 × 705 × 5.89 = 81 mnt ≈ 1.35 jam</span>
      </div>
    </div>
    <div>
      <div class="card card-green" style="margin-bottom:0.6rem;">
        <div class="card-label">② Metode Bransby-Williams</div>
        <p>Mempertimbangkan luas DAS. Cocok untuk DAS yang lebih besar dan tidak seragam.</p>
      </div>
      <div class="formula-block" style="border-left-color:var(--green);">
        <span class="eq-label">Rumus Bransby-Williams</span>
        <span class="eq-main">t_c = (L / (58 · A^0.1 · S_e^0.2)) </span>
        <span class="eq-desc">t_c dalam jam  |  L = panjang sungai (km)  |  A = luas DAS (km²)  |  S_e = kemiringan ekivalen (m/km)
Contoh: L=10 km, A=50 km², S_e=5 m/km → t_c ≈ 2.1 jam</span>
      </div>
    </div>
  </div>
  <div class="warn-box"><span class="box-icon">⚠️</span><span>Hasil t_c dari berbagai metode bisa berbeda signifikan. Dalam praktik, gunakan <strong>dua metode</strong> lalu ambil rata-rata, atau pilih metode yang sesuai dengan kondisi DAS. Untuk DAS perkotaan (urban), t_c cenderung lebih pendek karena permukaan kedap air mempercepat aliran.</span></div>
</section>

<div class="divider"></div>

<!-- S4: KOEFISIEN LIMPASAN -->
<section class="section anim-in" id="s4">
  <div class="section-header"><div class="section-num">4</div><h2>Koefisien Limpasan (C)</h2></div>
  <p style="font-size:13px;color:var(--gray-600);line-height:1.7;margin-bottom:1rem;">Koefisien limpasan (C) menunjukkan <strong>proporsi hujan yang menjadi aliran permukaan</strong>. Nilai C antara 0 (semua meresap) hingga 1 (semua jadi runoff). Nilainya ditentukan oleh tata guna lahan, jenis tanah, dan kemiringan.</p>
  <div class="tbl-wrap">
    <table class="data-tbl">
      <thead>
        <tr><th>Tipe Lahan / Kondisi</th><th>C Minimum</th><th>C Maksimum</th><th>C Tipikal</th><th>Keterangan</th></tr>
      </thead>
      <tbody>
        <tr><td class="td-label">Hutan lebat / konservasi</td><td>0.10</td><td>0.25</td><td class="best">0.15</td><td class="td-label" style="font-family:inherit;font-size:11px;color:var(--gray-600);">Infiltrasi sangat tinggi</td></tr>
        <tr><td class="td-label">Perkebunan / ladang</td><td>0.25</td><td>0.45</td><td class="best">0.35</td><td class="td-label" style="font-family:inherit;font-size:11px;color:var(--gray-600);">Tergantung kerapatan tanaman</td></tr>
        <tr><td class="td-label">Sawah / lahan pertanian</td><td>0.45</td><td>0.65</td><td class="best">0.55</td><td class="td-label" style="font-family:inherit;font-size:11px;color:var(--gray-600);">Bervariasi per musim</td></tr>
        <tr><td class="td-label">Permukiman jarang</td><td>0.50</td><td>0.70</td><td class="best">0.60</td><td class="td-label" style="font-family:inherit;font-size:11px;color:var(--gray-600);">Halaman rumput + jalan</td></tr>
        <tr class="highlight"><td class="td-label" style="color:var(--amber);font-weight:700;">Permukiman padat / urban</td><td>0.65</td><td>0.80</td><td style="color:var(--amber);font-weight:700;">0.72</td><td class="td-label" style="font-family:inherit;font-size:11px;color:var(--gray-600);">Banyak permukaan kedap</td></tr>
        <tr><td class="td-label">Jalan aspal / beton</td><td>0.80</td><td>0.95</td><td class="best">0.90</td><td class="td-label" style="font-family:inherit;font-size:11px;color:var(--gray-600);">Hampir semua jadi runoff</td></tr>
        <tr><td class="td-label">Atap bangunan</td><td>0.85</td><td>0.95</td><td class="best">0.90</td><td class="td-label" style="font-family:inherit;font-size:11px;color:var(--gray-600);">Tidak ada infiltrasi</td></tr>
      </tbody>
    </table>
  </div>
  <div class="info-box"><span class="box-icon">ℹ️</span><span>Untuk DAS dengan berbagai tipe lahan (mixed land use), hitung <strong>C gabungan</strong> berdasarkan proporsi luas: <code>C_gabungan = Σ(Cᵢ × Aᵢ) / A_total</code>. Dalam contoh artikel ini, DAS campuran hutan + sawah + permukiman menghasilkan C_gabungan = <strong>0.65</strong>.</span></div>
</section>

<div class="divider"></div>

<!-- S4B: PANDUAN PEMILIHAN METODE -->
<section class="section anim-in" id="s4b">
  <div class="section-header"><div class="section-num" style="background:var(--blue-mid);">↓</div><h2>Panduan Pemilihan Metode</h2></div>
  <p style="font-size:13px;color:var(--gray-600);line-height:1.7;margin-bottom:1rem;">Sebelum memilih metode perhitungan, tentukan dulu <strong>skala DAS</strong> yang akan dianalisis. Matriks berikut adalah panduan umum yang diadaptasi dari Ponce (1989) — salah satu referensi klasik hidrologi teknik.</p>

  <!-- MATRIX -->
  <div style="background:#fff;border-radius:var(--radius);box-shadow:var(--shadow-md);overflow:hidden;margin:1rem 0;">
    <!-- Header caption -->
    <div style="background:var(--navy);color:#fff;padding:0.7rem 1.2rem;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:space-between;">
      <span>📊 Hubungan Skala DAS dengan Metode Perhitungan Banjir</span>
      <span style="font-size:10px;font-weight:400;opacity:0.7;">Diadaptasi dari Ponce (1989) — Engineering Hydrology</span>
    </div>
    <div style="padding:1.5rem;overflow-x:auto;">
      <table style="width:100%;border-collapse:separate;border-spacing:6px;min-width:480px;">
        <thead>
          <tr>
            <th style="width:130px;"></th>
            <th colspan="3" style="text-align:center;background:#fef3c7;color:#92400e;padding:10px 14px;border-radius:6px;font-size:13px;font-weight:700;letter-spacing:0.03em;">Skala DAS (Catchment Scale)</th>
          </tr>
          <tr>
            <th style="width:130px;vertical-align:middle;text-align:right;padding-right:10px;">
              <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--gray-500);">Metode</div>
            </th>
            <th style="text-align:center;background:#f8fafc;color:var(--gray-700);padding:9px 10px;border-radius:6px;font-size:12px;font-weight:700;border:1px solid var(--gray-200);">
              Kecil<br><span style="font-size:10px;font-weight:400;color:var(--gray-500);">Small (&lt; 50 km²)</span>
            </th>
            <th style="text-align:center;background:#f8fafc;color:var(--gray-700);padding:9px 10px;border-radius:6px;font-size:12px;font-weight:700;border:1px solid var(--gray-200);">
              Sedang<br><span style="font-size:10px;font-weight:400;color:var(--gray-500);">Midsize (50–250 km²)</span>
            </th>
            <th style="text-align:center;background:#f8fafc;color:var(--gray-700);padding:9px 10px;border-radius:6px;font-size:12px;font-weight:700;border:1px solid var(--gray-200);">
              Besar<br><span style="font-size:10px;font-weight:400;color:var(--gray-500);">Large (&gt; 250 km²)</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Row 1: Rational -->
          <tr>
            <td style="vertical-align:middle;padding:4px 10px 4px 0;text-align:right;">
              <div style="font-size:12px;font-weight:700;color:var(--blue);">📏 Metode<br>Rasional</div>
              <div style="font-size:10px;color:var(--gray-500);">Q = 0.278·C·I·A</div>
            </td>
            <td style="text-align:center;background:#d1fae5;border:2px solid #6ee7b7;border-radius:8px;padding:14px 10px;">
              <div style="font-size:16px;margin-bottom:4px;">✅</div>
              <div style="font-size:13px;font-weight:700;color:var(--green);">Biasanya</div>
              <div style="font-size:10px;color:#065f46;margin-top:3px;">Metode utama</div>
            </td>
            <td style="text-align:center;background:#fee2e2;border:2px solid #fca5a5;border-radius:8px;padding:14px 10px;">
              <div style="font-size:16px;margin-bottom:4px;">❌</div>
              <div style="font-size:13px;font-weight:700;color:var(--red);">Tidak Berlaku</div>
              <div style="font-size:10px;color:#7f1d1d;margin-top:3px;">Kurang akurat</div>
            </td>
            <td style="text-align:center;background:#fee2e2;border:2px solid #fca5a5;border-radius:8px;padding:14px 10px;">
              <div style="font-size:16px;margin-bottom:4px;">❌</div>
              <div style="font-size:13px;font-weight:700;color:var(--red);">Tidak Berlaku</div>
              <div style="font-size:10px;color:#7f1d1d;margin-top:3px;">Sangat tidak akurat</div>
            </td>
          </tr>
          <!-- Row 2: Unit Hydrograph -->
          <tr>
            <td style="vertical-align:middle;padding:4px 10px 4px 0;text-align:right;">
              <div style="font-size:12px;font-weight:700;color:var(--purple);">📈 Hidrograf<br>Satuan (HSS)</div>
              <div style="font-size:10px;color:var(--gray-500);">Nakayasu, GAMA I</div>
            </td>
            <td style="text-align:center;background:#fee2e2;border:2px solid #fca5a5;border-radius:8px;padding:14px 10px;">
              <div style="font-size:16px;margin-bottom:4px;">❌</div>
              <div style="font-size:13px;font-weight:700;color:var(--red);">Tidak Berlaku</div>
              <div style="font-size:10px;color:#7f1d1d;margin-top:3px;">Terlalu detail</div>
            </td>
            <td style="text-align:center;background:#d1fae5;border:2px solid #6ee7b7;border-radius:8px;padding:14px 10px;">
              <div style="font-size:16px;margin-bottom:4px;">✅</div>
              <div style="font-size:13px;font-weight:700;color:var(--green);">Biasanya</div>
              <div style="font-size:10px;color:#065f46;margin-top:3px;">Metode utama</div>
            </td>
            <td style="text-align:center;background:var(--blue-pale);border:2px solid var(--blue-light);border-radius:8px;padding:14px 10px;">
              <div style="font-size:16px;margin-bottom:4px;">⚡</div>
              <div style="font-size:13px;font-weight:700;color:var(--blue);">Kadang</div>
              <div style="font-size:10px;color:#1e3a5f;margin-top:3px;">Perlu pertimbangan</div>
            </td>
          </tr>
          <!-- Row 3: Routing -->
          <tr>
            <td style="vertical-align:middle;padding:4px 10px 4px 0;text-align:right;">
              <div style="font-size:12px;font-weight:700;color:var(--amber);">🌊 Flood<br>Routing</div>
              <div style="font-size:10px;color:var(--gray-500);">HEC-HMS, HEC-RAS</div>
            </td>
            <td style="text-align:center;background:var(--blue-pale);border:2px solid var(--blue-light);border-radius:8px;padding:14px 10px;">
              <div style="font-size:16px;margin-bottom:4px;">⚡</div>
              <div style="font-size:13px;font-weight:700;color:var(--blue);">Kadang</div>
              <div style="font-size:10px;color:#1e3a5f;margin-top:3px;">Bila diperlukan</div>
            </td>
            <td style="text-align:center;background:var(--blue-pale);border:2px solid var(--blue-light);border-radius:8px;padding:14px 10px;">
              <div style="font-size:16px;margin-bottom:4px;">⚡</div>
              <div style="font-size:13px;font-weight:700;color:var(--blue);">Kadang</div>
              <div style="font-size:10px;color:#1e3a5f;margin-top:3px;">Perlu pertimbangan</div>
            </td>
            <td style="text-align:center;background:#d1fae5;border:2px solid #6ee7b7;border-radius:8px;padding:14px 10px;">
              <div style="font-size:16px;margin-bottom:4px;">✅</div>
              <div style="font-size:13px;font-weight:700;color:var(--green);">Biasanya</div>
              <div style="font-size:10px;color:#065f46;margin-top:3px;">Metode utama</div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Legend -->
      <div style="display:flex;gap:1.5rem;margin-top:1rem;flex-wrap:wrap;align-items:center;">
        <div style="font-size:11px;font-weight:700;color:var(--gray-500);text-transform:uppercase;letter-spacing:0.06em;">Keterangan:</div>
        <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--green);"><div style="width:12px;height:12px;border-radius:3px;background:#d1fae5;border:1.5px solid #6ee7b7;"></div>Biasanya digunakan (Usually)</div>
        <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--red);"><div style="width:12px;height:12px;border-radius:3px;background:#fee2e2;border:1.5px solid #fca5a5;"></div>Tidak berlaku (Not applicable)</div>
        <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--blue);"><div style="width:12px;height:12px;border-radius:3px;background:var(--blue-pale);border:1.5px solid var(--blue-light);"></div>Kadang digunakan (Sometimes)</div>
      </div>
      <div style="margin-top:0.75rem;font-size:11px;color:var(--gray-400);border-top:1px solid var(--gray-200);padding-top:0.6rem;">
        Sumber: Ponce, V.M. (1989). <em>Engineering Hydrology: Principles and Practices</em>. Prentice Hall. Fig. 1-9. 
        Akses: <a href="https://ponce.sdsu.edu/enghydro/engineering_hydrology_01.php" target="_blank" style="color:var(--blue);">ponce.sdsu.edu</a>
      </div>
    </div>
  </div>

  <!-- Batasan skala DAS -->
  <div class="grid-3" style="margin-top:1rem;">
    <div class="card card-blue" style="margin-bottom:0;">
      <div class="card-label" style="color:var(--blue);">🏙️ DAS Kecil — &lt; 50 km²</div>
      <p>Respons cepat terhadap hujan. Satu hujan → satu puncak banjir yang jelas. Metode Rasional cukup untuk mendapatkan debit puncak. Contoh: sub-DAS perkotaan, saluran drainase.</p>
    </div>
    <div class="card card-purple" style="margin-bottom:0;">
      <div class="card-label" style="color:var(--purple);">🏔️ DAS Sedang — 50–250 km²</div>
      <p>Skala DAS dalam artikel ini (50 km²). HSS Nakayasu cocok di rentang ini. Hidrograf satuan dapat merepresentasikan respons DAS dengan baik dan parameter masih dapat dikalibrasi.</p>
    </div>
    <div class="card card-amber" style="margin-bottom:0;">
      <div class="card-label" style="color:var(--amber);">🌏 DAS Besar — &gt; 250 km²</div>
      <p>Perlu flood routing karena banjir merambat dari hulu ke hilir dalam waktu yang signifikan. HEC-HMS (routing) dan HEC-RAS diperlukan. HSS masih bisa sebagai sub-DAS.</p>
    </div>
  </div>

  <div class="info-box" style="margin-top:1rem;"><span class="box-icon">ℹ️</span><span>Artikel ini fokus pada <strong>DAS sedang (50 km²)</strong> menggunakan dua metode: Metode Rasional (sebagai pembanding sederhana) dan HSS Nakayasu (metode utama). Untuk DAS yang lebih besar, lihat artikel HEC-HMS dan HEC-RAS di seri selanjutnya.</span></div>
</section>

<div class="divider"></div>

<!-- S5: METODE RASIONAL -->
<section class="section anim-in" id="s5">
  <div class="section-header"><div class="section-num">5</div><h2>Metode Rasional</h2></div>
  <div class="method-badge" style="background:rgba(24,95,165,0.1);color:var(--blue);border:1px solid var(--blue);">
    📏 Cocok untuk DAS &lt; 50 km²
  </div>
  <p style="font-size:13px;color:var(--gray-600);line-height:1.7;margin-bottom:1rem;">Metode rasional adalah metode paling sederhana dan paling banyak digunakan untuk DAS kecil. Output-nya hanya debit puncak — tidak menghasilkan bentuk hidrograf penuh.</p>
  <div id="s5a"></div>
  <div class="subsection"><h3>Rumus & Parameter</h3></div>
  <div class="formula-block">
    <span class="eq-label">Rumus Rasional — Debit Puncak Banjir</span>
    <span class="eq-main">Q = 0.278 × C × I × A</span>
    <span class="eq-desc">Q = debit puncak (m³/s)  |  C = koefisien limpasan (-)  |  I = intensitas hujan (mm/jam)  |  A = luas DAS (km²)
Angka 0.278 = faktor konversi satuan: 1 mm/jam × 1 km² = 0.278 m³/s
I diambil pada durasi t = t_c dari kurva IDF, pada kala ulang T yang diinginkan</span>
  </div>
  <div class="step-flow">
    <div class="step-item">
      <div class="step-line"><div class="step-dot navy">1</div><div class="step-connector"></div></div>
      <div class="step-body">
        <div class="step-title">Hitung t_c (waktu konsentrasi)</div>
        <div class="step-desc">Dengan Kirpich: t_c = 0.0195 × 5000^0.77 × 0.010^(−0.385) = 81 menit = 1.35 jam</div>
      </div>
    </div>
    <div class="step-item">
      <div class="step-line"><div class="step-dot navy">2</div><div class="step-connector"></div></div>
      <div class="step-body">
        <div class="step-title">Ambil intensitas I dari kurva IDF pada t = t_c</div>
        <div class="step-desc">I(t_c = 1.35 jam, T = 25 tahun) = (R₂₄/24) × (24/1.35)^(2/3) = (151.9/24) × 17.78^(2/3) = 6.33 × 6.85 = 43.3 mm/jam</div>
      </div>
    </div>
    <div class="step-item">
      <div class="step-line"><div class="step-dot navy">3</div><div class="step-connector"></div></div>
      <div class="step-body">
        <div class="step-title">Tentukan C (koefisien limpasan)</div>
        <div class="step-desc">DAS campuran: hutan (40%) + sawah (35%) + permukiman (25%) → C = 0.15×0.40 + 0.55×0.35 + 0.65×0.25 = 0.06 + 0.19 + 0.16 = 0.41 ≈ 0.65 (kondisi jenuh saat banjir)</div>
      </div>
    </div>
    <div class="step-item">
      <div class="step-line"><div class="step-dot green">4</div></div>
      <div class="step-body" style="padding-bottom:0;">
        <div class="step-title">Hitung Q puncak</div>
        <div class="step-desc">Q_25 = 0.278 × 0.65 × 43.3 × 50 = <strong style="color:var(--green);">391 m³/s</strong></div>
      </div>
    </div>
  </div>
  <div id="s5b"></div>
  <div class="subsection"><h3>🎮 Kalkulator Interaktif — Metode Rasional</h3></div>
  <div class="calc-box">
    <div class="calc-title">⚡ Hitung Debit Puncak — Metode Rasional <span style="font-size:11px;font-weight:400;color:var(--gray-500);">Geser slider untuk melihat perubahan hasil secara langsung</span></div>
    <div class="calc-grid">
      <div class="calc-field">
        <label>C — Koefisien Limpasan</label>
        <input type="range" id="slC" min="0.10" max="0.95" step="0.01" value="0.65" oninput="updateRasional()">
        <div class="val-display">C = <span id="dispC">0.65</span></div>
        <select onchange="setC(this.value)" style="margin-top:6px;">
          <option value="">Pilih tipe lahan...</option>
          <option value="0.15">Hutan lebat (0.15)</option>
          <option value="0.35">Perkebunan (0.35)</option>
          <option value="0.55">Sawah (0.55)</option>
          <option value="0.65">Permukiman jarang (0.65)</option>
          <option value="0.72">Permukiman padat (0.72)</option>
          <option value="0.90">Jalan aspal (0.90)</option>
        </select>
      </div>
      <div class="calc-field">
        <label>A — Luas DAS (km²)</label>
        <input type="range" id="slA" min="1" max="300" step="1" value="50" oninput="updateRasional()">
        <div class="val-display">A = <span id="dispA">50</span> km²</div>
        <div style="font-size:11px;color:var(--gray-500);margin-top:4px;">Cocok untuk DAS ≤ 50 km²</div>
      </div>
      <div class="calc-field">
        <label>T — Kala Ulang</label>
        <select id="selT" onchange="updateRasional()">
          <option value="2">T = 2 tahun</option>
          <option value="5">T = 5 tahun</option>
          <option value="10">T = 10 tahun</option>
          <option value="25" selected>T = 25 tahun</option>
          <option value="50">T = 50 tahun</option>
          <option value="100">T = 100 tahun</option>
        </select>
        <label style="margin-top:8px;">t_c — Waktu Konsentrasi (jam)</label>
        <input type="range" id="slTc" min="0.25" max="6" step="0.05" value="1.35" oninput="updateRasional()">
        <div class="val-display">t_c = <span id="dispTc">1.35</span> jam</div>
      </div>
    </div>
    <div style="background:var(--blue-pale);border-radius:8px;padding:0.8rem 1rem;margin-bottom:1rem;font-size:12px;color:#0c447c;">
      <strong>Intensitas I(t_c, T):</strong> <span id="dispI">—</span> mm/jam
      &nbsp;|&nbsp; <strong>Rumus:</strong> Q = 0.278 × C × I × A
    </div>
    <div class="calc-result">
      <div>
        <div class="calc-result-label">DEBIT PUNCAK RENCANA</div>
        <div><span class="calc-result-val" id="resultQ">391</span> <span class="calc-result-unit">m³/s</span></div>
      </div>
      <div style="text-align:right;">
        <div class="calc-result-label">Setara dengan</div>
        <div style="color:rgba(255,255,255,0.8);font-size:13px;" id="resultCompare">—</div>
      </div>
    </div>
    <div style="margin-top:0.8rem;">
      <div id="warningA" class="warn-box" style="display:none;margin:0;font-size:12px;"><span class="box-icon">⚠️</span><span>Luas DAS melebihi 50 km². Metode Rasional kurang akurat — pertimbangkan menggunakan HSS Nakayasu.</span></div>
    </div>
  </div>
  <div class="chart-card">
    <div class="chart-title">Debit Puncak Metode Rasional per Kala Ulang</div>
    <div class="chart-sub">Berdasarkan: C = 0.65, A = 50 km², t_c = 1.35 jam, Distribusi Gumbel</div>
    <div class="chart-wrap" style="height:260px;"><canvas id="chartRasional"></canvas></div>
  </div>
</section>

<div class="divider"></div>

<!-- S6: NAKAYASU -->
<section class="section anim-in" id="s6">
  <div class="section-header"><div class="section-num">6</div><h2>Hidrograf Satuan Sintetis (HSS) Nakayasu</h2></div>
  <div class="method-badge" style="background:rgba(109,40,217,0.1);color:var(--purple);border:1px solid var(--purple);">
    📊 Menghasilkan Hidrograf Penuh Q(t) — Cocok untuk DAS 50–250 km²
  </div>
  <p style="font-size:13px;color:var(--gray-600);line-height:1.7;margin-bottom:1rem;">Metode Rasional hanya menghasilkan <em>satu angka</em>: debit puncak. Untuk desain yang lebih detail — seperti penelusuran banjir (flood routing) di HEC-RAS atau desain kolam retensi — kita butuh <strong>bentuk hidrograf lengkap</strong>: bagaimana debit naik, puncak, lalu turun kembali ke kondisi normal. HSS Nakayasu memberikan ini.</p>
  <div class="analogy-box">
    <div class="analogy-badge">💡 Analogi Hidrograf</div>
    <p>Hidrograf adalah seperti grafik jumlah penumpang di stasiun selama hari hujan. Paginya sepi, siang naik drastis saat hujan, mencapai puncak saat semua orang keluar serentak, lalu perlahan turun sore hari. Bentuk kurva naik-puncak-turun inilah yang disebut hidrograf — dan setiap DAS punya "bentuk khas" yang berbeda.</p>
  </div>
  <div id="s6a"></div>
  <div class="subsection"><h3>Parameter HSS Nakayasu</h3></div>
  <div class="formula-block">
    <span class="eq-label">Debit Puncak Hidrograf Satuan — Nakayasu</span>
    <span class="eq-main">Q_p = A / (3.6 × (0.3·t_p + T_{0.3}))</span>
    <span class="eq-desc">Q_p = debit puncak hidrograf satuan (m³/s per mm hujan efektif)
A = luas DAS (km²)  |  t_p = waktu ke puncak (jam)  |  T₀.₃ = waktu resesi ke 0.3·Q_p (jam)</span>
  </div>
  <div class="grid-2">
    <div>
      <div class="formula-block" style="margin-top:0;">
        <span class="eq-label">Waktu Kelambatan — t_g</span>
        <span class="eq-main">L &lt; 15 km → t_g = 0.21 · L^0.7</span>
        <span class="eq-main">L ≥ 15 km → t_g = 0.40 + 0.058 · L</span>
        <span class="eq-desc">L = panjang sungai utama (km)  |  t_g dalam jam
Contoh: L = 10 km → t_g = 0.21 × 10^0.7 = 0.21 × 5.01 = 1.05 jam</span>
      </div>
    </div>
    <div>
      <div class="formula-block" style="margin-top:0;border-left-color:var(--green);">
        <span class="eq-label">Waktu ke Puncak & Resesi</span>
        <span class="eq-main">t_r = 0.5 · t_g sampai 1.0 · t_g</span>
        <span class="eq-main">t_p = t_g + 0.8 · t_r</span>
        <span class="eq-main">T_{0.3} = α · t_g</span>
        <span class="eq-desc">t_r = saturation time  |  α = parameter resesi DAS (1–3)
α kecil = naik-turun cepat (DAS terjal)  |  α besar = resesi lambat (DAS datar)</span>
      </div>
    </div>
  </div>
  <div class="tbl-wrap">
    <table class="data-tbl">
      <thead><tr><th>Parameter</th><th>Simbol</th><th>Nilai (contoh)</th><th>Satuan</th><th>Cara Mendapatkan</th></tr></thead>
      <tbody>
        <tr><td class="td-label">Luas DAS</td><td>A</td><td>50</td><td>km²</td><td class="td-label" style="font-family:inherit;font-size:11px;color:var(--gray-600);">Delineasi dari DEM di QGIS/Global Mapper</td></tr>
        <tr><td class="td-label">Panjang sungai utama</td><td>L</td><td>10</td><td>km</td><td class="td-label" style="font-family:inherit;font-size:11px;color:var(--gray-600);">Ukur dari DEM atau peta topografi</td></tr>
        <tr><td class="td-label">Parameter resesi DAS</td><td>α</td><td>2.0</td><td>-</td><td class="td-label" style="font-family:inherit;font-size:11px;color:var(--gray-600);">Kalibrasi data debit terukur (AWLR) atau dari referensi</td></tr>
        <tr><td class="td-label">Waktu kelambatan</td><td>t_g</td><td>1.05</td><td>jam</td><td class="td-label" style="font-family:inherit;font-size:11px;color:var(--gray-600);">Dihitung: 0.21 × 10^0.7 = 1.05 jam</td></tr>
        <tr><td class="td-label">Saturation time</td><td>t_r</td><td>1.05</td><td>jam</td><td class="td-label" style="font-family:inherit;font-size:11px;color:var(--gray-600);">Diambil = t_g (simplifikasi)</td></tr>
        <tr class="highlight"><td class="td-label" style="color:var(--purple);font-weight:700;">Waktu ke puncak</td><td style="color:var(--purple);font-weight:700;">t_p</td><td style="color:var(--purple);font-weight:700;">1.89</td><td>jam</td><td class="td-label" style="font-family:inherit;font-size:11px;color:var(--gray-600);">t_g + 0.8×t_r = 1.05 + 0.84 = 1.89 jam</td></tr>
        <tr class="highlight"><td class="td-label" style="color:var(--purple);font-weight:700;">Waktu resesi</td><td style="color:var(--purple);font-weight:700;">T₀.₃</td><td style="color:var(--purple);font-weight:700;">2.10</td><td>jam</td><td class="td-label" style="font-family:inherit;font-size:11px;color:var(--gray-600);">α × t_g = 2.0 × 1.05 = 2.10 jam</td></tr>
        <tr><td class="td-label" style="color:var(--amber);font-weight:700;">Debit puncak unit</td><td style="color:var(--amber);font-weight:700;">Q_p</td><td style="color:var(--amber);font-weight:700;">5.19</td><td>m³/s/mm</td><td class="td-label" style="font-family:inherit;font-size:11px;color:var(--gray-600);">50 / (3.6 × (0.3×1.89 + 2.10)) = 5.19</td></tr>
      </tbody>
    </table>
  </div>
  <div class="card card-navy">
    <div class="card-label">Bentuk Hidrograf Satuan — Persamaan per Segmen</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.8rem;margin-top:0.5rem;">
      <div>
        <div class="formula-block" style="margin:0;padding:0.6rem 0.9rem;">
          <span class="eq-label">① Naik (0 ≤ t ≤ t_p)</span>
          <span class="eq-main" style="font-size:13px;">Q(t) = Q_p · (t / t_p)^2.4</span>
        </div>
      </div>
      <div>
        <div class="formula-block" style="margin:0;padding:0.6rem 0.9rem;border-left-color:var(--amber);">
          <span class="eq-label">② Turun awal (t_p ≤ t ≤ t_p + T₀.₃)</span>
          <span class="eq-main" style="font-size:13px;">Q(t) = Q_p · 0.3^((t−t_p)/T₀.₃)</span>
        </div>
      </div>
      <div>
        <div class="formula-block" style="margin:0;padding:0.6rem 0.9rem;border-left-color:var(--green);">
          <span class="eq-label">③ Turun tengah (s.d. t_p + 2.5·T₀.₃)</span>
          <span class="eq-main" style="font-size:12px;">Q(t) = Q_p · 0.3^((t−t_p+0.5·T₀.₃)/(1.5·T₀.₃))</span>
        </div>
      </div>
      <div>
        <div class="formula-block" style="margin:0;padding:0.6rem 0.9rem;border-left-color:var(--red);">
          <span class="eq-label">④ Ekor resesi (t &gt; t_p + 2.5·T₀.₃)</span>
          <span class="eq-main" style="font-size:12px;">Q(t) = Q_p · 0.3^((t−t_p+1.5·T₀.₃)/(2·T₀.₃))</span>
        </div>
      </div>
    </div>
  </div>
  <div id="s6b"></div>
  <div class="subsection"><h3>🎮 Hidrograf Interaktif — Pilih Kala Ulang</h3></div>
  <div class="chart-card">
    <div class="chart-title">Hidrograf Banjir Rencana — HSS Nakayasu</div>
    <div class="chart-sub">A = 50 km² | L = 10 km | α = 2.0 | C = 0.65 | Distribusi Gumbel. Klik kala ulang untuk tampilkan/sembunyikan.</div>
    <div class="hydro-controls" id="hydroBtns"></div>
    <div class="chart-wrap" style="height:340px;"><canvas id="chartHydro"></canvas></div>
    <div style="background:var(--gray-100);border-radius:8px;padding:0.8rem 1rem;margin-top:0.8rem;">
      <div style="font-size:11px;font-weight:700;color:var(--gray-600);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.06em;">Parameter Hidrograf Satuan</div>
      <div style="display:flex;gap:1.5rem;flex-wrap:wrap;font-size:12px;color:var(--gray-700);">
        <span>t_p = <strong>1.89 jam</strong></span>
        <span>T₀.₃ = <strong>2.10 jam</strong></span>
        <span>Q_p unit = <strong>5.19 m³/s/mm</strong></span>
        <span>t_dasar ≈ <strong>16.4 jam</strong></span>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- S7: HUJAN EFEKTIF -->
<section class="section anim-in" id="s7">
  <div class="section-header"><div class="section-num">7</div><h2>Hujan Efektif (R_eff)</h2></div>
  <p style="font-size:13px;color:var(--gray-600);line-height:1.7;margin-bottom:1rem;">Tidak semua curah hujan rencana langsung menjadi aliran permukaan. Ada kehilangan akibat intersepsi, infiltrasi, dan tampungan permukaan. Yang tersisa disebut <strong>hujan efektif (R_eff)</strong> — inilah yang benar-benar berkontribusi pada banjir.</p>
  <div class="grid-2">
    <div class="card card-blue">
      <div class="card-label">① Metode Phi-Index (φ)</div>
      <p>Kehilangan dianggap konstan sebesar φ (phi). Semua intensitas di atas φ menjadi hujan efektif. Sederhana, tapi memerlukan data debit terukur untuk kalibrasi φ.</p>
      <div class="formula-block" style="margin-top:8px;padding:0.6rem 0.9rem;">
        <span class="eq-main" style="font-size:13px;">R_eff = R_T − Abstraksi</span>
        <span class="eq-desc">Abstraksi ≈ 20-40% dari R_T (tanpa kalibrasi)</span>
      </div>
    </div>
    <div class="card card-green">
      <div class="card-label">② Metode SCS-CN (Curve Number)</div>
      <p>Menggunakan angka CN yang merepresentasikan kondisi tanah dan tata guna lahan. Lebih ilmiah dan bisa digunakan tanpa data debit terukur.</p>
      <div class="formula-block" style="margin-top:8px;padding:0.6rem 0.9rem;border-left-color:var(--green);">
        <span class="eq-main" style="font-size:12px;">R_eff = (R − 0.2·S)² / (R + 0.8·S)</span>
        <span class="eq-desc">S = 25400/CN − 254 &nbsp;|&nbsp; CN = 60–90 tipikal</span>
      </div>
    </div>
  </div>
  <div class="card card-amber" style="margin-bottom:1rem;">
    <div class="card-label">Pendekatan Sederhana (Tanpa Kalibrasi)</div>
    <p>Untuk analisis awal tanpa data debit terukur, hujan efektif dapat dihitung menggunakan koefisien limpasan: <strong>R_eff = C × R_T</strong>. Ini setara dengan asumsi bahwa proporsi hujan yang menjadi runoff sama dengan koefisien C dalam metode rasional.</p>
  </div>
  <div class="tbl-wrap">
    <table class="data-tbl" id="tblReff"></table>
  </div>
</section>

<div class="divider"></div>

<!-- S8: DEBIT PUNCAK -->
<section class="section anim-in" id="s8">
  <div class="section-header"><div class="section-num">8</div><h2>Rekapitulasi Debit Banjir Rencana</h2></div>
  <p style="font-size:13px;color:var(--gray-600);line-height:1.7;margin-bottom:1rem;">Dengan mengalikan hidrograf satuan Nakayasu (Q_p unit = 5.19 m³/s per mm) dengan hujan efektif masing-masing kala ulang, diperoleh debit puncak banjir rencana.</p>
  <div class="grid-4" id="peakCards"></div>
  <div class="tbl-wrap">
    <table class="data-tbl" id="tblDebit"></table>
  </div>
  <div class="success-box"><span class="box-icon">🎯</span><span>Tabel debit puncak di atas adalah <strong>output final yang siap digunakan</strong> sebagai input untuk: (1) HEC-RAS untuk profil muka air banjir, (2) desain dimensi bendung/tanggul, (3) penentuan tinggi jagaan (freeboard), dan (4) analisis kapasitas sungai.</span></div>
</section>

<div class="divider"></div>

<!-- S9: PERBANDINGAN -->
<section class="section anim-in" id="s9">
  <div class="section-header"><div class="section-num">9</div><h2>Perbandingan Antar Metode</h2></div>
  <div class="chart-card">
    <div class="chart-title">Perbandingan Debit Puncak: Metode Rasional vs HSS Nakayasu</div>
    <div class="chart-sub">A = 50 km² | C = 0.65 | Distribusi Gumbel. Nilai dalam m³/s.</div>
    <div class="chart-wrap" style="height:300px;"><canvas id="chartCompare"></canvas></div>
    <div class="legend-row">
      <div class="legend-item"><div class="legend-sq" style="background:#185fa5;"></div> Metode Rasional</div>
      <div class="legend-item"><div class="legend-sq" style="background:#6D28D9;"></div> HSS Nakayasu</div>
    </div>
  </div>
  <div class="tbl-wrap">
    <table class="data-tbl" id="tblCompare"></table>
  </div>
  <div class="card card-navy" style="margin-top:1rem;">
    <div class="card-label">Kapan Menggunakan Metode Mana?</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:0.5rem;">
      <div>
        <p><strong style="color:var(--blue);">📏 Metode Rasional</strong></p>
        <p>✅ DAS kecil (&lt; 50 km²)<br>✅ Desain drainase perkotaan<br>✅ Gorong-gorong dan saluran kecil<br>✅ Saat data terbatas<br>❌ Tidak menghasilkan hidrograf<br>❌ Kurang akurat untuk DAS besar</p>
      </div>
      <div>
        <p><strong style="color:var(--purple);">📊 HSS Nakayasu</strong></p>
        <p>✅ DAS menengah–besar (10–1000 km²)<br>✅ Perlu bentuk hidrograf penuh<br>✅ Input untuk HEC-HMS/RAS<br>✅ Desain bendung dan waduk<br>❌ Perlu kalibrasi parameter α<br>❌ Lebih kompleks perhitungannya</p>
      </div>
    </div>
  </div>
  <div class="warn-box"><span class="box-icon">⚠️</span><span>Hasil debit dari metode berbeda bisa berbeda 10–30%. Dalam proyek nyata, selalu lakukan <strong>analisis sensitivitas</strong> dengan minimal dua metode, dan gunakan nilai yang lebih konservatif (lebih besar) untuk keamanan. Konfirmasi juga dengan data debit terukur (AWLR) jika tersedia.</span></div>
</section>

<div class="divider"></div>

<!-- S10: KODE R -->
<section class="section anim-in" id="s10">
  <div class="section-header"><div class="section-num">10</div><h2>Kode R — Implementasi Lengkap</h2></div>
  <div class="code-wrap">
    <div class="code-header">
      <span class="code-lang"><span class="dot" style="background:#4fc3f7;"></span>R · Setup & Parameter DAS</span>
      <button class="copy-btn" onclick="copyCode(this)">Salin</button>
    </div>
    <pre><span class="fn">options</span>(OutDec = <span class="str">"."</span>)
<span class="kw">library</span>(<span class="pkg">dplyr</span>); <span class="kw">library</span>(<span class="pkg">tidyr</span>); <span class="kw">library</span>(<span class="pkg">ggplot2</span>)

<span class="cm"># ── Parameter DAS ─────────────────────────────────────────────</span>
A     <span class="op">&lt;-</span> <span class="num">50</span>      <span class="cm"># luas DAS (km²)</span>
L     <span class="op">&lt;-</span> <span class="num">10</span>      <span class="cm"># panjang sungai utama (km)</span>
alpha <span class="op">&lt;-</span> <span class="num">2.0</span>    <span class="cm"># parameter resesi Nakayasu</span>
C_run <span class="op">&lt;-</span> <span class="num">0.65</span>   <span class="cm"># koefisien limpasan DAS</span>
L_kir <span class="op">&lt;-</span> <span class="num">5000</span>   <span class="cm"># panjang saluran untuk Kirpich (meter)</span>
S_kir <span class="op">&lt;-</span> <span class="num">0.010</span>  <span class="cm"># kemiringan untuk Kirpich (m/m)</span>

<span class="cm"># ── Curah hujan rencana dari analisa frekuensi (Gumbel) ───────</span>
T_values <span class="op">&lt;-</span> <span class="fn">c</span>(<span class="num">2</span>, <span class="num">5</span>, <span class="num">10</span>, <span class="num">25</span>, <span class="num">50</span>, <span class="num">100</span>)
R_T      <span class="op">&lt;-</span> <span class="fn">c</span>(<span class="num">96.4</span>, <span class="num">118.7</span>, <span class="num">133.4</span>, <span class="num">151.9</span>, <span class="num">165.6</span>, <span class="num">179.2</span>)  <span class="cm"># mm</span>

<span class="cm"># ── Waktu konsentrasi Kirpich ─────────────────────────────────</span>
tc_min <span class="op">&lt;-</span> <span class="num">0.0195</span> <span class="op">*</span> L_kir^<span class="num">0.77</span> <span class="op">*</span> S_kir^(<span class="op">-</span><span class="num">0.385</span>)
tc_jam <span class="op">&lt;-</span> tc_min / <span class="num">60</span>
<span class="fn">cat</span>(<span class="str">"tc Kirpich ="</span>, <span class="fn">round</span>(tc_jam, <span class="num">2</span>), <span class="str">"jam\n"</span>)</pre>
  </div>

  <div class="code-wrap">
    <div class="code-header">
      <span class="code-lang"><span class="dot" style="background:#4fc3f7;"></span>R · Metode Rasional</span>
      <button class="copy-btn" onclick="copyCode(this)">Salin</button>
    </div>
    <pre><span class="cm"># ── Intensitas Mononobe pada t = tc ───────────────────────────</span>
mononobe <span class="op">&lt;-</span> <span class="kw">function</span>(R24, t_jam) (R24 / <span class="num">24</span>) <span class="op">*</span> (<span class="num">24</span> / t_jam)^(<span class="num">2</span>/<span class="num">3</span>)

<span class="cm"># ── Debit puncak metode rasional ─────────────────────────────</span>
I_tc  <span class="op">&lt;-</span> <span class="fn">sapply</span>(R_T, mononobe, t_jam = tc_jam)  <span class="cm"># intensitas (mm/jam)</span>
Q_ras <span class="op">&lt;-</span> <span class="num">0.278</span> <span class="op">*</span> C_run <span class="op">*</span> I_tc <span class="op">*</span> A              <span class="cm"># debit (m³/s)</span>

hasil_rasional <span class="op">&lt;-</span> <span class="fn">data.frame</span>(
  T      = T_values,
  R_T_mm = R_T,
  I_mmjam = <span class="fn">round</span>(I_tc, <span class="num">1</span>),
  Q_m3s   = <span class="fn">round</span>(Q_ras, <span class="num">1</span>)
)
<span class="fn">print</span>(hasil_rasional)</pre>
  </div>

  <div class="code-wrap">
    <div class="code-header">
      <span class="code-lang"><span class="dot" style="background:#4fc3f7;"></span>R · HSS Nakayasu — Parameter & Hidrograf Satuan</span>
      <button class="copy-btn" onclick="copyCode(this)">Salin</button>
    </div>
    <pre><span class="cm"># ── Parameter Nakayasu ────────────────────────────────────────</span>
tg  <span class="op">&lt;-</span> <span class="kw">if</span>(L <span class="op">&lt;</span> <span class="num">15</span>) <span class="num">0.21</span> <span class="op">*</span> L^<span class="num">0.7</span> <span class="kw">else</span> <span class="num">0.40</span> <span class="op">+</span> <span class="num">0.058</span> <span class="op">*</span> L
tr  <span class="op">&lt;-</span> tg                     <span class="cm"># simplifikasi: tr = tg</span>
tp  <span class="op">&lt;-</span> tg <span class="op">+</span> <span class="num">0.8</span> <span class="op">*</span> tr
T03 <span class="op">&lt;-</span> alpha <span class="op">*</span> tg
Qp  <span class="op">&lt;-</span> A / (<span class="num">3.6</span> <span class="op">*</span> (<span class="num">0.3</span> <span class="op">*</span> tp <span class="op">+</span> T03))  <span class="cm"># m³/s per mm</span>

<span class="fn">cat</span>(<span class="str">"tg ="</span>, <span class="fn">round</span>(tg, <span class="num">2</span>), <span class="str">"jam | tp ="</span>, <span class="fn">round</span>(tp,<span class="num">2</span>),
    <span class="str">"jam | T03 ="</span>, <span class="fn">round</span>(T03,<span class="num">2</span>), <span class="str">"jam | Qp_unit ="</span>, <span class="fn">round</span>(Qp,<span class="num">3</span>), <span class="str">"m3/s/mm\n"</span>)

<span class="cm"># ── Hidrograf satuan (dt = 0.1 jam) ──────────────────────────</span>
nakayasu_unit <span class="op">&lt;-</span> <span class="kw">function</span>(t) {
  <span class="kw">if</span>      (t <span class="op">&lt;=</span> tp)             Qp <span class="op">*</span> (t / tp)^<span class="num">2.4</span>
  <span class="kw">else if</span> (t <span class="op">&lt;=</span> tp <span class="op">+</span> T03)       Qp <span class="op">*</span> <span class="num">0.3</span>^((t <span class="op">-</span> tp) / T03)
  <span class="kw">else if</span> (t <span class="op">&lt;=</span> tp <span class="op">+</span> <span class="num">2.5</span><span class="op">*</span>T03)   Qp <span class="op">*</span> <span class="num">0.3</span>^((t <span class="op">-</span> tp <span class="op">+</span> <span class="num">0.5</span><span class="op">*</span>T03) / (<span class="num">1.5</span><span class="op">*</span>T03))
  <span class="kw">else</span>                           Qp <span class="op">*</span> <span class="num">0.3</span>^((t <span class="op">-</span> tp <span class="op">+</span> <span class="num">1.5</span><span class="op">*</span>T03) / (<span class="num">2</span>  <span class="op">*</span>T03))
}

t_seq      <span class="op">&lt;-</span> <span class="fn">seq</span>(<span class="num">0</span>, <span class="num">24</span>, by = <span class="num">0.1</span>)
unit_hydro <span class="op">&lt;-</span> <span class="fn">sapply</span>(t_seq, nakayasu_unit)</pre>
  </div>

  <div class="code-wrap">
    <div class="code-header">
      <span class="code-lang"><span class="dot" style="background:#4fc3f7;"></span>R · Debit Banjir Rencana & Plot Hidrograf</span>
      <button class="copy-btn" onclick="copyCode(this)">Salin</button>
    </div>
    <pre><span class="cm"># ── Hujan efektif & hidrograf banjir per kala ulang ──────────</span>
R_eff   <span class="op">&lt;-</span> C_run <span class="op">*</span> R_T               <span class="cm"># hujan efektif (mm)</span>
Qpeak_N <span class="op">&lt;-</span> Qp <span class="op">*</span> R_eff               <span class="cm"># debit puncak Nakayasu (m³/s)</span>

<span class="cm"># ── Buat data frame hidrograf semua kala ulang ────────────────</span>
df_hydro <span class="op">&lt;-</span> <span class="fn">lapply</span>(<span class="fn">seq_along</span>(T_values), <span class="kw">function</span>(i) {
  <span class="fn">data.frame</span>(
    t    = t_seq,
    Q    = unit_hydro <span class="op">*</span> R_eff[i],
    T_yr = <span class="fn">paste0</span>(<span class="str">"T"</span>, T_values[i])
  )
}) <span class="op">|&gt;</span> <span class="fn">bind_rows</span>()

<span class="cm"># ── Plot hidrograf semua kala ulang ───────────────────────────</span>
cols <span class="op">&lt;-</span> <span class="fn">c</span>(T2=<span class="str">"#64748b"</span>, T5=<span class="str">"#2563eb"</span>, T10=<span class="str">"#0284c7"</span>,
         T25=<span class="str">"#d97706"</span>, T50=<span class="str">"#dc2626"</span>, T100=<span class="str">"#7c3aed"</span>)

ggplot(df_hydro, <span class="fn">aes</span>(x = t, y = Q, color = T_yr)) <span class="op">+</span>
  <span class="fn">geom_line</span>(linewidth = <span class="num">0.9</span>) <span class="op">+</span>
  <span class="fn">scale_color_manual</span>(values = cols) <span class="op">+</span>
  <span class="fn">geom_vline</span>(xintercept = tp, linetype = <span class="str">"dashed"</span>, color = <span class="str">"gray50"</span>, linewidth = <span class="num">0.5</span>) <span class="op">+</span>
  <span class="fn">annotate</span>(<span class="str">"text"</span>, x = tp + <span class="num">0.2</span>, y = <span class="fn">max</span>(df_hydro<span class="op">$</span>Q) <span class="op">*</span> <span class="num">0.95</span>,
           label = <span class="fn">paste0</span>(<span class="str">"tp = "</span>, <span class="fn">round</span>(tp, <span class="num">2</span>), <span class="str">" jam"</span>), size = <span class="num">3</span>, hjust = <span class="num">0</span>) <span class="op">+</span>
  <span class="fn">labs</span>(
    title    = <span class="str">"Hidrograf Banjir Rencana — HSS Nakayasu"</span>,
    subtitle = <span class="fn">paste0</span>(<span class="str">"A="</span>, A, <span class="str">" km² | L="</span>, L, <span class="str">" km | α="</span>, alpha, <span class="str">" | C="</span>, C_run),
    x = <span class="str">"Waktu (jam)"</span>, y = <span class="str">"Debit Q (m³/s)"</span>, color = <span class="str">"Kala Ulang"</span>,
    caption  = <span class="str">"Metode: HSS Nakayasu | SNI 2415:2016"</span>
  ) <span class="op">+</span>
  <span class="fn">theme_minimal</span>(base_size = <span class="num">11</span>) <span class="op">+</span>
  <span class="fn">theme</span>(plot.title = <span class="fn">element_text</span>(face = <span class="str">"bold"</span>))

<span class="fn">ggsave</span>(<span class="str">"hidrograf_banjir_rencana.png"</span>, width = <span class="num">36</span>, height = <span class="num">22</span>, units = <span class="str">"cm"</span>, dpi = <span class="num">300</span>)</pre>
  </div>
</section>

<div class="divider"></div>

<!-- S11: KELANJUTAN -->
<section class="section anim-in" id="s11">
  <div class="section-header"><div class="section-num">11</div><h2>Kelanjutan — Debit Banjir Rencana Dipakai untuk Apa?</h2></div>
  <div class="grid-3">
    <div class="card card-blue">
      <div class="card-label">① Pemodelan HEC-RAS</div>
      <p>Debit Q_T (m³/s) menjadi input boundary condition di HEC-RAS untuk menghitung profil muka air banjir di sepanjang sungai.</p>
      <p style="margin-top:8px;font-size:12px;color:var(--gray-500);">→ Profil WSE (Water Surface Elevation)<br>→ Kecepatan aliran per penampang<br>→ Peta genangan banjir (GIS)</p>
    </div>
    <div class="card card-green">
      <div class="card-label">② Desain Bendung & Tanggul</div>
      <p>Q rencana menentukan dimensi pelimpah (spillway), tinggi tanggul, dan tinggi jagaan (freeboard) yang diperlukan.</p>
      <p style="margin-top:8px;font-size:12px;color:var(--gray-500);">→ Q_50 atau Q_100 untuk tanggul<br>→ Q_100 atau Q_PMF untuk bendungan<br>→ Kapasitas kolam olak</p>
    </div>
    <div class="card card-amber">
      <div class="card-label">③ Analisis Sempadan Sungai</div>
      <p>Profil muka air dari HEC-RAS digunakan untuk menentukan garis sempadan sungai sesuai Permen PUPR No. 28/2015.</p>
      <p style="margin-top:8px;font-size:12px;color:var(--gray-500);">→ Batas banjir Q_25 atau Q_50<br>→ Sempadan berdasarkan lebar sungai<br>→ Rekomendasi tata ruang</p>
    </div>
    <div class="card card-purple">
      <div class="card-label">④ Drainase Perkotaan (SWMM)</div>
      <p>Untuk DAS kecil perkotaan, hidrograf banjir menjadi input SWMM untuk merancang kapasitas saluran dan kolam retensi.</p>
      <p style="margin-top:8px;font-size:12px;color:var(--gray-500);">→ Dimensi saluran drainase<br>→ Volume kolam detensi/retensi<br>→ Pompa dan pintu air</p>
    </div>
    <div class="card card-navy">
      <div class="card-label">⑤ Analisis AMDAL Hidrologi</div>
      <p>Perbandingan Q sebelum dan sesudah proyek pembangunan untuk prakiraan dampak peningkatan limpasan permukaan.</p>
      <p style="margin-top:8px;font-size:12px;color:var(--gray-500);">→ ΔQ akibat perubahan tutupan lahan<br>→ Prakiraan peningkatan debit puncak<br>→ Rekomendasi mitigasi banjir</p>
    </div>
    <div class="card card-red">
      <div class="card-label">⑥ Analisis Risiko Banjir</div>
      <p>Kombinasi Q rencana berbagai kala ulang dengan peta topografi untuk peta hazard banjir dan analisis kerentanan wilayah.</p>
      <p style="margin-top:8px;font-size:12px;color:var(--gray-500);">→ Peta genangan multi-skenario<br>→ Matriks risiko banjir<br>→ Prioritas pengendalian banjir</p>
    </div>
  </div>
  <div class="info-box"><span class="box-icon">🔗</span><span>Rantai lengkap analisis hidrologi: <strong>Data Hujan → Analisa Frekuensi → Curah Hujan Rencana → Debit Banjir Rencana → HEC-RAS → Profil Muka Air → Desain Infrastruktur</strong>. Setiap langkah membangun di atas hasil langkah sebelumnya — kesalahan di langkah awal akan menjalar ke semua output hilir.</span></div>
  <div style="margin-top:1.5rem;">
    <div class="card-label" style="font-size:11px;margin-bottom:10px;">ARTIKEL TERKAIT</div>
    <a href="analisa-frekuensi-curah-hujan.html" class="nav-link">
      <span style="font-size:1.2rem;color:var(--gray-400);">←</span>
      <div>
        <div class="nav-link-label">Artikel Sebelumnya</div>
        <div class="nav-link-title">Analisa Frekuensi Curah Hujan: Panduan Lengkap</div>
      </div>
    </a>
    <div class="nav-link nav-link-dim">
      <span style="font-size:1.2rem;color:var(--gray-400);">→</span>
      <div>
        <div class="nav-link-label">Segera Hadir</div>
        <div class="nav-link-title">Pemodelan HEC-RAS: Dari Debit ke Profil Muka Air</div>
      </div>
    </div>
  </div>
  <p style="font-size:12px;color:var(--gray-400);margin-top:2rem;border-top:1px solid var(--gray-200);padding-top:1rem;">
    Semua rumus mengikuti <strong>SNI 2415:2016</strong>. Referensi: Sri Harto (1993), Triatmodjo (2008), Soemarto (1995), Nakayasu (1950), Kirpich (1940). Kode R menggunakan paket: <code>dplyr</code>, <code>tidyr</code>, <code>ggplot2</code>.
  </p>
</section>
</div>
<script>

/* ================================================================
   DATA
   ================================================================ */
const T_arr  = [2,5,10,25,50,100];
const RT     = [96.4,118.7,133.4,151.9,165.6,179.2];
const A=50, L=10, alpha=2.0, C=0.65;
const Lk=5000, Sk=0.010;

// Nakayasu parameters
const tg  = (L < 15) ? 0.21*Math.pow(L,0.7) : 0.40+0.058*L;  // 1.053 hr
const tr  = tg;
const tp  = tg + 0.8*tr;    // 1.895 hr
const T03 = alpha*tg;        // 2.106 hr
const Qp_unit = A/(3.6*(0.3*tp+T03));  // m3/s per mm

// Time of concentration - Kirpich
const tc_min = 0.0195*Math.pow(Lk,0.77)*Math.pow(Sk,-0.385);
const tc_hr  = tc_min/60;

// Mononobe IDF
function mononobe(R24,t){ return (R24/24)*Math.pow(24/t, 2/3); }

// Intensities at tc
const I_tc = RT.map(r=>mononobe(r,tc_hr));

// Rational method peak discharge
const Q_ras = I_tc.map(i=>0.278*C*i*A);

// Effective rainfall & Nakayasu peaks
const R_eff    = RT.map(r=>C*r);
const Qpeak_N  = R_eff.map(r=>Qp_unit*r);

// Nakayasu unit hydrograph
function nakUnit(t){
  if(t<=tp)           return Qp_unit*Math.pow(t/tp,2.4);
  if(t<=tp+T03)       return Qp_unit*Math.pow(0.3,(t-tp)/T03);
  if(t<=tp+2.5*T03)   return Qp_unit*Math.pow(0.3,(t-tp+0.5*T03)/(1.5*T03));
  return Qp_unit*Math.pow(0.3,(t-tp+1.5*T03)/(2*T03));
}
const dt=0.1, tMax=22;
const t_seq=[], u_seq=[];
for(let t=0;t<=tMax;t+=dt){t_seq.push(+t.toFixed(1));u_seq.push(nakUnit(t));}

const COLORS=['#64748b','#2563eb','#0284c7','#d97706','#dc2626','#7c3aed'];
const LABELS=['T = 2 thn','T = 5 thn','T = 10 thn','T = 25 thn','T = 50 thn','T = 100 thn'];

/* ================================================================
   DAS PARAMS CARD
   ================================================================ */
function buildDASParams(){
  const el=document.getElementById('dasParams');
  const params=[
    {n:'Luas DAS (A)',v:'50',u:'km²',c:'var(--blue-mid)'},
    {n:'Panjang Sungai (L)',v:'10',u:'km',c:'var(--purple)'},
    {n:'Kemiringan DAS (S)',v:'0.010',u:'m/m',c:'var(--amber)'},
    {n:'Koef. Limpasan (C)',v:'0.65',u:'-',c:'var(--green)'},
    {n:'Waktu Konsentrasi',v:'1.35',u:'jam',c:'var(--red)'},
    {n:'Parameter α',v:'2.0',u:'-',c:'var(--navy)'},
  ];
  el.innerHTML=params.map(p=>`
    <div class="das-param" style="border-top-color:${p.c};">
      <div class="das-param-name">${p.n}</div>
      <div class="das-param-val">${p.v} <span class="das-param-unit">${p.u}</span></div>
    </div>`).join('');
}

/* ================================================================
   REFF TABLE
   ================================================================ */
function buildReffTable(){
  const tb=document.getElementById('tblReff');
  let html=`<thead><tr><th>Kala Ulang T</th><th class="th-blue">R_T (mm)</th>
    <th class="th-amber">R_eff = C×R_T (mm)</th>
    <th class="th-purple">Q_p Nakayasu (m³/s)</th>
    <th class="th-blue">Proporsi Runoff</th></tr></thead><tbody>`;
  T_arr.forEach((T,i)=>{
    const hi=i>=3;
    html+=`<tr ${hi?'class="highlight"':''}>
      <td style="${hi?'color:var(--amber);font-weight:700;':''}">T = ${T} tahun</td>
      <td>${RT[i].toFixed(1)}</td>
      <td style="color:var(--amber);font-weight:600;">${R_eff[i].toFixed(1)}</td>
      <td style="color:var(--purple);font-weight:700;">${Qpeak_N[i].toFixed(0)}</td>
      <td>${(C*100).toFixed(0)}%</td>
    </tr>`;
  });
  tb.innerHTML=html+'</tbody>';
}

/* ================================================================
   PEAK DEBIT CARDS
   ================================================================ */
function buildPeakCards(){
  const el=document.getElementById('peakCards');
  const cls=['blue','blue','blue','amber','red','purple'];
  el.innerHTML=T_arr.map((T,i)=>`
    <div class="metric-card ${cls[i]}">
      <div class="metric-label">T = ${T} tahun</div>
      <div class="metric-val">${Qpeak_N[i].toFixed(0)}</div>
      <div class="metric-unit">m³/s (Nakayasu)</div>
    </div>`).join('');
}

/* ================================================================
   DEBIT TABLE
   ================================================================ */
function buildDebitTable(){
  const tb=document.getElementById('tblDebit');
  let html=`<thead><tr>
    <th>Kala Ulang T</th>
    <th class="th-blue">R_T (mm)</th>
    <th class="th-green">R_eff (mm)</th>
    <th class="th-blue">Q Rasional (m³/s)</th>
    <th class="th-purple">Q Nakayasu (m³/s)</th>
    <th class="th-amber">Selisih (%)</th>
    <th>Keterangan</th>
  </tr></thead><tbody>`;
  const uses=['Drainase minor','Drainase sekunder','Drainase utama','Sungai / jembatan','Tanggul / bendung','Bendungan / vital'];
  T_arr.forEach((T,i)=>{
    const selisih=((Q_ras[i]-Qpeak_N[i])/Qpeak_N[i]*100);
    const hi=i>=3;
    html+=`<tr ${hi?'class="highlight"':''}>
      <td style="${hi?'color:var(--amber);font-weight:700;':''}">T = ${T} thn</td>
      <td>${RT[i].toFixed(1)}</td>
      <td style="color:var(--green);">${R_eff[i].toFixed(1)}</td>
      <td style="color:var(--blue);font-weight:600;">${Q_ras[i].toFixed(0)}</td>
      <td style="color:var(--purple);font-weight:700;">${Qpeak_N[i].toFixed(0)}</td>
      <td style="color:${Math.abs(selisih)>15?'var(--red)':'var(--gray-600)'};">${selisih>0?'+':''}${selisih.toFixed(1)}%</td>
      <td class="td-label" style="font-family:inherit;font-size:11px;color:var(--gray-600);">${uses[i]}</td>
    </tr>`;
  });
  tb.innerHTML=html+'</tbody>';
}

/* ================================================================
   RATIONAL CALCULATOR
   ================================================================ */
function updateRasional(){
  const c_val = parseFloat(document.getElementById('slC').value);
  const a_val = parseFloat(document.getElementById('slA').value);
  const t_val = parseFloat(document.getElementById('selT').value);
  const tc_v  = parseFloat(document.getElementById('slTc').value);
  document.getElementById('dispC').textContent = c_val.toFixed(2);
  document.getElementById('dispA').textContent = a_val.toFixed(0);
  document.getElementById('dispTc').textContent = tc_v.toFixed(2);
  // Find RT for selected T
  const idx = T_arr.indexOf(parseInt(t_val));
  const rt_v = RT[idx] || 133.4;
  const i_v  = mononobe(rt_v, tc_v);
  const q_v  = 0.278*c_val*i_v*a_val;
  document.getElementById('dispI').textContent = i_v.toFixed(1)+' mm/jam (R₂₄='+rt_v+' mm, t='+tc_v.toFixed(2)+' jam)';
  document.getElementById('resultQ').textContent = q_v.toFixed(0);
  // Compare text
  const pools = q_v/0.001; // liters
  document.getElementById('resultCompare').textContent = `≈ ${(q_v/1000).toFixed(2)} m³/ms | ${Math.round(q_v*3600/50000)} mm/jam rata DAS`;
  document.getElementById('warningA').style.display = a_val>50?'flex':'none';
}
function setC(v){ if(v){ document.getElementById('slC').value=v; updateRasional(); } }

/* ================================================================
   CHARTS
   ================================================================ */
const CH={};
function buildCharts(){
  if(CH._built) return; CH._built=true;

  /* Rasional Bar */
  const ctx1=document.getElementById('chartRasional');
  if(ctx1) CH.ras=new Chart(ctx1,{
    type:'bar',
    data:{
      labels:T_arr.map(t=>'T='+t+' thn'),
      datasets:[{
        label:'Debit Puncak (m³/s)',
        data:Q_ras.map(q=>+q.toFixed(1)),
        backgroundColor:COLORS,
        borderRadius:5,
      }]
    },
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{
        legend:{display:false},
        tooltip:{callbacks:{label:c=>'Q = '+c.raw.toFixed(1)+' m³/s'}}
      },
      scales:{
        x:{grid:{display:false},ticks:{font:{size:11}}},
        y:{title:{display:true,text:'Debit (m³/s)'},ticks:{font:{size:11}},grid:{color:'rgba(0,0,0,0.05)'}}
      }
    }
  });

  /* Hydrograph */
  const ctx2=document.getElementById('chartHydro');
  if(ctx2){
    const datasets=T_arr.map((T,i)=>({
      label:LABELS[i],
      data:u_seq.map(u=>+(u*R_eff[i]).toFixed(2)),
      borderColor:COLORS[i],
      backgroundColor:'transparent',
      borderWidth:i>=3?2.2:1.5,
      pointRadius:0,
      tension:0.3,
      hidden:i<2 // default show T10+
    }));
    CH.hydro=new Chart(ctx2,{
      type:'line',
      data:{labels:t_seq,datasets},
      options:{responsive:true,maintainAspectRatio:false,
        interaction:{mode:'index',intersect:false},
        plugins:{
          legend:{display:false},
          tooltip:{callbacks:{
            title:items=>'t = '+items[0].label+' jam',
            label:c=>c.dataset.label+': '+c.raw.toFixed(1)+' m³/s'
          }}
        },
        scales:{
          x:{title:{display:true,text:'Waktu (jam)'},ticks:{maxTicksLimit:12,font:{size:11}},grid:{color:'rgba(0,0,0,0.04)'}},
          y:{title:{display:true,text:'Debit Q (m³/s)'},min:0,ticks:{font:{size:11}},grid:{color:'rgba(0,0,0,0.05)'}}
        }
      }
    });
    // Build toggle buttons
    const btns=document.getElementById('hydroBtns');
    btns.innerHTML=T_arr.map((T,i)=>`
      <button class="hydro-btn ${!CH.hydro.data.datasets[i].hidden?'active':''}"
        style="color:${COLORS[i]};border-color:${COLORS[i]};${!CH.hydro.data.datasets[i].hidden?'background:'+COLORS[i]+';color:#fff;':''}"
        onclick="toggleHydro(${i},this,'${COLORS[i]}')">T = ${T}</button>`).join('');
  }

  /* Compare */
  const ctx3=document.getElementById('chartCompare');
  if(ctx3) CH.cmp=new Chart(ctx3,{
    type:'bar',
    data:{
      labels:T_arr.map(t=>'T = '+t+' thn'),
      datasets:[
        {label:'Metode Rasional',data:Q_ras.map(q=>+q.toFixed(0)),backgroundColor:'rgba(24,95,165,0.75)',borderRadius:4},
        {label:'HSS Nakayasu',data:Qpeak_N.map(q=>+q.toFixed(0)),backgroundColor:'rgba(109,40,217,0.75)',borderRadius:4},
      ]
    },
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{
        legend:{position:'bottom',labels:{font:{size:11},usePointStyle:true}},
        tooltip:{callbacks:{label:c=>c.dataset.label+': '+c.raw+' m³/s'}}
      },
      scales:{
        x:{grid:{display:false},ticks:{font:{size:11}}},
        y:{title:{display:true,text:'Debit Puncak (m³/s)'},ticks:{font:{size:11}},grid:{color:'rgba(0,0,0,0.05)'}}
      }
    }
  });
}

function toggleHydro(i,btn,color){
  const ds=CH.hydro.data.datasets[i];
  ds.hidden=!ds.hidden;
  if(ds.hidden){btn.style.background='#fff';btn.style.color=color;}
  else{btn.style.background=color;btn.style.color='#fff';}
  CH.hydro.update();
}

/* ================================================================
   TOC, SCROLL
   ================================================================ */
function updateProgress(){
  const el=document.getElementById('progBar'),pct=document.getElementById('progPct');
  const s=window.scrollY,total=document.body.scrollHeight-window.innerHeight;
  const p=total>0?Math.round(s/total*100):0;
  el.style.width=p+'%';pct.textContent=p+'%';
}
window.addEventListener('scroll',updateProgress,{passive:true});
const tocLinks=document.querySelectorAll('.toc-link');
const sections=Array.from(document.querySelectorAll('section[id],div[id]'));
function updateToc(){
  let cur='';
  sections.forEach(s=>{if(window.scrollY>=s.offsetTop-100)cur=s.id;});
  tocLinks.forEach(l=>{const h=l.getAttribute('href').replace('#','');l.classList.toggle('active',h===cur);});
}
window.addEventListener('scroll',updateToc,{passive:true});
function toggleToc(){document.getElementById('tocFloat').classList.toggle('collapsed');}
let tocV=false;
function toggleTocMobile(){
  tocV=!tocV;const tf=document.getElementById('tocFloat');
  tf.style.display=tocV?'block':'';
  if(tocV){tf.style.position='fixed';tf.style.right='0';tf.style.top='80px';}
}
function copyCode(btn){
  const t=btn.closest('.code-wrap').querySelector('pre').innerText;
  navigator.clipboard.writeText(t).then(()=>{btn.textContent='✓ Tersalin!';setTimeout(()=>btn.textContent='Salin',2000);});
}
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');buildCharts();}});
},{threshold:0.01,rootMargin:'0px 0px -10px 0px'});
document.querySelectorAll('.anim-in').forEach(el=>io.observe(el));

/* INIT */
buildDASParams();
buildReffTable();
buildPeakCards();
buildDebitTable();
updateRasional();
updateProgress();
setTimeout(buildCharts,400);

</script>
{{< /rawhtml >}}
