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

Tiap folder pulau berisi peta per provinsi **dan** peta sungai-sungai yang berada di wilayah tersebut.

<style>
.pulau-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}
.pulau-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.pulau-card:hover {
  border-color: rgba(33,150,243,0.4);
  box-shadow: 0 4px 16px rgba(33,150,243,0.1);
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
.pulau-header:hover { background: rgba(255,255,255,0.04); }
.pulau-header.open { border-bottom-color: rgba(33,150,243,0.3); }
.pulau-icon { font-size: 1.4rem; }
.pulau-info { flex: 1; }
.pulau-name { font-weight: 700; font-size: 0.95rem; }
.pulau-count { font-size: 0.72rem; color: #888; margin-top: 0.1rem; }
.pulau-arrow { font-size: 0.8rem; color: #888; transition: transform 0.3s; }
.pulau-header.open .pulau-arrow { transform: rotate(180deg); }
.pulau-body { display: none; padding: 0.8rem 1rem; }
.pulau-body.open { display: block; }
.provinsi-list { list-style: none; margin: 0 0 0.8rem 0; padding: 0; }
.provinsi-list li {
  padding: 0.3rem 0;
  font-size: 0.82rem;
  color: #aaa;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.provinsi-list li:last-child { border-bottom: none; }
.dl-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.55rem 1rem;
  border-radius: 5px;
  background: rgba(33,150,243,0.15);
  color: #64B5F6 !important;
  text-decoration: none !important;
  font-size: 0.82rem;
  font-weight: 600;
  transition: background 0.2s, transform 0.15s;
  margin-top: 0.5rem;
  border: 1px solid rgba(33,150,243,0.25);
}
.dl-btn:hover {
  background: rgba(33,150,243,0.28);
  transform: translateY(-1px);
  text-decoration: none !important;
}
</style>

## 🗺️ Unduh per Pulau

<div class="pulau-grid">

<div class="pulau-card">
<div class="pulau-header" onclick="togglePulau(this)">
  <span class="pulau-icon">🏝️</span>
  <div class="pulau-info">
    <div class="pulau-name">Pulau Jawa</div>
    <div class="pulau-count">Peta provinsi + sungai · PDF georeferensi</div>
  </div>
  <span class="pulau-arrow">▼</span>
</div>
<div class="pulau-body">
  <ul class="provinsi-list">
    <li>📄 Jawa Barat & DKI Jakarta</li>
    <li>📄 Jawa Tengah & D.I. Yogyakarta</li>
    <li>📄 Jawa Timur</li>
    <li>📄 Banten</li>
    <li>📄 Sungai Kepulauan Seribu</li>
    <li>📄 Sungai Kepulauan Karimunjawa</li>
  </ul>
  <a class="dl-btn" href="https://1drv.ms/f/c/22f5ef4527203c63/IgA-VNeVfcJTTKtbfWWBS67OAa7gFFT9UwTob8QaCUy2tUE?e=KtcEGY" target="_blank">⬇ Unduh Folder Pulau Jawa</a>
</div>
</div>

<div class="pulau-card">
<div class="pulau-header" onclick="togglePulau(this)">
  <span class="pulau-icon">🏝️</span>
  <div class="pulau-info">
    <div class="pulau-name">Pulau Kalimantan</div>
    <div class="pulau-count">Peta provinsi + sungai · PDF georeferensi</div>
  </div>
  <span class="pulau-arrow">▼</span>
</div>
<div class="pulau-body">
  <ul class="provinsi-list">
    <li>📄 Kalimantan Barat</li>
    <li>📄 Kalimantan Tengah</li>
    <li>📄 Kalimantan Selatan</li>
    <li>📄 Kalimantan Timur & Utara</li>
    <li>📄 Sungai Segah Berau</li>
  </ul>
  <a class="dl-btn" href="https://1drv.ms/f/c/22f5ef4527203c63/IgBhvq098MeeTblqDkJUzBcuAUWI3cag3KvJJx98Z-64N4U?e=mKmOgJ" target="_blank">⬇ Unduh Folder Pulau Kalimantan</a>
</div>
</div>

<div class="pulau-card">
<div class="pulau-header" onclick="togglePulau(this)">
  <span class="pulau-icon">🏝️</span>
  <div class="pulau-info">
    <div class="pulau-name">Pulau Nusa Tenggara, Bali & Maluku</div>
    <div class="pulau-count">Peta provinsi + sungai · PDF georeferensi</div>
  </div>
  <span class="pulau-arrow">▼</span>
</div>
<div class="pulau-body">
  <ul class="provinsi-list">
    <li>📄 Bali</li>
    <li>📄 Nusa Tenggara Barat</li>
    <li>📄 NTT</li>
    <li>📄 Maluku</li>
    <li>📄 Maluku Utara</li>
    <li>📄 Sungai Bali-Penda, Lombok, Sumbawa</li>
    <li>📄 Sungai Benanain, Sumba, Omba, dll</li>
    <li>📄 Sungai Ambon-Seram, Buru, Kei-Aru, dll</li>
  </ul>
  <a class="dl-btn" href="https://1drv.ms/f/c/22f5ef4527203c63/IgCRnJLtrjInTpgDj_29ufo8AaMT070ejJn9eqaqMifD8mg?e=9wFr1W" target="_blank">⬇ Unduh Folder Nusa Tenggara, Bali & Maluku</a>
</div>
</div>

<div class="pulau-card">
<div class="pulau-header" onclick="togglePulau(this)">
  <span class="pulau-icon">🏝️</span>
  <div class="pulau-info">
    <div class="pulau-name">Pulau Papua</div>
    <div class="pulau-count">Peta provinsi + sungai · PDF georeferensi</div>
  </div>
  <span class="pulau-arrow">▼</span>
</div>
<div class="pulau-body">
  <ul class="provinsi-list">
    <li>📄 Papua Barat</li>
    <li>📄 Papua (termasuk pemekaran)</li>
    <li>📄 Sungai Einlanden-Digul-Eikuma</li>
    <li>📄 Sungai Kamunda Sebyar</li>
    <li>📄 Sungai Mamberand-Tami-Apauvar</li>
    <li>📄 Sungai Wapoga-Mimika</li>
  </ul>
  <a class="dl-btn" href="https://1drv.ms/f/c/22f5ef4527203c63/IgDQfUcNLQgwRLJ4J1kdm22HAXUY9xvnYr9CfVMgdgWmt60?e=qz5VIk" target="_blank">⬇ Unduh Folder Pulau Papua</a>
</div>
</div>

<div class="pulau-card">
<div class="pulau-header" onclick="togglePulau(this)">
  <span class="pulau-icon">🏝️</span>
  <div class="pulau-info">
    <div class="pulau-name">Pulau Sulawesi</div>
    <div class="pulau-count">Peta provinsi + sungai · PDF georeferensi</div>
  </div>
  <span class="pulau-arrow">▼</span>
</div>
<div class="pulau-body">
  <ul class="provinsi-list">
    <li>📄 Sulawesi Utara</li>
    <li>📄 Gorontalo</li>
    <li>📄 Sulawesi Tengah</li>
    <li>📄 Sulawesi Barat</li>
    <li>📄 Sulawesi Selatan</li>
    <li>📄 Sulawesi Tenggara</li>
  </ul>
  <a class="dl-btn" href="https://1drv.ms/f/c/22f5ef4527203c63/IgCslAFkvEwbSLz-uxtpZlLrAfns8fumePp1yc9eW93zDzE?e=uDFfEO" target="_blank">⬇ Unduh Folder Pulau Sulawesi</a>
</div>
</div>

<div class="pulau-card">
<div class="pulau-header" onclick="togglePulau(this)">
  <span class="pulau-icon">🏝️</span>
  <div class="pulau-info">
    <div class="pulau-name">Pulau Sumatera, Kepri & Bangka Belitung</div>
    <div class="pulau-count">Peta provinsi + sungai · PDF georeferensi</div>
  </div>
  <span class="pulau-arrow">▼</span>
</div>
<div class="pulau-body">
  <ul class="provinsi-list">
    <li>📄 Aceh</li>
    <li>📄 Sumatera Utara</li>
    <li>📄 Sumatera Barat</li>
    <li>📄 Riau</li>
    <li>📄 Jambi</li>
    <li>📄 Bengkulu</li>
    <li>📄 Sumatera Selatan</li>
    <li>📄 Lampung</li>
    <li>📄 Kepulauan Riau</li>
    <li>📄 Bangka & Belitung</li>
    <li>📄 Sungai Kepulauan Riau, Bangka, Belitung</li>
  </ul>
  <a class="dl-btn" href="https://1drv.ms/f/c/22f5ef4527203c63/IgCEV37sQ-_iQ7HDyuEppWhgAbn7AmYCa05QasfOcaMdjTM?e=GpE2LL" target="_blank">⬇ Unduh Folder Sumatera, Kepri & Bangka Belitung</a>
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
| **Cakupan** | Seluruh Indonesia (6 kelompok pulau) |
| **Sumber** | Kementerian PUPR / BIG |
| **Diperbarui** | Mei 2026 |

<small>*Data bersumber dari instansi pemerintah dan bersifat terbuka. Harap cantumkan sumber bila digunakan dalam publikasi ilmiah atau laporan teknis.*</small>

---

---

## 🤝 Berkontribusi untuk Database Ini

Database ini dibangun dari pengalaman kerja lapangan dan semangat berbagi untuk komunitas hidrologi Indonesia. Jika kamu memiliki data yang belum tersedia di sini dan ingin berkontribusi, saya sangat terbuka!

**Data yang dibutuhkan antara lain:**
- Peta DAS atau WS wilayah yang belum tercakup
- Data curah hujan stasiun observasi
- Data debit sungai (AWLR)
- Peta geologi, tutupan lahan, atau tanah regional

> 💬 Hubungi saya melalui halaman **[Kontak](/#contact)** atau langsung via **[Discord](https://discord.gg/za2KPWJFKG)** untuk berdiskusi lebih lanjut. Kontributor akan dicantumkan sebagai sumber data.

← [Kembali ke Database Utama](/post/database/)
