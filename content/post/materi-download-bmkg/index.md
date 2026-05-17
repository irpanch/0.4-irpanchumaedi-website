---
title: "Download Data Hujan BMKG: Cara Akses, Keterbatasan, dan Strategi Data Hilang"
date: 2026-05-12
tags: ["BMKG", "data hujan", "observasi", "missing data", "imputasi"]
categories: ["Tutorial", "Data Hujan"]
summary: "Cara mengakses data observasi BMKG, keterbatasannya, dan strategi mengisi data yang hilang (missing data) untuk keperluan studi hidrologi."
---


## Data BMKG sebagai Referensi Utama

Data curah hujan observasi dari **Badan Meteorologi, Klimatologi, dan Geofisika (BMKG)** adalah referensi primer dalam setiap studi hidrologi di Indonesia. Berbeda dengan data satelit (GPM IMERG) yang merupakan estimasi, data BMKG berasal dari **pengukuran langsung** di lapangan menggunakan penakar hujan standar.

**Keunggulan data BMKG:**
- ✅ Data pengukuran langsung (ground truth)
- ✅ Umumnya tersedia hingga puluhan tahun (beberapa stasiun sejak 1970-an)
- ✅ Diakui secara legal dan ilmiah untuk keperluan perizinan dan AMDAL
- ✅ Menjadi acuan kalibrasi/validasi untuk data satelit

**Keterbatasan data BMKG:**
- ❌ Kerapatan stasiun tidak merata — banyak area terpencil tidak terjangkau
- ❌ Data seringkali tidak lengkap (banyak missing data)
- ❌ Akses data historis panjang memerlukan permohonan resmi (berbayar)
- ❌ Portal online hanya tersedia 2 tahun terakhir secara gratis

---

## Cara Mengakses Data BMKG

Ada tiga jalur utama untuk mendapatkan data curah hujan BMKG:

### Jalur 1: Portal BMKG Data Online (Gratis, Terbatas 2 Tahun)

