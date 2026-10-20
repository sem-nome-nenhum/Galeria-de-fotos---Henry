
const categoriasEl  = document.getElementById("categorias");
const todasAsFotos  = Array.from(document.querySelectorAll(".foto"));


const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = `<button class="fechar" aria-label="Fechar">×</button><img alt="">`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector("img");
const fecharBtn   = lightbox.querySelector(".fechar");

function abrirLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || "";
  lightbox.classList.add("aberto");
}
function fecharLightbox() {
  lightbox.classList.remove("aberto");
  lightboxImg.src = "";
}
fecharBtn.addEventListener("click", fecharLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) fecharLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") fecharLightbox();
});


todasAsFotos.forEach((foto) => {
  const img = foto.querySelector("img");
  foto.addEventListener("click", () => abrirLightbox(img.src, img.alt));
});

categoriasEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".cat-btn");
  if (!btn) return;

 
  categoriasEl.querySelectorAll(".cat-btn").forEach((b) => b.classList.remove("ativo"));
  btn.classList.add("ativo");

  const categoria = btn.dataset.categoria;

  
  todasAsFotos.forEach((foto) => {
    const mostrar = categoria === "todas" || foto.dataset.categoria === categoria;
    if (mostrar) {
      foto.style.display = "";
      foto.style.animation = "none";
      void foto.offsetWidth; 
      foto.style.animation = "";
    } else {
      foto.style.display = "none";
    }
  });
});