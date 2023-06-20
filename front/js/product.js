
const idProduct = new URLSearchParams(window.location.search).get("id")
console.log(idProduct);

const url = "http://localhost:3000/api/products/" + idProduct;
// console.log(url);

//On appelle la fonction fetch pour récupérer les informations (les ressources) sur le réseau.
//On reçoit ensuite une promise (objet), que l'on va récupérer en format JSON. 
//Puis dans la seconde fonction then, permet d'utiliser les informations de l'API.
fetch(url)
    .then(response => response.json())
    .then(response => {

        // appel de la fonction d'affichage du produit
        displayProduct(response)

    })
    // la fonction catch permet d'afficher un message d'erreur si un problème survient.
    .catch(error => alert("Erreur : " + error));


function displayProduct(response) {
    // console.log(response)

    //On récupère l'élément HTML auquel on veut ajouter l'image. Ensuite on crée la balise image.On définit la source de l'image.Puis on ajoute l'attribut alt à la balise img.
    const imageTarget = document.getElementsByClassName("item__img")[0];
    const image = document.createElement("img");
    image.src = response.imageUrl;
    image.setAttribute("alt", response.altTxt);

    //On récupère l'élément HTML auquel on veut ajouter le titre h1. On crée la balise HTML h1. On lui ajoute le texte en utilisant la réponse de la méthode fetch.
    const titleTarget = document.getElementById("title");
    const title = document.createElement("h1");
    title.innerText = response.name;

    //On récupère l'élément HTML auquel on veut ajouter le prix. On crée la balise HTML span. On lui ajoute le prix en utilisant la réponse de la méthode fetch.
    const priceTarget = document.getElementById("price");
    const price = document.createElement("span");
    price.innerText = response.price;

    //On récupère l'élément HTML auquel on veut ajouter la description. On crée la balise HTML p. On lui ajoute la decription en utilisant la réponse de la méthode fetch.
    const descriptionTarget = document.getElementById("description");
    const description = document.createElement("p");
    description.innerText = response.description;

    const colorTarget = document.getElementById("colors");
    // console.log(colorTarget)


    // On crée une boucle forEach pour ajouter toutes les couleurs en option de la balise select
    // Dans le tableau colors, faire une boucle pour chaque élément du tableau.
    response.colors.forEach((color) => {
        const select = document.getElementById("colors");
        const option = document.createElement("option");

        // Récupération des données de l'API
        option.value = color;
        option.innerText = color;
        // console.log(color);
        select.appendChild(option);
    })

    // On rattache les éléments enfants à leur parent
    imageTarget.appendChild(image);
    titleTarget.appendChild(title);
    priceTarget.appendChild(price);
    descriptionTarget.appendChild(description);


    // Création du panier
    // récupération du boutton addToCart et ajout d'un écouteur d'événements
    const boutton = document.getElementById("addToCart");
    boutton.addEventListener("click", (e) => {
        e.preventDefault();
        // console.log("je clique");

        // On stocke la quantité et la couleur choisie dans des variables pour les réutiliser ensuite.
        const color = document.getElementById("colors");
        let colorSelected = color.value;
        const quantity = document.getElementById("quantity");
        let quantitySelected = Number(quantity.value);

        // Variable product, dans laquelle on stocke un objet comprenant (id, quantity et color)
        //Si quantité supérieure à 0 et couleur sélectionnée ET nombre entier, on appelle la fonction addToCart.
        if (colorSelected != "" && quantitySelected > 0 && quantitySelected < 100 && quantitySelected <= 100 && Number.isInteger(quantitySelected) ) {
            const product = {
                id: idProduct,
                quantity: quantitySelected,
                color: colorSelected
            }

            // console.log(product);
            addToCart(product)

        } else {
            alert("Vous devez sélectionner une quantité valide (nombre entier compris entre 1 et 100) et une couleur")
        }
    })
}

/* ----------------------------------------------------Les FONCTIONS-----------------------------------------------------------*/
// Création d'une fonction permettant de stocker le panier dans le localStorage
function saveToLocalStorage(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Création d'une fonction permettant de récupèrer le panier stocké dans le localStorage
function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart === null || cart === undefined) { //s'il n'y a rien dans le localStorage, on récupère un array.
        return [];
    } else {  //sinon on récupère un objet JSON du panier.
        return JSON.parse(cart);
    }
}

// Création d'une fonction d'ajout au panier
function addToCart(product) {
    let cart = getCart();
    let searchProduct = cart.find(el => el.id === product.id && el.color === product.color); // fonction find() pour vérifier, dans le tableau, la présence d'un élément.
    // console.log(searchProduct);
    // ajout condition pour quantité
    if (searchProduct != undefined) {
        searchProduct.quantity += product.quantity;
    } else {
        cart.push(product);
    }
    saveToLocalStorage(cart);
    alert('Le produit a bien été ajouté au panier.')
}



