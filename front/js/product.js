const idProduct = new URLSearchParams(window.location.search).get("id")
console.log(idProduct);

const url = "http://localhost:3000/api/products/" + idProduct;
console.log(url);

fetch(url)
    .then(response => response.json())
    .then(response => {
        console.log(response)

        const imageTarget = document.getElementsByClassName("item__img")[0];
        const image = document.createElement("img");
        image.src = response.imageUrl;
        image.setAttribute("alt", response.altTxt);

        const titleTarget = document.getElementById("title");
        const title = document.createElement("h1");
        title.innerText = response.name;

        const priceTarget = document.getElementById("price");
        const price = document.createElement("span");
        price.innerText = response.price;

        const descriptionTarget = document.getElementById("description");
        const description = document.createElement("p");
        description.innerText = response.description;

        const colorTarget = document.getElementById("colors");
        console.log(colorTarget)


        // Boucle forEach pour ajouter toutes les couleurs en option de la balise select
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




    })
    .catch(error => alert("Erreur : " + error));

