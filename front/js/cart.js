// récupération de tous les éléments du panier enregistrés dans le localStorage
let cart = JSON.parse(localStorage.getItem("cart"));
console.log("localStorage", cart)

// ----------------------------------------------------FUNCTIONS---------------------------------------------------------------//


function displayCart(response) {

}





//Calcul de la quantité d'articles dans le panier
//On Utilise la variable totalQuantity initiée à 0 et on ajoute le nombre d'articles sélectionnés.
function calculateQuantity() {
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity += Number(cart[i].quantity);
  }
  let quantityTarget = document.querySelector('#totalQuantity');
  quantityTarget.textContent = totalQuantity; // On injecte le résultat dans le code HTML
}





// Calcul du montant du panier
// Même principe que pour la quantité totale. 
function calculatePrice() {
  
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    fetch("http://localhost:3000/api/products/" + cart[i].id)
      .then((response) => response.json())
      .then((response) => {
        const quantity = cart[i].quantity
        const price = response.price
    
        totalPrice += price * quantity
        console.log(totalPrice);
        let priceTarget = document.querySelector('#totalPrice');
        priceTarget.innerText = totalPrice;      
      })
      .catch(error => alert("Erreur : " + error));
  }
}






function changeQuantity() {
  const quantitySelectors = document.querySelectorAll('.itemQuantity');
  // let quantityToChange = quantity.value

  quantitySelectors.forEach((quantitySelector) => {
    quantitySelector.addEventListener("change", (e) => {
      let parentArticle = e.target.parentNode.parentNode.parentNode.parentNode;
      let idProduct = parentArticle.dataset.id;
      let colorProduct = parentArticle.dataset.color;
      console.log(parentArticle)

      const productToChangeQuantity = cart.find((el) => el.id === idProduct && el.color === colorProduct)
      //console.log('produit dont la quantité sera modifiée : ', productToChangeQuantity)

      if (productToChangeQuantity != undefined) {
        //console.log("quantité modifiée, désormais à : " + quantitySelector.value)
        console.log(quantitySelector.value);
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






function removeProduct() {

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
      calculateQuantity();
      calculatePrice();
    });
  })
}

function saveToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
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
      // Utilisation de la méthode innerHTML pour limiter les lignes de code.
      const sectionCart = document.querySelector('#cart__items');

      sectionCart.innerHTML += `<article class="cart__item" data-id="${article.id}" data-color="${article.color}">
            <div class="cart__item__img">
              <img src= "${article.img}" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${article.name}</h2>
                <p>${article.color}</p>
                <p class="price">${article.price} €</p>
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

      if (cart === null || cart.length == 0) {
        alert('Votre panier est vide')
      }
      
      // Appel des fonctions permettant la modification de la quantité de l'article ou sa suppression
      removeProduct();
      changeQuantity();
    })
    .catch(error => alert("Erreur : " + error));
}
//Appel des fonctions qui doivent être en dehors de la boucle
calculatePrice();
calculateQuantity();


// ---------------------------------------------------------------Vérifications du formulaire---------------------------------------------------------------//

// Déclaration des variables et récupération des éléments dans le DOM.
let form = document.getElementsByClassName('cart__order__form');

let firstName = document.querySelector('#firstName');
let errorMessageFirstName = document.querySelector('#firstNameErrorMsg');

let lastName = document.querySelector('#lastName');
let errorMessageLastName = document.querySelector('#lastNameErrorMsg');

let adress = document.querySelector('#address');
let errorMessageAdress = document.querySelector('#addressErrorMsg');

let city = document.querySelector('#city');
let errorMessageCity = document.querySelector('#cityErrorMsg');

let email = document.querySelector('#email');
let errorMessageEmail = document.querySelector('#emailErrorMsg');

let buttonOrder = document.querySelector('#order');

// ---------------------------------Déclaration des expressions régulières qui seront testées dans le formulaire---------------------------------------------//

const regExpEmail = /[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})/;
const regExpIdentity = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
const regExpAdress = /^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$/;
const regExpCity = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;


//Ajout d'écouteurs d'événements sur tous les inputs, pour que l'utilisateur ait un retour immédiat des infos qu'il va envoyer. 

// On écoute l'input Prénom
firstName.addEventListener('change', (e) => {
  checkFirstName(this);
})
const checkFirstName = () => {
  errorMessageFirstName.style.display = 'none'
  if (regExpIdentity.test(firstName.value)) {
    firstName.style.border = 'solid green 2px';
    return true
  }
  else {
    errorMessageFirstName.style.display = 'block'
    errorMessageFirstName.innerHTML = 'Merci de renseigner un prénom valide'
    firstName.style.border = 'solid red 2px';
    firstName.style.color = 'red';
    return false
  }
}



// ON écoute l'input Nom
lastName.addEventListener('change', (e) => {
  checkLastName(this);
})
const checkLastName = () => {
  errorMessageLastName.style.display ='none';
  if (regExpIdentity.test(lastName.value)) {
    lastName.style.border = 'solid green 2px';
    return true
  }
  else {
    errorMessageLastName.innerHTML = 'Merci de renseigner un nom valide'
    errorMessageLastName.style.display ='block';
    lastName.style.border = 'solid red 2px';
    lastName.style.color = 'red';
    return false
  }
}

// On écoute l'input email
email.addEventListener('change', (e) => {
  checkEmail(this);
})
const checkEmail = () => {
  errorMessageEmail.style.display = 'none';
  if (regExpEmail.test(email.value)) {
    email.style.border = 'solid green 2px';
    return true;
  }
  else {
    errorMessageEmail.style.display = 'block';
    errorMessageEmail.innerHTML = 'Adresse email non Valide'
    email.style.border = 'solid red 2px';
    errorMessageEmail.style.color = 'red';
    return false;
  }
}

// On écoute l'input Adresse
adress.addEventListener('change', (e) => {
  checkAdress(this);
})
const checkAdress = () => {
  errorMessageAdress.style.display = 'none'
  if (regExpAdress.test(adress.value)) {
    adress.style.border = 'solid green 2px';
    return true
  }
  else {
    errorMessageAdress.style.display = 'block'
    errorMessageAdress.innerHTML = 'Adresse non valide'
    adress.style.border = 'solid red 2px';
    errorMessageAdress.style.color = 'red';
    return false
  }
}

// On écoute l'input Ville
city.addEventListener('change', (e) => {
  checkCity(this);
})
const checkCity = () => {
  errorMessageCity.style.display='none'
  if (regExpCity.test(city.value)) {
    city.style.border = 'solid green 2px';
    return true
  }
  else {
    errorMessageCity.style.display='bloc'
    errorMessageCity.innerHTML = 'Merci de renseigner une ville existante'
    city.style.border = 'solid red 2px';
    errorMessageCity.style.color = 'red';
    return false
  }
}

// On écoute la soumission du formulaire sur le clic du bouton envoyer
buttonOrder.addEventListener('click', (e) => {
  e.preventDefault();
  // Si toutes les vérifications faites précédement renvoient true, alors on soumet le formulaire
  if (checkFirstName(firstName) && checkLastName(lastName) && checkAdress(adress) && checkCity(city) && checkEmail(email)) {

    // Création d'un objet réunissant les informations reccueillies dans le formulaire
    let contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: adress.value,
      city: city.value,
      email: email.value,
    }

    // Création d'un tableau réunissant uniquement les ID des produits car l'API n'accepte que les ID
    let products = [];
    for (let i = 0; i < cart.length; i++) {
      products.push(cart[i].id);
    }

    // Création d'un tableau englobant la commande et les coordonnées de l'acheteur
    let order = {};
    order.contact = contact;
    order.products = products;
    console.log(order);



    // On fait une requête POST vers l'API
    fetch("http://localhost:3000/api/products/order", {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((response) => {

        console.log(response);
        // redirection vers page confirmation avec l'id de l'order en paramètre d'url pour le récupérer sur la page de confirmation
        window.location.href = 'confirmation.html?orderId=' + response.orderId;

      })
      .catch(error => alert("Erreur : " + error));
  }
})






