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

Perbandingan antara GPM RAW (tanpa koreksi) dengan GPM hasil koreksi bias serta dengan nilai validasi metriknya dapat dilihat dalam gambar berikut. 

{{< figure src="koreksi-bias-gpm.png" caption="Gambar 9. Perbandingan antara GPM RAW dengan GPM Hasil koreksi bias "width="100%" >}}

# Analisis Frekuensi dan Uji Kesesuaian (*goodness-of-fit*)
Analisis frekuensi hujan bertujuan untuk memperkirakan besaran hujan rencana dengan kala ulang tertentu (T) berdasarkan seri data historis Hujan Harian Maksimum Tahunan (HHMT). Metode ini berasumsi bahwa data HHMT merupakan sampel acak yang mengikuti salah satu distribusi probabilitas tertentu. Dalam analisis ini digunakan lima distribusi yang umum dipakai dalam hidrologi di Indonesia, sesuai SNI 2415:2016 dan SNI 7746:2012.
Pemilihan distribusi yang paling sesuai dilakukan melalui dua uji kesesuaian statistik, sesuai SNI 7746:2012: uji Chi-Kuadrat dan uji Kolmogorov–Smirnov. Distribusi dengan nilai statistik uji terkecil (relatif terhadap nilai kritisnya) pada kedua uji ditetapkan sebagai distribusi terpilih.


<center><small><b> Tabel 4 Rekap Uji Kesesuaian di 5 Distribusi Hujan </b> </small></center>

|Distribusi                 |Chi² Hitung|Chi² Kritis|Derajat<br>Bebas|Uji Chi-Sq|D_maks (KS)|D_kritis (KS)|Uji KS  |Lolos<br>Kedua Uji|Ranking|
|---------------------------|-----------|-----------|----------------|----------|-----------|-------------|--------|------------------|-------|
|Log-Pearson III  (TERPILIH)|2.714286   |3.841      |1               |DITERIMA  |0.084357   |0.257        |DITERIMA|LOLOS             |1      |
|GEV                        |3.071429   |3.841      |1               |DITERIMA  |0.109532   |0.257        |DITERIMA|LOLOS             |2      |
|Gumbel                     |4.857143   |5.991      |2               |DITERIMA  |0.126584   |0.257        |DITERIMA|LOLOS             |3      |
|Log-Normal                 |4.857143   |5.991      |2               |DITERIMA  |0.150318   |0.257        |DITERIMA|LOLOS             |4      |
|Normal                     |11.285714  |5.991      |2               |DITOLAK   |0.191136   |0.257        |DITERIMA|GAGAL             |—      |


{{< figure src="uji-kesesuaian.png" caption="Gambar 9. Nilai Uji Kesesuaian - % Terhadap Nilai Kritis "width="80%" >}}


<center><small><b> Tabel 5 Hujan Rencana (mm/hari) Berdasarkan Semua Distribusi — Log-Pearson III Terpilih </b> </small></center>

|Kala Ulang<br>(Tahun)|Periode<br>Ulang (T)|Normal<br>(mm)|Log-Normal<br>(mm)|Gumbel<br>(mm)|Log-Pearson III<br>(Terpilih, mm)|GEV<br>(mm)|
|---------------------|--------------------|--------------|------------------|--------------|---------------------------------|-----------|
|T = 2 tahun          |2                   |114.33        |110.15            |108.47        |105.52                           |107.26     |
|T = 5 tahun          |5                   |144.31        |137.75            |139.96        |134.58                           |134.70     |
|T = 10 tahun         |10                  |159.99        |154.83            |160.81        |157.04                           |154.71     |
|T = 20 tahun         |20                  |172.93        |170.51            |180.81        |181.12                           |175.40     |
|T = 25 tahun         |25                  |176.70        |175.37            |187.15        |189.32                           |182.29     |
|T = 50 tahun         |50                  |187.50        |190.08            |206.69        |216.42                           |204.56     |
|T = 100 tahun        |100                 |197.22        |204.35            |226.09        |246.32                           |228.31     |

{{< figure src="kurva-frekuensi-hujan.png" caption="Gambar 10. Kurva Frekuensi Hujan – 5 Distribusi Hujan "width="80%" >}}

# Deliniasi Subdas

