const url = "http://localhost:3000/api/products/";

fetch(url)
.then(response => response.json())
.then(response => {
     console.log(response)
    console.log(response[0])


/* Création des différents éléments HTML (article, img, h3, p) depuis l'API grâce à une boucle */

for (let i = 0; i < response.length; i++) {

    const products = document.createElement("article");

    const image = document.createElement("img");
    image.src = response[i].imageUrl;
    image.setAttribute("alt",response[i].altTxt)   

    const title = document.createElement("h3");
    title.innerText = response[i].name
    title.classList.add("productName")

    const description = document.createElement("p");
    description.innerText = response[i].description
    description.classList.add("productDescription")

    
    document.getElementById("items").appendChild(products);
    products.appendChild(image);
    products.appendChild(title);
    products.appendChild(description);
}    
})
.catch(error => alert("Erreur : " + error));


