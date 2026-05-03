---
title: "Database DAS & Sungai Indonesia"
subtitle: "Peta Wilayah Sungai (WS) berkoordinat seluruh Indonesia dalam format PDF georeferensi"
date: 2026-05-03
lastmod: 2026-05-03
draft: false
featured: false
---

← [Kembali ke Database Utama](/post/database/)

---

Data peta **Wilayah Sungai (WS) berkoordinat** seluruh Indonesia, bersumber dari Kementerian PUPR dan BIG. Tersedia dalam format **PDF georeferensi** yang dapat langsung digunakan sebagai basemap di QGIS, Global Mapper, atau ArcGIS.

> 📥 Semua data tersedia dalam **satu folder OneDrive** — pilih provinsi yang dibutuhkan setelah membuka folder.

<style>
.pulau-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}
.pulau-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  overflow: hidden;
}
.pulau-header {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.9rem 1rem;
  cursor: pointer;
  user-select: none;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  transition: background 0.2s;
}
.pulau-header:hover { background: rgba(255,255,255,0.05); }
.pulau-icon { font-size: 1.4rem; }
.pulau-info { flex: 1; }
.pulau-name { font-weight: 700; font-size: 0.95rem; }
.pulau-count { font-size: 0.72rem; color: #888; }
.pulau-arrow { font-size: 0.8rem; color: #888; transition: transform 0.3s; }
.pulau-header.open .pulau-arrow { transform: rotate(180deg); }
.pulau-body { display: none; padding: 0.5rem 0; }
.pulau-body.open { display: block; }
.provinsi-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.45rem 1rem;
  font-size: 0.82rem;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  transition: background 0.15s;
}
.provinsi-item:last-child { border-bottom: none; }
.provinsi-item:hover { background: rgba(255,255,255,0.04); }
.provinsi-badge {
  font-size: 0.65rem;
  padding: 0.15rem 0.5rem;
  border-radius: 3px;
  background: rgba(76,175,80,0.15);
  color: #81C784;
}
.dl-btn-main {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.4rem;
  border-radius: 6px;
  background: #1565C0;
  color: white !important;
  text-decoration: none !important;
  font-weight: 600;
  font-size: 0.9rem;
  transition: background 0.2s, transform 0.2s;
  margin: 1rem 0;
  display: inline-block;
}
.dl-btn-main:hover { background: #1976D2; transform: translateY(-2px); }
</style>

## 📥 Unduh Semua Data

<a class="dl-btn-main" href="https://1drv.ms/f/c/22f5ef4527203c63/IgCF8scklb1_TITQKfamjYcOAZIbqLVHvHR4D_WOICnEPd4?e=lIo7f8" target="_blank">⬇ Unduh Semua (35 Wilayah) — OneDrive</a>

<small>*Berisi 35 peta WS seluruh Indonesia. Pilih provinsi/wilayah yang dibutuhkan di dalam folder.*</small>

---

## 🗺️ Pilih Pulau / Wilayah

<div class="pulau-grid">

<div class="pulau-card">
<div class="pulau-header" onclick="togglePulau(this)">
  <span class="pulau-icon">🏝️</span>
  <div class="pulau-info"><div class="pulau-name">Pulau Jawa</div><div class="pulau-count">5 wilayah · PDF</div></div>
  <span class="pulau-arrow">▼</span>
</div>
<div class="pulau-body">
  <div class="provinsi-item"><span>Jawa Barat & DKI Jakarta</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Jawa Tengah & D.I. Yogyakarta</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Jawa Timur</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Banten</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Sungai Pulau Jawa</span><span class="provinsi-badge">✅ PDF</span></div>
</div>
</div>

<div class="pulau-card">
<div class="pulau-header" onclick="togglePulau(this)">
  <span class="pulau-icon">🏝️</span>
  <div class="pulau-info"><div class="pulau-name">Pulau Sumatera</div><div class="pulau-count">9 wilayah · PDF</div></div>
  <span class="pulau-arrow">▼</span>
</div>
<div class="pulau-body">
  <div class="provinsi-item"><span>Aceh</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Sumatera Utara</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Sumatera Barat</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Riau</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Jambi</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Bengkulu</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Sumatera Selatan</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Lampung</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Sungai Pulau Sumatera</span><span class="provinsi-badge">✅ PDF</span></div>
</div>
</div>

<div class="pulau-card">
<div class="pulau-header" onclick="togglePulau(this)">
  <span class="pulau-icon">🏝️</span>
  <div class="pulau-info"><div class="pulau-name">Pulau Kalimantan</div><div class="pulau-count">5 wilayah · PDF</div></div>
  <span class="pulau-arrow">▼</span>
</div>
<div class="pulau-body">
  <div class="provinsi-item"><span>Kalimantan Barat</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Kalimantan Tengah</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Kalimantan Selatan</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Kalimantan Timur & Utara</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Sungai Pulau Kalimantan</span><span class="provinsi-badge">✅ PDF</span></div>
</div>
</div>

<div class="pulau-card">
<div class="pulau-header" onclick="togglePulau(this)">
  <span class="pulau-icon">🏝️</span>
  <div class="pulau-info"><div class="pulau-name">Pulau Sulawesi</div><div class="pulau-count">7 wilayah · PDF</div></div>
  <span class="pulau-arrow">▼</span>
</div>
<div class="pulau-body">
  <div class="provinsi-item"><span>Sulawesi Utara</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Gorontalo</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Sulawesi Tengah</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Sulawesi Barat</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Sulawesi Selatan</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Sulawesi Tenggara</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Sungai Pulau Sulawesi</span><span class="provinsi-badge">✅ PDF</span></div>
</div>
</div>

<div class="pulau-card">
<div class="pulau-header" onclick="togglePulau(this)">
  <span class="pulau-icon">🏝️</span>
  <div class="pulau-info"><div class="pulau-name">Kepulauan & Lainnya</div><div class="pulau-count">9 wilayah · PDF</div></div>
  <span class="pulau-arrow">▼</span>
</div>
<div class="pulau-body">
  <div class="provinsi-item"><span>Kepulauan Riau</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Bangka Belitung</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Bali</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Nusa Tenggara Barat</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>NTT</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Maluku</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Maluku Utara</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Papua Barat</span><span class="provinsi-badge">✅ PDF</span></div>
  <div class="provinsi-item"><span>Sungai-Sungai</span><span class="provinsi-badge">✅ PDF</span></div>
</div>
</div>

</div>

<script>
function togglePulau(header) {
  header.classList.toggle('open');
  header.nextElementSibling.classList.toggle('open');
}
</script>

---

## ℹ️ Informasi Data

| Atribut | Keterangan |
|---------|-----------|
| **Jenis data** | Peta Wilayah Sungai (WS) berkoordinat |
| **Format** | PDF georeferensi |
| **Penggunaan** | Basemap di QGIS, Global Mapper, ArcGIS |
| **Cakupan** | 35 wilayah seluruh Indonesia |
| **Sumber** | Kementerian PUPR / BIG |
| **Diperbarui** | April 2026 |

<small>*Data bersumber dari instansi pemerintah dan bersifat terbuka. Harap cantumkan sumber bila digunakan dalam publikasi ilmiah atau laporan teknis.*</small>

---

📬 Ada pertanyaan? [Hubungi saya](/#contact).

← [Kembali ke Database Utama](/post/database/)
