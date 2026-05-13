---
title: "Analisa Hidrologi - Kota Banjarmasin (NUFReP)"
date: 2026-04-25
summary: "Kota banjarmasin merupakan daerah yang rawan banjir. Keterbatasan data di tengah lokasi yang rawan bencana menjadikan tantangan tersendiri untuk memperoleh hasil analisa yang relevan dan akurat."
tags:
- Hidrologi
- SWMM
- Data_satelit
---

# Umum
Pekerjaan ini merupakan bagian dari proyek National Urban Flood Resilience Project (NUFReP), program kerja sama antara Pemerintah Republik Indonesia dan Bank Dunia dalam rangka meningkatkan ketahanan perkotaan terhadap banjir. Salah satu komponen strategis adalah pembangunan Wilayah Pengendalian Genangan (WPG) di kawasan Sungai Sutoyo S, Banjarmasin, Kalimantan Selatan.
Kawasan WPG Sungai Sutoyo S mencakup dua sub-DAS utama: Sub-DAS Pelambuan (116,35 Ha) dan Sub-DAS Jafri Zamzam (342,49 Ha), dengan total luas catchment 458,84 Ha. Kawasan ini secara rutin terdampak banjir yang merugikan masyarakat, infrastruktur, dan kegiatan ekonomi.
Analisis hidrologi yang komprehensif menjadi pondasi perencanaan sistem drainase dan pengendalian banjir, mencakup analisis frekuensi hujan, penyusunan kurva IDF, delineasi catchment, dan pemodelan hidrograf desain menggunakan SWMM.


## Metodologi

Analisis hidrologi dilaksanakan mengikuti alur kerja terstruktur enam tahap, dari pengumpulan data hingga hidrograf desain.

{{< figure src="alur_metodologi.png" caption="Gambar 1. Alur kerja analisis hidrologi enam tahap"width="100%" >}}

Secara keseluruhan, analisa hidrologi dilakukan dengan melalui enam tahapan. Mulai dari pengumpulan data, koreksi bias GPM, hingga hidrograf desain. Keenam tahapan tersebut secara rinci adalah sebagai berikut:

**Tahap A** — Pengumpulan Data: Data hujan GPM IMERG V07, ground station BMKG (2 stasiun), DEM UAV 2026, dan peta tutupan lahan ESRI Land Cover

**Tahap B** — Koreksi Bias GPM: Evaluasi 4 metode; dipilih Year-Specific Scaling (M4) berdasarkan metrik validasi terbaik

**Tahap C** — Analisis Frekuensi & IDF: Annual Maximum Series (AMS), uji statistik SNI 7746:2012, distribusi Log-Pearson III, dan kurva IDF dengan pola jam-jaman Banjarmasin

**Tahap D** — Delineasi Catchment: Pengolahan DEM UAV 2026 untuk delineasi 12 sub-DAS.

**Tahap E** — Pemodelan SWMM: Model limpasan dengan SCS Curve Number dan IDF sebagai input hujan

**Tahap F** — Hidrograf Desain: Debit puncak Q2, Q5, Q10, Q20 per sub-DAS sebagai input pemodelan hidraulika HEC-RAS


## Perangkat Lunak
- R (tidyverse, readxl, sf, openxlsx, QMAP) — analisis statistik dan koreksi bias
- QGIS 3.40.4 + WhiteboxTools — pengolahan DEM dan delineasi catchment
- EPA SWMM — pemodelan limpasan permukaan

# Pengumpulan Data

## Inventarisasi Stasiun Hujan
Terdapat 15 stasiun hujan di sekitar area WPG. Duabelas diantaranya bersumber dari WS Kalimantan III, sedangkan tiga stasiun hujan bersumber dari BMKG. Gambar matriks ketersediaan tiap stasiun hujan serta jumlah data valid ditampilkan pada tabel berikut.

{{< figure src="matriks_ketersediaan_data.png" caption="Gambar 2. Matriks Ketersediaan Data Hujan Stasiun di Sekitar WPG Banjarmasin "width="100%" >}}

{{< figure src="jumlah_data_valid.png" caption=" Gambar 3. Jumlah Data Valid di Tiap Stasiun Hujan "width="100%" >}}

Berdasarkan SNI 2415:2016 (minimal 20 tahun data), hanya 7 stasiun memenuhi syarat. Dari 7 stasiun tersebut, 2 lokasi terdekat adalah Stasiun BMKG Syamsuddin Noor (33,7 km) dan BMKG Kalimantan Selatan (25 km).

<center><small><b> Tabel 1 Inventarisasi Stasiun Hujan di Sekitar WPG Sungai Sutoyo S Banjarmasin </b></small></center>

