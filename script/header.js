// script for floatins
document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const elements = document.querySelectorAll(".animate-on-scroll");
  elements.forEach(el => observer.observe(el));
});

// script for LINE in-app browser calendar
const isLineBrowser = /Line/i.test(navigator.userAgent);
  if (isLineBrowser) {
    // Change the button’s link only in LINE browser
    document.getElementById("calendar-button").href = "calendar-redirect.html?openExternalBrowser=1";
  }