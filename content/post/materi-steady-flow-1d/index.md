---
title: "Modul 3 — Simulasi Aliran Steady 1D"
summary: "Menghitung profil muka air kondisi tunak (debit konstan) — input debit rancangan multi kala ulang, kondisi batas, interpretasi output, dan analisis kapasitas tampang serta floodway."
authors: ["irpan-chumaedi"]
tags: ["HEC-RAS", "steady flow", "profil muka air", "backwater", "floodway", "tutorial"]
categories: ["HEC-RAS"]
date: 2024-01-03
lastmod: 2024-01-03
draft: false
description: "Tutorial lengkap simulasi steady flow 1D di HEC-RAS: input debit rancangan, kondisi batas, menjalankan simulasi, membaca output profil muka air, analisis kapasitas dan floodway."
modul_hecras: true
reading_time: true
share: true
toc: false
---

{{< rawhtml >}}
<style>

.modul3-steady, .modul3-steady *::before, .modul3-steady *::after { box-sizing: border-box; margin: 0; padding: 0; }

.modul3-steady .topnav { background: var(--hec-bg-card); border-bottom: 1px solid var(--hec-border); padding: 0 2rem; height: 56px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
.modul3-steady .nav-brand { font-size: 15px; font-weight: 600; color: #f4a642; }
.modul3-steady .nav-breadcrumb { font-size: 13px; color: var(--hec-muted); }
.modul3-steady .nav-breadcrumb span { color: var(--hec-dim); margin: 0 6px; }
.modul3-steady .nav-breadcrumb a { color: var(--hec-muted); text-decoration: none; }
.modul3-steady .hero { border-bottom: 1px solid var(--hec-border); padding: 3rem 2rem 2.5rem; position: relative; overflow: hidden; background: linear-gradient(135deg, #1c1a12 0%, #0f1117 70%); }
.modul3-steady .hero::before { content: ''; position: absolute; top: -40px; right: -40px; width: 300px; height: 300px; background: radial-gradient(circle, rgba(244,166,66,0.07) 0%, transparent 70%); pointer-events: none; }
.modul3-steady .hero-tag { display: inline-flex; gap: 6px; background: rgba(244,166,66,0.12); border: 1px solid rgba(244,166,66,0.3); color: var(--hec-warning); font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 20px; margin-bottom: 1rem; letter-spacing: 0.5px; text-transform: uppercase; }
.modul3-steady .hero h1 { font-size: 2.2rem; font-weight: 700; color: #fff; line-height: 1.25; max-width: 700px; margin-bottom: 0.75rem; }
.modul3-steady .hero p { color: var(--hec-muted); font-size: 1.05rem; max-width: 650px; margin-bottom: 1.5rem; }
.modul3-steady .hero-meta { display: flex; gap: 1.5rem; flex-wrap: wrap; }
.modul3-steady .meta-item { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--hec-dim); }
.modul3-steady .meta-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--hec-warning); }
.modul3-steady .container { max-width: 860px; margin: 0 auto; padding: 2.5rem 2rem; }
.modul3-steady .objectives { background: rgba(244,166,66,0.06); border: 1px solid rgba(244,166,66,0.2); border-radius: 12px; padding: 1.5rem; margin-bottom: 2.5rem; }
.modul3-steady .objectives-title { font-size: 14px; font-weight: 600; color: var(--hec-warning); margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.5px; }
.modul3-steady .objectives ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.modul3-steady .objectives li { display: flex; align-items: flex-start; gap: 10px; font-size: 14.5px; color: var(--hec-muted); }
.modul3-steady .obj-check { width: 18px; height: 18px; background: rgba(244,166,66,0.15); border: 1px solid rgba(244,166,66,0.4); border-radius: 4px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 10px; color: var(--hec-warning); margin-top: 2px; }
.modul3-steady .section-heading { display: flex; align-items: center; gap: 12px; margin-bottom: 1.25rem; margin-top: 2.5rem; }
.modul3-steady .section-num { width: 32px; height: 32px; background: rgba(244,166,66,0.15); border: 1px solid rgba(244,166,66,0.3); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: var(--hec-warning); flex-shrink: 0; }
.modul3-steady .section-heading h2 { font-size: 1.3rem; font-weight: 600; color: #fff; }
.modul3-steady .divider { border: none; border-top: 1px solid var(--hec-border); margin: 2rem 0; }
.modul3-steady p { color: var(--hec-muted); margin-bottom: 1rem; font-size: 15.5px; }
.modul3-steady strong { color: var(--hec-text); font-weight: 600; }
.modul3-steady h3 { font-size: 1.05rem; font-weight: 600; color: var(--hec-text); margin: 1.5rem 0 0.75rem; }
.modul3-steady .info-box { background: rgba(74,158,255,0.06); border: 1px solid rgba(74,158,255,0.2); border-left: 3px solid var(--hec-info); border-radius: 0 8px 8px 0; padding: 1rem 1.25rem; margin: 1.25rem 0; }
.modul3-steady .info-box.warning { background: rgba(244,166,66,0.06); border-color: rgba(244,166,66,0.2); border-left-color: var(--hec-warning); }
.modul3-steady .info-box.success { background: rgba(62,207,142,0.06); border-color: rgba(62,207,142,0.2); border-left-color: var(--hec-success); }
.modul3-steady .info-box.danger { background: rgba(224,90,90,0.06); border-color: rgba(224,90,90,0.2); border-left-color: var(--hec-danger); }
.modul3-steady .info-box-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--hec-info); margin-bottom: 6px; }
.modul3-steady .info-box.warning .info-box-label { color: var(--hec-warning); }
.modul3-steady .info-box.success .info-box-label { color: var(--hec-success); }
.modul3-steady .info-box.danger .info-box-label { color: var(--hec-danger); }
.modul3-steady .info-box p { margin: 0; font-size: 14.5px; }
.modul3-steady .steps { display: flex; flex-direction: column; gap: 0; margin: 1.25rem 0; }
.modul3-steady .step { display: flex; gap: 16px; position: relative; }
.modul3-steady .step:not(:last-child)::after { content: ''; position: absolute; left: 19px; top: 40px; bottom: 0; width: 2px; background: var(--hec-border); }
.modul3-steady .step-num { width: 38px; height: 38px; background: var(--hec-bg-card2); border: 2px solid var(--hec-border); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: var(--hec-warning); flex-shrink: 0; position: relative; z-index: 1; }
.modul3-steady .step-body { padding-bottom: 1.5rem; flex: 1; }
.modul3-steady .step-title { font-size: 15px; font-weight: 600; color: var(--hec-text); margin-bottom: 6px; padding-top: 7px; }
.modul3-steady .step-desc { font-size: 14.5px; color: var(--hec-muted); }
.modul3-steady .step-desc p { margin-bottom: 6px; font-size: 14.5px; }
.modul3-steady ul.prose-list { margin: 0.75rem 0 1rem 0; padding-left: 0; color: var(--hec-muted); font-size: 15px; list-style: none; }
.modul3-steady ul.prose-list li { margin-bottom: 6px; line-height: 1.6; padding-left: 16px; position: relative; }
.modul3-steady ul.prose-list li::before { content: '•'; color: var(--hec-warning); font-weight: bold; margin-right: 8px; position: absolute; left: 0; }
.modul3-steady .file-table { width: 100%; border-collapse: collapse; font-size: 14px; margin: 1.25rem 0; }
.modul3-steady .file-table th { background: var(--hec-bg-card2); color: var(--hec-muted); font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; padding: 10px 14px; text-align: left; border-bottom: 1px solid var(--hec-border); }
.modul3-steady .file-table td { padding: 10px 14px; border-bottom: 1px solid rgba(46,49,73,0.5); color: var(--hec-muted); vertical-align: top; }
.modul3-steady .file-table tr:last-child td { border-bottom: none; }
.modul3-steady .file-table tr:hover td { background: rgba(255,255,255,0.02); }
.modul3-steady .file-ext { font-family: 'Courier New', monospace; background: var(--hec-code-bg); color: var(--hec-warning); padding: 2px 8px; border-radius: 4px; font-size: 13px; white-space: nowrap; }
.modul3-steady .formula-box { background: var(--hec-bg-card); border: 1px solid var(--hec-border); border-radius: 10px; padding: 1.25rem 1.5rem; margin: 1.25rem 0; text-align: center; }
.modul3-steady .formula { font-size: 1.25rem; color: #ffd698; font-family: 'Times New Roman', serif; margin-bottom: 0.75rem; }
.modul3-steady .formula-vars { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; font-size: 13px; }
.modul3-steady .formula-var { background: var(--hec-code-bg); padding: 3px 10px; border-radius: 4px; color: var(--hec-muted); }
.modul3-steady .summary-box { background: rgba(244,166,66,0.06); border: 1px solid rgba(244,166,66,0.2); border-radius: 12px; padding: 1.5rem; margin-top: 2.5rem; }
.modul3-steady .summary-title { font-size: 14px; font-weight: 600; color: var(--hec-warning); margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.5px; }
.modul3-steady .summary-list { list-style: none; display: flex; flex-direction: column; gap: 6px; }
.modul3-steady .summary-list li { font-size: 14.5px; color: var(--hec-muted); padding-left: 16px; position: relative; }
.modul3-steady .summary-list li::before { content: '→'; position: absolute; left: 0; color: var(--hec-warning); font-size: 12px; top: 1px; }
.modul3-steady .next-module { background: var(--hec-bg-card); border: 1px solid var(--hec-border); border-radius: 12px; padding: 1.25rem 1.5rem; margin-top: 1.5rem; display: flex; align-items: center; justify-content: space-between; text-decoration: none; }
.modul3-steady .next-label { font-size: 12px; color: var(--hec-dim); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
.modul3-steady .next-title { font-size: 15px; font-weight: 600; color: var(--hec-text); }
.modul3-steady .next-arrow { font-size: 1.5rem; color: var(--hec-warning); }
.modul3-steady .footnote { font-size: 12.5px; color: var(--hec-dim); border-top: 1px solid var(--hec-border); margin-top: 3rem; padding-top: 1rem; }
.modul3-steady .bc-card { background: var(--hec-bg-card); border: 1px solid var(--hec-border); border-radius: 10px; padding: 1rem 1.2rem; margin-bottom: 10px; }
.modul3-steady .bc-title { font-size: 14px; font-weight: 600; color: var(--hec-text); margin-bottom: 4px; display: flex; align-items: center; gap: 8px; }
.modul3-steady .bc-badge { font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 10px; }
.modul3-steady .bc-badge.hilir { background: rgba(74,158,255,0.15); color: var(--hec-info); }
.modul3-steady .bc-badge.hulu { background: rgba(79,196,160,0.15); color: var(--hec-success); }
.modul3-steady .bc-desc { font-size: 13px; color: var(--hec-dim); }
.modul3-steady .cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin: 1.25rem 0; }
.modul3-steady .card { background: var(--hec-bg-card); border: 1px solid var(--hec-border); border-radius: 10px; padding: 1.1rem 1.2rem; }
.modul3-steady .card-icon { font-size: 1.5rem; margin-bottom: 8px; display: block; }
.modul3-steady .card-title { font-size: 14px; font-weight: 600; color: var(--hec-text); margin-bottom: 4px; }
.modul3-steady .card-desc { font-size: 13px; color: var(--hec-dim); line-height: 1.5; }
.modul3-steady .output-row { display: flex; gap: 10px; margin-bottom: 10px; flex-wrap: wrap; }
.modul3-steady .output-tag { background: var(--hec-bg-card); border: 1px solid var(--hec-border); border-radius: 6px; padding: 6px 12px; font-size: 13px; color: var(--hec-muted); }

.modul3-steady { box-sizing:border-box; width:100%; overflow-x:hidden; }
.modul3-steady * { box-sizing:border-box; }
</style>
<div class="modul3-steady">
<div class="objectives">
    <div class="objectives-title">🎯 Tujuan Pembelajaran</div>
    <ul>
      <li><div class="obj-check">✓</div> Memahami konsep aliran steady dan kapan digunakan vs. unsteady</li>
      <li><div class="obj-check">✓</div> Mampu memasukkan debit rancangan multi-kala ulang sebagai flow data</li>
      <li><div class="obj-check">✓</div> Memahami jenis-jenis kondisi batas (boundary conditions) dan cara menentukannya</li>
      <li><div class="obj-check">✓</div> Mampu menjalankan simulasi steady flow dan membaca log pesan</li>
      <li><div class="obj-check">✓</div> Mampu menginterpretasikan output: profil muka air, penampang, tabel hidrolika</li>
    </ul>
  </div>

  <!-- SECTION 1 -->
  <div class="section-heading">
    <div class="section-num">1</div>
    <h2>Kapan Menggunakan Steady Flow?</h2>
  </div>

  <p><strong>Aliran steady (tunak)</strong> adalah kondisi di mana debit tidak berubah terhadap waktu di suatu titik pengamatan. Dalam pemodelan HEC-RAS, steady flow digunakan saat kita ingin mengetahui profil muka air pada debit rancangan tertentu (misalnya Q₅₀ atau Q₁₀₀) tanpa memperhitungkan bagaimana debit tersebut berubah dari waktu ke waktu.</p>

  <div class="cards-grid" style="grid-template-columns: 1fr 1fr;">
    <div class="card" style="border-color: rgba(244,166,66,0.3);">
      <div class="card-title" style="color:var(--hec-warning)">✅ Gunakan Steady Flow Untuk:</div>
      <div class="card-desc">
        <ul style="list-style:none; padding:0; font-size:13px; color:var(--hec-muted); margin-top:6px;">
          <li style="padding:2px 0">• Analisis kapasitas tampang sungai</li>
          <li style="padding:2px 0">• Penetapan garis sempadan sungai</li>
          <li style="padding:2px 0">• Perencanaan normalisasi sungai</li>
          <li style="padding:2px 0">• Analisis floodway encroachment</li>
          <li style="padding:2px 0">• Desain bendung/bangunan air</li>
          <li style="padding:2px 0">• Analisis awal cepat (screening)</li>
        </ul>
      </div>
    </div>
    <div class="card" style="border-color: rgba(74,158,255,0.3);">
      <div class="card-title" style="color:var(--hec-info)">🌊 Gunakan Unsteady Flow Untuk:</div>
      <div class="card-desc">
        <ul style="list-style:none; padding:0; font-size:13px; color:var(--hec-muted); margin-top:6px;">
          <li style="padding:2px 0">• Simulasi hidrograf banjir (flood routing)</li>
          <li style="padding:2px 0">• Pemetaan genangan berbasis waktu</li>
          <li style="padding:2px 0">• Analisis dam break / levee breach</li>
          <li style="padding:2px 0">• Operasi pintu air dan reservoir</li>
          <li style="padding:2px 0">• Sistem drainase perkotaan yang kompleks</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="info-box">
    <div class="info-box-label">ℹ️ Prinsip Dasar</div>
    <p>Steady flow <strong>jauh lebih sederhana</strong> dari sisi komputasi dan lebih mudah di-debug. Untuk pekerjaan desain infrastruktur sungai di Indonesia (normalisasi, sempadan, perencanaan tanggul), steady flow biasanya sudah mencukupi. Unsteady flow diperlukan jika proses temporal (perubahan debit terhadap waktu) relevan untuk tujuan analisis.</p>
  </div>

  <hr class="divider">

  <!-- SECTION 2 -->
  <div class="section-heading">
    <div class="section-num">2</div>
    <h2>Input Data Debit Rancangan</h2>
  </div>

  <p>Di HEC-RAS, buka <strong>Edit → Steady Flow Data</strong> (atau klik ikon aliran steady di toolbar). Jendela ini memiliki dua tab utama: <strong>Flow Profiles</strong> dan <strong>Boundary Conditions</strong>.</p>

  <h3>a. Mengisi Flow Profiles</h3>
  <p>Tentukan jumlah profil (skenario debit) yang ingin disimulasikan. Untuk analisis kapasitas sungai dan sempadan, umumnya digunakan beberapa kala ulang sekaligus:</p>

  <table class="file-table">
    <thead>
      <tr><th>Profile Name</th><th>Kala Ulang</th><th>Penggunaan Umum</th></tr>
    </thead>
    <tbody>
      <tr><td>Q2</td><td>2 Tahun</td><td>Debit dominan; acuan untuk desain saluran stabil dan sedimentasi</td></tr>
      <tr><td>Q5</td><td>5 Tahun</td><td>Banjir minor; acuan drainase perkotaan kecil</td></tr>
      <tr><td>Q10</td><td>10 Tahun</td><td>Banjir menengah; acuan drainase perkotaan</td></tr>
      <tr><td>Q25</td><td>25 Tahun</td><td>Banjir rencana jembatan/gorong-gorong kecil</td></tr>
      <tr><td>Q50</td><td>50 Tahun</td><td>Banjir rencana tanggul perkotaan (KemenPUPR)</td></tr>
      <tr><td>Q100</td><td>100 Tahun</td><td>Banjir rencana infrastruktur kritis; acuan sempadan sungai</td></tr>
    </tbody>
  </table>

  <div class="info-box warning">
    <div class="info-box-label">⚠️ Acuan Kala Ulang Indonesia (Permen PUPR)</div>
    <p>Berdasarkan regulasi Indonesia untuk sempadan sungai: <strong>debit rencana yang digunakan adalah Q₁₀₀ (kala ulang 100 tahun)</strong> untuk sungai bertanggul, atau Q₁₀₀ untuk menentukan lebar zone genangan banjir pada sungai tidak bertanggul. Pastikan nilai debit rancangan berasal dari analisis hidrologi yang valid (HEC-HMS, metode HSS, atau analisis frekuensi dari data AWLR).</p>
  </div>

  <p>Masukkan nilai debit (m³/s) untuk setiap reach di setiap profil. Jika ada anak sungai (tributary), masukkan debit masing-masing tributary secara terpisah di baris yang sesuai. HEC-RAS akan menjumlahkan debit secara otomatis di pertemuan sungai (junction).</p>

  <hr class="divider">

  <!-- SECTION 3 -->
  <div class="section-heading">
    <div class="section-num">3</div>
    <h2>Kondisi Batas (Boundary Conditions)</h2>
  </div>

  <p>Kondisi batas adalah syarat yang diberikan di ujung-ujung model untuk memulai komputasi profil muka air. Untuk steady flow subkritis (Fr &lt; 1), kondisi batas diperlukan di <strong>ujung hilir</strong>. Untuk steady flow superkritis (Fr &gt; 1), kondisi batas diperlukan di <strong>ujung hulu</strong>. Untuk mixed flow, kondisi batas diperlukan di kedua ujung.</p>

  <p>Jenis-jenis kondisi batas yang tersedia di HEC-RAS:</p>

  <div class="bc-card">
    <div class="bc-title">Known Water Surface <span class="bc-badge hilir">Hilir</span></div>
    <div class="bc-desc">Masukkan elevasi muka air yang diketahui (misalnya dari pengamatan atau muka air laut). Paling akurat jika tersedia data. Biasanya digunakan saat ujung hilir model adalah muara sungai dengan elevasi muka air laut yang diketahui, atau pertemuan dengan sungai utama yang elevasinya diketahui.</div>
  </div>

  <div class="bc-card">
    <div class="bc-title">Critical Depth <span class="bc-badge hilir">Hilir</span><span class="bc-badge hulu">Hulu</span></div>
    <div class="bc-desc">HEC-RAS menghitung kedalaman kritis secara otomatis berdasarkan debit dan geometri. Gunakan saat kondisi aliran berubah dari subkritis ke superkritis di ujung model (misalnya di ujung saluran yang mengalir bebas ke kolam besar atau area terbuka). Cukup konservatif dan aman untuk banyak kondisi.</div>
  </div>

  <div class="bc-card">
    <div class="bc-title">Normal Depth <span class="bc-badge hilir">Hilir</span><span class="bc-badge hulu">Hulu</span></div>
    <div class="bc-desc">HEC-RAS menghitung kedalaman normal menggunakan persamaan Manning berdasarkan slope yang dimasukkan. Gunakan slope dasar sungai rata-rata di sekitar ujung model (bisa dihitung dari data DEM: ΔZ/ΔL). Kondisi batas ini adalah yang paling umum digunakan untuk model yang ujungnya tidak ada data muka air terukur. Pastikan slope yang dimasukkan representatif (&plusmn;0.0001–0.01 untuk sungai Indonesia).</div>
  </div>

  <div class="bc-card">
    <div class="bc-title">Rating Curve <span class="bc-badge hilir">Hilir</span></div>
    <div class="bc-desc">Masukkan hubungan debit-muka air (rating curve) dari data pengukuran AWLR atau model lain. Kondisi batas paling akurat jika tersedia rating curve terukur di ujung hilir model.</div>
  </div>

  <div class="info-box success">
    <div class="info-box-label">✅ Panduan Praktis Pemilihan Kondisi Batas</div>
    <p><strong>Situasi paling umum:</strong> Untuk model sungai interior (bukan muara), gunakan <strong>Normal Depth</strong> dengan kemiringan dasar sungai rata-rata. Hitung kemiringan dari DEM: slope = (elevasi hulu − elevasi hilir) / panjang reach (m/m). Selalu validasi hasilnya dengan membandingkan profil muka air simulasi terhadap data terukur.<br><br>
    <strong>Penting:</strong> Pengaruh kondisi batas biasanya hanya terasa dalam beberapa penampang dari ujung model. Jika area kepentingan (misalnya lokasi jembatan yang akan didesain) cukup jauh dari ujung model, efek ketidakakuratan kondisi batas akan minimal.</p>
  </div>

  <hr class="divider">

  <!-- SECTION 4 -->
  <div class="section-heading">
    <div class="section-num">4</div>
    <h2>Menjalankan Simulasi Steady Flow</h2>
  </div>

  <div class="steps">
    <div class="step">
      <div class="step-num">1</div>
      <div class="step-body">
        <div class="step-title">Buat Plan Baru</div>
        <div class="step-desc">
          <p>Di Main Window: <strong>Run → Steady Flow Analysis</strong>. Pilih Geometry File dan Flow File yang akan digunakan. Beri nama Plan (misalnya: "Existing 2025") dan simpan.</p>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">2</div>
      <div class="step-body">
        <div class="step-title">Pilih Flow Regime</div>
        <div class="step-desc">
          <p>Pilih regime aliran yang sesuai:</p>
          <ul class="prose-list">
            <li><strong>Subcritical</strong> — Fr &lt; 1; kondisi paling umum untuk sungai di dataran (Indonesia). Komputasi berjalan dari hilir ke hulu.</li>
            <li><strong>Supercritical</strong> — Fr &gt; 1; saluran curam/riprap. Komputasi dari hulu ke hilir.</li>
            <li><strong>Mixed</strong> — gabungan kedua regime. HEC-RAS akan mendeteksi secara otomatis di mana terjadi transisi. Gunakan ini jika tidak yakin atau untuk model yang kompleks.</li>
          </ul>
          <div class="info-box" style="margin-top: 8px;">
            <div class="info-box-label">ℹ️ Rekomendasi</div>
            <p>Untuk sungai di dataran Indonesia (kemiringan rendah), gunakan <strong>Subcritical</strong>. Untuk saluran drainase dengan kemiringan curam, coba <strong>Mixed</strong>.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">3</div>
      <div class="step-body">
        <div class="step-title">Jalankan Komputasi</div>
        <div class="step-desc">
          <p>Klik <strong>Compute</strong>. Jendela komputasi akan muncul menampilkan progress. Setelah selesai, periksa log pesan:</p>
          <ul class="prose-list">
            <li><strong>Errors (merah):</strong> Simulasi gagal. Harus diperbaiki sebelum melanjutkan.</li>
            <li><strong>Warnings (kuning):</strong> Simulasi berhasil, tetapi ada kondisi yang perlu diperiksa (misalnya: penampang terlalu pendek, critical depth was assumed).</li>
            <li><strong>Notes (biru):</strong> Informasi biasa, tidak kritis.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">4</div>
      <div class="step-body">
        <div class="step-title">Periksa Peringatan Umum</div>
        <div class="step-desc">
          <ul class="prose-list">
            <li><strong>"Critical depth was assumed"</strong> — HEC-RAS tidak bisa mempertahankan aliran subkritis dan dipaksa ke critical depth. Periksa geometri di lokasi tersebut.</li>
            <li><strong>"XS is highly ineffective"</strong> — Penampang memiliki area ineffective yang besar. Cek apakah nilai Manning's n di dataran banjir terlalu tinggi.</li>
            <li><strong>"Water surface is above the highest point"</strong> — Air meluap dari tepi penampang. Perluas cakupan penampang melintang.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <hr class="divider">

  <!-- SECTION 5 -->
  <div class="section-heading">
    <div class="section-num">5</div>
    <h2>Interpretasi Output Steady Flow</h2>
  </div>

  <h3>a. Profile Plot (Profil Memanjang)</h3>
  <p>Tampilkan melalui <strong>View → Water Surface Profiles</strong>. Plot ini menampilkan:</p>
  <ul class="prose-list">
    <li>Garis muka air untuk setiap profil (Q₂, Q₅₀, Q₁₀₀, dst.)</li>
    <li>Garis energi (energy grade line) dan garis kritis (critical depth line)</li>
    <li>Elevasi tanah (ground elevation) dari penampang</li>
  </ul>
  <p>Profil muka air yang normal: naik dari hilir ke hulu secara mulus tanpa loncatan atau penurunan tiba-tiba yang tidak wajar.</p>

  <h3>b. Cross Section Plot</h3>
  <p>Tampilkan melalui <strong>View → Cross Sections</strong>. Klik anak panah untuk navigasi antar penampang. Tiap penampang menampilkan:</p>
  <ul class="prose-list">
    <li>Profil penampang melintang (elevasi vs. station)</li>
    <li>Garis muka air hasil simulasi</li>
    <li>Posisi bank station dan batas area efektif</li>
    <li>Warna untuk channel, left OB, right OB</li>
  </ul>

  <h3>c. Tabel Output Hidrolika</h3>
  <p>Tampilkan melalui <strong>View → Detailed Output Tables</strong> atau <strong>View → Profile Summary Tables</strong>. Parameter output kunci yang perlu dipahami:</p>

  <table class="file-table">
    <thead>
      <tr><th>Parameter</th><th>Simbol</th><th>Satuan</th><th>Keterangan</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>W.S. Elev</strong></td><td>h</td><td>m DPL</td><td>Elevasi muka air — parameter utama yang digunakan untuk analisis sempadan dan floodway</td></tr>
      <tr><td><strong>Vel Chnl</strong></td><td>V</td><td>m/s</td><td>Kecepatan rata-rata di channel. Acuan: 0.5–2.0 m/s untuk sungai stabil; >3 m/s rentan erosi</td></tr>
      <tr><td><strong>Flow Area</strong></td><td>A</td><td>m²</td><td>Luas penampang basah. Dibandingkan dengan kapasitas tampang rencana.</td></tr>
      <tr><td><strong>Froude # Chl</strong></td><td>Fr</td><td>-</td><td>Bilangan Froude di channel. Fr=1 → critical; Fr&lt;1 → subcritical; Fr>1 → supercritical</td></tr>
      <tr><td><strong>Min Ch El</strong></td><td>z</td><td>m DPL</td><td>Elevasi terendah penampang (thalweg). Pantau untuk identifikasi potensi scour.</td></tr>
      <tr><td><strong>Hydr Depth</strong></td><td>D</td><td>m</td><td>Kedalaman hidraulik (A/T, T=lebar permukaan air). Berbeda dengan kedalaman maksimum.</td></tr>
      <tr><td><strong>E.G. Slope</strong></td><td>S<sub>f</sub></td><td>m/m</td><td>Kemiringan garis energi. Digunakan dalam perhitungan Manning's n efektif.</td></tr>
    </tbody>
  </table>

  <h3>d. Kalibrasi Model Steady Flow</h3>
  <p>Jika tersedia data muka air terukur (dari pengamatan AWLR pada debit yang diketahui), lakukan kalibrasi:</p>

  <div class="steps">
    <div class="step">
      <div class="step-num">1</div>
      <div class="step-body">
        <div class="step-title">Masukkan debit observasi sebagai satu profil tambahan</div>
        <div class="step-desc"><p>Misal: debit saat kejadian banjir tercatat 350 m³/s di AWLR, dan muka air terukur 12.45 m DPL.</p></div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">2</div>
      <div class="step-body">
        <div class="step-title">Bandingkan muka air simulasi dengan observasi</div>
        <div class="step-desc"><p>Hitung selisih: W.S. Elev simulasi − muka air observasi. Target: |Δh| ≤ 0.10–0.15 m.</p></div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">3</div>
      <div class="step-body">
        <div class="step-title">Sesuaikan Manning's n</div>
        <div class="step-desc">
          <p>Jika W.S. simulasi terlalu tinggi → nilai n terlalu besar, turunkan n.<br>
          Jika W.S. simulasi terlalu rendah → nilai n terlalu kecil, naikkan n.<br>
          Ulangi iterasi hingga perbedaan dalam batas toleransi.</p>
        </div>
      </div>
    </div>
  </div>

  <div class="summary-box">
    <div class="summary-title">📚 Ringkasan Modul 3</div>
    <ul class="summary-list">
      <li>Steady flow digunakan untuk analisis kapasitas tampang, sempadan sungai, dan desain hidrolika — bukan untuk simulasi perambatan banjir berbasis waktu</li>
      <li>Input debit rancangan untuk beberapa kala ulang (Q₅, Q₁₀, Q₅₀, Q₁₀₀) dalam satu kali run</li>
      <li>Kondisi batas: Normal Depth paling umum untuk sungai interior; Known W.S. jika tersedia data terukur</li>
      <li>Untuk sungai di dataran Indonesia, pilih regime Subcritical</li>
      <li>Output kunci: W.S. Elev, kecepatan, Froude number, luas penampang basah</li>
      <li>Kalibrasi dengan data AWLR: target |Δh| ≤ 15 cm pada debit observasi</li>
    </ul>
  </div>

  <a href="/post/materi-unsteady-flood-mapping/" class="next-module">
    <div>
      <div class="next-label">Modul Berikutnya →</div>
      <div class="next-title">Modul 4: Simulasi Banjir Unsteady &amp; Flood Mapping</div>
    </div>
    <div class="next-arrow">→</div>
  </a>

  <p class="footnote">
    Referensi: HEC-RAS User's Manual v6.x — Chapter 6: Performing a Steady Flow Analysis · SNI 2415:2016 — Tata Cara Perhitungan Debit Banjir Rencana · Permen PUPR No. 28/PRT/M/2015
  </p>
</div>

{{< /rawhtml >}}
