/* Logica de programação

    [x] Saber quando o usuario clicou no botao
    [x] Mudar o posicionamento do modal
    [x] Fazer a mascara ficar visivel
    [x] Quando o usuario clicar na mascara, fechar o modal
    [#] Adicionar o efeito scroll
*/

const modal = document.querySelector(".modal")
const modalMask = document.querySelector(".modal-mask")

const btn_address = document.querySelectorAll(".address").forEach((el)=>{
    el.addEventListener("click", ()=>{
        modal.style.left = '50%'
        modalMask.style.visibility = 'visible'
    })
})

modalMask.addEventListener("click", () => {
    modal.style.left = '-100%'
    modalMask.style.visibility = 'hidden'
})

// Trabalhando a responsividade no header
const btncloseMenu = document.querySelector(".btn-close")

const btnMenu = document.querySelector(".btn-menu").addEventListener("click", (el) => {
    document.querySelector(".mobile-menu").style.display = "flex"
    document.querySelector(".btn-menu").style.display = "none"
    btncloseMenu.style.display = "block"
})


btncloseMenu.addEventListener("click", (el) => {
    document.querySelector(".mobile-menu").style.display = "none"
    document.querySelector(".btn-menu").style.display = "block"
    btncloseMenu.style.display = "none"
})
