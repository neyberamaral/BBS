
/* MOSTRAR DADOS DA EQUIPE */

const perfil = document.getElementById("perfil");
const modal = document.getElementById("modal")

function mostrarPerfil(nome, area, foto, descricao,descricaoCompleta) {

    document.getElementById("perfil-foto").src = foto;
    document.getElementById("perfil-nome").textContent = nome;
    document.getElementById("perfil-area").textContent = area;
    document.getElementById("perfil-descricao").textContent = descricao;
    document.getElementById("perfil-descricaoCompleta").textContent = descricaoCompleta;

    modal.classList.add("ativo");
}

modal.addEventListener("click", function (e){
    if(e.target == modal){
        modal.classList.remove("ativo");
    }
})

const cards = document.querySelectorAll(".area-card");
const setaDireita = document.querySelector(".setadireita");
const setaEsquerda = document.querySelector(".setaesquerda");
let paginaAtual = 0;

function mostrarCards() {
    
}

/* MOSTRAR DADOS DA AREA */

const perfil2 = document.getElementById("perfil2");
const modal2 = document.getElementById("modal2")

function mostrarPerfil2(nome, area, foto, descricao, nome1, nome2) {

    document.getElementById("perfil-foto2").src = foto;
    document.getElementById("perfil-nome2").textContent = nome;
    document.getElementById("perfil-area2").textContent = area;
    document.getElementById("perfil-descricao2").textContent = descricao;
    document.getElementById("perfil-adv1").textContent = nome1;
    document.getElementById("perfil-adv2").textContent = nome2;

    modal2.classList.add("ativo");
}

modal2.addEventListener("click", function (e){
    if(e.target == modal2){
        modal2.classList.remove("ativo");
    }
})