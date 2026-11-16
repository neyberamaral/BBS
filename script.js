/* =========================================================
   BBS ADVOCACIA — INTERAÇÕES
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const corpo = document.body;
    const barraProgresso = document.getElementById("barra-progresso");
    const linksNavegacao = [...document.querySelectorAll(".link-navegacao")];
    const secoes = [...document.querySelectorAll("main section[id]")];

    /* BARRA DE PROGRESSO */
    const atualizarProgresso = () => {
        const rolagemTopo = window.scrollY;
        const areaRolagem = document.documentElement.scrollHeight - window.innerHeight;
        if (barraProgresso) barraProgresso.style.width = `${areaRolagem > 0 ? (rolagemTopo / areaRolagem) * 100 : 0}%`;
    };

    /* MENU ATIVO */
    const atualizarNavegacaoAtiva = () => {
        const posicao = window.scrollY + window.innerHeight * 0.35;
        let atual = secoes[0]?.id;

        secoes.forEach(secao => {
            if (posicao >= secao.offsetTop) atual = secao.id;
        });

        linksNavegacao.forEach(link => {
            link.classList.toggle("ativo", link.getAttribute("href") === `#${atual}`);
        });
    };

    window.addEventListener("scroll", () => {
        atualizarProgresso();
        atualizarNavegacaoAtiva();
    }, { passive: true });

    atualizarProgresso();
    atualizarNavegacaoAtiva();

    /* REVEAL AO ENTRAR NA TELA */
    const itensRevelacao = document.querySelectorAll(".revelar");
    const observadorRevelacao = new IntersectionObserver((entradas, observador) => {
        entradas.forEach(entrada => {
            if (!entrada.isIntersecting) return;
            entrada.target.classList.add("visivel");
            observador.unobserve(entrada.target);
        });
    }, { threshold: 0.12 });

    itensRevelacao.forEach(item => observadorRevelacao.observe(item));

    /* MENU MOBILE */
    const cabecalhoMobile = document.querySelector(".cabecalho-mobile");
    const alternarMenu = document.querySelector(".alternar-menu");
    const menuMobile = document.querySelector(".menu-mobile");

    const fecharMenuMobile = () => {
        cabecalhoMobile?.classList.remove("aberto");
        alternarMenu?.setAttribute("aria-expanded", "false");
        menuMobile?.classList.remove("aberto");
        menuMobile?.setAttribute("aria-hidden", "true");
    };

    alternarMenu?.addEventListener("click", () => {
        if (!menuMobile || !cabecalhoMobile || !alternarMenu) return;
        const estaAberto = menuMobile.classList.toggle("aberto");
        cabecalhoMobile.classList.toggle("aberto", estaAberto);
        alternarMenu.setAttribute("aria-expanded", String(estaAberto));
        menuMobile.setAttribute("aria-hidden", String(!estaAberto));
    });

    document.querySelectorAll(".menu-mobile a").forEach(link => {
        link.addEventListener("click", fecharMenuMobile);
    });

    /* MODAIS */
    const janelas = document.querySelectorAll(".janela-modal");

    const fecharModal = janela => {
        if (!janela) return;
        janela.classList.remove("ativo");
        janela.setAttribute("aria-hidden", "true");

        if (!document.querySelector(".janela-modal.ativo")) {
            corpo.classList.remove("modal-aberto");
        }
    };

    const abrirModal = janela => {
        janela.classList.add("ativo");
        janela.setAttribute("aria-hidden", "false");
        corpo.classList.add("modal-aberto");

        const botaoFechar = janela.querySelector(".fechar-modal");
        botaoFechar?.focus();
    };

    janelas.forEach(janela => {
        janela.addEventListener("click", evento => {
            if (evento.target === janela || evento.target.closest(".fechar-modal")) {
                fecharModal(janela);
            }
        });
    });

    document.addEventListener("keydown", evento => {
        if (evento.key !== "Escape") return;
        const janelaAberta = document.querySelector(".janela-modal.ativo");
        if (janelaAberta) fecharModal(janelaAberta);
        else fecharMenuMobile();
    });

    /* PERFIS DA EQUIPE */
    const cartoesEquipe = document.querySelectorAll(".cartao-equipe");
    const modalEquipe = document.getElementById("janela-modal");

    const abrirPerfilEquipe = cartao => {
        document.getElementById("foto-perfil").src = cartao.dataset.imagem || "";
        document.getElementById("foto-perfil").alt = cartao.dataset.nome || "Profissional";
        document.getElementById("nome-perfil").textContent = cartao.dataset.nome || "";
        document.getElementById("area-perfil").textContent = cartao.dataset.area || "";
        document.getElementById("descricao-perfil").textContent = cartao.dataset.descricao || "";
        document.getElementById("descricao-completa-perfil").textContent = cartao.dataset.completa || "";

        const botaoContato = document.getElementById("botao-contato-modal");
        if (botaoContato) {
            botaoContato.href = "https://wa.me/5564999999999";
        }

        abrirModal(modalEquipe);
    };

    cartoesEquipe.forEach(cartao => {
        cartao.addEventListener("click", () => abrirPerfilEquipe(cartao));
        cartao.addEventListener("keydown", evento => {
            if (evento.key === "Enter" || evento.key === " ") {
                evento.preventDefault();
                abrirPerfilEquipe(cartao);
            }
        });
    });

    /* PERFIS DAS ÁREAS */
    const cartoesArea = document.querySelectorAll(".cartao-area");
    const modalArea = document.getElementById("janela-modal-areas");

    const abrirPerfilArea = cartao => {
        document.getElementById("foto-perfil-area").src = cartao.dataset.imagem || "";
        document.getElementById("foto-perfil-area").alt = cartao.dataset.nomeArea || "Área jurídica";
        document.getElementById("nome-perfil-area").textContent = cartao.dataset.nome || "";
        document.getElementById("area-perfil-area").textContent = cartao.dataset.nomeArea || "";
        document.getElementById("descricao-perfil-area").textContent = cartao.dataset.descricao || "";

        const nomes = ["advogado1", "advogado2", "advogado3"];
        nomes.forEach(chave => {
            const elemento = document.getElementById(`perfil-${chave}`);
            const valor = cartao.dataset[chave];
            if (!elemento) return;
            elemento.textContent = valor || "";
            elemento.hidden = !valor;
        });

        abrirModal(modalArea);
    };

    cartoesArea.forEach(cartao => {
        const ativar = () => {
            cartoesArea.forEach(item => item.classList.remove("ativo"));
            cartao.classList.add("ativo");
            abrirPerfilArea(cartao);
        };

        cartao.addEventListener("click", ativar);
        cartao.addEventListener("keydown", evento => {
            if (evento.key === "Enter" || evento.key === " ") {
                evento.preventDefault();
                ativar();
            }
        });
    });

    /* FECHAR MENU AO REDIMENSIONAR */
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) fecharMenuMobile();
    });
});


