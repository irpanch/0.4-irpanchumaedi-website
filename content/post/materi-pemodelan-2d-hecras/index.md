---
title: "Modul 5 — Pemodelan 2D dengan HEC-RAS"
summary: "Dari mesh generation hingga peta genangan 2D — kapan perlu 2D, setup mesh & breaklines, SWE vs DWE, model hybrid 1D-2D, dan visualisasi output di RAS Mapper."
authors: ["irpan-chumaedi"]
tags: ["HEC-RAS", "2D modeling", "mesh", "RAS Mapper", "SWE", "DWE", "flood mapping", "tutorial"]
categories: ["HEC-RAS"]
date: 2024-01-05
lastmod: 2024-01-05
draft: false
description: "Tutorial pemodelan 2D HEC-RAS: setup 2D flow area, generate mesh, breaklines, SWE vs DWE, kondisi batas 2D, model hybrid 1D-2D, dan ekspor peta genangan ke QGIS."
modul_hecras: true
reading_time: true
share: true
toc: false
---

{{< rawhtml >}}
<style>

.modul5-2d, .modul5-2d *::before, .modul5-2d *::after { box-sizing: border-box; margin: 0; padding: 0; }


  /* TOP NAV */
  .topnav { background: var(--hec-bg-card); border-bottom: 1px solid var(--hec-border); padding: 0 2rem; height: 56px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
.modul5-2d .nav-brand { font-size: 15px; font-weight: 600; color: var(--hec-warning); letter-spacing: -0.3px; }
.modul5-2d .nav-breadcrumb { font-size: 13px; color: var(--hec-muted); }
.modul5-2d .nav-breadcrumb span { color: var(--hec-dim); margin: 0 6px; }
.modul5-2d .nav-breadcrumb a { color: var(--hec-muted); text-decoration: none; }
.modul5-2d .nav-breadcrumb a:hover { color: var(--hec-warning); }

  /* HERO */
  .hero { background: linear-gradient(135deg, #0a1f15 0%, #0f1117 70%); border-bottom: 1px solid var(--hec-border); padding: 3rem 2rem 2.5rem; position: relative; overflow: hidden; }
.modul5-2d .hero::before { content: ''; position: absolute; top: -40px; right: -40px; width: 350px; height: 350px; background: radial-gradient(circle, rgba(62,207,142,0.08) 0%, transparent 70%); pointer-events: none; }
.modul5-2d .hero-tag { display: inline-flex; align-items: center; gap: 6px; background: rgba(62,207,142,0.12); border: 1px solid rgba(62,207,142,0.3); color: var(--hec-warning); font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 20px; margin-bottom: 1rem; letter-spacing: 0.5px; text-transform: uppercase; }
.modul5-2d .hero h1 { font-size: 2.2rem; font-weight: 700; color: #fff; line-height: 1.25; max-width: 700px; margin-bottom: 0.75rem; }
.modul5-2d .hero p { color: var(--hec-muted); font-size: 1.05rem; max-width: 650px; margin-bottom: 1.5rem; }
.modul5-2d .hero-meta { display: flex; gap: 1.5rem; flex-wrap: wrap; }
.modul5-2d .meta-item { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--hec-dim); }
.modul5-2d .meta-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--hec-warning); }

  /* MAIN LAYOUT */
  .container { max-width: 860px; margin: 0 auto; padding: 2.5rem 2rem; }

  /* LEARNING OBJECTIVES */
  .objectives { background: rgba(62,207,142,0.06); border: 1px solid rgba(62,207,142,0.2); border-radius: 12px; padding: 1.5rem; margin-bottom: 2.5rem; }
.modul5-2d .objectives-title { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: var(--hec-warning); margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.5px; }
.modul5-2d .objectives ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.modul5-2d .objectives li { display: flex; align-items: flex-start; gap: 10px; font-size: 14.5px; color: var(--hec-muted); }
.modul5-2d .obj-check { width: 18px; height: 18px; background: rgba(62,207,142,0.15); border: 1px solid rgba(62,207,142,0.4); border-radius: 4px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 10px; color: var(--hec-warning); margin-top: 2px; }

  /* SECTION HEADING */
  .section-heading { display: flex; align-items: center; gap: 12px; margin-bottom: 1.25rem; margin-top: 2.5rem; }
.modul5-2d .section-num { width: 32px; height: 32px; background: rgba(62,207,142,0.15); border: 1px solid rgba(62,207,142,0.3); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: var(--hec-warning); flex-shrink: 0; }
.modul5-2d .section-heading h2 { font-size: 1.3rem; font-weight: 600; color: #fff; letter-spacing: -0.3px; }

  /* DIVIDER */
  .divider { border: none; border-top: 1px solid var(--hec-border); margin: 2rem 0; }

  /* PROSE */
  p { color: var(--hec-muted); margin-bottom: 1rem; font-size: 15.5px; }
.modul5-2d p:last-child { margin-bottom: 0; }
.modul5-2d strong { color: var(--hec-text); font-weight: 600; }
.modul5-2d h3 { font-size: 1.05rem; font-weight: 600; color: var(--hec-text); margin: 1.5rem 0 0.75rem; }
.modul5-2d h4 { font-size: 0.95rem; font-weight: 600; color: var(--hec-muted); margin: 1.25rem 0 0.5rem; }

  /* INFO BOX */
  .info-box { background: rgba(74,158,255,0.06); border: 1px solid rgba(74,158,255,0.2); border-left: 3px solid var(--hec-info); border-radius: 0 8px 8px 0; padding: 1rem 1.25rem; margin: 1.25rem 0; }
.modul5-2d .info-box.warning { background: rgba(244,166,66,0.06); border-color: rgba(244,166,66,0.2); border-left-color: var(--hec-warning); }
.modul5-2d .info-box.success { background: rgba(62,207,142,0.06); border-color: rgba(62,207,142,0.2); border-left-color: var(--hec-success); }
.modul5-2d .info-box.danger { background: rgba(224,90,90,0.06); border-color: rgba(224,90,90,0.2); border-left-color: var(--hec-danger); }
.modul5-2d .info-box-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--hec-info); margin-bottom: 6px; }
.modul5-2d .info-box.warning .info-box-label { color: var(--hec-warning); }
.modul5-2d .info-box.success .info-box-label { color: var(--hec-success); }
.modul5-2d .info-box.danger .info-box-label { color: var(--hec-danger); }
.modul5-2d .info-box p { margin: 0; font-size: 14.5px; }

  /* CARDS GRID */
  .cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin: 1.25rem 0; }
.modul5-2d .card { background: var(--hec-bg-card); border: 1px solid var(--hec-border); border-radius: 10px; padding: 1.1rem 1.2rem; }
.modul5-2d .card-icon { font-size: 1.5rem; margin-bottom: 8px; display: block; }
.modul5-2d .card-title { font-size: 14px; font-weight: 600; color: var(--hec-text); margin-bottom: 4px; }
.modul5-2d .card-desc { font-size: 13px; color: var(--hec-dim); line-height: 1.5; }

  /* STEPS */
  .steps { display: flex; flex-direction: column; gap: 0; margin: 1.25rem 0; }
.modul5-2d .step { display: flex; gap: 16px; position: relative; }
.modul5-2d .step:not(:last-child)::after { content: ''; position: absolute; left: 19px; top: 40px; bottom: 0; width: 2px; background: var(--hec-border); }
.modul5-2d .step-num { width: 38px; height: 38px; background: var(--hec-bg-card2); border: 2px solid var(--hec-border); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: var(--hec-warning); flex-shrink: 0; position: relative; z-index: 1; }
.modul5-2d .step-body { padding-bottom: 1.5rem; flex: 1; }
.modul5-2d .step-title { font-size: 15px; font-weight: 600; color: var(--hec-text); margin-bottom: 6px; padding-top: 7px; }
.modul5-2d .step-desc { font-size: 14.5px; color: var(--hec-muted); }
.modul5-2d .step-desc p { margin-bottom: 6px; font-size: 14.5px; }

  /* LISTS */
  ul.prose-list { margin: 0.75rem 0 1rem 0; padding-left: 0; list-style: none; color: var(--hec-muted); font-size: 15px; }
