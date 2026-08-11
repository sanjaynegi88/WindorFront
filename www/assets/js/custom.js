

let slides = document.querySelectorAll(".slide");
let index = 0;
let autoSlide;

function showSlide(i) {
  slides.forEach(slide => slide.classList.remove("active"));
  if (slides[i]) slides[i].classList.add("active");
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

if (nextBtn) {
  nextBtn.onclick = () => {
    nextSlide();
    restartAutoSlide();
  };
}

if (prevBtn) {
  prevBtn.onclick = () => {
    prevSlide();
    restartAutoSlide();
  };
}

function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 3000);
}

function restartAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

showSlide(index);
startAutoSlide();

/* Sticky Header */

const header = document.querySelector(".header");
const hero = document.querySelector(".hero");
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        header.classList.add("sticky");
        // hero.style.paddingTop = header.offsetHeight + "px";
    } else {
        header.classList.remove("sticky");
        // hero.style.paddingTop = "0";
    }

    lastScrollTop = scrollTop;
});

/* SERVICES SLIDER */

let serviceSwiper = null;

function initServiceSwiper() {

  const sliderEl = document.querySelector(".services-slider");
  const sectionEl = document.querySelector(".services-section");
  if (!sliderEl) return;

  const slideCount = sliderEl.querySelectorAll(".swiper-slide").length;

  // 3 or fewer cards OR mobile: don't init Swiper, render as static centered grid
  if (slideCount <= 3 || window.innerWidth <= 991) {
    if (serviceSwiper) {
      serviceSwiper.destroy(true, true);
      serviceSwiper = null;
    }
    if (sectionEl) sectionEl.classList.add("no-slider");
    return;
  }

  if (sectionEl) sectionEl.classList.remove("no-slider");

  if (!serviceSwiper) {

    serviceSwiper = new Swiper(".services-slider", {
      spaceBetween: 30,
      loop: true,

      navigation: {
        nextEl: ".services-section .swiper-button-next",
        prevEl: ".services-section .swiper-button-prev",
      },

      breakpoints: {
        992: { slidesPerView: 2 },
        1025: { slidesPerView: 3 },
        1450: { slidesPerView: 4 }
      }

    });

  }

}

window.addEventListener("load", initServiceSwiper);
window.addEventListener("resize", initServiceSwiper);


/* SERVE SLIDER — 4 cards, centered, autoplay marquee on desktop */

if (document.querySelector(".serve-slider")) {

  const serveSlideCount = document.querySelectorAll(".serve-slider .swiper-slide").length;

  // If 4 or fewer cards on desktop, just center them statically (no Swiper)
  if (serveSlideCount <= 4 && window.innerWidth > 991) {

    const wrapper = document.querySelector(".serve-slider .swiper-wrapper");
    if (wrapper) {
      wrapper.style.justifyContent = "center";
      wrapper.style.gap = "24px";
      wrapper.style.flexWrap = "wrap";
    }
    document.querySelectorAll(".serve-slider .swiper-slide").forEach(slide => {
      slide.style.width = "280px";
      slide.style.flexShrink = "0";
    });
    const pag = document.querySelector(".serve-slider .swiper-pagination");
    if (pag) pag.style.display = "none";

  } else {

    // Mobile or more than 4 cards: use Swiper as a real slider
    new Swiper(".serve-slider", {
      slidesPerView: 4,
      spaceBetween: 24,
      loop: true,
      loopAdditionalSlides: 8,
      speed: 4000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
        waitForTransition: true
      },
      pagination: {
        el: ".serve-slider .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        320:  { slidesPerView: 1.2, spaceBetween: 16 },
        576:  { slidesPerView: 2,   spaceBetween: 18 },
        768:  { slidesPerView: 3,   spaceBetween: 20 },
        1024: { slidesPerView: 4,   spaceBetween: 24 }
      }
    });

  }

}


/* MOBILE MENU */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const menuIcon = document.querySelector(".menu-icon");

