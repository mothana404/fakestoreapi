// const { error } = require("server/router");
class Product {
    constructor (title, price, image){
        this.title = title;
        this.price = price;
        this.image = image;
    }
    renderCard(){
        let cardContainer = document.querySelector(".cards-container");
        let card = document.createElement("div");
        card.innerHTML = 
        `<div class="card" style="width: 18rem;">
            <img src="${this.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5>${this.title}</h5>
                <p class="card-text">${this.price}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>`;
        cardContainer.appendChild(card);
    }
};

document.addEventListener("DOMContentLoaded", () => {
        fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(products => {
            let someProducts = products.slice(0, 20);
            someProducts.map((pro) => {
                let proObj = new Product(pro.title, pro.price, pro.image);
                proObj.renderCard();
            });
        })
        .catch(error => console.error("Error fetching products:", error));
});

//this is for post
let submit = document.querySelector(".submit");
submit.addEventListener("click", (event) => {
    event.preventDefault();
    let title = document.querySelector("input[name = title]").value;
    let content = document.querySelector("input[name = content]").value;
    fetch("http://localhost:3000/posts",{
        method : "POST",
        headers : {
            "Content-type": "application/json",
        },
        body : JSON.stringify({
            "id" : "",
            "title" : `${title}`,
            "content" : `${content}`,
        }),
    })
    .catch(error => console.log("there is an error with post"));
});

//this is to display the cards
let container = document.querySelector(".new-cards");
document.addEventListener("DOMContentLoaded", () =>{
    fetch("http://localhost:3000/posts")
    .then(response => response.json())
    .then(data => {
        data.map((element) =>{
            let card = document.createElement("div");
            card.innerHTML = 
            `<div>
                <img src = "">
                <span class = anything>
                    <span contenteditable="true" id = "title-edit">${element.title}</span>
                    <span contenteditable="true" id = "content-edit">${element.content}</span>
                    <button id = ${element.id} class = "remove" onclick = "remove(this)">remove</button>
                    <button id = ${element.id} class = "update" onclick = "update(this)">update</button>
                </span>
            </div>`;
            // container.insertAdjacentHTML("beforeend", card);
            container.appendChild(card);
        })
    })
    .catch(error => console.log("there is an error with git"));
});

//this is the remove
function remove(e){
    // e.preventDefault();
    let idid = e.id;
    console.log(idid);
    fetch(`http://localhost:3000/posts/${idid}`, {
        method : "DELETE",
        headers: {
            "Content-Type": "application/json",
            // Additional headers if needed
        },
    })
    .catch(error => console.log("there is an error with Delete"));
};

//this is to update
function update(e){
    let cardid = e.id;
    console.log(cardid);
    let newtitle = document.querySelector("#title-edit").innerHTML;
    let newcontent = document.querySelector("#content-edit").innerHTML;
    console.log(newcontent);
    fetch(`http://localhost:3000/posts/${cardid}`, {
        method : 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body : JSON.stringify({
            "title" : `${newtitle}`,
            "content" : `${newcontent}`,
        }),
    })
    .catch(error => console.log("there is an error with patch"));
};