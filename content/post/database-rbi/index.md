---
title: "Database RBI — Rupa Bumi Indonesia"
subtitle: "Data vektor Rupa Bumi Indonesia (RBI) skala 1:25.000 dari Badan Informasi Geospasial (BIG)"
date: 2026-05-06
lastmod: 2026-05-06
draft: false
featured: false
---

← [Kembali ke Database Utama](/post/database/)

---

Data vektor **Rupa Bumi Indonesia (RBI)** skala 1:25.000 dari **Badan Informasi Geospasial (BIG)**, dikelompokkan per wilayah kepulauan. Setiap folder berisi layer tematik lengkap siap digunakan di QGIS, ArcGIS, atau Global Mapper.

<style>
.rbi-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.8rem;
  margin: 1.2rem 0 2rem 0;
}
.rbi-info-box {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 6px;
  padding: 0.7rem 1rem;
  font-size: 0.8rem;
}
.rbi-info-label { color: #888; font-size: 0.7rem; margin-bottom: 0.2rem; }
.rbi-info-value { color: #EEF4FA; font-weight: 600; }

.rbi-table-wrap {
  overflow-x: auto;
  margin: 1rem 0;
}
.rbi-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}
.rbi-table th {
  text-align: left;
  padding: 0.65rem 1rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: #00C9B1;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-bottom: 2px solid rgba(0,201,177,0.2);
  white-space: nowrap;
}
.rbi-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  vertical-align: middle;
}
.rbi-table tr:last-child td { border-bottom: none; }
.rbi-table tr:hover td { background: rgba(255,255,255,0.03); }
.rbi-table td:first-child { font-weight: 600; color: #EEF4FA; white-space: nowrap; }
.rbi-table td:nth-child(2) { color: #7B9EC0; font-size: 0.8rem; }
.rbi-table td:nth-child(3) { color: #7B9EC0; font-size: 0.8rem; white-space: nowrap; }
.dl-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.9rem;
  border-radius: 5px;
  background: rgba(33,150,243,0.15);
  color: #64B5F6 !important;
  text-decoration: none !important;
  font-size: 0.78rem;
  font-weight: 600;
  border: 1px solid rgba(33,150,243,0.25);
  transition: background 0.2s, transform 0.15s;
  white-space: nowrap;
}
.dl-btn:hover {
  background: rgba(33,150,243,0.28);
  transform: translateY(-1px);
  text-decoration: none !important;
}
.dl-btn-soon {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.9rem;
  border-radius: 5px;
  background: rgba(255,255,255,0.05);
  color: #888 !important;
  font-size: 0.78rem;
  font-style: italic;
  border: 1px solid rgba(255,255,255,0.08);
  white-space: nowrap;
}
.size-badge {
  display: inline-block;
  font-family: monospace;
  font-size: 0.72rem;
  padding: 0.1rem 0.45rem;
  border-radius: 3px;
  background: rgba(255,255,255,0.06);
  color: #888;
}
</style>

## ℹ️ Informasi Dataset

<div class="rbi-info-grid">
  <div class="rbi-info-box">
    <div class="rbi-info-label">Skala</div>
    <div class="rbi-info-value">1 : 25.000</div>
  </div>
  <div class="rbi-info-box">
    <div class="rbi-info-label">Format</div>
    <div class="rbi-info-value">Shapefile (.shp)</div>
  </div>
  <div class="rbi-info-box">
    <div class="rbi-info-label">Total Ukuran</div>
    <div class="rbi-info-value">~21 GB</div>
  </div>
  <div class="rbi-info-box">
    <div class="rbi-info-label">Sumber</div>
    <div class="rbi-info-value">BIG Indonesia</div>
  </div>
  <div class="rbi-info-box">
    <div class="rbi-info-label">Sistem Koordinat</div>
    <div class="rbi-info-value">WGS 84 / UTM</div>
  </div>
  <div class="rbi-info-box">
    <div class="rbi-info-label">Software</div>
    <div class="rbi-info-value">QGIS · ArcGIS · Global Mapper</div>
  </div>
</div>

**Layer yang tersedia di setiap folder:**
Jaringan jalan · Jaringan sungai · Batas administrasi · Garis pantai · Kontur · Bangunan & fasilitas · Tutupan lahan

---

## 🗺️ Unduh per Wilayah

<div class="rbi-table-wrap">
<table class="rbi-table">
  <thead>
    <tr>
      <th>Wilayah</th>
      <th>Provinsi yang Tercakup</th>
      <th>Ukuran</th>
      <th>Unduh</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>🏝️ Jabar, DKI & Banten</td>
      <td>Jawa Barat, DKI Jakarta, Banten</td>
      <td><span class="size-badge">2.2 GB</span></td>
      <td><span class="dl-btn-soon">Segera hadir</span></td>
    </tr>
    <tr>
      <td>🏝️ Jawa Tengah & DIY</td>
      <td>Jawa Tengah, D.I. Yogyakarta</td>
      <td><span class="size-badge">1.8 GB</span></td>
      <td><span class="dl-btn-soon">Segera hadir</span></td>
    </tr>
    <tr>
      <td>🏝️ Jawa Timur</td>
      <td>Jawa Timur</td>
      <td><span class="size-badge">113 MB</span></td>
      <td><span class="dl-btn-soon">Segera hadir</span></td>
    </tr>
    <tr>
      <td>🏝️ Sumatera & Kepri</td>
      <td>Aceh, Sumut, Sumbar, Riau, Jambi, Bengkulu, Sumsel, Lampung, Kepulauan Riau, Babel</td>
      <td><span class="size-badge">4.1 GB</span></td>
      <td><span class="dl-btn-soon">Segera hadir</span></td>
    </tr>
    <tr>
      <td>🏝️ Kalimantan</td>
      <td>Kalbar, Kalteng, Kalsel, Kaltim, Kaltara</td>
      <td><span class="size-badge">7.2 GB</span></td>
      <td><span class="dl-btn-soon">Segera hadir</span></td>
    </tr>
    <tr>
      <td>🏝️ Sulawesi</td>
      <td>Sulut, Gorontalo, Sulteng, Sulbar, Sulsel, Sultra</td>
      <td><span class="size-badge">2.0 GB</span></td>
      <td><span class="dl-btn-soon">Segera hadir</span></td>
    </tr>
    <tr>
      <td>🏝️ Papua</td>
      <td>Papua Barat, Papua, Papua Selatan, Papua Tengah, Papua Pegunungan, Papua Barat Daya</td>
      <td><span class="size-badge">1.2 GB</span></td>
      <td><span class="dl-btn-soon">Segera hadir</span></td>
    </tr>
    <tr>
      <td>🏝️ Nusa Tenggara, Bali & Maluku</td>
      <td>Bali, NTB, NTT, Maluku, Maluku Utara</td>
      <td><span class="size-badge">2.2 GB</span></td>
      <td><span class="dl-btn-soon">Segera hadir</span></td>
    </tr>
  </tbody>
</table>
</div>

<small>*Sumber: Badan Informasi Geospasial (BIG). Data RBI juga dapat diakses melalui [Tanahair BIG](https://tanahair.indonesia.go.id). Total ukuran ~21 GB — unduh hanya wilayah yang dibutuhkan.*</small>

---

## 🤝 Berkontribusi untuk Database Ini

Database ini dibangun dari pengalaman kerja lapangan dan semangat berbagi untuk komunitas hidrologi Indonesia. Jika kamu memiliki data yang belum tersedia di sini dan ingin berkontribusi, saya sangat terbuka!

**Data yang dibutuhkan antara lain:**
- Data curah hujan stasiun observasi (BMKG, BWS, atau swasta)
- Data debit sungai / tinggi muka air (AWLR)
- Peta DAS, WS, atau jaringan sungai regional
- Peta geologi, tutupan lahan, atau jenis tanah

> 💬 Hubungi melalui halaman **[Kontak](/#contact)** atau langsung via **[Discord](https://discord.gg/za2KPWJFKG)**. Kontributor akan dicantumkan sebagai sumber data.

← [Kembali ke Database Utama](/post/database/)
