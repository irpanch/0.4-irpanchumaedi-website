---
title: "Analisa Hidrologi - Kota Banjarmasin"
date: 2026-04-25
summary: "Kota banjarmasin merupakan daerah yang rawan banjir."
tags:
- Hidrologi
- SWMM
- Data_satelit
---

# Umum
Proyek National Urban Flood Resilience Project (NUFReP) merupakan program kerja sama antara Pemerintah Republik Indonesia dan Bank Dunia dalam rangka meningkatkan ketahanan perkotaan terhadap banjir. Salah satu komponen strategis adalah pembangunan Wilayah Pengendalian Genangan (WPG) di kawasan Sungai Sutoyo S, Banjarmasin, Kalimantan Selatan.
Kawasan WPG Sungai Sutoyo S mencakup dua sub-DAS utama: Sub-DAS Pelambuan (116,35 Ha) dan Sub-DAS Jafri Zamzam (342,49 Ha), dengan total luas catchment 458,84 Ha. Kawasan ini secara rutin terdampak banjir yang merugikan masyarakat, infrastruktur, dan kegiatan ekonomi.
Analisis hidrologi yang komprehensif menjadi pondasi perencanaan sistem drainase dan pengendalian banjir, mencakup analisis frekuensi hujan, penyusunan kurva IDF, delineasi catchment, dan pemodelan hidrograf desain menggunakan SWMM.


## Metodologi

Analisis hidrologi dilaksanakan mengikuti alur kerja terstruktur enam tahap, dari pengumpulan data hingga hidrograf desain.

{{< figure src="alur_metodologi.png" caption="Gambar 1. Alur kerja analisis hidrologi enam tahap"width="100%" >}}

Secara keseluruhan, analisa hidrologi dilakukan dengan melalui enam tahapan. Mulai dari pengumpulan data, koreksi bias GPM, hingga hidrograf desain. Keenam tahapan tersebut secara rinci adalah sebagai berikut:

Tahap A — Pengumpulan Data: Data hujan GPM IMERG V07, ground station BMKG (2 stasiun), DEM UAV 2026, dan peta tutupan lahan ESRI Land Cover

Tahap B — Koreksi Bias GPM: Evaluasi 4 metode; dipilih Year-Specific Scaling (M4) berdasarkan metrik validasi terbaik

Tahap C — Analisis Frekuensi & IDF: Annual Maximum Series (AMS), uji statistik SNI 7746:2012, distribusi Log-Pearson III, dan kurva IDF dengan pola jam-jaman Banjarmasin

Tahap D — Delineasi Catchment: Pengolahan DEM UAV 2026 untuk delineasi 12 sub-DAS.

Tahap E — Pemodelan SWMM: Model limpasan dengan SCS Curve Number dan IDF sebagai input hujan

Tahap F — Hidrograf Desain: Debit puncak Q2, Q5, Q10, Q20 per sub-DAS sebagai input pemodelan hidraulika HEC-RAS


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

{{< figure src="peta_lokasi_sta_hujan.png" caption="Gambar 4. Peta Lokasi Stasiun Hujan dan Area WPG Soetoyo "width="100%" >}}

**Tabel 1 Inventarisasi Stasiun Hujan di Sekitar WPG Sungai Sutoyo S Banjarmasin**
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
Selain terhadap kelengkapan data hujan, jarak stasiun hujan juga sangat berpengaruh terhadap analisa yang akan digunakan. Semakin dekat maka akan semakin baik. Hasil plotting 