/* =========================================================
   DEPOIMENTOS — ARRASTE MANUAL
   O loop continua lento automaticamente, mas o usuário
   também pode arrastar a faixa horizontalmente.
   ========================================================= */
(() => {
    const faixa = document.querySelector(".faixa-depoimentos");
    const trilha = document.querySelector(".trilha-depoimentos");
    if (!faixa || !trilha) return;

    let arrastando = false;
    let inicioX = 0;
    let rolagemInicial = 0;

    faixa.addEventListener("pointerdown", evento => {
        arrastando = true;
        inicioX = evento.clientX;
        rolagemInicial = faixa.scrollLeft;
        faixa.setPointerCapture?.(evento.pointerId);
        trilha.style.animationPlayState = "paused";
        faixa.style.cursor = "grabbing";
    });

    faixa.addEventListener("pointermove", evento => {
        if (!arrastando) return;
        faixa.scrollLeft = rolagemInicial - (evento.clientX - inicioX);
    });

    const pararArraste = () => {
        if (!arrastando) return;
        arrastando = false;
        faixa.style.cursor = "";
        trilha.style.animationPlayState = "";
    };

    faixa.addEventListener("pointerup", pararArraste);
    faixa.addEventListener("pointercancel", pararArraste);
    faixa.addEventListener("pointerleave", pararArraste);
})();