| No | Stasiun | Wilayah | Sumber | Jarak (Km) | Mulai | Akhir | n | CH Max | Status SNI |
|----|---------|---------|--------|-----------|-------|-------|---|--------|------------|
| 1 | Padang Panjang | Kab. Banjar | BWS Kal III/PSDA | 42 | 2022 | 2025 | 4 | 135 | <10 th (Tidak Layak) |
| 2 | Ati'im | Kab. Banjar | BWS Kal III/PSDA | 63.2 | 2022 | 2025 | 3 | 128 | <10 th (Tidak Layak) |
| 3 | Banjarmasin | Kota Banjarmasin | BWS Kal III/PSDA | 2.8 | 2022 | 2026 | 2 | 135.8 | <10 th (Tidak Layak) |
| 4 | Gudang Tengah | Kab. Banjar | BWS Kal III/PSDA | 15.6 | 2020 | 2025 | 3 | 307.5 | <10 th (Tidak Layak) |
| 5 | Aluh-Aluh | Kab. Banjar | BWS Kal III/PSDA | 16.4 | 2022 | 2025 | 3 | 98.8 | <10 th (Tidak Layak) |
| 6 | Astambul | Kab. Banjar | BWS Kal III/PSDA | 28.9 | 2022 | 2025 | 1 | 74.8 | <10 th (Tidak Layak) |
| 7 | Mengkauk | Kab. Banjar | BWS Kal III/PSDA | 60.8 | 2022 | 2025 | 3 | 102.2 | <10 th (Tidak Layak) |
| 8 | Batu Tangga | Hulu Sungai Tengah | BWS Kal III/PSDA | 137 | 1995 | 2025 | 28 | 153 | 20-29 th (Cukup) |
| 9 | Intangan | Hulu Sungai Tengah | BWS Kal III/PSDA | 123.7 | 1995 | 2025 | 26 | 188 | 20-29 th (Cukup) |
| 10 | Kambat | Hulu Sungai Tengah | BWS Kal III/PSDA | 122.3 | 1995 | 2025 | 23 | 368 | 20-29 th (Cukup) |
| 11 | Mangunang | Hulu Sungai Tengah | BWS Kal III/PSDA | 116.6 | 1995 | 2025 | 26 | 142 | 20-29 th (Cukup) |
| 12 | Mo'ui | Hulu Sungai Tengah | BWS Kal III/PSDA | 110.9 | 1995 | 2025 | 22 | 180 | 20-29 th (Cukup) |
| 13 | Kal-Sel (BMKG) | Kab. Banjarbaru | BMKG | 25 | 1998 | 2025 | 27 | 255.3 | 20-29 th (Cukup) |
| 14 | Syamsuddin Noor | Kota Banjarbaru | BMKG | 33.7 | 1998 | 2025 | 27 | 249 | 20-29 th (Cukup) |
| 15 | Surgi Mufti | Kota Banjarmasin | BMKG | 3.5 | 1996 | 2014 | 19 | 168 | <20 th (Kurang) |

<small>*Keterangan: Stasiun dengan status ‘Tidak Layak’ memiliki data kurang dari 10 tahun sehingga tidak memenuhi persyaratan SNI 2415:2016. Stasiun ‘Cukup’ memiliki 20–29 tahun data*</small>

## Plotting Jarak Tapak Proyek Terhadap Lokasi Stasiun Hujan
Selain terhadap kelengkapan data hujan, jarak stasiun hujan juga sangat berpengaruh terhadap analisa yang akan digunakan. Semakin dekat maka akan semakin baik. Hasil plotting bisa dilihat sebagai berikut

{{< figure src="peta_lokasi_sta_hujan.png" caption="Gambar 4. Peta Lokasi Stasiun Hujan dan Area WPG Soetoyo "width="80%" >}}

Dari 15 stasiun tersebut hanya ada 2 Lokasi yang paling lengkap dan paling dekat, yaitu Stasiun BMKG Syamsuddin Noor dan Stasiun BMKG Kalimantan Selatan.
Meskipun begitu, karena jarak Lokasi stasiun hujan terhadap area pekerjaan masih sekitar 25 – 33 Km maka diperlukan data satelit untuk bisa menghitung curah hujan spesifik yang berada di area pekerjaan.


# Tambahan data Satelit (GPM) 
Data GPM IMERG V07 dipilih karena menggunakan radar presipitasi aktif (DPR, dual frequency precipitation radar) sebagai kalibrator, menghasilkan akurasi deteksi kejadian hujan harian yang lebih baik di wilayah tropis dibandingkan produk berbasis inframerah seperti CHIRPS atau PERSIANN. Validasi independen di Kalimantan dan wilayah Indonesia lainnya menunjukkan performa konsisten pada skala harian dengan nilai RMSE dan CSI yang kompetitif. Selain itu, GPM IMERG telah diadopsi secara resmi oleh BNPB dalam sistem inaRISK sebagai referensi klimatologis nasional. Overlay grid GPM dengan lokasi pekerjaan dan stasiun BMKG sebagai referensi diperlihatkan sebagai berikut.

{{< figure src="grid-gpm.png" caption="Gambar 5. Overlay Lokasi WPG dengan Pos Hujan dan Grid GPM "width="80%" >}}

