/* ACD-GS project page — vanilla JS, no dependencies */
(function () {
  "use strict";

  /* Sticky nav shadow */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Reveal-on-scroll (with a safety net: if IntersectionObserver never fires,
     e.g. in some crawlers or headless browsers, show everything) */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var ioFired = false;
    var revealIO = new IntersectionObserver(function (entries) {
      ioFired = true;
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { revealIO.observe(el); });
    window.setTimeout(function () {
      if (!ioFired) revealEls.forEach(function (el) { el.classList.add("in"); });
    }, 1800);
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* Active section in nav */
  var navLinks = document.querySelectorAll(".nav-links a[href^='#']");
  var sections = [];
  navLinks.forEach(function (link) {
    var section = document.querySelector(link.getAttribute("href"));
    if (section) sections.push({ link: link, section: section });
  });
  if (sections.length && "IntersectionObserver" in window) {
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        sections.forEach(function (item) {
          item.link.classList.toggle("active", item.section === entry.target);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (item) { navIO.observe(item.section); });
  }

  /* Lightbox for zoomable figures */
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lb-img");
  var lbCap = document.getElementById("lb-cap");
  document.querySelectorAll(".zoomable").forEach(function (fig) {
    fig.tabIndex = 0;
    fig.setAttribute("role", "button");
    fig.setAttribute("aria-haspopup", "dialog");
    var preview = fig.querySelector("img");
    if (preview) fig.setAttribute("aria-label", "Enlarge image: " + preview.alt);
    function openFigure() {
      var img = fig.querySelector("img");
      if (!img || !lightbox || typeof lightbox.showModal !== "function") return;
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt || "";
      var caption = fig.querySelector("figcaption");
      lbCap.textContent = fig.dataset.caption || (caption ? caption.textContent.trim() : "");
      lightbox.showModal();
    }
    fig.addEventListener("click", openFigure);
    fig.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openFigure();
      }
    });
  });
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) lightbox.close();
    });
    var closeBtn = lightbox.querySelector(".lb-close");
    if (closeBtn) closeBtn.addEventListener("click", function () { lightbox.close(); });
  }

  /* Copy BibTeX */
  var copyBtn = document.getElementById("copy-bibtex");
  var bibtex = document.getElementById("bibtex-code");
  if (copyBtn && bibtex) {
    copyBtn.addEventListener("click", function () {
      var text = bibtex.textContent;
      function done() {
        var label = copyBtn.querySelector("span");
        var old = label.textContent;
        copyBtn.classList.add("copied");
        label.textContent = "Copied!";
        setTimeout(function () {
          copyBtn.classList.remove("copied");
          label.textContent = old;
        }, 1600);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopy(text, done); });
      } else {
        fallbackCopy(text, done);
      }
    });
  }

  function fallbackCopy(text, done) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); done(); } catch (e) { /* noop */ }
    document.body.removeChild(ta);
  }
})();
