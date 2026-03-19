// Select all sections on the page
const sections = document.querySelectorAll("section, .project-row");

// Create the Intersection Observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // Check if the section is currently intersecting (visible in the viewport)
      if (entry.isIntersecting) {
        entry.target.classList.add("show-animate");
      } else {
        // Optional: Remove the class when it leaves the screen
        // This makes the animation repeat every time you scroll up and down
        // entry.target.classList.remove("show-animate");
      }
    });
  },
  {
    // 0.10 means the animation triggers when 10% of the section is visible
    threshold: 0.1,
  },
);

// Tell the observer to watch every section
sections.forEach((section) => {
  observer.observe(section);
});

// --- CUSTOM CURSOR ---
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

// 1. Menggerakkan kursor mengikuti mouse
window.addEventListener("mousemove", (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  // Titik inti mengikuti secara instan
  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  // Lingkaran luar mengikuti dengan efek delay yang mulus
  cursorOutline.animate(
    {
      left: `${posX}px`,
      top: `${posY}px`,
    },
    { duration: 500, fill: "forwards" },
  );
});

// 2. Menambahkan efek saat Hover
// Pilih semua elemen yang bisa diklik (link, tombol, input, card)
const clickables = document.querySelectorAll(
  "a, button, .btn, input, textarea, .services-box, .project-box",
);

clickables.forEach((el) => {
  el.addEventListener("mouseover", () => {
    document.body.classList.add("cursor-hover");
  });
  el.addEventListener("mouseleave", () => {
    document.body.classList.remove("cursor-hover");
  });
});

// 3. Menambahkan efek saat Klik (Mousedown & Mouseup)
window.addEventListener("mousedown", () => {
  document.body.classList.add("cursor-click");
});

window.addEventListener("mouseup", () => {
  document.body.classList.remove("cursor-click");
});

// --- FORM SUBMISSION (Tanpa Pindah Halaman) ---
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault(); // Mencegah browser pindah halaman

    // 1. Ambil data mentah dari form
    const formData = new FormData(contactForm);

    // 2. Ubah data mentah tersebut menjadi objek JavaScript biasa
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        // 3. Ubah objek menjadi string JSON sebelum dikirim
        body: JSON.stringify(data),
        headers: {
          // 4. Beritahu Formspree bahwa format yang kita kirim adalah JSON murni
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        // Jika sukses, munculkan notifikasi dan kosongkan form
        alert("Yeay! Pesanmu berhasil dikirim.");
        contactForm.reset();
      } else {
        alert("Oops! Ada masalah saat mengirim pesan. Coba lagi nanti.");
      }
    } catch (error) {
      alert("Gagal mengirim! Periksa koneksi internetmu.");
    }
  });
  // --- KONFIGURASI PARTICLES.JS (OPSI 1) ---
  if (document.getElementById("particles-js")) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: "#b14eff" }, // Warna titik ungu neon
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#4f0c76", // Warna garis penghubung ungu gelap
          opacity: 0.4,
          width: 1.5,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" }, // Kursor menarik garis
          onclick: { enable: true, mode: "push" }, // Klik menambah partikel
          resize: true,
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 1 } },
          push: { particles_nb: 4 },
        },
      },
      retina_detect: true,
    });
  }
}

// --- KONFIGURASI PARTICLES.JS (OPSI 1) ---
if (document.getElementById("particles-js")) {
  particlesJS("particles-js", {
    particles: {
      number: { value: 60, density: { enable: true, value_area: 800 } },
      color: { value: "#b14eff" }, // Warna titik ungu neon
      shape: { type: "circle" },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#4f0c76", // Warna garis penghubung ungu gelap
        opacity: 0.4,
        width: 1.5,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "grab" }, // Kursor menarik garis
        onclick: { enable: true, mode: "push" }, // Klik menambah partikel
        resize: true,
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: 1 } },
        push: { particles_nb: 4 },
      },
    },
    retina_detect: true,
  });
}

// --- PRELOADER (LAYAR LOADING) ---
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");

  if (preloader) {
    // Memberikan sedikit delay (misal 0.5 detik) agar animasinya sempat terlihat
    // Meskipun internet sangat cepat
    setTimeout(() => {
      preloader.classList.add("fade-out");
    }, 500);
  }
});

// --- PRELOADER & SCROLL RESET ---
// 1. Mencegah browser mengingat posisi scroll sebelumnya saat di-refresh
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
  // 2. Paksa halaman selalu mulai dari paling atas
  window.scrollTo(0, 0);

  const preloader = document.querySelector(".preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("fade-out");
    }, 500);
  }
});

// --- HAMBURGER MENU LOGIC (MOBILE) ---
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

if (menuIcon) {
  menuIcon.onclick = () => {
    // Mengubah ikon garis tiga menjadi tanda silang (X)
    menuIcon.classList.toggle("bx-x");
    // Memunculkan atau menyembunyikan menu dropdown
    navbar.classList.toggle("active");
  };
}

// Fitur Tambahan: Menutup menu otomatis saat salah satu link diklik
const navLinks = document.querySelectorAll(".navbar a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
  });
});

// --- PAGE TRANSITION (SMOOTH NAVIGATION) ---
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a");
  const preloader = document.querySelector(".preloader");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      const target = link.getAttribute("target");
      
      // Ignore hashes, external links, etc.
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:") || target === "_blank") {
        return;
      }
      
      e.preventDefault();
      
      if (preloader) {
        // Fade IN the preloader (by removing the fade-out class)
        preloader.classList.remove("fade-out");
        
        setTimeout(() => {
          window.location.href = href;
        }, 500);
      } else {
        window.location.href = href;
      }
    });
  });
});
