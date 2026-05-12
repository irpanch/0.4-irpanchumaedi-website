---
title: "Download Data Hujan GPM IMERG dengan NASA Giovanni"
date: 2026-05-12
tags: ["GPM", "IMERG", "Giovanni", "data hujan", "satelit"]
categories: ["Tutorial", "Data Hujan"]
summary: "Panduan langkah demi langkah mengunduh data curah hujan GPM IMERG dari NASA Giovanni — gratis, global, dan historis hingga 25 tahun ke belakang."
---

## Mengapa GPM IMERG?

Ketika data stasiun hujan BMKG tidak tersedia atau tidak mencukupi untuk area studi kamu, **GPM IMERG** adalah solusi terbaik yang tersedia secara gratis. GPM (*Global Precipitation Measurement*) adalah misi satelit bersama NASA dan JAXA yang menghasilkan estimasi curah hujan global setiap 30 menit dengan resolusi spasial 0.1° × 0.1° (~11 km di ekuator).

**Keunggulan GPM IMERG:**
- ✅ Cakupan global termasuk seluruh wilayah Indonesia
- ✅ Data historis tersedia sejak **Juni 1998** (hampir 27 tahun)
- ✅ Gratis tanpa registrasi berbayar
- ✅ Tersedia dalam resolusi waktu 30 menit, harian, dan bulanan
- ✅ Produk Final Run sudah dikoreksi dengan data gauge (stasiun hujan)

**Keterbatasan yang perlu diketahui:**
- ❌ Bukan pengukuran langsung — tetap ada bias, terutama di area pegunungan
- ❌ Resolusi spasial ~11 km mungkin kurang detail untuk DAS kecil (<50 km²)
- ❌ Memerlukan validasi dengan data stasiun sebelum digunakan untuk desain

---

## Mengenal Produk GPM IMERG

Sebelum download, penting memahami tiga varian produk IMERG:

| Produk | Latensi | Koreksi Gauge | Rekomendasi Penggunaan |
|--------|---------|---------------|----------------------|
| **Early Run** | ~4 jam | ❌ Tidak | Monitoring banjir real-time |
| **Late Run** | ~12 jam | Sebagian | Operasional jangka pendek |
| **Final Run** | ~3.5 bulan | ✅ Ya | **Studi hidrologi & AMDAL** ✓ |

> **Untuk keperluan AMDAL, kajian hidrologi, dan HEC-HMS → selalu gunakan Final Run (V07B).**

---

## Platform Download: NASA Giovanni

**NASA Giovanni** (Geospatial Interactive Online Visualization ANd aNalysis) adalah antarmuka web resmi NASA untuk eksplorasi dan download data geosains termasuk GPM IMERG.

