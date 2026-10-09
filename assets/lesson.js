(function () {
  const params = new URLSearchParams(window.location.search);
  const src = params.get("src");
  const content = document.getElementById("content");

  if (!src || !/^files\/[\w./-]+\.md$/i.test(src)) {
    content.innerHTML =
      '<p class="error">ไม่พบไฟล์เนื้อหา หรือพาธไม่ถูกต้อง</p>';
    return;
  }

  function renderMarkdownWithMath(md) {
    const blocks = [];

    // Display math: $$ ... $$
    md = md.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => {
      const i = blocks.length;
      blocks.push({ display: true, tex: tex.trim() });
      return `\n\n@@MATH${i}@@\n\n`;
    });

    // Inline math: $ ... $ (หลัง protect $$ แล้ว)
    md = md.replace(/(?<!\$)\$(?!\$)([^\$\n]+?)\$(?!\$)/g, (_, tex) => {
      const i = blocks.length;
      blocks.push({ display: false, tex: tex.trim() });
      return `@@MATH${i}@@`;
    });

    let html = marked.parse(md);

    html = html.replace(/@@MATH(\d+)@@/g, (_, idx) => {
      const block = blocks[Number(idx)];
      if (!block || typeof katex === "undefined") {
        return block ? block.tex : "";
      }
      try {
        return katex.renderToString(block.tex, {
          displayMode: block.display,
          throwOnError: false,
        });
      } catch {
        return block.tex;
      }
    });

    return html;
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
      content.innerHTML = renderMarkdownWithMath(md);
    })
    .catch(() => {
      content.innerHTML =
        '<p class="error">โหลดเนื้อหาไม่สำเร็จ ลองเปิดจาก GitHub Pages อีกครั้ง</p>';
    });
})();