.modul5-2d ul.prose-list li { margin-bottom: 6px; line-height: 1.6; padding-left: 16px; position: relative; }
.modul5-2d ul.prose-list li::before { content: '•'; color: var(--hec-warning); font-weight: bold; margin-right: 8px; position: absolute; left: 0; }
.modul5-2d ol.prose-list { margin: 0.75rem 0 1rem 0; padding-left: 1.5rem; color: var(--hec-muted); font-size: 15px; }
.modul5-2d ol.prose-list li { margin-bottom: 6px; line-height: 1.6; }

  /* TABLE */
  .file-table { width: 100%; border-collapse: collapse; font-size: 14px; margin: 1.25rem 0; }
.modul5-2d .file-table th { background: var(--hec-bg-card2); color: var(--hec-muted); font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; padding: 10px 14px; text-align: left; border-bottom: 1px solid var(--hec-border); }
.modul5-2d .file-table td { padding: 10px 14px; border-bottom: 1px solid rgba(46,49,73,0.5); color: var(--hec-muted); vertical-align: top; }
.modul5-2d .file-table tr:last-child td { border-bottom: none; }
.modul5-2d .file-table tr:hover td { background: rgba(255,255,255,0.02); }
.modul5-2d .badge { display: inline-block; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 4px; }
.modul5-2d .badge-green { background: rgba(62,207,142,0.15); color: var(--hec-success); }
.modul5-2d .badge-blue { background: rgba(74,158,255,0.15); color: var(--hec-info); }
.modul5-2d .badge-yellow { background: rgba(244,166,66,0.15); color: var(--hec-warning); }
.modul5-2d .badge-red { background: rgba(224,90,90,0.15); color: var(--hec-danger); }

  /* CODE */
  .file-ext { font-family: 'Courier New', monospace; background: var(--hec-code-bg); color: var(--hec-warning); padding: 2px 8px; border-radius: 4px; font-size: 13px; white-space: nowrap; }
.modul5-2d .code-block { background: var(--hec-code-bg); border: 1px solid var(--hec-border); border-radius: 8px; padding: 1rem 1.25rem; font-family: 'Courier New', monospace; font-size: 13.5px; color: #a8b4ff; margin: 0.75rem 0; overflow-x: auto; line-height: 1.8; }
.modul5-2d .code-comment { color: var(--hec-dim); font-style: italic; }
.modul5-2d .code-key { color: var(--hec-warning); }

  /* FORMULA */
  .formula-box { background: var(--hec-bg-card2); border: 1px solid var(--hec-border); border-radius: 10px; padding: 1.25rem 1.5rem; margin: 1.25rem 0; }
.modul5-2d .formula { font-family: 'Courier New', monospace; font-size: 1.05rem; color: var(--hec-warning); text-align: center; font-weight: 600; letter-spacing: 0.5px; margin-bottom: 0.75rem; }
.modul5-2d .formula-vars { display: flex; flex-wrap: wrap; gap: 6px 16px; margin-top: 10px; }
.modul5-2d .formula-var { font-size: 13px; color: var(--hec-dim); }

  /* COMPARISON CARDS */
  .compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 1.25rem 0; }
.modul5-2d .compare-card { background: var(--hec-bg-card); border: 1px solid var(--hec-border); border-radius: 10px; padding: 1.25rem; }
.modul5-2d .compare-card.accent-green { border-color: rgba(62,207,142,0.3); background: rgba(62,207,142,0.04); }
.modul5-2d .compare-card.accent-blue { border-color: rgba(74,158,255,0.3); background: rgba(74,158,255,0.04); }
.modul5-2d .compare-header { display: flex; align-items: center; gap: 8px; margin-bottom: 0.75rem; }
.modul5-2d .compare-icon { font-size: 1.3rem; }
.modul5-2d .compare-title { font-size: 14px; font-weight: 700; color: var(--hec-text); }
.modul5-2d .compare-badge { font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 4px; margin-left: auto; }
.modul5-2d .compare-card.accent-green .compare-badge { background: rgba(62,207,142,0.15); color: var(--hec-success); }
.modul5-2d .compare-card.accent-blue .compare-badge { background: rgba(74,158,255,0.15); color: var(--hec-info); }
.modul5-2d .compare-list { list-style: none; display: flex; flex-direction: column; gap: 5px; }
.modul5-2d .compare-list li { font-size: 13px; color: var(--hec-dim); padding-left: 14px; position: relative; line-height: 1.5; }
.modul5-2d .compare-card.accent-green .compare-list li::before { content: '✓'; position: absolute; left: 0; color: var(--hec-success); font-size: 11px; top: 1px; }
.modul5-2d .compare-card.accent-blue .compare-list li::before { content: '✓'; position: absolute; left: 0; color: var(--hec-info); font-size: 11px; top: 1px; }

  /* DECISION BOX */
  .decision-box { background: var(--hec-bg-card); border: 1px solid var(--hec-border); border-radius: 10px; overflow: hidden; margin: 1.25rem 0; }
.modul5-2d .decision-header { background: var(--hec-bg-card2); padding: 0.75rem 1.25rem; border-bottom: 1px solid var(--hec-border); font-size: 13px; font-weight: 600; color: var(--hec-muted); text-transform: uppercase; letter-spacing: 0.5px; }
.modul5-2d .decision-row { display: flex; align-items: flex-start; gap: 0; border-bottom: 1px solid rgba(46,49,73,0.4); }
.modul5-2d .decision-row:last-child { border-bottom: none; }
.modul5-2d .decision-cond { flex: 0 0 50%; padding: 10px 14px; font-size: 14px; color: var(--hec-muted); border-right: 1px solid var(--hec-border); }
.modul5-2d .decision-result { flex: 0 0 50%; padding: 10px 14px; font-size: 14px; font-weight: 600; }
.modul5-2d .decision-result.use-1d { color: var(--hec-info); }
.modul5-2d .decision-result.use-2d { color: var(--hec-warning); }
.modul5-2d .decision-result.either { color: var(--hec-warning); }

  /* MESH VISUAL */
  .mesh-visual { background: var(--hec-bg-card2); border: 1px solid var(--hec-border); border-radius: 10px; padding: 1.5rem; margin: 1.25rem 0; text-align: center; }
.modul5-2d .mesh-svg-label { font-size: 12px; color: var(--hec-dim); margin-top: 10px; }

  /* PARAM GRID */
  .param-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 1rem 0; }
.modul5-2d .param-item { background: var(--hec-bg-card); border: 1px solid var(--hec-border); border-radius: 8px; padding: 0.85rem; }
.modul5-2d .param-name { font-size: 13px; font-weight: 600; color: var(--hec-text); margin-bottom: 4px; }
.modul5-2d .param-val { font-size: 13px; color: var(--hec-dim); }
.modul5-2d .param-val strong { color: var(--hec-warning); }

  /* TABS */
  .tabs { margin: 1.25rem 0; }
.modul5-2d .tab-buttons { display: flex; gap: 4px; border-bottom: 1px solid var(--hec-border); margin-bottom: 0; }
.modul5-2d .tab-btn { background: none; border: none; padding: 8px 16px; font-size: 13.5px; font-weight: 600; color: var(--hec-dim); cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all 0.2s; font-family: inherit; }
.modul5-2d .tab-btn.active { color: var(--hec-warning); border-bottom-color: var(--hec-warning); }
.modul5-2d .tab-btn:hover:not(.active) { color: var(--hec-muted); }
.modul5-2d .tab-content { display: none; background: var(--hec-bg-card); border: 1px solid var(--hec-border); border-top: none; border-radius: 0 0 10px 10px; padding: 1.25rem; }
.modul5-2d .tab-content.active { display: block; }

  /* TROUBLESHOOT */
  .trouble-row { display: flex; gap: 0; border: 1px solid var(--hec-border); border-radius: 8px; overflow: hidden; margin-bottom: 8px; }
