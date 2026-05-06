---
title: "Database Geospasial & Hidrologi Indonesia"
subtitle: "Kumpulan data raster, vektor, dan hidrologi yang dapat diunduh gratis untuk keperluan penelitian dan perencanaan"
date: 2026-04-26
lastmod: 2026-05-03
draft: false
featured: false
---

> 💧 Semua data di halaman ini **gratis untuk diunduh**. Harap cantumkan sumber apabila digunakan dalam publikasi ilmiah atau laporan teknis.

---

## Kategori Data

<style>
.db-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0 2.5rem 0;
}
.db-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 8px;
  padding: 1.2rem 1rem;
  text-align: center;
  text-decoration: none !important;
  color: inherit !important;
  display: block;
  transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.db-card:hover {
  transform: translateY(-4px);
  border-color: #2196F3;
  box-shadow: 0 6px 20px rgba(33,150,243,0.2);
  text-decoration: none !important;
}
.db-card-icon { font-size: 2.2rem; margin-bottom: 0.5rem; }
.db-card-title { font-weight: 700; font-size: 0.9rem; margin-bottom: 0.3rem; }
.db-card-size {
  font-size: 0.72rem;
  color: #888;
  font-family: monospace;
}
.db-card-badge {
  display: inline-block;
  font-size: 0.65rem;
  padding: 0.15rem 0.5rem;
  border-radius: 20px;
  margin-top: 0.4rem;
  background: rgba(33,150,243,0.15);
  color: #2196F3;
  font-weight: 600;
}
.db-section-header {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin: 2.5rem 0 0.8rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(255,255,255,0.1);
}
.db-section-icon { font-size: 1.5rem; }
.db-section-title { font-size: 1.2rem; font-weight: 700; margin: 0; }
.db-section-size {
  font-size: 0.75rem;
  color: #888;
  font-family: monospace;
  margin-left: auto;
}
.badge-soon {
  color: #888;
  font-style: italic;
  font-size: 0.85rem;
}
.badge-ready {
  color: #4CAF50;
  font-weight: 600;
  font-size: 0.85rem;
}

