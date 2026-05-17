---
title: "Mengenal R & RMarkdown: Instalasi dan Proyek Pertama"
subtitle: "Dari instalasi hingga laporan hidrologi otomatis dalam satu klik"
summary: "Panduan praktis memulai R dan RMarkdown untuk hydrologist. Dilengkapi template Analisis Frekuensi Curah Hujan yang siap pakai — cukup ganti data, klik Knit, laporan Word langsung jadi."
authors: [admin]
tags: [R, RMarkdown, Hidrologi, Analisis Frekuensi, Tutorial]
categories: [Fondasi Data & Tools]
date: 2026-05-17
lastmod: 2026-05-17
featured: true
draft: false
reading_time: true
share: true
profile: true

image:
  caption: 'R & RMarkdown untuk Hydrologist'
  focal_point: Center
  preview_only: false
---

<style>
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes slideRight {
  from { opacity: 0; transform: translateX(-14px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes pulseDot {
  0%, 100% { transform: scale(1);   box-shadow: 0 0 0 0 rgba(0,188,212,0.4); }
  50%       { transform: scale(1.1); box-shadow: 0 0 0 8px rgba(0,188,212,0); }
}
@keyframes arrowBounce {
  0%, 100% { transform: translateX(0); }
  50%       { transform: translateX(5px); }
}
.card-anim { opacity: 0; animation: fadeUp 0.5s ease forwards; }
.ca1 { animation-delay: 0.05s; }
.ca2 { animation-delay: 0.18s; }
.ca3 { animation-delay: 0.31s; }
.ca4 { animation-delay: 0.44s; }
.ca5 { animation-delay: 0.57s; }
.step-anim { opacity: 0; animation: slideRight 0.45s ease forwards; }
.sa1 { animation-delay: 0.1s; } .sa2 { animation-delay: 0.22s; }
.sa3 { animation-delay: 0.34s; } .sa4 { animation-delay: 0.46s; }
.sa5 { animation-delay: 0.58s; }
.pulse-dot { animation: pulseDot 2s ease-in-out infinite; }
.arrow-bounce { display: inline-block; animation: arrowBounce 1.3s ease-in-out infinite; }
</style>

> *Artikel ini adalah bagian dari seri **Fondasi Data & Tools**. Sebelum membaca ini, pastikan sudah membaca [Filosofi: Pengguna vs. Pembuat Kode](/post/materi-pengguna-pembuat-kode/).*

---

Bayangkan kamu baru saja selesai mengumpulkan data curah hujan 25 tahun dari BMKG. Analisis frekuensi harus dikerjakan: hitung statistik, fit distribusi, uji KS, uji chi-kuadrat, buat kurva IDF. Lalu semua hasilnya harus masuk ke laporan Word yang rapi.

*Tiba-tiba bos bilang: "Mas, data hujan yang kemarin kejauhan. ambil data ini ya, lokasi nya lebih dekat soalnya"*

*'Waduh, ngulang dari awal lagi dong--'*

Hal ini sering saya alami dan dengan berat hati harus dikerjakan lagi dari awal. Memang sudah ada template excel dan word nya. Tapi menghabiskan waktu, belum lagi kita harus teliti jangan sampai ada kata "Papua" di proyek "Banjarmasin", **malu banget**. 

Contoh kasus lainnya adalah ketika kita mengerjakan proses yang sama, tapi lokasinya saja yang berbeda. Data memang pasti berbeda juga, tapi proses analisis persis sama tok.

Untuk mengerjakan ulang dengan cara biasa mungkin bisa menghabiskan **2-4 jam** per stasiun, per proyek. tapi dengan cara yang akan kita pelajari hari ini tinggal **klik satu tombol**, laporan bisa jadi dalam 30 detik.

---

## Apa Itu R?

R adalah bahasa pemrograman yang dirancang khusus untuk analisis statistik dan visualisasi data. Tapi jangan langsung takut dengan kata "pemrograman" — seperti yang sudah dibahas di artikel sebelumnya, kita tidak perlu menjadi programmer. Kita cukup menjadi **pengguna yang cerdas**.

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.9rem; margin: 1.8rem 0;">

<div class="card-anim ca1" style="border-radius: 12px; padding: 1.2rem; background: #0d1b2a; border: 1px solid #1565C0; border-top: 3px solid #1565C0; text-align: center;">
<div style="font-size: 1.6rem; margin-bottom: 0.5rem; font-family: monospace; color: #1E88E5; font-weight: 700;">R</div>
<div style="font-size: 0.82rem; font-weight: 700; color: #90CAF9; margin-bottom: 0.4rem;">Gratis & Open Source</div>
<div style="font-size: 0.75rem; color: #666; line-height: 1.5;">Tidak perlu lisensi. Ribuan paket tersedia di CRAN.</div>
</div>

<div class="card-anim ca2" style="border-radius: 12px; padding: 1.2rem; background: #0d1b2a; border: 1px solid #00BCD4; border-top: 3px solid #00BCD4; text-align: center;">
<div style="font-size: 1.6rem; margin-bottom: 0.5rem; font-family: monospace; color: #00BCD4; font-weight: 700;">📊</div>
<div style="font-size: 0.82rem; font-weight: 700; color: #80DEEA; margin-bottom: 0.4rem;">Visualisasi Kelas Atas</div>
<div style="font-size: 0.75rem; color: #666; line-height: 1.5;">ggplot2 menghasilkan plot publikasi-siap dengan sedikit kode.</div>
</div>

<div class="card-anim ca3" style="border-radius: 12px; padding: 1.2rem; background: #0d1b2a; border: 1px solid #43A047; border-top: 3px solid #43A047; text-align: center;">
<div style="font-size: 1.6rem; margin-bottom: 0.5rem; font-family: monospace; color: #66BB6A; font-weight: 700;">∞</div>
<div style="font-size: 0.82rem; font-weight: 700; color: #A5D6A7; margin-bottom: 0.4rem;">Reproducible</div>
<div style="font-size: 0.75rem; color: #666; line-height: 1.5;">Ganti input → semua output diperbarui otomatis. Tidak ada copy-paste.</div>
</div>

</div>

---

## Apa Itu RMarkdown?

RMarkdown adalah format file (`.Rmd`) yang **menggabungkan tiga hal dalam satu dokumen**:

<div style="margin: 1.5rem 0; border: 1px solid #1a2a3a; border-radius: 12px; overflow: hidden;">

<div style="display: grid; grid-template-columns: 1fr 1fr 1fr;">

<div class="card-anim ca1" style="padding: 1.1rem; border-right: 1px solid #1a2a3a; background: #070d14;">
<div style="font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #F57F17; margin-bottom: 0.5rem;">① YAML Header</div>
<div style="font-family: monospace; font-size: 0.72rem; color: #FFB74D; line-height: 1.7;">---<br>title: "Analisis"<br>output:<br>&nbsp;&nbsp;word_document<br>---</div>
<div style="font-size: 0.72rem; color: #555; margin-top: 0.5rem;">Konfigurasi dokumen: judul, format output, parameter.</div>
</div>

<div class="card-anim ca2" style="padding: 1.1rem; border-right: 1px solid #1a2a3a; background: #070d14;">
<div style="font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #0288D1; margin-bottom: 0.5rem;">② Teks Markdown</div>
<div style="font-family: monospace; font-size: 0.72rem; color: #4FC3F7; line-height: 1.7;"># Bab 1<br>Analisis dilakukan<br>di stasiun **BMKG**<br>periode 2000–2026.</div>
<div style="font-size: 0.72rem; color: #555; margin-top: 0.5rem;">Narasi laporan dalam format teks sederhana.</div>
</div>

<div class="card-anim ca3" style="padding: 1.1rem; background: #070d14;">
<div style="font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #43A047; margin-bottom: 0.5rem;">③ Code Chunk R</div>
<div style="font-family: monospace; font-size: 0.72rem; color: #81C784; line-height: 1.7;">```{r}<br>x_bar &lt;- mean(hujan)<br>plot(cdf_gumbel)<br>flextable(df_hasil)<br>```</div>
<div style="font-size: 0.72rem; color: #555; margin-top: 0.5rem;">Kode analisis, tabel, dan grafik — semua otomatis.</div>
</div>

</div>
</div>

Ketika kamu klik **Knit**, RStudio menjalankan semua kode R, menghasilkan grafik, menghitung angka, lalu menyusunnya menjadi dokumen Word (atau PDF, atau HTML) secara otomatis.

---

## Perbandingan: Manual vs RMarkdown

Gambar di bawah ini menunjukkan perbedaan nyata dalam alur kerja:

![Perbandingan Manual vs RMarkdown](compare-manual-vs-rmd.gif)

Satu kata: **reproducible**. Ketika data berubah, kamu tidak perlu mengulang semua langkah. Cukup update file Excel, klik Knit, laporan diperbarui dalam hitungan detik.

---

## Instalasi: R + RStudio

Kamu hanya butuh **dua software** ini. Keduanya gratis.

<div style="margin: 1.5rem 0;">

<div class="step-anim sa1" style="display: flex; align-items: flex-start; gap: 1rem; padding: 1rem 1.2rem; margin-bottom: 0.75rem; background: #0d1b2a; border: 1px solid #1a3050; border-left: 4px solid #1565C0; border-radius: 10px;">
<div style="width: 36px; height: 36px; border-radius: 50%; background: #1565C0; color: white; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 700; flex-shrink: 0; margin-top: 1px;" class="pulse-dot">1</div>
<div>
<div style="font-size: 0.9rem; font-weight: 700; color: #90CAF9; margin-bottom: 0.2rem;">Install R</div>
<div style="font-size: 0.82rem; color: #666; line-height: 1.6;">Download dari <strong style="color: #90CAF9;">cran.r-project.org</strong> → pilih <em>Download R for Windows</em> → jalankan installer, klik Next terus sampai selesai.</div>
</div>
</div>

<div class="step-anim sa2" style="display: flex; align-items: flex-start; gap: 1rem; padding: 1rem 1.2rem; margin-bottom: 0.75rem; background: #0d1b2a; border: 1px solid #1a3050; border-left: 4px solid #00BCD4; border-radius: 10px;">
<div style="width: 36px; height: 36px; border-radius: 50%; background: #00838F; color: white; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 700; flex-shrink: 0; margin-top: 1px;">2</div>
<div>
<div style="font-size: 0.9rem; font-weight: 700; color: #80DEEA; margin-bottom: 0.2rem;">Install RStudio</div>
<div style="font-size: 0.82rem; color: #666; line-height: 1.6;">Download dari <strong style="color: #80DEEA;">posit.co/download/rstudio-desktop</strong> → pilih versi gratis (RStudio Desktop) → install. RStudio adalah antarmuka visual untuk bekerja dengan R.</div>
</div>
</div>

<div class="step-anim sa3" style="display: flex; align-items: flex-start; gap: 1rem; padding: 1rem 1.2rem; margin-bottom: 0.75rem; background: #0d1b2a; border: 1px solid #1a3050; border-left: 4px solid #43A047; border-radius: 10px;">
<div style="width: 36px; height: 36px; border-radius: 50%; background: #2E7D32; color: white; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 700; flex-shrink: 0; margin-top: 1px;">3</div>
<div>
<div style="font-size: 0.9rem; font-weight: 700; color: #A5D6A7; margin-bottom: 0.2rem;">Install Paket yang Dibutuhkan</div>
<div style="font-size: 0.82rem; color: #666; line-height: 1.5; margin-bottom: 0.5rem;">Buka RStudio → di panel <em>Console</em> (bawah kiri), ketik dan tekan Enter:</div>
<div style="background: #050d14; border: 1px solid #1a2a3a; border-radius: 6px; padding: 0.6rem 0.8rem; font-family: monospace; font-size: 0.78rem; color: #A5D6A7; line-height: 1.8;">install.packages(c("rmarkdown", "readxl", "ggplot2",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"dplyr", "tidyr", "flextable", "scales"))</div>
<div style="font-size: 0.75rem; color: #555; margin-top: 0.4rem;">Tunggu beberapa menit hingga semua paket terinstal.</div>
</div>
</div>

<div class="step-anim sa4" style="display: flex; align-items: flex-start; gap: 1rem; padding: 1rem 1.2rem; background: #0d1b2a; border: 1px solid #1a3050; border-left: 4px solid #FFB300; border-radius: 10px;">
<div style="width: 36px; height: 36px; border-radius: 50%; background: #F57F17; color: white; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 700; flex-shrink: 0; margin-top: 1px;">4</div>
<div>
<div style="font-size: 0.9rem; font-weight: 700; color: #FFE082; margin-bottom: 0.2rem;">Verifikasi Instalasi</div>
<div style="font-size: 0.82rem; color: #666; line-height: 1.5; margin-bottom: 0.5rem;">Di Console, ketik:</div>
<div style="background: #050d14; border: 1px solid #1a2a3a; border-radius: 6px; padding: 0.6rem 0.8rem; font-family: monospace; font-size: 0.78rem; color: #FFE082; line-height: 1.8;">library(ggplot2)<br>ggplot(data.frame(x=1:10, y=rnorm(10)), aes(x,y)) + geom_point()</div>
<div style="font-size: 0.75rem; color: #555; margin-top: 0.4rem;">Jika muncul grafik di panel kanan bawah, instalasi berhasil.</div>
</div>
</div>

</div>

---

## Proyek Pertama: Analisis Frekuensi Curah Hujan

Ini bagian yang menarik. Kita tidak akan mulai dari nol — saya sudah siapkan template lengkap yang bisa langsung dipakai.

### Cara Kerjanya

![Alur Kerja Template RMarkdown](workflow-rmarkdown.gif)

Template ini membaca data dari **Excel**, menjalankan seluruh analisis secara otomatis, lalu menghasilkan **laporan Word** lengkap dengan tabel dan grafik.

### Yang Dihasilkan Otomatis

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; margin: 1.5rem 0;">

<div class="card-anim ca1" style="padding: 1rem 1.1rem; background: #0a120d; border: 1px solid #2E7D32; border-radius: 10px;">
<div style="font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #66BB6A; margin-bottom: 0.6rem;">Analisis Distribusi</div>
<div style="font-size: 0.8rem; color: #888; line-height: 1.7;">
[v] Tabel data hujan harian maksimum<br>
[v] Plot PDF — 4 distribusi sekaligus<br>
[v] Plot CDF dengan plotting position<br>
[v] Uji Kolmogorov-Smirnov<br>
[v] Uji Chi-Kuadrat<br>
[v] Pemilihan distribusi terbaik otomatis
</div>
</div>

<div class="card-anim ca2" style="padding: 1rem 1.1rem; background: #0a1018; border: 1px solid #1565C0; border-radius: 10px;">
<div style="font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #64B5F6; margin-bottom: 0.6rem;">Curah Hujan Rencana & IDF</div>
<div style="font-size: 0.8rem; color: #888; line-height: 1.7;">
[v] CH rencana: T = 2, 5, 10, 25, 50, 100 tahun<br>
[v] Tabel IDF lengkap (5 menit - 24 jam)<br>
[v] Kurva IDF log-log<br>
[v] Rumus Mononobe<br>
[v] Rekapitulasi intensitas t = 60 menit<br>
[v] Semua dalam format Word siap laporan
</div>
</div>

</div>

### Cara Menggunakan Template

<div style="margin: 1.5rem 0;">

<div class="step-anim sa1" style="display: flex; gap: 0.9rem; padding: 0.9rem 1.1rem; margin-bottom: 0.6rem; background: #070d14; border: 1px solid #1a2a3a; border-radius: 9px;">
<div style="font-family: monospace; font-size: 0.78rem; font-weight: 700; color: #1E88E5; flex-shrink: 0; padding-top: 1px;">01</div>
<div>
<div style="font-size: 0.85rem; font-weight: 700; color: #90CAF9; margin-bottom: 0.2rem;">Download & Ekstrak File Template</div>
<div style="font-size: 0.78rem; color: #555; line-height: 1.5;">Simpan ketiga file di <strong style="color: #90CAF9;">satu folder yang sama</strong>: <code style="background:#1a2a3a; padding:1px 5px; border-radius:3px; font-size:0.72rem;">Analisis_Frekuensi_TEMPLATE.Rmd</code>, <code style="background:#1a2a3a; padding:1px 5px; border-radius:3px; font-size:0.72rem;">Data_Input_Frekuensi.xlsx</code>, dan <code style="background:#1a2a3a; padding:1px 5px; border-radius:3px; font-size:0.72rem;">reference_template.docx</code></div>
</div>
</div>

<div class="step-anim sa2" style="display: flex; gap: 0.9rem; padding: 0.9rem 1.1rem; margin-bottom: 0.6rem; background: #070d14; border: 1px solid #1a2a3a; border-radius: 9px;">
<div style="font-family: monospace; font-size: 0.78rem; font-weight: 700; color: #00BCD4; flex-shrink: 0; padding-top: 1px;">02</div>
<div>
<div style="font-size: 0.85rem; font-weight: 700; color: #80DEEA; margin-bottom: 0.2rem;">Isi Data di Excel</div>
<div style="font-size: 0.78rem; color: #555; line-height: 1.5;">Buka <code style="background:#1a2a3a; padding:1px 5px; border-radius:3px; font-size:0.72rem;">Data_Input_Frekuensi.xlsx</code>. Isi sheet <strong style="color:#80DEEA;">Metadata_Proyek</strong> (nama proyek, stasiun, kala ulang) dan sheet <strong style="color:#80DEEA;">Data_Hujan</strong> (kolom Tahun dan Hujan Maks mm). Simpan file.</div>
</div>
</div>

<div class="step-anim sa3" style="display: flex; gap: 0.9rem; padding: 0.9rem 1.1rem; margin-bottom: 0.6rem; background: #070d14; border: 1px solid #1a2a3a; border-radius: 9px;">
<div style="font-family: monospace; font-size: 0.78rem; font-weight: 700; color: #43A047; flex-shrink: 0; padding-top: 1px;">03</div>
<div>
<div style="font-size: 0.85rem; font-weight: 700; color: #A5D6A7; margin-bottom: 0.2rem;">Buka File .Rmd di RStudio</div>
<div style="font-size: 0.78rem; color: #555; line-height: 1.5;">Double-click file <code style="background:#1a2a3a; padding:1px 5px; border-radius:3px; font-size:0.72rem;">.Rmd</code> → terbuka di RStudio. Kamu akan melihat kode di bagian <code style="background:#1a2a3a; padding:1px 5px; border-radius:3px; font-size:0.72rem;">DATA_INPUT</code> — tidak perlu diubah jika file Excel ada di folder yang sama.</div>
</div>
</div>

<div class="step-anim sa4" style="display: flex; gap: 0.9rem; padding: 0.9rem 1.1rem; margin-bottom: 0.6rem; background: #070d14; border: 1px solid #1a2a3a; border-radius: 9px;">
<div style="font-family: monospace; font-size: 0.78rem; font-weight: 700; color: #FFB300; flex-shrink: 0; padding-top: 1px;">04</div>
<div>
<div style="font-size: 0.85rem; font-weight: 700; color: #FFE082; margin-bottom: 0.2rem;">Klik Tombol Knit</div>
<div style="font-size: 0.78rem; color: #555; line-height: 1.5;">Di RStudio, klik tombol <strong style="color:#FFE082;">[ Knit ]</strong> (ikon benang + jarum di toolbar, atau tekan <kbd style="background:#1a2a3a; padding:2px 6px; border-radius:3px; font-size:0.7rem;">Ctrl + Shift + K</kbd>). Tunggu 10–30 detik. File Word akan terbuka otomatis.</div>
</div>
</div>

<div class="step-anim sa5" style="display: flex; gap: 0.9rem; padding: 0.9rem 1.1rem; background: #070e12; border: 1px solid #006064; border-radius: 9px;">
<div style="font-family: monospace; font-size: 0.78rem; font-weight: 700; color: #00BCD4; flex-shrink: 0; padding-top: 1px;">05</div>
<div>
<div style="font-size: 0.85rem; font-weight: 700; color: #80DEEA; margin-bottom: 0.2rem;">Proyek Berikutnya? Tinggal Ganti Data</div>
<div style="font-size: 0.78rem; color: #555; line-height: 1.5;">Salin folder ke direktori proyek baru. Buka Excel, ganti data hujan dan metadata. Klik Knit. Laporan baru siap — tanpa mengubah satu baris kode pun.</div>
</div>
</div>

</div>

---

## Anatomi Template: Bagian yang Perlu Diketahui

Kamu tidak perlu memahami semua kode. Tapi ada tiga bagian penting yang perlu diketahui:

<div style="margin: 1.5rem 0; background: #050d14; border: 1px solid #1a2a3a; border-radius: 12px; overflow: hidden;">

<div style="background: #0a1520; padding: 0.7rem 1.2rem; border-bottom: 1px solid #1a2a3a;">
<span style="font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; color: #64B5F6; text-transform: uppercase;">Analisis_Frekuensi_TEMPLATE.Rmd</span>
</div>

<div style="padding: 1.1rem 1.3rem;">

<div style="margin-bottom: 1rem;">
<div style="font-size: 0.68rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; color: #F57F17; margin-bottom: 0.4rem;">① YAML — Konfigurasi Output</div>
<div style="background: #0a1218; border-radius: 6px; padding: 0.7rem 0.9rem; font-family: monospace; font-size: 0.75rem; line-height: 1.8; color: #FFB74D;">
<span style="color: #555;">---</span><br>
<span style="color: #F57F17;">title:</span> <span style="color: #FFF8E1;">"Analisis Frekuensi Curah Hujan Harian Maksimum"</span><br>
<span style="color: #F57F17;">params:</span><br>
&nbsp;&nbsp;<span style="color: #F57F17;">path_excel:</span> <span style="color: #FFF8E1;">"Data_Input_Frekuensi.xlsx"</span> <span style="color: #555;"># ← path ke file Excel</span><br>
<span style="color: #F57F17;">output:</span><br>
&nbsp;&nbsp;<span style="color: #F57F17;">word_document:</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #F57F17;">reference_docx:</span> <span style="color: #FFF8E1;">reference_template.docx</span><br>
<span style="color: #555;">---</span>
</div>
<div style="font-size: 0.74rem; color: #555; margin-top: 0.4rem;">Hanya ubah <code>path_excel</code> jika file Excel tidak berada di folder yang sama.</div>
</div>

<div style="margin-bottom: 1rem;">
<div style="font-size: 0.68rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; color: #43A047; margin-bottom: 0.4rem;">② DATA_INPUT — Satu-satunya blok yang perlu dipahami</div>
<div style="background: #0a1218; border-radius: 6px; padding: 0.7rem 0.9rem; font-family: monospace; font-size: 0.75rem; line-height: 1.8; color: #A5D6A7;">
<span style="color: #555;">```{r DATA_INPUT}</span><br>
<span style="color: #555;"># !! HANYA EDIT BAGIAN INI UNTUK SETIAP PROYEK BARU !!</span><br>
<span style="color: #43A047;">path_excel</span> <span style="color: #fff;">&lt;-</span> params$path_excel<br>
<span style="color: #43A047;">T_values_default</span> <span style="color: #fff;">&lt;-</span> <span style="color: #81C784;">c(2, 5, 10, 25, 50, 100)</span><br>
<span style="color: #555;">```</span>
</div>
<div style="font-size: 0.74rem; color: #555; margin-top: 0.4rem;">Kala ulang bisa diatur dari Excel (sheet Metadata_Proyek). Blok ini hanya fallback.</div>
</div>

<div>
<div style="font-size: 0.68rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; color: #1E88E5; margin-bottom: 0.4rem;">③ ANALISIS — Jangan diubah</div>
<div style="background: #0a1218; border-radius: 6px; padding: 0.7rem 0.9rem; font-family: monospace; font-size: 0.75rem; line-height: 1.8; color: #64B5F6;">
<span style="color: #555;">```{r ANALISIS, include=FALSE}</span><br>
<span style="color: #555;"># Statistik dasar, fit 4 distribusi, uji KS & Chi-kuadrat,</span><br>
<span style="color: #555;"># pemilihan otomatis, hitung IDF Mononobe — semua di sini.</span><br>
<span style="color: #555;"># Tidak perlu diubah.</span><br>
<span style="color: #555;">```</span>
</div>
<div style="font-size: 0.74rem; color: #555; margin-top: 0.4rem;">Semua matematika ada di sini — Normal, Log-Normal, Gumbel, Log-Pearson III. Dihitung otomatis.</div>
</div>

</div>
</div>

---

## Download Template

<div style="margin: 1.5rem 0; padding: 1.4rem 1.6rem; background: linear-gradient(135deg, #0a1520, #071018); border: 1px solid #1565C0; border-radius: 14px;" class="card-anim ca1">

<div style="font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #64B5F6; margin-bottom: 1rem;">Paket Template — Analisis Frekuensi Curah Hujan</div>

<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.7rem; margin-bottom: 1.1rem;">

<div style="padding: 0.8rem; background: #0d1b2a; border: 1px solid #1a3050; border-radius: 8px; text-align: center;">
<div style="font-family: monospace; font-size: 0.75rem; font-weight: 700; color: #43A047; margin-bottom: 0.3rem;">.Rmd</div>
<div style="font-size: 0.72rem; color: #666;">Analisis_Frekuensi<br>_TEMPLATE.Rmd</div>
</div>

<div style="padding: 0.8rem; background: #0d1b2a; border: 1px solid #1a3050; border-radius: 8px; text-align: center;">
<div style="font-family: monospace; font-size: 0.75rem; font-weight: 700; color: #1E88E5; margin-bottom: 0.3rem;">.xlsx</div>
<div style="font-size: 0.72rem; color: #666;">Data_Input<br>_Frekuensi.xlsx</div>
</div>

<div style="padding: 0.8rem; background: #0d1b2a; border: 1px solid #1a3050; border-radius: 8px; text-align: center;">
<div style="font-family: monospace; font-size: 0.75rem; font-weight: 700; color: #FFB300; margin-bottom: 0.3rem;">.docx</div>
<div style="font-size: 0.72rem; color: #666;">reference<br>_template.docx</div>
</div>

</div>

<div style="font-size: 0.8rem; color: #555; line-height: 1.6; margin-bottom: 1rem;">Tiga file harus berada dalam <strong style="color: #90CAF9;">satu folder yang sama</strong>. Template sudah diuji dengan data BMKG stasiun Bandung, 2000–2026. Distribusi yang didukung: Normal, Log-Normal 2P, Gumbel, Log-Pearson III.</div>

<a href="/files/template-analisis-frekuensi.zip" style="display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.75rem 1.5rem; background: #1565C0; color: white; text-decoration: none; border-radius: 8px; font-size: 0.88rem; font-weight: 700; letter-spacing: 0.02em; transition: background 0.2s ease;" onmouseover="this.style.background='#1E88E5'" onmouseout="this.style.background='#1565C0'">
<span style="font-size: 1rem;">&#8595;</span> Download Template (ZIP)
</a>

</div>

---

## Apa Selanjutnya?

Setelah berhasil menjalankan template ini, kamu sudah memiliki fondasi yang kuat. Artikel berikutnya akan membahas cara **memodifikasi template** untuk kebutuhan proyek yang berbeda — menambah stasiun, mengubah distribusi, atau mengintegrasikan data GPM IMERG.

<div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: 1.5rem;">

<a href="/post/materi-pengguna-pembuat-kode/" style="display: flex; align-items: center; gap: 1rem; padding: 0.9rem 1.2rem; background: #070d14; border: 1px solid #1a2a3a; border-radius: 10px; text-decoration: none; transition: border-color 0.2s ease;" onmouseover="this.style.borderColor='#555'" onmouseout="this.style.borderColor='#1a2a3a'">
<span style="font-size: 1.1rem; flex-shrink: 0; color: #555; display: inline-block; transform: scaleX(-1);">→</span>
<div>
<div style="font-size: 0.65rem; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase; color: #555; margin-bottom: 0.15rem;">Artikel Sebelumnya</div>
<div style="font-size: 0.85rem; font-weight: 700; color: #90CAF9;">Filosofi: Pengguna vs. Pembuat Kode</div>
</div>
</a>


<div style="display: flex; align-items: center; gap: 1rem; padding: 0.9rem 1.2rem; background: #070d14; border: 1px dashed #2a2a3a; border-radius: 10px; opacity: 0.55; cursor: default;">
<span style="font-size: 1.1rem; flex-shrink: 0; color: #444;">→</span>
<div>
<div style="font-size: 0.65rem; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase; color: #444; margin-bottom: 0.15rem;">Segera Hadir</div>
<div style="font-size: 0.85rem; font-weight: 700; color: #555;">Kustomisasi Template: Adaptasi untuk Berbagai Proyek</div>
</div>
</div>

</div>

---

*Template ini dibuat menggunakan R versi 4.x dengan paket: `rmarkdown`, `readxl`, `ggplot2`, `dplyr`, `tidyr`, `flextable`, `scales`. Semua perhitungan mengikuti metode standar hidrologi Indonesia.* 🌧️
