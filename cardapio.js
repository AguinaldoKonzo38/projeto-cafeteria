//Implementando funcionalidades das tags de pesquisa rápida
const menu_elementos = document.querySelectorAll(".menu-elementos")
const ccl_1 = document.querySelectorAll(".ccl-1")
const pedidos_cafe = document.querySelector(".pedidos-cafe")
const pedidos_hamb = document.querySelector(".pedidos-hamb")
const pedidos_outros = document.querySelector(".pedidos-outros")

//tag Todos
const tagAll = document.querySelector(".tagAll").addEventListener("click", () => {
    pedidos_cafe.style.display = "grid"
    pedidos_hamb.style.display = "grid"
    pedidos_outros.style.display = "grid"
    ccl_1.forEach((el) => {
        el.style.visibility = "visible"
    })
})

//tag café
const tagCafe = document.querySelector(".tagCafe").addEventListener("click", (evt) => {
    ccl_1.forEach((el) => {
        el.style.visibility = "hidden"
    })
    pedidos_cafe.style.display = "grid"
    pedidos_hamb.style.display = "none"
    pedidos_outros.style.display = "none"
})

//tag Hamburguer
const tagHamburg = document.querySelector(".tagHamburg").addEventListener("click", (evt) => {
    ccl_1.forEach((el, ind) => {
        if (ind == 1)
            el.style.visibility = "hidden"
        else
            el.style.visibility = "visible"
    })
    pedidos_cafe.style.display = "none"
    pedidos_hamb.style.display = "grid"
    pedidos_outros.style.display = "none"
})

//tag Outos
const tagOutros = document.querySelector(".tagOutros").addEventListener("click", (evt) => {
    ccl_1.forEach((el, ind) => {
        if (ind == 0)
            el.style.visibility = "hidden"
        else
            el.style.visibility = "visible"
    })
    pedidos_cafe.style.display = "none"
    pedidos_hamb.style.display = "none"
    pedidos_outros.style.display = "grid"
})
//fim das implementacões nas tags


//impletando a logica de compra ou do carrinho
const box_menu = document.getElementById("box-menu")
const btnCartOpenPopup = document.getElementById("carrinho")
const mascara = document.querySelector(".mascara")
const cartModal = document.getElementById("carrinho-modal")
const carrinhoItens = document.getElementById("carrinho-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const cartCounter = document.getElementById("cart-counter")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")
let cart = []

// Trabalhando o modal do carrinho
//Abrindo o modal
btnCartOpenPopup.addEventListener("click", (evt) => {
    cartModal.style.top = '50%'
    mascara.style.visibility = "visible"
})

// fechando o modal
mascara.addEventListener("click", (evt) => {
    cartModal.style.top = "-110%"
    mascara.style.visibility = "hidden"
})


box_menu.addEventListener("click", (evt) => {
    // console.log(evt.target)
    let parentButton = evt.target.closest(".btnAddCart")
    if (parentButton) {
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        adicionarCarrinho(name, price)
    }
})

//função para adicionar no carrinho
function adicionarCarrinho(name, price) {
    const existeElemento = cart.find(item => item.name === name)
    if (existeElemento) {
        existeElemento.quantidade += 1
    } else {
        cart.push(
            {
                name,
                price,
                quantidade: 1
            }
        )
    }
    atualizarCarrinho()
}

//Atualizar o carrinho
function atualizarCarrinho() {
    carrinhoItens.innerHTML = ""
    let total = 0
    cart.forEach(el => {
        const carrinhoItemElemento = document.createElement("div")

        carrinhoItemElemento.innerHTML = `
            <div class="el">
                <div>
                    <span class="el-name">${el.name}</span>
                    <span>Qtd: ${el.quantidade}</span>
                    <span>${el.price.toFixed(2)} kz</span>
                </div>
                <button class="remove-btn" data-name="${el.name}">Remover<button>
            </div>
        `

        total += el.price * el.quantidade
        carrinhoItens.appendChild(carrinhoItemElemento)
    })
    cartTotal.textContent = total.toLocaleString("pt-AO", {
        style: "currency",
        currency: "AOA"
    })

    cartCounter.innerHTML = cart.length
}

//Função para remover o item do carrinho

carrinhoItens.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("remove-btn")) {
        const name = evt.target.getAttribute("data-name")
        removerItemCarrinho(name)
    }
})

function removerItemCarrinho(name) {
    const index = cart.findIndex(item => item.name === name)
    if (index !== -1) {
        const item = cart[index]
        //console.log(item)

        if (item.quantidade > 1) {
            item.quantidade -= 1
            atualizarCarrinho()
            return
        }

        cart.splice(index, 1)
        atualizarCarrinho()
    }
}

//Ação para pegar o conteudo das inputs

addressInput.addEventListener("input", (evt) => {
    let inputValor = evt.target.value

    if (addressInput !== '') {
        addressWarn.style.visibility = "hidden"
    }
})


checkoutBtn.addEventListener("click", (evt) => {
    if (cart.length === 0)
        return

    if (addressInput.value === '') {
        addressWarn.style.visibility = "visible"
        return
    }

    //Enviar o pedido para api whats
    const cartItems = cart.map((item) => {
        return (
            `${item.name} Quantidade: (${item.quantidade}) Preço: ${item.price.toFixed(2)} Kz |`
        )
    }).join("")
    //console.log(cartItems)
    const mensagem = encodeURIComponent(cartItems)
    const phone = "925524048"

    window.open(`https://wa.me/${phone}?text=${mensagem} Endereço: ${addressInput.value} Total: ${cartTotal.textContent}`, "_blank")
})