.province-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0 2.5rem 0;
}
.province-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-left: 4px solid #2196F3;
  border-radius: 6px;
  padding: 1rem 1.1rem;
  text-decoration: none !important;
  color: inherit !important;
  display: block;
  transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.province-card:hover {
  transform: translateY(-3px);
  border-left-color: #4CAF50;
  box-shadow: 0 5px 16px rgba(76,175,80,0.2);
  text-decoration: none !important;
}
.province-card-flag { font-size: 1.6rem; margin-bottom: 0.4rem; }
.province-card-name { font-weight: 700; font-size: 0.9rem; margin-bottom: 0.2rem; }
.province-card-desc { font-size: 0.72rem; color: #888; margin-bottom: 0.5rem; }
.province-card-tags { display: flex; flex-wrap: wrap; gap: 0.3rem; }
.province-tag {
  font-size: 0.62rem;
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
  background: rgba(33,150,243,0.15);
  color: #64B5F6;
}
.province-tag.ready {
  background: rgba(76,175,80,0.15);
  color: #81C784;
}

</style>

<div class="db-grid">

<a class="db-card" href="#terrain">
  <div class="db-card-icon">🏔️</div>
  <div class="db-card-title">Terrain</div>
  <div class="db-card-size">7.5 GB</div>
  <span class="db-card-badge">DEM · Slope · Aspect</span>
</a>

<a class="db-card" href="#topografi">
  <div class="db-card-icon">📐</div>
  <div class="db-card-title">Topografi</div>
  <div class="db-card-size">Teristris & LiDAR</div>
  <span class="db-card-badge">DXF · LAS · PDF</span>
</a>

<a class="db-card" href="#das-sungai">
  <div class="db-card-icon">🌊</div>
  <div class="db-card-title">DAS & Sungai</div>
  <div class="db-card-size">1.5 GB</div>
  <span class="db-card-badge">Shapefile · Raster</span>
</a>

<a class="db-card" href="#data-hujan">
  <div class="db-card-icon">🌧️</div>
  <div class="db-card-title">Data Hujan</div>
  <div class="db-card-size">247 MB</div>
  <span class="db-card-badge">Excel · CSV</span>
</a>

<a class="db-card" href="#risiko-bencana">
  <div class="db-card-icon">⚠️</div>
  <div class="db-card-title">Risiko Bencana</div>
  <div class="db-card-size">1.3 GB</div>
  <span class="db-card-badge">Raster · inaRISK</span>
</a>

<a class="db-card" href="#rbi">
  <div class="db-card-icon">🗺️</div>
  <div class="db-card-title">RBI</div>
  <div class="db-card-size">21 GB</div>
  <span class="db-card-badge">Shapefile · Vektor</span>
</a>

</div>

---

## 🗺️ Jelajah per Provinsi

Data yang dikelompokkan berdasarkan wilayah — cocok untuk mencari data spesifik suatu daerah.

<div class="province-grid">

<a class="province-card" href="/post/database-kalimantan-selatan/">
  <div class="province-card-flag">🏝️</div>
  <div class="province-card-name">Kalimantan Selatan</div>
  <div class="province-card-desc">15 stasiun hujan + GPM IMERG</div>
  <div class="province-card-tags">
    <span class="province-tag ready">✅ Data Hujan</span>
    <span class="province-tag ready">✅ GPM IMERG</span>
  </div>
</a>

<a class="province-card" href="/post/database-kalimantan-timur/">
  <div class="province-card-flag">🏝️</div>
  <div class="province-card-name">Kalimantan Timur</div>
  <div class="province-card-desc">Kutai Barat & sekitarnya</div>
  <div class="province-card-tags">
    <span class="province-tag">🕐 Data Hujan</span>
  </div>
</a>

<a class="province-card" href="/post/database-jawa-barat/">
  <div class="province-card-flag">🏔️</div>
  <div class="province-card-name">Jawa Barat</div>
  <div class="province-card-desc">Bandung & sekitarnya</div>
  <div class="province-card-tags">
    <span class="province-tag">🕐 Data Hujan</span>
  </div>
</a>

</div>


---

## 📦 Detail Data per Kategori

---

<div class="db-section-header" id="terrain">
  <span class="db-section-icon">🏔️</span>
  <span class="db-section-title">01 — Terrain</span>
  <span class="db-section-size">7.5 GB · GeoTIFF</span>
</div>

Data elevasi dan turunannya untuk seluruh Indonesia, bersumber dari DEM DEMNAS (BIG) dan SRTM NASA resolusi 8.3m dan 30m.

| Dataset | Resolusi | Cakupan | Sumber | Format | Unduh |
|---------|----------|---------|--------|--------|-------|
| DEM DEMNAS | 8.3 m | Per lembar peta | BIG | GeoTIFF | <span class="badge-soon">Segera hadir</span> |
| DEM SRTM | 30 m | Indonesia | NASA | GeoTIFF | <span class="badge-soon">Segera hadir</span> |
| Slope (Kemiringan Lereng) | 8.3 m | Per lembar peta | Olahan DEMNAS | GeoTIFF | <span class="badge-soon">Segera hadir</span> |
| Aspect (Arah Lereng) | 8.3 m | Per lembar peta | Olahan DEMNAS | GeoTIFF | <span class="badge-soon">Segera hadir</span> |
| Hillshade | 8.3 m | Per lembar peta | Olahan DEMNAS | GeoTIFF | <span class="badge-soon">Segera hadir</span> |

<small>*Sumber utama: Badan Informasi Geospasial (BIG) dan NASA SRTM. DEM DEMNAS merupakan DEM nasional resolusi tinggi Indonesia.*</small>

---

<div class="db-section-header" id="topografi">
  <span class="db-section-icon">📐</span>
  <span class="db-section-title">Topografi — Pengukuran Teristris & LiDAR</span>
  <span class="db-section-size">DWG · DXF · DEM · GeoTIFF</span>
</div>

Hasil pengukuran topografi lapangan secara teristris menggunakan total station dan waterpass, serta sebagian data LiDAR untuk area tertentu. Cocok untuk perencanaan teknis bangunan air, jembatan, dan infrastruktur lainnya.

**Peta Topografi Teristris**

| Lokasi | Luas Area | Skala | Peralatan | Format | Unduh |
|--------|-----------|-------|-----------|--------|-------|
| Sungai Akelamo — Pulau Obi | - | 1:1.000 | Total Station | DXF, PDF | <span class="badge-soon">Segera hadir</span> |
| Sungai Sutoyo — Banjarmasin | - | 1:1.000 | Total Station | DXF, PDF | <span class="badge-soon">Segera hadir</span> |
| Sungai Mahakam — Kutai Barat | - | 1:2.000 | Total Station | DXF, PDF | <span class="badge-soon">Segera hadir</span> |

**Data LiDAR**

| Lokasi | Resolusi | Cakupan | Format | Unduh |
|--------|----------|---------|--------|-------|
| *(Segera diumumkan)* | - | - | LAS / LAZ | <span class="badge-soon">Segera hadir</span> |

<small>*Catatan: Data topografi teristris merupakan hasil survei lapangan. Harap cantumkan sumber bila digunakan dalam perencanaan teknis atau publikasi ilmiah.*</small>

---

<div class="db-section-header" id="das-sungai">
  <span class="db-section-icon">🌊</span>
  <span class="db-section-title">03 — DAS & Sungai</span>
  <span class="db-section-size">1.5 GB · Shapefile, Raster & PDF</span>
</div>

Batas Daerah Aliran Sungai (DAS), jaringan sungai, dan peta Wilayah Sungai (WS) berkoordinat seluruh Indonesia.

| Dataset | Cakupan | Format | Status | Halaman |
|---------|---------|--------|--------|---------|
| Peta WS Berkoordinat | 35 wilayah seluruh Indonesia | PDF georeferensi | ✅ Tersedia | [→ Lihat & Unduh](/post/database-das-sungai/) |
| Batas DAS (Shapefile) | Kalimantan Selatan & Timur | Shapefile | 🕐 Segera hadir | - |
| Flow Direction / Accumulation | Per DAS | GeoTIFF | 🕐 Segera hadir | - |

<small>*Peta WS berkoordinat dapat digunakan sebagai basemap di QGIS, Global Mapper, dan ArcGIS.*</small>

---

<div class="db-section-header" id="data-hujan">
  <span class="db-section-icon">🌧️</span>
  <span class="db-section-title">04 — Data Hujan</span>
  <span class="db-section-size">247 MB · Excel & CSV</span>
</div>

Data curah hujan harian dari stasiun observasi BMKG dan BWS, serta data satelit GPM IMERG yang telah melalui proses quality control. Data diorganisir per provinsi — pilih wilayah untuk melihat daftar stasiun dan link download lengkap.

| Provinsi | Stasiun | Data Tersedia | Halaman |
|----------|---------|---------------|---------|
| Kalimantan Selatan | 4 BMKG + 11 BWS + 3 GPM | ✅ Tersedia | [→ Lihat & Unduh](/post/database-kalimantan-selatan/) |
| Kalimantan Timur | 1 stasiun | 🕐 Segera hadir | [→ Lihat](/post/database-kalimantan-timur/) |
| Jawa Barat | 1 stasiun | 🕐 Segera hadir | [→ Lihat](/post/database-jawa-barat/) |

<small>*Format data: Excel (.xlsx) untuk data stasiun, CSV untuk data GPM IMERG, PDF untuk data arsip. Sumber: BMKG, BWS Kalimantan III/PSDA, NASA GPM IMERG V07.*</small>

---

<div class="db-section-header" id="risiko-bencana">
  <span class="db-section-icon">⚠️</span>
  <span class="db-section-title">08 — Risiko Bencana</span>
  <span class="db-section-size">1.3 GB · GeoTIFF</span>
</div>

Peta risiko bencana Indonesia dari inaRISK BNPB, mencakup bahaya banjir, longsor, dan bencana lainnya dalam format raster siap pakai.

| Dataset | Kelas Bahaya | Cakupan | Sumber | Format | Unduh |
|---------|-------------|---------|--------|--------|-------|
| Bahaya Banjir | Rendah / Sedang / Tinggi | Indonesia | inaRISK BNPB | GeoTIFF | <span class="badge-soon">Segera hadir</span> |
| Bahaya Tanah Longsor | Rendah / Sedang / Tinggi | Indonesia | inaRISK BNPB | GeoTIFF | <span class="badge-soon">Segera hadir</span> |
| Bahaya Banjir Bandang | Rendah / Sedang / Tinggi | Indonesia | inaRISK BNPB | GeoTIFF | <span class="badge-soon">Segera hadir</span> |
| Indeks Risiko Bencana | Multi-bahaya | Indonesia | inaRISK BNPB | GeoTIFF | <span class="badge-soon">Segera hadir</span> |

<small>*Sumber: inaRISK BNPB (Badan Nasional Penanggulangan Bencana). Data diunduh melalui portal inaRISK.*</small>

---

<div class="db-section-header" id="rbi">
  <span class="db-section-icon">🗺️</span>
  <span class="db-section-title">09 — RBI (Rupa Bumi Indonesia)</span>
  <span class="db-section-size">21 GB · Shapefile</span>
</div>

Data vektor RBI skala 1:25.000 dari BIG, dikelompokkan per wilayah kepulauan. Setiap folder berisi layer lengkap: jalan, sungai, administrasi, pantai, kontur, dan bangunan.

| Wilayah | Ukuran | Status | Halaman |
|---------|--------|--------|---------|
| Jabar, DKI & Banten | 2.2 GB | 🕐 Segera hadir | [→ Lihat & Unduh](/post/database-rbi/) |
| Jawa Tengah & DIY | 1.8 GB | 🕐 Segera hadir | [→ Lihat & Unduh](/post/database-rbi/) |
| Jawa Timur | 113 MB | 🕐 Segera hadir | [→ Lihat & Unduh](/post/database-rbi/) |
| Sumatera & Kepri | 4.1 GB | 🕐 Segera hadir | [→ Lihat & Unduh](/post/database-rbi/) |
| Kalimantan | 7.2 GB | 🕐 Segera hadir | [→ Lihat & Unduh](/post/database-rbi/) |
| Sulawesi | 2.0 GB | 🕐 Segera hadir | [→ Lihat & Unduh](/post/database-rbi/) |
| Papua | 1.2 GB | 🕐 Segera hadir | [→ Lihat & Unduh](/post/database-rbi/) |
| Nusa Tenggara, Bali & Maluku | 2.2 GB | 🕐 Segera hadir | [→ Lihat & Unduh](/post/database-rbi/) |

<small>*Sumber: Badan Informasi Geospasial (BIG). Total ~21 GB — unduh hanya wilayah yang dibutuhkan.*</small>



---

## 📬 Request & Kontribusi

Tidak menemukan data yang dibutuhkan? Atau punya data yang ingin dibagikan ke komunitas?

| | |
|--|--|
| 🔍 **Request data** | Hubungi via **[Kontak](/#contact)** atau **[Discord](https://discord.gg/za2KPWJFKG)** |
| 🤝 **Kontribusi data** | Punya data curah hujan, debit, atau peta GIS? Mari berbagi — kontributor dicantumkan sebagai sumber |
| 💬 **Diskusi** | Bergabung di komunitas Discord untuk diskusi hidrologi dan berbagi pengalaman lapangan |

<small>*Catatan: Semua data merupakan hasil olahan mandiri atau bersumber dari instansi pemerintah yang bersifat terbuka (open data). Harap cantumkan sumber bila digunakan dalam publikasi ilmiah atau laporan teknis.*</small>
