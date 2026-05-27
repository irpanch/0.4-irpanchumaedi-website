---
title: "Modul 1 — Pengantar HEC-RAS: Konsep & Interface"
summary: "Memahami apa itu HEC-RAS, kapan dan mengapa digunakan, serta bagaimana alur kerja dari input data geometri hingga output profil muka air. Modul pertama dari seri pemodelan hidrolika HEC-RAS."
authors: ["irpan-chumaedi"]
tags: ["HEC-RAS", "pemodelan hidrolika", "steady flow", "unsteady flow", "tutorial"]
categories: ["HEC-RAS"]
date: 2024-01-01
lastmod: 2024-01-01
featured: false
draft: false
description: "Tutorial lengkap pengantar HEC-RAS: konsep dasar, kemampuan software, struktur file project, antarmuka GUI, dan alur kerja pemodelan hidrolika 1D dan 2D."
modul_hecras: true
reading_time: true
share: true
profile: false
commentable: false
---

{{< rawhtml >}}
<div class="hecras-modul">
<!-- TUJUAN PEMBELAJARAN -->
  <div class="objectives">
    <div class="objectives-title">🎯 Tujuan Pembelajaran</div>
    <ul>
      <li><div class="obj-check">✓</div> Memahami definisi dan fungsi utama HEC-RAS dalam pemodelan hidrolika</li>
      <li><div class="obj-check">✓</div> Mengenal komponen analisis: steady flow, unsteady flow, 2D, sediment, dan water quality</li>
      <li><div class="obj-check">✓</div> Mengenal struktur file project HEC-RAS dan cara pengelolaannya</li>
      <li><div class="obj-check">✓</div> Memahami antarmuka (GUI) HEC-RAS dan navigasi dasarnya</li>
      <li><div class="obj-check">✓</div> Mengetahui alur kerja umum pemodelan dari input hingga output</li>
    </ul>
  </div>

  <!-- SECTION 1: APA ITU HEC-RAS -->
  <div class="section-heading">
    <div class="section-num">1</div>
    <h2>Apa itu HEC-RAS?</h2>
  </div>

  <p><strong>HEC-RAS</strong> (Hydrologic Engineering Center — River Analysis System) adalah perangkat lunak pemodelan hidrolika yang dikembangkan oleh <strong>U.S. Army Corps of Engineers (USACE)</strong>, khususnya oleh Hydrologic Engineering Center (HEC). Perangkat lunak ini bersifat <em>gratis</em> dan dapat diunduh langsung dari situs resmi HEC.</p>

  <p>HEC-RAS dirancang untuk mensimulasikan perilaku aliran air di sungai, dataran banjir, dan sistem saluran buatan — baik dalam kondisi aliran tunak (steady) maupun tidak tunak (unsteady), satu dimensi (1D) maupun dua dimensi (2D).</p>

  <div class="info-box">
    <div class="info-box-label">ℹ️ Catatan Historis</div>
    <p>HEC-RAS pertama kali dirilis pada tahun 1995 sebagai pengganti generasi lama HEC-2. Versi terkini (6.x) telah memiliki kemampuan pemodelan 2D yang sangat powerful, integrasi GIS melalui HEC-RAS Mapper, serta dukungan simulasi terobosan bendungan (dam break) dan tanggul (levee breach).</p>
  </div>

  <h3>Posisi HEC-RAS dalam Ekosistem Pemodelan</h3>
  <p>HEC-RAS adalah bagian dari suite "NexGen" perangkat lunak HEC yang saling terintegrasi:</p>

  <div class="flow">
    <div class="flow-box">HEC-HMS<br><small style="color:var(--hec-dim)">Hidrologi<br>(debit)</small></div>
    <div class="flow-arrow">→</div>
    <div class="flow-box highlight">HEC-RAS<br><small style="color:var(--hec-muted)">Hidrolika<br>(muka air)</small></div>
    <div class="flow-arrow">→</div>
    <div class="flow-box">HEC-FDA<br><small style="color:var(--hec-dim)">Analisis Kerugian<br>Banjir</small></div>
    <div class="flow-arrow">→</div>
    <div class="flow-box">HEC-FIA<br><small style="color:var(--hec-dim)">Dampak<br>Banjir</small></div>
  </div>

  <p>Dalam konteks pekerjaan hidrologi Indonesia, HEC-RAS umumnya digunakan setelah HEC-HMS menghasilkan hidrograf debit rancangan. Debit tersebut kemudian menjadi input kondisi batas di HEC-RAS untuk menghitung profil muka air dan peta genangan.</p>

  <hr class="divider">

  <!-- SECTION 2: KAPABILITAS -->
  <div class="section-heading">
    <div class="section-num">2</div>
    <h2>Kemampuan Utama HEC-RAS</h2>
  </div>

  <p>HEC-RAS memiliki empat komponen analisis utama yang menggunakan representasi data geometri yang sama:</p>

  <div class="cards-grid">
    <div class="card">
      <span class="card-icon">〰️</span>
      <div class="card-title">Steady Flow 1D</div>
      <div class="card-desc">Profil muka air untuk aliran tunak (debit konstan). Basis analisis floodway dan kapasitas tampang sungai.</div>
    </div>
    <div class="card">
      <span class="card-icon">🌊</span>
      <div class="card-title">Unsteady Flow 1D/2D</div>
      <div class="card-desc">Simulasi aliran tidak tunak — flood routing, dam break, levee breach. Menghasilkan hidrograf di setiap titik.</div>
    </div>
    <div class="card">
      <span class="card-icon">🏜️</span>
      <div class="card-title">Sediment Transport</div>
      <div class="card-desc">Simulasi angkutan sedimen dan perubahan dasar sungai (scour & deposition) untuk jangka menengah–panjang.</div>
    </div>
    <div class="card">
      <span class="card-icon">💧</span>
      <div class="card-title">Water Quality</div>
      <div class="card-desc">Analisis kualitas air sungai: suhu, oksigen terlarut, BOD, nitrogen, fosfor, dan parameter lainnya.</div>
    </div>
  </div>

  <div class="info-box success">
    <div class="info-box-label">✅ Fokus Modul Ini</div>
    <p>Rangkaian modul di website ini berfokus pada <strong>Steady Flow 1D</strong>, <strong>Unsteady Flow 1D (Flood Routing)</strong>, dan <strong>2D Modeling</strong> — tiga kemampuan yang paling umum digunakan dalam pekerjaan hidrologi dan hidrolika di Indonesia.</p>
  </div>

  <h3>Kemampuan Khusus yang Perlu Diketahui</h3>
  <ul class="prose-list">
    <li><strong>Mixed flow regime</strong> — mensimulasikan aliran subkritis, superkritis, dan loncatan hidraulik (hydraulic jump) secara bersamaan</li>
    <li><strong>Struktur hidraulik</strong> — jembatan, gorong-gorong, bendung, pintu air, pompa, tanggul, embung</li>
    <li><strong>Dam break analysis</strong> — simulasi terobosan bendungan dengan berbagai parameter keruntuhan</li>
    <li><strong>Automated calibration</strong> — kalibrasi otomatis koefisien Manning's <em>n</em></li>
    <li><strong>HEC-RAS Mapper</strong> — pembuatan peta genangan, animasi banjir, integrasi data spasial (DEM, ortofoto)</li>
    <li><strong>Output lengkap</strong> — profil memanjang, penampang melintang, hidrograf, rating curve, tabel kustom</li>
  </ul>

  <hr class="divider">

  <!-- SECTION 3: STRUKTUR FILE PROJECT -->
  <div class="section-heading">
    <div class="section-num">3</div>
    <h2>Struktur File Project HEC-RAS</h2>
  </div>

  <p>Setiap project HEC-RAS terdiri dari sekumpulan file dengan ekstensi berbeda. Penting untuk memahami fungsi masing-masing agar tidak kebingungan saat membuka atau berbagi project dengan rekan kerja.</p>

  <table class="file-table">
    <thead>
      <tr>
        <th>Ekstensi</th>
        <th>Nama File</th>
        <th>Isi / Fungsi</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="file-ext">.prj</span></td>
        <td>Project File</td>
        <td>File utama. Berisi daftar semua file yang terkait dalam project. Buka file ini untuk membuka project.</td>
      </tr>
      <tr>
        <td><span class="file-ext">.g01, .g02, ...</span></td>
        <td>Geometry File</td>
        <td>Data geometri: skematik sungai, penampang melintang, struktur hidraulik. Bisa ada lebih dari satu geometri (alternatif).</td>
      </tr>
      <tr>
        <td><span class="file-ext">.f01, .f02, ...</span></td>
        <td>Steady Flow File</td>
        <td>Data aliran tunak: debit rancangan dan kondisi batas untuk simulasi steady flow.</td>
      </tr>
      <tr>
        <td><span class="file-ext">.u01, .u02, ...</span></td>
        <td>Unsteady Flow File</td>
        <td>Data aliran tidak tunak: hidrograf masukan, kondisi batas unsteady, parameter simulasi.</td>
      </tr>
      <tr>
        <td><span class="file-ext">.p01, .p02, ...</span></td>
        <td>Plan File</td>
        <td>Rencana simulasi: menghubungkan satu geometry file dengan satu flow file menjadi satu skenario/plan.</td>
      </tr>
      <tr>
        <td><span class="file-ext">.O01, .O02, ...</span></td>
        <td>Output File</td>
        <td>File output biner hasil perhitungan. Diperlukan untuk menampilkan profil muka air dan grafik.</td>
      </tr>
      <tr>
        <td><span class="file-ext">.rasmap</span></td>
        <td>RAS Mapper File</td>
        <td>Konfigurasi HEC-RAS Mapper: terrain, layer background, hasil pemetaan genangan.</td>
      </tr>
      <tr>
        <td><span class="file-ext">.hdf</span></td>
        <td>HDF5 Output</td>
        <td>Output format modern (Hierarchical Data Format) untuk simulasi unsteady dan 2D. Berisi semua data time series.</td>
      </tr>
      <tr>
        <td><span class="file-ext">.dss</span></td>
        <td>DSS File</td>
        <td>HEC Data Storage System: format pertukaran data antar software HEC (HMS ↔ RAS).</td>
      </tr>
    </tbody>
  </table>

  <div class="info-box warning">
    <div class="info-box-label">⚠️ Praktik Terbaik Manajemen File</div>
    <p>Simpan semua file project HEC-RAS dalam satu folder. Jangan pernah memindahkan atau mengganti nama file secara manual di luar HEC-RAS — gunakan menu <strong>File → Save Project As</strong> untuk memindahkan/menyalin project. Hindari path folder dengan karakter spasi atau aksara non-latin.</p>
  </div>

  <hr class="divider">

  <!-- SECTION 4: INTERFACE HEC-RAS -->
  <div class="section-heading">
    <div class="section-num">4</div>
    <h2>Antarmuka (GUI) HEC-RAS</h2>
  </div>

  <p>Saat membuka HEC-RAS, Anda akan melihat <strong>Main Window</strong> — jendela utama yang menjadi pusat kendali semua operasi. Dari sini, Anda mengakses semua komponen pemodelan.</p>

  <h3>Komponen Main Window</h3>

  <div class="steps">
    <div class="step">
      <div class="step-num">A</div>
      <div class="step-body">
        <div class="step-title">Menu Bar — Akses Semua Fungsi</div>
        <div class="step-desc">
          <p>Menu utama mencakup: <strong>File</strong> (manajemen project), <strong>Edit</strong>, <strong>View</strong>, <strong>Options</strong>, <strong>GIS Tools</strong>, dan <strong>Help</strong>.</p>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">B</div>
      <div class="step-body">
        <div class="step-title">Toolbar — Akses Cepat Editor Data</div>
        <div class="step-desc">
          <p>Tombol ikon untuk membuka: <strong>Geometric Data Editor</strong>, <strong>Steady Flow Data</strong>, <strong>Unsteady Flow Data</strong>, dan <strong>Run Simulation</strong>.</p>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">C</div>
      <div class="step-body">
        <div class="step-title">Plan Selector — Pilih Skenario Aktif</div>
        <div class="step-desc">
          <p>Menampilkan plan aktif (kombinasi geometry + flow). Satu project bisa memiliki banyak plan untuk berbagai skenario (kondisi existing, kondisi normalisasi, dll.).</p>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">D</div>
      <div class="step-body">
        <div class="step-title">Compute Buttons — Jalankan Simulasi</div>
        <div class="step-desc">
          <p>Tombol untuk menjalankan: <strong>Steady Flow Analysis</strong>, <strong>Unsteady Flow Analysis</strong>, atau <strong>RAS Mapper</strong>. Setelah simulasi selesai, output langsung tersedia.</p>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">E</div>
      <div class="step-body">
        <div class="step-title">Messages Window — Log Pesan & Error</div>
        <div class="step-desc">
          <p>Menampilkan pesan komputasi, peringatan (warnings), dan error. Selalu periksa bagian ini setelah menjalankan simulasi. Error merah = simulasi gagal, peringatan kuning = perlu diperiksa, tetapi simulasi berjalan.</p>
        </div>
      </div>
    </div>
  </div>

  <h3>Jendela-Jendela Utama Lainnya</h3>
  <div class="cards-grid">
    <div class="card">
      <span class="card-icon">🗺️</span>
      <div class="card-title">Geometric Data Editor</div>
      <div class="card-desc">Input dan edit skematik sungai, penampang melintang, nilai Manning's n, dan semua struktur hidraulik.</div>
    </div>
    <div class="card">
      <span class="card-icon">📊</span>
      <div class="card-title">Profile Plot</div>
      <div class="card-desc">Menampilkan profil muka air memanjang sepanjang sungai setelah simulasi. Dapat menampilkan beberapa profil sekaligus.</div>
    </div>
    <div class="card">
      <span class="card-icon">📐</span>
      <div class="card-title">Cross Section Plot</div>
      <div class="card-desc">Menampilkan penampang melintang di titik tertentu beserta garis muka air hasil simulasi.</div>
    </div>
    <div class="card">
      <span class="card-icon">🌍</span>
      <div class="card-title">HEC-RAS Mapper</div>
      <div class="card-desc">Visualisasi spasial: peta kedalaman banjir, peta kecepatan, animasi perambatan banjir berbasis DEM.</div>
    </div>
  </div>

  <hr class="divider">

  <!-- SECTION 5: ALUR KERJA UMUM -->
  <div class="section-heading">
    <div class="section-num">5</div>
    <h2>Alur Kerja Umum Pemodelan HEC-RAS</h2>
  </div>

  <p>Secara umum, pemodelan HEC-RAS mengikuti alur berikut — berlaku baik untuk steady maupun unsteady flow:</p>

  <div class="steps">
    <div class="step">
      <div class="step-num">1</div>
      <div class="step-body">
        <div class="step-title">Persiapan Data</div>
        <div class="step-desc">
          <p>Kumpulkan data yang diperlukan:</p>
          <ul class="prose-list">
            <li><strong>Data Topografi/Batimetri:</strong> DEM (Digital Elevation Model) atau data survei penampang melintang</li>
            <li><strong>Data Hidrologi:</strong> debit rancangan (Q<sub>T</sub>) dari HEC-HMS atau analisis frekuensi</li>
            <li><strong>Data Kekasaran:</strong> koefisien Manning's n (dari pengamatan lapangan atau referensi)</li>
            <li><strong>Data Bangunan:</strong> dimensi jembatan, gorong-gorong, bendung (jika ada)</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">2</div>
      <div class="step-body">
        <div class="step-title">Buat Project Baru</div>
        <div class="step-desc">
          <p><strong>File → New Project</strong>, tentukan nama dan lokasi folder project. HEC-RAS otomatis membuat file <span class="file-ext">.prj</span> dan sub-file terkait.</p>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">3</div>
      <div class="step-body">
        <div class="step-title">Input Data Geometri</div>
        <div class="step-desc">
          <p>Di Geometric Data Editor, buat skematik sungai dan masukkan semua penampang melintang. Data bisa diinput manual atau diimpor dari QGIS/HEC-GeoRAS (dibahas di Modul 2).</p>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">4</div>
      <div class="step-body">
        <div class="step-title">Input Data Aliran &amp; Kondisi Batas</div>
        <div class="step-desc">
          <p>Masukkan debit rancangan (steady flow) atau hidrograf (unsteady flow), serta kondisi batas (boundary conditions) di ujung hulu dan hilir model.</p>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">5</div>
      <div class="step-body">
        <div class="step-title">Buat Plan &amp; Jalankan Simulasi</div>
        <div class="step-desc">
          <p>Hubungkan satu geometry file dengan satu flow file menjadi sebuah Plan. Jalankan simulasi dan periksa log pesan (errors &amp; warnings).</p>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">6</div>
      <div class="step-body">
        <div class="step-title">Kalibrasi Model</div>
        <div class="step-desc">
          <p>Bandingkan hasil simulasi (muka air) dengan data terukur (tinggi muka air pengamatan AWLR). Sesuaikan nilai Manning's n hingga diperoleh kalibrasi yang baik.</p>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">7</div>
      <div class="step-body">
        <div class="step-title">Analisis Output &amp; Pembuatan Peta</div>
        <div class="step-desc">
          <p>Lihat profil memanjang, penampang, tabel output. Buat peta genangan di HEC-RAS Mapper menggunakan DEM terrain untuk analisis floodway dan sempadan sungai.</p>
        </div>
      </div>
    </div>
  </div>

  <hr class="divider">

  <!-- SECTION 6: DASAR TEORI -->
  <div class="section-heading">
    <div class="section-num">6</div>
    <h2>Dasar Teori: Persamaan yang Digunakan HEC-RAS</h2>
  </div>

  <h3>a. Persamaan Energi (Steady Flow)</h3>
  <p>Untuk steady flow 1D, HEC-RAS menyelesaikan persamaan energi (Bernoulli) antara dua penampang yang berdekatan:</p>

  <div class="formula-box">
    <div class="formula">Z₁ + Y₁ + α₁V₁²/2g = Z₂ + Y₂ + α₂V₂²/2g + h<sub>e</sub></div>
    <div class="formula-vars">
      <span class="formula-var">Z = elevasi dasar saluran (m)</span>
      <span class="formula-var">Y = kedalaman air (m)</span>
      <span class="formula-var">α = koefisien distribusi kecepatan</span>
      <span class="formula-var">V = kecepatan rata-rata (m/s)</span>
      <span class="formula-var">g = percepatan gravitasi (m/s²)</span>
      <span class="formula-var">h<sub>e</sub> = kehilangan energi (m)</span>
    </div>
  </div>

  <p>Kehilangan energi h<sub>e</sub> terdiri dari kehilangan akibat <strong>gesekan</strong> (menggunakan persamaan Manning) dan kehilangan akibat <strong>kontraksi/ekspansi</strong>:</p>

  <div class="formula-box">
    <div class="formula">h<sub>e</sub> = L·S̄<sub>f</sub> + C|α₂V₂²/2g − α₁V₁²/2g|</div>
    <div class="formula-vars">
      <span class="formula-var">L = panjang antara dua penampang (m)</span>
      <span class="formula-var">S̄<sub>f</sub> = gradien gesekan rata-rata</span>
      <span class="formula-var">C = koefisien kontraksi/ekspansi</span>
    </div>
  </div>

  <h3>b. Persamaan Manning</h3>
  <p>Kehilangan energi akibat gesekan dihitung menggunakan persamaan Manning:</p>

  <div class="formula-box">
    <div class="formula">Q = (1/n) · A · R<sup>2/3</sup> · S<sup>1/2</sup></div>
    <div class="formula-vars">
      <span class="formula-var">Q = debit (m³/s)</span>
      <span class="formula-var">n = koefisien kekasaran Manning</span>
      <span class="formula-var">A = luas penampang basah (m²)</span>
      <span class="formula-var">R = jari-jari hidraulik (m)</span>
      <span class="formula-var">S = kemiringan energi</span>
    </div>
  </div>

  <h3>c. Persamaan Unsteady Flow (Saint-Venant)</h3>
  <p>Untuk unsteady flow, HEC-RAS menyelesaikan persamaan Saint-Venant — gabungan <strong>persamaan kontinuitas</strong> dan <strong>persamaan momentum</strong>:</p>

  <div class="formula-box">
    <div class="formula">∂A/∂t + ∂Q/∂x = 0 &nbsp;&nbsp;&nbsp;&nbsp; [Kontinuitas]</div>
    <div class="formula" style="margin-top: 12px;">∂Q/∂t + ∂(Q²/A)/∂x + gA(∂h/∂x + S<sub>f</sub> − S₀) = 0 &nbsp;&nbsp;&nbsp;&nbsp; [Momentum]</div>
    <div class="formula-vars">
      <span class="formula-var">A = luas penampang (m²)</span>
      <span class="formula-var">Q = debit (m³/s)</span>
      <span class="formula-var">h = kedalaman air (m)</span>
      <span class="formula-var">S₀ = kemiringan dasar saluran</span>
      <span class="formula-var">S<sub>f</sub> = kemiringan energi</span>
    </div>
  </div>

  <div class="info-box">
    <div class="info-box-label">ℹ️ Catatan Praktis</div>
    <p>Anda tidak perlu menyelesaikan persamaan-persamaan ini secara manual — HEC-RAS melakukannya secara numerik. Namun, memahami konsep dasarnya sangat penting untuk interpretasi hasil dan pemecahan masalah saat model tidak stabil atau menghasilkan output yang tidak wajar.</p>
  </div>

  <hr class="divider">

  <!-- SECTION 7: NILAI MANNING N -->
  <div class="section-heading">
    <div class="section-num">7</div>
    <h2>Panduan Nilai Manning's n untuk Indonesia</h2>
  </div>

  <p>Koefisien kekasaran Manning (<em>n</em>) adalah parameter paling sensitif dalam pemodelan HEC-RAS. Pemilihan nilai yang tidak tepat akan memberikan hasil profil muka air yang tidak akurat. Berikut panduan nilai <em>n</em> yang umum digunakan:</p>

  <table class="file-table">
    <thead>
      <tr>
        <th>Kondisi Saluran</th>
        <th>n Minimum</th>
        <th>n Normal</th>
        <th>n Maksimum</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Saluran beton halus</td>
        <td>0.011</td>
        <td>0.013</td>
        <td>0.015</td>
      </tr>
      <tr>
        <td>Saluran batu kali (pasangan)</td>
        <td>0.015</td>
        <td>0.017</td>
        <td>0.020</td>
      </tr>
      <tr>
        <td>Sungai alam — lurus, bersih</td>
        <td>0.025</td>
        <td>0.030</td>
        <td>0.033</td>
      </tr>
      <tr>
        <td>Sungai alam — berkelok, vegetasi ringan</td>
        <td>0.033</td>
        <td>0.040</td>
        <td>0.045</td>
      </tr>
      <tr>
        <td>Sungai alam — vegetasi lebat/akar</td>
        <td>0.050</td>
        <td>0.070</td>
        <td>0.080</td>
      </tr>
      <tr>
        <td>Dataran banjir — padang rumput pendek</td>
        <td>0.025</td>
        <td>0.030</td>
        <td>0.035</td>
      </tr>
      <tr>
        <td>Dataran banjir — semak belukar</td>
        <td>0.035</td>
        <td>0.050</td>
        <td>0.070</td>
      </tr>
      <tr>
        <td>Dataran banjir — hutan/pepohonan lebat</td>
        <td>0.080</td>
        <td>0.100</td>
        <td>0.120</td>
      </tr>
      <tr>
        <td>Dataran banjir — kawasan permukiman</td>
        <td>0.025</td>
        <td>0.040</td>
        <td>0.060</td>
      </tr>
    </tbody>
  </table>

  <div class="info-box warning">
    <div class="info-box-label">⚠️ Penting: Kalibrasi Manning's n</div>
    <p>Nilai tabel di atas hanya sebagai titik awal. Selalu lakukan <strong>kalibrasi</strong> dengan membandingkan muka air simulasi terhadap data observasi (muka air terukur di AWLR). Target kalibrasi yang baik: perbedaan muka air simulasi vs. observasi ≤ 10–15 cm pada debit observasi.</p>
  </div>

  <hr class="divider">

  <!-- RINGKASAN -->
  <div class="summary-box">
    <div class="summary-title">📚 Ringkasan Modul 1</div>
    <ul class="summary-list">
      <li>HEC-RAS adalah software hidrolika gratis dari USACE untuk simulasi aliran sungai 1D dan 2D</li>
      <li>Memiliki 4 komponen: steady flow, unsteady flow, sediment transport, water quality</li>
      <li>Project terdiri dari file .prj, .g0x (geometri), .f0x/.u0x (aliran), .p0x (plan), .O0x (output)</li>
      <li>Alur kerja: persiapan data → geometri → data aliran → plan → simulasi → kalibrasi → output</li>
      <li>Steady flow menggunakan persamaan energi; unsteady flow menggunakan persamaan Saint-Venant</li>
      <li>Manning's n adalah parameter kalibrasi paling kritis — selalu kalibrasi dengan data lapangan</li>
    </ul>
  </div>

  <!-- NEXT MODULE -->
  <a href="/post/materi-persiapan-geometri/" class="next-module">
    <div>
      <div class="next-label">Modul Berikutnya →</div>
      <div class="next-title">Modul 2: Persiapan Data Geometri untuk HEC-RAS</div>
    </div>
    <div class="next-arrow">→</div>
  </a>

  <p class="footnote">
    Referensi: HEC-RAS User's Manual v6.x (USACE Hydrologic Engineering Center) · Chow, V.T. (1959). Open Channel Hydraulics · Permen PUPR No. 28/PRT/M/2015
  </p>
</div>
{{< /rawhtml >}}
