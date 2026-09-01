
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