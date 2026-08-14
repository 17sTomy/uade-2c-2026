const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");
const backdrop = document.getElementById("backdrop");
const progressBar = document.querySelector(".progress span");

function closeMenu() {
  sidebar?.classList.remove("open");
  backdrop?.classList.remove("show");
  menuBtn?.setAttribute("aria-expanded", "false");
}

menuBtn?.addEventListener("click", () => {
  const opening = !sidebar.classList.contains("open");
  sidebar.classList.toggle("open", opening);
  backdrop.classList.toggle("show", opening);
  menuBtn.setAttribute("aria-expanded", String(opening));
});
backdrop?.addEventListener("click", closeMenu);
sidebar?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

const links = [...document.querySelectorAll(".toc a[href^='#']")];
const targets = links.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const hash = `#${entry.target.id}`;
    links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === hash));
  });
}, { rootMargin: "-18% 0px -70% 0px", threshold: .01 });
targets.forEach(target => observer.observe(target));

function updateProgress() {
  const height = document.documentElement.scrollHeight - innerHeight;
  const progress = height > 0 ? Math.min(100, scrollY / height * 100) : 0;
  if (progressBar) progressBar.style.width = `${progress}%`;
}
addEventListener("scroll", updateProgress, { passive: true });
updateProgress();