Delineasi catchment menggunakan DEM hasil survei topografi tahun 2026, diproses dengan program GIS. Resolusi hasil pengukuran topografi jauh lebih tinggi dibandingkan DEMNAS sehingga menghasilkan batas Sub DAS yang lebih akurat. Secara garis besar WPG Sungai Soetoyo ini merupakan bagian dari WPG Kota Banjarmasin dengan total 11 WPG yang tersebar. Lokasi WPG S. Soetoyo sendiri berada di sebelah barat yang berhubungan langsung dengan Sungai Barito. Peta area WPG Banjarmasin secara keseluruhan dan area WPG detail S. Soetoyo ditampilkan pada gambar berikut.

{{< figure src="area-wpg-keseluruhan.png" caption="Gambar 11. Area WPG Kota Banjarmasin – Keseluruhan "width="90%" >}}


{{< figure src="area-wpg-soetoyo.png" caption="Gambar 12. Area WPG S. Soetoyo "width="90%" >}}

# Permodelan SWMM
Storm Water Management Model (SWMM) digunakan untuk mengkonversi hujan rencana menjadi hidrograf debit di setiap titik keluar sub-DAS. Parameter utama model:
•	Metode limpasan: SCS Curve Number (CN) — USDA TR-55, 1986
•	Input hujan: Kurva IDF dari hasil analisis frekuensi
•	Karakteristik sub-DAS: Luas, kemiringan, panjang saluran, CN per penggunaan lahan

Penentuan parameter model SWMM (Storm Water Management Model) pada area WPG Banjarmasin didasarkan pada karakteristik fisik lahan dan jenis tanah yang ada di wilayah tersebut. Wilayah Banjarmasin dan sekitarnya merupakan dataran rendah Kalimantan Selatan yang didominasi oleh tanah lempung berliat dengan drainase alami yang buruk, muka air tanah dangkal, serta banyak dijumpai lahan rawa dan gambut yang terkonversi. Kondisi ini secara hidrologis menempatkan jenis tanah di wilayah kajian pada klasifikasi Hydrologic Soil Group (HSG) Tipe C. Seluruh nilai parameter standar yang digunakan merujuk pada Hydrology National Engineering Handbook, Chapter 7 (USDA-NRCS, 2009) dan panduan hidrolika FHWA-SA-96-067 (McCuen et al., 1996).

<center><small><b> Tabel 6 Rekapitulasi Nilai Parameter SWMM – Area WPG Soetoyo - Kota Banjarmasin </b> </small></center>

|Parameter SWMM                                 |Nilai Terpilih|Kategori / Dasar                                                                   |Sumber        |
|-----------------------------------------------|--------------|-----------------------------------------------------------------------------------|--------------|
|Hydrologic Soil Group (HSG)                    |C             |Tanah lempung berliat, drainase buruk, dominan di dataran rendah Kalimantan Selatan|NRCS TR-55    |
|Curve Number (CN)                              |90            |Residential – 1/8 ac or less (65% impervious), HSG C                               |NRCS NEH Ch. 7|
|Manning's n – Impervious (N-Imperv)            |0,012         |Smooth concrete (saluran beton halus)                                              |FHWA-SA-96-067|
|Manning's n – Pervious (N-Perv)                |0,024         |Cement rubble surface (permukaan berbatu/tanah terbuka)                            |FHWA-SA-96-067|
|Depression Storage – Impervious (Dstore-Imperv)|1,27 mm       |Impervious surfaces (0,05 in = 1,27 mm)                                            |NRCS / FHWA   |
|Depression Storage – Pervious (Dstore-Perv)    |5,24 mm       |Lawns/pasture (0,20 in = 5,08 mm dibulatkan 5,24 mm)                               |NRCS / FHWA   |

# Hidrograf Desain dan Debit puncak per Sub-DAS
Hasil dari running permodelan SWMM dengan input dan parameter yamg telah ditentukan berupa hidrograf debit banjir ditampilkan sebagai berikut

{{< figure src="hidrograf-q2.png" caption="Gambar 13. Hidrograf Debit Pada Masing-masing Subdas (Q2) "width="90%" >}}

{{< figure src="hidrograf-q5.png" caption="Gambar 14. Hidrograf Debit Pada Masing-masing Subdas (Q5) "width="90%" >}}

<center><small><b> Tabel 7 Rekapitulasi Debit Puncak per Sub-DAS (m³/s) — SWMM Output </b> </small></center>

