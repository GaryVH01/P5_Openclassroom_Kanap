const idProduct = new URLSearchParams(window.location.search).get("id")
console.log(idProduct);


const url = "http://localhost:3000/api/products/"+idProduct;
console.log(url);

 fetch(url)
    .then(response => response.json())
    .then(response => {
        console.log(response)


        const imageTarget = document.getElementsByClassName("item__img")[0];
        const image = document.createElement("img");
        image.src = response.imageUrl;
        image.setAttribute("alt", response.altTxt);
        console.log(image);

        const titleTarget = document.getElementById("title");
        const title = document.createElement("h1");
        title.innerText= response.name;

        const priceTarget = document.getElementById("price");
        const price = document.createElement("span");
        price.innerText = response.price;

        const descriptionTarget = document.getElementById("description");
        const description = document.createElement("p");
        description.innerText = response.description;

        const colorTarget = document.getElementById("colors");
        for (let i=0; i< response.length; i++){
            colorTarget.innerText = response[i]
        }


// on rattache les éléments enfants à leur parent
        imageTarget.appendChild(image);
        titleTarget.appendChild(title);
        priceTarget.appendChild(price);
        descriptionTarget.appendChild(description);
     



    })
    .catch(error => alert("Erreur : " + error));

