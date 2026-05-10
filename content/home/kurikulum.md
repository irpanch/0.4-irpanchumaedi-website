---
widget: blank
headless: true
active: true
weight: 60
title: ""
design:
  columns: '1'
---

<style>
.kur-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 0;
}
.kur-header {
  text-align: center;
  margin-bottom: 2.5rem;
}
.kur-header h2 {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}
.kur-header p {
  color: #888;
  font-size: 0.95rem;
  max-width: 580px;
  margin: 0 auto;
}
.kur-phase {
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  overflow: hidden;
}
.kur-phase-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.3rem;
  cursor: pointer;
  user-select: none;
  transition: background 0.2s;
}
.kur-phase-header:hover { background: rgba(255,255,255,0.04); }
.kur-phase-header.open { border-bottom: 1px solid rgba(255,255,255,0.08); }
.kur-phase-num {
  width: 36px; height: 36px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 0.9rem;
  flex-shrink: 0;
}
.kur-phase-info { flex: 1; }
.kur-phase-title { font-weight: 700; font-size: 1rem; margin-bottom: 0.15rem; }
.kur-phase-sub { font-size: 0.75rem; color: #888; }
.kur-phase-arrow { font-size: 0.8rem; color: #888; transition: transform 0.3s; }
.kur-phase-header.open .kur-phase-arrow { transform: rotate(180deg); }
.kur-body { display: none; padding: 1rem 1.3rem; }
.kur-body.open { display: block; }
.kur-modules {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.kur-module {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  text-decoration: none !important;
  color: inherit !important;
  transition: background 0.2s, border-color 0.2s;
}
.kur-module:hover {
  background: rgba(255,255,255,0.06);
  border-color: rgba(255,255,255,0.12);
}
.kur-module-icon { font-size: 1rem; flex-shrink: 0; margin-top: 1px; }
.kur-module-info { flex: 1; }
.kur-module-title { font-size: 0.88rem; font-weight: 600; margin-bottom: 0.1rem; }
.kur-module-desc { font-size: 0.75rem; color: #888; line-height: 1.4; }
.kur-module-badge {
  font-size: 0.62rem;
  padding: 0.15rem 0.5rem;
  border-radius: 20px;
  flex-shrink: 0;
  align-self: flex-start;
  margin-top: 2px;
  font-weight: 600;
}
.badge-done { background: rgba(76,175,80,0.15); color: #81C784; }
.badge-wip  { background: rgba(255,193,7,0.15);  color: #FFD54F; }
.badge-soon { background: rgba(255,255,255,0.07); color: #888; }

/* Warna per fase */
.phase-1 .kur-phase-num { background: rgba(33,150,243,0.2); color: #64B5F6; }
.phase-1 .kur-phase-header { border-left: 3px solid #2196F3; }
.phase-2 .kur-phase-num { background: rgba(76,175,80,0.2); color: #81C784; }
.phase-2 .kur-phase-header { border-left: 3px solid #4CAF50; }
.phase-3 .kur-phase-num { background: rgba(255,152,0,0.2); color: #FFB74D; }
.phase-3 .kur-phase-header { border-left: 3px solid #FF9800; }
.phase-4 .kur-phase-num { background: rgba(156,39,176,0.2); color: #CE93D8; }
.phase-4 .kur-phase-header { border-left: 3px solid #9C27B0; }
.phase-5 .kur-phase-num { background: rgba(244,67,54,0.2); color: #EF9A9A; }
.phase-5 .kur-phase-header { border-left: 3px solid #F44336; }

.kur-legend {
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}
.kur-legend-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  color: #888;
}
</style>

<div class="kur-wrapper">

<div class="kur-header">
  <h2>🎓 Kurikulum Hidrologi Praktis</h2>
  <p>Dari pengumpulan data lapangan hingga pemodelan hidrolika — disusun bertahap untuk praktisi dan mahasiswa teknik sumber daya air Indonesia.</p>
</div>

<!-- FASE 1 -->
<div class="kur-phase phase-1">
<div class="kur-phase-header" onclick="togglePhase(this)">
  <div class="kur-phase-num">1</div>
  <div class="kur-phase-info">
    <div class="kur-phase-title">Fondasi — Data & Tools</div>
    <div class="kur-phase-sub">Kenapa R? · Sumber data · Keterbatasan data Indonesia</div>
  </div>
  <span class="kur-phase-arrow">▼</span>
</div>
<div class="kur-body">
<div class="kur-modules">

  <div class="kur-module">
    <span class="kur-module-icon">🧱</span>
    <div class="kur-module-info">
      <div class="kur-module-title">Filosofi: Pengguna vs Pembuat Kode</div>
      <div class="kur-module-desc">Analogi batu-bata — kamu tidak perlu tahu cara membuatnya, cukup tahu cara memakainya dengan benar.</div>
    </div>
    <span class="kur-module-badge badge-wip">🔧 Draf</span>
  </div>

  <div class="kur-module">
    <span class="kur-module-icon">📊</span>
    <div class="kur-module-info">
      <div class="kur-module-title">Mengapa R? — Ketika Excel Sudah Tidak Cukup</div>
      <div class="kur-module-desc">Kelebihan R untuk hidrologi: visualisasi ggplot2, multiple output, literate programming. Kurva belajar & solusinya dengan AI.</div>
    </div>
    <span class="kur-module-badge badge-wip">🔧 Draf</span>
  </div>

</div>
</div>
</div>

<!-- FASE 2 -->
<div class="kur-phase phase-2">
<div class="kur-phase-header" onclick="togglePhase(this)">
  <div class="kur-phase-num">2</div>
  <div class="kur-phase-info">
    <div class="kur-phase-title">Pengumpulan & Rekap Data Hujan</div>
    <div class="kur-phase-sub">Keterbatasan data · BMKG · GPM Giovanni · Excel · R</div>
  </div>
  <span class="kur-phase-arrow">▼</span>
</div>
<div class="kur-body">
<div class="kur-modules">

  <a class="kur-module" href="/materi/keterbatasan-data-hujan/" target="_blank">
    <span class="kur-module-icon">🌧️</span>
    <div class="kur-module-info">
      <div class="kur-module-title">Keterbatasan Data Hujan di Indonesia</div>
      <div class="kur-module-desc">Realita data BMKG yang terbatas, kerapatan stasiun yang tidak merata, dan mengapa kita perlu alternatif data satelit. Termasuk peta interaktif 6.487 stasiun BMKG dan simulasi validasi GPM IMERG.</div>
    </div>
    <span class="kur-module-badge badge-done">✅ Tersedia</span>
  </a>

  <div class="kur-module">
    <span class="kur-module-icon">🛰️</span>
    <div class="kur-module-info">
      <div class="kur-module-title">Download Data Hujan GPM dengan Giovanni</div>
      <div class="kur-module-desc">Langkah demi langkah mengunduh data GPM IMERG dari NASA Giovanni — gratis, global, dan historis hingga 25 tahun ke belakang.</div>
    </div>
    <span class="kur-module-badge badge-soon">📅 Segera</span>
  </div>

  <div class="kur-module">
    <span class="kur-module-icon">📥</span>
    <div class="kur-module-info">
      <div class="kur-module-title">Download Data Hujan BMKG</div>
      <div class="kur-module-desc">Cara mengakses data observasi BMKG, keterbatasannya, dan strategi mengisi data yang hilang (missing data).</div>
    </div>
    <span class="kur-module-badge badge-soon">📅 Segera</span>
  </div>

  <div class="kur-module">
    <span class="kur-module-icon">📋</span>
    <div class="kur-module-info">
      <div class="kur-module-title">Rekap & Visualisasi Data Hujan dengan Excel</div>
      <div class="kur-module-desc">Template Excel siap pakai untuk rekap data harian, bulanan, dan tahunan — lengkap dengan grafik otomatis.</div>
    </div>
    <span class="kur-module-badge badge-soon">📅 Segera</span>
  </div>

  <div class="kur-module">
    <span class="kur-module-icon">📈</span>
    <div class="kur-module-info">
      <div class="kur-module-title">Visualisasi Data Hujan dengan R & ggplot2</div>
      <div class="kur-module-desc">Hasil yang sama dengan Excel, tapi lebih fleksibel — plot heatmap, boxplot bulanan, dan tren tahunan dalam hitungan baris kode.</div>
    </div>
    <span class="kur-module-badge badge-soon">📅 Segera</span>
  </div>

</div>
</div>
</div>

<!-- FASE 3 -->
<div class="kur-phase phase-3">
<div class="kur-phase-header" onclick="togglePhase(this)">
  <div class="kur-phase-num">3</div>
  <div class="kur-phase-info">
    <div class="kur-phase-title">Analisis Hidrologi</div>
    <div class="kur-phase-sub">Kalibrasi · Frekuensi · IDF · Limpasan · Erosi</div>
  </div>
  <span class="kur-phase-arrow">▼</span>
</div>
<div class="kur-body">
<div class="kur-modules">

  <div class="kur-module">
    <span class="kur-module-icon">⚖️</span>
    <div class="kur-module-info">
      <div class="kur-module-title">Kalibrasi Data GPM dengan Data BMKG</div>
      <div class="kur-module-desc">Validasi dan koreksi bias data satelit menggunakan data observasi — metode NSE, KGE, dan PBIAS dengan Excel & R.</div>
    </div>
    <span class="kur-module-badge badge-soon">📅 Segera</span>
  </div>

  <div class="kur-module">
    <span class="kur-module-icon">📉</span>
    <div class="kur-module-info">
      <div class="kur-module-title">Analisis Frekuensi Curah Hujan</div>
      <div class="kur-module-desc">Distribusi Log Pearson III, Gumbel, dan Normal — uji Smirnov-Kolmogorov & Chi-Square, periode ulang 2–100 tahun.</div>
    </div>
    <span class="kur-module-badge badge-soon">📅 Segera</span>
  </div>

  <div class="kur-module">
    <span class="kur-module-icon">⏱️</span>
    <div class="kur-module-info">
      <div class="kur-module-title">Kurva IDF — Intensitas, Durasi, Frekuensi</div>
      <div class="kur-module-desc">Dari curah hujan harian ke intensitas hujan jam-jaman — metode Mononobe dan aplikasinya untuk desain drainase.</div>
    </div>
    <span class="kur-module-badge badge-soon">📅 Segera</span>
  </div>

  <div class="kur-module">
    <span class="kur-module-icon">🗺️</span>
    <div class="kur-module-info">
      <div class="kur-module-title">Delineasi DAS & Overlay Peta dengan QGIS</div>
      <div class="kur-module-desc">Overlay peta tapak proyek dengan peta DAS dari Permen PUPR — dari DEM DEMNAS ke batas DAS dalam satu workflow QGIS.</div>
    </div>
    <span class="kur-module-badge badge-soon">📅 Segera</span>
  </div>

  <div class="kur-module">
    <span class="kur-module-icon">🌊</span>
    <div class="kur-module-info">
      <div class="kur-module-title">Perhitungan Debit Banjir Rancangan</div>
      <div class="kur-module-desc">Metode Rasional dan HSS Nakayasu — dari hujan rancangan ke hidrograf banjir untuk berbagai periode ulang.</div>
    </div>
    <span class="kur-module-badge badge-soon">📅 Segera</span>
  </div>

  <div class="kur-module">
    <span class="kur-module-icon">🏔️</span>
    <div class="kur-module-info">
      <div class="kur-module-title">Estimasi Erosi & Sedimentasi (USLE)</div>
      <div class="kur-module-desc">Perhitungan laju erosi dengan Universal Soil Loss Equation — faktor R, K, LS, C, dan P dari data lapangan.</div>
    </div>
    <span class="kur-module-badge badge-soon">📅 Segera</span>
  </div>

</div>
</div>
</div>

<!-- FASE 4 -->
<div class="kur-phase phase-4">
<div class="kur-phase-header" onclick="togglePhase(this)">
  <div class="kur-phase-num">4</div>
  <div class="kur-phase-info">
    <div class="kur-phase-title">Pemodelan Hidrolika — HEC-RAS</div>
    <div class="kur-phase-sub">1D · 2D · Steady · Unsteady · Flood Mapping</div>
  </div>
  <span class="kur-phase-arrow">▼</span>
</div>
<div class="kur-body">
<div class="kur-modules">

  <div class="kur-module">
    <span class="kur-module-icon">🏗️</span>
    <div class="kur-module-info">
      <div class="kur-module-title">Pengantar HEC-RAS — Konsep & Interface</div>
      <div class="kur-module-desc">Apa itu HEC-RAS, kapan digunakan, dan bagaimana alur kerja dari data geometri hingga output profil muka air.</div>
    </div>
    <span class="kur-module-badge badge-soon">📅 Segera</span>
  </div>

  <div class="kur-module">
    <span class="kur-module-icon">📐</span>
    <div class="kur-module-info">
      <div class="kur-module-title">Persiapan Data Geometri dari QGIS ke HEC-RAS</div>
      <div class="kur-module-desc">Workflow dari DEM dan data survei topografi ke geometri sungai di HEC-RAS — termasuk HEC-GeoRAS.</div>
    </div>
    <span class="kur-module-badge badge-soon">📅 Segera</span>
  </div>

  <div class="kur-module">
    <span class="kur-module-icon">🔁</span>
    <div class="kur-module-info">
      <div class="kur-module-title">Simulasi Aliran Steady 1D</div>
      <div class="kur-module-desc">Profil muka air kondisi steady — input debit rancangan, kondisi batas, dan interpretasi output untuk desain.</div>
    </div>
    <span class="kur-module-badge badge-soon">📅 Segera</span>
  </div>

  <div class="kur-module">
    <span class="kur-module-icon">🌊</span>
    <div class="kur-module-info">
      <div class="kur-module-title">Simulasi Banjir Unsteady & Flood Mapping</div>
      <div class="kur-module-desc">Penelusuran banjir (flood routing) dan pembuatan peta genangan — dari hidrograf masukan hingga peta risiko banjir.</div>
    </div>
    <span class="kur-module-badge badge-soon">📅 Segera</span>
  </div>

  <div class="kur-module">
    <span class="kur-module-icon">🗾</span>
    <div class="kur-module-info">
      <div class="kur-module-title">Pemodelan 2D dengan HEC-RAS</div>
      <div class="kur-module-desc">Kapan 1D tidak cukup dan perlu 2D — setup mesh, kondisi batas, dan visualisasi hasil simulasi 2D.</div>
    </div>
    <span class="kur-module-badge badge-soon">📅 Segera</span>
  </div>

</div>
</div>
</div>

<!-- FASE 5 -->
<div class="kur-phase phase-5">
<div class="kur-phase-header" onclick="togglePhase(this)">
  <div class="kur-phase-num">5</div>
  <div class="kur-phase-info">
    <div class="kur-phase-title">Output Profesional — Laporan & Presentasi</div>
    <div class="kur-phase-sub">Quarto · R Markdown · Excel · Word · PowerPoint</div>
  </div>
  <span class="kur-phase-arrow">▼</span>
</div>
<div class="kur-body">
<div class="kur-modules">

  <div class="kur-module">
    <span class="kur-module-icon">📄</span>
    <div class="kur-module-info">
      <div class="kur-module-title">Literate Programming — Analisis & Laporan Sekaligus</div>
      <div class="kur-module-desc">Konsep Quarto dan R Markdown — tulis kode dan narasi dalam satu file, hasilkan Excel + Word + PDF sekaligus.</div>
    </div>
    <span class="kur-module-badge badge-soon">📅 Segera</span>
  </div>

  <div class="kur-module">
    <span class="kur-module-icon">📊</span>
    <div class="kur-module-info">
      <div class="kur-module-title">Dari R ke Excel — Output Laporan Otomatis</div>
      <div class="kur-module-desc">Generate tabel dan grafik langsung ke Excel menggunakan openxlsx — format laporan profesional tanpa copy-paste.</div>
    </div>
    <span class="kur-module-badge badge-soon">📅 Segera</span>
  </div>

  <div class="kur-module">
    <span class="kur-module-icon">🎯</span>
    <div class="kur-module-info">
      <div class="kur-module-title">Studi Kasus Lengkap — Dari Data ke Laporan</div>
      <div class="kur-module-desc">Proyek nyata end-to-end: data GPM → kalibrasi BMKG → analisis frekuensi → HEC-RAS → laporan Word & presentasi PPT.</div>
    </div>
    <span class="kur-module-badge badge-soon">📅 Segera</span>
  </div>

</div>
</div>
</div>

<div class="kur-legend">
  <div class="kur-legend-item"><span class="kur-module-badge badge-done" style="margin:0;">✅ Tersedia</span> Sudah bisa dibaca</div>
  <div class="kur-legend-item"><span class="kur-module-badge badge-wip" style="margin:0;">🔧 Draf</span> Sedang ditulis</div>
  <div class="kur-legend-item"><span class="kur-module-badge badge-soon" style="margin:0;">📅 Segera</span> Dalam rencana</div>
</div>

</div>

<script>
function togglePhase(header) {
  header.classList.toggle('open');
  header.nextElementSibling.classList.toggle('open');
}
</script>
