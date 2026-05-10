# 🌊 Database Hidrologi Indonesia

<div align="center">

[![Website](https://img.shields.io/badge/Website-irpanchumaedi.com-blue?style=for-the-badge&logo=googlechrome)](https://www.irpanchumaedi.com)
[![License](https://img.shields.io/badge/Lisensi-CC%20BY%204.0-green?style=for-the-badge)](https://creativecommons.org/licenses/by/4.0/)
[![Contributions Welcome](https://img.shields.io/badge/Kontribusi-Terbuka-orange?style=for-the-badge)](CONTRIBUTING.md)

**Kumpulan data hidrologi Indonesia yang terbuka dan bisa diakses siapa saja.**

[🌐 Kunjungi Website](https://www.irpanchumaedi.com) · [📥 Download Data](#cara-menggunakan) · [🤝 Berkontribusi](#cara-berkontribusi) · [📬 Hubungi Kami](#kontak)

</div>

---

## 📖 Tentang Proyek

Data hidrologi yang terbuka di Indonesia masih sangat terbatas, padahal data ini sangat krusial sebagai dasar analisis sebelum perencanaan infrastruktur, kajian lingkungan (AMDAL), maupun penelitian akademis.

Repository ini hadir sebagai inisiatif komunitas untuk mengumpulkan, merapikan, dan mendistribusikan data hidrologi Indonesia secara terbuka. Siapa saja boleh menggunakan dan berkontribusi.

> 💡 **Website utama** tersedia di [www.irpanchumaedi.com](https://www.irpanchumaedi.com) untuk akses data yang lebih mudah tanpa perlu memahami GitHub.

---

## 📂 Jenis Data yang Tersedia

| Jenis Data | Keterangan | Format |
|---|---|---|
| 🌧️ **Curah Hujan Harian** | Data pos hujan BMKG & BBWS | CSV, XLSX |
| 🌊 **Debit & TMA Sungai** | Data AWLR/PDA dari berbagai stasiun | CSV, XLSX |
| ☀️ **Data Klimatologi** | Suhu, kelembaban, evaporasi, kecepatan angin | CSV, XLSX |
| 🌊 **Pasang Surut** | Data tidal dari stasiun BIG & pelabuhan | CSV, XLSX |
| 🗺️ **Data Spasial** | Batas DAS, jaringan sungai (opsional) | SHP, GeoJSON |

> ⚠️ Tidak semua wilayah tersedia datanya. Lihat folder masing-masing untuk ketersediaan.

---

## 🗂️ Struktur Folder

```
database-hidrologi-indonesia/
│
├── 📁 curah_hujan/
│   ├── kalimantan/
│   ├── jawa/
│   ├── sumatera/
│   └── ...
│
├── 📁 debit_tma/
│   ├── kalimantan/
│   ├── jawa/
│   └── ...
│
├── 📁 klimatologi/
│   └── ...
│
├── 📁 pasang_surut/
│   └── ...
│
├── 📁 spasial/
│   └── ...
│
└── 📄 README.md
```

---

## 📋 Format Data

Semua data tabular mengikuti format standar berikut agar mudah dibaca oleh berbagai software (R, Python, Excel, QGIS, dll.):

### Data Curah Hujan & Klimatologi

| Kolom | Tipe | Keterangan | Contoh |
|---|---|---|---|
| `tanggal` | Date | Format YYYY-MM-DD | `2023-01-15` |
| `nama_stasiun` | String | Nama pos/stasiun | `Pos Hujan Martapura` |
| `id_stasiun` | String | Kode stasiun (jika ada) | `1501A` |
| `longitude` | Numeric | Koordinat BT (desimal) | `114.8527` |
| `latitude` | Numeric | Koordinat LS (desimal, negatif) | `-3.4201` |
| `nilai` | Numeric | Nilai pengamatan | `45.2` |
| `satuan` | String | Satuan pengukuran | `mm` |
| `sumber` | String | Instansi sumber data | `BMKG` |
| `keterangan` | String | Catatan tambahan (opsional) | `Data diestimasi` |

### Data Debit & TMA

| Kolom | Tipe | Keterangan | Contoh |
|---|---|---|---|
| `tanggal` | Date | Format YYYY-MM-DD | `2023-01-15` |
| `nama_stasiun` | String | Nama pos duga air | `AWLR Karang Intan` |
| `nama_sungai` | String | Nama sungai | `S. Martapura` |
| `longitude` | Numeric | Koordinat BT (desimal) | `114.9012` |
| `latitude` | Numeric | Koordinat LS (desimal, negatif) | `-3.5678` |
| `tma_m` | Numeric | Tinggi muka air (m) | `2.45` |
| `debit_m3s` | Numeric | Debit (m³/det), isi jika tersedia | `125.3` |
| `sumber` | String | Instansi sumber data | `BBWS Kalimantan II` |

---

## 🚀 Cara Menggunakan

### Opsi 1 — Via Website (Termudah)
Kunjungi **[www.irpanchumaedi.com](https://www.irpanchumaedi.com)** dan download data yang dibutuhkan langsung dari antarmuka web.

### Opsi 2 — Clone Repository

```bash
# Clone seluruh repository
git clone https://github.com/irpanchumaedi/database-hidrologi-indonesia.git

# Masuk ke folder
cd database-hidrologi-indonesia
```

### Opsi 3 — Download File Tertentu

Gunakan tombol **Download raw file** di GitHub, atau klik kanan pada file CSV dan pilih *Save link as*.

### Contoh Membaca Data di R

```r
library(tidyverse)

# Baca data curah hujan
df_hujan <- read_csv("curah_hujan/kalimantan/kalsel_martapura_2015_2023.csv")

# Ringkasan
glimpse(df_hujan)

# Plot sederhana
ggplot(df_hujan, aes(x = tanggal, y = nilai)) +
  geom_line(color = "steelblue") +
  labs(title = "Curah Hujan Harian - Pos Martapura",
       x = "Tanggal", y = "Curah Hujan (mm)") +
  theme_minimal()
```

---

## 🤝 Cara Berkontribusi

Kontribusi sangat terbuka! Baik data baru, perbaikan data yang sudah ada, maupun perbaikan dokumentasi.

### Langkah Kontribusi Data Baru

1. **Fork** repository ini
2. Buat folder baru sesuai struktur yang ada
3. Siapkan file data sesuai **format standar** di atas
4. Tambahkan entri di `DAFTAR_DATA.md` (jika ada)
5. Buat **Pull Request** dengan deskripsi singkat:
   - Jenis data
   - Wilayah / nama stasiun
   - Periode data
   - Sumber data

### Panduan Data yang Diterima

✅ **Diterima:**
- Data observasi lapangan (pos hujan, AWLR, klimatologi)
- Data yang sudah dianonimisasi jika diperlukan
- Data dengan sumber yang jelas (BMKG, BBWS, BWSWS, BPS, dll.)
- Format CSV atau XLSX mengikuti template standar

❌ **Tidak diterima:**
- Data tanpa keterangan sumber
- Data yang melanggar hak cipta instansi
- Data yang tidak mengikuti format standar

> 📄 Lihat [CONTRIBUTING.md](CONTRIBUTING.md) untuk panduan lebih lengkap.

---

## ⚖️ Lisensi

Data dalam repository ini didistribusikan di bawah lisensi **Creative Commons Attribution 4.0 International (CC BY 4.0)**.

Artinya Anda **bebas** menggunakan, menyalin, memodifikasi, dan mendistribusikan data ini untuk tujuan apapun — termasuk komersial — **selama menyebutkan sumber** (repository ini).

Contoh atribusi:
> *Sumber: Database Hidrologi Indonesia — irpanchumaedi.com*

[![CC BY 4.0](https://licensebuttons.net/l/by/4.0/88x31.png)](https://creativecommons.org/licenses/by/4.0/)

---

## ⚠️ Disclaimer

- Data yang tersedia dikumpulkan dari berbagai sumber publik dan kontributor komunitas.
- Akurasi data **tidak dijamin** — selalu lakukan validasi sebelum digunakan untuk keperluan teknis/proyek.
- Pemilik repository **tidak bertanggung jawab** atas kerugian yang timbul akibat penggunaan data.

---

## 📬 Kontak

Punya pertanyaan, saran, atau ingin berkontribusi data dalam jumlah besar?

- 🌐 **Website:** [www.irpanchumaedi.com](https://www.irpanchumaedi.com)
- 🐙 **GitHub:** [@irpanchumaedi](https://github.com/irpanchumaedi)

---

<div align="center">

Dibuat dengan ❤️ untuk komunitas hidrologi Indonesia

⭐ Jika repository ini bermanfaat, jangan lupa beri **Star**!

</div>
