---
title: "Modul 4 — Simulasi Banjir Unsteady & Flood Mapping"
summary: "Penelusuran banjir (flood routing) dari hidrograf masukan hingga peta genangan — persamaan Saint-Venant, kondisi batas dinamis, RAS Mapper, dan produksi peta risiko banjir."
authors: ["irpan-chumaedi"]
tags: ["HEC-RAS", "unsteady flow", "flood routing", "flood mapping", "RAS Mapper", "tutorial"]
categories: ["HEC-RAS"]
date: 2024-01-04
lastmod: 2024-01-04
draft: false
description: "Tutorial simulasi unsteady flow dan flood mapping di HEC-RAS: hidrograf input, kondisi batas dinamis, time step, RAS Mapper, animasi banjir, dan ekspor peta genangan ke QGIS."
modul_hecras: true
reading_time: true
share: true
toc: false
---

{{< rawhtml >}}
<style>

.modul4-unsteady, .modul4-unsteady *::before, .modul4-unsteady *::after { box-sizing: border-box; margin: 0; padding: 0; }

.modul4-unsteady .topnav { background: var(--hec-bg-card); border-bottom: 1px solid var(--hec-border); padding: 0 2rem; height: 56px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
.modul4-unsteady .nav-brand { font-size: 15px; font-weight: 600; color: var(--hec-info); }
.modul4-unsteady .nav-breadcrumb { font-size: 13px; color: var(--hec-muted); }
.modul4-unsteady .nav-breadcrumb span { color: var(--hec-dim); margin: 0 6px; }
.modul4-unsteady .nav-breadcrumb a { color: var(--hec-muted); text-decoration: none; }
.modul4-unsteady .hero { border-bottom: 1px solid var(--hec-border); padding: 3rem 2rem 2.5rem; position: relative; overflow: hidden; background: linear-gradient(135deg, #0d1520 0%, #0f1117 70%); }
.modul4-unsteady .hero::before { content: ''; position: absolute; top: -40px; right: -40px; width: 350px; height: 350px; background: radial-gradient(circle, rgba(74,158,255,0.07) 0%, transparent 70%); pointer-events: none; }
.modul4-unsteady .hero-tag { display: inline-flex; gap: 6px; background: rgba(74,158,255,0.12); border: 1px solid rgba(74,158,255,0.3); color: var(--hec-info); font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 20px; margin-bottom: 1rem; letter-spacing: 0.5px; text-transform: uppercase; }
.modul4-unsteady .hero h1 { font-size: 2.2rem; font-weight: 700; color: #fff; line-height: 1.25; max-width: 700px; margin-bottom: 0.75rem; }
.modul4-unsteady .hero p { color: var(--hec-muted); font-size: 1.05rem; max-width: 650px; margin-bottom: 1.5rem; }
.modul4-unsteady .hero-meta { display: flex; gap: 1.5rem; flex-wrap: wrap; }
.modul4-unsteady .meta-item { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--hec-dim); }
.modul4-unsteady .meta-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--hec-info); }
.modul4-unsteady .container { max-width: 860px; margin: 0 auto; padding: 2.5rem 2rem; }
.modul4-unsteady .objectives { background: rgba(74,158,255,0.06); border: 1px solid rgba(74,158,255,0.2); border-radius: 12px; padding: 1.5rem; margin-bottom: 2.5rem; }
.modul4-unsteady .objectives-title { font-size: 14px; font-weight: 600; color: var(--hec-info); margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.5px; }
.modul4-unsteady .objectives ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.modul4-unsteady .objectives li { display: flex; align-items: flex-start; gap: 10px; font-size: 14.5px; color: var(--hec-muted); }
.modul4-unsteady .obj-check { width: 18px; height: 18px; background: rgba(74,158,255,0.15); border: 1px solid rgba(74,158,255,0.4); border-radius: 4px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 10px; color: var(--hec-info); margin-top: 2px; }
.modul4-unsteady .section-heading { display: flex; align-items: center; gap: 12px; margin-bottom: 1.25rem; margin-top: 2.5rem; }
.modul4-unsteady .section-num { width: 32px; height: 32px; background: rgba(74,158,255,0.15); border: 1px solid rgba(74,158,255,0.3); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: var(--hec-info); flex-shrink: 0; }
.modul4-unsteady .section-heading h2 { font-size: 1.3rem; font-weight: 600; color: #fff; }
.modul4-unsteady .divider { border: none; border-top: 1px solid var(--hec-border); margin: 2rem 0; }
.modul4-unsteady p { color: var(--hec-muted); margin-bottom: 1rem; font-size: 15.5px; }
.modul4-unsteady strong { color: var(--hec-text); font-weight: 600; }
.modul4-unsteady h3 { font-size: 1.05rem; font-weight: 600; color: var(--hec-text); margin: 1.5rem 0 0.75rem; }
.modul4-unsteady .info-box { background: rgba(74,158,255,0.06); border: 1px solid rgba(74,158,255,0.2); border-left: 3px solid var(--hec-info); border-radius: 0 8px 8px 0; padding: 1rem 1.25rem; margin: 1.25rem 0; }
.modul4-unsteady .info-box.warning { background: rgba(244,166,66,0.06); border-color: rgba(244,166,66,0.2); border-left-color: var(--hec-warning); }
.modul4-unsteady .info-box.success { background: rgba(62,207,142,0.06); border-color: rgba(62,207,142,0.2); border-left-color: var(--hec-success); }
.modul4-unsteady .info-box.danger { background: rgba(224,90,90,0.06); border-color: rgba(224,90,90,0.2); border-left-color: var(--hec-danger); }
.modul4-unsteady .info-box-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--hec-info); margin-bottom: 6px; }
.modul4-unsteady .info-box.warning .info-box-label { color: var(--hec-warning); }
.modul4-unsteady .info-box.success .info-box-label { color: var(--hec-success); }
.modul4-unsteady .info-box.danger .info-box-label { color: var(--hec-danger); }
.modul4-unsteady .info-box p { margin: 0; font-size: 14.5px; }
.modul4-unsteady .steps { display: flex; flex-direction: column; gap: 0; margin: 1.25rem 0; }
.modul4-unsteady .step { display: flex; gap: 16px; position: relative; }
.modul4-unsteady .step:not(:last-child)::after { content: ''; position: absolute; left: 19px; top: 40px; bottom: 0; width: 2px; background: var(--hec-border); }
.modul4-unsteady .step-num { width: 38px; height: 38px; background: var(--hec-bg-card2); border: 2px solid var(--hec-border); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: var(--hec-info); flex-shrink: 0; position: relative; z-index: 1; }
.modul4-unsteady .step-body { padding-bottom: 1.5rem; flex: 1; }
.modul4-unsteady .step-title { font-size: 15px; font-weight: 600; color: var(--hec-text); margin-bottom: 6px; padding-top: 7px; }
.modul4-unsteady .step-desc { font-size: 14.5px; color: var(--hec-muted); }
.modul4-unsteady .step-desc p { margin-bottom: 6px; font-size: 14.5px; }
.modul4-unsteady ul.prose-list { margin: 0.75rem 0 1rem 0; padding-left: 0; list-style: none; color: var(--hec-muted); font-size: 15px; }
.modul4-unsteady ul.prose-list li { margin-bottom: 6px; line-height: 1.6; padding-left: 16px; position: relative; }
.modul4-unsteady ul.prose-list li::before { content: '•'; color: var(--hec-info); font-weight: bold; margin-right: 8px; position: absolute; left: 0; }
.modul4-unsteady .file-table { width: 100%; border-collapse: collapse; font-size: 14px; margin: 1.25rem 0; }
.modul4-unsteady .file-table th { background: var(--hec-bg-card2); color: var(--hec-muted); font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; padding: 10px 14px; text-align: left; border-bottom: 1px solid var(--hec-border); }
.modul4-unsteady .file-table td { padding: 10px 14px; border-bottom: 1px solid rgba(46,49,73,0.5); color: var(--hec-muted); vertical-align: top; }
.modul4-unsteady .file-table tr:last-child td { border-bottom: none; }
.modul4-unsteady .file-table tr:hover td { background: rgba(255,255,255,0.02); }
.modul4-unsteady .file-ext { font-family: 'Courier New', monospace; background: var(--hec-code-bg); color: var(--hec-info); padding: 2px 8px; border-radius: 4px; font-size: 13px; }
.modul4-unsteady .code-block { background: var(--hec-code-bg); border: 1px solid var(--hec-border); border-radius: 8px; padding: 1rem 1.25rem; font-family: 'Courier New', monospace; font-size: 13.5px; color: #a8b4ff; margin: 0.75rem 0; overflow-x: auto; line-height: 1.8; }
.modul4-unsteady .code-comment { color: var(--hec-dim); font-style: italic; }
.modul4-unsteady .summary-box { background: rgba(74,158,255,0.06); border: 1px solid rgba(74,158,255,0.2); border-radius: 12px; padding: 1.5rem; margin-top: 2.5rem; }
.modul4-unsteady .summary-title { font-size: 14px; font-weight: 600; color: var(--hec-info); margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.5px; }
.modul4-unsteady .summary-list { list-style: none; display: flex; flex-direction: column; gap: 6px; }
.modul4-unsteady .summary-list li { font-size: 14.5px; color: var(--hec-muted); padding-left: 16px; position: relative; }
.modul4-unsteady .summary-list li::before { content: '→'; position: absolute; left: 0; color: var(--hec-info); font-size: 12px; top: 1px; }
.modul4-unsteady .next-module { background: var(--hec-bg-card); border: 1px solid var(--hec-border); border-radius: 12px; padding: 1.25rem 1.5rem; margin-top: 1.5rem; display: flex; align-items: center; justify-content: space-between; text-decoration: none; }
.modul4-unsteady .next-label { font-size: 12px; color: var(--hec-dim); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
.modul4-unsteady .next-title { font-size: 15px; font-weight: 600; color: var(--hec-text); }
.modul4-unsteady .next-arrow { font-size: 1.5rem; color: var(--hec-info); }
.modul4-unsteady .footnote { font-size: 12.5px; color: var(--hec-dim); border-top: 1px solid var(--hec-border); margin-top: 3rem; padding-top: 1rem; }
.modul4-unsteady .cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin: 1.25rem 0; }
.modul4-unsteady .card { background: var(--hec-bg-card); border: 1px solid var(--hec-border); border-radius: 10px; padding: 1.1rem 1.2rem; }
.modul4-unsteady .card-icon { font-size: 1.5rem; margin-bottom: 8px; display: block; }
.modul4-unsteady .card-title { font-size: 14px; font-weight: 600; color: var(--hec-text); margin-bottom: 4px; }
.modul4-unsteady .card-desc { font-size: 13px; color: var(--hec-dim); line-height: 1.5; }
.modul4-unsteady .param-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 1rem 0; }
.modul4-unsteady .param-item { background: var(--hec-bg-card); border: 1px solid var(--hec-border); border-radius: 8px; padding: 0.85rem; }
.modul4-unsteady .param-name { font-size: 13px; font-weight: 600; color: var(--hec-text); margin-bottom: 4px; }
.modul4-unsteady .param-val { font-size: 13px; color: var(--hec-dim); }
.modul4-unsteady .stability-row { display: flex; gap: 8px; align-items: flex-start; padding: 10px 12px; background: var(--hec-bg-card); border: 1px solid var(--hec-border); border-radius: 8px; margin-bottom: 8px; }
.modul4-unsteady .stab-icon { flex-shrink: 0; font-size: 1.1rem; margin-top: 2px; }
.modul4-unsteady .stab-title { font-size: 14px; font-weight: 600; color: var(--hec-text); margin-bottom: 2px; }
.modul4-unsteady .stab-desc { font-size: 13px; color: var(--hec-dim); }

