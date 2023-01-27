import { card } from "../components/card.js";
import { tableRow } from "../components/table.js";
import { referenceList } from "../data/reference.js";
import { renderToDom } from "../utils/renderToDom.js";

// Reusable function to get the cards on the DOM
// .forEach()
const renderCards = (array) => {
  let refStuff = "";
    array.forEach(el => { //loops through the array of objects and adds them to refStuff to be rendered to the dop
      refStuff += card(el)
    })
  renderToDom("#cards", refStuff); 
}

// BUTTON FILTER
// .filter() & .reduce() &.sort() - chaining
const buttonFilter = (event) => {
  if(event.target.id.includes('free')) {
    const free = referenceList.filter(el => el.price <= 0); // filter returns a new array. use variable to catch
    renderCards(free);
  }
  if(event.target.id.includes('cartFilter')) {
    const wishlist = referenceList.filter(el => el.inCart);
    renderCards(wishlist);
  }
  if(event.target.id.includes('books')) {
    const books = referenceList.filter(el => el.type === 'Book')
    renderCards(books)
  }
  if(event.target.id.includes('clearFilter')) {
    renderCards(referenceList) 
  }
  if(event.target.id.includes('productList')) {
    let table = `<table class="table table-dark table-striped" style="width: 600px">
    <thead>
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Price</th>
        <th scope="col">Type</th>
      </tr>
    </thead>
    <tbody>
    `;
    
    productList().forEach(item => {
      table += tableRow(item);
    });

    table += `</tbody></table>`

    renderToDom('#cards', table);
  }
  
}

// SEARCH
// .filter()
const search = (event) => {
  const eventLC = event.target.value.toLowerCase(); // value refers to the value the user inputs
  const searchMatch = referenceList.filter(el => {
    el.title.toLowerCase().includes(eventLC) || 
    el.author.toLowerCase().includes(eventLC) || 
    el.description.toLowerCase().includes(eventLC)
  })
}

// CALCULATE CART TOTAL
// .reduce() & .some()
const cartTotal = (array) => {
  const total = 0
  // total = referenceList.filter(el => el.inCart).reduce((acc,cur) => acc + cur)
  document.querySelector("#cartTotal").innerHTML = total.toFixed(2);
}

// RESHAPE DATA TO RENDER TO DOM
// .map()
const productList = () => {
  return referenceList.map(el => ({
    title: el.title,
    price: el.price,
    type: el.type
   }))
}

// UPDATE/ADD ITEMS TO CART
// .findIndex() & (.includes() - string method)
const toggleCart = (event) => {
  if (event.target.id.includes("fav-btn")) {
   console.log('Clicked Fav btn')
  }
}


const startApp = () => {
  // PUT ALL CARDS ON THE DOM
  renderCards(referenceList)

  // PUT CART TOTAL ON DOM
  cartTotal();

  // SELECT THE CARD DIV
  document.querySelector('#cards').addEventListener('click', toggleCart);

  // SELECT THE SEARCH INPUT
  document.querySelector('#searchInput').addEventListener('keyup', search)

  // SELECT BUTTON ROW DIV
  document.querySelector('#btnRow').addEventListener('click', buttonFilter);
}
startApp();
