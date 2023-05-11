// récupération de tous les éléments du panier enregistrés dans le localStorage
const cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);


//--------------------------------Affichage des produits sur la page panier------------------------------------//


//Création d'une boucle pour récupérer les infos des produits non stockées localement.
for (let i = 0; i < cart.length; i++) {
    fetch("http://localhost:3000/api/products/" + cart[i].id)
        .then((response) => response.json())
        .then((response) => {

            const article = {
                //création d'un objet réunissant toutes les infos utiles à la création de l'article du panier et + facile à utiliser ensuite
                id: cart[i].id,
                color: cart[i].color,
                quantity: cart[i].quantity,
                name: response.name,
                price: response.price,
                alt: response.altTxt,
                img: response.imageUrl,
            };

        
/*
            // récupération de la section où les produits seront affichés
            const section = document.querySelector("#cart__items");

            // Création de chaque balises de la section "cart__items"
            // Création de l'article et de sa divImage
            const articleTarget = document.createElement('article');
            articleTarget.classList.add("cart__item");
            const divImage = document.createElement('div');
            divImage.classList.add("cart__item__img");
            const imageProduct = document.createElement('img');
            imageProduct.src = article.img;
            imageProduct.setAttribute("alt", article.alt);

            //Création de la div "cart__item__content" qui acceuille la div description
            const divContent = document.createElement('div');
            divContent.classList.add("cart__item__content");
            const divDescription = document.createElement('div');
            divDescription.classList.add('cart__item__content__description');

            // Nom du produit en description
            const nameProduct = document.createElement('h2');
            nameProduct.textContent = article.name;

            //Couleur du produit en description
            const colorProduct = document.createElement('p');
            colorProduct.textContent = article.color;

            // Prix du produit en description
            const priceProduct = document.createElement('p');
            priceProduct.textContent = article.price + " €";

            const divSettings = document.createElement('div');
            divSettings.classList.add("cart__item__content__settings");

            const divQuantity = document.createElement('div');
            divQuantity.classList.add("cart__item__content__settings__quantity");

            const quantityProduct = document.createElement('p');
            quantityProduct.textContent = "Qté : ";

            const inputProduct = document.createElement('input');
            inputProduct.classList.add('itemQuantity');
            inputProduct.setAttribute('type', 'number');
            inputProduct.setAttribute('name', 'itemQuantity');
            inputProduct.setAttribute('min', '1');
            inputProduct.setAttribute('max', '100');
            inputProduct.setAttribute('value', `${article.quantity}`);

            const divDelete = document.createElement('div');
            divDelete.classList.add('cart__item__content__settings__delete');
            const deleteProduct = document.createElement('p');




            
            section.append(articleTarget,);
            articleTarget.append(divImage,divContent);
            divImage.append(imageProduct);
            divContent.append(divDescription,divSettings);
            divDescription.append(nameProduct, colorProduct, priceProduct);
            divSettings.append(divQuantity, divDelete);
            divQuantity.append(quantityProduct, inputProduct);
        */

            
            // Utilistion de la méthode innerHTML pour limiter les lignes de code.
            const sectionCart = document.querySelector('#cart__items');
 
            sectionCart.innerHTML += `<article class="cart__item" data-id="${article._id}" data-color="${article.color}">
            <div class="cart__item__img">
              <img src= "${article.img}" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${article.name}</h2>
                <p>${article.color}</p>
                <p>${article.price} €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${article.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>`;
         
          
          // Déclaration des variables
          //let totalQuantityTarget = document.querySelector('#totalQuantity').textContent = "..."
          //let totalPriceTarget = document.querySelector('#totalPrice').textContent = "..."
        let totalQuantity = 0;
        let totalPrice = 0;



            cart.push(article); //ajout de l'objet article au panier 
        })
        .catch(error => alert("Erreur : " + error));
}




