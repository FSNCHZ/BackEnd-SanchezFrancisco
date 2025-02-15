console.log("Script conectado")

const socket = io()

socket.on("products", data => {
    const productsTemplate = data.map(p => `<div class="card mt-4" style="width: 18rem;">
                                                ${p.img ? `<img src=${p.img} class="card-img-top h-75 object-fit-contain px-3 py-3" alt=${p._id}>` : `<img src="https://cdn-icons-png.flaticon.com/512/9402/9402212.png" class="card-img-top h-75 object-fit-contain px-3 py-3" alt=${p._id}>`}
                                                <div class="card-body border-top">
                                                    <h5 class="card-title">${p.title}</h5>
                                                    <h6 class="card-subtitle">$${p.price}</p6>
                                                    <p class="card-text">${p.description}</p>
                                                </div>
                                            </div>`).join("")
    document.querySelector("#products").innerHTML = productsTemplate
})

document.querySelector("#add").addEventListener("click", async () => {
    const title = document.querySelector("#title").value
    const description = document.querySelector("#description").value
    const price = document.querySelector("#price").value
    const img = document.querySelector("#img").value
    const product = {
        title,
        img,
        description,
        price,
    }
    socket.emit("newProduct", product)
    document.querySelector("#title").value = ""
    document.querySelector("#description").value = ""
    document.querySelector("#price").value = ""
    document.querySelector("#img").value = ""
})