.modul5-2d .trouble-problem { flex: 0 0 45%; padding: 10px 14px; background: rgba(224,90,90,0.05); border-right: 1px solid var(--hec-border); }
.modul5-2d .trouble-icon { font-size: 1rem; margin-bottom: 4px; }
.modul5-2d .trouble-title { font-size: 13.5px; font-weight: 600; color: var(--hec-danger); }
.modul5-2d .trouble-solution { flex: 1; padding: 10px 14px; background: rgba(62,207,142,0.04); }
.modul5-2d .trouble-solution-title { font-size: 13.5px; font-weight: 600; color: var(--hec-success); margin-bottom: 4px; }
.modul5-2d .trouble-solution-text { font-size: 13px; color: var(--hec-dim); line-height: 1.5; }

  /* SUMMARY & NEXT */
  .summary-box { background: rgba(62,207,142,0.06); border: 1px solid rgba(62,207,142,0.2); border-radius: 12px; padding: 1.5rem; margin-top: 2.5rem; }
.modul5-2d .summary-title { font-size: 14px; font-weight: 600; color: var(--hec-warning); margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.5px; }
.modul5-2d .summary-list { list-style: none; display: flex; flex-direction: column; gap: 6px; }
.modul5-2d .summary-list li { font-size: 14.5px; color: var(--hec-muted); padding-left: 16px; position: relative; }
.modul5-2d .summary-list li::before { content: '→'; position: absolute; left: 0; color: var(--hec-warning); font-size: 12px; top: 1px; }
.modul5-2d .next-module { background: var(--hec-bg-card); border: 1px solid var(--hec-border); border-radius: 12px; padding: 1.25rem 1.5rem; margin-top: 1.5rem; display: flex; align-items: center; justify-content: space-between; text-decoration: none; }
.modul5-2d .next-module:hover { border-color: rgba(62,207,142,0.3); background: rgba(62,207,142,0.04); }
.modul5-2d .next-label { font-size: 12px; color: var(--hec-dim); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
.modul5-2d .next-title { font-size: 15px; font-weight: 600; color: var(--hec-text); }
.modul5-2d .next-arrow { font-size: 1.5rem; color: var(--hec-warning); }
.modul5-2d .prev-module { background: var(--hec-bg-card); border: 1px solid var(--hec-border); border-radius: 12px; padding: 1rem 1.5rem; margin-top: 1rem; display: flex; align-items: center; gap: 12px; text-decoration: none; }
.modul5-2d .prev-module:hover { border-color: rgba(62,207,142,0.2); }
.modul5-2d .prev-label { font-size: 12px; color: var(--hec-dim); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
.modul5-2d .prev-title { font-size: 14px; font-weight: 500; color: var(--hec-muted); }
.modul5-2d .footnote { font-size: 12.5px; color: var(--hec-dim); border-top: 1px solid var(--hec-border); margin-top: 3rem; padding-top: 1rem; }

  /* MESH SIZE GUIDE */
  .mesh-guide { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 1.25rem 0; }
.modul5-2d .mesh-card { background: var(--hec-bg-card); border: 1px solid var(--hec-border); border-radius: 8px; padding: 1rem; text-align: center; }
.modul5-2d .mesh-card-size { font-size: 1.4rem; font-weight: 700; color: var(--hec-warning); margin-bottom: 4px; font-family: 'Courier New', monospace; }
.modul5-2d .mesh-card-label { font-size: 12px; color: var(--hec-dim); margin-bottom: 6px; }
.modul5-2d .mesh-card-desc { font-size: 12px; color: var(--hec-muted); line-height: 1.4; }

  /* COURANT VISUAL */
  .courant-box { background: var(--hec-bg-card2); border: 1px solid var(--hec-border); border-radius: 10px; padding: 1.25rem; margin: 1.25rem 0; }
.modul5-2d .courant-title { font-size: 12px; font-weight: 700; color: var(--hec-dim); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
.modul5-2d .courant-bar-wrap { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
.modul5-2d .courant-label { font-size: 13px; color: var(--hec-muted); width: 80px; flex-shrink: 0; }
.modul5-2d .courant-bar { flex: 1; height: 8px; border-radius: 4px; background: var(--hec-bg-card); overflow: hidden; }
.modul5-2d .courant-fill { height: 100%; border-radius: 4px; }
.modul5-2d .courant-val { font-size: 13px; font-weight: 600; width: 60px; flex-shrink: 0; }
.modul5-2d .fill-ideal { background: var(--hec-success); width: 40%; }
.modul5-2d .fill-warning { background: var(--hec-warning); width: 75%; }
.modul5-2d .fill-unstable { background: var(--hec-danger); width: 100%; }
.modul5-2d .c-ideal { color: var(--hec-success); }
.modul5-2d .c-warning { color: var(--hec-warning); }
.modul5-2d .c-unstable { color: var(--hec-danger); }

  @media (max-width: 640px)  {

    .hero h1 { font-size: 1.6rem; }
.modul5-2d .compare-grid { grid-template-columns: 1fr; }
.modul5-2d .param-grid { grid-template-columns: 1fr; }
.modul5-2d .mesh-guide { grid-template-columns: 1fr; }
.modul5-2d .decision-cond, .modul5-2d .decision-result { flex: 0 0 50%; }
.modul5-2d .trouble-row { flex-direction: column; }
.modul5-2d .trouble-problem, .modul5-2d .trouble-solution { flex: none; }
  
}

.modul5-2d { box-sizing:border-box; width:100%; overflow-x:hidden; }
.modul5-2d * { box-sizing:border-box; }
</style>
<div class="modul5-2d">
<!-- LEARNING OBJECTIVES -->
  <div class="objectives">
    <div class="objectives-title">🎯 Tujuan Pembelajaran</div>
    <ul>
      <li><div class="obj-check">✓</div>Memahami kapan pemodelan 2D lebih tepat dibanding 1D</li>
      <li><div class="obj-check">✓</div>Mengenal konsep mesh, computational cells, dan dual grid pada HEC-RAS 2D</li>
      <li><div class="obj-check">✓</div>Mampu membuat dan memperhalus mesh 2D Flow Area di HEC-RAS</li>
      <li><div class="obj-check">✓</div>Memahami perbedaan Shallow Water Equations (SWE) vs Diffusion Wave Equations (DWE)</li>
      <li><div class="obj-check">✓</div>Mampu menetapkan kondisi batas dan menjalankan simulasi 2D</li>
      <li><div class="obj-check">✓</div>Mampu membangun model hybrid 1D-2D untuk sistem sungai + dataran banjir</li>
      <li><div class="obj-check">✓</div>Menghasilkan peta genangan (depth, velocity, WSE) dari RAS Mapper dan mengekspornya ke QGIS</li>
    </ul>
  </div>

  <!-- SECTION 1: 1D VS 2D -->
  <div class="section-heading">
    <div class="section-num">1</div>
    <h2>Kapan Pakai 2D? Kapan Cukup 1D?</h2>
  </div>

  <p>Pertanyaan pertama sebelum memulai model 2D adalah: <strong>apakah memang perlu?</strong> Pemodelan 2D membutuhkan data, waktu setup, dan waktu komputasi yang jauh lebih besar. Pilih 2D hanya jika kondisi berikut terpenuhi.</p>

  <div class="decision-box">
    <div class="decision-header">Panduan Pemilihan: Lihat kondisi lapangan Anda</div>
    <div class="decision-row">
      <div class="decision-cond">Sungai terkanalisis, aliran jelas satu arah mengikuti sumbu sungai</div>
      <div class="decision-result use-1d">→ Pakai 1D (lebih cepat, sudah cukup)</div>
    </div>
    <div class="decision-row">
      <div class="decision-cond">Dataran banjir luas, aliran menyebar ke segala arah setelah meluap</div>
      <div class="decision-result use-2d">→ Pakai 2D</div>
    </div>
    <div class="decision-row">
      <div class="decision-cond">Studi pre-feasibility, banyak skenario dibutuhkan, akurasi 2D tidak kritis</div>
      <div class="decision-result use-1d">→ Pakai 1D (efisiensi waktu)</div>
    </div>
    <div class="decision-row">
      <div class="decision-cond">Dam break, levee breach — gelombang banjir menyebar ke dataran luas</div>
      <div class="decision-result use-2d">→ Pakai 2D</div>
    </div>
    <div class="decision-row">
      <div class="decision-cond">Banjir perkotaan dengan jaringan jalan dan bangunan kompleks</div>
      <div class="decision-result use-2d">→ Pakai 2D</div>
    </div>
    <div class="decision-row">
      <div class="decision-cond">Muara sungai, delta, wilayah pesisir — pasang surut + banjir</div>
      <div class="decision-result use-2d">→ Pakai 2D</div>
    </div>
    <div class="decision-row">
      <div class="decision-cond">Sungai dengan dataran banjir terbatas, perlu flood routing akurat</div>
      <div class="decision-result either">→ Hybrid 1D-2D (terbaik)</div>
    </div>
  </div>

  <div class="compare-grid">
    <div class="compare-card accent-blue">
      <div class="compare-header">
        <span class="compare-icon">📏</span>
        <span class="compare-title">1D Unsteady</span>
        <span class="compare-badge">Cepat</span>
      </div>
      <ul class="compare-list">
        <li>Aliran terkanalisis 1 arah</li>
        <li>Setup dan komputasi cepat</li>
        <li>Banyak skenario dalam satu run</li>
        <li>Cross section sebagai geometri</li>
        <li>Output: hidrograf di tiap XS</li>
      </ul>
    </div>
    <div class="compare-card accent-green">
      <div class="compare-header">
        <span class="compare-icon">🗺️</span>
        <span class="compare-title">2D Unsteady</span>
        <span class="compare-badge">Akurat</span>
      </div>
      <ul class="compare-list">
        <li>Aliran menyebar ke x dan y</li>
        <li>Distribusi kecepatan 2D</li>
        <li>Peta genangan detail</li>
        <li>Mesh sebagai geometri</li>
        <li>Output: grid depth, velocity, WSE</li>
      </ul>
    </div>
  </div>

  <hr class="divider">

  <!-- SECTION 2: KONSEP MESH -->
  <div class="section-heading">
    <div class="section-num">2</div>
    <h2>Konsep Dasar: Mesh, Sel, dan Dual Grid</h2>
  </div>

  <p>Di HEC-RAS 2D, domain komputasi dibagi menjadi <strong>ratusan hingga ribuan sel (cells)</strong> yang membentuk mesh. Setiap sel mewakili sebidang wilayah di atas terrain DEM. Pahami tiga komponen utama ini:</p>

  <div class="cards-grid">
    <div class="card">
      <span class="card-icon">⬡</span>
      <div class="card-title">Computational Cells</div>
      <div class="card-desc">Polygon yang membentuk mesh. Setiap sel menyimpan nilai <em>rata-rata</em> elevasi muka air (H) dan volume air. HEC-RAS mendukung sel segiempat maupun poligon tidak beraturan.</div>
    </div>
    <div class="card">
      <span class="card-icon">━</span>
      <div class="card-title">Cell Faces</div>
      <div class="card-desc">Tepi/sisi antar sel, tempat di mana aliran Q dan kecepatan V dihitung. Setiap face memiliki panjang, orientasi, dan ketinggian ambang tersendiri.</div>
    </div>
    <div class="card">
      <span class="card-icon">⊞</span>
      <div class="card-title">Dual Grid System</div>
      <div class="card-desc">HEC-RAS menggunakan <em>dual grid</em>: muka air dihitung di pusat sel, kecepatan dihitung di pusat face. Kombinasi ini meningkatkan stabilitas numerik secara signifikan.</div>
    </div>
    <div class="card">
      <span class="card-icon">📊</span>
      <div class="card-title">Hydraulic Property Tables</div>
      <div class="card-desc">Untuk tiap sel, HEC-RAS pra-hitung tabel hubungan elevasi vs. volume, luas, dan lebar muka air. Ini di-preprocessing sekali dan disimpan di file geometri.</div>
    </div>
  </div>

  <!-- Mesh SVG Illustration -->
  <div class="mesh-visual">
    <svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" style="max-width:500px;width:100%;">
      <defs>
        <pattern id="meshpat" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="#1a1d27" stroke="#2e3149" stroke-width="1"/>
        </pattern>
      </defs>
      <!-- Domain -->
      <rect x="20" y="20" width="480" height="180" fill="url(#meshpat)" rx="4"/>

      <!-- Refinement zone (smaller cells) near river -->
      <g transform="translate(180,60)">
        <rect width="160" height="100" fill="#0a1f15" stroke="#3ecf8e" stroke-width="1.5" rx="2"/>
        <!-- small cells inside -->
        <line x1="20" y1="0" x2="20" y2="100" stroke="#3ecf8e" stroke-width="0.6" stroke-opacity="0.5"/>
        <line x1="40" y1="0" x2="40" y2="100" stroke="#3ecf8e" stroke-width="0.6" stroke-opacity="0.5"/>
        <line x1="60" y1="0" x2="60" y2="100" stroke="#3ecf8e" stroke-width="0.6" stroke-opacity="0.5"/>
        <line x1="80" y1="0" x2="80" y2="100" stroke="#3ecf8e" stroke-width="0.6" stroke-opacity="0.5"/>
        <line x1="100" y1="0" x2="100" y2="100" stroke="#3ecf8e" stroke-width="0.6" stroke-opacity="0.5"/>
        <line x1="120" y1="0" x2="120" y2="100" stroke="#3ecf8e" stroke-width="0.6" stroke-opacity="0.5"/>
        <line x1="140" y1="0" x2="140" y2="100" stroke="#3ecf8e" stroke-width="0.6" stroke-opacity="0.5"/>
        <line x1="0" y1="25" x2="160" y2="25" stroke="#3ecf8e" stroke-width="0.6" stroke-opacity="0.5"/>
        <line x1="0" y1="50" x2="160" y2="50" stroke="#3ecf8e" stroke-width="0.6" stroke-opacity="0.5"/>
        <line x1="0" y1="75" x2="160" y2="75" stroke="#3ecf8e" stroke-width="0.6" stroke-opacity="0.5"/>
        <!-- river channel -->
        <rect x="60" y="30" width="40" height="40" fill="rgba(74,158,255,0.25)" rx="2"/>
        <text x="80" y="52" text-anchor="middle" fill="#4a9eff" font-size="8" font-weight="600">CH</text>
      </g>

      <!-- Labels -->
      <text x="55" y="40" fill="#5a6080" font-size="10">Dataran banjir</text>
      <text x="55" y="52" fill="#5a6080" font-size="10">(sel besar ~100m)</text>
      <text x="210" y="56" fill="#3ecf8e" font-size="9" font-weight="600">Refinement Zone</text>
      <text x="210" y="67" fill="#5a6080" font-size="9">(sel kecil ~10-20m)</text>

      <!-- Flow arrows -->
      <path d="M30,110 L165,110" stroke="#4a9eff" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr)"/>
      <path d="M360,110 L480,110" stroke="#4a9eff" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr)"/>
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#4a9eff"/>
        </marker>
      </defs>
      <text x="80" y="125" fill="#4a9eff" font-size="9">Hulu →</text>
      <text x="390" y="125" fill="#4a9eff" font-size="9">→ Hilir</text>

      <!-- Legend -->
      <rect x="20" y="175" width="12" height="8" fill="#3ecf8e" rx="1"/>
      <text x="36" y="183" fill="#8e94b5" font-size="9">Refinement (sel halus)</text>
      <rect x="180" y="175" width="12" height="8" fill="rgba(74,158,255,0.3)" rx="1"/>
      <text x="196" y="183" fill="#8e94b5" font-size="9">Channel utama</text>
      <rect x="330" y="175" width="12" height="8" fill="#1a1d27" stroke="#2e3149" rx="1"/>
      <text x="346" y="183" fill="#8e94b5" font-size="9">Floodplain (sel kasar)</text>
    </svg>
    <div class="mesh-svg-label">Ilustrasi: mesh 2D dengan refinement zone di sekitar saluran utama</div>
  </div>

  <hr class="divider">

  <!-- SECTION 3: PERSAMAAN NUMERIK -->
  <div class="section-heading">
    <div class="section-num">3</div>
    <h2>SWE vs DWE — Pilih Persamaan yang Tepat</h2>
  </div>

  <p>HEC-RAS 2D menyediakan dua pilihan persamaan hidrolika. Pilihan ini <strong>sangat mempengaruhi</strong> akurasi, kestabilan, dan kecepatan komputasi.</p>

  <!-- TABS -->
  <div class="tabs">
    <div class="tab-buttons">
      <button class="tab-btn active" onclick="showTab(this,'swe')">Shallow Water Equations (SWE)</button>
      <button class="tab-btn" onclick="showTab(this,'dwe')">Diffusion Wave Equations (DWE)</button>
    </div>
    <div class="tab-content active" id="tab-swe">
      <p style="margin-bottom:1rem;"><strong>Full Shallow Water Equations</strong> — menyelesaikan persamaan Saint-Venant 2D secara penuh, termasuk term inersia (percepatan aliran).</p>
      <div class="formula-box">
        <div class="formula">∂h/∂t + ∂(hu)/∂x + ∂(hv)/∂y = 0 &nbsp;&nbsp;[Kontinuitas]</div>
        <div class="formula" style="margin-top:10px;">∂(hu)/∂t + ∂(hu²+gh²/2)/∂x + ∂(huv)/∂y = gh(S₀ₓ − Sfₓ) &nbsp;&nbsp;[Momentum-x]</div>
        <div class="formula-vars">
          <span class="formula-var">h = kedalaman air (m)</span>
          <span class="formula-var">u, v = kecepatan arah x dan y (m/s)</span>
          <span class="formula-var">g = gravitasi (m/s²)</span>
          <span class="formula-var">S₀ = kemiringan dasar</span>
          <span class="formula-var">Sf = kemiringan energi (gesekan)</span>
        </div>
      </div>
      <p><strong>Gunakan SWE untuk:</strong> dam break, aliran sangat cepat (Fr > 0.5), analisis di mana efek inersia signifikan, atau studi yang memerlukan presisi tinggi terhadap front gelombang banjir.</p>
      <div class="info-box warning">
        <div class="info-box-label">⚠️ Perhatian</div>
        <p>SWE memerlukan time step lebih kecil (Courant condition lebih ketat) dan komputasi lebih lambat. Bisa 3–5× lebih lama dari DWE untuk mesh yang sama.</p>
      </div>
    </div>
    <div class="tab-content" id="tab-dwe">
      <p style="margin-bottom:1rem;"><strong>Diffusion Wave Equations</strong> — aproksimasi SWE dengan mengabaikan term inersia lokal dan konvektif. Lebih sederhana dan stabil.</p>
      <div class="formula-box">
        <div class="formula">∂h/∂t + ∂(hu)/∂x + ∂(hv)/∂y = 0 &nbsp;&nbsp;[Kontinuitas — sama]</div>
        <div class="formula" style="margin-top:10px;">gh(∂h/∂x + Sfₓ − S₀ₓ) = 0 &nbsp;&nbsp;[Momentum — tanpa term inersia]</div>
        <div class="formula-vars">
          <span class="formula-var">Term inersia (∂u/∂t, u∂u/∂x) diabaikan</span>
          <span class="formula-var">Aliran diasumsikan berubah perlahan</span>
          <span class="formula-var">Cocok untuk banjir dataran rendah</span>
        </div>
      </div>
      <p><strong>Gunakan DWE untuk:</strong> banjir dataran banjir/floodplain yang luas, aliran lambat (Fr &lt; 0.5), banjir perkotaan gradual, analisis ketersediaan air. Ini adalah <strong>pilihan default</strong> yang direkomendasikan untuk sebagian besar proyek hidrologi Indonesia.</p>
      <div class="info-box success">
        <div class="info-box-label">✅ Rekomendasi</div>
        <p>Mulai selalu dengan DWE. Beralih ke SWE hanya jika Anda mendapat hasil yang mencurigakan di daerah dengan aliran cepat, atau jika proyek secara eksplisit memerlukan full momentum (dam break, tidal flow).</p>
      </div>
    </div>
  </div>

  <hr class="divider">

  <!-- SECTION 4: SETUP 2D FLOW AREA -->
  <div class="section-heading">
    <div class="section-num">4</div>
    <h2>Langkah-langkah Setup 2D Flow Area</h2>
  </div>

  <p>Berikut alur kerja lengkap dari membuka HEC-RAS hingga mesh siap dijalankan. Pastikan Anda sudah memiliki <strong>terrain DEM yang siap</strong> (dibahas di Modul 2).</p>

  <div class="steps">
    <div class="step">
      <div class="step-num">1</div>
      <div class="step-body">
        <div class="step-title">Buka Geometric Data Editor & Buat 2D Flow Area</div>
        <div class="step-desc">
          <p>Di Main Window: <strong>Edit → Geometric Data</strong>. Di toolbar kiri, klik ikon <strong>"2D Flow Area"</strong> (ikon persegi dengan titik-titik). Gambar polygon yang mencakup seluruh area yang akan dimodelkan 2D — termasuk seluruh dataran banjir yang mungkin tergenang, bukan hanya area sungai.</p>
          <div class="info-box warning">
            <div class="info-box-label">⚠️ Aturan Penting</div>
            <p>Polygon 2D Flow Area harus <strong>tertutup sempurna</strong>. Klik dua kali untuk mengakhiri penggambaran. Polygon yang tidak tertutup akan menyebabkan error saat preprocessing mesh.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">2</div>
      <div class="step-body">
        <div class="step-title">Generate Mesh</div>
        <div class="step-desc">
          <p>Klik kanan pada polygon 2D Flow Area → <strong>"Generate Computation Points in Region"</strong>. Tentukan <strong>Default Cell Size</strong> (ukuran sel default dalam meter).</p>
          <div class="mesh-guide">
            <div class="mesh-card">
              <div class="mesh-card-size">500m</div>
              <div class="mesh-card-label">Area sangat luas</div>
              <div class="mesh-card-desc">DAS besar > 500 km², analisis regional, pra-studi</div>
            </div>
            <div class="mesh-card">
              <div class="mesh-card-size">50–100m</div>
              <div class="mesh-card-label">Area sedang</div>
              <div class="mesh-card-desc">Dataran banjir 10–100 km², studi detail normal</div>
            </div>
            <div class="mesh-card">
              <div class="mesh-card-size">10–30m</div>
              <div class="mesh-card-label">Area kecil / kota</div>
              <div class="mesh-card-desc">Banjir perkotaan, DEM LiDAR tersedia, analisis mikro</div>
            </div>
          </div>
          <p style="margin-top:0.5rem;">Ukuran sel tidak boleh lebih kecil dari resolusi DEM — hasilnya tidak akan lebih akurat, hanya lebih lambat.</p>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">3</div>
      <div class="step-body">
        <div class="step-title">Tambahkan Breaklines</div>
        <div class="step-desc">
          <p>Breaklines memastikan mesh mengikuti penghalang aliran nyata di lapangan. Ini sangat kritis untuk akurasi model:</p>
          <ul class="prose-list">
            <li><strong>Tanggul (levee):</strong> sel mesh harus mengikuti puncak tanggul agar tidak ada aliran yang "bocor" melintasi tanggul</li>
            <li><strong>Jalan raya / rel kereta:</strong> berfungsi sebagai hambatan aliran di perkotaan</li>
            <li><strong>Tepi sungai (bank):</strong> memisahkan zona dalam saluran dan dataran banjir</li>
          </ul>
          <p>Cara menambahkan: di Geometric Data Editor → klik ikon "Breaklines" → digitasi garis di atas polygon 2D Flow Area → klik kanan pada Breakline → <strong>"Enforce Breaklines on Mesh"</strong> → Regenerate mesh.</p>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">4</div>
      <div class="step-body">
        <div class="step-title">Refinement Regions (Opsional tapi Direkomendasikan)</div>
        <div class="step-desc">
          <p>Untuk memperhalus mesh di area kritis tanpa memperkecil semua sel: <strong>Edit → 2D Flow Area → Add Refinement Region</strong>. Gambar polygon di area yang perlu sel lebih kecil (sekitar saluran utama, jembatan, area kota padat).</p>
          <div class="info-box">
            <div class="info-box-label">💡 Strategi Refinement</div>
            <p>Gunakan refinement secara strategis. Sel 50% lebih kecil di seluruh domain = jumlah sel 4× lebih banyak = waktu komputasi 4× lebih lama. Lebih baik: refinement hanya di 10–20% area yang paling kritis.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">5</div>
      <div class="step-body">
        <div class="step-title">Hubungkan Terrain di RAS Mapper</div>
        <div class="step-desc">
          <p>Di <strong>RAS Mapper</strong>: klik kanan pada "Terrains" → <strong>"Add New Terrain"</strong> → pilih file DEM (GeoTIFF). Kemudian kembali ke Geometric Data Editor: klik kanan pada 2D Flow Area → <strong>"Set Terrain"</strong>. HEC-RAS akan menghitung hydraulic property tables untuk setiap sel.</p>
          <div class="info-box warning">
            <div class="info-box-label">⚠️ Penting</div>
            <p>Setiap kali DEM diubah atau mesh dimodifikasi, klik kanan → <strong>"Compute Cell and Face Hydraulic Properties"</strong> untuk meregenerasi tabel. Melewati langkah ini menyebabkan hasil simulasi yang salah.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">6</div>
      <div class="step-body">
        <div class="step-title">Manning's n untuk 2D Area</div>
        <div class="step-desc">
          <p>Ada dua cara menetapkan Manning's n pada area 2D:</p>
          <ul class="prose-list">
            <li><strong>Nilai konstan per-region:</strong> klik kanan pada 2D Flow Area → "Set Manning's n" → input nilai tunggal untuk seluruh area. Sederhana tapi tidak akurat untuk variasi penggunaan lahan.</li>
            <li><strong>Land Cover Raster (direkomendasikan):</strong> buat raster penggunaan lahan dengan nilai n di tiap piksel → load di RAS Mapper sebagai "Land Cover" layer → assign ke geometri. Cara ini menghasilkan distribusi n yang realistis secara spasial.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <hr class="divider">

  <!-- SECTION 5: KONDISI BATAS 2D -->
  <div class="section-heading">
    <div class="section-num">5</div>
    <h2>Kondisi Batas untuk Model 2D</h2>
  </div>

  <p>Kondisi batas (boundary conditions) pada model 2D didefinisikan di <strong>tepi polygon</strong> 2D Flow Area, bukan di cross section seperti model 1D. Di Unsteady Flow Data Editor: pilih tab "Boundary Conditions".</p>

  <table class="file-table">
    <thead>
      <tr>
        <th>Tipe</th>
        <th>Posisi</th>
        <th>Data yang Dibutuhkan</th>
        <th>Kapan Digunakan</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Flow Hydrograph</strong></td>
        <td>Tepi hulu</td>
        <td>Hidrograf Q(t) dari HEC-HMS</td>
        <td>Input debit masuk dari DAS</td>
      </tr>
      <tr>
        <td><strong>Stage Hydrograph</strong></td>
        <td>Hulu atau hilir</td>
        <td>Time-series elevasi muka air H(t)</td>
        <td>Jika ada data pos duga air (AWLR)</td>
      </tr>
      <tr>
        <td><strong>Normal Depth</strong></td>
        <td>Tepi hilir</td>
        <td>Slope energi (S)</td>
        <td>Tidak ada data hilir; gunakan S₀ dasar sungai</td>
      </tr>
      <tr>
        <td><strong>Rating Curve</strong></td>
        <td>Tepi hilir</td>
        <td>Kurva Q-H observasi</td>
        <td>Ada data stasiun pengukuran di hilir</td>
      </tr>
      <tr>
        <td><strong>Precipitation</strong></td>
        <td>Seluruh domain</td>
        <td>Data hujan spasial (grid atau titik)</td>
        <td>Banjir urban — hujan langsung jatuh ke 2D area</td>
      </tr>
    </tbody>
  </table>

  <div class="info-box">
    <div class="info-box-label">💡 Cara Menambahkan Boundary</div>
    <p>Di Geometric Data Editor: klik ikon "SA/2D Connection" di toolbar → pilih "Add SA/2D Area Boundary" → klik pada tepi polygon yang ingin dijadikan boundary → beri nama. Kemudian di Unsteady Flow Data Editor, boundary tersebut akan muncul untuk diisi tipe dan data-nya.</p>
  </div>

  <hr class="divider">

  <!-- SECTION 6: PENGATURAN SIMULASI -->
  <div class="section-heading">
    <div class="section-num">6</div>
    <h2>Pengaturan Simulasi 2D: Time Step & Courant</h2>
  </div>

  <p>Kestabilan simulasi 2D sangat bergantung pada pemilihan <strong>computational time step (Δt)</strong> yang tepat. Terlalu besar → tidak stabil. Terlalu kecil → lama tanpa perlu.</p>

  <h3>Syarat Courant</h3>
  <p>Syarat stabilitas numerik untuk 2D (Courant-Friedrichs-Lewy / CFL condition):</p>

  <div class="formula-box">
    <div class="formula">Cr = (V + c) · Δt / Δx ≤ 1.0</div>
    <div class="formula-vars">
      <span class="formula-var">Cr = Courant number</span>
      <span class="formula-var">V = kecepatan aliran (m/s)</span>
      <span class="formula-var">c = celeritas gelombang = √(g·h) (m/s)</span>
      <span class="formula-var">Δt = time step (s)</span>
      <span class="formula-var">Δx = ukuran sel (m)</span>
    </div>
  </div>

  <div class="courant-box">
    <div class="courant-title">Interpretasi Courant Number</div>
    <div class="courant-bar-wrap">
      <div class="courant-label">Ideal</div>
      <div class="courant-bar"><div class="courant-fill fill-ideal"></div></div>
      <div class="courant-val c-ideal">Cr &lt; 0.5</div>
    </div>
    <div class="courant-bar-wrap">
      <div class="courant-label">Masih OK</div>
      <div class="courant-bar"><div class="courant-fill fill-warning"></div></div>
      <div class="courant-val c-warning">0.5–1.0</div>
    </div>
    <div class="courant-bar-wrap">
      <div class="courant-label">Tidak stabil</div>
      <div class="courant-bar"><div class="courant-fill fill-unstable"></div></div>
      <div class="courant-val c-unstable">Cr &gt; 1.0</div>
    </div>
  </div>

  <h3>Adaptive Time Stepping (Direkomendasikan)</h3>
  <p>HEC-RAS 2D memiliki fitur <strong>Adaptive Time Stepping</strong> yang secara otomatis menyesuaikan Δt berdasarkan kondisi aliran aktual — memperbesar Δt saat aliran tenang, memperkecil saat aliran berubah cepat. Aktifkan di:</p>
  <div class="code-block">
    Run → Unsteady Flow Analysis → Options → <span class="code-key">Use Adaptive Time Stepping</span><br>
    <span class="code-comment">Set: Max dt = 30 min, Min dt = 1 min, Target Courant = 0.8</span>
  </div>

  <div class="param-grid">
    <div class="param-item">
      <div class="param-name">Mapping Output Interval</div>
      <div class="param-val">Setiap <strong>15–60 menit</strong> — untuk animasi peta genangan</div>
    </div>
    <div class="param-item">
      <div class="param-name">Hydrograph Output Interval</div>
      <div class="param-val">Setiap <strong>5–15 menit</strong> — untuk hidrograf di titik kontrol</div>
    </div>
    <div class="param-item">
      <div class="param-name">Pilihan Persamaan</div>
      <div class="param-val">Default: <strong>DWE</strong>. Ganti ke SWE hanya jika perlu</div>
    </div>
    <div class="param-item">
      <div class="param-name">Initial Conditions</div>
      <div class="param-val">Gunakan <strong>Steady Flow Warmup</strong> — jalankan steady flow kecil selama 1–6 jam pertama</div>
    </div>
  </div>

  <hr class="divider">

  <!-- SECTION 7: HYBRID 1D-2D -->
  <div class="section-heading">
    <div class="section-num">7</div>
    <h2>Model Hybrid 1D–2D: Yang Terbaik dari Keduanya</h2>
  </div>

  <p>Untuk sebagian besar proyek sungai di Indonesia, model <strong>hybrid 1D-2D</strong> adalah pendekatan paling optimal: saluran sungai dimodelkan 1D (efisien), dataran banjir dimodelkan 2D (akurat).</p>

  <div class="compare-grid">
    <div class="compare-card accent-blue">
      <div class="compare-header">
        <span class="compare-icon">📏</span>
        <span class="compare-title">Bagian 1D — Channel</span>
      </div>
      <ul class="compare-list">
        <li>Saluran utama (dalam tanggul)</li>
        <li>Aliran terkanalisis, 1 arah</li>
        <li>Data cross section dari survei</li>
        <li>Komputasi cepat, Manning's n kalibrasi</li>
      </ul>
    </div>
    <div class="compare-card accent-green">
      <div class="compare-header">
        <span class="compare-icon">🗺️</span>
        <span class="compare-title">Bagian 2D — Floodplain</span>
      </div>
      <ul class="compare-list">
        <li>Dataran banjir luar tanggul</li>
        <li>Aliran bebas ke semua arah</li>
        <li>Mesh dari DEM DEMNAS/LiDAR</li>
        <li>Distribusi spasial depth & velocity</li>
      </ul>
    </div>
  </div>

  <h3>Cara Menghubungkan 1D ke 2D: Lateral Structure</h3>
  <p>Koneksi antara reach 1D dan area 2D dibuat menggunakan <strong>Lateral Structure</strong> yang merepresentasikan tanggul atau embankment:</p>

  <div class="steps">
    <div class="step">
      <div class="step-num">1</div>
      <div class="step-body">
        <div class="step-title">Buat Lateral Structure di Geometric Data Editor</div>
        <div class="step-desc"><p>Di toolbar: ikon "Lateral Structures" → klik dan digitasi garis di atas puncak tanggul, sejajar dengan saluran 1D. Lateral structure ini bertindak sebagai weir — air meluap ke 2D area ketika muka air di saluran 1D melampaui puncak tanggul.</p></div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">2</div>
      <div class="step-body">
        <div class="step-title">Hubungkan ke Reach 1D dan 2D Flow Area</div>
        <div class="step-desc"><p>Double-click pada lateral structure → di editor, bagian "Connected to" → pilih reach 1D di satu sisi dan 2D Flow Area di sisi lain. Masukkan profil elevasi puncak tanggul.</p></div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">3</div>
      <div class="step-body">
        <div class="step-title">Input Parameter Weir</div>
        <div class="step-desc"><p>Masukkan <strong>Weir Coefficient</strong> (biasanya 1.5–2.1 untuk tanggul tanah terbuka) dan <strong>Weir Width</strong>. Untuk analisis jebol tanggul (levee breach), aktifkan opsi "Breach" dengan menentukan dimensi dan mekanisme breach.</p></div>
      </div>
    </div>
  </div>

  <div class="info-box success">
    <div class="info-box-label">✅ Keunggulan Hybrid 1D-2D</div>
    <p>Model hybrid memungkinkan: simulasi penelusuran banjir yang akurat di sepanjang sungai (1D), distribusi genangan realistis di dataran banjir (2D), dan analisis skenario breach tanggul — semua dalam satu model terintegrasi dengan waktu komputasi yang terjangkau.</p>
  </div>

  <hr class="divider">

  <!-- SECTION 8: VISUALISASI OUTPUT -->
  <div class="section-heading">
    <div class="section-num">8</div>
    <h2>Visualisasi Output 2D di RAS Mapper</h2>
  </div>

  <p>Setelah simulasi selesai, semua output 2D divisualisasikan melalui <strong>RAS Mapper</strong> (View → RAS Mapper). Ini adalah bagian yang paling menarik — di sinilah peta genangan terbentuk.</p>

  <h3>Menampilkan Layer Output</h3>
  <p>Di RAS Mapper: klik kanan pada nama plan → <strong>"Create All Inundation Maps"</strong>. Tunggu proses selesai, lalu tambahkan layer:</p>

  <table class="file-table">
    <thead>
      <tr>
        <th>Layer Output</th>
        <th>Satuan</th>
        <th>Kegunaan</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Depth (Kedalaman)</strong></td>
        <td>m</td>
        <td>Peta kedalaman genangan — paling sering digunakan untuk peta bahaya banjir</td>
      </tr>
      <tr>
        <td><strong>Water Surface Elevation (WSE)</strong></td>
        <td>m MSL</td>
        <td>Elevasi muka air absolut — untuk verifikasi dengan data pengamatan AWLR</td>
      </tr>
      <tr>
        <td><strong>Velocity</strong></td>
        <td>m/s</td>
        <td>Besaran kecepatan aliran — untuk analisis erosi dan bahaya terhadap pejalan kaki/kendaraan</td>
      </tr>
      <tr>
        <td><strong>Velocity Vectors</strong></td>
        <td>m/s + arah</td>
        <td>Arah dan kecepatan aliran — untuk memahami pola pergerakan air di dataran banjir</td>
      </tr>
      <tr>
        <td><strong>Arrival Time</strong></td>
        <td>jam</td>
        <td>Waktu banjir tiba di tiap titik — kritis untuk early warning system dan evakuasi</td>
      </tr>
      <tr>
        <td><strong>Max Depth / Max Velocity</strong></td>
        <td>m / m/s</td>
        <td>Nilai maksimum selama seluruh simulasi — untuk peta bahaya banjir rencana</td>
      </tr>
    </tbody>
  </table>

  <h3>Animasi Perambatan Banjir</h3>
  <p>RAS Mapper dapat menghasilkan animasi penelusuran banjir yang sangat berguna untuk presentasi dan pelaporan:</p>
  <div class="code-block">
    RAS Mapper → <span class="code-key">Layers → Animation</span><br>
    <span class="code-comment">→ Pilih layer (Depth / Velocity)</span><br>
    <span class="code-comment">→ Atur Time Range dan Playback Speed</span><br>
    <span class="code-comment">→ Export → Save as AVI / MP4</span>
  </div>

  <h3>Export ke QGIS</h3>
  <p>Semua output RAS Mapper dapat diekspor sebagai GeoTIFF untuk kartografi profesional di QGIS:</p>
  <div class="steps">
    <div class="step">
      <div class="step-num">1</div>
      <div class="step-body">
        <div class="step-title">Export dari RAS Mapper</div>
        <div class="step-desc"><p>Klik kanan pada layer output (misal "Depth — Max") → <strong>"Export Layer"</strong> → pilih format <span class="file-ext">GeoTIFF</span> → pilih time step yang ingin diekspor (atau "Maximum" untuk nilai maksimum seluruh simulasi) → simpan.</p></div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">2</div>
      <div class="step-body">
        <div class="step-title">Load di QGIS & Buat Klasifikasi</div>
        <div class="step-desc">
          <p>Buka GeoTIFF di QGIS → Layer Properties → Symbology → Singleband pseudocolor. Klasifikasi kedalaman yang umum digunakan:</p>
          <table class="file-table" style="margin-top:0.5rem;">
            <thead><tr><th>Kedalaman</th><th>Kelas Bahaya</th><th>Warna Umum</th></tr></thead>
            <tbody>
              <tr><td>0 – 0.5 m</td><td>Rendah</td><td>Kuning</td></tr>
              <tr><td>0.5 – 1.5 m</td><td>Sedang</td><td>Oranye</td></tr>
              <tr><td>1.5 – 3.0 m</td><td>Tinggi</td><td>Merah</td></tr>
              <tr><td>> 3.0 m</td><td>Sangat Tinggi</td><td>Merah Tua</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">3</div>
      <div class="step-body">
        <div class="step-title">Overlay Data Tambahan & Cetak Peta</div>
        <div class="step-desc"><p>Tambahkan layer: batas administrasi, jalan, permukiman, fasilitas vital (RS, sekolah, kantor pemerintahan). Gunakan <strong>QGIS Print Layout</strong> untuk menyusun peta lengkap dengan legenda, skala, arah utara, dan sumber data. Ekspor ke PDF atau PNG untuk laporan.</p></div>
      </div>
    </div>
  </div>

  <hr class="divider">

  <!-- SECTION 9: TROUBLESHOOTING -->
  <div class="section-heading">
    <div class="section-num">9</div>
    <h2>Troubleshooting Model 2D</h2>
  </div>

  <p>Model 2D lebih rentan terhadap ketidakstabilan numerik dibanding model 1D. Berikut masalah-masalah yang paling sering dijumpai dan cara mengatasinya:</p>

  <div class="trouble-row">
    <div class="trouble-problem">
      <div class="trouble-icon">❌</div>
      <div class="trouble-title">Simulasi crash / tidak selesai</div>
    </div>
    <div class="trouble-solution">
      <div class="trouble-solution-title">Solusi</div>
      <div class="trouble-solution-text">Perkecil time step (aktifkan Adaptive Time Stepping). Cek apakah ada sel dengan elevasi sangat rendah atau negatif (void di DEM) — isi dengan QGIS raster fill. Cek boundary condition di hilir — normal depth terlalu kecil menyebabkan air "jatuh" mendadak.</div>
    </div>
  </div>
  <div class="trouble-row">
    <div class="trouble-problem">
      <div class="trouble-icon">❌</div>
      <div class="trouble-title">Courant number > 1.0 di banyak sel</div>
    </div>
    <div class="trouble-solution">
      <div class="trouble-solution-title">Solusi</div>
      <div class="trouble-solution-text">Perkecil ukuran sel (terutama di area aliran cepat), atau perkecil Max dt pada Adaptive Time Stepping. Untuk DWE, Courant > 1 kadang masih bisa berjalan — cek apakah output masih masuk akal.</div>
    </div>
  </div>
  <div class="trouble-row">
    <div class="trouble-problem">
      <div class="trouble-icon">❌</div>
      <div class="trouble-title">Air "bocor" melewati tanggul padahal muka air belum melampaui puncak</div>
    </div>
    <div class="trouble-solution">
      <div class="trouble-solution-title">Solusi</div>
      <div class="trouble-solution-text">Breakline tanggul belum di-enforce ke mesh. Klik kanan pada breakline → "Enforce on Mesh" → Regenerate mesh → Recompute hydraulic properties. Pastikan elevasi puncak breakline sudah sesuai DEM atau data survei tanggul.</div>
    </div>
  </div>
  <div class="trouble-row">
    <div class="trouble-problem">
      <div class="trouble-icon">❌</div>
      <div class="trouble-title">Peta genangan tidak muncul di RAS Mapper</div>
    </div>
    <div class="trouble-solution">
      <div class="trouble-solution-title">Solusi</div>
      <div class="trouble-solution-text">Pastikan Mapping Output Interval sudah diset di Unsteady Flow Analysis Options. Klik kanan plan → "Create All Inundation Maps" setelah simulasi selesai. Pastikan terrain layer sudah di-assign di RAS Mapper sebelum membuat inundation maps.</div>
    </div>
  </div>
  <div class="trouble-row">
    <div class="trouble-problem">
      <div class="trouble-icon">❌</div>
      <div class="trouble-title">Hasil kedalaman tidak realistis (terlalu besar atau kecil)</div>
    </div>
    <div class="trouble-solution">
      <div class="trouble-solution-title">Solusi</div>
      <div class="trouble-solution-text">Cek Manning's n — nilai terlalu kecil menyebabkan air mengalir terlalu cepat dan kumpulan air di hilir kurang. Cek kualitas DEM — void atau spike pada DEM menyebabkan anomali kedalaman lokal. Validasi dengan data observasi (bekas banjir, high water marks).</div>
    </div>
  </div>

  <hr class="divider">

  <!-- SECTION 10: TIPS OPTIMASI -->
  <div class="section-heading">
    <div class="section-num">10</div>
    <h2>Tips Optimasi Kinerja Model 2D</h2>
  </div>

  <div class="cards-grid">
    <div class="card">
      <span class="card-icon">⚡</span>
      <div class="card-title">Gunakan DWE dulu</div>
      <div class="card-desc">Mulai dengan Diffusion Wave. Beralih ke SWE hanya jika hasil DWE meragukan. DWE 3–5× lebih cepat.</div>
    </div>
    <div class="card">
      <span class="card-icon">🔺</span>
      <div class="card-title">Refinement Strategis</div>
      <div class="card-desc">Perhalus mesh hanya di 10–20% area paling kritis. Mesh kasar di floodplain jauh sudah cukup akurat.</div>
    </div>
    <div class="card">
      <span class="card-icon">🖥️</span>
      <div class="card-title">Multi-core / GPU</div>
      <div class="card-desc">HEC-RAS 6.x mendukung komputasi paralel. Aktifkan di Options → Run Options. GPU acceleration untuk mesh > 500k sel.</div>
    </div>
    <div class="card">
      <span class="card-icon">⏱️</span>
      <div class="card-title">Adaptive Time Step</div>
      <div class="card-desc">Selalu aktifkan. Menghemat waktu komputasi hingga 40% dibanding fixed time step yang konservatif.</div>
    </div>
    <div class="card">
      <span class="card-icon">🗂️</span>
      <div class="card-title">Batasi Output Interval</div>
      <div class="card-desc">Output terlalu sering (setiap 1 menit untuk simulasi 5 hari) membuat file output sangat besar. Cukup 15–60 menit untuk peta.</div>
    </div>
    <div class="card">
      <span class="card-icon">🌊</span>
      <div class="card-title">Warmup Period</div>
      <div class="card-desc">Jalankan steady flow awal selama 1–6 jam pertama untuk membangun kondisi awal yang stabil sebelum hidrograf puncak datang.</div>
    </div>
  </div>

  <hr class="divider">

  <!-- RINGKASAN -->
  <div class="summary-box">
    <div class="summary-title">📚 Ringkasan Modul 5</div>
    <ul class="summary-list">
      <li>Pilih 2D jika: aliran menyebar ke segala arah, dataran banjir luas, dam break, atau banjir perkotaan kompleks</li>
      <li>Konsep kunci: computational cells, cell faces, dual grid, dan hydraulic property tables</li>
      <li>DWE (Diffusion Wave) cocok untuk 90% kasus banjir di Indonesia — lebih cepat dan stabil dari SWE</li>
      <li>Alur setup: gambar polygon → generate mesh → tambah breaklines → link terrain → assign Manning's n → set boundary conditions</li>
      <li>Breaklines pada tanggul dan jalan sangat kritis untuk akurasi — jangan diabaikan</li>
      <li>Courant number ≤ 1.0 untuk stabilitas; gunakan Adaptive Time Stepping untuk efisiensi</li>
      <li>Model Hybrid 1D-2D (channel = 1D, floodplain = 2D) adalah pendekatan optimal untuk sistem sungai Indonesia</li>
      <li>Output RAS Mapper: Depth, WSE, Velocity, Arrival Time — ekspor GeoTIFF → QGIS untuk kartografi final</li>
    </ul>
  </div>

  <!-- NAVIGASI -->
  <a href="/post/materi-unsteady-flood-mapping/" class="prev-module">
    <div style="font-size:1.2rem;color:var(--hec-dim);">←</div>
    <div>
      <div class="prev-label">← Modul Sebelumnya</div>
      <div class="prev-title">Modul 4: Simulasi Banjir Unsteady &amp; Flood Mapping</div>
    </div>
  </a>

  <div class="next-module" style="cursor:default;opacity:0.5;margin-top:0.75rem;">
    <div>
      <div class="next-label">Modul Berikutnya</div>
      <div class="next-title">🎉 Selesai! Anda telah menyelesaikan semua modul HEC-RAS</div>
    </div>
    <div class="next-arrow">✓</div>
  </div>

  <p class="footnote">
    Referensi: HEC-RAS 2D User's Manual v6.x (USACE HEC) · Brunner, G.W. (2021). HEC-RAS 2D Modeling Guide · Chow, V.T., Maidment, D.R., Mays, L.W. (1988). Applied Hydrology · SNI 2415:2016 — Tata cara perhitungan debit banjir rencana
  </p>
</div>
<script>

function showTab(btn, id) {
  // Deactivate all tabs
  btn.closest('.tabs').querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.closest('.tabs').querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  // Activate selected
  btn.classList.add('active');
  document.getElementById('tab-' + id).classList.add('active');
}

</script>
{{< /rawhtml >}}
