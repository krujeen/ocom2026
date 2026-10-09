(function () {
  const EMAIL = "krujeen.sp@gmail.com";
  const ENDPOINT = "https://formsubmit.co/ajax/" + EMAIL;
  const form = document.getElementById("worksheet-form");
  const statusEl = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn");

  if (!form) return;

  function setStatus(message, type) {
    statusEl.textContent = message;
    statusEl.className = "form-status" + (type ? " is-" + type : "");
  }

  function buildPayload(formEl) {
    const data = new FormData(formEl);
    const payload = {
      _subject: "ใบงาน Pointer — " + (data.get("ชื่อ-สกุล") || "ไม่ระบุชื่อ"),
      _template: "table",
      _captcha: "false",
      ใบงาน: "Act10-2 Pointer",
    };

    data.forEach((value, key) => {
      if (String(value).trim() !== "") {
        payload[key] = String(value);
      }
    });

    // สรุปคำตอบรวมไว้ช่องเดียว อ่านง่ายในอีเมล
    const lines = [];
    data.forEach((value, key) => {
      const text = String(value).trim();
      if (!text) return;
      lines.push("【" + key + "】\n" + text);
    });
    payload["สรุปคำตอบทั้งหมด"] = lines.join("\n\n--------------------\n\n");

    return payload;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      setStatus("กรุณากรอกชื่อ-สกุล โรงเรียน และเลขที่ให้ครบ", "err");
      form.querySelector(":invalid")?.focus();
      return;
    }

    const name = form.querySelector("#student_name")?.value.trim();
    if (!name) {
      setStatus("กรุณากรอกชื่อ-สกุล", "err");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "กำลังส่ง…";
    setStatus("กำลังส่งใบงานไปยังอาจารย์…", "");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(buildPayload(form)),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(result.message || "ส่งไม่สำเร็จ");
      }

      const thanksUrl =
        "worksheet-thanks.html?name=" + encodeURIComponent(name);
      window.location.href = thanksUrl;
      return;
    } catch (err) {
      setStatus(
        "ส่งไม่สำเร็จ: " +
          (err && err.message ? err.message : "ลองอีกครั้งหรือแจ้งอาจารย์") +
          " — หากเพิ่งเปิดใช้ครั้งแรก ให้เปิดอีเมล " +
          EMAIL +
          " เพื่อยืนยัน FormSubmit",
        "err"
      );
      submitBtn.disabled = false;
      submitBtn.textContent = "ส่งใบงาน";
    }
  });
})();