Dari hasil plotting time series data tahunan dan bulanan, data hujan satelit memiliki trend yang serupa. Namun jika dibandingkan HHMT, maka data satelit hampir semua nya underestimate. Terutama di tahun 2021 Ketika terjadi hujan ekstrim di dua stasiun BMKG. Untuk itu diperlukan **koreksi bias**.

{{< figure src="plot-data-bulanan.png" caption="Gambar 6. Plot Data Bulanan antara Pos Hujan BMKG dan Grid GPM "width="80%" >}}

{{< figure src="plot-data-tahunan.png" caption="Gambar 7. Plot Data Bulanan antara Pos Hujan BMKG dan Grid GPM "width="80%" >}}

{{< figure src="plot-data-hhmt.png" caption="Gambar 8. Plot Data HHMT antara Pos Hujan BMKG dan Grid GPM "width="80%" >}}

## Koreksi Bias

Data satelit GPM IMERG mengandung bias sistematis dibandingkan pengukuran ground station. Koreksi bias difokuskan pada Hujan Harian Maksimum Tahunan (HHMT) — parameter utama analisis frekuensi banjir. Empat metode koreksi (monthly scaling (M1), HHMT direct scaling (M2), quantile mapping (M3), sampai year-specific scalling (M4)) dievaluasi menggunakan data 1998–2025 dan tujuh metriks validasi (PBIAS, RMSE, MAE, R, R2, NSE, dan KGE) dijadikan acuan sebagai filter metode koreksi mana yang paling baik.

Validasi data curah hujan satelit tidak dapat dilakukan dengan satu metrik tunggal karena setiap metrik mengukur dimensi kesalahan yang berbeda. Penggunaan beberapa metrik secara bersamaan memastikan tidak ada aspek kualitas data yang terlewat dari evaluasi. Tujuh metrik yang digunakan dalam proyek ini mencakup empat dimensi utama:

<center><small><b> Tabel 2 Empat dimensi evaluasi dan metrik terkait</b> </small></center>

| **Dimensi**         | **Metrik** | **Aspek yang Diukur**                                                |
| ------------------- | ---------- | -------------------------------------------------------------------- |
| **Bias Sistematik** | PBIAS      | Apakah GPM over- atau underestimate secara konsisten?                |
| **Magnitudo Error** | RMSE, MAE  | Seberapa besar rata-rata kesalahan absolut antara GPM dan observasi? |
| **Korelasi Linear** | R, R²      | Seberapa kuat hubungan linear antara GPM dan observasi?              |
| **Efisiensi Model** | NSE, KGE   | Seberapa baik GPM dibandingkan baseline (rata-rata observasi)?       |

<center><small><b> Tabel 3 Perbandingan Metrik Validasi Koreksi Bias HHMT — M0 sampai M4 </b> </small></center>

| **No.** | **Metode**                   | **Keterangan**                       | **PBIAS<br>(%)** | **RMSE<br>(mm)** | **MAE<br>(mm)** | **R**     | **R²**    | **NSE**   | **KGE**   | **Kategori<br>NSE/PBIAS/KGE** |
| ------- | ---------------------------- | ------------------------------------ | ---------------- | ---------------- | --------------- | --------- | --------- | --------- | --------- | ----------------------------- |
| 1       | **M0 — GPM Raw**             | Tanpa koreksi — baseline             | \-31.9           | 47.439           | 38.721          | 0.373     | 0.139     | \-1.062   | 0.206     | **TM/TM/TM**                  |
| 2       | **M1 — Monthly Scaling**     | CF per bulan dari data BMKG tersedia | \-27.0           | 43.701           | 34.499          | 0.383     | 0.147     | \-0.750   | 0.252     | **TM/TM/M**                   |
| 3       | **M2 — HHMT Direct Scaling** | CF global HHMT tunggal               | 3.5              | 36.468           | 24.177          | 0.373     | 0.139     | \-0.218   | 0.371     | **TM/SB/M**                   |
| 4       | **M3 — Quantile Mapping**    | Pemetaan distribusi empiris          | 3.5              | 39.001           | 26.843          | 0.350     | 0.123     | \-0.394   | 0.347     | **TM/SB/M**                   |
| 5       | **M4 — Year-Specific**       | Fk per tahun (Year-Specific Scaling) | **3.5**          | **15.789**       | **11.136**      | **0.900** | **0.811** | **0.772** | **0.879** | **SB/SB/SB**                  |

<small>
KETERANGAN KATEGORI (Moriasi et al. 2007 & Gupta et al. 2009):

NSE  :  >0.75=SB (Sangat Baik)  |  0.65–0.75=B (Baik)  |  0.50–0.65=M (Memuaskan)  |  <0.50=TM (Tidak Memuaskan)

PBIAS:  <10%=SB  |  10–15%=B  |  15–25%=M  |  >25%=TM          

KGE:  >0.75=SB  |  0.50–0.75=B  |  0.25–0.50=M  |  <0.25=TM
										
▣  M4 = Dipilih karena terbaik dari semua sisi validasi metrik								
</small>


# Analisis Frekuensi

# Permodelan SWMM

# Hidrograf Desain

# Perbandingan dengan Studi Terdahulu

