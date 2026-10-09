(function () {
  const header = document.getElementById("site-header");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const lessons = document.querySelectorAll(".lesson");
  if (lessons.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    lessons.forEach((el, i) => {
      el.style.animationDelay = `${i * 0.08}s`;
      io.observe(el);
    });
  } else {
    lessons.forEach((el) => el.classList.add("is-visible"));
  }
})();
