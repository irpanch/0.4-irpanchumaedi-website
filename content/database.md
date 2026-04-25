---
title: "Database Hidrologi Indonesia"
subtitle: "Kumpulan data, template, dan tools hidrologi yang dapat diunduh gratis"
date: "2026-04-26"
draft: false
share: false
commentable: false
editable: false
header:
  caption: ""
  image: ""
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
.db-section { margin-bottom: 2.5rem; }
.db-section h3 { font-size: 1rem; margin-bottom: 0.8rem; color: #555; border-left: 3px solid #1565c0; padding-left: 0.6rem; }
.badge-soon {
  display: inline-block;
  background: #f0f0f0;
  color: #888;
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-style: italic;
}
.info-box {
  background: #f0f7ff;
  border-left: 4px solid #1565c0;
  padding: 0.8rem 1.2rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: #333;
}
</style>

<div class="tab-container">

<div class="tab-buttons">
  <button class="tab-btn active" onclick="showTab('kalsel', this)">🗺️ Kalimantan Selatan</button>
  <button class="tab-btn" onclick="showTab('kaltim', this)">🗺️ Kalimantan Timur</button>
  <button class="tab-btn" onclick="showTab('jabar', this)">🗺️ Jawa Barat</button>
  <button class="tab-btn" onclick="showTab('template', this)">📐 Template & Tools</button>
</div>

<!-- KALIMANTAN SELATAN -->
<div id="tab-kalsel" class="tab-content active">

<div class="info-box">
📌 Data curah hujan Kalimantan Selatan mencakup <strong>15 stasiun</strong> dari sumber BMKG dan BWS Kalimantan III/PSDA. Tersedia dalam format rekap bulanan dan harian, serta data satelit GPM IMERG.
</div>

<div class="db-section">

### 📊 Data Stasiun BMKG

| Stasiun | Kabupaten/Kota | Periode | Parameter | Format | Unduh |
|---------|---------------|---------|-----------|--------|-------|
| Kalimantan Selatan | Kab. Banjarbaru | 1998–2025 | CH harian, max tahunan | Excel | <span class="badge-soon">Segera hadir</span> |
| Syamsudin Noor | Kota Banjarbaru | 1998–2025 | CH harian, max tahunan | Excel | <span class="badge-soon">Segera hadir</span> |
| Surgi Mufti | Kota Banjarmasin | 1996–2014 | CH harian | Excel | <span class="badge-soon">Segera hadir</span> |
| Banjarmasin | Kota Banjarmasin | 2022–2026 | CH bulanan, max harian | Excel | <span class="badge-soon">Segera hadir</span> |

<small>*Sumber: BMKG*</small>

</div>

<div class="db-section">

### 📊 Data Stasiun BWS Kalimantan III / PSDA

**Kabupaten Banjar**

| Stasiun | Periode | Parameter | Format | Unduh |
|---------|---------|-----------|--------|-------|
| Aluh-Aluh | 2022–2025 | CH bulanan, max harian, hari hujan | Excel | <span class="badge-soon">Segera hadir</span> |
| Astambul | 2022–2025 | CH bulanan, max harian, hari hujan | Excel | <span class="badge-soon">Segera hadir</span> |
| Gudang Tengah | 2020–2025 | CH bulanan, max harian, hari hujan | Excel | <span class="badge-soon">Segera hadir</span> |
| Mengkauk | 2022–2025 | CH bulanan, max harian, hari hujan | Excel | <span class="badge-soon">Segera hadir</span> |
| Padang Panjang | 2022–2025 | CH bulanan, max harian, hari hujan | Excel | <span class="badge-soon">Segera hadir</span> |
| Ati'im | 2022–2025 | CH bulanan, max harian, hari hujan | Excel | <span class="badge-soon">Segera hadir</span> |

**Hulu Sungai Tengah**

| Stasiun | Periode | Parameter | Format | Unduh |
|---------|---------|-----------|--------|-------|
| Batu Tangga | 1995–2025 | CH bulanan, max harian, hari hujan | Excel | <span class="badge-soon">Segera hadir</span> |
| Intangan | 1995–2025 | CH bulanan, max harian, hari hujan | Excel | <span class="badge-soon">Segera hadir</span> |
| Kambat | 1995–2025 | CH bulanan, max harian, hari hujan | Excel | <span class="badge-soon">Segera hadir</span> |
| Mangunang | 1995–2025 | CH bulanan, max harian, hari hujan | Excel | <span class="badge-soon">Segera hadir</span> |
| Mo'ui | 1995–2025 | CH bulanan, max harian, hari hujan | Excel | <span class="badge-soon">Segera hadir</span> |

<small>*Sumber: BWS Kalimantan III/PSDA*</small>

</div>

<div class="db-section">

### 📡 Data Satelit GPM IMERG

| Dataset | Koordinat | Periode | Format | Unduh |
|---------|-----------|---------|--------|-------|
| GPM Kalimantan Selatan | 114.79°E–114.89°E, 3.51°S–3.41°S | 1998–2025 | CSV | <span class="badge-soon">Segera hadir</span> |
| GPM Banjarmasin | 114.49°E–114.69°E, 3.40°S–3.20°S | 1998–2025 | CSV | <span class="badge-soon">Segera hadir</span> |
| GPM Syamsudin Noor | 114.66°E–114.86°E, 3.54°S–3.34°S | 1998–2025 | CSV | <span class="badge-soon">Segera hadir</span> |

<small>*Sumber: NASA GPM IMERG V07 via Giovanni. Satuan: mm/hari.*</small>

</div>

</div>

<!-- KALIMANTAN TIMUR -->
<div id="tab-kaltim" class="tab-content">

<div class="info-box">
📌 Data hidrologi Kalimantan Timur akan segera tersedia. Mencakup wilayah Kutai Barat dan sekitarnya.
</div>

<div class="db-section">

### 📊 Data Curah Hujan

| Stasiun | Wilayah | Periode | Format | Unduh |
|---------|---------|---------|--------|-------|
| Kutai Barat | Kab. Kutai Barat | - | Excel | <span class="badge-soon">Segera hadir</span> |

</div>

</div>

<!-- JAWA BARAT -->
<div id="tab-jabar" class="tab-content">

<div class="info-box">
📌 Data hidrologi Jawa Barat akan segera tersedia. Mencakup wilayah Bandung dan sekitarnya.
</div>

<div class="db-section">

### 📊 Data Curah Hujan

| Stasiun | Wilayah | Periode | Format | Unduh |
|---------|---------|---------|--------|-------|
| Bandung | Kota Bandung | - | Excel | <span class="badge-soon">Segera hadir</span> |

</div>

</div>

<!-- TEMPLATE & TOOLS -->
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