🔗 **URL:** [https://dataonline.bmkg.go.id/](https://dataonline.bmkg.go.id/)

Portal ini menyediakan akses gratis ke data iklim (curah hujan, suhu, kelembaban, dll.) namun **hanya 2 tahun terakhir** yang bisa diunduh secara mandiri.

**Langkah akses:**
1. Buka [https://dataonline.bmkg.go.id/](https://dataonline.bmkg.go.id/)
2. Klik **"Masuk"** → daftar akun gratis jika belum punya
3. Pilih menu **"Data Iklim"** → **"Unduh Data"**
4. Pilih stasiun, parameter (Curah Hujan / RR), dan periode waktu
5. Format output: **Excel (.xlsx)** atau CSV

> **Catatan penting:** Server BMKG Data Online menerapkan pembatasan ketat. Permintaan data lebih dari 2 tahun akan ditolak secara otomatis oleh sistem, bukan karena akun terbatas.

---

### Jalur 2: Permohonan Resmi ke UPT BMKG (Data Historis Panjang)

Untuk data historis lebih dari 2 tahun (misalnya 10–30 tahun untuk keperluan AMDAL), kamu perlu mengajukan **permohonan data resmi** ke Balai Besar / UPT BMKG setempat.

**Prosedur permohonan:**
1. Buat surat permohonan data resmi di atas kop perusahaan/instansi
2. Cantumkan: nama stasiun, parameter, periode, dan tujuan penggunaan
3. Kirimkan ke UPT BMKG yang membawahi wilayah stasiun target
4. Biaya: bervariasi, umumnya **Rp 50.000 – Rp 500.000** per stasiun per periode (PNBP)
5. Waktu proses: **1–3 minggu** tergantung beban kerja UPT

**Kontak UPT BMKG berdasarkan wilayah:**

| Wilayah | UPT BMKG |
|---------|----------|
| Jawa Barat | BMKG Stamet Bandung, BBTMC Serpong |
| Kalimantan Selatan | BMKG Staklim Banjarbaru |
| Kalimantan Timur | BMKG Staklim Samarinda |
| Maluku Utara | BMKG Stamet Ternate |
| Sulawesi | BMKG Staklim Makassar |

---

---

## Memahami Format Data BMKG

Data yang diunduh dari portal BMKG biasanya berbentuk tabel Excel dengan format seperti ini:

```
Nama Stasiun : Stasiun Klimatologi Banjarbaru
Lintang      : -3.4425° LS
Bujur        : 114.8253° BT
Elevasi      : 66 m
Parameter    : Curah Hujan (mm)

Tanggal    | RR
-----------|------
2023-01-01 | 15.2
2023-01-02 | 0.0
2023-01-03 | 8888  ← kode data hilang (missing)
2023-01-04 | 9999  ← kode tidak ada pengamatan
2023-01-05 | 22.4
```

**Kode khusus yang sering muncul:**

| Kode | Makna |
|------|-------|
| `8888` | Data hilang / tidak tercatat |
| `9999` | Tidak ada pengamatan (hari libur, dll.) |
| `-` atau `NaN` | Tidak ada data |
| `0.0` | Tidak hujan (hari kering) |
| `Tr` | *Trace* — hujan sangat kecil, tidak terukur (<0.5 mm) |

> **Penting:** Jangan sampai kode `8888` atau `9999` ikut dihitung sebagai nilai curah hujan! Ini adalah kesalahan umum yang membuat analisis frekuensi menjadi tidak valid.

---

## Identifikasi dan Penanganan Data Hilang (Missing Data)

### Langkah 1: Hitung Persentase Data Hilang

Sebelum menggunakan data BMKG, wajib hukumnya mengecek kualitas data:

```r
# ============================================================
# Identifikasi missing data pada dataset BMKG
# ============================================================
options(OutDec = ".")

library(dplyr)
library(lubridate)

# Baca data (sesuaikan path)
data_hujan <- read.csv("data_bmkg_banjarbaru.csv",
                       stringsAsFactors = FALSE)

# Konversi tanggal
data_hujan$tanggal <- as.Date(data_hujan$tanggal, format = "%Y-%m-%d")

# Ganti kode missing dengan NA
data_hujan$rr[data_hujan$rr %in% c(8888, 9999)] <- NA
data_hujan$rr[data_hujan$rr == "Tr"] <- 0  # Trace dianggap 0

# Hitung persentase missing per tahun
ringkasan_missing <- data_hujan %>%
  mutate(tahun = year(tanggal)) %>%
  group_by(tahun) %>%
  summarise(
    total_hari    = n(),
    hari_missing  = sum(is.na(rr)),
    persen_missing = round(hari_missing / total_hari * 100, 1)
  )

print(ringkasan_missing)
```

**Panduan interpretasi kualitas data:**

| Persentase Missing | Kategori | Tindakan |
|-------------------|----------|----------|
| < 5% | Baik | Imputasi sederhana |
| 5% – 15% | Cukup | Imputasi dengan stasiun tetangga |
| 15% – 30% | Kurang | Pertimbangkan data satelit sebagai suplemen |
| > 30% | Buruk | Hindari penggunaan, gunakan GPM IMERG |

---

### Langkah 2: Strategi Imputasi Data Hilang

Ada beberapa metode pengisian data hilang, pilih berdasarkan kondisi lapangan:

#### Metode 1: Rata-rata Stasiun Tetangga (Normal Ratio Method)

Metode ini menggunakan bobot berdasarkan rasio curah hujan normal tahunan antara stasiun target dan stasiun pengisi.

```r
# ============================================================
# Imputasi dengan Normal Ratio Method
# ============================================================

# Curah hujan tahunan rata-rata (mm/tahun) dari masing-masing stasiun
# Dapatkan nilai ini dari 10–30 tahun data di tiap stasiun
n_target   <- 2100  # Stasiun target (yang punya missing data)
n_stasiun1 <- 1950  # Stasiun tetangga 1
n_stasiun2 <- 2300  # Stasiun tetangga 2
n_stasiun3 <- 2050  # Stasiun tetangga 3

# Jika deviasi curah hujan normal antar stasiun < 10%:
# Gunakan rata-rata aritmetika sederhana
# Jika deviasi ≥ 10%: Gunakan Normal Ratio Method

hitung_imputasi_normal_ratio <- function(rr1, rr2, rr3,
                                          n_t, n_1, n_2, n_3) {
  # Formula: P_x = (N_x/3) * (P_1/N_1 + P_2/N_2 + P_3/N_3)
  nilai <- (n_t / 3) * (rr1/n_1 + rr2/n_2 + rr3/n_3)
  return(round(nilai, 1))
}

# Contoh pengisian untuk satu hari missing
rr_imputasi <- hitung_imputasi_normal_ratio(
  rr1 = 18.5, rr2 = 22.0, rr3 = 15.8,
  n_t = n_target, n_1 = n_stasiun1,
  n_2 = n_stasiun2, n_3 = n_stasiun3
)

cat("Curah hujan hasil imputasi:", rr_imputasi, "mm\n")
```

#### Metode 2: Inverse Distance Weighting (IDW) antar Stasiun

```r
# ============================================================
# Imputasi dengan IDW berdasarkan jarak antar stasiun
# ============================================================

# Koordinat stasiun (dalam derajat desimal)
stasiun <- data.frame(
  nama     = c("Target", "Sts_1", "Sts_2", "Sts_3"),
  lon      = c(114.825, 114.600, 115.100, 114.700),
  lat      = c(-3.443,  -3.200,  -3.600,  -3.700),
  rr_hari  = c(NA,      18.5,    22.0,    15.8)  # NA = missing
)

# Hitung jarak Euclidean (approx) dalam km
hitung_jarak_km <- function(lon1, lat1, lon2, lat2) {
  dx <- (lon2 - lon1) * 111.32 * cos(lat1 * pi / 180)
  dy <- (lat2 - lat1) * 110.57
  sqrt(dx^2 + dy^2)
}

stasiun_pengisi <- stasiun[!is.na(stasiun$rr_hari), ]

# Hitung jarak dari stasiun target ke pengisi
stasiun_pengisi$jarak <- mapply(
  hitung_jarak_km,
  lon1 = stasiun$lon[1], lat1 = stasiun$lat[1],
  lon2 = stasiun_pengisi$lon, lat2 = stasiun_pengisi$lat
)

# Bobot IDW (1/d^2)
stasiun_pengisi$bobot <- 1 / stasiun_pengisi$jarak^2

# Curah hujan hasil IDW
rr_idw <- sum(stasiun_pengisi$rr_hari * stasiun_pengisi$bobot) /
          sum(stasiun_pengisi$bobot)

cat("Curah hujan IDW:", round(rr_idw, 1), "mm\n")
```

#### Metode 3: Isi dengan Data GPM IMERG (Rekomendasi Modern)

Jika tidak ada stasiun tetangga yang memadai, data GPM IMERG Final Run bisa digunakan untuk mengisi missing data setelah dilakukan **bias correction**:

```r
# ============================================================
# Koreksi bias GPM IMERG menggunakan ratio scaling
# ============================================================

# Periode yang memiliki data lengkap di keduanya (untuk kalibrasi)
# bmkg_lengkap  = data BMKG periode overlap (tanpa missing)
# gpm_overlap   = data GPM periode yang sama

# Hitung faktor koreksi bulanan
faktor_koreksi <- data.frame(
  bulan  = 1:12,
  fc     = tapply(bmkg_lengkap$rr, month(bmkg_lengkap$tanggal),
                  mean, na.rm = TRUE) /
           tapply(gpm_overlap$rr,  month(gpm_overlap$tanggal),
                  mean, na.rm = TRUE)
)

# Terapkan koreksi ke GPM untuk mengisi missing BMKG
data_gabungan <- data_hujan  # copy data BMKG
bln_missing <- month(data_gabungan$tanggal[is.na(data_gabungan$rr)])
fc_terpilih <- faktor_koreksi$fc[bln_missing]

data_gabungan$rr[is.na(data_gabungan$rr)] <-
  gpm_data$rr[is.na(data_hujan$rr)] * fc_terpilih
```

---

## Validasi Kualitas Data Akhir

Setelah imputasi, lakukan validasi visual sebelum data digunakan untuk analisis lanjutan:

```r
# ============================================================
# Plot curah hujan tahunan untuk deteksi anomali
# ============================================================

library(ggplot2)

data_tahunan <- data_hujan %>%
  mutate(tahun = year(tanggal)) %>%
  group_by(tahun) %>%
  summarise(rr_tahunan = sum(rr, na.rm = TRUE))

ggplot(data_tahunan, aes(x = tahun, y = rr_tahunan)) +
  geom_bar(stat = "identity", fill = "#2196F3", alpha = 0.8) +
  geom_hline(yintercept = mean(data_tahunan$rr_tahunan),
             linetype = "dashed", color = "red", linewidth = 0.8) +
  labs(
    title    = "Curah Hujan Tahunan — Stasiun BMKG",
    subtitle = "Garis merah: rata-rata periode analisis",
    x        = "Tahun",
    y        = "Curah Hujan Tahunan (mm)"
  ) +
  theme_bw(base_size = 12)
```

Perhatikan anomali seperti lonjakan ekstrem atau nilai nol pada seluruh tahun — ini bisa mengindikasikan kesalahan dalam proses imputasi atau kode missing yang belum tergantikan.

---

## Kesimpulan: Kapan Gunakan Data BMKG vs GPM IMERG?

| Kondisi | Rekomendasi |
|---------|-------------|
| Stasiun BMKG < 5 km dari area studi, data lengkap | Gunakan BMKG saja |
| Stasiun BMKG ada tapi banyak missing data (>15%) | Gabungkan BMKG + GPM (hybrid) |
| Tidak ada stasiun BMKG dalam radius 20 km | Gunakan GPM IMERG Final Run |
| Keperluan AMDAL formal | BMKG sebagai primer, GPM sebagai sekunder |
| Data > 10 tahun diperlukan dan proses lambat | GPM + Open-Meteo ERA5 sebagai suplemen |

---

## Referensi

- BMKG Data Online: [https://dataonline.bmkg.go.id/](https://dataonline.bmkg.go.id/)
- WMO (2012). *Guide to Meteorological Instruments and Methods of Observation*. WMO No. 8.
- Paulhus, J.L.H. & Kohler, M.A. (1952). Interpolation of missing precipitation records. *Monthly Weather Review*, 80(8), 129–133.
- Soewarno (1995). *Hidrologi: Aplikasi Metode Statistik untuk Analisa Data*. Nova, Bandung.
