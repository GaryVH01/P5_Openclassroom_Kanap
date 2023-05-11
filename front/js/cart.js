// récupération de tous les éléments du panier enregistrés dans le localStorage
const cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

//---------Variables pour le calcul du panier---------------//

let quantityInCart = 0;
let totalQuantity = 0;
let totalPrice = 0;

// ----------------------------------------------------FUNCTIONS---------------------------------------------------------------//

function calculateQuantity() {
};


function calculatePrice() {
};

function removeProduct() {
  document.querySelector('cart__item').remove();
}
function changeQuantity() {
};


//---------------------------------------Affichage des produits sur la page panier----------------------------------------------//


//Création d'une boucle pour récupérer les infos des produits non stockées localement et recréer le DOM.
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

      cart.push(article); //ajout de l'objet article au panier

      // Calcul du montant du panier
      let CartPrice = totalPrice += (article.price * article.quantity);
      document.querySelector('#totalPrice').textContent = totalPrice;

      //Calcul de la quantité d'articles dans le panier
      let cartQuantity = totalQuantity += article.quantity;
      document.querySelector('#totalQuantity').textContent = totalQuantity;

    })
    .catch(error => alert("Erreur : " + error));
}