|No|Kode|Nama                        |Q2  |Q5  |Q10 |Q20 |Q25 |Q50 |Q100|
|--|----|----------------------------|----|----|----|----|----|----|----|
|1 |A   |subdas_anak_pelambuan_kiri_1|1.53|2.03|2.41|2.81|2.95|3.40|3.89|
|2 |B   |subdas_anak_pelambuan_kiri_2|0.54|0.71|0.85|0.99|1.03|1.19|1.36|
|3 |C   |subdas_anak_pelambuan_kiri_3|2.06|2.72|3.23|3.76|3.94|4.55|5.21|
|4 |D   |subdas_anak_pelambuan_kn_1  |3.48|4.80|5.83|6.92|7.29|8.51|9.85|
|5 |E   |subdas_anak_pelambuan_kn_2  |1.66|2.20|2.61|3.05|3.20|3.69|4.23|
|6 |F   |subdas_jafri_zamzam_ki_1    |2.32|3.25|3.97|4.75|5.01|5.87|6.81|
|7 |G   |subdas_jafri_zamzam_ki_2    |2.54|3.54|4.30|5.11|5.39|6.29|7.27|
|8 |H   |subdas_jafri_zamzam_ki_3    |3.03|4.33|5.38|6.52|6.92|8.21|9.65|
|9 |I   |subdas_jafri_zamzam_ki_4    |2.81|4.04|5.04|6.13|6.51|7.76|9.15|
|10|J   |subdas_jafri_zamzam_kn_1    |0.96|1.32|1.60|1.90|2.00|2.33|2.69|
|11|K   |subdas_jafri_zamzam_kn_2    |3.22|4.45|5.38|6.37|6.70|7.79|8.99|
|12|L   |subdas_jafri_zamzam_kn_3    |1.89|2.60|3.13|3.70|3.89|4.52|5.21|


<center><small><b> Tabel 8 Rekapitulasi Debit Puncak per DAS (m³/s) di Outlet  </b> </small></center>

|No|Subdas      |Q2   |Q5   |Q10  |Q20  |Q25  |Q50  |Q100 |
|--|------------|-----|-----|-----|-----|-----|-----|-----|
|1 |Pelambuan   |9.27 |12.47|14.92|17.53|18.41|21.34|24.54|
|2 |Jafri Zamzam|16.76|23.53|28.81|34.48|36.42|42.77|49.78|


# Perbandingan dengan Studi Terdahulu
Pada tahun 2023, Balai Teknik Sungai telah melakukan kajian hidrologi di lokasi yang sama. Perbandingan dengan pekerjaan TSC (*Technical Support Consultant*) tahun 2026 ini disampaikan dalam tabel matriks berikut

<center><small><b> Tabel 9 Perbandingan Studi Hidrologi </b> </small></center>

|Parameter                   |Balai teknik sungai, 2023|TSC, 2026             |Selisih (%)|
|----------------------------|-------------------------|----------------------|-----------|
|Total Luas Subdas (Ha)      |456.2                    |458.84                |0.58%      |
|Data hujan                  |Surgi Mufti (18 Tahun)   |GPM Koreksi (28 Tahun)|\-         |
|Hujan Rencana R5 (mm/hari)  |95.691                   |134.58                |40.64%     |
|Distribusi Hujan            |Mononobe (5 Jam)         |Mononobe (5 Jam)      |\-         |
|Intensitas Hujan R5 (mm/jam)|55.96                    |78.701                |40.64%     |
|Model Hidrologi             |SWMM                     |SWMM                  |\-         |
|Curve Number                |90                       |90                    |\-         |
|Debit Q5 JZZ (m3/dtk)       |18.27                    |23.53                 |28.77%     |
|Debit Q5 Pelambuan (m3/dtk) |9.38                     |12.47                 |32.94%     |

Pada kajian TSC 2026 ini nilai curah hujan rencana R5 lebih besar dari kajian 2023 (naik ~40%), dikarenakan adanya penambahan data curah hujan ekstrim di tahun 2021 (252.1 mm/hari).  Oleh karena itu nilai debit pada masing-masing ruas Sungai juga mengalami peningkatan ~30% dibandingkan pada kajian balai Teknik Sungai 2023 meskipun luasan DAS yang hampir mirip dan digunakan metode distribusi hujan yang sama (mononobe 5 jam).