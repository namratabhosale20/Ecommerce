
let label = document.getElementById("label");
let shoppingcart = document.getElementById("shopping-cart")
let basket = JSON.parse(localStorage.getItem("data")) || [];
// console.log(basket)
let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = (basket.map((X) => X.item).reduce((X, y) => X + y, 0));
}
calculation();

let generateCartItem = () => {
    if (basket.length !== 0) {
        // console.log("basket is not empty")
        return (shoppingcart.innerHTML = basket.map((X) => {
            let { id, item } = X;
            let search = ShopItemData.find((y) => y.id === id) || []
            let{Img,name,price}=search;
            return `
            <div class="cart-item">
            <img width="100" src=${Img} alt="" />
            <div class="details">
            <div class="title-price-x">
             <h4 class="title-price">
             <p>${name}</p>
             <p class="cart-item-price">$ ${price}</p>
             </h4>
             <i onclick="removeitem(${id})" class="fa fa-times" aria-hidden="true"></i>
            </div>

            <div class="buttons">
                    <i onclick="decrement(${id})" class="fa fa-minus" aria-hidden="true"></i>
                    <div id=${id} class="quantity">${ item }</div>
                
                    <i onclick="increment(${id})" class="fa fa-plus" aria-hidden="true"></i>
                   
                </div>

            <h3>$${item*search.price}</h3>
            </div>
            </div>
            `
        }).join(""));
    }
    else {
        // console.log("basket is empty")
        shoppingcart.innerHTML = ``;
        label.innerHTML = `<h2>cart is empty</h2>
        <a href="Shopping_Cart.html">
        <button class="Homebtn">Back to home</button>
        </a>
        
        `
    }
}
generateCartItem();
let increment = (id) => {
    let selecteditem = id;
    let search = basket.find((X) => X.id === selecteditem.id);

    if (search === undefined) {

        basket.push({
            id: selecteditem.id,
            item: 1,
        });
    }
    else {
        search.item += 1;
    }
    localStorage.setItem("data", JSON.stringify(basket));
    generateCartItem();
    // console.log(basket);
    update(selecteditem.id);
};



let decrement = (id) => {
    let selecteditem = id;
    let search = basket.find((X) => X.id === selecteditem.id);

    if(search===undefined)return

    else if (search.item === 0) return;

    else {
        search.item -= 1;
    }

    update(selecteditem.id);
    basket=basket.filter((X)=>X.item!==0);
    generateCartItem();
    // console.log(basket);
     localStorage.setItem("data", JSON.stringify(basket));
}
let update = (id) => {
    let search = basket.find((X) => X.id === id);
    console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    Totalamount();
}
let removeitem=(id)=>{
let selecteditem=id;
// console.log(selecteditem.id)
basket=basket.filter((X)=>X.id !==selecteditem.id)
generateCartItem();
Totalamount();
calculation();
localStorage.setItem("data", JSON.stringify(basket));
}
let clearcart=()=>{
          basket=[]
          generateCartItem();
          localStorage.setItem("data", JSON.stringify(basket));
          calculation();
}

let Totalamount=()=>{
    if(basket.length!==0){
        let amount=basket.map((X)=>{
        let {item,id}=X;
        let search = ShopItemData.find((y) => y.id === id) || []

        return item* search.price;

        }).reduce((X,y)=>X+y,0)
        // console.log(amount)
        label.innerHTML=`
        <h2>Total Bill: $ ${amount}</h2>
        <button class="checkout">checkout</button>
        <button onclick="clearcart()" class="removeall">Clear cart</button>
        `
    }
    else return
}
Totalamount();