if (menuToggle) {

menuToggle.addEventListener("click", function () {

  navMenu.classList.toggle("active");

  if (navMenu.classList.contains("active")) {
    menuIcon.innerHTML = "✕";
  } else {
    menuIcon.innerHTML = "☰";
  }

});

}

//faq section
 document.querySelectorAll(".faq-item").forEach((item) => {
        item.addEventListener("click", () => {
          // close others (optional)
          document.querySelectorAll(".faq-item").forEach((el) => {
            if (el !== item) {
              el.classList.remove("active");
            }
          });

          // toggle current
          item.classList.toggle("active");
        });
      });


      // services(insurance page)
      document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const target = btn.dataset.tab;
          document
            .querySelectorAll(".tab-btn")
            .forEach((b) => b.classList.remove("active"));
          document
            .querySelectorAll(".tab-content")
            .forEach((c) => c.classList.remove("active"));
          btn.classList.add("active");
          document.getElementById(target).classList.add("active");
        });
      });
  

        //  PROPERTIES PAGINATION
      (function () {
        const PER_PAGE = 9;
        const MAX_NUMBERS = 5; // how many number buttons to show before ellipsis

        const grid = document.querySelector(".properties-grid");
        const cards = grid
          ? Array.from(grid.querySelectorAll(".property-card"))
          : [];
        const pag = document.getElementById("propertiesPagination");
        const numsEl = document.getElementById("propertiesPageNumbers");
        if (!grid || !pag || !numsEl || cards.length === 0) return;

        const totalPages = Math.max(1, Math.ceil(cards.length / PER_PAGE));
        const prevBtn = pag.querySelector('[data-role="prev"]');
        const nextBtn = pag.querySelector('[data-role="next"]');

        // Read initial page from ?page=N in URL, clamp to valid range
        function readPageFromURL() {
          const p = parseInt(
            new URLSearchParams(window.location.search).get("page") || "1",
            10,
          );
          if (isNaN(p) || p < 1) return 1;
          if (p > totalPages) return totalPages;
          return p;
        }

        let currentPage = readPageFromURL();

        function renderCards() {
          const start = (currentPage - 1) * PER_PAGE;
          const end = start + PER_PAGE;
          cards.forEach((card, i) => {
            card.style.display = i >= start && i < end ? "" : "none";
          });
        }

        function renderNumbers() {
          numsEl.innerHTML = "";

          // Build the list of page numbers to display (with ellipsis when > MAX_NUMBERS)
          let pages = [];
          if (totalPages <= MAX_NUMBERS + 2) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
          } else {
            // Always show first, last, current and neighbors
            const window1 = Math.max(2, currentPage - 1);
            const window2 = Math.min(totalPages - 1, currentPage + 1);
            pages.push(1);
            if (window1 > 2) pages.push("…");
            for (let i = window1; i <= window2; i++) pages.push(i);
            if (window2 < totalPages - 1) pages.push("…");
            pages.push(totalPages);
          }

          pages.forEach((p) => {
            if (p === "…") {
              const span = document.createElement("span");
              span.className = "page-ellipsis";
              span.textContent = "…";
              numsEl.appendChild(span);
            } else {
              const btn = document.createElement("button");
              btn.type = "button";
              btn.className = "page-num" + (p === currentPage ? " active" : "");
              btn.textContent = p;
              btn.setAttribute("aria-label", "Page " + p);
              if (p === currentPage) btn.setAttribute("aria-current", "page");
              btn.addEventListener("click", () => goTo(p));
              numsEl.appendChild(btn);
            }
          });

          // Disable prev/next at boundaries
          prevBtn.disabled = currentPage === 1;
          nextBtn.disabled = currentPage === totalPages;
        }

        function updateURL() {
          const url = new URL(window.location.href);
          if (currentPage === 1) {
            url.searchParams.delete("page");
          } else {
            url.searchParams.set("page", currentPage);
          }
          window.history.replaceState(
            { page: currentPage },
            "",
            url.toString(),
          );
        }

        function goTo(page, options) {
          page = Math.max(1, Math.min(totalPages, page));
          if (page === currentPage) return;
          currentPage = page;
          renderCards();
          renderNumbers();
          updateURL();
          if (!options || options.scroll !== false) {
            grid.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }

        prevBtn.addEventListener("click", () => goTo(currentPage - 1));
        nextBtn.addEventListener("click", () => goTo(currentPage + 1));

        // Initial render (don't scroll on first load)
        renderCards();
        renderNumbers();
      })();
    

      //  <!-- Tabs behavior -->

      document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const target = btn.dataset.tab;
          document
            .querySelectorAll(".tab-btn")
            .forEach((b) => b.classList.remove("active"));
          document
            .querySelectorAll(".tab-content")
            .forEach((c) => c.classList.remove("active"));
          btn.classList.add("active");
          document.getElementById(target).classList.add("active");
        });
      });



    function initTabs(btnSelector, contentSelector) {
        const btns = document.querySelectorAll(btnSelector);
        const contents = document.querySelectorAll(contentSelector);

        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-tab');

                btns.forEach(b => b.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));

                btn.classList.add('active');
                const targetEl = document.getElementById(target);
                if (targetEl) targetEl.classList.add('active');
            });
        });
    }

    initTabs('.tab-btn', '.tab-content');
    initTabs('.faq-tab-btn', '.faq-tab-content');

    // Accordion — only one open at a time within the same parent
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const parent = item.parentElement;

            parent.querySelectorAll('.accordion-item').forEach(i => {
                if (i !== item) i.classList.remove('active');
            });

            item.classList.toggle('active');
        });
    });



    // careers page

    /* ==============================================================
   CAREER PAGE — Pagination + page-jump switch
   File: assets/js/career.js
   ============================================================== */

