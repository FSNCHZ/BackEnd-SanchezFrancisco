const socket = io()

document.querySelector("#addUser").addEventListener("click", async () => {
    console.log("a");
    
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    const photo = document.querySelector("#photo").value
    const user = {
        email,
        password,
        photo,
    }
    socket.emit("newUser", user)
    document.querySelector(".register-body").innerHTML =    `   <div class="d-flex h-75 justify-content-center align-items-center">
                                                                    <h1>User registered successfully!</h1>
                                                                </div>    
                                                            `
})