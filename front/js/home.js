const url = "http://localhost:3000/api/products/";
const section = document.getElementById("items");

// On récupère les éléments du DOM grâce à la commande fetch
fetch(url)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        console.log(response[0])


        /* Création des différents éléments HTML (article, img, h3, p) depuis l'API grâce à une boucle */

        for (let i = 0; i < response.length; i++) {

           const link = document.createElement("a");
           link.setAttribute("href", "product.html?id="+response[i]._id);
           console.log(link);

            const products = document.createElement("article");

            const image = document.createElement("img");
            image.src = response[i].imageUrl;
            image.setAttribute("alt", response[i].altTxt);

            const title = document.createElement("h3");
            title.innerText = response[i].name
            title.classList.add("productName")

            const description = document.createElement("p");
            description.innerText = response[i].description;
            description.classList.add("productDescription");

            // ON rattache les éléments enfant à leur parent   
            document.getElementById("items").appendChild(link);
            link.appendChild(products);
            products.appendChild(image);
            products.appendChild(title);
            products.appendChild(description);
            
        }
    })
    .catch(error => alert("Erreur : " + error));

 