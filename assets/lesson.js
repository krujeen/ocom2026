(function () {
  const params = new URLSearchParams(window.location.search);
  const src = params.get("src");
  const content = document.getElementById("content");

  if (!src || !/^files\/[\w./-]+\.md$/i.test(src)) {
    content.innerHTML =
      '<p class="error">ไม่พบไฟล์เนื้อหา หรือพาธไม่ถูกต้อง</p>';
    return;
  }

  fetch(src)
    .then((res) => {
      if (!res.ok) throw new Error("โหลดไฟล์ไม่สำเร็จ");
      return res.text();
    })
    .then((md) => {
      const titleMatch = md.match(/^#\s+(.+)$/m);
      if (titleMatch) {
        document.title = titleMatch[1] + " · OCOM 2026";
      }
      content.innerHTML = marked.parse(md);
    })
    .catch(() => {
      content.innerHTML =
        '<p class="error">โหลดเนื้อหาไม่สำเร็จ ลองเปิดจาก GitHub Pages อีกครั้ง</p>';
    });
})();
