let url = window.location.search;
let searchParams = new URLSearchParams(url);
let orderId = searchParams.get('orderId');
//console.log(orderId);


const targetOrderId = document.querySelector('#orderId');
targetOrderId.innerHTML = orderId;