// récupération de tous les éléments du panier enregistrés dans le localStorage
let cart = JSON.parse(localStorage.getItem("cart"));
console.log("localStorage", cart);

//---------Variables pour le calcul du panier---------------//

let totalQuantity = 0;
let totalPrice = 0;

// ----------------------------------------------------FUNCTIONS---------------------------------------------------------------//
function displayCart(response) {
  //
}







//---------------------------------------Affichage des produits sur la page panier----------------------------------------------//


//Création d'une boucle pour récupérer les infos des produits non stockées localement et recréer le DOM.
for (let i = 0; i < cart.length; i++) {
  fetch("http://localhost:3000/api/products/" + cart[i].id)
    .then((response) => response.json())
    .then((response) => {

      const article = {
        //création d'un objet réunissant toutes les infos utiles à la création de l'article du panier et + facile à utiliser ensuite.
        id: cart[i].id,
        color: cart[i].color,
        quantity: cart[i].quantity,
        name: response.name, // récupération des infos non stockées dans le localStorage
        price: response.price,
        alt: response.altTxt,
        img: response.imageUrl,
      };


      // Utilistion de la méthode innerHTML pour limiter les lignes de code.
      const sectionCart = document.querySelector('#cart__items');

      sectionCart.innerHTML += `<article class="cart__item" data-id="${article.id}" data-color="${article.color}">
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




      //Calcul de la quantité d'articles dans le panier
      //On Utilise la variable totalQuantity initiée à 0 et on ajoute le nombre d'articles sélectionnés.
      function calculateQuantity() {
        let quantityTarget = document.querySelector('#totalQuantity');
        totalQuantity += Number(article.quantity); // On obtient une nouvelle valeur pour totalQuantity à laquelle on ajoute de nouveau une quantité
        quantityTarget.textContent = totalQuantity; // On injecte le résultat dans le code HTML
      }



      // Calcul du montant du panier
      // Même principe que pour la quantité totale. 
      function calculatePrice() {
        let priceTarget = document.querySelector('#totalPrice')
        totalPrice += (article.price * article.quantity);
        priceTarget.textContent = totalPrice;
      }


      function changeQuantity() {
        const quantitySelector = document.querySelectorAll('.itemQuantity');
        let quantityToChange = article.quantity.value

        quantitySelector.forEach((quantitySelector) => {
          quantitySelector.addEventListener("change", (e) => {
            let parentArticle = e.target.parentNode.parentNode.parentNode.parentNode;
            let idProduct = parentArticle.dataset.id;
            let colorProduct = parentArticle.dataset.color;
            //console.log(idProduct, colorProduct)

            const productToChangeQuantity = cart.find((el) => el.id === idProduct && el.color === colorProduct)
            //console.log('produit dont la quantité sera modifiée : ', productToChangeQuantity)

            if (productToChangeQuantity != undefined) {
              //console.log("quantité modifiée, désormais à : " + quantitySelector.value)
              productToChangeQuantity.quantity = quantitySelector.value;
            }
            // Ensuite il faut ajouter ou supprimer la quantité au localstorage pour mettre à jour le prix ensuite
            saveToLocalStorage();
            calculatePrice();
            calculateQuantity();
            //location.reload();
          });
        })
      };


      function removeProduct(id, color) {

        // On récupère l'élément permettant de supprimer un article.
        const buttonRemover = document.querySelectorAll('.deleteItem');

        //On obtient un tableau sur lequel on boucle pour ajouter un événement à chaque élément "buttonRemover".
        buttonRemover.forEach((buttonRemover) => {
          buttonRemover.addEventListener("click", (e) => {
            let parentArticle = e.target.parentNode.parentNode.parentNode.parentNode;
            let idProduct = parentArticle.dataset.id;
            let colorProduct = parentArticle.dataset.color;

            // On récupère l'article qu'on souhaite supprimer grâce à la méthode element.closest(). 
            let articleToRemoveDOM = buttonRemover.closest('article');

            //Si l'internaute confirme son choix action de suppression
            if (confirm('Etes-vous certain de vouloir supprimer cet article du panier?')) {
              // Alors on supprime la balise article du DOM.
              articleToRemoveDOM.remove();

              // On modifie la variable cart en filtrant les éléments qu'on souhaite garder grâce à leur id et leur couleur
              cart = cart.filter((el) => el.id !== idProduct || el.color !== colorProduct)
              //console.log('panier filtré', cart)

              // On met à jour le localStorage avec le nouveau panier
              saveToLocalStorage();
            }


            // Si le panier est vide on alerte l'utilisateur.
            if (cart === null || cart.length === 0) {
              alert("Le panier ne comporte aucun article");
            }
            //calculateQuantity();
            //calculatePrice();
            location.reload();
          });
        })
      }

      function saveToLocalStorage() {
        localStorage.setItem("cart", JSON.stringify(cart));
      }

      //-------------------------Appel des fonctions créées précédemment-----------------//

      calculateQuantity();
      calculatePrice();
      removeProduct();
      changeQuantity();

    })
    .catch(error => alert("Erreur : " + error));
}









/*

// --------------------------Vérifications du formulaire-----------------------------------//

// Déclaration des variables et récupération des éléments dans le DOM.
let form = document.querySelector('form');
let firstName = document.querySelector('#firstname');
let errorMessageFirstName = document.querySelector('#firstNameErrorMsg').textContent('Cet espace ne peut contenir de chiffres ou de caaractères spéciaux!')
let lastName = document.querySelector('#lastName');
let errorMessageLastName = document.querySelector('#lastNameErrorMsg').textContent('Cet espace ne peut contenir de chiffres ou de caaractères spéciaux!')
let adress = document.querySelector('#address');
let errorMessageAdresse = document.querySelector('#addressErrorMsg').textContent('Cet espace ne peut contenir de chiffres ou de caaractères spéciaux!')
let city = document.querySelector('#city');
let errorMessageCity = document.querySelector('#cityErrorMsg').textContent('Cet espace ne peut contenir de chiffres ou de caaractères spéciaux!')
let email = document.querySelector('#email');
let errorMessageEmail = document.querySelector('#emailErrorMsg').textContent('email invalide')
let buttonOrder = document.querySelector('#order');


buttonOrder.addEventListener('submit', (e) => {
  e.preventDefault
  if(firstName.value === "" || firstName.value == Number){
    alert('Ce champ doit contenir du texte');
    console.log('error form');
  }
});

*/

// Créer une fonction par input puis les importer dans le addeventlistener du formulaire.