🔗 **URL:** [https://giovanni.gsfc.nasa.gov/giovanni/](https://giovanni.gsfc.nasa.gov/giovanni/)

Giovanni memungkinkan kamu mengunduh data dalam format NetCDF atau ASCII langsung dari browser — tanpa perlu coding atau command line.

---

## Langkah-Langkah Download GPM IMERG di Giovanni

### Langkah 1: Buka Giovanni dan Login

1. Buka [https://giovanni.gsfc.nasa.gov/giovanni/](https://giovanni.gsfc.nasa.gov/giovanni/)
2. Klik **Sign In** di pojok kanan atas
3. Gunakan akun **NASA Earthdata** (gratis). Jika belum punya, daftar di [https://urs.earthdata.nasa.gov/](https://urs.earthdata.nasa.gov/)

> **Tips:** Pastikan kamu sudah mengaktifkan aplikasi Giovanni di profil Earthdata kamu. Masuk ke profil Earthdata → Applications → Authorized Apps → cari dan authorize Giovanni.

---

### Langkah 2: Pilih Tipe Analisis

Di panel kiri atas, pilih tipe visualisasi/output yang diinginkan:

- **Time Series, Area Averaged** → untuk mendapatkan satu nilai rata-rata area per waktu (paling umum untuk hidrologi)
- **Map, Averaged** → untuk melihat distribusi spasial rata-rata
- **Time Averaged Map** → peta rata-rata untuk periode tertentu

Untuk download data deret waktu (time series) curah hujan harian ke R atau Excel → pilih **"Time Series, Area Averaged"**.

---

### Langkah 3: Pilih Variabel Data

1. Di kotak pencarian variabel, ketik: `IMERG precipitation`
2. Dari hasil pencarian, pilih:

   ```
   GPM IMERG Final Precipitation L3 1 day 0.1 degree x 0.1 degree V07
   Variable: precipitation
   ```

   Nama lengkap: `GPM_3IMERGDF_07/precipitation`

3. Klik **[+]** atau **Add** untuk menambahkan variabel ke daftar aktif.

> **Catatan:** Produk dengan label "**F**" (Final), "**D**" (Daily) adalah yang kita gunakan. Hindari produk Early ("E") atau Late ("L") untuk studi historis.

---

### Langkah 4: Tentukan Rentang Waktu

Di panel **Date Range**, masukkan periode analisis:

- **Start Date:** Sesuaikan kebutuhan (misal: `2000-01-01` atau `1998-06-01` untuk data paling awal)
- **End Date:** Tanggal terakhir yang diinginkan

> **Untuk studi AMDAL:** Minimal 10 tahun data. Disarankan mengambil **20 tahun** untuk analisis frekuensi yang representatif.

---

### Langkah 5: Tentukan Area Studi (Bounding Box)

Di panel **Bounding Box**, masukkan koordinat area studi dalam format:

```
West | South | East | North
```

**Contoh untuk beberapa kota di Indonesia:**

| Lokasi | West | South | East | North |
|--------|------|-------|------|-------|
| Banjarmasin | 114.0 | -3.8 | 115.0 | -3.0 |
| Pulau Obi (Maluku Utara) | 127.3 | -1.8 | 128.1 | -1.2 |
| Kutai Barat (Kaltim) | 114.5 | -0.5 | 115.5 | 0.5 |
| Bandung | 107.3 | -7.2 | 107.8 | -6.7 |

> **Tips:** Gunakan Google Maps atau QGIS untuk mendapatkan koordinat bounding box area DAS kamu secara akurat. Tambahkan buffer ~0.5° dari batas DAS untuk memastikan cakupan penuh.

---

### Langkah 6: Jalankan Analisis

Klik tombol **"Plot and Download"** (tombol hijau di bawah panel kiri).

Giovanni akan memproses permintaan dan menampilkan:
- Grafik time series interaktif di panel kanan
- Informasi metadata variabel

Proses ini bisa memakan waktu **beberapa menit** tergantung panjang periode yang diminta.

---

### Langkah 7: Download Data

Setelah grafik muncul:

1. Scroll ke bawah grafik, cari tombol **"Download"** atau ikon unduh
2. Pilih format file:
   - **NetCDF (.nc4)** → untuk analisis lanjutan di R atau Python
   - **ASCII (.csv / .txt)** → langsung bisa dibuka di Excel

> **Rekomendasi:** Download dalam format **ASCII** jika hanya butuh time series untuk Excel atau R. Download **NetCDF** jika butuh data grid spasial untuk pemetaan di QGIS.

---

## Alternatif: Download via NASA GES DISC (Data Lebih Lengkap)

Untuk download dalam jumlah besar atau format file-per-hari (granule), gunakan **NASA GES DISC**:

🔗 [https://disc.gsfc.nasa.gov/datasets/GPM_3IMERGDF_07/summary](https://disc.gsfc.nasa.gov/datasets/GPM_3IMERGDF_07/summary)

Metode download via GES DISC:
1. Cari dataset `GPM_3IMERGDF_07`
2. Klik **"Online Archive"**
3. Navigasi ke folder tahun/bulan yang diinginkan
4. Download file `.HDF5` atau gunakan **wget script** yang disediakan

---

## Struktur Data yang Diunduh (Format ASCII)

Data time series dari Giovanni akan terlihat seperti ini:

```
# Units: mm/day
# Variable: GPM IMERG Final Precipitation
# Bounding Box: W=114.0, S=-3.8, E=115.0, N=-3.0
# Start: 2000-01-01, End: 2024-12-31
time, precipitation
2000-01-01, 8.45
2000-01-02, 0.12
2000-01-03, 15.73
...
```

Kolom pertama adalah tanggal, kolom kedua adalah curah hujan dalam satuan **mm/hari**.

---

## Langkah Selanjutnya

Setelah data berhasil diunduh, langkah berikutnya adalah:

1. **Rekap & Visualisasi** → Susun data ke Excel atau proses dengan R
2. **Validasi** → Bandingkan dengan data stasiun BMKG terdekat (jika tersedia)
3. **Analisis Frekuensi** → Hitung curah hujan rencana untuk berbagai kala ulang

> Lihat tutorial selanjutnya: **Visualisasi Data Hujan dengan R & ggplot2** untuk mengolah data GPM IMERG yang sudah diunduh.

---

## Referensi

- Huffman, G.J., et al. (2023). *GPM IMERG Final Precipitation L3 1 day 0.1 degree x 0.1 degree V07*. Goddard Earth Sciences Data and Information Services Center (GES DISC). [https://doi.org/10.5067/GPM/IMERGDF/DAY/07](https://doi.org/10.5067/GPM/IMERGDF/DAY/07)
- NASA Giovanni: [https://giovanni.gsfc.nasa.gov/giovanni/](https://giovanni.gsfc.nasa.gov/giovanni/)
- NASA GES DISC: [https://disc.gsfc.nasa.gov/](https://disc.gsfc.nasa.gov/)
