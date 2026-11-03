document.documentElement.classList.add("js");

const revealObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-in");
      revealObserver.unobserve(entry.target);
    }
  }
}, { rootMargin: "0px 0px -12% 0px", threshold: 0.1 });
document.querySelectorAll("[data-reveal]").forEach((el) => revealObserver.observe(el));

const formatGain = (value) => `${value > 0 ? "+" : ""}${value} dB`;
const presetName = document.querySelector("[data-preset]");
document.querySelectorAll(".eq input").forEach((slider) => {
  const readout = slider.nextElementSibling;
  slider.addEventListener("input", () => {
    readout.textContent = formatGain(Number(slider.value));
    if (presetName) presetName.textContent = "Personalizado";
  });
});
