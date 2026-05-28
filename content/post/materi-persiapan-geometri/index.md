---
title: "Modul 2 — Persiapan Data Geometri untuk HEC-RAS"
summary: "Tiga metode membuat geometri HEC-RAS: langsung dari RAS Mapper menggunakan DEMNAS, via HEC-GeoRAS/QGIS, dan input manual. Termasuk tutorial video dan tips dari pengalaman di proyek nyata."
authors: ["irpan-chumaedi"]
tags: ["HEC-RAS", "RAS Mapper", "DEMNAS", "QGIS", "HEC-GeoRAS", "geometri", "tutorial"]
categories: ["HEC-RAS"]
date: 2024-01-02
lastmod: 2024-01-02
featured: false
draft: false
description: "Tutorial lengkap persiapan geometri HEC-RAS: tiga metode (RAS Mapper+DEMNAS, HEC-GeoRAS/QGIS, input manual), penentuan cross section, Manning's n, dan verifikasi geometri."
modul_hecras: true
reading_time: true
share: true
profile: false
commentable: false
---

{{< rawhtml >}}
<div class="hecras-modul">
<div class="objectives">
    <div class="objectives-title">🎯 Tujuan Pembelajaran</div>
    <ul>
      <li><div class="obj-check">✓</div> Memahami jenis dan sumber data topografi/batimetri untuk pemodelan HEC-RAS</li>
      <li><div class="obj-check">✓</div> Mampu membuat geometri 1D langsung dari RAS Mapper menggunakan terrain DEMNAS — tanpa perlu QGIS terpisah</li>
      <li><div class="obj-check">✓</div> Menguasai workflow pembuatan layer GIS di QGIS sebagai persiapan HEC-GeoRAS</li>
      <li><div class="obj-check">✓</div> Mampu mengekstrak penampang melintang dari DEM menggunakan HEC-GeoRAS</li>
      <li><div class="obj-check">✓</div> Memahami cara menggabungkan data DEM dengan data survei batimetri lapangan</li>
      <li><div class="obj-check">✓</div> Mampu mengimpor data geometri ke HEC-RAS dan melakukan pengecekan</li>
    </ul>
  </div>

  <!-- SECTION 1 -->
  <div class="section-heading">
    <div class="section-num">1</div>
    <h2>Data yang Dibutuhkan</h2>
  </div>

  <p>Sebelum memulai pemodelan HEC-RAS, pastikan data berikut sudah tersedia:</p>

  <div class="cards-grid">
    <div class="card">
      <span class="card-icon">🏔️</span>
      <div class="card-title">DEM (Digital Elevation Model)</div>
      <div class="card-desc">Data elevasi terrain dalam format raster. Resolusi tipikal: 0.5–30 m tergantung sumber.</div>
    </div>
    <div class="card">
      <span class="card-icon">📏</span>
      <div class="card-title">Data Survei Batimetri</div>
      <div class="card-desc">Pengukuran kedalaman dasar sungai dari survei lapangan (lebih akurat dari DEM untuk bagian dalam sungai).</div>
    </div>
    <div class="card">
      <span class="card-icon">🗺️</span>
      <div class="card-title">Peta Alur Sungai</div>
      <div class="card-desc">Shapefile garis tengah sungai (centerline), tepi sungai (bank lines), dan batas dataran banjir.</div>
    </div>
    <div class="card">
      <span class="card-icon">📐</span>
      <div class="card-title">Data Struktur Hidraulik</div>
      <div class="card-desc">Dimensi jembatan, gorong-gorong, bendung, pintu air (dari as-built drawing atau survei).</div>
    </div>
  </div>

  <h3>Sumber Data DEM untuk Indonesia</h3>

  <table class="file-table">
    <thead>
      <tr><th>Sumber Data</th><th>Resolusi</th><th>Ketersediaan</th><th>Keterangan</th></tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>DEMNAS (BIG)</strong></td>
        <td>0.27 arcsec (~8 m)</td>
        <td>Seluruh Indonesia</td>
        <td>Sumber utama. Download gratis dari tanahair.indonesia.go.id. Akurasi vertikal ±3 m.</td>
      </tr>
      <tr>
        <td><strong>SRTM (NASA/USGS)</strong></td>
        <td>1 arcsec (~30 m)</td>
        <td>Global</td>
        <td>Resolusi lebih rendah, namun coverage global dan mudah diakses. Tidak cocok untuk pemodelan detail.</td>
      </tr>
      <tr>
        <td><strong>ALOS-PALSAR (JAXA)</strong></td>
        <td>~12.5 m</td>
        <td>Global</td>
        <td>Alternatif SRTM dengan resolusi lebih baik. Tersedia di ASF Data Search.</td>
      </tr>
      <tr>
        <td><strong>LiDAR (PUPR/BWS)</strong></td>
        <td>0.5–2 m</td>
        <td>Terbatas (proyek)</td>
        <td>Akurasi tertinggi. Biasanya tersedia untuk proyek PUPR/BWS di wilayah rawan banjir.</td>
      </tr>
      <tr>
        <td><strong>Survei Topografi Manual</strong></td>
        <td>Sesuai kebutuhan</td>
        <td>Area survei</td>
        <td>Untuk proyek perencanaan detail yang membutuhkan akurasi tinggi di area spesifik.</td>
      </tr>
    </tbody>
  </table>

  <div class="info-box warning">
    <div class="info-box-label">⚠️ Keterbatasan DEM untuk Batimetri Sungai</div>
    <p>DEM dari citra satelit (SRTM, DEMNAS) <strong>tidak dapat mengukur bagian bawah air</strong> (dasar sungai). Bagian dalam sungai yang terisi air akan terlihat sebagai permukaan air, bukan dasar sungai yang sesungguhnya. Untuk sungai yang cukup lebar, <strong>data survei batimetri lapangan wajib digabungkan</strong> dengan DEM untuk mendapatkan geometri penampang melintang yang akurat.</p>
  </div>

  <hr class="divider">

  <!-- SECTION 2 -->
  <div class="section-heading">
    <div class="section-num">2</div>
    <h2>Tiga Metode Pembuatan Geometri — Pilih yang Paling Sesuai</h2>
  </div>

  <p>Berdasarkan pengalaman di berbagai proyek, ada tiga jalur yang bisa ditempuh untuk menyiapkan geometri HEC-RAS. Setiap metode punya kelebihan dan situasi terbaik penggunaannya.</p>

  <div class="persona-note">
    <div class="persona-avatar">💬</div>
    <div class="persona-body">
      <div class="persona-name">Irpan Chumaedi · Konsultan SDA</div>
      <div class="persona-text">Di pekerjaan sehari-hari, saya paling sering pakai <strong>Metode B — langsung dari RAS Mapper</strong> untuk proyek-proyek yang waktunya mepet. DEMNAS sudah cukup akurat untuk skala perencanaan, dan prosesnya jauh lebih cepat dibanding export-import lewat QGIS. Baru saat proyek butuh akurasi tinggi atau punya data survei batimetri lengkap, saya beralih ke Metode A via HEC-GeoRAS.</div>
    </div>
  </div>

  <div class="method-compare">
    <div class="mc-card">
      <div class="mc-header" style="background:rgba(124,110,247,0.08);border-bottom-color:rgba(124,110,247,0.2);">
        <div class="mc-title" style="color:var(--hec-primary);">Metode A</div>
        <div class="mc-sub">HEC-GeoRAS via QGIS</div>
      </div>
      <div class="mc-body">
        <div class="mc-row"><span class="mc-label">Waktu setup</span><span class="mc-val val-bad">Lama</span></div>
        <div class="mc-row"><span class="mc-label">Akurasi</span><span class="mc-val val-good">Tinggi</span></div>
        <div class="mc-row"><span class="mc-label">Software tambahan</span><span class="mc-val val-bad">QGIS + Plugin</span></div>
        <div class="mc-row"><span class="mc-label">Cocok untuk</span><span class="mc-val">Proyek besar</span></div>
      </div>
    </div>
    <div class="mc-card">
      <div class="mc-header" style="background:rgba(79,196,160,0.08);border-bottom-color:rgba(79,196,160,0.2);">
        <div class="mc-title" style="color:var(--hec-success);">Metode B ⭐</div>
        <div class="mc-sub">Langsung di RAS Mapper</div>
      </div>
      <div class="mc-body">
        <div class="mc-row"><span class="mc-label">Waktu setup</span><span class="mc-val val-good">Cepat</span></div>
        <div class="mc-row"><span class="mc-label">Akurasi</span><span class="mc-val val-mid">Cukup</span></div>
        <div class="mc-row"><span class="mc-label">Software tambahan</span><span class="mc-val val-good">Tidak perlu</span></div>
        <div class="mc-row"><span class="mc-label">Cocok untuk</span><span class="mc-val">Kebanyakan proyek</span></div>
      </div>
    </div>
    <div class="mc-card">
      <div class="mc-header" style="background:rgba(244,166,66,0.08);border-bottom-color:rgba(244,166,66,0.2);">
        <div class="mc-title" style="color:var(--hec-warning);">Metode C</div>
        <div class="mc-sub">Input Manual</div>
      </div>
      <div class="mc-body">
        <div class="mc-row"><span class="mc-label">Waktu setup</span><span class="mc-val val-mid">Sedang</span></div>
        <div class="mc-row"><span class="mc-label">Akurasi</span><span class="mc-val val-good">Sangat tinggi</span></div>
        <div class="mc-row"><span class="mc-label">Software tambahan</span><span class="mc-val val-good">Tidak perlu</span></div>
        <div class="mc-row"><span class="mc-label">Cocok untuk</span><span class="mc-val">Data survei lengkap</span></div>
      </div>
    </div>
  </div>

  <!-- TAB NAVIGATOR -->
  <div class="method-tabs">
    <button class="method-tab active" onclick="switchMethod(this,'ma')">
      🔗 Metode A
      <span class="mt-badge">HEC-GeoRAS via QGIS</span>
    </button>
    <button class="method-tab" onclick="switchMethod(this,'mb')">
      ⭐ Metode B
      <span class="mt-badge">Langsung di RAS Mapper</span>
    </button>
    <button class="method-tab" onclick="switchMethod(this,'mc')">
      ✏️ Metode C
      <span class="mt-badge">Input Manual</span>
    </button>
  </div>

  <!-- ──────────────────── METODE A ──────────────────── -->
  <div class="method-panel active" id="panel-ma">
    <div style="padding: 1.5rem 0 0.5rem;">
      <span class="method-badge badge-qgis">🔗 Metode A — HEC-GeoRAS via QGIS</span>
      <p>Plugin HEC-GeoRAS memungkinkan Anda menyiapkan semua layer geometri di QGIS, lalu mengekspornya ke format XML yang bisa langsung diimpor HEC-RAS. Metode ini paling fleksibel dan cocok untuk model skala besar dengan jaringan sungai yang kompleks.</p>

      <h3>Layer GIS yang Dibutuhkan di QGIS</h3>
      <div class="layer-box"><div class="layer-num">L1</div><div><div class="layer-name">Stream Centerline</div><div class="layer-desc">Garis tengah alur sungai — digambar dari hulu ke hilir. Basis utama seluruh model.</div></div></div>
      <div class="layer-box"><div class="layer-num">L2</div><div><div class="layer-name">Bank Lines</div><div class="layer-desc">Garis tepi sungai kiri dan kanan — menentukan batas antara main channel dan dataran banjir.</div></div></div>
      <div class="layer-box"><div class="layer-num">L3</div><div><div class="layer-name">Flow Paths</div><div class="layer-desc">Jalur aliran di channel, left overbank, dan right overbank — untuk menghitung panjang antar penampang.</div></div></div>
      <div class="layer-box"><div class="layer-num">L4</div><div><div class="layer-name">Cross Section Cut Lines</div><div class="layer-desc">Garis-garis penampang melintang, tegak lurus aliran. HEC-GeoRAS akan mengekstrak elevasi dari DEM di sepanjang garis ini.</div></div></div>
      <div class="layer-box"><div class="layer-num">L5</div><div><div class="layer-name">Land Use / Manning's n</div><div class="layer-desc">Polygon penggunaan lahan — untuk penentuan nilai Manning's n secara spasial.</div></div></div>
      <div class="layer-box"><div class="layer-num">L6</div><div><div class="layer-name">Inline Structures</div><div class="layer-desc">Lokasi jembatan, bendung, gorong-gorong (opsional jika ada bangunan hidraulik).</div></div></div>

      <h3>Langkah-langkah Alur Kerja</h3>
      <div class="steps">
        <div class="step">
          <div class="step-num">1</div>
          <div class="step-body">
            <div class="step-title">Install Plugin HEC-GeoRAS di QGIS</div>
            <div class="step-desc"><p>Buka QGIS → <strong>Plugins → Manage and Install Plugins</strong> → cari "HEC-GeoRAS" → Install. Setelah terinstall, toolbar HEC-GeoRAS muncul di QGIS.</p></div>
          </div>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <div class="step-body">
            <div class="step-title">Load DEM dan Atur CRS</div>
            <div class="step-desc"><p>Load DEM DEMNAS ke QGIS. Atur CRS project ke sistem proyeksi metrik (misal <strong>EPSG:32748</strong> untuk UTM Zone 48S / WGS84). Ini kritis — HEC-GeoRAS tidak bekerja baik di sistem koordinat geografis (derajat).</p></div>
          </div>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <div class="step-body">
            <div class="step-title">Digitasi Semua Layer GIS</div>
            <div class="step-desc">
              <p>Buat shapefile baru untuk setiap layer (L1–L4 minimal). Aturan digitasi kritis:</p>
              <ul class="prose-list">
                <li>Stream Centerline: gambar <strong>dari hulu ke hilir</strong> (searah aliran)</li>
                <li>Cross Section: gambar <strong>dari kiri ke kanan</strong> saat menghadap ke hilir (left bank ke right bank)</li>
                <li>Setiap XS harus <strong>memotong centerline tepat sekali</strong> dan tidak saling berpotongan antar XS</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="step">
          <div class="step-num">4</div>
          <div class="step-body">
            <div class="step-title">Ekstrak Elevasi dari DEM</div>
            <div class="step-desc"><p>Di toolbar HEC-GeoRAS: <strong>RAS Geometry → XS Cut Lines → Drape XS on DEM</strong>. Plugin akan membaca elevasi DEM di sepanjang setiap garis XS dan menyimpannya sebagai atribut shapefile.</p></div>
          </div>
        </div>
        <div class="step">
          <div class="step-num">5</div>
          <div class="step-body">
            <div class="step-title">Export ke Format RAS</div>
            <div class="step-desc"><p>Di toolbar HEC-GeoRAS: <strong>RAS Geometry → Export RAS Data</strong>. Simpan file <span class="file-ext">.xml</span>. File ini berisi semua data geometri yang siap diimpor ke HEC-RAS.</p></div>
          </div>
        </div>
        <div class="step">
          <div class="step-num">6</div>
          <div class="step-body">
            <div class="step-title">Import ke HEC-RAS</div>
            <div class="step-desc"><p>Di HEC-RAS: buka <strong>Geometric Data Editor → File → Import Geometry Data → GIS Format</strong> → pilih file XML. HEC-RAS akan mengimpor semua river reach, cross section, dan Manning's n sekaligus.</p></div>
          </div>
        </div>
      </div>

      <div class="info-box">
        <div class="info-box-label">💡 Tips Irpan</div>
        <p>Kalau mau lebih mudah dari HEC-GeoRAS klasik, coba plugin <strong>RiverGIS</strong> di QGIS — fungsinya mirip tapi antarmukanya lebih modern dan didukung database PostgreSQL/SpatiaLite untuk model besar. Workflow-nya hampir sama, output-nya bisa langsung ke format SDF yang dibaca HEC-RAS.</p>
      </div>
    </div>
  </div>

  <!-- ──────────────────── METODE B ──────────────────── -->
  <div class="method-panel" id="panel-mb">
    <div style="padding: 1.5rem 0 0.5rem;">
      <span class="method-badge badge-ras">⭐ Metode B — Langsung di RAS Mapper (Rekomendasi Praktis)</span>
      <p>Sejak HEC-RAS versi 5.x ke atas, RAS Mapper sudah dilengkapi fitur editing geometri 1D secara langsung di atas terrain DEM — tanpa harus keluar ke QGIS dulu. Ini adalah metode yang paling sering saya gunakan di proyek sehari-hari karena <strong>lebih cepat dan tetap cukup akurat</strong> untuk skala perencanaan.</p>

      <!-- VIDEO EMBED -->
      <div class="video-wrap">
        <iframe
          src="https://www.youtube.com/embed/efpCbPyHNbQ?start=84"
          title="Input Geometri 1D HEC-RAS dari DEMNAS — Irpan Chumaedi"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
      <p class="video-caption">
        📹 Tutorial video: <a href="https://www.youtube.com/watch?v=efpCbPyHNbQ&t=84s" target="_blank" rel="noopener">Input Geometri 1D HEC-RAS dari DEMNAS</a> — Irpan Chumaedi (@irpanch)
      </p>

      <div class="persona-note">
        <div class="persona-avatar">💬</div>
        <div class="persona-body">
          <div class="persona-name">Irpan Chumaedi · Catatan dari video</div>
          <div class="persona-text">Di video ini saya tunjukkan langkah demi langkah mulai dari load DEMNAS ke RAS Mapper, buat river centerline dan cross section langsung di atas terrain, hingga hasilnya bisa langsung dijalankan simulasinya. <strong>Tidak perlu QGIS, tidak perlu plugin tambahan</strong> — semuanya ada di dalam HEC-RAS.</div>
        </div>
      </div>

      <h3>Langkah-langkah: Geometri 1D dari DEMNAS di RAS Mapper</h3>

      <div class="steps">
        <div class="step">
          <div class="step-num">1</div>
          <div class="step-body">
            <div class="step-title">Buat Project HEC-RAS & Buka RAS Mapper</div>
            <div class="step-desc">
              <p>Di Main Window HEC-RAS: <strong>File → New Project</strong>. Beri nama project dan pilih folder kerja. Kemudian buka RAS Mapper: <strong>View → RAS Mapper</strong> (atau klik ikon peta di toolbar).</p>
              <div class="info-box warning">
                <div class="info-box-label">⚠️ Buat folder terpisah</div>
                <p>Selalu buat satu folder kosong khusus per project. Jangan simpan di Desktop atau path yang terlalu panjang — HEC-RAS sensitif terhadap panjang path file.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <div class="step-body">
            <div class="step-title">Set Sistem Koordinat (Projection)</div>
            <div class="step-desc">
              <p>Di RAS Mapper: <strong>Tools → Set Projection</strong>. Pilih file <span class="file-ext">.prj</span> yang sesuai, atau klik "Download Projection from EPSG" dan masukkan kode EPSG.</p>
              <ul class="prose-list">
                <li>Jawa Barat, Jawa Tengah bagian barat: <strong>EPSG:32748</strong> (WGS84 / UTM Zone 48S)</li>
                <li>Jawa Tengah bagian timur, Jawa Timur: <strong>EPSG:32749</strong> (UTM Zone 49S)</li>
                <li>Kalimantan Selatan, Kalimantan Timur: <strong>EPSG:32750</strong> (UTM Zone 50S)</li>
              </ul>
              <div class="info-box danger">
                <div class="info-box-label">🚫 Wajib dilakukan sebelum load terrain</div>
                <p>Jika projection tidak di-set terlebih dahulu, terrain DEM bisa tidak muncul atau muncul di lokasi yang salah. Set projection adalah langkah pertama yang tidak boleh dilewatkan.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <div class="step-body">
            <div class="step-title">Load DEM DEMNAS sebagai Terrain</div>
            <div class="step-desc">
              <p>Di RAS Mapper: klik kanan pada <strong>"Terrains"</strong> di panel kiri → <strong>"Create a New RAS Terrain"</strong>. Klik ikon + untuk menambahkan file GeoTIFF DEMNAS.</p>
              <p>Jika DEMNAS yang didownload terdiri dari beberapa tile (kotak-kotak), tambahkan semuanya sekaligus — RAS Mapper akan otomatis melakukan mosaicking (penggabungan) menjadi satu terrain.</p>
              <div class="info-box">
                <div class="info-box-label">💡 Download DEMNAS</div>
                <p>DEMNAS tersedia gratis di <strong>tanahair.indonesia.go.id</strong>. Daftar akun, pilih area yang ingin diunduh, download tile dalam format GeoTIFF. Resolusinya ~8 m — lebih dari cukup untuk kebanyakan proyek SDA.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="step">
          <div class="step-num">4</div>
          <div class="step-body">
            <div class="step-title">Buat File Geometri Baru</div>
            <div class="step-desc"><p>Di Main Window HEC-RAS: <strong>Edit → Geometric Data</strong>. Di Geometric Data Editor: <strong>File → New Geometry Data</strong>. Beri nama file geometri (misal: <span class="file-ext">Geometri_SungaiBanjar_v1</span>). Kemudian kembali ke RAS Mapper — Anda sekarang bisa mulai editing geometri di atas terrain yang sudah di-load.</p></div>
          </div>
        </div>
        <div class="step">
          <div class="step-num">5</div>
          <div class="step-body">
            <div class="step-title">Digitasi River Centerline di RAS Mapper</div>
            <div class="step-desc">
              <p>Di RAS Mapper: klik kanan pada <strong>"Geometry" → nama geometry file Anda → "River"</strong> → klik tombol edit (pensil). Toolbar editing akan muncul.</p>
              <p>Klik dan gambar alur sungai mengikuti thalweg (bagian terdalam sungai) <strong>dari hulu ke hilir</strong>. Manfaatkan basemap satelit sebagai referensi — aktifkan di RAS Mapper: <strong>Layer → Add Web Imagery Layer</strong>.</p>
              <ul class="prose-list">
                <li>Klik kiri untuk menambah titik, double-klik untuk mengakhiri garis</li>
                <li>Beri nama River (nama sungai) dan Reach (nama ruas) saat diminta</li>
                <li>Untuk sistem bercabang: gambar reach anak sungai dahulu, pastikan ujungnya bertemu tepat di centerline sungai utama</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="step">
          <div class="step-num">6</div>
          <div class="step-body">
            <div class="step-title">Tambahkan Bank Lines</div>
            <div class="step-desc"><p>Masih dalam mode edit: klik kanan → <strong>"Bank Lines"</strong>. Digitasi garis tepi sungai kiri dan kanan mengikuti batas antara saluran utama (channel) dan dataran banjir. Bank lines ini yang akan menentukan posisi bank station di setiap cross section secara otomatis.</p></div>
          </div>
        </div>
        <div class="step">
          <div class="step-num">7</div>
          <div class="step-body">
            <div class="step-title">Buat Cross Section Cut Lines</div>
            <div class="step-desc">
              <p>Klik kanan → <strong>"Cross Sections"</strong>. Gambar garis-garis XS yang <strong>tegak lurus terhadap aliran</strong>, memotong centerline, dan melebar hingga mencakup dataran banjir di kedua sisi.</p>
              <p><strong>Panduan jarak antar XS:</strong></p>
              <ul class="prose-list">
                <li>Di daerah yang geometrinya seragam dan lurus: 200–500 m sudah cukup</li>
                <li>Di tikungan, penyempitan, atau dekat bangunan hidraulik: 25–100 m</li>
                <li>Aturan praktis: semakin banyak XS, semakin detail dan stabil model, tapi komputasi lebih berat</li>
              </ul>
              <div class="info-box warning">
                <div class="info-box-label">⚠️ Aturan Tidak Boleh Dilanggar</div>
                <p>Setiap XS harus memotong river centerline <strong>tepat satu kali</strong>. XS tidak boleh saling berpotongan satu sama lain. Jika ada yang melanggar, HEC-RAS akan error saat preprocessing.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="step">
          <div class="step-num">8</div>
          <div class="step-body">
            <div class="step-title">Extract Elevasi dari Terrain (Otomatis)</div>
            <div class="step-desc">
              <p>Setelah semua XS selesai digambar, klik kanan pada layer Cross Sections → <strong>"Update Cross Sections from Terrain"</strong>. RAS Mapper akan membaca elevasi DEMNAS di sepanjang setiap XS dan mengisi data elevasi secara otomatis.</p>
              <p>Hasilnya langsung bisa dilihat di Geometric Data Editor → klik dua kali pada salah satu XS untuk melihat profilnya.</p>
            </div>
          </div>
        </div>
        <div class="step">
          <div class="step-num">9</div>
          <div class="step-body">
            <div class="step-title">Isi Manning's n & Verifikasi</div>
            <div class="step-desc">
              <p>Di Geometric Data Editor: klik dua kali pada tiap XS → isi nilai Manning's n untuk channel, left overbank, dan right overbank. Untuk efisiensi, gunakan <strong>Edit → Set Manning's n for Multiple Cross Sections</strong> untuk mengisi banyak XS sekaligus.</p>
              <p>Verifikasi geometri dengan melihat profil memanjang: <strong>View → Profile Plot</strong>. Pastikan elevasi thalweg turun secara konsisten dari hulu ke hilir — tidak ada loncatan naik yang tidak wajar.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="persona-note">
        <div class="persona-avatar">💬</div>
        <div class="persona-body">
          <div class="persona-name">Irpan Chumaedi · Tips Lapangan</div>
          <div class="persona-text">Satu hal yang sering luput: setelah extract elevasi dari terrain, <strong>profil dasar sungai di DEMNAS tidak merepresentasikan dasar sungai yang sebenarnya</strong> karena data satelit hanya menangkap permukaan air, bukan dasar sungai. Jadi kalau punya data survei batimetri lapangan, tetap harus dilakukan koreksi manual di bagian channel. Caranya: buka XS di Geometric Editor, edit koordinat di bagian tengah (channel) dengan data survei. Ini yang bikin perbedaan antara model yang bagus dan model yang "asal jalan".</div>
        </div>
      </div>

      <div class="info-box success">
        <div class="info-box-label">✅ Kapan Metode B Sudah Cukup?</div>
        <p>Untuk studi perencanaan awal, feasibility study, kajian AMDAL, atau saat data batimetri tidak tersedia, model dari DEMNAS via RAS Mapper sudah sangat layak. Yang perlu diingat: <strong>kalibrasi tetap wajib</strong> dilakukan dengan data muka air pengamatan untuk memvalidasi Manning's n yang dipakai.</p>
      </div>
    </div>
  </div>

  <!-- ──────────────────── METODE C ──────────────────── -->
  <div class="method-panel" id="panel-mc">
    <div style="padding: 1.5rem 0 0.5rem;">
      <span class="method-badge badge-manual">✏️ Metode C — Input Manual di Geometric Data Editor</span>
      <p>Metode ini digunakan saat data survei penampang melintang lapangan sudah lengkap dalam bentuk tabel (Excel/CSV) dan Anda ingin memasukkannya langsung tanpa perantara GIS. Akurasi tertinggi karena menggunakan data ukur langsung, tapi memakan waktu lebih banyak untuk input.</p>

      <div class="steps">
        <div class="step">
          <div class="step-num">1</div>
          <div class="step-body">
            <div class="step-title">Buat Skematik Sungai</div>
            <div class="step-desc"><p>Di Geometric Data Editor: klik ikon gambar sungai (Draw River Reach). Gambar reach dari hulu ke hilir dengan klik dan drag. Double-klik untuk selesai. Isi nama River, Reach, dan tentukan stationing hulu (angka yang mewakili jarak dari muara/referensi).</p></div>
          </div>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <div class="step-body">
            <div class="step-title">Input Data Tiap Penampang</div>
            <div class="step-desc">
              <p>Klik ikon Cross Section → Add cross section. Untuk setiap XS, masukkan:</p>
              <ul class="prose-list">
                <li><strong>River Station:</strong> jarak dari titik referensi hulu (m)</li>
                <li><strong>Station–Elevation:</strong> pasangan koordinat penampang dari kiri ke kanan, dalam meter</li>
                <li><strong>Manning's n:</strong> untuk channel, left OB, right OB</li>
                <li><strong>Bank Stations:</strong> station koordinat kiri dan kanan tepi saluran</li>
                <li><strong>Downstream Reach Lengths:</strong> jarak ke XS berikutnya (channel, LOB, ROB) — biasanya disamakan kecuali ada meander yang signifikan</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <div class="step-body">
            <div class="step-title">Gunakan Fitur Copy & Paste dari Excel</div>
            <div class="step-desc"><p>HEC-RAS mendukung paste langsung dari clipboard Excel ke tabel Station–Elevation. Siapkan data di dua kolom (Station | Elevation) di Excel, pilih semua sel, Ctrl+C, lalu klik di sel pertama tabel HEC-RAS dan Ctrl+V. Ini jauh lebih cepat dari input satu per satu.</p></div>
          </div>
        </div>
        <div class="step">
          <div class="step-num">4</div>
          <div class="step-body">
            <div class="step-title">Interpolasi XS (jika jarak survei terlalu jarang)</div>
            <div class="step-desc"><p>Jika jarak antar XS hasil survei terlalu jauh (>500 m untuk sungai sedang), gunakan fitur interpolasi: <strong>Tools → XS Interpolation</strong>. HEC-RAS akan membuat XS tambahan di antara XS yang ada dengan interpolasi linier. XS interpolasi ditandai dengan tanda asterisk (*) di nama stasiunnya.</p></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <hr class="divider">

  <!-- SECTION 3 -->
  <div class="section-heading">
    <div class="section-num">3</div>
    <h2>Teknik Menggambar Cross Section Cut Lines yang Benar</h2>
  </div>

  <p>Kualitas model HEC-RAS sangat bergantung pada posisi dan orientasi garis penampang melintang yang dibuat di QGIS. Berikut kaidah yang harus diikuti:</p>

  <div class="steps">
    <div class="step">
      <div class="step-num">✓</div>
      <div class="step-body">
        <div class="step-title">Orientasi: Tegak Lurus Arah Aliran</div>
        <div class="step-desc">
          <p>Garis penampang harus <strong>tegak lurus terhadap arah aliran</strong>, bukan tegak lurus terhadap garis sungai yang mungkin berkelok. Bayangkan seorang pengamat berdiri di atas perahu — garis penampang adalah bidang tegak lurus di depannya.</p>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">✓</div>
      <div class="step-body">
        <div class="step-title">Cakupan: Mencakup Seluruh Dataran Banjir</div>
        <div class="step-desc">
          <p>Garis penampang harus <strong>cukup panjang</strong> untuk mencakup seluruh area yang berpotensi tergenang banjir — termasuk dataran banjir kiri dan kanan. Aturan praktis: panjang garis ≥ 3–5× lebar sungai, atau hingga area yang secara fisik tidak tergenang (jalan raya, tanggul, elevasi tinggi).</p>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">✓</div>
      <div class="step-body">
        <div class="step-title">Jarak Antar Penampang</div>
        <div class="step-desc">
          <p>Tidak ada aturan baku, namun panduan umum:</p>
          <ul class="prose-list">
            <li><strong>Area di mana topografi berubah drastis</strong> (belokan, penyempitan, pelebaran) → penampang lebih rapat (10–50 m)</li>
            <li><strong>Sungai lurus dengan topografi seragam</strong> → penampang bisa lebih jarang (100–500 m)</li>
            <li><strong>Di dekat struktur hidraulik</strong> (jembatan, bendung) → wajib ada penampang tepat di upstream dan downstream struktur</li>
          </ul>
          <div class="tip-box"><p><strong>Aturan praktis:</strong> Jarak antar penampang ≤ 1.0× lebar sungai aktif untuk akurasi yang baik.</p></div>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">✓</div>
      <div class="step-body">
        <div class="step-title">Tidak Boleh Saling Berpotongan</div>
        <div class="step-desc">
          <p>Garis penampang melintang <strong>tidak boleh saling berpotongan satu sama lain</strong>. Jika sungai sangat berkelok (meander), garis penampang harus disesuaikan agar tidak berpotongan di sisi dataran banjir. Jika terpaksa berpotongan, pertimbangkan membagi reach menjadi dua bagian atau menggunakan pemodelan 2D.</p>
        </div>
      </div>
    </div>
  </div>

  <hr class="divider">

  <!-- SECTION 4 -->
  <div class="section-heading">
    <div class="section-num">4</div>
    <h2>Menggabungkan DEM dengan Data Batimetri Lapangan</h2>
  </div>

  <p>Ini adalah salah satu tantangan terbesar dalam persiapan geometri HEC-RAS. Data survei batimetri lapangan memiliki akurasi tinggi untuk bagian dalam sungai, sedangkan DEM lebih baik untuk dataran banjir (overbank). Keduanya harus digabungkan secara cermat.</p>

  <h3>Pendekatan 1: Merge Langsung di Penampang HEC-RAS</h3>
  <p>Setelah data diimpor dari HEC-GeoRAS, edit penampang melintang secara manual di Geometric Data Editor. Timpa titik-titik koordinat di bagian channel dengan koordinat dari data survei batimetri lapangan. Pendekatan ini cocok untuk sungai dengan jumlah penampang terbatas.</p>

  <div class="code-block">
    <span class="code-comment"># Contoh format data survei batimetri yang siap diimpor ke HEC-RAS</span><br>
    <span class="code-comment"># Kolom: Station (m dari kiri) | Elevation (m DPL)</span><br>
    Station &nbsp;&nbsp; Elevation<br>
    0.00 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 12.50 &nbsp;&nbsp; <span class="code-comment"># Tepi kiri (dari DEM)</span><br>
    15.20 &nbsp;&nbsp;&nbsp;&nbsp; 12.30 &nbsp;&nbsp; <span class="code-comment"># Dataran banjir kiri</span><br>
    28.50 &nbsp;&nbsp;&nbsp;&nbsp; 10.80 &nbsp;&nbsp; <span class="code-comment"># Tepi kiri sungai (bank)</span><br>
    30.00 &nbsp;&nbsp;&nbsp;&nbsp; 8.20 &nbsp;&nbsp;&nbsp; <span class="code-comment"># Dasar sungai kiri (dari batimetri)</span><br>
    35.00 &nbsp;&nbsp;&nbsp;&nbsp; 7.85 &nbsp;&nbsp;&nbsp; <span class="code-comment"># Titik terdalam dasar sungai</span><br>
    40.00 &nbsp;&nbsp;&nbsp;&nbsp; 8.10 &nbsp;&nbsp;&nbsp; <span class="code-comment"># Dasar sungai kanan (dari batimetri)</span><br>
    42.00 &nbsp;&nbsp;&nbsp;&nbsp; 10.90 &nbsp;&nbsp; <span class="code-comment"># Tepi kanan sungai (bank)</span><br>
    55.80 &nbsp;&nbsp;&nbsp;&nbsp; 12.45 &nbsp;&nbsp; <span class="code-comment"># Dataran banjir kanan</span><br>
    70.00 &nbsp;&nbsp;&nbsp;&nbsp; 12.80 &nbsp;&nbsp; <span class="code-comment"># Tepi kanan (dari DEM)</span>
  </div>

  <h3>Pendekatan 2: Terrain Composite (HEC-RAS Mapper)</h3>
  <p>HEC-RAS Mapper mendukung pembuatan terrain komposit dari beberapa sumber data:</p>
  <div class="steps">
    <div class="step">
      <div class="step-num">1</div>
      <div class="step-body">
        <div class="step-title">Konversi data batimetri ke format raster (GeoTIFF)</div>
        <div class="step-desc"><p>Interpolasikan titik-titik ukur batimetri menjadi raster TIN atau IDW menggunakan QGIS (<strong>Raster → Interpolation</strong>) atau Global Mapper. Resolusi raster batimetri sesuaikan dengan jarak antar titik ukur.</p></div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">2</div>
      <div class="step-body">
        <div class="step-title">Buat Terrain Komposit di RAS Mapper</div>
        <div class="step-desc"><p>Di HEC-RAS Mapper: <strong>Tools → Create New RAS Terrain</strong>. Tambahkan dua layer: (1) raster batimetri sungai, (2) DEM umum. RAS Mapper akan memprioritaskan raster dengan resolusi lebih tinggi di area tumpang tindih.</p></div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">3</div>
      <div class="step-body">
        <div class="step-title">Extract penampang dari terrain komposit</div>
        <div class="step-desc"><p>Setelah terrain komposit dibuat, extract ulang penampang melintang menggunakan terrain gabungan ini. Hasilnya akan mencerminkan elevasi dasar sungai yang akurat dari batimetri dan dataran banjir yang akurat dari DEM.</p></div>
      </div>
    </div>
  </div>

  <hr class="divider">

  <!-- SECTION 5 -->
  <div class="section-heading">
    <div class="section-num">5</div>
    <h2>Pengecekan Data Geometri di HEC-RAS</h2>
  </div>

  <p>Setelah data diimpor, selalu lakukan pengecekan sebelum menjalankan simulasi:</p>

  <table class="file-table">
    <thead>
      <tr><th>Pengecekan</th><th>Cara</th><th>Hal yang Diperiksa</th></tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Konsistensi arah aliran</strong></td>
        <td>Lihat skematik di Geometric Editor</td>
        <td>Pastikan sungai mengalir dari hulu ke hilir (kiri ke kanan di default HEC-RAS). Stationing harus menurun dari hulu ke hilir.</td>
      </tr>
      <tr>
        <td><strong>Profil penampang</strong></td>
        <td>Cross-Section Plot di setiap XS</td>
        <td>Profil harus terlihat masuk akal: ada channel di tengah, overbank di kiri-kanan. Pastikan tidak ada "spike" elevasi yang tidak wajar.</td>
      </tr>
      <tr>
        <td><strong>Bank station</strong></td>
        <td>Edit tabel penampang</td>
        <td>Posisi bank station kiri dan kanan harus tepat di tepi sungai (batas channel–floodplain). Salah penempatan bank station akan mempengaruhi nilai Manning's n dan perhitungan.</td>
      </tr>
      <tr>
        <td><strong>Manning's n</strong></td>
        <td>Edit penampang → klik "n or k"</td>
        <td>Pastikan nilai n sudah diisi untuk channel, left overbank, dan right overbank. Nilai 0 akan menyebabkan error.</td>
      </tr>
      <tr>
        <td><strong>Kemiringan dasar sungai</strong></td>
        <td>Profile Plot (tanpa flow data)</td>
        <td>Plot elevasi thalweg (dasar terendah tiap penampang) harus menurun secara konsisten dari hulu ke hilir. Anomali kemiringan akan menyebabkan masalah konvergensi.</td>
      </tr>
      <tr>
        <td><strong>Geometric Preprocessor</strong></td>
        <td>Di jendela Run Steady Flow → klik "Geometry Preprocessor"</td>
        <td>Jalankan preprocessor dan periksa log. Error di sini menandakan ada masalah data geometri yang harus diperbaiki sebelum simulasi.</td>
      </tr>
    </tbody>
  </table>

  <div class="info-box danger">
    <div class="info-box-label">🚫 Kesalahan Umum yang Harus Dihindari</div>
    <p><strong>1. Stationing terbalik (hilir lebih besar dari hulu):</strong> HEC-RAS menggunakan sistem stationing di mana nilai terbesar ada di hulu. Jika terbalik, aliran akan dianggap terbalik.<br><br>
    <strong>2. Manning's n tidak diisi:</strong> Default nilai n = 0 akan menyebabkan kecepatan tak terhingga dan crash simulasi.<br><br>
    <strong>3. Penampang tidak mencakup dataran banjir:</strong> Jika garis penampang terlalu pendek, air akan "keluar" dari model saat banjir besar dan menyebabkan ketidakstabilan.<br><br>
    <strong>4. Penampang saling berpotongan:</strong> Akan menyebabkan error geometri dan hasil yang tidak akurat.</p>
  </div>

  <hr class="divider">

  <div class="summary-box">
    <div class="summary-title">📚 Ringkasan Modul 2</div>
    <ul class="summary-list">
      <li>Tiga metode geometri: <strong>A (HEC-GeoRAS/QGIS)</strong> untuk proyek besar, <strong>B (RAS Mapper+DEMNAS)</strong> untuk kebanyakan proyek, <strong>C (manual)</strong> saat data survei lengkap</li>
      <li>Metode B paling praktis: load DEMNAS → set projection → digitasi river+bank+XS → extract elevasi otomatis — semua dalam HEC-RAS tanpa software tambahan</li>
      <li>DEMNAS (~8 m) adalah sumber DEM terbaik untuk Indonesia, unduh gratis di tanahair.indonesia.go.id</li>
      <li>DEM tidak mengukur dasar sungai di bawah air — selalu koreksi bagian channel dengan data batimetri lapangan jika tersedia</li>
      <li>Kaidah XS: tegak lurus aliran, mencakup dataran banjir, tidak saling berpotongan, memotong centerline tepat satu kali</li>
      <li>Selalu jalankan Geometric Preprocessor dan periksa profile plot sebelum simulasi pertama</li>
    </ul>
  </div>

  <a href="/post/materi-steady-flow-1d/" class="next-module">
    <div>
      <div class="next-label">Modul Berikutnya →</div>
      <div class="next-title">Modul 3: Simulasi Aliran Steady 1D</div>
    </div>
    <div class="next-arrow">→</div>
  </a>

  <p class="footnote">
    Referensi: HEC-RAS Mapper User's Manual v6.x (USACE HEC) · HEC-GeoRAS for QGIS User's Manual · BIG — Portal Data Geospasial Indonesia (tanahair.indonesia.go.id) · Irpan Chumaedi — <a href="https://www.youtube.com/watch?v=efpCbPyHNbQ" target="_blank" style="color:var(--hec-success);text-decoration:none;">Tutorial: Input Geometri 1D HEC-RAS dari DEMNAS</a> (YouTube, 2022)
  </p>

</div>
<script>
function switchMethod(btn, id) {
  // deactivate all
  document.querySelectorAll('.method-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.method-panel').forEach(p => p.classList.remove('active'));
  // activate selected
  btn.classList.add('active');
  document.getElementById('panel-' + id).classList.add('active');
}
</script>
<script>
function switchMethod(btn, id) {
  var w = btn.closest('.hecras-modul');
  w.querySelectorAll('.method-tab').forEach(function(b){ b.classList.remove('active'); });
  w.querySelectorAll('.method-panel').forEach(function(p){ p.classList.remove('active'); });
  btn.classList.add('active');
  document.getElementById('panel-' + id).classList.add('active');
}
</script>
</div>
{{< /rawhtml >}}
