(function () {
  const EMAIL = "krujeen.sp@gmail.com";
  const ENDPOINT = "https://formsubmit.co/ajax/" + EMAIL;
  const form = document.getElementById("worksheet-form");
  const statusEl = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn");

  if (!form) return;

  const subjectPrefix = form.dataset.subject || "ใบงาน";
  const activityName = form.dataset.activity || "Worksheet";
  const thanksBase = form.dataset.thanks || "worksheet-thanks.html";
  const retryPage = form.dataset.retry || "";
  const topicLabel = form.dataset.topic || "";

  function setStatus(message, type) {
    statusEl.textContent = message;
    statusEl.className = "form-status" + (type ? " is-" + type : "");
  }

  function buildPayload(formEl) {
    const data = new FormData(formEl);
    const payload = {
      _subject: subjectPrefix + " — " + (data.get("ชื่อ-สกุล") || "ไม่ระบุชื่อ"),
      _template: "table",
      _captcha: "false",
      ใบงาน: activityName,
    };

    data.forEach((value, key) => {
      if (String(value).trim() !== "") {
        payload[key] = String(value);
      }
    });

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
      setStatus("กรุณากรอกข้อมูลที่จำเป็นให้ครบ", "err");
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

      const thanks = new URL(thanksBase, window.location.href);
      thanks.searchParams.set("name", name);
      if (topicLabel) thanks.searchParams.set("topic", topicLabel);
      if (retryPage) thanks.searchParams.set("retry", retryPage);
      window.location.href = thanks.toString();
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
