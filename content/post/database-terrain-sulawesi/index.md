---
title: "DEMNAS - Sulawesi"
subtitle: "1,367 tile DEMNAS wilayah Sulawesi"
date: 2026-05-07
lastmod: 2026-05-08
draft: false
featured: false
tags: ["database","terrain","DEMNAS","sulawesi"]
---

[← Terrain](/post/database-terrain/) | [← Database](/post/database/)

---

<div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;margin-bottom:1.2rem;">
  <span style="font-size:2.5rem;">🦺</span>
  <div>
    <div style="font-size:1.3rem;font-weight:700;">DEMNAS - Sulawesi</div>
    <div style="color:#888;font-size:0.85rem;margin-top:3px;">
      <span style="color:#64B5F6;font-weight:600;">&#11015; 81 tile</span> tersedia di OneDrive &nbsp;·&nbsp;
      <span style="color:#777;">📋 1286 tile</span> via Portal BIG
    </div>
  </div>
</div>

<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:1.2rem;">
  <a href="https://1drv.ms/f/c/22f5ef4527203c63/IgBi9q7WYiX2Sp0mKb2syPCSARN2qWTUwIHoMk9DEqnZ594?e=gHNxuh" target="_blank"
     style="display:inline-flex;align-items:center;gap:6px;padding:8px 16px;
            background:#1565C0;color:#fff;border-radius:6px;text-decoration:none;
            font-weight:600;font-size:0.85rem;">
    📁 Buka Folder OneDrive Sulawesi
  </a>
  <a href="https://tanahair.indonesia.go.id/portal-web/unduh/demnas" target="_blank"
     style="display:inline-flex;align-items:center;gap:6px;padding:8px 16px;
            background:rgba(255,255,255,0.07);color:#aaa;
            border:1px solid rgba(255,255,255,0.15);border-radius:6px;
            text-decoration:none;font-weight:600;font-size:0.85rem;">
    🌐 Portal BIG
  </a>
</div>

<div style="background:rgba(21,101,192,0.08);border-left:3px solid #1565C0;
            padding:0.8rem 1rem;margin-bottom:1.2rem;border-radius:0 6px 6px 0;font-size:0.84rem;">
  <strong style="color:#90CAF9;">&#11015; Cara download:</strong>
  Klik <strong style="color:#fff;">&#11015; Download</strong> pada tile yang dibutuhkan.
  Folder OneDrive Sulawesi akan terbuka dan nama file otomatis tersalin ke clipboard.
  Paste di kotak pencarian OneDrive untuk menemukan file.
</div>

<div id="notif-copy" style="display:none;position:fixed;bottom:24px;right:24px;z-index:9999;
  background:#1565C0;color:#fff;padding:12px 20px;border-radius:8px;font-size:0.88rem;
  font-weight:600;box-shadow:0 4px 16px rgba(0,0,0,0.4);max-width:320px;line-height:1.5;"></div>

<input id="cari-tile" type="text"
  placeholder="🔍 Cari kode NLP, kabupaten, atau provinsi..."
  oninput="filterTabel(this.value)"
  style="width:100%;max-width:500px;padding:8px 14px;border-radius:6px;
         border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.06);
         color:inherit;font-size:0.9rem;margin-bottom:1rem;box-sizing:border-box;" />

<div style="overflow-x:auto;">
<table id="tabel-tile" style="width:100%;border-collapse:collapse;font-size:0.85rem;">
  <thead>
    <tr style="background:rgba(33,150,243,0.12);border-bottom:2px solid rgba(33,150,243,0.3);">
      <th style="padding:8px 10px;text-align:left;white-space:nowrap;">Kode NLP</th>
      <th style="padding:8px 10px;text-align:left;">Kabupaten</th>
      <th style="padding:8px 10px;text-align:left;">Provinsi</th>
      <th style="padding:8px 10px;text-align:left;">Unduh</th>
    </tr>
  </thead>
  <tbody id="tbody-tile">
  </tbody>
</table>
</div>
<p id="info-hasil" style="margin-top:0.5rem;font-size:0.8rem;color:#888;"></p>

<script>
function unduhFile(namaFile, folderUrl) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(namaFile);
  } else {
    var el = document.createElement("textarea");
    el.value = namaFile; document.body.appendChild(el);
    el.select(); document.execCommand("copy"); document.body.removeChild(el);
  }
  window.open(folderUrl, "_blank");
  var notif = document.getElementById("notif-copy");
  notif.innerHTML = "&#10003; Nama file tersalin!<br><span style='font-weight:400;font-size:0.82rem;'>"
    + namaFile + "<br><br>Paste di kotak Search OneDrive.</span>";
  notif.style.display = "block";
  setTimeout(function(){ notif.style.display="none"; }, 6000);
}
function filterTabel(kata) {
  var rows = document.querySelectorAll("#tbody-tile tr");
  var q = kata.toLowerCase(); var tampil = 0;
  rows.forEach(function(r){
    if(r.textContent.toLowerCase().includes(q)){r.style.display="";tampil++;}
    else{r.style.display="none";}
  });
  var info = document.getElementById("info-hasil");
  info.textContent = kata!==""?"Menampilkan "+tampil+" dari 1367 tile":"";
}
</script>

---
**Sumber:** BIG - [tanahair.indonesia.go.id](https://tanahair.indonesia.go.id) · **Format:** GeoTIFF · WGS84

