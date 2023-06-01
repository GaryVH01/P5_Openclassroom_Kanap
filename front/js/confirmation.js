// Récupération de l'URL de la page actuelle à laquelle on ajoute un paramètre search
let url = window.location.search;
let searchParams = new URLSearchParams(url);
let orderId = searchParams.get('orderId'); // récupération de l'id de la commande 
//console.log(orderId);

const targetOrderId = document.querySelector('#orderId');
targetOrderId.innerHTML = orderId; // Affichage de l'id de la commande pour le client

// Supprimer le localStorage qui ne sera plus utile
localStorage.clear();