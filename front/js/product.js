const idProduct = new URLSearchParams(window.location.search).get("id")
console.log(idProduct);

const url = "http://localhost:3000/api/products/" + idProduct;
console.log(url);

//On appelle la fonction fetch pour récupérer les informations (les ressources) sur le réseau.
//On reçoit ensuite une promise (objet), que l'on va récupérer en format JSON. 
//Puis dans la seconde fonction then, permet d'utiliser les informations de l'API.
fetch(url)
    .then(response => response.json())
    .then(response => {

        displayProduct(response)

    })
    // la fonction catch permet d'afficher un message d'erreur si un problème survient.
    .catch(error => alert("Erreur : " + error));

function displayProduct(response) {

    console.log(response)


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
    console.log(colorTarget)


    // On crée une boucle forEach pour ajouter toutes les couleurs en option de la balise select
    // Dans le tableau colors, faire une boucle pour chaque élément du tableau
    response.colors.forEach((color) => {
        const select = document.getElementById("colors");
        const option = document.createElement("option");

        // Récupération des données de l'API
        option.value = color;
        option.innerText = color;

        select.appendChild(option);
    })

    // On rattache les éléments enfants à leur parent
    imageTarget.appendChild(image);
    titleTarget.appendChild(title);
    priceTarget.appendChild(price);
    descriptionTarget.appendChild(description);


    const boutton = document.getElementById("addToCart");
    boutton.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("je clique");

        let product = {
            id: "3333",
            quantity: "23"
        }

        addToCart(product)

    })
}

function addToCart(product) {
    let cart = [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
}

/** création du panier
 * - Ajout d'un eventListener sur le bouton panier au clic.
 * - Stockage des éléments, qui vont être ajoutés dans le panier, dans le localStorage en créant un tableau avec [id, qunatity, color]
 * - 
 * - 
 * 
 * Je dois ajouter un tableau d'objets 
 * 
 * 
 */