.modul4-unsteady { box-sizing:border-box; width:100%; overflow-x:hidden; }
.modul4-unsteady * { box-sizing:border-box; }
</style>
<div class="modul4-unsteady">
<div class="objectives">
    <div class="objectives-title">🎯 Tujuan Pembelajaran</div>
    <ul>
      <li><div class="obj-check">✓</div> Memahami perbedaan mendasar antara steady dan unsteady flow</li>
      <li><div class="obj-check">✓</div> Mampu memasukkan hidrograf masukan sebagai kondisi batas hulu</li>
      <li><div class="obj-check">✓</div> Memahami parameter simulasi unsteady: time step, computational interval, theta</li>
      <li><div class="obj-check">✓</div> Mampu mendiagnosis dan mengatasi ketidakstabilan simulasi</li>
      <li><div class="obj-check">✓</div> Mampu membuat peta genangan dan animasi banjir menggunakan HEC-RAS Mapper</li>
    </ul>
  </div>

  <!-- SECTION 1 -->
  <div class="section-heading">
    <div class="section-num">1</div>
    <h2>Steady vs. Unsteady Flow — Perbedaan Kunci</h2>
  </div>

  <p>Dalam kondisi <strong>banjir nyata</strong>, debit sungai berubah terhadap waktu — naik saat hujan, mencapai puncak, kemudian surut. Proses temporal ini hanya bisa ditangkap oleh <strong>simulasi unsteady flow</strong>. Steady flow hanya menghitung snapshot pada satu nilai debit tertentu.</p>

  <table class="file-table">
    <thead><tr><th>Aspek</th><th>Steady Flow</th><th>Unsteady Flow</th></tr></thead>
    <tbody>
      <tr><td><strong>Input debit</strong></td><td>Nilai tunggal (m³/s)</td><td>Hidrograf (Q vs. waktu)</td></tr>
      <tr><td><strong>Output muka air</strong></td><td>Satu nilai per titik per profil</td><td>Time series muka air di setiap titik</td></tr>
      <tr><td><strong>Perambatan banjir</strong></td><td>Tidak tersimulasi</td><td>Tersimulasi dengan atenuasi dan waktu tiba</td></tr>
      <tr><td><strong>Kompleksitas</strong></td><td>Rendah — mudah di-debug</td><td>Tinggi — risiko ketidakstabilan numerik</td></tr>
      <tr><td><strong>Waktu komputasi</strong></td><td>Detik hingga menit</td><td>Menit hingga jam (tergantung durasi dan time step)</td></tr>
      <tr><td><strong>Kegunaan utama</strong></td><td>Kapasitas tampang, desain</td><td>Flood routing, peta genangan, dam break</td></tr>
    </tbody>
  </table>

  <hr class="divider">

  <!-- SECTION 2 -->
  <div class="section-heading">
    <div class="section-num">2</div>
    <h2>Input Data Unsteady Flow</h2>
  </div>

  <p>Buka <strong>Edit → Unsteady Flow Data</strong>. Jendela ini memiliki beberapa bagian:</p>

  <h3>a. Boundary Conditions (Kondisi Batas)</h3>
  <p>Kondisi batas unsteady lebih kompleks dari steady flow. Untuk model tipikal:</p>

  <div class="steps">
    <div class="step">
      <div class="step-num">H</div>
      <div class="step-body">
        <div class="step-title">Upstream Boundary — Flow Hydrograph</div>
        <div class="step-desc">
          <p>Di titik hulu model, masukkan <strong>hidrograf debit (Q vs. waktu)</strong> sebagai kondisi batas. Hidrograf ini bisa berasal dari:</p>
          <ul class="prose-list">
            <li><strong>HEC-HMS:</strong> export hidrograf ke format DSS, impor ke HEC-RAS via DSS record</li>
            <li><strong>Data AWLR terukur:</strong> data debit time series dari pengukuran lapangan</li>
            <li><strong>Hidrograf sintetis:</strong> dibuat manual berdasarkan bentuk standar (segitiga, gamma function)</li>
          </ul>
          <p>Pastikan hidrograf mencakup periode yang cukup panjang: dari kondisi awal (baseflow) → naik → puncak → surut kembali ke baseflow. Disarankan minimal 2× durasi banjir.</p>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">H</div>
      <div class="step-body">
        <div class="step-title">Upstream Boundary — Stage Hydrograph (Alternatif)</div>
        <div class="step-desc">
          <p>Jika debit tidak diketahui namun muka air terukur tersedia (dari AWLR), gunakan <strong>Stage Hydrograph</strong> sebagai kondisi batas hulu. Kurang umum digunakan.</p>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">L</div>
      <div class="step-body">
        <div class="step-title">Downstream Boundary — Normal Depth atau Stage Hydrograph</div>
        <div class="step-desc">
          <p>Di titik hilir model, gunakan:</p>
          <ul class="prose-list">
            <li><strong>Normal Depth:</strong> sama seperti steady flow, masukkan slope kemiringan dasar sungai</li>
            <li><strong>Stage Hydrograph:</strong> jika tersedia data muka air terukur di hilir (misalnya: pengaruh pasang-surut di muara sungai)</li>
            <li><strong>Rating Curve:</strong> hubungan Q-h yang sudah diketahui</li>
          </ul>
          <p>Untuk sungai yang dipengaruhi pasang-surut, masukkan time series tinggi muka air laut sebagai Stage Hydrograph di kondisi batas hilir — ini penting untuk analisis banjir rob.</p>
        </div>
      </div>
    </div>
  </div>

  <h3>b. Lateral Inflows (Debit Lateral)</h3>
  <p>Jika ada masukan air dari anak sungai atau area drainase sepanjang reach, masukkan sebagai <strong>Lateral Flow Hydrograph</strong> di lokasi yang sesuai. Ini penting untuk model yang mencakup DAS dengan banyak anak sungai.</p>

  <h3>c. Initial Conditions (Kondisi Awal)</h3>
  <p>Sebelum simulasi dimulai, HEC-RAS perlu mengetahui kondisi awal (muka air dan debit di setiap penampang). Ada dua pendekatan:</p>
  <ul class="prose-list">
    <li><strong>Warm-up period / baseflow:</strong> Jalankan simulasi dengan debit awal rendah (baseflow) selama beberapa jam pertama sebelum hidrograf banjir dimulai. Model akan mencapai kondisi steady awal secara otomatis.</li>
    <li><strong>Steady state initial conditions:</strong> Jalankan steady flow analysis terlebih dahulu dengan debit baseflow, kemudian gunakan hasilnya sebagai initial conditions untuk unsteady. Lebih stabil namun lebih kompleks.</li>
  </ul>

  <hr class="divider">

  <!-- SECTION 3 -->
  <div class="section-heading">
    <div class="section-num">3</div>
    <h2>Parameter Simulasi Unsteady — Computational Settings</h2>
  </div>

  <p>Parameter ini ditemukan di <strong>Unsteady Flow Analysis → Computation Options and Tolerances</strong>:</p>

  <div class="param-grid">
    <div class="param-item">
      <div class="param-name">Simulation Time Window</div>
      <div class="param-val">Tentukan tanggal/jam mulai dan akhir simulasi. Harus mencakup seluruh durasi hidrograf banjir termasuk periode warm-up.</div>
    </div>
    <div class="param-item">
      <div class="param-name">Computation Interval (dt)</div>
      <div class="param-val">Time step komputasi dalam satuan menit atau detik. Semakin kecil = lebih stabil tetapi lebih lambat. Panduan: dt ≤ L/(2·V·Δx) — atau coba 1–5 menit untuk permulaan.</div>
    </div>
    <div class="param-item">
      <div class="param-name">Output Interval</div>
      <div class="param-val">Interval penyimpanan output (profil muka air). Tidak harus sama dengan dt. Untuk animasi flood mapping: simpan setiap 15–60 menit.</div>
    </div>
    <div class="param-item">
      <div class="param-name">Hydrograph Output Interval</div>
      <div class="param-val">Interval penyimpanan hidrograf di titik output. Untuk monitoring titik kritis: 5–15 menit.</div>
    </div>
    <div class="param-item">
      <div class="param-name">Theta (θ)</div>
      <div class="param-val">Koefisien implisit dalam skema numerik (0.6–1.0). θ=1.0 paling stabil; θ=0.6 paling akurat. Default: 1.0 untuk model baru.</div>
    </div>
    <div class="param-item">
      <div class="param-name">Courant Number</div>
      <div class="param-val">Angka Courant (Cr = V·dt/Δx). Idealnya Cr ≤ 1.0 untuk stabilitas. HEC-RAS menampilkan Cr di log jika ada masalah.</div>
    </div>
  </div>

  <div class="info-box warning">
    <div class="info-box-label">⚠️ Aturan Praktis Time Step</div>
    <p>Sebagai titik awal yang aman: gunakan time step <strong>1 menit</strong> untuk model dengan jarak antar penampang ~100 m, atau <strong>5 menit</strong> untuk jarak antar penampang ~500 m. Jika simulasi tidak stabil, coba perkecil time step setengahnya. Jika simulasi terlalu lambat, perbesar time step sambil pantau stabilitas.</p>
  </div>

  <hr class="divider">

  <!-- SECTION 4 -->
  <div class="section-heading">
    <div class="section-num">4</div>
    <h2>Diagnosa dan Penanganan Ketidakstabilan Unsteady Flow</h2>
  </div>

  <p>Ketidakstabilan numerik adalah tantangan utama dalam simulasi unsteady flow. Tandanya: simulasi crash, NaN (not a number) pada output, atau osilasi muka air yang tidak fisik. Berikut panduan sistematis:</p>

  <div class="stability-row">
    <div class="stab-icon">🔍</div>
    <div>
      <div class="stab-title">Lokalisasi Masalah: Perhatikan Log Error</div>
      <div class="stab-desc">Log error HEC-RAS akan menampilkan River Station dan waktu saat terjadi crash. Mulailah investigasi di penampang tersebut.</div>
    </div>
  </div>

  <div class="stability-row">
    <div class="stab-icon">⏱️</div>
    <div>
      <div class="stab-title">Perkecil Time Step (dt)</div>
      <div class="stab-desc">Cara paling umum dan efektif. Coba kurangi dt menjadi setengahnya. Jika sebelumnya 5 menit, coba 2 atau 1 menit. Jika masih crash, coba 30 detik.</div>
    </div>
  </div>

  <div class="stability-row">
    <div class="stab-icon">📐</div>
    <div>
      <div class="stab-title">Periksa Geometri di Lokasi Crash</div>
      <div class="stab-desc">Cek apakah ada perubahan drastis elevasi antar penampang, penampang yang terlalu pendek, atau area dengan kemiringan sangat curam. Tambahkan penampang interpolasi jika perlu.</div>
    </div>
  </div>

  <div class="stability-row">
    <div class="stab-icon">🌊</div>
    <div>
      <div class="stab-title">Periksa Kondisi Awal (Initial Conditions)</div>
      <div class="stab-desc">Model yang dimulai dari kondisi awal "kering" (dry start) sangat rentan tidak stabil. Selalu berikan warm-up period dengan baseflow minimal sebelum hidrograf banjir dimulai. Tambahkan minimum baseflow: 0.1–1.0 m³/s.</div>
    </div>
  </div>

  <div class="stability-row">
    <div class="stab-icon">🏔️</div>
    <div>
      <div class="stab-title">Tambahkan Storage Area atau Pilot Channel</div>
      <div class="stab-desc">Untuk area yang menjadi "dry" (kering) saat muka air surut, tambahkan storage area kecil atau pilot channel di dasar sungai untuk mencegah masalah wet/dry front.</div>
    </div>
  </div>

  <div class="stability-row">
    <div class="stab-icon">🔧</div>
    <div>
      <div class="stab-title">Gunakan Mixed Flow Regime</div>
      <div class="stab-desc">Jika ada transisi subkritis-superkritis yang tidak tertangani dengan baik, aktifkan opsi "Mixed Flow Regime" di Computation Options untuk penanganan yang lebih robust.</div>
    </div>
  </div>

  <div class="stability-row">
    <div class="stab-icon">📉</div>
    <div>
      <div class="stab-title">Perhalus Hidrograf Masukan</div>
      <div class="stab-desc">Hidrograf dengan rising limb yang sangat curam (debit naik drastis dalam waktu singkat) dapat menyebabkan ketidakstabilan. Perhalus kurva hidrograf atau tambahkan poin tambahan di bagian yang curam.</div>
    </div>
  </div>

  <hr class="divider">

  <!-- SECTION 5 -->
  <div class="section-heading">
    <div class="section-num">5</div>
    <h2>Flood Mapping dengan HEC-RAS Mapper</h2>
  </div>

  <p>Setelah simulasi unsteady flow berhasil, HEC-RAS Mapper digunakan untuk membuat peta genangan berbasis DEM terrain. Ini adalah fitur paling powerful HEC-RAS untuk visualisasi dan komunikasi risiko banjir.</p>

  <div class="steps">
    <div class="step">
      <div class="step-num">1</div>
      <div class="step-body">
        <div class="step-title">Buat Terrain di HEC-RAS Mapper</div>
        <div class="step-desc">
          <p>Buka <strong>GIS Tools → RAS Mapper</strong>. Klik kanan pada "Terrains" → <strong>Create New RAS Terrain</strong>. Pilih file DEM (GeoTIFF, format TIF). Untuk hasil terbaik, gunakan DEM komposit (DEM + batimetri) yang sudah disiapkan di Modul 2.</p>
          <p>HEC-RAS Mapper akan mengkonversi DEM ke format internal HDF5 yang dioptimalkan untuk rendering cepat.</p>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">2</div>
      <div class="step-body">
        <div class="step-title">Mapping Results: Depth dan WSE</div>
        <div class="step-desc">
          <p>Klik kanan pada plan yang sudah dijalankan → <strong>Map Results</strong>. Pilih parameter yang ingin dipetakan:</p>
          <ul class="prose-list">
            <li><strong>Depth (m):</strong> kedalaman genangan di atas terrain — paling umum digunakan untuk peta bahaya banjir</li>
            <li><strong>Water Surface Elevation (m DPL):</strong> elevasi muka air — berguna untuk analisis sempadan</li>
            <li><strong>Velocity (m/s):</strong> kecepatan aliran — penting untuk penilaian bahaya fisik</li>
            <li><strong>Hazard (m²/s):</strong> produk kedalaman × kecepatan — klasifikasi bahaya banjir</li>
          </ul>
          <p>HEC-RAS Mapper akan menghitung peta ini dengan cara: untuk setiap sel piksel DEM, bandingkan elevasi DEM dengan interpolasi muka air dari hasil simulasi. Jika W.S. Elev &gt; elevasi DEM → sel tersebut tergenang.</p>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">3</div>
      <div class="step-body">
        <div class="step-title">Maximum Water Surface Map</div>
        <div class="step-desc">
          <p>Untuk keperluan perencanaan, buat peta muka air dan kedalaman maksimum — nilai tertinggi sepanjang durasi simulasi di setiap piksel. Di RAS Mapper: <strong>klik kanan plan → Compute Water Surface and Inundation Mapping → Maximum WS</strong>.</p>
          <p>Peta genangan maksimum inilah yang digunakan untuk:</p>
          <ul class="prose-list">
            <li>Peta bahaya banjir (flood hazard map)</li>
            <li>Analisis sempadan sungai sesuai Permen PUPR 28/2015</li>
            <li>Delineasi zona floodway dan flood fringe</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">4</div>
      <div class="step-body">
        <div class="step-title">Animasi Perambatan Banjir</div>
        <div class="step-desc">
          <p>Untuk visualisasi kepada pemangku kepentingan, buat animasi banjir:</p>
          <p>Di RAS Mapper → tab Animation → pilih parameter (Depth atau WSE) → tentukan frame rate → <strong>Export Animation</strong>. Output berupa file video MP4 atau sequence GIF yang menunjukkan perambatan banjir dari waktu ke waktu.</p>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">5</div>
      <div class="step-body">
        <div class="step-title">Export ke GIS (Shapefile / GeoTIFF)</div>
        <div class="step-desc">
          <p>Export hasil peta genangan ke format GIS untuk diproses lebih lanjut di QGIS:</p>
          <ul class="prose-list">
            <li><strong>Peta genangan (boundary):</strong> shapefile polygon area tergenang → untuk overlay dengan data kependudukan, infrastruktur, dll.</li>
            <li><strong>Depth raster:</strong> GeoTIFF kedalaman genangan → untuk analisis spasial lebih lanjut</li>
            <li><strong>Profil memanjang:</strong> shapefile garis profil muka air</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <h3>Klasifikasi Bahaya Banjir</h3>
  <p>Hasil peta kedalaman genangan dapat diklasifikasikan menjadi kelas bahaya untuk laporan AMDAL dan perencanaan wilayah:</p>

  <table class="file-table">
    <thead><tr><th>Kelas Bahaya</th><th>Kedalaman Genangan</th><th>Keterangan</th></tr></thead>
    <tbody>
      <tr><td><strong style="color:#3ecf8e">Rendah</strong></td><td>0 – 0.5 m</td><td>Genangan dangkal; tidak mengancam keselamatan manusia berdiri; akses masih memungkinkan</td></tr>
      <tr><td><strong style="color:#f4a642">Sedang</strong></td><td>0.5 – 1.0 m</td><td>Mengganggu aktivitas; kendaraan roda dua mulai tidak bisa melintas</td></tr>
      <tr><td><strong style="color:#e05a5a">Tinggi</strong></td><td>1.0 – 2.0 m</td><td>Membahayakan keselamatan; evakuasi diperlukan; kendaraan roda empat tidak bisa melintas</td></tr>
      <tr><td><strong style="color:#9b2f2f">Sangat Tinggi</strong></td><td>&gt; 2.0 m</td><td>Sangat berbahaya; evakuasi wajib; risiko korban jiwa tinggi</td></tr>
    </tbody>
  </table>

  <div class="info-box">
    <div class="info-box-label">ℹ️ Catatan untuk Analisis Bahaya Gabungan</div>
    <p>Untuk penilaian bahaya banjir yang komprehensif, gunakan parameter <strong>Hazard = Depth × Velocity (m²/s)</strong>:<br>
    — Hazard &lt; 0.5 m²/s: Aman untuk dewasa<br>
    — Hazard 0.5–1.0 m²/s: Berbahaya untuk anak-anak dan lansia<br>
    — Hazard &gt; 1.0 m²/s: Berbahaya untuk semua orang<br>
    Parameter ini mengakomodir risiko terseret arus, bukan hanya tenggelam.</p>
  </div>

  <div class="summary-box">
    <div class="summary-title">📚 Ringkasan Modul 4</div>
    <ul class="summary-list">
      <li>Unsteady flow mensimulasikan hidrograf banjir — perubahan debit dan muka air terhadap waktu</li>
      <li>Input utama: Flow Hydrograph di hulu, Normal Depth atau Stage Hydrograph di hilir</li>
      <li>Parameter kritis: Computation interval (dt) — mulai dari 1–5 menit, sesuaikan jika tidak stabil</li>
      <li>Ketidakstabilan diatasi dengan: perkecil dt, periksa geometri, tambahkan baseflow awal, smoothing hidrograf</li>
      <li>HEC-RAS Mapper: buat terrain dari DEM, petakan Depth/WSE/Velocity, animasikan perambatan banjir</li>
      <li>Export ke shapefile/GeoTIFF untuk analisis lebih lanjut di QGIS (overlay kependudukan, infrastruktur)</li>
    </ul>
  </div>

  <a href="/post/materi-pemodelan-2d-hecras/" class="next-module">
    <div>
      <div class="next-label">Modul Berikutnya →</div>
      <div class="next-title">Modul 5: Pemodelan 2D dengan HEC-RAS</div>
    </div>
    <div class="next-arrow">→</div>
  </a>

  <p class="footnote">
    Referensi: HEC-RAS User's Manual v6.x — Chapter 7: Performing a 1D Unsteady Flow Analysis · HEC-RAS Mapper User's Manual · Chow, V.T. et al. (1988). Applied Hydrology
  </p>
</div>

{{< /rawhtml >}}
