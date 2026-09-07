/* =========================================================
   BBS ADVOCACIA — INTERAÇÕES
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const progress = document.getElementById("progress-bar");
    const navLinks = [...document.querySelectorAll(".nav-link")];
    const sections = [...document.querySelectorAll("main section[id]")];

    /* BARRA DE PROGRESSO */
    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = `${scrollable > 0 ? (scrollTop / scrollable) * 100 : 0}%`;
    };

    /* MENU ATIVO */
    const updateActiveNav = () => {
        const position = window.scrollY + window.innerHeight * 0.35;
        let current = sections[0]?.id;

        sections.forEach(section => {
            if (position >= section.offsetTop) current = section.id;
        });

        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
        });
    };

    window.addEventListener("scroll", () => {
        updateProgress();
        updateActiveNav();
    }, { passive: true });

    updateProgress();
    updateActiveNav();

    /* REVEAL AO ENTRAR NA TELA */
    const revealItems = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12 });

    revealItems.forEach(item => revealObserver.observe(item));

    /* MENU MOBILE */
    const mobileHeader = document.querySelector(".mobile-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");

    const closeMobileMenu = () => {
        mobileHeader?.classList.remove("open");
        menuToggle?.setAttribute("aria-expanded", "false");
        mobileMenu?.classList.remove("open");
        mobileMenu?.setAttribute("aria-hidden", "true");
    };

    menuToggle?.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("open");
        mobileHeader.classList.toggle("open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    });

    document.querySelectorAll(".mobile-menu a").forEach(link => {
        link.addEventListener("click", closeMobileMenu);
    });

    /* MODAIS */
    const modals = document.querySelectorAll(".modal");

    const closeModal = modal => {
        if (!modal) return;
        modal.classList.remove("ativo");
        modal.setAttribute("aria-hidden", "true");

        if (!document.querySelector(".modal.ativo")) {
            body.classList.remove("modal-open");
        }
    };

    const openModal = modal => {
        modal.classList.add("ativo");
        modal.setAttribute("aria-hidden", "false");
        body.classList.add("modal-open");

        const closeButton = modal.querySelector(".modal-close");
        closeButton?.focus();
    };

    modals.forEach(modal => {
        modal.addEventListener("click", event => {
            if (event.target === modal || event.target.closest(".modal-close")) {
                closeModal(modal);
            }
        });
    });

    document.addEventListener("keydown", event => {
        if (event.key !== "Escape") return;
        const opened = document.querySelector(".modal.ativo");
        if (opened) closeModal(opened);
        else closeMobileMenu();
    });

    /* PERFIS DA EQUIPE */
    const teamCards = document.querySelectorAll(".team-card");
    const teamModal = document.getElementById("modal");

    const openTeamProfile = card => {
        document.getElementById("perfil-foto").src = card.dataset.image || "";
        document.getElementById("perfil-foto").alt = card.dataset.name || "Profissional";
        document.getElementById("perfil-nome").textContent = card.dataset.name || "";
        document.getElementById("perfil-area").textContent = card.dataset.area || "";
        document.getElementById("perfil-descricao").textContent = card.dataset.description || "";
        document.getElementById("perfil-descricaoCompleta").textContent = card.dataset.full || "";
        openModal(teamModal);
    };

    teamCards.forEach(card => {
        card.addEventListener("click", () => openTeamProfile(card));
        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openTeamProfile(card);
            }
        });
    });

    /* PERFIS DAS ÁREAS */
    const areaCards = document.querySelectorAll(".area-card");
    const areaModal = document.getElementById("modal2");

    const openAreaProfile = card => {
        document.getElementById("perfil-foto2").src = card.dataset.image || "";
        document.getElementById("perfil-foto2").alt = card.dataset.areaName || "Área jurídica";
        document.getElementById("perfil-nome2").textContent = card.dataset.name || "";
        document.getElementById("perfil-area2").textContent = card.dataset.areaName || "";
        document.getElementById("perfil-descricao2").textContent = card.dataset.description || "";

        const names = ["adv1", "adv2", "adv3"];
        names.forEach((key, index) => {
            const element = document.getElementById(`perfil-${key}`);
            const value = card.dataset[key];
            element.textContent = value || "";
            element.hidden = !value;
        });

        openModal(areaModal);
    };

    areaCards.forEach(card => {
        const activate = () => {
            areaCards.forEach(item => item.classList.remove("active"));
            card.classList.add("active");
            openAreaProfile(card);
        };

        card.addEventListener("click", activate);
        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                activate();
            }
        });
    });

    /* FECHAR MENU AO REDIMENSIONAR */
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) closeMobileMenu();
    });
});


/* =========================================================
   DEPOIMENTOS — ARRASTE MANUAL
   O loop continua lento automaticamente, mas o usuário
   também pode arrastar a faixa horizontalmente.
   ========================================================= */
(() => {
    const marquee = document.querySelector(".testimonial-marquee");
    const track = document.querySelector(".testimonial-track");
    if (!marquee || !track) return;

    let dragging = false;
    let startX = 0;
    let startScroll = 0;

    marquee.addEventListener("pointerdown", event => {
        dragging = true;
        startX = event.clientX;
        startScroll = marquee.scrollLeft;
        marquee.setPointerCapture?.(event.pointerId);
        track.style.animationPlayState = "paused";
        marquee.style.cursor = "grabbing";
    });

    marquee.addEventListener("pointermove", event => {
        if (!dragging) return;
        marquee.scrollLeft = startScroll - (event.clientX - startX);
    });

    const stopDragging = () => {
        if (!dragging) return;
        dragging = false;
        marquee.style.cursor = "";
        track.style.animationPlayState = "";
    };

    marquee.addEventListener("pointerup", stopDragging);
    marquee.addEventListener("pointercancel", stopDragging);
    marquee.addEventListener("pointerleave", stopDragging);
})();
