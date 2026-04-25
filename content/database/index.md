---
title: "Database Hidrologi Indonesia"
subtitle: "Kumpulan data, template, dan tools hidrologi yang dapat diunduh gratis"
summary: "Kumpulan data hidrologi per wilayah."
date: 2026-04-26
lastmod: 2026-04-26
draft: false
type: page
share: false
commentable: false
editable: false
---

> 💧 Semua data dan file di halaman ini **gratis untuk diunduh**. Jika bermanfaat, silakan bagikan ke rekan sejawat. Harap cantumkan sumber apabila digunakan dalam publikasi ilmiah.

---

<style>
.tab-container { margin: 2rem 0; }
.tab-buttons { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0; border-bottom: 2px solid #e0e0e0; padding-bottom: 0; }
.tab-btn {
  padding: 0.6rem 1.4rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  color: #888;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  transition: all 0.2s;
}
.tab-btn:hover { color: #1565c0; }
.tab-btn.active { color: #1565c0; border-bottom: 3px solid #1565c0; }
.tab-content { display: none; padding: 1.5rem 0; }
.tab-content.active { display: block; }
.db-section { margin-bottom: 2rem; }
.db-section h3 { font-size: 1rem; margin-bottom: 0.8rem; color: #555; }
.badge-soon {
  display: inline-block;
  background: #f0f0f0;
  color: #888;
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-style: italic;
}
.badge-ready {
  display: inline-block;
  background: #e8f5e9;
  color: #2e7d32;
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-weight: 600;
}
</style>

<div class="tab-container">

<div class="tab-buttons">
  <button class="tab-btn active" onclick="showTab('kalsel', this)">🗺️ Kalimantan Selatan</button>
  <button class="tab-btn" onclick="showTab('kaltim', this)">🗺️ Kalimantan Timur</button>
  <button class="tab-btn" onclick="showTab('jabar', this)">🗺️ Jawa Barat</button>
  <button class="tab-btn" onclick="showTab('template', this)">📐 Template & Tools</button>
</div>

<!-- ════════════════════════════════════════ -->
<!-- TAB: KALIMANTAN SELATAN -->
<!-- ════════════════════════════════════════ -->
<div id="tab-kalsel" class="tab-content active">

<div class="db-section">

### 📊 Data Curah Hujan

| Dataset | Periode | Sumber | Format | Unduh |
|---------|---------|--------|--------|-------|
| CH Harian Stasiun Banjarmasin | 1996–2025 | BMKG | Excel | <span class="badge-soon">Segera hadir</span> |
| CH Harian Stasiun Banjarbaru | 1998–2025 | BMKG | Excel | <span class="badge-soon">Segera hadir</span> |
| CH Harian Stasiun Surgi Mufti | 1996–2014 | BMKG | Excel | <span class="badge-soon">Segera hadir</span> |
| CH Harian Stasiun Batu Tangga | 1995–2025 | BWS Kal III | Excel | <span class="badge-soon">Segera hadir</span> |
| CH Harian Stasiun Intangan | 1995–2025 | BWS Kal III | Excel | <span class="badge-soon">Segera hadir</span> |
| Inventarisasi Stasiun Hujan Kalsel | - | Olahan | Excel | <span class="badge-soon">Segera hadir</span> |

</div>

<div class="db-section">

### 🗺️ Peta & Data Spasial

| Dataset | Format | Keterangan | Unduh |
|---------|--------|-----------|-------|
| Batas DAS Barito | Shapefile | Delineasi DEM DEMNAS | <span class="badge-soon">Segera hadir</span> |
| Jaringan Sungai Kalsel | Shapefile | - | <span class="badge-soon">Segera hadir</span> |

</div>

<div class="db-section">

### 📄 Laporan & Dokumen

| Dokumen | Tahun | Keterangan | Unduh |
|---------|-------|-----------|-------|
| Laporan Hidrologi WPG Banjarmasin | 2025 | Analisis GPM + BMKG | <span class="badge-soon">Segera hadir</span> |

</div>

</div>

<!-- ════════════════════════════════════════ -->
<!-- TAB: KALIMANTAN TIMUR -->
<!-- ════════════════════════════════════════ -->
<div id="tab-kaltim" class="tab-content">

<div class="db-section">

### 📊 Data Curah Hujan

| Dataset | Periode | Sumber | Format | Unduh |
|---------|---------|--------|--------|-------|
| CH Harian Kutai Barat | - | BMKG | Excel | <span class="badge-soon">Segera hadir</span> |

</div>

<div class="db-section">

### 🗺️ Peta & Data Spasial

| Dataset | Format | Keterangan | Unduh |
|---------|--------|-----------|-------|
| Batas DAS Mahakam Hulu | Shapefile | Delineasi DEM DEMNAS | <span class="badge-soon">Segera hadir</span> |

</div>

<div class="db-section">

### 📄 Laporan & Dokumen

| Dokumen | Tahun | Keterangan | Unduh |
|---------|-------|-----------|-------|
| Laporan Hidrologi Jalan Hauling PT Benanga | 2025 | Studi kelayakan | <span class="badge-soon">Segera hadir</span> |

</div>

</div>

<!-- ════════════════════════════════════════ -->
<!-- TAB: JAWA BARAT -->
<!-- ════════════════════════════════════════ -->
<div id="tab-jabar" class="tab-content">

<div class="db-section">

### 📊 Data Curah Hujan

| Dataset | Periode | Sumber | Format | Unduh |
|---------|---------|--------|--------|-------|
| CH Harian Bandung | - | BMKG | Excel | <span class="badge-soon">Segera hadir</span> |

</div>

<div class="db-section">

### 🗺️ Peta & Data Spasial

| Dataset | Format | Keterangan | Unduh |
|---------|--------|-----------|-------|
| Batas DAS Citarum | Shapefile | Delineasi DEM DEMNAS | <span class="badge-soon">Segera hadir</span> |

</div>

</div>

<!-- ════════════════════════════════════════ -->
<!-- TAB: TEMPLATE & TOOLS -->
<!-- ════════════════════════════════════════ -->
<div id="tab-template" class="tab-content">

<div class="db-section">

### 📐 Template Excel

| Template | Keterangan | Unduh |
|----------|-----------|-------|
| Analisis Frekuensi Curah Hujan | Log Pearson III, Gumbel, Normal | <span class="badge-soon">Segera hadir</span> |
| Perhitungan Erosi USLE | Faktor C, K, LS, P | <span class="badge-soon">Segera hadir</span> |
| Kurva IDF | Metode Mononobe | <span class="badge-soon">Segera hadir</span> |
| Koefisien Runoff | Berdasarkan tipe lahan | <span class="badge-soon">Segera hadir</span> |

</div>

<div class="db-section">

### 🖥️ Script R

| Script | Keterangan | Unduh |
|--------|-----------|-------|
| Analisis Schmidt-Ferguson | Klasifikasi iklim otomatis | <span class="badge-soon">Segera hadir</span> |
| Validasi Data Satelit GPM | NSE, KGE, PBIAS, POD, FAR, CSI | <span class="badge-soon">Segera hadir</span> |
| Plot Curah Hujan Bulanan | Visualisasi ggplot2 | <span class="badge-soon">Segera hadir</span> |

</div>

</div>

</div>

<script>
function showTab(id, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  btn.classList.add('active');
}
</script>

---

## 📬 Request Data

Tidak menemukan data yang kamu butuhkan? Kirim request melalui halaman **[Kontak](/#contact)**.

<small>*Catatan: Semua data yang dibagikan merupakan hasil olahan mandiri atau telah mendapat izin dari instansi terkait. Harap cantumkan sumber apabila digunakan dalam publikasi ilmiah.*</small>
