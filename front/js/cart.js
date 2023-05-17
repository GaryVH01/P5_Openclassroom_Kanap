// récupération de tous les éléments du panier enregistrés dans le localStorage
const cart = JSON.parse(localStorage.getItem("cart"));
console.log("localStorage", cart);

//---------Variables pour le calcul du panier---------------//

let quantityInCart = 0;
let totalQuantity = 0;
let totalPrice = 0;

//-----------Variables pour la quantité sélectionnée--------------------//

// ----------------------------------------------------FUNCTIONS---------------------------------------------------------------//
function displayCart(response){
//
}

function removeProduct() {
  // On récupère l'élément permettant de supprimer un article.
  const buttonRemover = document.querySelectorAll('.deleteItem');
  //On obtient un tableau sur lequel on boucle pour ajouter un événement à chaque élément "buttonRemover".
  buttonRemover.forEach((buttonRemover) => {
    buttonRemover.addEventListener("click", (e) => {

      // On récupère l'article qu'on souhaite supprimer grâce à la méthode element.closest(). 
      let articleToRemove = buttonRemover.closest('article');
      console.log(articleToRemove);
      // Si l'internaute confirme son choix de suppression alors on supprime la balise article.
      if (confirm('Etes-vous certain de vouloir supprimer cet article du panier?')) {
        articleToRemove.remove();
      }
      // On remet à jour le localStorage
      function deleteItem(item) {
        const itemToDelete = cart.findIndex(
          (p) => p.id === item.id && p.color === item.color)
          console.log('item to delete')
          delete cart[itemToDelete]
      }
      deleteItem();
      // Si le panier est vide on alerte l'utilisateur.
      if (cart === null || cart.length === 0) {
        alert("Le panier ne comporte aucun article");
      }
      else {
        // Sinon, on recalcule la quantité et le prix total du panier
        //calculateQuantity();
        //calculatePrice();
      }
      // location.reload();
    });
  })
}





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

          console.log(article);
      //cart.push(article); //ajout de l'objet article au panier

      //Calcul de la quantité d'articles dans le panier
      //On Utilise la variable totalQuantity initiée à 0 et on ajoute le nombre d'articles sélectionnés.
      function calculateQuantity() {
        let quantityTarget = document.querySelector('#totalQuantity')
        let cartQuantity = totalQuantity += article.quantity; // On obtient une nouvelle valeur pour totalQuantity à laquelle on ajoute de nouveau une quantité
        quantityTarget.textContent = totalQuantity; // On injecte le résultat dans le code HTML
      }

      calculateQuantity();


      // Calcul du montant du panier
      // Même principe que pour la quantité totale. 
      function calculatePrice() {
        let CartPrice = totalPrice += (article.price * article.quantity);
        document.querySelector('#totalPrice').textContent = totalPrice;
      }

      calculatePrice();


      function changeQuantity() {
        //récupérer mes éléments
        // Si la nouvelle quantité est supérieure à l'ancienne alors addition sinon soustraction et si 0 suppression de l'article complet
        // Ajout de l'écouteur sur l'input, type change. 
        let quantitySelector = document.querySelector('.itemQuantity');
        quantitySelector.addEventListener('change', (e) => {
          if (quantitySelector.value++) {
            totalQuantity ++;
          }
          else if (quantitySelector.value--) {
            totalQuantity --;
          } 
        });
      };
            changeQuantity();


      //-------------------------Appel des fonctions créées précédemment-----------------//
      removeProduct();
      
  
    })
    .catch(error => alert("Erreur : " + error));
}

//location.reload();









/*
// --------------------------Vérifications du formulaire-----------------------------------//

// Déclaration des variables et récupération des éléments dans le DOM.
let form = document.querySelector('form');
let firstName = document.querySelector('#firstname');
let errorMessageFirstName = document.querySelector('firstNameErrorMsg').textContent('Cet espace ne peut contenir de chiffres ou de caaractères spéciaux!')
let lastName = document.querySelector('#lastName');
let errorMessageLastName = document.querySelector('lastNameErrorMsg').textContent('Cet espace ne peut contenir de chiffres ou de caaractères spéciaux!')
let adress = document.querySelector('#address');
let errorMessageAdresse = document.querySelector('addressErrorMsg').textContent('Cet espace ne peut contenir de chiffres ou de caaractères spéciaux!')
let city = document.querySelector('#city');
let errorMessageCity = document.querySelector('cityErrorMsg').textContent('Cet espace ne peut contenir de chiffres ou de caaractères spéciaux!')
let email = document.querySelector('#email');
let errorMessageEmail = document.querySelector('emailErrorMsg').textContent('email invalide')



form.addEventListener('submit', (e) => {
  e.preventDefault
})
*/
