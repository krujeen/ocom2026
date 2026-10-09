(function () {
  const TITLES = {
    "pointer_p04.cpp": "ขนาดชนิดข้อมูล (sizeof)",
    "pointer_p06.cpp": "ตัวดำเนินการ & และ *",
    "pointer_p08.cpp": "ประกาศ pointer และ nullptr",
    "pointer_p09.cpp": "Pointer ชี้ไปที่ pointer",
    "pointer_p11.cpp": "Reference (ตัวแปรอ้างอิง)",
    "pointer_p14.cpp": "Pointer กับ array",
    "pointer_p17.cpp": "Pointer arithmetic / lower_bound",
    "pointer_p18.cpp": "ท่องอาร์เรย์ด้วย pointer",
    "pointer_p19.cpp": "ส่งค่า by value / pointer / reference",
    "pointer_p20.cpp": "ส่งอาร์เรย์ให้ฟังก์ชัน",
    "pointer_p21.cpp": "คืนค่าหลายค่า + new",
    "pointer_p23.cpp": "กลับลำดับอาร์เรย์ (two pointers)",
    "pointer_p24.cpp": "Pointer กับ struct",
    "pointer_p25.cpp": "จองหน่วยความจำด้วย new",
    "pointer_p27.cpp": "ข้อผิดพลาดที่พบบ่อย",
    "Recursive_p09.cpp": "แฟกทอเรียล (factorial)",
    "Recursive_p12.cpp": "พิมพ์ลง / พิมพ์ขึ้น (down / up)",
    "Recursive_p13.cpp": "ผลรวม 1 ถึง n",
    "Recursive_p15.cpp": "หรม. แบบเวียนเกิด (GCD)",
    "Recursive_p17.cpp": "ฟีโบนัชชี",
    "Recursive_p20.cpp": "ฟีโบนัชชี + memoization",
    "Recursive_p23.cpp": "ยกกำลังแบบเร็ว (power fast)",
    "Recursive_p26.cpp": "ยกกำลังแบบเร็วพร้อม mod",
    "Recursive_p28.cpp": "แปลงเลขฐานแบบเวียนเกิด",
    "Recursive_p30.cpp": "ผลรวมอาร์เรย์",
    "Recursive_p31.cpp": "ค่ามากสุดในช่วง (divide & conquer)",
    "Recursive_p32.cpp": "ค้นหาแบบทวิภาค (binary search)",
    "Recursive_p33.cpp": "กลับสตริง / ตรวจพาลินโดรม",
    "Recursive_p35.cpp": "หอคอยฮานอย (Tower of Hanoi)",
  };

  const LISTS = {
    code_pointer: {
      href: "pointer-codes.html",
      label: "← รายการโค้ด Pointer",
      nav: "โค้ด Pointer",
    },
    code_Recursive: {
      href: "recursive-codes.html",
      label: "← รายการโค้ด Recursive",
      nav: "โค้ด Recursive",
    },
  };

  const params = new URLSearchParams(window.location.search);
  const src = params.get("src");
  const fileEl = document.getElementById("code-file");
  const titleEl = document.getElementById("code-title");
  const sourceEl = document.getElementById("code-source");
  const hintEl = document.getElementById("code-hint");
  const btnCopyCode = document.getElementById("btn-copy-code");
  const btnCopyLink = document.getElementById("btn-copy-link");
  const btnRaw = document.getElementById("btn-raw");
  const backLink = document.getElementById("code-back");
  const navCodes = document.getElementById("nav-codes");

  let sourceText = "";

  function showHint(message, isError) {
    hintEl.hidden = false;
    hintEl.textContent = message;
    hintEl.classList.toggle("is-error", Boolean(isError));
    window.clearTimeout(showHint._t);
    if (!isError) {
      showHint._t = window.setTimeout(() => {
        hintEl.hidden = true;
      }, 2200);
    }
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }

  if (!src || !/^code_(pointer|Recursive)\/[\w.-]+\.cpp$/i.test(src)) {
    fileEl.textContent = "—";
    titleEl.textContent = "ไม่พบไฟล์โค้ด";
    sourceEl.querySelector("code").textContent =
      "พาธไม่ถูกต้อง ใช้รูปแบบ code_pointer/… หรือ code_Recursive/…";
    showHint("เปิดจากหน้ารายการโค้ดอีกครั้ง", true);
    btnCopyCode.disabled = true;
    btnCopyLink.disabled = true;
    btnRaw.removeAttribute("href");
    return;
  }

  const folder = src.split("/")[0];
  const listInfo = LISTS[folder];
  if (listInfo) {
    if (backLink) {
      backLink.href = listInfo.href;
      backLink.textContent = listInfo.label;
    }
    if (navCodes) {
      navCodes.href = listInfo.href;
      navCodes.textContent = listInfo.nav;
    }
  }

  const filename = src.split("/").pop();
  fileEl.textContent = src;
  titleEl.textContent = TITLES[filename] || filename;
  document.title = (TITLES[filename] || filename) + " · OCOM 2026";
  btnRaw.href = src;

  fetch(src)
    .then((res) => {
      if (!res.ok) throw new Error("โหลดไฟล์ไม่สำเร็จ");
      return res.text();
    })
    .then((text) => {
      sourceText = text;
      sourceEl.querySelector("code").textContent = text;
    })
    .catch(() => {
      sourceEl.querySelector("code").textContent = "โหลดโค้ดไม่สำเร็จ";
      showHint("โหลดไฟล์ไม่สำเร็จ ลองรีเฟรชหน้าอีกครั้ง", true);
      btnCopyCode.disabled = true;
    });

  btnCopyCode.addEventListener("click", async () => {
    if (!sourceText) return;
    try {
      await copyText(sourceText);
      showHint("คัดลอกโค้ดแล้ว");
    } catch {
      showHint("คัดลอกไม่สำเร็จ ลองเลือกข้อความเอง", true);
    }
  });

  btnCopyLink.addEventListener("click", async () => {
    try {
      await copyText(window.location.href);
      showHint("คัดลอกลิงก์แชร์แล้ว");
    } catch {
      showHint("คัดลอกลิงก์ไม่สำเร็จ", true);
    }
  });
})();
