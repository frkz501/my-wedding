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
function isLINEBrowser() {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.includes('line/') || 
           userAgent.includes('lineapp') ||
           userAgent.includes('line app') ||
           (userAgent.includes('wv') && userAgent.includes('line'));
}

const isLINE = isLINEBrowser();
if (isLINE) {
  // Redirect to external browser with calendar download page
  document.getElementById("ics").href = "calendar-redirect.html?openExternalBrowser=1";
}