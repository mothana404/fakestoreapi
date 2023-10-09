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
        `
        <div class="card" style="width: 18rem;">
            <img src="${this.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5>${this.title}</h5>
                <p class="card-text">${this.price}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        `;
        cardContainer.appendChild(card);
    }
}
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