(function () {
    'use strict';

    function initCareerPagination() {
        var pagination = document.querySelector('.open-roles-pagination');
        if (!pagination) return;

        var prevBtn       = pagination.querySelector('.page-prev');
        var nextBtn       = pagination.querySelector('.page-next');
        var pageNums      = pagination.querySelectorAll('.page-num');
        var lastPage      = 30;   // matches the markup
        var currentPage   = 1;

        function setActive(page) {
            currentPage = page;

            // active state on visible numbers
            pageNums.forEach(function (btn) {
                var n = parseInt(btn.textContent, 10);
                btn.classList.toggle('active', n === page);
            });

            // prev/next state
            if (prevBtn) {
                prevBtn.disabled = (page <= 1);
            }
            if (nextBtn) {
                nextBtn.disabled = (page >= lastPage);
            }
        }

        // Number clicks
        pageNums.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var pg = parseInt(this.textContent, 10);
                if (!isNaN(pg)) setActive(pg);
            });
        });

        // Previous
        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                if (currentPage > 1) setActive(currentPage - 1);
            });
        }

        // Next
        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                if (currentPage < lastPage) setActive(currentPage + 1);
            });
        }

        // Initial state
        setActive(1);
    }

    function initPageJumpSwitch() {
        var sw = document.querySelector('.page-jump .switch');
        if (!sw) return;

        sw.addEventListener('click', function () {
            sw.classList.toggle('on');
        });
    }

    function boot() {
        initCareerPagination();
        initPageJumpSwitch();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();

document.querySelectorAll(".plan-role-block").forEach(function (block) {
        const switchBtn = block.querySelector(".role-switch");
        const cards = block.querySelectorAll(".plan-card");

        function updatePlans() {
            const isAnnual = switchBtn.classList.contains("active");
            const selectedType = isAnnual ? "annualy" : "monthly";

            cards.forEach(function (card) {
                const planType = card.dataset.planType;
                if (planType === selectedType || planType === "both") {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        }

        switchBtn.addEventListener("click", function () {
            this.classList.toggle("active");
            updatePlans();
        });

        // Initial state = Monthly for every role block
        updatePlans();
    });